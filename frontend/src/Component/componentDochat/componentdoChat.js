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
        (<span key={indice} className='span-enterExit' style={{color:'white',margin: '3px auto', textAlign:'center', fontWeight:'bold'}}>{valor.name?valor.name:'Alguém'}{valor.value}</span>)
           :
        (valor.name===name2?(<div key={indice} className="div-chat-central"><span key={indice} className="span-meu meu"> {valor.value}</span></div>):(<div key={indice}><span className='span-meu cliente'> {valor.name.slice(0,-2)}: {valor.value}</span></div>))
           
           
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
        <button className="button-exit" onClick={Leave} >Sair </button>
        <button className="button-exit-2" onClick={()=>{dispatch({type:'ADD_WARNING', data: true})}}>Usuarios <span>{users.length}</span></button>
        <input type="text" 
        onChange={onChangeName} 
        maxLength="7"
        className="chat-name" 
        name="name"
        value={name}
        placeholder="Digite seu nome"
           />
        <div className="chat-message">

        <div >
        {MessagesBlock()}
        
        </div>
           
        </div>
        <input className="chat-input" 
        onKeyDown={Envia}  onChange={onChangeValue} value={value} name="value" type="text" placeholder="Digite a mensagem"/>
    </div>
    
    )
}

export default ComponentDoChat;