const mongoose = require('mongoose');
const Product = require('./models/product');

const productSeeds = [
	{
		name: 'Ruby Grapefruit',
		price: 2.99,
		category: 'fruit'
	},
	{
		name: 'Fairy Eggplant',
		price: 1.0,
		category: 'vegetable'
	},
	{
		name: 'Organic Goddess Melon',
		price: 4.99,
		category: 'fruit'
	},
	{
		name: 'Organic Mini Seedless Melon',
		price: 3.99,
		category: 'fruit'
	},
	{
		name: 'Organic Celery',
		price: 1.5,
		category: 'vegetable'
	},
	{
		name: 'Chocolate Whole Milk',
		price: 2.69,
		category: 'dairy'
	}
];

mongoose
	.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function() {
		console.log('We got a good Mongo DB connection');
	})
	.catch(function(error) {
		console.error('We got a Mongo DB Failure!!!');
		console.error(error);
	});

// const newProduct = new Product({
// 	name: 'Ruby Grapefruit',
// 	price: 2.99,
// 	category: 'fruit'
// });

// newProduct
// 	.save()
// 	.then((value) => {
// 		console.log(value);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});

Product.insertMany(productSeeds)
	.then((value) => {
		console.log(value);
	})
	.catch((error) => {
		console.error(error);
	});
