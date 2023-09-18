import React from 'react';
import LineList from './LineList';

const ItemList = ({items,handleCheck,deleteItem}) => {
  return (
    <ul>
      {items.map((item) => (
        <LineList
          item={item}
          key = {item.id}
          handleCheck={handleCheck}
          deleteItem={deleteItem}
        />
      ))}
    </ul>
  );
}

export default ItemList