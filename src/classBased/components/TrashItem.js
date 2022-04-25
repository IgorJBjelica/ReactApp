import React from "react";

class TrashItem extends React.Component {
    render () {
        return (
            <li>
                <input 
                    type="checkbox"
                    checked={this.props.todo.completed}
                    readOnly
                />
                {this.props.todo.title}

                <button onClick={() => this.props.restoreTrashProps(this.props.todo.id)}>
                    Restore
                </button>
            </li>
        )
    }
}
export default TrashItem