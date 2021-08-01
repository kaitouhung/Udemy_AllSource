const initState = {
    listProducts: [],
    infoProductPrepareUpdate: undefined,
    requestingGetInfo: '', //_id of item(product)
    requestingRemove: '',
    updatingInfo: false,
}
/**
 * 
 * @param {*} state 
 * @param {*} action { type: '', payload: {} }
 */
export default function productReducer(state = initState, action) {
    switch(action.type) {
        case 'GET_ALL_PRODUCTS': 
            return {
                ...state,
                listProducts: action.payload
            };

        case 'ADD_PRODUCT': {
            return {
                ...state,
                listProducts: [...state.listProducts, action.payload]
            }
        }

        case 'REQUESTING_REMOVE': 
            return {
                ...state,
                requestingRemove: action.payload.productID
            }

        case 'REMOVE_PRODUCT': 
            return  {
                ...state,
                listProducts: state.listProducts.filter(product => !Object.is(product._id, action.payload.productID ))
            }
        
        case 'REMOVE_DONE': 
            return {
                ...state,
                requestingRemove: '' 
            }
        
        case 'GET_INFO_PRODUCT':
            return {
                ...state,
                infoProductPrepareUpdate: action.payload.product
            }

        case 'REQUESTING_GET_INFO_PRODUCT':
            return {
                ...state,
                requestingGetInfo: action.payload.productID
            }

        case 'GET_INFO_PRODUCT_DONE':
            return {
                ...state,
                requestingGetInfo: ''
            }

        case 'UPDATE_INFO_PRODUCT_NEW': 
        {
            // let { _id: productIdUpdateNew, title, description, price } = action.payload.product;
            // /**
            //  * ITEM FINDED IN STATE(STORE)
            //  */
            // let infoItemInState = state.listProducts.find(product => Object.is(product._id, productIdUpdateNew));
            // let infoItemNew     = {
            //     ...infoItemInState, 
            //     title, description, price
            // };
            // let indexItem = state.listProducts.findIndex(product => Object.is(product._id, productIdUpdateNew));
            // state.listProducts.splice(indexItem, 1)
            // return {
            //     ...state,
            //     listProducts: [...state.listProducts, infoItemNew]
            // }

            let { _id: productIdUpdateNew, title, description, price } = action.payload.product;

            let newArr = state.listProducts.map(product => {
                if (product._id !== productIdUpdateNew) return product;
                return {
                    ...product,
                    title, description, price
                }
            });
            return {
                ...state, listProducts: newArr
            }
        }  

        case 'REQUESTING_UPDATE_INFO_PRODUCT':
            return {
                ...state,
                updatingInfo: true
            }

        case 'UPDATE_PRODUCT_DONE':
            return {
                ...state,
                updatingInfo: false
            }

        default:
            return state;
    }
}