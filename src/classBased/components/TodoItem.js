import React from "react";
import TodoItemStyles from "./TodoItem.module.scss"
import InputTodoStyles from "./InputTodo.module.scss"

class TodoItem extends React.Component {
    state = {
        editing: false,
    }
    handleEditing = () => {
        this.setState({
            editing: true,
        })
    }
    handleUpdateDone = event => {
        if (event.key === "Enter" || event.type === "click") {
            this.setState({ editing: false })
        }
    }
    // componentWillUnmount() {
        
    // }
    render () {
        const { completed, id, title } = this.props.todo
        const editing = this.state.editing
        const isTrash = this.state.isTrash

        let viewMode = {}
        let editMode = {}

        if ( editing ) {
            viewMode.display = "none"
        } else {
            editMode.display = "none"
        }

        return (
            <li className={ TodoItemStyles.item }>
                <input 
                    type="checkbox"
                    className={ TodoItemStyles.checkbox }
                    checked={ completed }
                    onChange={() => this.props.handleChangeProps(id)}
                />

                <span
                    className={
                        '' + 
                        ( completed ? TodoItemStyles.completed : "" ) +
                        ( editing   ? " " + TodoItemStyles.hidden : "" )
                    }
                    onDoubleClick={ this.handleEditing }
                >
                    { title }
                </span>

                <div
                    className={ editing ? TodoItemStyles["fragment-cover"] : TodoItemStyles["hidden"] }
                    onClick={ this.handleUpdateDone }
                >
                    <input
                        type="text"
                        className={ editing ? TodoItemStyles.textInput : TodoItemStyles["hidden"]}
                        value={ title }
                        onChange={ e => {
                            this.props.setUpdateProps(e.target.value, id);
                        }}
                        onKeyDown={ this.handleUpdateDone }
                        onClick={ (e) => {
                            e.stopPropagation();
                        }}
                    />
                 </div>

                <button onClick={() => this.props.handleDeleteRestoreProps(id)}>
                    { this.props.deleteRestoreButtonTextProps }
                </button>

                <button
                    className={ this.props.isTrashProps ? "" : TodoItemStyles.hidden }
                    onClick={() => this.props.handlePermanentEraseProps(id)}
                    >
                    
                    { this.props.permanentEraseButtonTextProps }
                </button>
            </li>
        )
    }
}
export default TodoItem