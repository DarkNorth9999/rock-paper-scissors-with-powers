import React from "react"

export default function InformationCard() {
  return (
    <div id="info-container">
      <section id="result">
        <div id="info-card">
          {
            <div>
              <h3>
                <div id="headContent">
                <h1>Instruction Manual</h1>
                </div>
                <br />
                  <div className="centered-div">
                    <img className="info-png" src="elementalBoost.png" alt />
                  </div>
                  <div className="colorTeal"> Element Boost</div>
                  <div className="centered-div">Temporarily strengthens a chosen element, making it win
                  against one additional element.</div>
                  
                <br />
                
                  <div className="centered-div">
                    <img className="info-png" src="doublePoints.png" alt />
                  </div>
                  <div className="colorRed">Double Points</div>
                  <div className="centered-div">The next winning round grants double points.</div>
                  
                
                <br />
                <div>
                  <div className="centered-div">
                    <img className="info-png" src="Prediction.png" alt />
                  </div>
                  <div className="colorDarkGreen">Prediction</div>
                  <div className="centered-div">Reveals the computer's next choice.</div>
                  
                </div>
                <br />
                <div>
                  <div className="centered-div">
                    <img className="info-png" src="Shield.png" alt />
                  </div>
                  <div className="colorShieldGreen">Shield</div>
                  <div className="centered-div">Negates the effect of the next loss.</div>
                  
                </div>
                <br />
                <div>
                  <div className="centered-div">
                    <img className="info-png" src="elementalSwap.png" alt />
                  </div>
                  <div className="colorOrange">Element Swap</div>
                  <div className="centered-div">Allows changing the chosen element after reveadivng the
                  computer’s choice.</div>
                  
                </div>
                <br />
              </h3>
            </div>
          }
        </div>
      </section>
    </div>
  )
}
