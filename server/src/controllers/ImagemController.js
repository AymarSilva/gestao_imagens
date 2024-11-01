import path from "path";
import url from "url";
import updateImagem, { createImagem, deleteImage, showImagens, showOneImage } from "../models/ImagemModel.js";
import { stat } from "fs";

const fileName = url.fileURLToPath(import.meta.url);
console.log("fileName url: ", fileName);

// Dir da pasta de fileName
const dirName = path.dirname(fileName);

export async function criarImagem(req, res) {
  console.log("ImagemController :: Criando Imagem");

  const { descricao } = req.body;
  const { caminho } = req.files;

  if (!descricao || !caminho) {
    res.status(400).json({ message: "Imagem e descrição são obrigatórios" });
  } else {
    const extensao = path.extname(caminho.name).toLocaleLowerCase();
    const extPermitidas = ['.jpg', '.jpeg', '.png'];

    if (extPermitidas.includes(extensao)) {
      const nomeImagem = `${Date.now()}${extensao}`;

      try {
        const [status, resposta] = await createImagem(descricao, nomeImagem, caminho);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "ImagemController :: Erro" });
      };

    } else {
      res.status(415).json({ message: "Arquivo inválido" });
    }
  };
};

export async function mostrarImagens(req, res) {
  console.log("ImagemController :: Mostrando lista de imagens");
  try {
    const [statusCode, resposta] = await showImagens();
    res.status(statusCode).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ImagemController :: Erro" });
  };
};

export async function editarImagem(req, res) {

  const { descricao } = req.body;
  const { idImagens } = req.params;

  console.log("ImagemController :: EditandoImagem");

  try {
    const [statusCode, resposta] = await updateImagem(descricao, idImagens);
    res.status(statusCode).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro na Api" })
  };

};

export default async function enviarImagem(req, res) {
  console.log("ImagemController :: Mostrando imagem");

  const { nomeImg } = req.params;

  //Acessando a pasta img a partir de controllers
  const caminho = path.join(dirName, '..', '..', 'public', 'img', nomeImg);
  console.log("caminho: ", caminho);

  res.sendFile(caminho, (err) => {
    if (err) {
      console.log("falha envio de imagem: ", err);
      res.status(404).json({ message: "Imagem não encontrada" });
    };
  });
};

export async function deletarImagem(req, res) {

  const { idImagens } = req.params;

  try {
    const [statusCode, retorno] = await deleteImage(idImagens);

    if (retorno.affect) {
      
    }

    res.status(statusCode).json(retorno);
  } catch (error) {
    console.log(error);
    return res.send(500).json({ erro: error });
  };

};

export async function mostrarUmaImagem(req, res) {
  console.log("ImagemController :: mostrarUmaImagem");
  const { idImagens } = req.params;

  try {
    const [statusCode, retorno] = await showOneImage(idImagens);
    const caminho = path.join(dirName, '..', '..', 'public', 'img', retorno[0].caminho);
    res.status(statusCode).sendFile(caminho, (err) => {
      if (err) {
        console.log("Imagem não encontrada");
        res.status(404).json({ message: "Imagem não encontrada" });
      };
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error });
  };
};