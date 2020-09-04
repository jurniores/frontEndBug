import React, {useState, useEffect} from 'react'

import ChatFuncional from '../../Component/Chat/chatFunciona';



function PageChat () {
const [Aprova, setAprova] =useState(false)
useEffect(()=>{
    setAprova(true)
},[])
    return Aprova&&<ChatFuncional/>
}

export default PageChat;