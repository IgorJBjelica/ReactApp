import React from "react";
import TodoItem from "./TodoItem";

class TodosList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.todos.map(todo => (
                    <TodoItem 
                        key={todo.id}
                        todo={todo}
                        isTrashProps={this.props.isTrash}
                        handleChangeProps={this.props.handleChangeProps}
                        handleDeleteRestoreProps={this.props.handleDeleteRestoreProps}
                        handlePermanentEraseProps={this.props.handlePermanentEraseProps}
                        deleteRestoreButtonTextProps={this.props.deleteRestoreButtonText}
                        permanentEraseButtonTextProps={this.props.permanentEraseButtonText}
                        setUpdateProps={this.props.setUpdateProps}
                    />
                ))}
            </ul>
        )
    }
}
export default TodosList