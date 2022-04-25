import React from "react"
import TodoItem from "./TodoItem"

const TodosList = props => {
    return (
        <ul>
            { props.todos.map(todo => (
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    isTrashProps={props.isTrash}
                    handleChangeProps={props.handleChangeProps}
                    handleDeleteRestoreProps={props.handleDeleteRestoreProps}
                    handlePermanentEraseProps={props.handlePermanentEraseProps}
                    deleteRestoreButtonTextProps={props.deleteRestoreButtonText}
                    permanentEraseButtonTextProps={props.permanentEraseButtonText}
                    setUpdateProps={props.setUpdateProps}
                />
            ))}
        </ul>
    )
}
export default TodosList