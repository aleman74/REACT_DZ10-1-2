import React, {useState} from "react";
import WorkList from "./WorkList";
import {nanoid} from "nanoid";


export default function Work() {

    const [work_name, setWorkName]      = useState('');
    const [work_price, setWorkPrice]    = useState('');

    const [filter, setFilter]           = useState('');

    const [data, setData]               = useState([]);     // item - {id:, name:, price:}
    const [editID, setEditID]           = useState('');


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

            const item = {
                id: nanoid(),
                name: work_name,
                price: work_price
            };

//            setData((prev) => [...prev, item]);

            data.push(item);
            setData(data);

            setWorkName('');
            setWorkPrice('');
        }
        else
        {
            const index = data.findIndex((item) => item.id == editID);

            data[index].name = work_name;
            data[index].price = work_price;

            setData(data);

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

        const new_data = data.filter((item) => item.id != id);
        setData(new_data);

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

            <WorkList data={data} filter={filter} onEdit={onItemEdit} onDelete={onItemDelete} />
        </div>
    );
}