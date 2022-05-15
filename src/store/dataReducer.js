import {createSlice} from '@reduxjs/toolkit';
import {nanoid} from "nanoid";


// Структура данных
const initialState = [];     // item - {id:, name:, price:}

const dataReducer = createSlice({
    name: 'data',
    initialState,
    reducers: {

        dataReducer_action_Add(state, action)
        {
            console.log('dataReducer_action_Add', {action}, action.payload);

            if ((action.payload.item != null) && (action.payload.item != 'undefined'))
            {
                let item = action.payload.item;
                item.id = nanoid();

                state.push(item);
            }
        },

        dataReducer_action_Delete(state, action)
        {
            console.log('dataReducer_action_Delete', {action}, action.payload);

            if ((action.payload.item != null) && (action.payload.item != 'undefined'))
            {
                let item = action.payload.item;

                const index = state.findIndex((v) => v.id == item.id);

                if (index > -1)
                    state.splice(index, 1);
            }
        },

        dataReducer_action_Update(state, action)
        {
            console.log('dataReducer_action_Update', {action}, action.payload);

            if ((action.payload.item != null) && (action.payload.item != 'undefined'))
            {
                const item = action.payload.item;

                const index = state.findIndex((v) => v.id == item.id);

                if (index > -1)
                {
                    state[index].name = item.name;
                    state[index].price = item.price;
                }
            }
        }
    },
});

export const set_dataReducer_param = (id = '', name = '', price = 0) => (
    {item: {id, name, price}}
);
export const { dataReducer_action_Add, dataReducer_action_Delete, dataReducer_action_Update } =  dataReducer.actions;

export default  dataReducer.reducer;

// Value Selector
export const dataReducer_valueSelector = (store) => store.dataReducer;
