import { createStore } from 'redux';
import io  from 'socket.io-client';

const socket = io('http://143.255.73.80:3001/')



function reducer(state={ socket, io }, action){
       switch(action.type){
              case 'ADD_ROOM': return { ...state, room:action.data}
              default: return state
       }
       

}

export default createStore(reducer)