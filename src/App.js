import React, { useEffect, useState } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const URL = "http://localhost:3500/items"
  // for list showing
  let [items, setItem] = useState([]);
  // for add new item in a list
  let [newItem, setNewItem] = useState("");
  // for search the listed items
  let [search,setSearch] = useState("");
  // for cathing the errors
  let [fetchError,setFetchError] = useState(null);
  // for checking data is loading or not 
  let [isLoading,setIsLoading] = useState(true)

  useEffect( ()=> {
    const getItems = async () => {
      try {
        const res = await fetch(URL);
        if(!res.ok) throw Error("Data not recieved");
        const listItems = await res.json();
        setItem(listItems);
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false);
      }
    }
    setInterval(()=> {
      (async() => await getItems())();
    },2000)
  }, [])


  let addItem = async (newItem) => {
    let data = newItem
    let id = items.length ? items[items.length -1].id + 1: 1;
    let newAddItem = {id,isChecked:false,data};
    let newEvents = [...items, newAddItem];
    setItem(newEvents);

    const postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAddItem)
    }
    const sendData = await apiRequest(URL,postOption);
    if(sendData) setFetchError(sendData);
  }

  let handleCheck = async (id) => {
    const newEvents = items.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item);
    setItem(newEvents);
    let updateId = newEvents.filter( (item)=> item.id===id)
    
    const updateOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({isChecked:updateId[0].isChecked})
    }
    const updateReq = `${URL}/${id}`;
    const sendData = await apiRequest(updateReq,updateOption);
    if(sendData) setFetchError(sendData);

  };

  let deleteItem = async (id) => {
    const newEvents = items.filter((item) => item.id !== id);
    setItem(newEvents);
    const deleteOption = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: null
    }
    const deleteReq = `${URL}/${id}`;
    const sendData = await apiRequest(deleteReq,deleteOption);
    if(sendData) setFetchError(sendData);
  };

  // input component handling
  let handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem("")
  }

  return (
    <div className="App">
      <Header title="To Do List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>

        {isLoading && <p style={{ marginTop: "20%" }}>Lodaing...</p>}

        {fetchError && (
          <p style={{ marginTop: "20%" }}> {`Error: ${fetchError}`} </p>
        )}

        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.data.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            deleteItem={deleteItem}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
