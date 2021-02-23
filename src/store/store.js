import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../containers/Auth/authSlice';
import entityReducer from '../containers/Entity/entitySlice';

/** @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.*/

const store = configureStore({
    //  apply all the reducers from the slices
    reducer: {
        auth: authReducer,
        entity: entityReducer,
    }
});

export default store;