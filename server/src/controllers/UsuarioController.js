import { authentication, createUsuario, readOneUser, readUsuarios } from "../models/UsuarioModel.js";

export async function criarUsuario(req, res) {
    console.log("UsuarioController :: criarUsuario");
    const usuario = req.body;

    if (!usuario.login || !usuario.senha || !usuario.funcao) {
        res.status(400).json({ message: "Login, senha e função são obrigatórios" });
    };

    try {
        const [statusCode, resposta] = await createUsuario(usuario);
        res.status(statusCode).json(resposta);
    } catch (error) {
        console.log("Api erro: ", error);
        res.status(500).json({ message: `Erro na API ${error}` });
    };
};

export async function lerUsuario(req, res) {
    try {
        const [statusCode, retorno] = await readUsuarios();
        res.status(statusCode).json(retorno);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Erro na api ${error}` });
    };
};

export async function lerUmUsuario(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: 'ID Inválido' });
    };

    try {
        const [statusCode, retorno] = await readOneUser(id);
        res.status(statusCode).json(retorno);
    } catch (error) {
        res.status(500).json(`Erro na api: ${error}`);
    };
};

export async function logarUsuario(req, res) {
    console.log("UsuárioController :: logarUsuario");
    const { login, senha } = req.body;
    console.log("back ", login, senha)

    if (!login || !senha) {
        res.status(400).json({ message: "Usuário e Senha são obrigatórios" });
    };

    try {
        const [statusCode, retorno] = await authentication(login, senha);
        res.status(statusCode).json(retorno);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Erro na API: ${error}` });
    };
};