import { KodeAction } from './action';

const initialState = {
    kode: '',
};

export default function KodeBayar(state = initialState, action) {
    switch (action.type) {
        case KodeAction.SET_KODE: {
            const newState = { ...state };
            newState.kode = action.kode;
            return newState;
        }
        default:
            return state;
    }
}
