var app = app || {};

app.Book = Backbone.Model.extend({
    defaults:{
        coverImage: 'img/placeholder.png',
        title: 'No title',
        author: 'Unknow',
        releaseDate: 'Unknow',
        keywords: 'None'
    }
});