const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ProductSchema = new Schema({
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    price: Number,
    createAt: { type: Date, default: Date.now },
    image: String,
});

const Product       = mongoose.model('product', ProductSchema);

// class Product extends Product {
//     static addProduct(title, description, price, image) {
//         return new Promise(async resolve => {
//             try {
//                 let initInfoProduct = new Product({ title, description, price, image });
//                 let infoProductAfterInserted = await initInfoProduct.save();
//                 if (!infoProductAfterInserted) return resolve({ error: true, message: 'cannot_insert_product' });

//                 return resolve({ error: false, data: infoProductAfterInserted });
//             } catch (error) {
//                 return resolve({ error: true, message: error.message });
//             }
//         });
//     }

//     static getListProduct(){
//         return new Promise(async resolve => {
//             let listProducts = await Product.find({});
//             if (!listProducts) return resolve({ error: true, message: 'cannot_get_list' });

//             return resolve({ error: false, data: listProducts });
//         })
//     }
// }
module.exports = Product;