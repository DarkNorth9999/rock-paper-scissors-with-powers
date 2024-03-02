export default function BetterButton({
  children,
  onSelect,
  isSelected,
  filename,
  option,
}) {
  //   let choice
  //   if (option === false) choice = <button onClick={onSelect}>{children}</button>
  //   else
  //     choice = (
  //       <button onClick={onSelect} class={isSelected ? "active" : undefined}>
  //         {children}
  //       </button>
  //     )

  if (isSelected && option === 0) {
    return (
      <div>
        <button onClick={onSelect}>
          {<img id="powerImg" src={filename} alt={children} />}
          {children}
        </button>
      </div>
    )
  } else if (option === 1) {
    return (
      <div>
        <button onClick={onSelect} class={isSelected ? "active" : undefined}>
          {children}
        </button>
      </div>
    )
  } else if (option == 0) {
    return (
      <div>
        <button onClick={onSelect}>
          {<img id="powerImgGray" src={filename} alt={children} />}
          {children}
        </button>
      </div>
    )
  }
}
