import React from "react";

export default function WorkList(props) {

    const {data, filter, onEdit, onDelete} = props;

    let data_child = data;

    if (filter.length > 0)
        data_child = data.filter((item) => item.name.indexOf(filter) > -1);

    const onItemEdit = (id) => {
        onEdit(id);
    }

    const onItemDelete = (id) => {
        onDelete(id);
    }

    if (data.length == 0)
        return null;

    return (
        <div id="list">
            <ul>
                {data_child.map((item) =>
                    <li key={item.id}>
                        {item.name + ' ' + item.price}
                        <span className="material-icons" onClick={() => onItemEdit(item.id)}>edit</span>
                        <span className="material-icons" onClick={() => onItemDelete(item.id)}>close</span>
                    </li>
                )}
            </ul>
        </div>
    );

}