import React from "react"

export default function InfoIcon({ showImage, isSelected }) {
  return (
    <div onClick={showImage} id="info-icon-hover">
      <img id="info-icon" src="ISymbol.png" alt="Info Icon"></img>
      <div id="info-text">info</div>
    </div>
  )
}
