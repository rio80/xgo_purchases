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
            newState.data_qr = action.data_qr;
            return newState;
        }
        default:
            return state;
    }
}
