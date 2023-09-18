import React from 'react'

const Footer = ({length}) => {
  let style = {
    textAlign: "center"
  }
    let date = new Date();
  return (
    <footer>
        <p style={style}>{length} list { length === 1 ? "item" : "items"}</p>
        <h4>copywrite &copy; {date.getFullYear()}</h4>
    </footer>
  )
}

export default Footer