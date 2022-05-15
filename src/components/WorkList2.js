import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {
    dataReducer_action_Add,
    dataReducer_action_Delete,
    dataReducer_action_Update,
    dataReducer_valueSelector,
    set_dataReducer_param
} from "../store/dataReducer";

export default function WorkList2(props) {

    const data = useSelector(dataReducer_valueSelector);

    const {filter, onEdit, onDelete} = props;

    let data_child = null;

    if (filter.length > 0)
        data_child = data.filter((item) => item.name.indexOf(filter) > -1);
    else
        data_child = data;

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
