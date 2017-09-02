"use strict";

angular.module("users").service("UserService", UserService);

function UserService($q, $http) {

  this.start = 0;

  var isMarvel =  angular.element(document.querySelector("body")).hasClass("marvel");



  this.incrementStart = function(c){

    this.start += c;
  }

  this.loadAllUsers = function(){
    var url = isMarvel
                ? "https://gateway.marvel.com:80/v1/public/characters?apikey=cc454bac15b4a6ab2c7ad37a12c2d669&offset="+ this.start +"&limit=50"
                : "api.json"
                
    return new Promise(function(resolve,reject){
      $http({
        method: 'GET',
        url: url
      }).then(function successCallback(response) {
          var result = isMarvel ? response.data.data.results : response.data.users;
          resolve(result);
        }, function errorCallback(response) {
           reject(Error(response.statusText));
        });
    });
  }
}
