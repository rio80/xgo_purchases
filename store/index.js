import { combineReducers } from 'redux';
import KodeReducer from './KodeBayar/reducer';
import AlamatReducer from './Alamat/reducer';
import FooterReducer from './Footer/reducer';
import CheckoutReducer from './Checkout/reducer';

export default combineReducers({
  KodeReducer,
  AlamatReducer,
  FooterReducer,
  CheckoutReducer
});
