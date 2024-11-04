import React, { useEffect, useState } from 'react'

function GestaoImagem() {

    const [ imagens,setImagens ] = useState([]);

    const ApiGet = async () => {
        try {
          const resposta = await fetch(`http://localhost:5000/imagem`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
          });
          
          if (!resposta) {
            throw new Error("Erro ao buscar imagem");
          };

          const consulta = await resposta.json();
          setImagens(consulta);
        } catch (error) {
            console.log("Erro ao buscar: ",error);
        };
    };

    useEffect(() => {
        ApiGet()
    }, []);

    return (
        <div>
            <ul>
                {
                    imagens.map((imagem) => (
                        <li key={imagem.id_imagem}>
                            <img src={`http://localhost:5000/public/${imagem.caminho}`} alt={`${imagem.descricao}`} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default GestaoImagem
