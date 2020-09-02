import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './chatComponent.css'

function Chat (){
    const {socket, io} = useSelector(state=>state)
    
useEffect(()=>{
    socket.emit('leave')
},[])
    return (
        <>
        
        <div className="chat-centro" >
        <div>Nome: Sala 0</div>
        <div>Id: 123456</div>
        <Link to="/chat/123456"><div>Entrar</div></Link>
        </div>
        
       
        <div className="chat-centro" >
        <div>Nome: Sala 1</div>
        <div>Id: 1234567</div>
        <Link to="/chat/1234567"><div>Entrar</div></Link>
        </div>
        <div className="chat-centro" >
        <div>Nome: Sala 2</div>
        <div>Id: 12345678</div>
        <Link to="/chat/12345678"><div>Entrar</div></Link>
        </div>
        <div className="chat-centro" >
        <div>Nome: Sala 3</div>
        <div>Id: 123456789</div>
        <Link to="/chat/123456789"><div>Entrar</div></Link>
        </div>
        <div className="chat-centro" >
        <div>Nome: Sala 4</div>
        <div>Id: 12345678910</div>
        <Link to="/chat/12345678910"><div>Entrar</div></Link>
        </div>
        </>
    )
    
    
    
    
}

export default Chat;