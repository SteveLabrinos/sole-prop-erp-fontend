import { createSlice } from '@reduxjs/toolkit';
// import { baseURL } from '../../shared/utility';
import priceListJson from "../../assets/statics/price_lists.json";

const priceList = createSlice({
    name: 'priceList',
    initialState: {
        loading: false,
        priceLists: [],
        priceList: null,
        priceListError: null,
        created: false,
    },
    reducers: {
        fetchPriceListsStart: state => {
            state.loading = true;
            state.created = false;
        },
        addPriceListStart: state => {
            state.loading = true;
        },
        fetchPriceListSuccess: (state, action) => {
            state.priceLists = action.payload;
            state.loading = false;
        },
        fetchPriceListFail: (state, action) => {
            state.priceListError = action.payload;
            state.loading = false;
        },
        addPriceListFail: (state, action) => {
            state.entityError = action.payload;
            state.loading = false;
        },
        addPriceListSuccess: state => {
            state.loading = false;
            state.created = true;
        },
        updatePriceList: (state, action) => {
            state.priceLists.map(pr => {
                return pr.price_list_id === action.price_list_id.item_id ?
                    action.payload :
                    pr;
            });
        },
        deletePriceList: (state, action) => {
            state.priceLists = state.priceLists
                .filter(pr => pr.price_list_id !== action.payload);
        },
        clearPriceListError: state => {
            state.priceListError = null;
        },
        fetchPriceList: (state, action) => {
            const priceList = state.priceLists
                .filter(pr => pr.price_list_id === Number.parseInt(action.payload))[0];
            // get the codes from measurement and type of the item
            // pric.measurement_code = state.measurementCodes
            //     .filter(m => m.value === item.measurement_code)[0].code;
            // item.type_code = state.itemType
            //     .filter(t => t.value === item.type_code)[0].code;
            state.priceList = priceList;
        },
        clearPriceList: state => {
            state.priceList = null;
        }
    }
});

export const { fetchPriceListsStart, fetchPriceListSuccess, fetchPriceListFail,
    clearPriceListError, fetchPriceList, addPriceListStart, addPriceListSuccess,
    addPriceListFail, updatePriceList, clearPriceList } = priceList.actions;

//  async actions using thunk and logic actions that dispatch many actions
export const fetchPriceListCollection = token => dispatch => {
    // const fetchItem = async () => {
    //     //  async code here when its applied from the backend
    // };
    //  temp solution of static data
    dispatch(fetchPriceListsStart());
    const priceListCollection = Object.values(priceListJson);
    priceListCollection ?
        dispatch(fetchPriceListSuccess(priceListCollection)) :
        dispatch(fetchPriceListFail('error on fetching price lists'));
};

// export const createNewItem = (item, token) => dispatch => {
//     //  function to sent data to the db
//     dispatch(addItemStart());
//     //  the async function here
//     item ?
//         dispatch(addItemSuccess()) :
//         dispatch(addItemFail('error adding the item'));
// };
//
// export const updateExistingItem = (item, token) => dispatch => {
//     //  function to sent data to the db
//     dispatch(addItemStart());
//     //  the async function here
//     item ?
//         dispatch(updateItem(item)) :
//         dispatch(addItemFail('error updating the item'));
// };


//  selectors
export const priceListSelector = state => state.priceList;


export default priceList.reducer;