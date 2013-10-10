App.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'phone/:id': 'getPhone'
    },
    
    getPhone: function(id) {
        console.log("triggering");
        vent.trigger('phone:selected', id);
    }
});