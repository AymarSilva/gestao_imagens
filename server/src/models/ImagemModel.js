import mysql from "mysql2/promise";
import path from "path";
import url from "url";
import { } from "fs/promises";
import db from "../config/acesso.js";

const fileName = url.fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

export async function createImagem(descricao, nomeImagem, imagem) {
    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO imagens (descricao, caminho) VALUES (?,?)`;

    const params = [descricao, nomeImagem];

    try {
        await imagem.mv(path.join(dirName,'..','..','public','img',nomeImagem));
        const [retorno] = await conexao.query(sql,params);
        return [201, `Imagem criada`]
    } catch (error) {
        console.log(error);
        return [500,error]
    };
};