import { AlamatAction } from './AlamatAction';

const initialState = {
    receiver_fullname: '',
    customer_address: '',
    customer_address_id: '',
    customer_mobilephone: '',
    customer_name: ''
};

export default function AlamatReducer(state = initialState, action) {
    switch (action.type) {
        case AlamatAction.SET_ALAMAT: {
            const newState = { ...state };
            newState.receiver_fullname = action.receiver_fullname;
            newState.customer_address = action.customer_address;
            newState.customer_address_id = action.customer_address_id;
            newState.customer_mobilephone = action.customer_mobilephone
            newState.customer_name = action.customer_name;
            return newState;
        }
        default:
            return state;
    }
}
