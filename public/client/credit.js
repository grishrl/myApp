angular.module("creditcard",['ngRoute'])
.factory('TransX', ['$http',function TransXFactory($http){
	return {
	all: function(){
		return $http({method:'GET',url:'/transacts'});
		},
	submit: function(xdat){	
	return $http({method:'POST',url:'/pay',data:xdat});
	}	
		
	};
}])
.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'client/templates/transactions.html'
	})
	.when('/transactions',{
		templateUrl:'client/templates/transactions.html'
	})
	.when('/payment',{
	templateUrl:'client/templates/payment.html'
	})
	.otherwise({redirectTo:'/transactions'})
	})
.controller('transactionController',['TransX',function(TransX){
	TransX.all().then((res)=>{
		var temp = res.data;
		var temp = _.sortBy(temp,'date').reverse();
		this.message=temp;
		
	},function(){console.log("no data returned")});
}])
.controller('submitController',['$scope','$location','TransX',function($scope,$location,TransX){
	var type;
	if($location.path()=='/payment'){
		type='debit';
	}else{
		type='credit';
	}
	
 $scope.save=function(inDat){
	var date=new Date();
	console.log(date);
    var amount=inDat;
	var transAct = {"date":date,
					"amount":amount,
					"type":type};
	TransX.submit(transAct).then((res)=>{
		if(res.status==201){
			if($location.path()!='/transactions'){$location.path('/transactions');}
			window.location.reload();
		}
	},()=>alert("Error posting."));
};
}])
.controller('totalController',['TransX',function(TransX){
	TransX.all().then((res)=>{
		var temp = res.data;
		var temp = _.sortBy(temp,'date').reverse();
		var temp = temp[0].total;
		this.message=temp;
		},function(){console.log("no data returned")});
}]);
