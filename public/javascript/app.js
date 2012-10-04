var app = angular.module('phonebook', ['mongolab_service']);

app.config(function($routeProvider) {
  
  $routeProvider.when('/add/contact', {
    controller:CreateContactController, 
    templateUrl:'static/contact_form.html'
  });    	
  
  
  $routeProvider.when('/edit/contact/:contactId', {
    controller:ContactController, 
    templateUrl:'static/contact_form.html'
  });    	
  
  $routeProvider.when('/', {
    controller:MongoController, 
    templateUrl:'static/index.html'
  });    	
});

function ContactController($scope, $routeParams, $location, Contact) {
  var self = this;
  
  Contact.get({id:$routeParams.contactId}, function(response) {
    self.original = response;
    $scope.contact = new Contact(self.original);
    //console.log(response);
  }); 
  
  $scope.save = function() {        
    $scope.contact.update(function() {
      $location.path('/');
    });    
  };     
  
  $scope.destroy = function() {
    self.original.destroy(function(response) {
      console.log(response);
      $location.path('/');
    });
  };
}


function CreateContactController($scope, $location, Contact) {
  $scope.save = function() {    
    Contact.save($scope.contact, function(response) {
      $location.path('/');
    });    
  };  
}


function MongoController($scope, Contact) {
  $scope.contact_list = Contact.query();  
}

