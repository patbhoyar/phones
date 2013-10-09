(function(){

window.App = {
   Models: {},
   Views: {},
   Collections: {},
   Router: {}
};

window.template = function(id){
    return _.template($("#"+id).html());
};
    
window.vent = _.extend({}, Backbone.Events);

App.Models.Model = Backbone.Model.extend({
   defaults: {
       id: 0,
       modelName: '',
       launchYear: '',
       unitsSold: '',
       brandName: ''
   }
});

App.Collections.Collection = Backbone.Collection.extend({   
   model: App.Models.Model,
   url: 'phones'
});

App.Views.AppView = Backbone.View.extend({
    initialize: function() {
        console.log("trigger caught");
        vent.on('phone:show', this.createDisplay, this); 
    },
    
    render: function() {
        var view = new App.Views.Phones({ collection: phones });
        $('#phonesCollection').append(view.render().el);
        return this;
    },
            
    createDisplay: function(id) {
        console.log("trigger handled");
        var phone = phones.get(id);
        var displayPhone = new App.Views.DisplayPhone({ model: phone });
        $("#phoneDisplay").html(displayPhone.render().el) ;
    }
});

App.Views.Brands = Backbone.View.extend({
    el:'#phoneBrands',
    
    render: function() {

        var theBrands = _.chain(phones.toJSON())
        .pluck('brandName')
        .uniq()
        .sort()
        .value();

        _.each(theBrands, this.addOne, this);
        return this;
    },
            
    addOne: function(brand) {
        var brand = new App.Views.Brand({model: brand, collection: phones});
        this.$el.append(brand.render().el);
    }
});

App.Views.Brand = Backbone.View.extend({
    tagName: 'button',
    className: 'btn',
    
    events: {
      'click': 'brandSelected' 
    },
    
    render: function() {
        this.$el.text(this.model);
        return this;
    },
    
    brandSelected: function() {
        var thePhones = _.where(this.collection.toJSON(), {brandName: this.model});

        console.log(thePhones);
        var view = new App.Views.Phones({ collection: thePhones });
        $('#phonesCollection').append(view.render().el);
    }
});

App.Views.Phones = Backbone.View.extend({
   tagName: 'tbody',
           
    initialize: function() {
        vent.on('phones:show', this.displayBrandsPhones, this); 
    },
   
    render: function() {
        _.each(this.collection, this.addOne, this);
        //this.collection.each(this.addOne, this);
        return this;
    },
    
    addOne: function(phone){
        var phone = new App.Views.Phone({ model: phone });
        this.$el.append(phone.render().el);
    },
    
    displayBrandsPhones: function(brand) {
        console.log("displaying "+brand+" phones");
        var thePhones = _.where(this.collection.toJSON(), {brandName: brand});
        console.log(thePhones);
        _.bind(this.render, thePhones);
    }
});

App.Views.Phone = Backbone.View.extend({
    tagName: 'tr',
            
    template: window.template('phonesTemplate'),
    
    events: {
        'click': 'displayPhone'
    },
    
    render: function() {
            console.log(this.model);
        this.$el.attr('id',this.model.id);
        this.$el.html( this.template( JSON.stringify(this.model) ) );
        return this;
    },
            
    displayPhone: function() {
        appRouter.navigate('phone/'+this.model.get('id'));
        
        var displayPhone = new App.Views.DisplayPhone({ model: this.model });
        $("#phoneDisplay").html(displayPhone.render().el) ;
    }
});

App.Views.DisplayPhone = Backbone.View.extend({
    tagName: 'table',
    className: 'table',
    
    template: window.template('phoneDisplayTemplate'),
    
    render: function() {
        var displayImage = new App.Views.displayImage({model: this.model});
        $("#imageContainer").html(displayImage.render().el).fadeIn('slow');
        this.$el.remove();
        this.$el.html(this.template(this.model.toJSON()));   
        return this;
    }
});

App.Views.displayImage = Backbone.View.extend({
    el: '#theImage',
            
    render: function() {
        this.$el.attr('src', this.model.get('image'));
        return this;
    }        
});

App.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'phone/:id': 'getPhone'
    },
    
    getPhone: function(id) {
        console.log("triggering");
        vent.trigger('phone:show', id);
    }
});



var phones = new App.Collections.Collection();
phones.fetch().then(function(){
    //var view = new App.Views.AppView({ collection: phones });
    //$('#phonesCollection').append(view.render().el);
    var brands = new App.Views.Brands({ collection: phones });
    $('#phoneBrands').append(brands.render().el);
    window.appRouter = new App.Router;
    Backbone.history.start();
});

})();