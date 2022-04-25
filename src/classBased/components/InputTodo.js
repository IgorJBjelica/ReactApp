import React, { Component } from "react";
import InputTodoStyles from "./InputTodo.module.scss"

class InputTodo extends Component {
    state = {
        title: ""
    };
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.title.trim()) {
            this.props.addTodoItemProps(this.state.title);
            this.setState({
                title: ""
            })
        } else {
            alert("Please write something... dumbass")
        }
    };
    render() {
        return (
            <form 
                className = { InputTodoStyles["form-container"] }
                onSubmit = { this.handleSubmit }
            >
                
                <input
                    type="text"
                    className={ InputTodoStyles["input-text"] }
                    name="title"
                    placeholder="Add a Todo..."
                    value={ this.state.title }
                    onChange={ this.onChange }
                />
                <button className={ InputTodoStyles["input-submit"] }>Submit</button>
            </form>
        )
    }
}
export default InputTodo