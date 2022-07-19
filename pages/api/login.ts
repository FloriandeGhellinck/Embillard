// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import gql from "graphql-tag";
import type { NextApiRequest, NextApiResponse } from "next";
import { hasura } from "../../utils/gql";
import { serialize } from "cookie";
import getUser from "../../utils/cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  const { email, password } = body;

  const getUserPassword = await hasura(
    gql`
      query GetUsers($id: String) {
        users(where: { e_mail: { _eq: $id } }) {
          first_name
          last_name
          id
          password
        }
      }
    `,
    { id: email }
  );

  console.log(getUserPassword);

  if (getUserPassword.users.length === 0) return res.status(404).send("");

  const user = getUserPassword.users[0];

  const passwordFromDB = user.password;
  const playerByFirstName = user.first_name;

  console.log(passwordFromDB === password);

  if (passwordFromDB === password) {
    res.setHeader(
      "Set-Cookie",
      serialize(
        "dataUser",
        JSON.stringify({
          name: playerByFirstName,
          id: user.id,
        }),
        { path: "/", maxAge: 604800 }
      )
    );
    return res.status(200).json({ name: playerByFirstName, id: email });
  }
  res.status(400).send("");

  // res.status(200).json({ isValid: getUserPassword.data.password === password });
}
