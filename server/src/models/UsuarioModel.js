import mysql from "mysql2/promise";
import db from "../config/acesso.js"

const conexao = mysql.createPool(db);

export async function createUsuario(usuario) {
    console.log("UsuarioModel :: createUsuario");

    const sql = 'INSERT INTO usuarios (login,senha,funcao) VALUES (?,?,?)';

    const params = [
        usuario.login,
        usuario.senha,
        usuario.funcao
    ];

    try {
        await conexao.query(sql, params);
        return [201, { message: 'Usuario Cadastrado' }];
    } catch (error) {
        console.log(error);
        return [500, error];
    };

};

export async function readUsuarios() {

    const sql = `SELECT * FROM usuarios`;

    try {
        const [retorno] = await conexao.query(sql);
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    };
};

export async function readOneUser(id) {
    const sql = `SELECT * FROM usuarios WHERE id = ?`;

    try {
        const [retorno] = await conexao.query(sql, [id]);
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    };
};

export async function authentication(login, senha) {
    console.log("autenticacao ",login,senha)
    console.log("UsuarioModel :: autenticacao");
    const sql = `SELECT id FROM usuarios WHERE login = ? AND senha = ?`;
    const [params] = [login, senha];

    try {
        const [retorno] = await conexao.query(sql, params);
        if (retorno.length < 1) {
            return [404, { message: "Usuário ou senha inválidos" }];
        };
        return [200, retorno[0]];
    } catch (error) {
        console.log(error);
        return [500, error];
    };
};