const express = require('express');
const app = express();
const product = require("./routes/product");
const port = 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//use the product.js file to handle endpoints that starts with /product
app.use("/produto" , product);



app.listen(port, err => {
    if (err) {
        return console.log(`ERROR ${err}`);
    } else {
        console.log(`Listening at port ${port}`);
    }
})