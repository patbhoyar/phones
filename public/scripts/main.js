(function(){

    var brands = new App.Collections.Brands;
    brands.fetch().then(function(){
        var view = new App.Views.AppView({ collection : brands });
        view.render().el;
    });

})();