"use strict";

  angular
    .module("wdinstagram", [
      "ngResource",
      "ui.router"
    ])
    .config([
      "$stateProvider",
      Router
    ])
    .factory("instaFactory", [
      "$resource",
      Factory
    ])
    .controller("InstaIndexCtrl",[
      "instaFactory",
      InstaIndex
    ])
    .controller("InstaShowCtrl",[
      "instaFactory",
      "$state",
      InstaShow
    ])
    .controller("InstaNewCtrl",[
      "instaFactory",
      "$state",
      InstaNew
    ])
    .controller("InstaEditCtrl",[
      "instaFactory",
      "$state",
      InstaEdit
    ])

    function InstaEdit(instaFactory,$state){
      this.gram = instaFactory.get({id:$state.params.id})
      this.update = function(){
        this.gram.$update({id: $state.params.id}).then(function(gram){
          $state.go("instaShow",{id: gram.id})
        })
      }
      this.destroy = function(){
        this.gram.$delete({id: $state.params.id}).then(function(gram){
          $state.go("instaIndex")
        })
      }
    }
    function InstaNew(instaFactory, $state){
      this.gram = new instaFactory()
      this.create = function(){
        this.gram.$save().then(function(gram){
          $state.go("instaShow",{id: gram.id})
        })
      }
    }
    function InstaShow(instaFactory,$state){
      this.gram = instaFactory.get({id: $state.params.id})
    }
    function InstaIndex(instaFactory){
      this.grams = instaFactory.query()
    }

    function Factory($resource){
      return $resource("http://localhost:3000/entries/:id", {}, {
        update: {method: "PUT"}
      })
    }

    function Router($stateProvider){
      $stateProvider
      .state("instaIndex",{
        url: "/grams",
        templateUrl: "js/ng-views/index.html",
        controller: "InstaIndexCtrl",
        controllerAs: "vm"
      })
      .state("instaNew",{
        url: "/grams/new",
        templateUrl: "js/ng-views/new.html",
        controller: "InstaNewCtrl",
        controllerAs: "vm"
      })
      .state("instaShow",{
        url: "/grams/:id",
        templateUrl: "js/ng-views/show.html",
        controller: "InstaShowCtrl",
        controllerAs: "vm"
      })
      .state("instaEdit",{
        url: "/grams/:id/edit",
        templateUrl: "js/ng-views/edit.html",
        controller: "InstaEditCtrl",
        controllerAs: "vm"
      })

    }
