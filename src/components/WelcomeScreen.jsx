import React from "react"

export default function WelcomeScreen({ startGame }) {
  return (
    <div onClick={startGame}>
      <section id="gameChoices">
        <menu>
          <button class="inBlockElement">Start Game</button>
        </menu>
      </section>
    </div>
  )
}
