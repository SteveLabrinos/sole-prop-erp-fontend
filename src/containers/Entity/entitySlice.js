import { createSlice } from '@reduxjs/toolkit';

const entitySlice = createSlice({
    name: 'entity',
    initialState: {
        entities: [],
        loading: false,
        entityError: null
    },
    reducers: {
        fetchEntitiesStart: state => {
            state.loading = true;
        },
        fetchEntitiesSuccess: (state, action) => {
            state.entities = action.payload;
            state.loading = false;
        },
        fetchEntitiesFail: (state, action) => {
            state.entityError = action.payload;
            state.loading = false;
        },
        addEntity: (state, action) => {
            state.entities.concat(action.payload);
        },
        updateEntity: (state, action) => {
            state.entities.map(entity => {
                return entity.userId === action.payload.entityId ?
                    action.payload :
                    entity;
            });
        },
        deleteEntity: (state, action) => {
            state.entities = state.entities
                .filter(e => e.entity_id !== action.payload);
        }
    }
});


const { fetchEntitiesStart, fetchEntitiesSuccess, fetchEntitiesFail,
    addEntity, updateEntity, deleteEntity } = entitySlice.actions;

//  async actions with thunk


//  selectors

export default entitySlice.reducer;

