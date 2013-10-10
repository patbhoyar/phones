App.Views.AppView = Backbone.View.extend({
    
    initialize: function() {
      vent.on('brand:selected', this.displayPhones, this); 
      vent.on('phone:selected', this.createDisplayforPhone, this);  
    },
    
    render: function() {
        var view = new App.Views.Brands({ collection: this.collection });
        view.render().el;
        return this;
    },
    
    displayPhones: function(id) {
        vent.trigger('phoneInfo:remove');

        var brandName = _.filter(this.collection.toJSON(), function(brand){ return brand.id == id; })[0].brandName;
        
        var phones = new App.Collections.Phones();
        phones.url = 'phones/brand/'+id;
        phones.fetch().then(function(){
            var phonesDisplay = new App.Views.Phones({ collection: phones, brand: brandName });
            $("#phones").css('display', 'block');
            $("#phonesCollection").remove();
            $('#phonesCollectionHeader').after(phonesDisplay.render().el);
        });
    },
            
    createDisplayforPhone: function(id){
        var phone = new App.Collections.Phones();
        phone.url = 'phones/'+id;
        phone.fetch().then(function(){
            var phoneModel = phone.models[0];
            var brand = new App.Collections.Brands();
            brand.url = 'brands/'+phoneModel.get('brandId');
            brand.fetch().then(function(){
                var theBrand = brand.toJSON()[0].brandName;
                phoneModel.set('brandName', theBrand);
                var phoneInfo = new App.Views.DisplayPhoneInfo({model: phoneModel});
                $("#phoneDisplay").html(phoneInfo.render().el) ; 
            });
        });
    }
});

/*
 * Brands View
 */

App.Views.Brands = Backbone.View.extend({
    el:'#phoneBrands',
    className: 'btn-group',
    
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
    className: 'btn btn-default',
    type: 'button',
    
    events: {
      'click': 'brandSelected' 
    },
    
    render: function() {
        this.$el.text(this.model.brandName);
        return this;
    },
    
    brandSelected: function() {
        vent.trigger('brand:selected', this.model.id);
    }
});

/* 
 * Phones List View
 */

App.Views.Phones = Backbone.View.extend({
    tagName: 'tbody',
    id: 'phonesCollection',
    
    initialize: function() {
        vent.on('phone:selected', this.remove, this);   
    },
   
    render: function() {
        this.collection.each(this.addOne, this);
        return this;
    },
    
    addOne: function(phone){
        var phone = new App.Views.Phone({ model: phone, brand: this.options.brand });
        this.$el.append(phone.render().el);
    },
            
    method: function() {
        $("#phonesCollection").remove();   
    }
});

App.Views.Phone = Backbone.View.extend({
    tagName: 'tr',
            
    template: window.template('phonesTemplate'),
    
    events: {
        'click': 'displayPhone'
    },
    
    render: function() {
        this.model.set('brandName', this.options.brand);
        this.$el.attr('id',this.model.get('id'));
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    },
            
    displayPhone: function() {
        appRouter.navigate('phone/'+this.model.get('id'));
        
        var displayPhone = new App.Views.DisplayPhoneInfo({ model: this.model });
        $("#phoneDisplay").html(displayPhone.render().el) ;
    }
});

/* 
 * Display Phones View
 */

App.Views.DisplayPhoneInfo = Backbone.View.extend({
    tagName: 'table',
    className: 'table',
    
    initialize: function() {
      vent.on('phoneInfo:remove', this.remove, this);  
    },
    
    template: window.template('phoneDisplayTemplate'),
    
    render: function() {
        var displayImage = new App.Views.displayImage({model: this.model});
        $("#imageContainer").html(displayImage.render().el).fadeIn('slow');
        this.$el.remove();
        this.$el.html(this.template(this.model.toJSON()));   
        return this;
    },
    
    remove: function() {
        this.$el.remove();
    }
});

App.Views.displayImage = Backbone.View.extend({
    el: '#theImage',
    
    initialize: function() {
      vent.on('phoneInfo:remove', this.remove, this);  
    },
            
    render: function() {
        this.$el.attr('src', this.model.get('image'));
        return this;
    },
    
    remove: function() {
        this.$el.attr('src', '');
    }     
});