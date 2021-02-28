import { createSlice } from '@reduxjs/toolkit';
// import { baseURL } from '../../shared/utility';
import priceListJson from '../../assets/statics/price_lists.json';
import priceListDetails from '../../assets/statics/masterPriceList.json';

const priceList = createSlice({
    name: 'priceList',
    initialState: {
        loading: false,
        priceLists: [],
        priceList: null,
        priceListError: null,
        created: false,
        itemList: [
            {item_id: 1, description: 'Restriction of Right Ulnar Artery'},
            {item_id: 13, description: 'Site Service'},
            {item_id: 6, description: 'Plaque Radiation of Larynx'},
            {item_id: 23, description: 'Reposition Right Radius with Ring External'},
        ]
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
            state.priceList = action.payload;
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

export const fetchExistingPriceList = (id, token) => dispatch => {
    //  async code here when its applied from the backend

    //  temp solution of static data
    dispatch(fetchPriceListsStart());
    console.log(priceListDetails);
    //  to dispatch fetch price list
};

export const createPriceList = (item, token) => dispatch => {
    //  function to sent data to the db
    dispatch(addPriceListStart());
    //  the async function here
    item ?
        dispatch(addPriceListSuccess()) :
        dispatch(addPriceListFail('error adding the price list'));
};

export const updateExistingPriceList = (item, token) => dispatch => {
    //  function to sent data to the db
    dispatch(addPriceListStart());
    //  the async function here
    item ?
        dispatch(updatePriceList(item)) :
        dispatch(addPriceListFail('error updating the price list'));
};


//  selectors
export const priceListSelector = state => state.priceList;


export default priceList.reducer;