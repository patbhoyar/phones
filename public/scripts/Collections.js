App.Collections.Phones = Backbone.Collection.extend({   
   model: App.Models.Phones
});

App.Collections.Brands = Backbone.Collection.extend({   
   model: App.Models.Brands,
   url: 'brands'
});