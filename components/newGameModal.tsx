import gql from "graphql-tag"
import { FC, useState } from "react"
import { useQuery } from "react-query"
import { TypeOfWin } from "../Types/game"
import { hasura } from "../utils/gql"
import Modal from "./modal"

// handleNewGame: (e: { looser: string; date: Date; winner: string; typeOfWin: TypeOfWin }) => void

const NewGameModal: FC = () => {
  const [showModal, setShowModal] = useState(false)

  const handleToggleModal = () => {
    usersQuery.refetch()
    setShowModal(!showModal)
  }

  const usersQuery = useQuery(
    "users",
    () =>
      hasura(
        gql`
          query Users {
            users {
              first_name
              id
            }
          }
        `
      ),
    { enabled: false }
  )

  const users = usersQuery.data?.users

  return (
    <>
      {showModal && users?.length > 0 && (
        <Modal isOpen={showModal} setIsOpen={setShowModal} users={users} />
      )}
      <button
        type="button"
        disabled={usersQuery.isLoading}
        className=" inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-embie-blue-light-600 hover:bg-embie-blue-dark-300"
        onClick={handleToggleModal}
      >
        {usersQuery.isLoading ? "Loading" : "Enter a score"}
      </button>
    </>
  )
}

export default NewGameModal
