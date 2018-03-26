

(function() {
  'use strict';

  var Post = Backbone.Model.extend({
    defaults: {
      post_text: '',
      pub_date: '',
    },
    url: function() {
        var origUrl = Backbone.Model.prototype.url.call(this);
        return origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/');
    },
  });

  var PostCollection = Backbone.Collection.extend({
      model: Post,
      url: 'http://127.0.0.1:9000/blogposts/'
  });

  window.Post = Post;
  window.PostCollection = PostCollection;

  var PostView = Marionette.ItemView.extend({
    template: "#post-template",

    initialize: function() {
      console.log('PostView initialized');
    },
  });

  var PostsView = Marionette.CollectionView.extend({
    childView: PostView,

    initialize: function() {
      console.log('PostsView initialized');
    },

  });

  var HeaderView = Marionette.LayoutView.extend({
    template: "#header-template",
    events: {
      'click': 'onClickButton'
    },
    onClickButton: function() {
      console.log('clicked');
    },
  });

  var AppLayoutView = Marionette.LayoutView.extend({
    template: "#layout-template",

    regions: {
      header: "#header",
      content: "#content",
    },

    initialize: function() {
      this.collection = new PostCollection();
      this.collection.fetch();
    },

    onRender: function() {
      this.showChildView('header', new HeaderView())
      this.showChildView('content', new PostsView({collection: this.collection}))
    },

  });

  var layoutView = new AppLayoutView({el: "#root",});
  layoutView.render();

  // start marionette application
  var MyApp = new Marionette.Application();

  MyApp.start();


})();
