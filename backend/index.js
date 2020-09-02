const app = require('express')()
const http = require('http').createServer(app)

const io = require('socket.io').listen(http)

const logados = {}

io.on('connection', (socket)=>{

        socket.on('join', room=>{
             
            
            socket.join(room)
            logados[socket.id]={id:socket.id.slice(0,5), sala: room }
            console.log(logados)

            socket.to(room).emit('entrou', 'Uma pessoa entrou na sala')
            console.log(logados) 

            socket.on('leave',()=>{
                exitRoom({room, socket})
                socket.leaveAll()
                logados[socket.id].sala = undefined
     
            })
        
        
        socket.on('disconnect',()=>{
            exitRoom({room, socket})
        })

        
    })
    
    socket.on('enviaMsg', (msg)=>{
        console.log(logados)
        const { sala } = logados[socket.id]
        socket.to(sala).emit('msgChegou', msg)
    })
    
   

    socket.on('disconnect', ()=>{
        console.log('UM USUARIO DISCONECTOU')
    })
 
    
    
    
})




function exitRoom({room, socket}){
    socket.to(room).emit('saiu', 'Uma pessoa saiu na sala')
}

http.listen(3001, ()=>{
    console.log('Servidor rodando na porta 3001')
})