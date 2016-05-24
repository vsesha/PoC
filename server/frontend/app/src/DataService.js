(function(angular){
'use strict';
	
var myModule = angular.module('ProformaApp');
var histroyRecords=[];	
myModule.factory('DataService',['$http','$q','appconfigs',serviceFunction]);	


function serviceFunction( $http, $q,appconfigs)
{
	
	//interface
	return{
		getMarginResult:getMarginResult,
		getSamplePortfolios:getSamplePortfolios,
		getMarginErrors:getMarginErrors,
		addMarginHistory:addMarginHistory,
		getMarginRunHistroy:getMarginRunHistroy
	}
	
	function getMarginResult()
	{
		var defer = $q.defer();
		console.log("env var="+JSON.stringify(appconfigs.endpoint));
		///$http.get("https://marginserver.herokuapp.com/getmargins")
		$http.get(appconfigs.endpoint+"getmargins")
  		.then(function (response) {
	  		defer.resolve( response.data) },
			function(error){
				console.log("Error ="+error);
				defer.reject(error);
			});
		return defer.promise;
	}
	
	function getMarginErrors()
	{
		var defer = $q.defer();

		//$http.get("https://marginserver.herokuapp.com/getmarginerrors")
		$http.get(appconfigs.endpoint+"getmarginerrors")
  		.then(function (response) {
	  		defer.resolve( response.data) },
			function(error){
				console.log("Error ="+error);
				defer.reject(error);
			});
		return defer.promise;
	}
	
	function getSamplePortfolios()
	{
		var defer = $q.defer();

		//$http.get("https://marginserver.herokuapp.com/getportfolio")
		$http.get(appconfigs.endpoint+"getportfolio")
  		.then(function (response) {
	  		defer.resolve( response.data) },
			function(error){
				console.log("Error ="+error);
				defer.reject(error);
			});
		return defer.promise;
	}
	
	function addMarginHistory(inputData)
	{
		var defer = $q.defer();
		//$http.post("https://marginserver.herokuapp.com/addmarginhistory", inputData)
		$http.post(appconfigs.endpoint+"addmarginhistory", inputData)
  		.then(function (response) {
	  		defer.resolve( response.data) },
			function(error){
				console.log("Error ="+error);
				defer.reject(error);
			});
		return defer.promise;
	}
	
	function getMarginRunHistroy()
	{
		var defer = $q.defer();
		//$http.get("https://marginserver.herokuapp.com/getmarginrunhistory")
		$http.get(appconfigs.endpoint+"getmarginrunhistory")
  		.then(function (response) {
			//console.log("Data ="+JSON.stringify(response.data));
			var outputrecset=[];
			var histroyObj=response.data;
			var inputKey="";
			
			for (var i=0;i<histroyObj.length;i++)
				{
					var id=histroyObj[i]._id;
					var runtime=histroyObj[i].rundate;
					 inputKey="";
					var InitMargin=0;
					
					var inputparams=(histroyObj[i].inputparameters);
					var marginsummary=(histroyObj[i].marginsummary);
					
					if(inputparams.length>0)
					{
						if(  inputparams[0].hasOwnProperty('environment') )
							inputKey=inputparams[0].environment+"-";
							
						if(  inputparams[0].hasOwnProperty('exchange_instrument') )
							inputKey+=inputparams[0].exchange_instrument+"-";
							
						if(  inputparams[0].hasOwnProperty('margindate') )
							inputKey+=inputparams[0].margindate +" : $ ";	
						
					}
					if(marginsummary.length>0)
					{
						for(var j=0;j<marginsummary.length;j++)
						{
							if(marginsummary[j].hasOwnProperty('IM') )
								InitMargin = InitMargin+Number(marginsummary[j].IM,10);
						}
						
					}	
					
					inputKey=inputKey+InitMargin;	
					var hist_value=[{"_id":id,"hist_value":inputKey}];
					//console.log("value="+JSON.stringify(hist_value));
					outputrecset.push(hist_value);
				}
			defer.resolve( outputrecset) },
			function(error){
				console.log("Error ="+error);
				defer.reject(error);
			});
		return defer.promise;
	}
		
	
};
}(window.angular))