import path from "path";
import url from "url";

const fileName = url.fileURLToPath(import.meta.url);
console.log("fileName url: ",fileName);

// Dir da pasta de fileName
const dirName = path.dirname(fileName);


export default async function mostrarImagem(req, res) {
    console.log("ImagemController :: Mostrando imagem");

    const { nomeImg } = req.params;

    //Acessando a pasta img a partir de controllers
    const caminho = path.join(dirName,"..","..",'public','img',nomeImg);
    console.log("caminho: ",caminho);

    res.sendFile(caminho, (err) => {
        if (err) {
          console.log("falha envio de imagem: ",err);
          res.status(404).json({ message: "Imagem não encontrada" });  
        };
    });
};