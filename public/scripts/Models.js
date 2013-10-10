App.Models.Phones = Backbone.Model.extend({
   defaults: {
       id: 0,
       modelName: '',
       launchYear: '',
       unitsSold: '',
       brandName: ''
   }
});

App.Models.Brands = Backbone.Model.extend({
   defaults: {
       id: 0,
       brandName: ''
   }
});