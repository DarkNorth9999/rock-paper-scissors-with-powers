import React, { useEffect, useState } from "react"
import PickWinnerx from "./PickWinnerx"
import BetterButton from "./BetterButton"
import ScoreCard from "./ScoreCard"
import ImageButton from "./ImageButton"

export default function GameSequence({ userName, setUserName }) {
  if (userName === undefined) setUserName("Player")
  let buttonClicks = 0
  console.log(userName)

  const victorComputer = "Computer Won!"
  const victorUser = `${userName} Won!`
  const tieMessage = "Its a TIE!"

  const move = { 1: "Rock", 2: "Paper", 3: "Scissors" }

  const powerUpOptions = {
    1: "Elemental Boost",
    2: "Double Points",
    3: "Prediction",
    4: "Shield",
    5: "Elemental Swap",
  }

  /*
1 Element Boost: Temporarily strengthens a chosen element, making it win against one additional element.
2 Double Points: The next winning round grants double points.
3 Shield: Negates the effect of the next loss.
4 Prediction: Reveals the computer's next choice.
5 Element Swap: Allows changing the chosen element after revealing the computer’s choice.
*/

  const [round, setRound] = useState(0)
  const [powerUp, setPowerUp] = useState(0)
  const [userChoiceString, setUser] = useState(null)
  const [computerChoiceString, setComputer] = useState(null)
  const [winner, setWinner] = useState(null)
  const [userScore, setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [scoreCard, setScoreCard] = useState(false)

  const [userScoreList, setUserScoreList] = useState([])
  const [computerScoreList, setComputerScoreList] = useState([])
  const [winnerList, setWinnerList] = useState([])

  const [itrV, setItr] = useState(round)
  const [powerUpMessage, setPowerUpMessage] = useState("")
  const [hideScores, setHideScores] = useState(true)

  const [selectRock, setSelectRock] = useState(false)
  const [selectPaper, setSelectPaper] = useState(false)
  const [selectScissors, setSelectScissors] = useState(false)

  const [powerChecker, setPowerChecker] = useState(0)
  const [lockPwShield, setLockPwShied] = useState(false)
  const [lockPwEleBoost, setLockPwEleBoost] = useState(false)
  const [lockPwEleSwap, setLockPwEleSwap] = useState(false)
  const [lockPwPrediction, setLockPwPrediction] = useState(false)
  const [lockPwEleDP, setLockPwDP] = useState(false)
  const [powerSelected, setPowerSelected] = useState(false)
  const [togglePmVisibility, setTogglePmVisibility] = useState(false)
  const [togglePEffectsVisibility, setTogglePEffectsVisibility] =
    useState(false)
  const [shieldEffect, setShieldEffect] = useState(false)
  const [doublePointsEffect,setDoublePointsEffect] = useState(false);
  const [elementalBoostEffect,setElementalBoostEffect] = useState(false);

  const [nextMoveVal, setNextMoveVal] = useState(0)
  const [lastComputerChoice, setLastComputerChoice] = useState(0)

  let lastUsedPowerUp = 0
  let powerUpFirstMessage = ""

  useEffect(() => {
    powerUpFirstMessage = "You Got a Power Up! Your Power: "
    console.log("PowerUp state updated: ", powerUp)
    if(powerUp==2){
      lastUsedPowerUp=2;
      setDoublePointsEffect(true);
    }
    if(powerUp===1){
      setElementalBoostEffect(true);
      lastUsedPowerUp=1;
    }
    if (powerUp === 3) {
      lastUsedPowerUp = 3
      //   let val = Math.floor(Math.random() * 3 + 1)
      //   SetNextMoveVal val
      const temp = Math.floor(Math.random() * 3 + 1)
      console.log(temp)
      setNextMoveVal(temp)
      //setNextMoveVal(nextMoveVal)
      setPowerUpMessage("Next Move is " + move[temp] + "!!!")
    }
    if (powerUp === 4) {
      lastUsedPowerUp = 4
      setShieldEffect(true)
    }
    if (powerUp === 5) {
      lastUsedPowerUp=5
      swapPowerFunction()
    }
  }, [powerUp])

  useEffect(() => {
    setUserScoreList((arr) => [...arr, userScore])
    setComputerScoreList((arr) => [...arr, computerScore])
    if (winner === 1) {
      setWinnerList((arr) => [...arr, victorUser])
    } else if (winner === 2) {
      setWinnerList((arr) => [...arr, victorComputer])
    } else if (winner === 3) {
      setWinnerList((arr) => [...arr, tieMessage])
    }
  }, [computerScore, userScore])

  useEffect(() => {
    powerUpFirstMessage = ""
  }, [userChoiceString])

  function lockingAllPowers() {
    setLockPwShied(true)
    setLockPwEleBoost(true)
    setLockPwPrediction(true)
    setLockPwEleSwap(true)
    setLockPwDP(true)
  }

  function setItrV() {
    setItr(round)
  }

  function settingLists(userScore, computerScore, victor) {
    setUserScoreList((arr) => [...arr, userScore])
    setComputerScoreList((arr) => [...arr, computerScore])
    setWinnerList((arr) => [...arr, victor])
    console.log(userScore)
    console.log(computerScore)
    console.log(victor)
  }

  const computerVictory = () => {
    setWinner(2)
    if (shieldEffect === true) {
      setPowerUpMessage("Shield Activated! Round Effects Nullified!")
      setTogglePEffectsVisibility(false)
      setShieldEffect(false)
    } else {
      setComputerScore((computerScore) => computerScore + 1)
    }
    //settingLists(userScore, computerScore, victorComputer)
  }

  function userVictory() {
    setWinner(1)
    if (doublePointsEffect === true) {
      lastUsedPowerUp = 2
      setPowerUpMessage("Double Points!!!")
      setUserScore((userScore) => userScore + 2)
      setDoublePointsEffect(false);
    } else setUserScore(userScore + 1)
    //settingLists(userScore, computerScore, victorUser)
  }

  function bothTie() {
    setWinner(3)
    settingLists(userScore, computerScore, tieMessage)
  }

  const gameLogic = (userChoice, computerChoice) => {
    setLastComputerChoice(computerChoice)
    // lastComputerChoice = computerChoice
    if (userChoice === 1) {
      if (computerChoice === 3) {
        userVictory()
      } else if (computerChoice === 2) {
        if (elementalBoostEffect === true) {
          lastUsedPowerUp = 1
          setPowerUpMessage("Elemental Boost!!!")
          userVictory()
        } else computerVictory()
      } else {
        bothTie()
      }
    } else if (userChoice === 2) {
      if (computerChoice === 3) {
        if (elementalBoostEffect === true) {
          lastUsedPowerUp = 1
          setPowerUpMessage("Elemental Boost!!!")
          userVictory()
        } else computerVictory()
      } else if (computerChoice === 2) {
        bothTie()
      } else {
        userVictory()
      }
    } else if (userChoice === 3) {
      if (computerChoice === 3) {
        bothTie()
      } else if (computerChoice === 2) {
        userVictory()
      } else {
        if (elementalBoostEffect === true) {
          lastUsedPowerUp = 1
          setPowerUpMessage("Elemental Boost!!!")
          userVictory()
        } else computerVictory()
      }
    }
  }

  function selectUserChoice(userChoice) {
    if (userChoice == 1) {
      setSelectRock(true)
      setSelectPaper(false)
      setSelectScissors(false)
    } else if (userChoice == 2) {
      setSelectRock(false)
      setSelectPaper(true)
      setSelectScissors(false)
    } else if (userChoice == 3) {
      setSelectRock(false)
      setSelectPaper(false)
      setSelectScissors(true)
    }

    gameSequence(userChoice)
  }

  function gameSequence(userChoice) {
    setTogglePmVisibility(false)
    if (togglePEffectsVisibility == false) {
      setPowerUpMessage("")
    }
    buttonClicks++
    showScores()

    if (powerChecker === 0) {
      lockingAllPowers()
      setPowerChecker(1)
    }

    grantPower(checkPowerUp())

    setRound(round + 1)
    // if (nextMove == null)

    let computerChoice

    console.log("NEXT", nextMoveVal)
    if (nextMoveVal !== 0) {
      console.log("lets see", nextMoveVal)
      computerChoice = nextMoveVal
      setNextMoveVal(0)
    } else computerChoice = Math.floor(Math.random() * 3 + 1)

    // if (powerUp === 3) {
    //   nextMoveVal = Math.floor(Math.random() * 3 + 1)
    //   console.log("next move is ", nextMoveVal)
    // }

    // console.log(computerChoice)
    setUser(move[userChoice])
    setComputer(move[computerChoice])

    // if (nextMove != null) {
    //   setComputerChoice(nextMoveVal)

    //   setNextMove(null)
    // }

    // console.log("this is here to check if it will work", powerUp)

    //useEffect

    console.log("hello, the next move is this: ", computerChoice)

    gameLogic(userChoice, computerChoice)
    setPowerUp(null)
    setPowerSelected(false)
  }

  function swapPowerFunction() {
    setPowerUpMessage("Elemental Swap!!!")
    setWinnerList((arr) => arr.slice(0, -1))
    setUserScoreList((arr) => arr.slice(0, -1))
    setComputerScoreList((arr) => arr.slice(0, -1))

    setNextMoveVal(lastComputerChoice)

    if (winner === 1) {
      if (lastUsedPowerUp === 2) setUserScore((userScore) => userScore - 2)
      else if (lastUsedPowerUp !== 4) setUserScore((userScore) => userScore - 1)
    } else if (winner === 2) {
      setComputerScore((computerScore) => computerScore - 1)
    }

    //setRound((round) => round - 1)
  }

  const toggleScoreCard = () => {
    if (scoreCard == false) {
      setScoreCard(true)
    } else if (scoreCard == true) {
      setScoreCard(false)
    }
  }

  function checkPowerUp() {
    if (powerSelected === true) return null
    let booleanPower = false
    if (buttonClicks % 10 === 0) {
      booleanPower = true
    }

    if (
      userScore[round - 3] === userScore[round - 2] &&
      userScore[round - 2] === userScore[round - 1]
    ) {
      booleanPower = true
    }

    if (Math.random() === 0) booleanPower = true

    if (booleanPower === true) {
      const powerDrawn = Math.floor(Math.random() * 5 + 1)
      console.log("Power drawn: ", powerDrawn)
      return powerDrawn
    } else return null
  }

  function showScores() {
    setHideScores(false)
  }

  function activatePower(powerNum) {
    if (powerNum === 5 && round === 0) {
      console.log("You can't select Elemental Swap without playing!")
      return
    }
    if (powerSelected === true) {
      console.log(
        "You cannot selected a power, when one power is already active"
      )
      return
    }
    setPowerSelected(true)
    if (powerChecker === 0) lockingAllPowers()
    let booleanPower = checkPowerStatus(powerNum)
    if (booleanPower === false) return

    setPowerUp(powerNum)
    setTogglePmVisibility(true)
  }

  function checkPowerStatus(powerNum) {
    switch (powerNum) {
      case 1: {
        if (lockPwEleBoost === true) return false
        else {
          setLockPwEleBoost(true)
          return true
        }
      }
      case 2: {
        if (lockPwEleDP === true) return false
        else {
          setLockPwDP(true)
          return true
        }
      }
      case 3: {
        if (lockPwPrediction === true) return false
        else {
          setLockPwPrediction(true)
          return true
        }
      }
      case 4: {
        if (lockPwShield === true) return false
        else {
          setLockPwShied(true)
          return true
        }
      }
      case 5: {
        if (lockPwEleSwap === true) return false
        else {
          setLockPwEleSwap(true)
          return true
        }
      }
      default:
        return false
    }
  }

  function grantPower(powerIndex) {
    switch (powerIndex) {
      case 1: {
        setLockPwEleBoost(false)
        return
      }
      case 2: {
        setLockPwDP(false)
        return
      }
      case 3: {
        setLockPwPrediction(false)
        return
      }
      case 4: {
        setLockPwShied(false)
        return
      }
      case 5: {
        setLockPwEleSwap(false)
        return
      }
      default:
        console.log("No power Granted this round")
        return null
    }
  }

  return (
    <div>
      <main>
        <div>
          <header id="headContent">
            <p>
              <div>Round: {round}</div>
              <div>Pick your choice</div>
              <br />
              <div id="scores">
                {hideScores && <div>Please Select your move!</div>}
                {!hideScores && (
                  <div>
                    {userName}'s Score: {userScore}
                  </div>
                )}
                {!hideScores && <div>Computer's Score: {computerScore}</div>}
              </div>
            </p>
          </header>
          <section id="gameChoices">
            <menu>
              <div id="rpsChoice">
                <BetterButton
                  isSelected={selectRock}
                  filename="Rock.png"
                  onSelect={() => selectUserChoice(1)}
                  option={0}
                >
                  Rock
                </BetterButton>
                <BetterButton
                  filename="Paper.png"
                  isSelected={selectPaper}
                  onSelect={() => selectUserChoice(2)}
                  option={0}
                >
                  Paper
                </BetterButton>
                <BetterButton
                  filename="Scissors.png"
                  isSelected={selectScissors}
                  onSelect={() => selectUserChoice(3)}
                  option={0}
                >
                  Scissors
                </BetterButton>
              </div>
            </menu>
          </section>
        </div>
        <div>
          <section id="gameChoicesImg">
            <menu>
              <div id="powerS">
                <ImageButton
                  onSelect={() => activatePower(1)}
                  powerLock={lockPwEleBoost}
                  filename="elementalBoost"
                >
                  Elemental Boost
                </ImageButton>
                <ImageButton
                  onSelect={() => activatePower(2)}
                  powerLock={lockPwEleDP}
                  filename="doublePoints"
                >
                  Double Points
                </ImageButton>
                <ImageButton
                  onSelect={() => activatePower(3)}
                  powerLock={lockPwPrediction}
                  filename="Prediction"
                >
                  Prediction
                </ImageButton>
                <ImageButton
                  onSelect={() => activatePower(4)}
                  powerLock={lockPwShield}
                  filename="Shield"
                >
                  Shield
                </ImageButton>
                <ImageButton
                  onSelect={() => activatePower(5)}
                  powerLock={lockPwEleSwap}
                  filename="elementalSwap"
                >
                  Elemental Swap
                </ImageButton>
              </div>
            </menu>
          </section>
        </div>

        <section id="result">
          <div>
            <div>
              {{ userChoiceString } && (
                <div>
                  <h3>
                    {userName}'s Choice:{" "}
                    <h3 className="inlineHead">{userChoiceString}</h3>
                  </h3>
                </div>
              )}
            </div>
            <div>
              {{ computerChoiceString } && (
                <div>
                  <h3>
                    Computer's Choice:{" "}
                    <h3 className="inlineHead">{computerChoiceString}</h3>
                  </h3>
                </div>
              )}
            </div>
            <div>{<PickWinnerx userNameW={userName} winner={winner} />}</div>
            <div id="powerUp">
              <h3>
                {togglePmVisibility === true && (
                  <div>
                    You Got a Power Up! Your Power:{" "}
                    <h3 className="inlineHead">{powerUpOptions[powerUp]}</h3>
                    <br />
                  </div>
                )}
                {powerUpMessage.length > 0 && (
                  <div>
                    <div>
                      {/* X power is active */}
                      <h3 className="inlineHeadOrange">{powerUpMessage}</h3>
                    </div>
                  </div>
                )}
              </h3>
            </div>
          </div>
        </section>
      </main>
      <section id="gameChoices">
        <menu>
          <div id="scoreCard">
            <BetterButton
              onSelect={() => toggleScoreCard()}
              isSelected={scoreCard}
              btnNumber={4}
              filename=""
              option={1}
            >
              ScoreCard
            </BetterButton>
          </div>
        </menu>
      </section>

      <div>
        {scoreCard && (
          <ScoreCard
            itr={itrV}
            onClick={setItrV}
            userScores={userScoreList}
            computerScores={computerScoreList}
            winners={winnerList}
            rounds={round}
          />
        )}
      </div>
    </div>
  )
}
