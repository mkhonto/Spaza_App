var fs = require('fs');

var Sales = require("./productsSold");
var Purchases = require("./productsBought");

module.exports = function(purchacesFile, salesFile) {
	
	var sales = new Sales(salesFile);
	var purchases = new Purchases(purchacesFile);

	this.profitPerProduct = function(){
		
		var profitMap = {};
		var profit = 0;
		var profitList = [];
		var totalSalesPerProduct = sales.earningPerPrdct();
		var totalPurchasesPerProduct = purchases.productPurchasesMap();
     	
     	//iterating and subtracting between the earningPerproduct and purchases per product maps then storing results into a new map
		for(productName in totalPurchasesPerProduct){
			profit = totalSalesPerProduct[productName] - totalPurchasesPerProduct[productName];
			profitMap[productName] = profit;
		}

		return profitMap;

	}

	//this.purchasesPerCategory = function(){

	//}

	this.mostProfitableProduct = function(profitMap){
		var profitList = [];

		//create a list so that we can sort it
		for(var key in profitMap){
			var obj = {
				itemName : key,
				numberSold : profitMap[key]
			};
			profitList.push(obj);
		};

		//sort the list
		profitList.sort(function(a,b){
			return b.numberSold - a.numberSold
		});

		//return the most popular
		console.log("=======<>");
		console.log(profitList[0]);
		return profitList[0];
	}

	this.mostProfitableCat = function(){

		//grouping product according to category
		
		var profitByCategory = {};
		var catProfit = 0;

		var purchasesPerCategory = purchases.purchasesPerCategory();
		var earningPerCat = sales.earningPerCat(sales.earningPerPrdct());
		
		for(categoryName in purchasesPerCategory){
			catProfit = earningPerCat[categoryName] - purchasesPerCategory[categoryName];
			profitByCategory[categoryName] = catProfit;
		}
		
		// create a list of categories
		var categoryProfitList = [];
	        for(var key in profitByCategory){		
				var obj = {
					currentItem : key,
					numberSold: profitByCategory[key]
				};
				categoryProfitList.push(obj);
		}
	
	//sort the list desc
	categoryProfitList.sort(function(a,b){
			return b.numberSold-a.numberSold;
	});

	//
	console.log(categoryProfitList[0])

	return categoryProfitList[0];

	/*
	return {
		mostPopularCat : categoryList[0],
		//leastPopularCat : categoryList[categoryList.length-1]
	};
	*/

	}

}

	