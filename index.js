const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');
const categories = require('./models/categories');

const app = express();

mongoose
	.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function() {
		console.log('Mongo conection open!');
	})
	.catch(function(error) {
		console.log('Oh no Mongo connection Error!!!');
	});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res, next) {
	res.redirect('/products');
});

app.get('/products', async function(req, res, next) {
	const products = await Product.find({}).sort({ name: 1 });
	res.render('products', { products });
});

app
	.route('/products/new')
	.get(function(req, res, next) {
		// console.log('new');
		res.render('newProduct', { categories });
	})
	.post(async function(req, res, next) {
		const product = {
			name: req.body.productName,
			price: req.body.productPrice,
			category: req.body.productCategory
		};
		const newProduct = new Product(product);
		const result = await newProduct.save();
		// console.log(result);
		res.redirect('/products');
	});

app
	.route('/products/:id')
	.get(async function(req, res, next) {
		const id = req.params.id;
		const product = await Product.findById(id);
		res.render('detail', { product });
	})
	.put(async function(req, res, next) {
		const id = req.params.id;
		const product = {
			name: req.body.productName,
			price: req.body.productPrice,
			category: req.body.productCategory
		};
		// console.log(product);
		const result = await Product.findByIdAndUpdate(id, product, {
			runValidators: true,
			useFindAndModify: false
		});
		// console.log(result);
		res.redirect(`/products/${result._id}`);
	})
	.delete(async function(req, res, next) {
		const id = req.params.id;
		// Product.findOneAndDelete({id})
		await Product.findByIdAndRemove(id, { useFindAndModify: false });
		// console.log(deletedProduct);
		res.redirect('/products');
	});

app.get('/products/:id/edit', async function(req, res, next) {
	const product = await Product.findById(req.params.id);
	res.render('editProduct', { product, categories });
});

app.all('*', function(req, res, next) {
	res.redirect('/products');
});

app.listen(3000, function() {
	console.log('Listening at 3000 port');
});
