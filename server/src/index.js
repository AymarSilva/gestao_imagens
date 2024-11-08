import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

import enviarImagem, { deletarImagem, mostrarUmaImagem } from "./controllers/ImagemController.js";
import { mostrarImagens,criarImagem ,editarImagem  }
from "./controllers/ImagemController.js";
import { criarUsuario, lerUmUsuario, lerUsuario, logarUsuario } from "./controllers/UsuarioController.js";

const server = express();
const porta = 5000;

server.use(fileUpload());
server.use(express.json());
server.use(cors());

server.get('/', function(req,res){
    res.send({ message: "api rodando em /" });
});

server.get('/public/:nomeImg', enviarImagem);

server.get("/usuario", lerUsuario);
server.get("/usuario/:id", lerUmUsuario)
server.post('/usuario', criarUsuario);

server.post("/login", logarUsuario);

server.get("/imagem/:idImagens", mostrarUmaImagem);
server.post('/imagem', criarImagem);
server.get("/imagem", mostrarImagens);
server.put("/imagem/:idImagens", editarImagem);
server.delete("/imagem/:idImagens", deletarImagem);

server.listen(porta, console.log(`Listening on ${porta}`));