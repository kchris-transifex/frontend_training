var PostCollection = Backbone.Collection.extend({
    model: Post,
    url: 'http://127.0.0.1:9000/blogposts/'
});

