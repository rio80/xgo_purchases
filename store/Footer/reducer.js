import { FooterAction } from './FooterAction';

const initialState = {
    data: { nama: '-', alamat: '-' },
    produk: { nama: '-', paket: '-', harga: '-' },
    pengiriman: { nama: '-', hari: '-' }
};

export default function FooterReducer(state = initialState, action) {
    switch (action.type) {
        case FooterAction.SET_PRODUK: {
            const newState = { ...state };
            newState.produk.nama = action.nama;
            newState.produk.paket = action.paket;
            newState.produk.harga = action.harga;
            return newState;
        }

        case FooterAction.SET_DATA: {
            const newState = { ...state };
            newState.data.nama = action.nama;
            newState.data.alamat = action.alamat;
            return newState;
        }

        case FooterAction.SET_PENGIRIMAN: {
            const newState = { ...state };
            newState.pengiriman.nama = action.nama;
            newState.pengiriman.hari = action.hari;
            return newState;
        }
        
        default:
            return state;
    }
}
