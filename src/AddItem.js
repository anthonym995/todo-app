import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItem = ({newItem,setNewItem,handleSubmit}) => {

  const inputRef = useRef()
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addIem">Add Item</label>
      <input ref={inputRef} type="text" id="addItem" placeholder="Add Item" 
        autoFocus 
        required 
        value={newItem} 
        onChange={(e) => setNewItem(e.target.value)}/>
      <button type='submit' aria-label='Add Item' onClick={()=>inputRef.current.focus()}>
        <FaPlus />
      </button>
    </form>
  );
}

export default AddItem