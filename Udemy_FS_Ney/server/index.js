const express = require('express');
const app = express();
const expressSession = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const { signPromise, verifyPromise } = require('./utils/jwt');
const users = [
    { username: 'abc', password: '$2b$08$kkQESVLk96qbzSX1EL06WOQlqAE3X2v9PmtOQDt4Ct7Ruc7aC2gNK'}
];
const mongoose = require('mongoose');
const UPLOAD_CONFIG = require('./utils/multer');
const Product = require('./models/products');
app.use(expressSession({
    secret: 'MERN_STACK_0106 AAA',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 300000   
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({}));

app.use(express.static('./public/'))

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log({  username, password  })
    let infoUser = users.find(user => Object.is(username.toString(), user.username.toString()));

    let isMatching = await bcrypt.compare(password, infoUser.password);
    if (!isMatching) res.json({ error: true, message: 'pwd_not_matching' });

    let signalSignToken = await signPromise({ username });
    setTimeout(() => {
        res.json({
            error: false, data: { username, token: signalSignToken.token }
        });
    }, 2000);
});

app.get('/refresh-token/:token', async (req, res) => {
    const { token } = req.params;
    let objDecoded = await verifyPromise(token);
    let { data: { username } } = objDecoded;

    let signalSignToken = await signPromise({ username });
    res.json({
        error: false, data: { username, token: signalSignToken.token }
    });
});

app.post('/products', UPLOAD_CONFIG.single('image'), async (req, res) => {
    const { title, description, price } = JSON.parse(req.body.data);
    const { originalname } = req.file;

    let initInfoProduct = new Product({ title, description, price, image: originalname });
    let infoProductAfterInserted = await initInfoProduct.save();


    if (!infoProductAfterInserted) return res.json({ error: true, message: 'cannot_insert_product' });

    return res.json({ error: false, data: infoProductAfterInserted });
    // let infoProduct = await PRODUCT_MODEL.addProduct(title, description, price, image);
    // res.json(infoProduct);
});

app.get('/products', async (req, res) => {
    console.log('....')
    let listProducts = await Product.find({});
    res.json(listProducts);
});

app.delete('/product/:productID', async (req, res) => {
    try {
        const { productID } = req.params;
        let infoProductHasBeenDeleted = await Product.findByIdAndRemove(productID);
        if (!infoProductHasBeenDeleted) res.json({
            error: true, message: 'cannot_remove_item'
        });

        setTimeout(() => {
            res.json({ error: false, data: infoProductHasBeenDeleted });
        }, 1500);
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
});

app.get('/product/:productID', async (req, res) => {
    try {
        const { productID } = req.params;
        let infoProduct = await Product.findById(productID);
        if (!infoProduct) res.json({
            error: true, message: 'cannot_get_item'
        });

        setTimeout(() => {
            res.json({ error: false, data: infoProduct });
        }, 1500);
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
});

app.put('/product/:productID', UPLOAD_CONFIG.single('image'), async (req, res) => {
    const { productID } = req.params;
    const { title, description, price } = JSON.parse(req.body.data);
    const objUpdate = {};

    objUpdate.title = title;
    objUpdate.description = description;
    objUpdate.price = price;

    if (req.file) {
        const { originalname } = req.file;
        objUpdate.image = originalname;
    }
    let infoAfterUpdate = await Product.findByIdAndUpdate(productID, objUpdate, { new: true });
    if (!infoAfterUpdate) res.json({
        error: true, message: 'cannot_update'
    });

    setTimeout(() => {
        res.json({ error: false, data: infoAfterUpdate });
    }, 1500);
})

// const uri      = 'mongodb://localhost:27017/project_final';
const uri = `mongodb://abc:abc123@ds157857.mlab.com:57857/final_mern_stack_0106`;
const PORT = process.env.PORT || 5000;
mongoose.connect(uri);
mongoose.connection.once('open', () => {
    console.log(`mongo client connected`)
    app.listen(PORT, () => console.log(`server started at port ${PORT}`));
}); 