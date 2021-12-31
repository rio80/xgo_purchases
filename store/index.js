import { combineReducers } from 'redux';
import KodeReducer from './KodeBayar/reducer';
import AlamatReducer from './Alamat/reducer';
import FooterReducer from './Footer/reducer';
import CheckoutReducer from './Checkout/reducer';
import AktivasiReducer from './Aktivasi/reducer';

export default combineReducers({
  KodeReducer,
  AlamatReducer,
  FooterReducer,
  CheckoutReducer,
  AktivasiReducer
});
