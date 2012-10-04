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
    controller:ContactController, 
    templateUrl:'static/index.html'
  });    	
});

function ContactController($scope, $location, Contact) {
  var self = this;
  
  $scope.contact_list = Contact.query(); 
  
  $scope.get = function(contactId) {
    Contact.get({id:contactId}, function(response) {
      self.original = response;
      $scope.contact = new Contact(self.original);      
    }); 
  };
  
  $scope.add = function() {
    $scope.contact = new Contact();      
  };
  
  
  $scope.save = function() {  
    if($scope.contact._id) {      
      $scope.contact.update(function() {
        $scope.contact_list = Contact.query(); 
      // $location.path('/');
      });    
    } else {
        Contact.save($scope.contact, function(response) {
          $scope.contact_list = Contact.query(); 
        });    
    }
  };     
  
  $scope.destroy = function() {
    self.original.destroy(function(response) {
      $scope.contact_list = Contact.query(); 
      $scope.contact = null;
      //console.log(response);
      //$location.path('/');
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


