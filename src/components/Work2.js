import React, {useState} from "react";
import WorkList2 from "./WorkList2";
import {useSelector, useDispatch} from 'react-redux';
import {
    dataReducer_action_Add,
    dataReducer_action_Delete,
    dataReducer_action_Update,
    dataReducer_valueSelector,
    set_dataReducer_param
} from "../store/dataReducer";


export default function Work2() {

    const [work_name, setWorkName]      = useState('');
    const [work_price, setWorkPrice]    = useState('');

    const [filter, setFilter]           = useState('');

//    const [data, setData]               = useState([]);     // item - {id:, name:, price:}
    const [editID, setEditID]           = useState('');


    const data = useSelector(dataReducer_valueSelector);
    const dispatch = useDispatch();


    const onChangeName = (event) => {
        setWorkName(event.target.value);
    }

    const onChangePrice = (event) => {
        setWorkPrice(event.target.value);
    }

    const onChangeFilter = (event) => {
        setFilter(event.target.value);
    }

    const onAdd = (event) => {
        event.preventDefault();

        if (editID == '')
        {
            dispatch(
                dataReducer_action_Add(
                    set_dataReducer_param('', work_name, Number(work_price))
                ));

            setWorkName('');
            setWorkPrice('');
        }
        else
        {
            dispatch(
                dataReducer_action_Update(
                    set_dataReducer_param(editID, work_name, Number(work_price))
                ));

            setWorkName('');
            setWorkPrice('');
            setEditID('');
        }
    }

    const onCancel = (event) => {
        event.preventDefault();

        setWorkName('');
        setWorkPrice('');
        setEditID('');
    }


    const onItemEdit = (id) => {

        const item = data.filter((item) => item.id == id)[0];

//        console.log({item});

        setWorkName(item.name);
        setWorkPrice(item.price);
        setEditID(item.id);
    }

    const onItemDelete = (id) => {

        dispatch(
            dataReducer_action_Delete(
                set_dataReducer_param(id)
            ));

        if (editID != '')
        {
            setWorkName('');
            setWorkPrice('');
            setEditID('');
        }
    }


    return (
        <div id="container">

            <div>

                <div id="title">
                    <span>Название работы</span>
                    <span>Стоимость</span>
                </div>

                <div id="field">
                    <input id="work_name" type="text" value={work_name} onChange={onChangeName} />
                    <input id="work_price" type="number" step="any" value={work_price} onChange={onChangePrice} />
                    <button onClick={onAdd}>Save</button>
                    <button onClick={onCancel} className={(editID == '') ? 'hidden' : ''}>Cancel</button>
                </div>

                <div id="filter">
                    <span>Фильтр</span>
                    <input id="work_filter" type="text" value={filter} onChange={onChangeFilter} />
                </div>
            </div>

            <WorkList2 filter={filter} onEdit={onItemEdit} onDelete={onItemDelete} />
        </div>
    );
}