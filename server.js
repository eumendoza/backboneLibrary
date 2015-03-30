// Module dependencies.
var application_root = __dirname,
    express = require('express'), //Web framework
    bodyParser = require('body-parser'), //Parser for reading request body
    path = require('path'), //Utilities for dealing with file paths
    mongoose = require('mongoose'); //MongoDB integration

//Express Server configuration
var app = express();

app.configure(function(){

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root,'')));
	app.use(express.errorHandler({dumpExceptions:true,showStack:true}));

});

var port = 4711;
app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});

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