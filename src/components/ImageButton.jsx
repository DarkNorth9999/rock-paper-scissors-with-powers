import React from "react"

export default function ImageButton({
  children,
  filename,
  powerLock,
  onSelect,
}) {
  const imgFile = "" + filename + ".png"
  //const imgFileGray = "" + filename + "Gray.png"

  if (powerLock === true) {
    return (
      <div>
        {/* <main> */}
        <button onClick={onSelect}>
          {<img id="powerImgGray" src={imgFile} alt={children} />}
          {children}
        </button>
        {/* </main> */}
      </div>
    )
  } else if (powerLock === false) {
    return (
      <div>
        {/* <main> */}
        <button onClick={onSelect}>
          {<img id="powerImg" src={imgFile} alt={children} />}
          {children}
        </button>
        {/* </main> */}
      </div>
    )
  }
}
