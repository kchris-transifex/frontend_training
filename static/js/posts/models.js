var Post = Backbone.Model.extend({
	defaults: {
		PostText: '',
		PubDate: '',
	},
       
	url: 'http://127.0.0.1:9000/blogposts/'
});

