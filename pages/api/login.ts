// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import gql from "graphql-tag";
import type { NextApiRequest, NextApiResponse } from "next";
import { hasura } from "../../utils/gql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  const { player, password } = body;

  const getUserPassword = await hasura(
    gql`
      query GetUsers($id: uuid!) {
        users_by_pk(id: $id) {
          password
          first_name
        }
      }
    `,
    { id: player }
  );

  const passwordFromDB = getUserPassword.users_by_pk.password;
  const playerByFirstName = getUserPassword.users_by_pk.first_name;

  console.log(passwordFromDB === password);

  if (passwordFromDB === password) {
    return res.status(200).json({ name: playerByFirstName, id: player });
  }
  res.status(400).send("");

  // res.status(200).json({ isValid: getUserPassword.data.password === password });
}
