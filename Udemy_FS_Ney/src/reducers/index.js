import { combineReducers } from 'redux';
import USERS from './users';
import PRODUCTS from './products';
import CARTS from './carts';

export default combineReducers({
    users: USERS,
    products: PRODUCTS,
    carts:    CARTS
});