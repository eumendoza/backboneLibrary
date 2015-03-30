var app = app || {};

app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template:  _.template($('#bookTemplate').html()),
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	events: {
		'click .delete': 'deleteBook',
		'click .duplicate': 'duplicateBook'
	},
	deleteBook: function(){
		this.model.destroy();
		this.remove();
	},
	duplicateBook: function(e){
		e.preventDefault();
		var formData = {};
		_.each(this.model.attributes, function(value,key){
			if(key != (('__v')&&('_id')&&('id'))){
				if(key === 'keywords'){
					formData[key] = [];
					_.each(value,function(v){
						formData[key].push({'keyword':v.keyword});
					});
				}else{
					formData[key] = value;
				}
			}
		});

		var BookCopied = new app.Book(formData);
		BookCopied.set('title',BookCopied.get('title')+' - COPY');
		this.model.collection.create(BookCopied);
	}
});