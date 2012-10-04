var app = angular.module('mongolab_service', ['ngResource']);

app.factory('Contact', function($resource) {
    var Contact  = $resource('https://api.mongolab.com/api/1/databases/phonebook/collections/contact/:id', {
      id:'@id',
      apiKey:'506b96b5e4b0b2e219506689'},{
      update: { method: 'PUT' }
    });           
    
    Contact.prototype.update = function(cb) {
        return Contact.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
    };
    
    Contact.prototype.destroy = function(cb) {
        return Contact.remove({id: this._id.$oid}, cb);
      };
    
    return Contact;
});
