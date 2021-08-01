import { URI_FETCH } from '../constants';
import STORE from '../stores';
import Axios from 'axios';

export const getListProducts = () => {
    STORE.dispatch({
        type: 'GET_LIST_PRODUCT_REQUESTING',
        payload: null
    })
    console.log(`...requesting...`)
    Axios.get(`${URI_FETCH}/products`)
        .then(resp => {
            let respt = resp.data;
            console.log({ respt })
            STORE.dispatch({
                type: 'GET_ALL_PRODUCTS',
                payload: respt
            })
        })
        .catch(err => console.log({ err: err.message }));
}

export const addProduct = (title, description, price, image) => {
    const URI = `${URI_FETCH}/products`;
    
    const formData = new FormData();
    
    /**
     * ĐÍNH KÈM HÌNH ẢNH TRONG REQUEST
     */
    formData.append('image', image);
    /**
     * ĐÍNH KÈM DỮ LIỆU
     */
    const data = JSON.stringify({ title, description, price });
    formData.append('data', data);


    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    Axios.post(URI, formData, config)
        .then(resp => {
            let respt = resp.data;
            return STORE.dispatch({
                type: 'ADD_PRODUCT',
                payload: respt.data
            });
        })
        .catch(err => console.log({ err }));
}

export const removeProduct = productID => {

    STORE.dispatch({
        type: 'REQUESTING_REMOVE',
        payload: {
            productID
        }
    })

    const URI = `${URI_FETCH}/product/${productID}`;

    Axios.delete(URI)
        .then(resp => {
            const respt = resp.data;
            const { data: { _id: productID } } = respt;
            STORE.dispatch({
                type: 'REMOVE_PRODUCT',
                payload: {
                    productID
                }
            });

            STORE.dispatch({
                type: 'REMOVE_DONE',
                payload: null
            })
        }).catch(err => 
        {
            STORE.dispatch({
                type: 'REMOVE_DONE',
                payload: null
            });
            console.log({ err: err.message })
        });
}

export const getInfoProduct = productID => {
    STORE.dispatch({
        type: 'REQUESTING_GET_INFO_PRODUCT',
        payload: {
            productID
        }
    })
    const URI = `${URI_FETCH}/product/${productID}`;
    Axios.get(URI)
        .then(resp => {
            const respt = resp.data;
            const { data: product } = respt;
            STORE.dispatch({
                type: 'GET_INFO_PRODUCT',
                payload: {
                    product
                }
            });

            STORE.dispatch({
                type: 'GET_INFO_PRODUCT_DONE',
                payload: null
            })
        }).catch(err => 
        {
            STORE.dispatch({
                type: 'GET_INFO_PRODUCT_DONE',
                payload: null
            })
            console.log({ err: err.message })
        });
}

export const updateInfoProduct = (productID, title, description, price, image) => {
    STORE.dispatch({
        type: 'REQUESTING_UPDATE_INFO_PRODUCT',
        payload: null
    })

    const formData = new FormData();
    
    /**
     * ĐÍNH KÈM HÌNH ẢNH TRONG REQUEST
     */
    formData.append('image', image);
    /**
     * ĐÍNH KÈM DỮ LIỆU
     */
    const data = JSON.stringify({ title, description, price });
    formData.append('data', data);


    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    const URI = `${URI_FETCH}/product/${productID}`;

    Axios.put(URI, formData, config)
        .then(resp => {
            const respt = resp.data;
            const { data: productNew } = respt;
            STORE.dispatch({
                type: 'UPDATE_INFO_PRODUCT_NEW',
                payload: {
                    product: productNew
                }
            })

            STORE.dispatch({
                type: 'UPDATE_PRODUCT_DONE',
                payload: null
            })
        })
        .catch(err => {
            STORE.dispatch({
                type: 'UPDATE_PRODUCT_DONE',
                payload: null
            })
        })
}