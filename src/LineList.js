import React from 'react'
import { FaTrash } from "react-icons/fa";

const LineList = ({ item, handleCheck, deleteItem }) => {
  return (
    <li className="item" key={item.id} onChange={() => handleCheck(item.id)}>
      <input
        type="checkbox"
        checked={item.isChecked}
        onChange={() => handleCheck(item.id)}
      />
      <label
        style={item.isChecked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.data}
      </label>
      <FaTrash role="button" tabIndex="0" onClick={() => deleteItem(item.id)} />
    </li>
  );
};

export default LineList