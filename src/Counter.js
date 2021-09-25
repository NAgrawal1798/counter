import React, { useEffect, useState } from "react";
import "./App.css";
import CounterValue from "./CounterValue.jsx";
  
const Counter = () => {
  const [counter, setCounter] = useState();
  const [updateAPI, setUpdateAPI] = useState(false);
  const [loader, setLoader] = useState(false);
  const insertUrl = 'https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json'
  const fetchdataUrl = 'https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/17104053.json'

  const increment = () => {
    if((counter+1)>1000){
      return counter;
    }
    setCounter(counter + 1)
  }

  useEffect(async () => {
    try {
      const response = await fetch(fetchdataUrl);
      const data = await response.json();
      if(data == null) {
        setCounter(1);
      }else {
        setCounter(data);
      }
      setUpdateAPI(true);
    }catch {
      alert('Something Went Wrong');
    }
  },[]);

  useEffect(async () => {
    if(counter != null && updateAPI) {
    setLoader(true);
    try{
      const response = await fetch(insertUrl, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          17104053: counter
        })
      });
      const data = await response.json();
      console.log(data);
    }catch(err) {
      alert('Something went Wrong');
    }finally{
      setLoader(false);
    }
  }
  },[counter])

  const decrement = () => {
    setCounter(counter - 1)
  }

  const inputValue = (e) => {
    if(e.target.value>1000){
      return e.target.value;
    }
    if(e.target.value) {
      setCounter(e.target.value);
    }else {
      setCounter(1);
    }
  }
  
  return (
    <div>
      <div style={{display:"flex"}}>
      <div>
      Counter App
      </div>
      {loader && <div style={{marginLeft: "5px"}}>
        Saving Counter value
      </div>}
      </div>
    <div>
        <input value={counter} onChange={inputValue}></input>
      </div>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
      <CounterValue value={counter}/>
    </div>
  )
}
  
export default Counter