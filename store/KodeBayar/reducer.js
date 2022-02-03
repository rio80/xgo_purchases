import { KodeAction } from './KodeBayarAction';

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
        case KodeAction.SET_QRCODE: {
            const newState = { ...state };
            newState.url_qrcode = action.url;
            return newState;
        }
        default:
            return state;
    }
}
