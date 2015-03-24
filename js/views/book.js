var app = app || {};

app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template: _.template($('#bookTemplate').html()),
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
	duplicateBook: function(){
		var BookCopied = new app.Book(this.model.attributes);
		BookCopied.set('title',this.model.get('title')+' - COPY');
		this.model.collection.add(BookCopied);
	}
});