var myModule = angular.module('ProformaApp');
var histroyRecords=[];	
myModule.factory('DataService',['$http','$q',serviceFunction]);	


function serviceFunction( $http, $q)
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

		$http.get("http://localhost:3100/getmargins")
  		.then(function (response) {
			console.log("Data ="+JSON.stringify(response.data));
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

		$http.get("http://localhost:3100/getmarginerrors")
  		.then(function (response) {
			console.log("Data ="+JSON.stringify(response.data));
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

		$http.get("http://localhost:3100/getportfolio")
  		.then(function (response) {
			console.log("Data ="+JSON.stringify(response.data));
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
		console.log("input data ="+JSON.stringify(inputData));
		$http.post("http://localhost:3100/addmarginhistory", inputData)
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

		$http.get("http://localhost:3100/getmarginrunhistory")
  		.then(function (response) {
			//console.log("Data ="+JSON.stringify(response.data));
			var outputrecset=[];
			var histroyObj=response.data;
			var inputKey="";
			
			for (i=0;i<histroyObj.length;i++)
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
						for(j=0;j<marginsummary.length;j++)
						{
							if(marginsummary[j].hasOwnProperty('IM') )
								InitMargin = InitMargin+Number(marginsummary[j].IM,10);
						}
						
					}	
					
					inputKey=inputKey+InitMargin;	
					hist_value=[{"_id":id,"hist_value":inputKey}];
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