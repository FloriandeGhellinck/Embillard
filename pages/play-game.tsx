import React from "react"
import { GamesTable } from "../components/games-table"
import NewGameModal from "../components/newGameModal"

const Play = () => {
  return (
    <div className="h-full font-poppins bg-gradient-to-r from-embie-blue-light-300 via-embie-yellow-200 to-embie-orange-200 ">
      <div className="flex flex-col items-center justify-center pt-28">
        <NewGameModal />
        <div className="justify-center w-8/12 border-rounded-full">
          <div className="relative sm:py-16">
            <div className="mx-auto max-w-md sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8w-8/12">
              <GamesTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Play
