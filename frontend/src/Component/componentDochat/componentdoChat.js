import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ComponentDoChat({name, value, Cont, users, onChangeName, onChangeValue, Envia, messages, socket}){
    const dispatch = useDispatch()
    const history = useHistory()
    const name2 = (name+Cont)
    function MessagesBlock(){
        return messages.length>0&&messages.map((valor, indice)=>(
           valor.enterOrExit?
        (<span key={indice} className='span-enterExit' key={indice} style={{color:'red',margin: '3px auto', textAlign:'center', fontWeight:'bold'}}>{valor.name?valor.name:'Alguém'}{valor.value}</span>)
           :
        (valor.name===name2?(<div key={indice} className="div-chat-central"><span key={indice} className="span-meu meu"> {valor.value}</span></div>):(<div key={indice}><span className='span-meu cliente'><b> {valor.name.slice(0,-2)}</b>: {valor.value}</span></div>))
           
           
       ))

   }


 
   useEffect(()=>{
    document.querySelector('.chat-message').scrollTo(0,document.querySelector('.chat-message').scrollHeight+3000)
    
   },[messages,socket])
   
     function Leave(){
    history.push('/')
    }
    
        
   

   

    return (
        <div className="chat-funcional">
        <button onClick={Leave} >Sair </button>
        <button onClick={()=>{dispatch({type:'ADD_WARNING', data: true})}}>Usuarios <span>{users.length}</span></button>
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

        <div >
        {MessagesBlock()}
        
        </div>
           
        </div>
        <input className="chat-input" 
        onKeyDown={Envia}  onChange={onChangeValue} value={value} name="value" type="text" placeholder="digite a mensagem"/>
    </div>
    
    )
}

export default ComponentDoChat;