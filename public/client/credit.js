angular.module("creditcard",[])
.controller('transactionController',function(){
	this.message = [
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
});
