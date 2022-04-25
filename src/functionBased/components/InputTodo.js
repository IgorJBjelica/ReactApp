import React, { useState } from "react"
import { FiPlus } from "react-icons/fi"
import InputTodoStyles from "./InputTodo.module.scss"

const InputTodo = props => {
    const [inputText, setInputText] = useState({
        title: "",
    })

    const onChange = e => {
        setInputText({
            ...inputText,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if ( inputText.title.trim() ) {
            props.addTodoItemProps(inputText.title)
            setInputText({
                title: "",
            })
        } else {
            alert("Write something will ya?")
        }
    }

    return (
        <form 
            onSubmit={ handleSubmit }
            className={ InputTodoStyles["form-container"] }
        >
            <input
                type="text"
                className={ InputTodoStyles["input-text"] }
                placeholder="Add something to do..."
                value={ inputText.title }
                name="title"
                onChange={ onChange }
            />
            <button className={ InputTodoStyles["input-submit"] }>
                <FiPlus />
            </button>
        </form>
    )
}

export default InputTodo