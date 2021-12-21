import { CheckoutAction } from './CheckoutAction';

const initialState = {
    PackageId: '',
    Email: '',
    CustomerAddressId: '',
    CourierId: 'JNE',
    CourierPackageCode: '',
    CourierPackageLabel: '',
    TotalProductPrice: '',
    CourierFee: '',
    Qty: 1,
    CityCode: ''
};

export default function CheckoutReducer(state = initialState, action) {
    switch (action.type) {
        case CheckoutAction.SET_ID: {
            const newState = { ...state };
            newState.PackageId = action.PackageId;
            return newState;
        }

        case CheckoutAction.SET_QTY: {
            const newState = { ...state };
            newState.Qty = action.Qty;
            return newState;
        }

        case CheckoutAction.SET_ID_ADRRESS: {
            const newState = { ...state };
            newState.CustomerAddressId = action.CustomerAddressId;
            return newState;
        }

        case CheckoutAction.SET_TOTAL: {
            const newState = { ...state };
            newState.TotalProductPrice = action.TotalProductPrice;
            return newState;
        }

        case CheckoutAction.SET_JNE: {
            const newState = { ...state };
            newState.CourierPackageCode = action.CourierPackageCode;
            newState.CourierPackageLabel = action.CourierPackageLabel;
            newState.CourierFee = action.CourierFee;
            newState.CityCode = action.CityCode;
            newState.Email = action.Email;
            return newState;
        }

        default:
            return state;
    }
}
