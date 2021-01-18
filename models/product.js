const mongoose = require('mongoose');
const categories = require('./categories');

//Configuração do documento com validação
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		reqired: true,
		min: 0
	},
	category: {
		type: String,
		lowercase: true,
		enum: categories
	}
});

//Criação do modelo
const Product = mongoose.model('Product', productSchema);

module.exports = exports = Product;
