import { isExtractableFile, extractFiles, ExtractableFile } from "extract-files"
import FormDataNode from "form-data"
import { print } from "graphql/language/printer"
import { DocumentNode } from "graphql/language/ast"
import startsWith from "lodash/startsWith"
import isFunction from "lodash/isFunction"
import isString from "lodash/isString"
import forEach from "lodash/forEach"

// eslint-disable-next-line
export type Variables = { [key: string]: any }

export interface GraphQLError {
  message: string
  locations: { line: number; column: number }[]
  path: string[]
}

// eslint-disable-next-line
export interface GraphQLResponse<T = any> {
  data?: T
  errors?: GraphQLError[]
  // eslint-disable-next-line
  extensions?: any
  status: number
  // eslint-disable-next-line
  [key: string]: any
}

export interface GraphQLRequestContext<V = Variables> {
  query: string
  variables?: V
}

export type RequestDocument = string | DocumentNode

export class ClientError extends Error {
  response: GraphQLResponse
  request: GraphQLRequestContext

  constructor(response: GraphQLResponse, request: GraphQLRequestContext) {
    const message = `${ClientError.extractMessage(response)}: ${JSON.stringify({
      response,
      request,
    })}`

    super(message)

    Object.setPrototypeOf(this, ClientError.prototype)

    this.response = response
    this.request = request

    // this is needed as Safari doesn't support .captureStackTrace
    if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, ClientError)
    }
  }

  private static extractMessage(response: GraphQLResponse): string {
    try {
      // eslint-disable-next-line
      return response.errors![0].message
    } catch (e) {
      return `GraphQL Error (Code: ${response.status})`
    }
  }
}

/**
 * Duck type if NodeJS stream
 * https://github.com/sindresorhus/is-stream/blob/3750505b0727f6df54324784fe369365ef78841e/index.js#L3
 */
// eslint-disable-next-line
const isExtractableFileEnhanced = (value: any): value is ExtractableFile | { pipe: any } =>
  isExtractableFile(value) || (value !== null && value?.pipe && isFunction(value.pipe))

/**
 * Returns Multipart Form if body contains files
 * (https://github.com/jaydenseric/graphql-multipart-request-spec)
 * Otherwise returns JSON
 */
export default function createRequestBody(query: string, variables?: Variables): string | FormData {
  const { clone, files } = extractFiles({ query, variables }, "", isExtractableFileEnhanced)

  if (files.size === 0) {
    return JSON.stringify(clone)
  }

  const Form = typeof FormData === "undefined" ? FormDataNode : FormData

  const form = new Form()

  form.append("operations", JSON.stringify(clone))

  const map: { [key: number]: string[] } = {}
  let i = 0
  forEach(files, (paths: any) => {
    map[++i] = paths
  })
  form.append("map", JSON.stringify(map))

  i = 0
  forEach(files, (paths: any, file: any) => {
    // eslint-disable-next-line
    form.append(`${++i}`, file as any)
  })

  return form as FormData
}

type Options = { token?: string }

/**
 * Send a GraphQL document to the server for execution.
 */
// eslint-disable-next-line
export async function hasura<T = any, V = Variables>(
  document: RequestDocument,
  variables?: V,
  options?: Options,
  headers?: HeadersInit
): Promise<T> {
  // const session = { token: options?.token };
  // This is to update once Next auth has been installed
  // TODO: Once next auth session is implemented, uncomment below
  // const session = options?.token !== undefined ? { token: options.token } : await getSession()
  const resolvedDoc = isString(document) ? document : print(document)

  const body = createRequestBody(resolvedDoc, variables)

  const requestHeaders: HeadersInit = new Headers(headers)
  if (isString(body)) requestHeaders.set("Content-Type", "application/json")
  // if (session?.token) requestHeaders.set("Authorization", `Bearer ${session.token}`)
  // Uncomment to make requests as super access user
  // requestHeaders.set("x-hasura-admin-secret", `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`)

  const response = await fetch(process.env.NEXT_PUBLIC_HASURA_URL || "", {
    method: "POST",
    headers: requestHeaders,
    body,
  })

  const contentType = response.headers.get("Content-Type")
  const result =
    contentType && startsWith(contentType, "application/json")
      ? await response.json()
      : await response.text()

  if (response.ok && !result.errors && result.data) {
    return result.data
  } else {
    const errorResult = isString(result) ? { error: result } : result
    throw new ClientError(
      { ...errorResult, status: response.status, headers: response.headers },
      { query: resolvedDoc, variables }
    )
  }
}
