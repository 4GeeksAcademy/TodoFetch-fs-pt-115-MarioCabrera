import React from "react";
import { useState, useEffect } from "react";
import "./home.css"
import { Todolist } from "./Todolist";
import { DoneTasks } from "./DoneTasks"
import JSConfetti from 'js-confetti'


const Home = () => {
	const jsConfetti = new JSConfetti();
	const [todos, setTodos] = useState([]);
	const [tarea, setTarea] = useState("");
	const [completed, setCompleted] = useState([])
	const [hovered, setHovered] = useState(null)
	const getTodos = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/mario");
		if (!response.ok) console.log('Error en la solicitud'), createUser();

		const data = await response.json();
		const stillTodo = data.todos.filter(todo => todo.is_done === false);
		const completed = data.todos.filter(todo => todo.is_done === true);
		setTodos(stillTodo);
		setCompleted(completed)

	}
	const createUser = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/mario", {
			method: "POST"
		})
		console.log(response);
		const data = await response.json()
		console.log(data);
		getTodos()
	}
	const completeTask = async (element) => {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${element}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				label: todos.find(t => t.id === element).label,
				is_done: true
			})
		})
		console.log(response);
		const data = await response.json()
		console.log(data);
		getTodos()


	}
	const pressedEnter = async (e) => {
		let tarea = e.target.value
		tarea = tarea.charAt(0).toUpperCase() + tarea.slice(1).toLowerCase();
		if (e.key === "Enter") {
			console.log(tarea);
			const exist = todos.some(todo => todo.label === tarea) || completed.some(todo => todo.label === tarea);
			if (exist) {
				alert("Esa tarea ya estaba añadida");
				setTarea("");
				return;
			}
			if (tarea == "") {
				alert("La tarea que has añadido esta vacía");
				setTarea("");
				return;
			}
			const newTodo = {
				label: tarea,
				is_done: false
			};
			const response = await fetch("https://playground.4geeks.com/todo/todos/mario", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newTodo)
			});
			if (!response.ok) throw new Error("Error al crear tarea");
			setTarea("");
			getTodos();

		}

	};
	const deleteTodo = async (element) => {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${element}`, {
			method: "DELETE"
		})
		console.log(response);
		getTodos()
	}
	const deleteUser = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/mario", {
			method: "DELETE"
		})
		console.log(response);
		getTodos()

	}
	useEffect(() => {
		getTodos()
	}, []);
	useEffect(() => {
		if (todos.length === 0 && completed.length > 0 && completed[0] !== "") {
			let end = Date.now() + (5);

			// Colores para el confeti
			let colors = ['#bb0000', '#ffffff'];

			// Función para generar el efecto de confeti
			(function frame() {
				jsConfetti.addConfetti({
					particleCount: 2,
					angle: 60,
					spread: 55,
					origin: { x: 0 },
					colors: colors
				});

				if (Date.now() < end) {
					requestAnimationFrame(frame);
				}
			})();
		}
	}, [completed, todos]);

	return (
		<div className="container mx-auto text-center">
			<h1 className="display-2" style={{ color: "#FF8A8A" }}>Quehaceres</h1>
			<div className="todos pt-2">
				<input
					className="border-0 text-start fs-2 mb-2"
					type="text"
					placeholder={"¿Que queda por hacer?"}
					onChange={(e) => { setTarea(e.target.value) }}
					onKeyUp={pressedEnter}
					value={tarea}
					name="todoCreator"
					style={{width:"100%"}}
				/>
				<ul
					className="list-group text-start mb-4"
				>
					{todos.map((element, index) => (
						<Todolist
							key={index}
							name={element.label}
							index={index}
							hoveredIndex={hovered}
							onHover={() => setHovered(index)}
							onLeave={() => setHovered(null)}
							complete={() => completeTask(element.id)}
							delete={() => deleteTodo(element.id)}

						/>

					))}
				</ul>
				<ul
					className="list-group text-start"
				>
					{completed.map((element, index) => (
						<DoneTasks
							key={index}
							name={element.label}
							index={index}
						/>
					))}
				</ul>
			</div>
			<button className="btn btn-lg btn-warning mt-4 border border-secondary" onClick={() => { deleteUser() }}>Reiniciar Lista</button>
			<h2 className={`mt-4 display-2 ${(todos.length === 0 && completed.length > 0 && completed[0] !== "") ? "" : "d-none"}`}>¡Has terminado todas las tareas!</h2>
		</div>
	);
};

export default Home;