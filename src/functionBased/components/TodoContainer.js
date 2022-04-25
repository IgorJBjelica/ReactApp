import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./Header"
import Navbar from "./Navbar"
import TodosList from "./TodosList"
import InputTodo from "./InputTodo"
import { v4 as uuidv4 } from "uuid"
import { FiPlus, FiX, FiTrash2 } from "react-icons/fi"
import todoContainerStyles from "./TodoContainer.module.scss"
import About from "../pages/About"
import NoMatch from "../pages/NoMatch"

const TodoContainer = () => {
    const [ todos, setTodos ] = useState(getInitialITems("todos"))
    const [ trashCan, setTrashCan ] = useState(getInitialITems("trashCan"))
    
    const handleChange = id => {
        setTodos( prevState =>
            prevState.map(todo => {
                if( todo.id === id ) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
                return todo
            })
        )
    }

    const addTrash = id => {
        setTrashCan([
            ...trashCan,
            ...todos.filter(todo => {
                return todo.id === id;
            })
        ])
    }

    const restoreTrash = id => {
        setTrashCan([
            ...trashCan.filter(trash => {
                if( trash.id !== id ) {
                    return true;
                } else {
                    addTodo(id);
                    return false;
                }
            })
        ])
    }

    const permanentErase = id => {
        setTrashCan([
            ...trashCan.filter(trash => {
                if( trash.id !== id ) {
                    return true;
                } else {
                    return false;
                }
            })
        ])
    }

    const addTodo = id => {
        setTodos([
            ...todos,
            ...trashCan.filter(trash => {
                return trash.id === id;
            })
        ])
    }

    const delTodo = id => {
        setTodos([
            ...todos.filter(todo => {
                if( todo.id !== id ) {
                    return true;
                } else {
                    addTrash(id);
                    return false;
                }
            })
        ])
    }

    const addTodoItem = title => {
        setTodos([
            ...todos,    
            {
                id: uuidv4(),
                title: title,
                completed: false,
            }
        ])
    }

    const setUpdate = (updatedTitle, id) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.title = updatedTitle
                }
                return todo
            }),
        )
    }

    function getInitialITems(type) {
            //getting stored items
            const tempItems     = localStorage.getItem(type)
            const savedITems    = JSON.parse(tempItems)
            
            return savedITems || []
    }

    useEffect(() => {
        //storing items
        const tempTodos = JSON.stringify(todos)
        localStorage.setItem("todos", tempTodos)
        
        const tempTrash = JSON.stringify(trashCan)
        localStorage.setItem("trashCan", tempTrash)

    }, [todos, trashCan])

    return (
        <div className={ todoContainerStyles.container }>
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <div className={ todoContainerStyles.inner }>
                        <Header />
                        <InputTodo addTodoItemProps={addTodoItem} />
                        <TodosList
                            todos={todos}
                            handleChangeProps={handleChange}
                            handleDeleteRestoreProps={delTodo}
                            deleteRestoreButtonText={<FiX />}
                            isTrash={false}
                            setUpdateProps={setUpdate}
                        />
                        <h1 className={ todoContainerStyles['trash-header'] }>Trash Can</h1>
                        <TodosList
                            todos={trashCan}
                            handleChangeProps={handleChange}
                            handleDeleteRestoreProps={restoreTrash}
                            deleteRestoreButtonText={<FiPlus />}
                            handlePermanentEraseProps={permanentErase}
                            permanentEraseButtonText={<FiTrash2 />}
                            isTrash={true}
                        />
                    </div>
                }>
                </Route>
                <Route path="/about/*" element={
                    <About />
                }>
                </Route>
                <Route path="*" element={
                    <NoMatch />
                }>
                </Route>
            </Routes>
        </div>
    )
}
export default TodoContainer