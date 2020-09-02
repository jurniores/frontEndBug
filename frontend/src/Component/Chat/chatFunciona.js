import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './chatFunctional.css';


const cor = (Math.floor(Math.random()*250))
const cor2 = (Math.floor(Math.random()*250))

function Chat (){
    const dispatch = useDispatch()
    const {socket, room} = useSelector(state=>state)
    const [value, setValue] = useState('')
    const [name, setName] = useState('')
    const [validate, setValidate]= useState(true)

    
    const { id } = useParams()
    var div = useRef()
    
    function onChangeValue(e){

        setValue(e.target.value)   
    }
    function onChangeName(e){

        setName(e.target.value)   
    
    }
    function Envia (e){
        if(e.keyCode === 13) {
            setValue('')
           
            div.current = document.querySelector('.chat-message')
            
            div.current.innerHTML += `<span style="color:rgb(70, ${cor2}, ${cor}); text-align: left;"><i><u><b>Você</b></u></i><br> ${value}</span><br>`
            div.current.scrollTo(0,3000)
            socket.emit('enviaMsg', {value, name, cor, cor2 })
            
        }
    }
    function Disconect (){
        socket.emit('leave')
        

    }
    function conected (){
        socket.emit('join', id)
         

    }
    
    useEffect(()=>{
        setValidate(true)
        console.log(id, room)
        if(id === room) return
        dispatch({type: 'ADD_ROOM', data: id})
        socket.emit('join', id)
        socket.on('entrou', (msg)=>{
            
            div.current = document.querySelector('.chat-message')
            div.current.innerHTML += `<span style="color:red; margin:0px auto; text-align: center;">${msg}</span><br>`
        })
        
        socket.on('saiu', (msg)=>{
            div.current = document.querySelector('.chat-message')
            div.current.innerHTML += `<span style="color:red; margin:0px auto; text-align: center;">${msg}</span><br>`
        })

        
        socket.on('msgChegou', (msg)=>{
            /*setNewValue([...newValue,{
                name:msg.name,
                value: msg.value
            }])*/
            div.current = document.querySelector('.chat-message')
            div.current.innerHTML += `<span style="color:rgb(70, ${msg.cor2}, ${msg.cor}); margin-left: auto; text-align: right;"><i><u><b>${msg.name}</b></u></i><br> ${msg.value}</span><br>`
            div.current.scrollTo(0,3000)
            var audio = new Audio('/audio.mp3')
            audio.play()
            
           
        })
        
    },[])
    
   



    return (
    <div className="chat-funcional">
        <button onClick={()=>{
        Disconect()
        
        }}>Disc</button>
        <button onClick={conected}>liga</button>
        <input type="text" 
        onChange={onChangeName} 
        maxLength="7"
        className="chat-name" 
        name="name"
        value={name}
        placeholder="Seu nome"
           />
        <span style={{
            color:'white'
        }}>SALA 1</span>
        <div className="chat-message">
        
        </div>
        <input className="chat-input" 
        onKeyDown={Envia}  onChange={onChangeValue} value={value} name="value" type="text" placeholder="digite a mensagem"/>
    </div>
    )
}


export default Chat;