import { DeleteAlamatAction } from './DeleteAlamatAction';

const initialState = {
    customer_address_id: '',
    del: false
};

export default function DeleteAlamatReducer(state = initialState, action) {
    switch (action.type) {
        case DeleteAlamatAction.SET_ID: {
            const newState = { ...state };
            newState.customer_address_id = action.customer_address_id;
            newState.del = action.del;
            return newState;
        }

        default:
            return state;
    }
}
