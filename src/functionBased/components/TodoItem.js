import React, { useState, useEffect } from "react";
import TodoItemStyles from "./TodoItem.module.scss"
import InputTodoStyles from "./InputTodo.module.scss"

const TodoItem = props => {
    const [ editing, setEditing ] = useState(false)

    const handleEditing = () => {
        setEditing(true)
    }
    const handleUpdateDone = event => {
        if (event.key === "Enter" || event.type === "click") {
            setEditing(false)
        }
    }
    // componentWillUnmount() {
        
    // }

    const { completed, id, title } = props.todo

    let viewMode = {}
    let editMode = {}

    if ( editing ) {
        viewMode.display = "none"
    } else {
        editMode.display = "none"
    }

    useEffect(() => {
        return () => {
            console.log("Cleaning up...")
        }
    }, [])

    return (
        <li className={ TodoItemStyles.item }>
            <input 
                type="checkbox"
                className={ TodoItemStyles.checkbox }
                checked={ completed }
                onChange={() => props.handleChangeProps(id)}
            />

            <span
                className={
                    '' + 
                    ( completed ? TodoItemStyles.completed : "" ) +
                    ( editing   ? " " + TodoItemStyles.hidden : "" )
                }
                onDoubleClick={ handleEditing }
            >
                { title }
            </span>

            <div
                className={ editing ? TodoItemStyles["fragment-cover"] : TodoItemStyles["hidden"] }
                onClick={ handleUpdateDone }
            >
                <input
                    type="text"
                    className={ editing ? TodoItemStyles.textInput : TodoItemStyles["hidden"]}
                    value={ title }
                    onChange={ e => {
                        props.setUpdateProps(e.target.value, id);
                    }}
                    onKeyDown={ handleUpdateDone }
                    onClick={ (e) => {
                        e.stopPropagation();
                    }}
                />
                </div>

            <button onClick={() => props.handleDeleteRestoreProps(id)}>
                { props.deleteRestoreButtonTextProps }
            </button>

            <button
                className={ props.isTrashProps ? "" : TodoItemStyles.hidden }
                onClick={() => props.handlePermanentEraseProps(id)}
                >
                
                { props.permanentEraseButtonTextProps }
            </button>
        </li>
    )
}
export default TodoItem