import React,{ useState, useEffect } from 'react';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";
import { Button, TextField } from '@material-ui/core';
import './Todo.css';
import { db } from './firebase';
import Todo from './Todo';

function App() {

  const [results,setResults] = useState([]);
  const [isloading,setLoading] = useState(true);
  // console.log(results);
  const [input,setInput] = useState('');
  // when the app loads, we need to listen to the datavbase and featch new todos as they get addded/romoved
  useEffect(() => {
      // featch Data From Firebase Cloude Database
      //  write query for todo list display timestamp help
      const q = query(collection(db,'todos'), orderBy('timestamp','desc'));
      // Get Cloud Data Here...
      getDocs(q).then(snapshot => {
        setResults(snapshot.docs.map((doc)=>({id:doc.id,todo: doc.data().todo})));
        setLoading(false);
      })
  },[results]);
 
 
  const onChangeInput = (event) => {
      setInput(event.target.value);
  }
  const onClickTodoAdd = () => {
    // Add todo to firebase Cloude Database
      addDoc(collection(db,"todos"), {
      todo: input,
      timestamp:serverTimestamp()
    });
    setLoading(false);
    setInput(''); //Clear Input Here.
  }
  if(isloading){
      return <div style={{color:'red',height:'100vh',display: 'flex',justifyContent: 'center',alignItems:'center'}}><h1>Loading...</h1></div>
  }
  return (
    <div className="container">
        <div className="heading">
            <h1>Welcome To Todo App !</h1>
            <p>Add Tomorrow Work Here</p>
        </div>
        <div className="form">
        <form>
          <TextField value={input} id="standard-basic" label="write todo here..." onChange={onChangeInput} />
          <Button className="btn" disabled={!input} variant="contained" color="primary" onClick={onClickTodoAdd}>
              Add Todo
          </Button>
        </form>
        </div>
        <div className="list_div">
          {results.map((item)=>(
            <Todo key={item.id} item={item} />
          ))}
        </div>
    </div>
  );
}

export default App;
