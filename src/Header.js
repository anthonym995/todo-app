import React from 'react'

const Header = (props) => {
  return (
    <header>
      <h1 className='title'>{props.title}</h1>
    </header>
  );
}

Header.defaultProps = {
  title:"To Do List"
}
export default Header