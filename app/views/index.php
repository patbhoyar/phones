<!doctype html>
<html>
<head>
    <title>Laravel, Backbone and Bootstrap</title>
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css"/>
</head>
<body>

    <header>
        <div class="navbar navbar-default navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <a href="#" class="brand">Phone Info</a>
                </div>
            </div>
        </div>
        
    </header>
    
    <div class="container text-center hero-unit">
        <h1>A Simple App using Laravel, Backbone and Bootstrap</h1>
    </div>
    
    <div class="container" id="phoneBrandsContainer">
        <div class="span3"></div>
        <div class="btn-group text-center span6" id="phoneBrands">
        </div>
        <div class="span3"></div>
    </div>
    
    <br>
    
    <div class="container">
        <div class="span3" id="phones">
            <table class="table table-hover" id="phonesCollection">
                <thead>
                    <tr> <th> <i class="icon-star"></i> Brand</th> <th>Phone Name</th> </tr>
                </thead>
                <script id="phonesTemplate" type="text/template">
                     <td><%= brandName %></td> <td><%= modelName %></td>
                </script>
            </table>
        </div>
        
        <div class="span2"></div>
        <div class="span6">
            
            <div id="imageContainer" style="width:570px; height: 380px;">
                <img id="theImage" src="" width="570" height="380"/>
            </div>
            <div id="phoneDisplay">
                
                <script id="phoneDisplayTemplate" type="text/template">
                    <thead>
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td><%= modelName %></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Manufacturer:</strong></td>
                            <td><%= brandName %></td>
                        </tr>
                        <tr>
                            <td><strong>Year Released:</strong></td>
                            <td><%= launchYear %></td>
                        </tr>
                        <tr>
                            <td><strong>Units Sold:</strong></td>
                            <td><%= unitsSold %></td>
                        </tr>
                    </tbody>
                </script>
                
            </div>
            
        </div>
    </div>
    
    
    
    
    <script src="scripts/underscore.js"></script>
    <script src="scripts/jquery.js"></script>
    <script src="scripts/backbone.js"></script>
    
    <script>
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

        })();
    </script>
    
    <script src="scripts/Models.js"></script>
    <script src="scripts/Collections.js"></script>
    <script src="scripts/Views.js"></script>
    <script src="scripts/Routers.js"></script>
    <script src="scripts/main.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>

        
</body>
</html>