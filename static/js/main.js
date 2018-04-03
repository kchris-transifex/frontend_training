

(function() {
  'use strict';

  var Post = Backbone.Model.extend({
    defaults: {
      post_title: '',
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

  });

  var PostsView = Marionette.CollectionView.extend({
    childView: PostView,

  });

  var HeaderView = Marionette.LayoutView.extend({
    template: "#header-template",
    events: {
      'click #add_blogpost': 'onClickAddBlogPost',
    },
    onClickAddBlogPost: function() {
      $("#myModal").modal('show');
    },
  });

  var ModalView = Marionette.LayoutView.extend({
    template: "#modal-template",

    initialize: function(args) {
         console.log(args);
      this.collection = args.collection;
    },

    events: {
      'click #cancel': 'onClickCancel',
      'click #submit': 'onClickSubmit',
    },

    onClickCancel: function() {
      $("#myModal").modal('hide');
    },

    onClickSubmit: function() {
      var post_title = $("#post_title").val();
      var post_content = $("#post_content").val();
      console.log(post_title);
      console.log(post_content);

      this.collection.create({post_title:post_title, 
         post_text:post_content, 
         pub_date:"2018-03-04T11:02:08.896376Z"});
   
      $("#myModal").modal('hide');
    },

  });

  var AppLayoutView = Marionette.LayoutView.extend({
    template: "#layout-template",

    regions: {
      header: "#header",
      content: "#content",
      modal: "#modal",
    },

    initialize: function() {
      this.collection = new PostCollection();
      this.collection.fetch();
    },

    onRender: function() {
      this.showChildView('header', new HeaderView())
      this.showChildView('content', new PostsView({collection: this.collection}))
      this.showChildView('modal', new ModalView({collection: this.collection}))
    },

  });

  var layoutView = new AppLayoutView({el: "#root",});
  layoutView.render();

  // start marionette application
  var MyApp = new Marionette.Application();

  MyApp.start();


})();
