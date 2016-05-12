(function(angular){
'use strict';
var myModule = angular.module('ProformaApp',["ngHandsontable","ui.router"]);
myModule.config(configfn);
	
configfn.$inject=['$stateProvider', '$urlRouterProvider']
	
function configfn ($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	$stateProvider
	.state('Home',{
		   url: '/home',
		   templateUrl: '/views/partial-home.html'
		   })
	.state('Proforma',{
		   url: '/Proforma',
		   views:{
			   '':{	templateUrl: '/views/partial-proforma.html',
					controller:'ProformaController'
				}
			   }
		   })
	.state('History',{
		   url: '/history',
		   views:{
			   '':{	templateUrl: '/views/partial-history.html',
					controller:'HistoryController'
				}
			   }
		   });	
  }
}(window.angular));