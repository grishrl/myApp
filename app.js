var express = require("express");
var app = express();

app.use('/',express.static('public'));

app.get('/',function(req,res){
	res.send('hello world');
})

var someData=[
	{
		"date":"10/10/10",
		"amount":50
	},
	{
		"date":"10/10/10",
		"amount":100
	},
	{
		"date":"10/10/10",
		"amount":25
	}
	];
	
app.get('/transacts',function(req,res){
	res.json(someData);
});

app.put('/pay',function(req,res){
	someData.push(req.data);
});

app.listen(8080, function(){
	console.log('listening on port 8080');
});