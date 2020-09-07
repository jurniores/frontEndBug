import React, {useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './chatFunctional.css';

import ChatComponent from '../componentDochat/componentdoChat';
import Users from '../Users/Users';

const Cont = Math.floor(Math.random()*99)

function Chat (){

    const [users, setUsers] =useState([])
    const {socket, valida} = useSelector(state=>state)
    const [value, setValue] = useState('')
    const [name, setName] = useState('')
    const [ messages, setMessages ] = useState([])
    
    
    const { id } = useParams()
 
    
    function onChangeValue(e){

        setValue(e.target.value)   
    }
    function onChangeName(e){

        setName(e.target.value)   
    
    }
   
    function Envia (e){
        
        if(e.keyCode === 13) {
            if(name.length<3)return alert('Voce precisa digitar um nome')
            setValue('')
            if(value.length===0) return
            socket.emit('enviaMsg', {value, name:(name+Cont)})
            
        }
    }
    
    useEffect(()=>{
        socket.once('UsersLogado', msg=>setUsers(msg))
        
        return () => {
            socket.off('UsersLogado');
          };
          /*eslint-disable */
    },[users])
    
    useEffect(()=>{
        socket.once('msgChegou', msg=>setMessages([...messages, msg]))
        socket.once('EntrouSaiu', (msg)=>{
           return setMessages([...messages, {...msg, enterOrExit: true}])
        }
            )
            
       
       
        return () => {
            socket.off('msgChegou');
            socket.off('EntrouSaiu');
          };
        
          

        /*eslint-disable */
    },[messages])

    useEffect(()=>{
        socket.emit('join', id)
        
      
        /*eslint-disable */
    },[id, socket])




    
   



    return (
    !valida?(<ChatComponent  socket={socket} users={users} messages={messages} onChangeName={onChangeName} name={name} Cont={Cont} value={value} onChangeValue={onChangeValue} Envia={Envia} />)
    :
    (<Users users={users}/>)
    )
    
}


export default Chat;