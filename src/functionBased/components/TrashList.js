import React from "react";
import TrashItem from "./TrashItem";

class TrashList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.trashCan.map(trash => (
                    <TrashItem
                        key={trash.id}
                        trash={trash}
                        // handleChangeProps={this.props.handleChangeProps}
                        restoreTrashProps={this.props.restoreTrashProps}
                    />
                    ))}
            </ul>
        )
    }
}
export default TrashList