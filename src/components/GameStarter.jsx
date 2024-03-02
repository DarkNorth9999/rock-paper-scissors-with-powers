import React from "react"
import { useState } from "react"
import WelcomeScreen from "./WelcomeScreen"
import GameSequence from "./GameSequence"
import InfoIcon from "./InfoIcon"
import InformationCard from "./InformationCard"
import StartGameHeader from "./StartGameHeader"
import StartInformationPanel from "./StartInformationPanel"



export default function Home() {
  const [gameSequence, setGameSequence] = useState(false)
  const [userNameS, setUserNameS] = useState()
  const [showImage, setShowImage] = useState(false)

  const startGame = () => {
    setGameSequence(true)
  }

  function selectImage() {
    if (showImage === true) setShowImage(false)
    else setShowImage(true)
    console.log("its working")
  }

  return (
    <div >
      <StartGameHeader gameSequence={gameSequence}></StartGameHeader>
        <div>
            {showImage && <InformationCard></InformationCard>}
            {gameSequence && <InfoIcon
              isSelected={showImage}
              showImage={() => selectImage()}
            ></InfoIcon>}
          </div>
        {!gameSequence ? (
          <div>
          <div id="start-page">
            {/* Welcome Screen */}
            <div className="centered-div">
              <div id="rps-logoDiv">
                <img
                  id="rps-logo"
                  src="rpsblack.gif"
                  alt="Rock Paper Scissors Logo Here"
                ></img>
              </div>
            </div>
            <br />
            <div className="centered-div">
              <div>
                <h3>
                  <pre>Enter your Name: </pre>
                </h3>
              </div>
              <input
                className="input"
                type="text"
                value={userNameS}
                onChange={(e) => setUserNameS(e.target.value)}
              ></input>
            </div>
            <WelcomeScreen startGame={() => startGame()} />
        </div>
        <div id="start-page-bottom">
          <StartInformationPanel/>
        </div>
        </div>
      )
      
       : (
      <GameSequence userName={userNameS} setUserName={setUserNameS} />
      )}
       

    </div>
  )
}
