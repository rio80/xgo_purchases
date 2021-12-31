import { AktivasiAction } from './AktivasiAction';

const initialState = {
    aktivasi: false
};

export default function AktivasiReducer(state = initialState, action) {
    switch (action.type) {
        case AktivasiAction.SET_AKTIVASI: {
            const newState = { ...state };
            newState.aktivasi = action.aktivasi;
            return newState;
        }

        default:
            return state;
    }
}