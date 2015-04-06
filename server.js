var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var app = express();

app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());

app.listen(3030);   
console.log('Listen on 3030');

//MongoDB configuration
mongoose.connect('mongodb://localhost/library_database');

var Keywords = new mongoose.Schema({
	keyword: String
});

var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date,
	keywords: [Keywords]
});

var BookModel = mongoose.model('Book',Book);

// API Library

app.get('/api/books', function(request,response){
	return BookModel.find(function(err,books){
		if(!err){
			return response.send(books);
		}else{
			return console.log(err);
		}
	});
});

app.post('/api/books',function(request,response){
	var book = new BookModel({
		title: request.body.title,
		author: request.body.author,
		releaseDate: request.body.releaseDate,
		keywords: request.body.keywords
	});
	return book.save(function(err){
		if(!err){
			return response.send(book);
		}else{
			return console.log(err);
		}
	});
});

app.get('/api/books/:id',function(request,response){
	return BookModel.findById(request.params.id, function(err,response){
		if(!err){
			return response.send(book);
		}else{
			return console.log(err);
		}
	});
});

app.put('/api/books/:id',function(request,response){
	return BookModel.findById(request.params.id, function(err,response){
		book.title = request.body.title;
		book.author = request.body.author;
		book.releaseDate = request.body.releaseDate;
		book.keywords = request.body.keywords;

		return book.save(function(err){
			if(!err){
				return response.send(book);
			}else{
				return console.log(err);
			}
		});

	});
});

app.delete('/api/books/:id',function(request,response){
	return BookModel.findById(request.params.id, function(err,book){
		return book.remove(function(err){
			if(!err){
				return response.send('');
			}else{
				return console.log(err);
			}
		});
	});
});
