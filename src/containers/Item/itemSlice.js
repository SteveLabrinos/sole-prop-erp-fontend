import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';
import itemListJson from "../../assets/statics/itemList.json";

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        loading: false,
        items: [],
        item: null,
        itemError: null
    },
    reducers: {
        fetchItemsStart: state => {
            state.loading = true;
        },
        addItemStart: state => {
            state.loading = true;
        },
        fetchItemsSuccess: (state, action) => {
            state.items = action.payload;
            state.loading = false;
        },
        fetchItemsFail: (state, action) => {
            state.itemError = action.payload;
            state.loading = false;
        },
        addItemFail: (state, action) => {
            state.entityError = action.payload;
            state.loading = false;
        },
        addItem: (state, action) => {
            state.items.concat(action.payload);
            state.loading = false;
        },
        updateItem: (state, action) => {
            state.items.map(item => {
                return item.id === action.payload.id ?
                    action.payload :
                    item;
            });
        },
        deleteItem: (state, action) => {
            state.items = state.items
                .filter(i => i.id !== action.payload);
        },
        clearEntityError: state => {
            state.itemError = null;
        },
        fetchItem: (state, action) => {
            const item = state.items.filter(i => i.id === action.payload);
            state.item = Object.values(item);
        }
    }
});

const { fetchItemsStart, fetchItemsSuccess, fetchItemsFail } = itemSlice.actions;

//  async actions using thunk and logic actions that dispatch many actions
export const fetchItemCollection = token => dispatch => {
    const fetchItem = async () => {
        //  async code here when its applied from the backend
    };
    //  temp solution of static data
    dispatch(fetchItemsStart());
    const itemList = Object.values(itemListJson);
    itemList ?
        dispatch(fetchItemsSuccess(itemList)) :
        dispatch(fetchItemsFail('error on fetching items'));
};



//  selectors
export const itemSelector = state => state.item;


export default itemSlice.reducer;