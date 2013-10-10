App.Views.AppView = Backbone.View.extend({
    
    render: function() {
        var view = new App.Views.Brands({ collection: this.collection });
        view.render().el;
        return this;
    }
});

/*
 * Brands View
 */

App.Views.Brands = Backbone.View.extend({
    el:'#phoneBrands',
    
    render: function() {
        var sortedBrands = _.sortBy(this.collection.toJSON(), function(brand){ return brand.brandName; })
        _.each(sortedBrands, this.addOne, this);
        return this;
    },
            
    addOne: function(brand) {
        var brand = new App.Views.Brand({model: brand});
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
        this.$el.text(this.model.brandName);
        return this;
    },
    
    brandSelected: function() {
            console.log(this.model);
    }
});

/* 
 * Phones List View
 */

App.Views.Phones = Backbone.View.extend({
   tagName: 'tbody',
   
    render: function() {
        this.collection.each(this.addOne, this);
        return this;
    },
    
    addOne: function(phone){
        var phone = new App.Views.Phone({ model: phone });
        this.$el.append(phone.render().el);
    }
});

App.Views.Phone = Backbone.View.extend({
    tagName: 'tr',
            
    template: window.template('phonesTemplate'),
    
    events: {
        'click': 'displayPhone'
    },
    
    render: function() {
        this.$el.attr('id',this.model.get('id'));
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },
            
    displayPhone: function() {
        appRouter.navigate('phone/'+this.model.get('id'));
        
        var displayPhone = new App.Views.DisplayPhone({ model: this.model });
        $("#phoneDisplay").html(displayPhone.render().el) ;
    }
});

/* 
 * Display Phones View
 */

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