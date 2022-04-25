import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import TodosList from "./TodosList";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";
import todoContainerStyles from "./TodoContainer.module.scss";

class TodoContainer extends React.Component {
    state = {
        todos: [],
        trashCan: []
    };
    handleChange = id => {
        this.setState(prevState => ({
            todos: prevState.todos.map(todo => {
                if(todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
                return todo
            })
        }))
    };
    addTrash = id => {
        this.setState({
            trashCan: [
                ...this.state.trashCan,
                ...this.state.todos.filter(todo => {
                    return todo.id === id;
                })
            ]
        })
    };
    restoreTrash = id => {
        this.setState({
            trashCan: [
                ...this.state.trashCan.filter(trash => {
                    if( trash.id !== id ) {
                        return true;
                    } else {
                        this.addTodo(id);
                        return false;
                    }
                })
            ]
        })
    };
    permanentErase = id => {
        this.setState({
            trashCan: [
                ...this.state.trashCan.filter(trash => {
                    if( trash.id !== id ) {
                        return true;
                    } else {
                        return false;
                    }
                })
            ]
        })
    };
    addTodo = id => {
        this.setState({
            todos: [
                ...this.state.todos,
                ...this.state.trashCan.filter(trash => {
                    return trash.id === id;
                })
            ]
        })
    };
    delTodo = id => {
        this.setState({
            todos: [
                ...this.state.todos.filter(todo => {
                    if( todo.id !== id ) {
                        return true;
                    } else {
                        this.addTrash(id);
                        return false;
                    }
                })
            ]
        })
    };
    addTodoItem = title => {
        this.setState({
            todos:[
                ...this.state.todos,    
                {
                    id: uuidv4(),
                    title: title,
                    completed: false
                }
            ]
        })
    }
    setUpdate = (updatedTitle, id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.title = updatedTitle
                }
                return todo
            }),
        })
    }
    componentDidMount() {
        const tempTodos      = localStorage.getItem("todos")
        const loadedTodos    = JSON.parse( tempTodos )
        const tempTrashCan   = localStorage.getItem("trashCan")
        const loadedTrashCan = JSON.parse( tempTrashCan )
        
        if ( loadedTodos ) {
            this.setState({
                todos: loadedTodos
            })
        }
        if ( loadedTrashCan ) {
            this.setState({
                trashCan: loadedTrashCan
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if ( prevState.todos !== this.state.todos || prevState.trashCan !== this.state.trashCan ) {
            const tempTodos     = JSON.stringify( this.state.todos )
            const tempTrashCan  = JSON.stringify( this.state.trashCan )

            localStorage.setItem( "todos", tempTodos )
            localStorage.setItem( "trashCan", tempTrashCan )
        }
    }
    render() {
        return (
            <div className={ todoContainerStyles.container }>
                {/* <Navbar /> */}
                <div className={ todoContainerStyles.inner }>
                    <Header />
                    <InputTodo addTodoItemProps={this.addTodoItem} />
                    <TodosList
                        todos={this.state.todos}
                        handleChangeProps={this.handleChange}
                        handleDeleteRestoreProps={this.delTodo}
                        deleteRestoreButtonText="Delete"
                        isTrash={false}
                        setUpdateProps={this.setUpdate}
                    />
                    <h1 className={ todoContainerStyles['trash-header'] }>Trash Can</h1>
                    <TodosList
                        todos={this.state.trashCan}
                        handleChangeProps={this.handleChange}
                        handleDeleteRestoreProps={this.restoreTrash}
                        deleteRestoreButtonText="Restore"
                        handlePermanentEraseProps={this.permanentErase}
                        permanentEraseButtonText="Erase"
                        isTrash={true}
                    />
                </div>
            </div>
        )
    }
};
export default TodoContainer