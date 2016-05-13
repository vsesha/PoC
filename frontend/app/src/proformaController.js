(function(angular) 
 {
'use strict';
	var myModule = angular.module('ProformaApp');
	myModule.controller('ProformaController', ['DataService',proformacontroller]);
	function proformacontroller(DataService) {
		var ctrl=this;
		var updateMode=false;
		var showAlert = false;
		var alertMsg = "";
		var ErrorDetails =""
		var showResults=false;
		var marginRecordset;
		var showCharts=false;
	
		ctrl.hotTableSettings = {
						colHeaders: true, 
						minSpareRows: 1,
						sortIndicator: true,
						columnSorting: true,
						manualColumnResize: true,
						formulas: true,
						comments: true,
						undo:true,
						contextMenu: true,
						contextMenuCopyPaste: {
							swfPath: '../bower_components/zeroclipboard/dist/ZeroClipboard.swf'
						}
				};
		ctrl.hotTableminSpareRows = 1;
		ctrl.hotTablerowHeaders = true;
		
		ctrl.validateInputs =function(){
			
			if(typeof ctrl.inputparameters === 'undefined' )
			{
				ctrl.alertMsg="No input selected";
				return false;
			}
			
			var params = ctrl.inputparameters;
			if(  params.environment  === undefined ||   params.environment.length==0 )
			{
				ctrl.alertMsg="Environment is missing"
				return false;
			}
			if(  params.exchange_instrument  === undefined || params.exchange_instrument.length==0)
			{
				ctrl.alertMsg="Exchange/Instrument is missing"
				return false;
			}
			if(  params.margindate  === undefined || params.margindate==0)
			{
				ctrl.alertMsg="Margin Date is missing"
				return false;
			}
			
			return true;
		}
		

		
		ctrl.getPortfolio = function(){
			var validate =ctrl.validateInputs();
			if (validate==false)
			{
				ctrl.showAlert=true;
				return;
			}
			ctrl.showAlert=false;
			DataService.getSamplePortfolios().then(function(data){
					ctrl.showResults=true;	
					ctrl.showResults=false;
					ctrl.marginsPortfolio = data;
				},function(err){
					ctrl.ErrorHandler(err);
			})
			
		};

		ctrl.getPortfolioResult = function(){
			DataService.getMarginResult().then(function(data){
					ctrl.showResults			=true;	
					ctrl.marginResults			=data.summary;
					ctrl.marginDetailsResults	=data.details;
					ctrl.drawMarginResultChart(data.details);
					ctrl.showCharts				=true;
				},function(err){
					ctrl.ErrorHandler(err);
			})
			DataService.getMarginErrors().then(function(data){
					ctrl.showResults=true;	
					ctrl.marginErrors=data;
				},function(err){
					ctrl.ErrorHandler(err);
			})
		};
		
		
		ctrl.import = function(){
			//console.log("File="+filetoimport);
		};
						
		ctrl.reset = function(){
			console.log("in reset");
			ctrl.marginsPortfolio		=null;
			ctrl.marginResults			=null;
			ctrl.marginDetailsResults	=null;
			ctrl.marginErrors			=null;
			ctrl.showAlert				=false;
			ctrl.showCharts				=false;
		};
		
		
		ctrl.addMarginHist = function (){
			var inputStream ={
							  'inputparameters':ctrl.inputparameters,
							  'marginportfolio':ctrl.marginsPortfolio,
							  'marginsummary':ctrl.marginResults,
							  'marginerror':ctrl.marginErrors,
							  'margindetail':ctrl.marginDetailsResults
							 }
			ctrl.updateMode=false;
			DataService.addMarginHistory(inputStream)
				.then(function(data){
				ctrl.getMarginRunHist();
				},function(err){
				ctrl.ErrorHandler(err);
			});
		};
		
		ctrl.getMarginRunHist = function(){
				//console.log("in getMarginRunHist");
				DataService.getMarginRunHistroy().then(function(data){
					ctrl.marginsRunHistory = data;
					//console.log("hist data="+JSON.stringify(ctrl.marginsRunHistory));
				},function(err){
					ctrl.ErrorHandler(err);
			})
		};

		ctrl.ErrorHandler = function(err){
			console.log("In ctrl.ErrorHandler");
				ctrl.ErrorSummary = "Status: "+err.status
						+"; Error: "+err.statusText
						+"; Config: "+JSON.stringify( err.config);
				ctrl.ErrorDetail = JSON.stringify(err.data);
				ctrl.showAlert=true;
			console.log("err="+ctrl.ErrorSummary+ctrl.ErrorDetail);
			}
	
		
		ctrl.drawMarginResultChart=function(data){
			
			var pieChart = dc.pieChart("#MarginSummaryPieChart");
			var rowChart = dc.rowChart("#MarginDetailRowChart");
			
			var ndx = crossfilter(data),
				summaryDimension = ndx.dimension(function (d) {
					return d.Account;
				}),
				summaryGroup = summaryDimension.group().reduceSum(function (d) {
					return d.InitialMargins;
				}),
				detailsDimension = ndx.dimension(function (d) {
					return d.Currency;
				}),
				detailsGroup = detailsDimension.group().reduceSum(function (d) {
					return d.InitialMargins;
				});

			pieChart.width(200)
				.height(200)
				.slicesCap(10)
				.innerRadius(5)
				.dimension(summaryDimension)
				.group(summaryGroup);
			
				

			rowChart.width(500)
				.height(200)
				.dimension(detailsDimension)
				.group(detailsGroup);
				

			dc.renderAll();

		}
	}

})(angular );