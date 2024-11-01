import mysql from "mysql2/promise";
import path from "path";
import url from "url";
// import { } from "fs/promises";
import db from "../config/acesso.js";

const fileName = url.fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const conexao = mysql.createPool(db);

export async function createImagem(descricao, nomeImagem, imagem) {
    console.log(db);
    const sql = `INSERT INTO imagens (descricao, caminho) VALUES (?,?)`;

    const params = [descricao, nomeImagem];

    try {
        await imagem.mv(path.join(dirName, '..', '..', 'public', 'img', nomeImagem));
        const [retorno] = await conexao.query(sql, params);
        return [201, `Imagem criada`]
    } catch (error) {
        console.log(error);
        return [500, error]
    };
};

export default async function updateImagem(descricao, id) {
    console.log("ImagemModel :: updateImagem");
    const sql = "UPDATE imagens set descricao=? where idImagens = ?";

    const params = [descricao, id];

    try {
        const [retorno] = await conexao.query(sql, params);

        if (retorno.affectedRows < 1) {
            return [404, { message: "Imagem não encontrada" }];
        };

        return [200, `Imagem ${id} foi atualizada`];

    } catch (error) {
        console.log(error);
        return [500, "Erro api: ", error];
    };
};

export async function showImagens() {
    console.log("ImagemModel :: showImagens");
    const sql = `SELECT * FROM imagens`;

    try {
        const [retorno] = await conexao.query(sql);
        return [200, retorno];
    } catch (error) {
        console.log("Erro API: ", error);
        return [500, error];
    };
};

export async function deleteImage(id) {
    console.log("ImagemModel :: EditImage");
    const sql = `DELETE FROM imagens WHERE idImagens = ?`;

    try {
        const [retorno] = await conexao.query(sql, [id]);

        if (retorno.affectedRows < 1) {
            return [404, `Imagem ${id} não encontrada`]
        };

        return [200, `Imagem ${id} deletada`]
    } catch (error) {
        console.log(error);
        return [500, { erro: error }];
    };

};

export async function showOneImage(id) {
    console.log("ImagemModel :: showOneImage");
    const sql = `SELECT * FROM imagens WHERE idImagens = ?`;

    try {
        const [retorno] = await conexao.query(sql, [id]);

        if (retorno.affectedRows < 1) {
            return [404, `Imagem ${id} não encontrada`];
        };

        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    };

};