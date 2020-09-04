import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Users.css'

function Users({users}) {

    const dispatch = useDispatch()
    const history = useHistory()
    

    function LogadosNow(){
        return users.map((valor, index)=>{
        return <span key={index}>{valor}</span>
        })
    }




    function Leave(){
        history.push('/')
    }

    return (
        <div className="users-funcional">
        <button onClick={Leave}>Sair</button>
        <button onClick={()=>{dispatch({type:'ADD_WARNING', data:false})}} >Chat</button>

      
        <div className="users-message">

        {LogadosNow()}
           
        </div>
    </div>
    
    )
}


export default Users;