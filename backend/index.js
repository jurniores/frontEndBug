const app = require('express')()
const http = require('http').createServer(app)

const io = require('socket.io').listen(http)

const logados = {}
const logadosChat = {}

io.on('connection', (socket)=>{

        socket.on('join', room=>{
             
            
            socket.join(room)
            logados[socket.id]={id:socket.id.slice(0,5), sala: room }
            if(logadosChat[room]) {
                io.to(room).emit('UsersLogado', logadosChat[room])
            }else {
                logadosChat[room]=[]
            }
            
            

            socket.to(room).emit('EntrouSaiu', {value:' entrou na sala', name: false})
            
            
            socket.on('leave',()=>{
                Diconectado({socket, room})
                if(!logados[socket.id]) return
                socket.leaveAll()
            })
            
        
        
       
       

        

        
    })
   
    
    socket.on('enviaMsg', (msg)=>{
        if(!logados[socket.id])return
        

        const { sala } = logados[socket.id]
        
        if(logados[socket.id].name !== msg.name){
            logados[socket.id].name = msg.name
            logadosChat[sala].push(msg.name)
            
            io.to(logados[socket.id].sala).emit('UsersLogado', logadosChat[sala])
            
        }
        
        io.to(sala).emit('msgChegou', msg)
        
    })
    
   

    socket.on('disconnect', ()=>{

        if(!logados[socket.id]) return
        Diconectado({socket, room:logados[socket.id].sala})
        delete logados[socket.id]
        
    })
 
    
   
    
})



function Diconectado({socket, room}){
    io.to(room).emit('EntrouSaiu', {value:' saiu da sala', name: logados[socket.id].name?logados[socket.id].name:false})
    for(let i in logadosChat[room]){
        if(logadosChat[room][i]===logados[socket.id].name){
             logadosChat[room].splice(i,1) 
             
             io.to(room).emit('UsersLogado', logadosChat[room])
        } 
    }
      
}





http.listen(3001, ()=>{
    console.log('Servidor rodando na porta 3001')
})