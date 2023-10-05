import React, { useState } from "react";

const Login = () =>{
    const [email, setEmail]= useState('');
    const [pass, setPass]= useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        //**Vitin esse prevent evita que a pagina recarregue sozinha ao inserir algum dado nos input */
        e.preventDefault();

    }

    return(
        <>    
            <form onSubmit={handleSubmit}>
                <label htmlFor="usuario"> Usuário </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="user" placeholder="Insira o email..." required/>
                <label htmlFor="senha"> Senha </label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="text" name="password" id="password" placeholder="Senha" required/>
                <button type="submit">Log in</button>
            </form>

            <button>Não tem conta ainda! O que está esperando?</button>
        </>
    )

}


export default Login;