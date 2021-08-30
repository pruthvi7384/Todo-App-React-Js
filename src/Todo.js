import React,{ useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField } from '@material-ui/core';
import { db } from './firebase';
import { deleteDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { DeleteForever, Edit } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    center:{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'transparent',
    },
    paper: {
      width: 400,
      padding:'20px',
      margin:'auto',
      display: 'flex',
      flexDirection: 'column',
      borderRadius:'8px',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
    },
  }));

function Todo({item}) {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [input,setInput] = useState(item.todo);
    
    // Delete todo Iteams
    const todoDelete = async ()=>{
        await deleteDoc(doc(db,`todos/${item.id}`));
    }

    const updateTodo = async ()=>{
        // Update Todo Input Text
        await setDoc(doc(db,`todos/${item.id}`),{
            todo: input,
            timestamp:serverTimestamp()
        },{merge : true});
       setOpen(false);
    }
    return (
        <>
            <Modal
                open={open}
            >
                <div className={classes.center}>
                    <div className={classes.paper}>
                        <h2 style={{paddingBottom:'8px'}}>Edit Your Todo</h2>
                        <TextField  value={input} onChange={event=>setInput(event.target.value)}/>
                        <Button style={{marginTop:'10px'}} variant="contained" color="primary" onClick={updateTodo}>Update Todo</Button>
                    </div>
                </div>
            </Modal>
            <ul className="todo-iteam">
                <li>{item.todo}</li>
                <li>
                    <Button color="primary" onClick={e=>setOpen(true)} > <Edit/> </Button>
                    <Button color="secondary" onClick={todoDelete}><DeleteForever/></Button>
                </li>
            </ul>
        </>
    )
}

export default Todo
