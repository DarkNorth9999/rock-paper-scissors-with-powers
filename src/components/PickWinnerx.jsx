import React from "react"

export default function PickWinnerx({ winner, userNameW }) {
  let pickedWinner = ""

  if (winner == 1) {
    pickedWinner = `${userNameW} WINS!`
  } else if (winner == 2) {
    pickedWinner = "Computer WINS!"
  } else if (winner == 3) pickedWinner = "Its a TIE"

  return (
    <div>
      <div>
        <h3>
          <div className="inlineHeadTeal">{pickedWinner}</div>
        </h3>
      </div>
    </div>
  )
}
