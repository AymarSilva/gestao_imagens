import React, { useState } from 'react'

export default function TelaLogin() {

  const [ login, setLogin ] = useState('');
  const [ senha, setSenha ] = useState('');

  async function efetuarLogin() {
    const dadosLogin = {login,senha};
    console.log("front ",login, senha);

    try {
      const resposta = await fetch(`http://localhost:5000/login`,{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(dadosLogin)
      });

      if (!resposta.ok) {
        alert("Usuario ou senha inválidos!");
      };
      
      const response = await resposta.json();
      localStorage.setItem('id_usuario', response.id_usuario);
      window.location.href = '/'; //Navigate to '/'

    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div className='container d-flex justify-content-center'>
      <div className='com-md-3 mt-5'>
        <label htmlFor="">Login</label>
        <input type="text" className='form-control'
        placeholder='login' value={login} onChange={(e) => setLogin(e.target.value)}
        />
        <label htmlFor="">Senha</label>
        <input type="password" className='form-control' 
        value={senha} placeholder='******' onChange={(e) => setSenha(e.target.value)}
        />

        <div className='d-flex justify-content-end'>
          <button className='btn btn-primary mt-3' onClick={efetuarLogin} >Logar</button>
        </div>
      </div>
    </div>
  )
}
