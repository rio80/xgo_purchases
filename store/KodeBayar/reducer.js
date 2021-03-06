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
            newState.url = action.url;
            newState.base64 = action.base64;
            newState.midtrans_id = action.midtrans_id;
            return newState;
        }
        default:
            return state;
    }
}
