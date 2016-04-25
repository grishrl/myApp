var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var jsonParse = bodyParser.json();

var underScore = require("underscore");

app.use('/',express.static('public'));

app.get('/',function(req,res){
	res.send('hello world');
})

var someData=[
	{
		"date":"2016-04-25T03:21:58.756Z",
		"amount":50,
		"total":50,
		"type":"credit"
	},
	{
		"date":"2016-04-25T03:22:04.362Z",
		"amount":100,
		"total":150,
		"type":"credit"
	},
	{
		"date":"2016-04-25T03:24:04.748Z",
		"amount":25,
		"total":175,
		"type":"credit"
	}
	];
	
app.get('/transacts',function(req,res){
	res.json(someData);
});

app.post('/pay',jsonParse,function(req,res){
	console.log(req.body);
	var tab = someData.length-1;
	if(req.body.amount!==undefined){
			var curTot = Number(someData[tab].total);
		if(req.body.type==='debit'){
			 
			 curTot -= Number(req.body.amount);
		}else{
			 console.log(curTot + " before changes");
			 curTot += Number(req.body.amount);
			 console.log(curTot + "after math");
		}
		var manipulateData={
			'date':req.body.date,
			'amount':req.body.amount,
			'total':curTot,
			'type':req.body.type
		};
		console.log(manipulateData);
		someData.push(manipulateData);
		res.sendStatus(201);
	}
	
	
});

app.listen(8080, function(){
	console.log('listening on port 8080');
});