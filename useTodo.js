import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";


const initialState = [
];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};


export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    const handleNewTodo = (todo) => {

        dispatch({
            type: '[TODO] Add todo',
            payload: todo,
        });
    }

    const handleDeleteTodo = (id) => {

        dispatch({
            type: '[TODO] Remove todo',
            payload: id,
        });
    }

    const handleToggleTodo = (id) => {

        dispatch({
            type: '[TODO] Toggle todo',
            payload: id,
        });
    }

    return {
        todos,
        todosCount: todos.length,
        todosPendentCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}
