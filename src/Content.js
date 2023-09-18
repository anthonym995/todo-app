import ItemList from "./ItemList";

const Content = ({items,handleCheck,deleteItem}) => {



	return (
    <>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          deleteItem={deleteItem}
        />
      ) : (
        <p style={{ marginTop: "20%" }}>Your list is empty</p>
      )}
    </>
  );
}

export default Content