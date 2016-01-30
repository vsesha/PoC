'use strict'
var FullRecSet =[];
var mongoose	= require('mongoose');
mongoose.connect('mongodb://localhost/MarginsDB');

var HistroySchema = new mongoose.Schema({
	rundate:			{type: Date, default:Date.now},
	inputparameters:	Array,
	marginportfolio:	Array, 
	marginsummary:		Array,
	marginerror:		Array,
	margindetail:		Array, 
	},{collection:"RunHistory"});

var MarginHistoryModel = mongoose.model("MarginHistoryModel",HistroySchema);

function addtoHistory(inputdata){
	console.log("inout data="+JSON.stringify(inputdata));
	var promise = new Promise (function(resolve,reject) {
		var newRecord = new MarginHistoryModel(inputdata);
		newRecord.save(function(err,data){
				if (err)
				{
					console.log("error from server="+err);
					reject(err);
				}
				resolve(data);
				});
			});
	return promise;
};

function getFromHistory(){
	var promise = new Promise(function(resolve, reject) {
		MarginHistoryModel.find( function(err,data) {
			if (err)
				reject(err);
			resolve(data);	
			}).limit(5).sort({rundate: -1});
		});
	return promise;
};

function removeFromHistory(inputdata){
	console.log("input data to Remove ="+inputdata);
	var promise = new Promise(function(resolve, reject) {
		MarginHistoryModel.remove( inputdata,function(err,data) {
			if (err)
				reject(err);
			resolve(data);
			});
		});
	return promise;
};

function updateToHistory(inputdata){
	var inputparam=inputdata._id;
	var promise = new Promise(function(resolve, reject) {
		inputparam={_id:inputdata._id};
		MarginHistoryModel.findOneAndUpdate(inputparam,inputdata,{new:true},function(err,data) {
			if (err)
			{
				console.log("error ="+JSON.stringify(err));
				reject(err);
			}
			resolve(data);
			});
		});
	return promise;
};


module.exports.addtoHistory 		= addtoHistory;
module.exports.getFromHistory 		= getFromHistory;
module.exports.updateToHistory 		= updateToHistory;
module.exports.removeFromHistory 	= removeFromHistory;