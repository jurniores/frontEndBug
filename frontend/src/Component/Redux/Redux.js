import { createStore } from 'redux';
import io from 'socket.io-client';

const socket = io('http://143.255.73.80:3001/')
const initialState = {
       socket,
       valida:false,
       EnterExit: false
}
function reducer(state=initialState, action){
       if(action.type==='ADD_WARNING') return {...state, valida:action.data, EnterExit: action.enter}
       
       
       return state
}

export default createStore(reducer)