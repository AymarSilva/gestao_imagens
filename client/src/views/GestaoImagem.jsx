import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function GestaoImagem() {

    const [imagens, setImagens] = useState([]);
    const [imagem, setImagem] = useState(null);

    const [descricao, setDescricao] = useState('');
    const [idUsuario, setIdUsuario] = useState('');

    const [login, setLogin] = useState('');
    const [funcao, setFuncao] = useState('');

    const navigate = useNavigate();

    const ApiGet = async () => {
        try {
            const resposta = await fetch(`http://localhost:5000/imagem`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                throw new Error("Erro ao buscar imagem");
            };

            const consulta = await resposta.json();
            setImagens(consulta);
        } catch (error) {
            console.log("Erro ao buscar: ", error);
        };
    };

    async function cadastrarImagem(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('descricao', descricao);
        formData.append('caminho', imagem);

        try {
            const resposta = await fetch(`http://localhost:5000/imagem`, {
                method: "POST",
                body: formData
            });

            if (!resposta.ok) {
                throw new Error("Resposta diferente de OK ", await resposta.text());
            };

            console.log("Imagem Cadastrada");

            ApiGet();

        } catch (error) {
            throw new Error("Erro ao cadastrar imagem ", error);
        };
    };

    async function deletarImagem(id_imagem) {
        try {
            const resposta = await fetch(`http://localhost:5000/imagem/${id_imagem}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!resposta.ok) {
                const error = await resposta.json();
                throw new Error("Resposta diferente de OK", error);
            };
            setImagens(imagens.filter(imagem => imagem.id !== id_imagem));
        } catch (error) {
            throw new Error("Api deletar imagem", error);

        };
    };

    useEffect(() => {
        ApiGet();
        if (idUsuario === '') {
            try {
                const id = localStorage.getItem('idUser');
                if (!id) {
                    navigate('/login');
                } else {
                    setIdUsuario(id);
                    getNome(id);
                };
            } catch (error) {
                console.log(error);
                throw new Error(`Erro no useEffect: ${error}`);
            };
        };
    }, []);

    async function getNome(id) {
        try {
            const request = await fetch(`http://localhost:5000/usuario/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const requestJson = await request.json();
            if (requestJson) {
                console.log(requestJson);
                setLogin(requestJson.login);
                setFuncao(requestJson.funcao);
            };
        } catch (error) {
            console.log(error);
            throw new Error(`Erro no fetch: ${error}`);
        };
    };


    function logout(){
        localStorage.removeItem('idUser');
        navigate('/login');
    };

    return (
        <>
        <div>
            <nav className='container'>
                <span>Logo</span>
                <ul>
                    <li>Inicio</li>
                </ul>
                <button className='btn btn-danger' onClick={logout}>Sair</button>
            </nav>
        </div>
            <div>
                <nav className='container'>
                    <span>Logo</span>
                    <ul>
                        <li>Inicio</li>
                    </ul>
                </nav>
            </div>
            <div className='container'>
                <h1 className='text-center'>Gestão Imagens</h1>
                <h2>{`Bem-vindo ao Gestor de Imagens ${login}`}</h2>
                <label htmlFor="">Descrição</label>
                <input type="text" className='form-control' value={descricao} onChange={e => (setDescricao(e.target.value))} />
                <label >Imagem</label>
                <input className='form-control' type="file" onChange={e => (setImagem(e.target.files[0]))} />
                <button className='btn btn-sucess mt-2' onClick={cadastrarImagem}>Cadastrar</button>
                <div className='row mt-2'>
                    {
                        imagens.map((imagem) => (
                            <div className='col-md-3 flex-direction-column' key={imagem.idImagens}>
                                <img className='img-thumbnail' style={{ width: '300px' }} src={`http://localhost:5000/public/${imagem.caminho}`} alt={`${imagem.descricao}`} />
                                <div className='mt-2'>
                                    <button className='btn btn-primary'>Editar</button>
                                    <button className='btn btn-danger float-end'
                                        onClick={() => deletarImagem(imagem.idImagens)}>
                                        Deletar
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default GestaoImagem
