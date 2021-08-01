const initState = {
    carts: [],
    totalPrice: 0,
    totalAmount: 0
}

export default function cartReducer(state = initState, action) {
    switch(action.type) {
        case 'ADD_CART': 
        {
            const { product, quantity } = action.payload;
            let isExistItem = state.carts.find(item => Object.is(item.product._id, product._id));

            if(isExistItem) {
                let itemNewExist = {
                    ...isExistItem,
                    quantity: parseInt(isExistItem.quantity) + parseInt(quantity)
                };
                let itemsWithoutExist = state.carts.filter(item => !Object.is(item.product._id, product._id));
                let newCarts = [...itemsWithoutExist, itemNewExist];
                // CALCU price
                let totalPrice = newCarts.reduce((prevVal, currentVal) => {
                    const { quantity, product: { price } } = currentVal;
                    let totalPriceOfItem = parseInt(quantity) * parseInt(price);
                    return prevVal + totalPriceOfItem;
                }, 0); 
                return {
                    carts: newCarts, totalPrice
                }
            } else {
                let newCarts = [...state.carts, { product: product, quantity: quantity }];
                // CALCU
                let totalPrice = newCarts.reduce((prevVal, currentVal) => {
                    const { quantity, product: { price } } = currentVal;
                    let totalPriceOfItem = parseInt(quantity) * parseInt(price);
                    return prevVal + totalPriceOfItem;
                }, 0);
                return {
                    carts: newCarts, totalPrice
                }
            }
        }

        case 'REMOVE_CART': 
        {
            const { productID } = action.payload;
            let infoProduct = state.carts.find(item => Object.is(item.product._id, productID));
            const { quantity, product: { price } } = infoProduct;
            let totalPriceOfItem = parseInt(quantity) * parseInt(price);
            return {
                carts: state.carts.filter(item => {
                    return item.product._id !== productID
                }),
                totalPrice: parseInt(state.totalPrice) - totalPriceOfItem
            }
        }

        default:
            return state;
    }
}       