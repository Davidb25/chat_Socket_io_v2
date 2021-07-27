// La base coté serveur
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// On retourne le fichier index.html (affichage coté client)
app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
})


// On va dire à Socket.io (coté serveur) qu'on va écouter tous les clients qui se connectent et se déconnectent. 
// (io.on : j'écoute / io.emit : j'envoie)

// Sur chaque utilisateur qui se connecte, on exécute une fonction avec la socket en paramètre
io.on('connection', function(socket){
    console.log('Un utilisateur est connecté');
    socket.on('disconnect', function(){
        console.log('Un utilisateur est déconnecté');
    })
    socket.on('chat_message', function(msg){
        console.log('message recu ' + msg);
        io.emit('chat_message' ,msg);
    })
})


// Pour lancer le serveur
http.listen(3000, function(){
    console.log('Serveur running in port 3000');
})
