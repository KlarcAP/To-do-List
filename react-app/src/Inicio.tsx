import React, { useEffect, useState } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

const Inicio = () =>{
    return(
        //States da minha aplicação
        const [title, setTitle] = useState("");
        const [time, setTime] = useState("");
        const [todos, setTodos] = useState([]);
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            const loadData = async () => {
            setLoading(true);

            const res = await fetch(API + "/todos")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => console.log(err));

            setLoading(false);

            setTodos(res);
            };

            loadData();
        }, []);

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const todo = {
            //Gera um ID aleartório para os States, achei melhor assim, quando for rodar verifique o output no console do navegador
            id: Math.random(),
            title,
            time,
            done: false,
            };

            {
            /**Envio para a API */
            }
            console.log(todo);

            await fetch(API + "/todos", {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json",
            },
            });

            setTodos((prevState) => [...prevState, todo]);

            setTitle("");
            setTime("");
        };

        const handleDelete = async (id: React.FormEvent<HTMLFormElement>) => {
            await fetch(API + "/todos/" + id, {
            method: "DELETE",
            });

            setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
        };

        if (loading) {
            return <p>Carregando...</p>;
        }

        return (
            <div className="App">
            <div className="todo-header">
                <h1>React todo</h1>
            </div>
            <div className="form-todo">
                <h2>Qual sua próxima tarefa?</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="title">O que voce vai fazer?</label>
                    {/**Nesse input o setTitle vai receber o que o usuário passar no input, por isso o target.value */}
                    <input
                    type="text"
                    name="title"
                    placeholder="Titulo da tarefa"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title || ""}
                    required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="time">Duração:</label>
                    {/**Nesse input o setTitle vai receber o que o usuário passar no input, por isso o target.value */}
                    <input
                    type="text"
                    name="time"
                    placeholder="Tempo estimado (em horas)"
                    onChange={(e) => setTime(e.target.value)}
                    value={time || ""}
                    required
                    />
                </div>
                <input type="submit" value="Criar tarefa" />
                </form>
            </div>
            <div className="list-todo">
                <h2>Lista de tarefas</h2>
                {/*Acessa meu array e faz uma comparação, ele não tem nada, logo retorna esse <p> */}
                {todos.length === 0 && <p>Não há tarefas!</p>}
                {todos.map((todo) => (
                <div className="todo" key={todo.id}>
                    <p>Duração: {todo.time}</p>
                    <div className="actions">
                    <span>
                        {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
                    </span>
                    <BsTrash onClick={() => handleDelete(todo.id)} />
                    </div>
                </div>
                ))}
            </div>
            </div>
        );
    )
}