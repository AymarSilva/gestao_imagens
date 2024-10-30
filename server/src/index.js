import express from "express";
import mostrarImagem from "./controllers/ImagemController.js";
const server = express();
const porta = 5000;

server.get('/', function(req,res){
    res.send({ message: "api rodando em /" });
});

server.get('/public/:nomeImg', mostrarImagem)

server.listen(porta, console.log(`Listening on ${porta}`));