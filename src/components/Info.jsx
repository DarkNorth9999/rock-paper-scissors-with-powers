import React from "react"

export default function i(isSelected, setShowImage) {
  return (
    <div>
      <button
        onClick={() => {
          setShowImage(true)
        }}
        className={isSelected ? "active" : undefined}
      >
        <img id="info-icon" src="ISymbol.png" alt="Info Icon"></img>
      </button>
    </div>
  )
}
