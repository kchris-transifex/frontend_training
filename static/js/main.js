

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
   
    ui: {
      edit: '.blog-post',
    },

    events: {
      'click @ui.edit': 'onClickEditBlogPost',
    },
   
    modelEvents: {'sync': 'render'},

    onClickEditBlogPost: function() {
      this.triggerMethod('edit:post', this);
    }

  });

  var PostsView = Marionette.CollectionView.extend({
    childView: PostView,
    
  });

  var ContentView = Marionette.LayoutView.extend({
    template: "#content-template",

    regions: {
      posts: '#posts',
    },
    
    initialize: function(options) {
      this.collection = options.collection;
      this.modalView = options.modalView;
    },
 
    childEvents: {
      'edit:post': 'TriggerToLayout',
    }, 
    onRender: function() {
      this.showChildView('posts', new PostsView({collection: this.collection}));
    },
    
    TriggerToLayout: function(clicked){
      var model = clicked.model;
      var post_title = model.get('post_title');
      var post_text = model.get('post_text');
      var event_type = 'edit';
      console.log(event_type);
      this.modalView.open({
        collection: this.collection,
        post_title: post_title,
        post_text: post_text,
        model: model,
        event_type: event_type,
      });

    },

  });
  

  var HeaderView = Marionette.LayoutView.extend({
    template: "#header-template",

    initialize: function(options) {
      this.collection = options.collection;
      this.modalView = options.modalView
    },
    ui: {
      add: '#add_blogpost',
    },

    events: {
      'click @ui.add': 'onClickAddBlogPost',
    },

    onClickAddBlogPost: function() {
      var event_type = 'add';
      console.log(event_type);
      this.modalView.open({
        collection: this.collection,
        post_title: "",
        post_text: "",
        model: null,
        event_type: event_type,
      });
    },
  });

  var ModalView = Marionette.LayoutView.extend({
    template: "#modal-template",

    ui: {
      cancel: '#cancel',
      delete_post: '#delete',
      submit: '#submit',
    },

    events: {
      'click @ui.cancel': 'onClickCancel',
      'click @ui.delete_post': 'onClickDelete',
      'click @ui.submit': 'onClickSubmit',
    },

    open: function(options) {
      this.collection = options.collection;
      this.post_title = options.post_title;
      this.post_text = options.post_text;
      this.model = options.model
      this.event_type = options.event_type;


      $("#post_title").val(this.post_title);
      $("#post_content").val(this.post_text);
      $('#delete').show();
      if(this.event_type == 'add'){
        $('#delete').hide()
      } 
      $("#myModal").modal('show');
    },

    createPost: function(post_title, post_text){
       this.collection.create({post_title:post_title, 
         post_text:post_text, 
         pub_date:"2018-03-04T11:02:08.896376Z"});

    },

    editPost: function(post_title, post_text){
       this.model.set({post_title:post_title, 
         post_text:post_text, 
         pub_date:"2018-03-04T11:02:08.896376Z"})
       this.model.save();
    },

    onClickDelete: function(){
      if (confirm("Do you really want to delete this Post?")) {
        this.model.destroy();
        this.resetModal();
      }
    },

    onClickCancel: function() {
      this.resetModal();
    },

    onClickSubmit: function() {
      var post_title = $("#post_title").val();
      var post_text = $("#post_content").val();

      console.log(this.event_type);
      if(this.event_type == 'edit' && this.model){
        this.editPost(post_title, post_text);
      } else {
        this.createPost(post_title, post_text);
      }
      this.resetModal();
    },
    
    resetModal: function(){
      $("#post_title").val('');
      $("#post_content").val('');
      $("#myModal").modal('hide');


    },

  });

  var AppLayoutView = Marionette.LayoutView.extend({
    template: "#layout-template",

    regions: {
      header: "#header",
      content: "#content",
      modal: "#modal"
    },
    
    initialize: function() {
      this.collection = new PostCollection();
      this.collection.fetch();
    },

    onRender: function() {
      var modalView = new ModalView();
      this.showChildView('header', new HeaderView({
        collection: this.collection, modalView: modalView
      }));
      this.showChildView('content', new ContentView({
        collection: this.collection, modalView: modalView
      }));
      this.showChildView('modal', modalView);
    },


  });

  var layoutView = new AppLayoutView({el: "#root",});
  layoutView.render();

  // start marionette application
  var MyApp = new Marionette.Application();

  MyApp.start();


})();
