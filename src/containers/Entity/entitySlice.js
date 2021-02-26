import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

const entitySlice = createSlice({
    name: 'entity',
    initialState: {
        entities: [],
        loading: false,
        entityError: null,
        created: false,
        roles: [
            {code: 'C', value: 'CUSTOMER'},
            {code: 'S', value: 'SUPPLIER'},
            {code: 'B', value: 'CUSTOMER_SUPPLIER'}
        ],
        taxOffices: [
            {code: 'PF', value: 'Παλαιού Φαλήρου'},
            {code: 'AG', value: 'Αιγαλέου'},
            {code: 'P1', value: 'Α΄ Πειραιά'},
        ],
        countries: [
            {code: 'GR', value: 'Ελλάδα'},
            {code: 'CY', value: 'Κύπρος'},
        ]
    },
    reducers: {
        fetchEntitiesStart: state => {
            state.loading = true;
            state.created = false;
        },
        addEntityStart: state => {
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
        addEntityFail: (state, action) => {
            state.entityError = action.payload;
            state.loading = false;
        },
        addEntity: (state, action) => {
            const newEntity = {
                id: action.payload.id,
                name: action.payload.name,
                role: state.roles
                    .filter(r => r.code === action.payload.role)[0].value,
                taxId: action.payload.taxId,
                taxOffice: {
                    name: state.taxOffices
                        .filter(o => o.code === action.payload.taxOfficeCode)[0].value
                },
                website: action.payload.website,
                activity: action.payload.activity,
                type: action.payload.type,
                phoneNumber: action.payload.phone,
                address: {
                    street: action.payload.street,
                    streetNumber: action.payload.streetNumber,
                    city: action.payload.city,
                    area: action.payload.area,
                    countryCode: state.countries
                        .filter(c => c.code === action.payload.countryCode)[0].value
                }
            };

            state.entities.push(newEntity);
            state.loading = false;
            state.created = true;
        },
        updateEntity: (state, action) => {
            const updatedEntity = {
                id: action.payload.id,
                name: action.payload.name,
                role: state.roles
                    .filter(r => r.code === action.payload.role)[0].value,
                taxId: action.payload.taxId,
                taxOffice: {
                    name: state.taxOffices
                        .filter(o => o.code === action.payload.taxOfficeCode)[0].value
                },
                website: action.payload.website,
                activity: action.payload.activity,
                type: action.payload.type,
                phoneNumber: action.payload.phone,
                address: {
                    street: action.payload.street,
                    streetNumber: action.payload.streetNumber,
                    city: action.payload.city,
                    area: action.payload.area,
                    countryCode: state.countries
                        .filter(c => c.code === action.payload.countryCode)[0].value
                }
            };

            state.entities = state.entities.map(entity => {
                return entity.id === updatedEntity.id ?
                    updatedEntity :
                    entity;
            });
            state.loading = false;
            state.created = true;
        },
        deleteEntity: (state, action) => {
            state.entities = state.entities
                .filter(e => e.id !== action.payload);
            state.loading = false;
            state.created = true;
        },
        clearEntityError: state => {
            state.entityError = null;
        },
        clearCreated: state => {
            state.created = false;
        },
    }
});


export const { fetchEntitiesStart, fetchEntitiesSuccess, fetchEntitiesFail,
    addEntityFail, addEntityStart, clearEntityError, clearCreated,
    addEntity, updateEntity, deleteEntity } = entitySlice.actions;

//  async actions with thunk
export const fetchEntitiesCollection = tokenId => dispatch => {
    const fetchEntities = async () => {
        dispatch(fetchEntitiesStart());

        const response = await fetch(`${baseURL}entities?tokenId=${tokenId}`);

        !response.ok ?
            dispatch(fetchEntitiesFail(response.status)) :
            dispatch(fetchEntitiesSuccess(await response.json()));
    }

    fetchEntities().catch(error => console.log(error));
};

export const addNewEntity = (entity, token) => dispatch => {
    const postEntity = async () => {
        const postData = {
            activity: entity.activity,
            street: entity.street,
            streetNumber: entity.streetNumber,
            zipCode: entity.zipCode,
            city: entity.city,
            area: entity.area,
            countryCode: entity.countryCode,
            companyId: entity.companyId,
            companyFlag: entity.type === 'COMPANY' ? 'C' : 'P',
            name: entity.name,
            phone: entity.phone,
            role: entity.role,
            taxId: entity.taxId,
            taxOfficeCode: entity.taxOfficeCode,
            website: entity.website,
            email: entity.email
        }

        dispatch(addEntityStart());
        console.log(postData);

        const response = await fetch(`${baseURL}entity?tokenId=${token}`, {
            method: 'POST',
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            entity.id = await response.json();
            dispatch(addEntity(entity));
        } else {
            dispatch(addEntityFail(response.status));
        }
    }

    postEntity().catch(error => console.log(error));
}

export const updateExistingEntity = (entity, token) => dispatch => {
    const postEntity = async () => {
        const postData = (({
                activity,
                street,
                streetNumber,
                zipCode,
                city,
                area,
                countryCode,
                companyId,
                name,
                phone,
                role,
                taxId,
                taxOfficeCode,
                website,
                email
        }) => ({activity,
                street,
                streetNumber,
                zipCode,
                city,
                area,
                countryCode,
                companyId,
                name,
                phone,
                role,
                taxId,
                taxOfficeCode,
                website,
                email
        }))(entity);

        dispatch(addEntityStart());
        const response = await fetch(`${baseURL}entity/id/${entity.id}?tokenId=${token}`, {
            method: 'PUT',
            body: JSON.stringify(postData)
        });

        response.ok ? dispatch(updateEntity(entity)) : dispatch(addEntityFail(response.status));
    }

    postEntity().catch(error => console.log(error));
};

export const deleteExistingEntity = (id, token) => dispatch => {
    const removeEntity = async () => {
        const response = await fetch(`${baseURL}entity/id/${id}?tokenId=${token}`, {
            method: 'DELETE',
        });

        response.ok ?
            dispatch(deleteEntity(id)) :
            dispatch(addEntityFail());
    };

    removeEntity().catch(error => console.log(error));
};

//  selectors
export const entitiesSelector = state => state.entity;

//  export the reducer to the central store
export default entitySlice.reducer;

