var fs = require('fs');

module.exports = function(purchacesFile) {
		

	function getTotalPurchasesPerProduct(){

		//read the file		
		var dataInFile = fs.readFileSync(purchacesFile, 'utf8');
		
		//var products = new Products('../NelisaPurchases.csv');
		//console.log(products);

		// split it into purchase rows
		var profitLines = dataInFile.split('\n');

		//console.log("profitLines : " + profitLines.length);

		var productProfitList = [];

		// ?? this variable name might need to change?
		var totalCostPerProduct = {};

		//split it into columns - getting the purchase details
		profitLines.forEach(function(profitline, index){

			var columns = profitline.split(';');
			//???????????
			if(columns[2] != "Item"){

				var itemName = columns[2];


				// is this total costs?
				var numberPurch = columns[5].substr(1).replace(",", ".");

				if(totalCostPerProduct[itemName] === undefined){
					totalCostPerProduct[itemName] = 0;
				}

				//?????
				totalCostPerProduct[itemName] += Number(numberPurch);
			}
		});

		//??? why are we doing this
		for(var key in totalCostPerProduct){
			var obj = {
				itemName : key,
				numberPurch: totalCostPerProduct[key]
			};
			productProfitList.push(obj);
		}
		
		//console.log(totalCostPerProduct);
		return totalCostPerProduct;
	};

	//get a map of total purchases per product
	this.productPurchasesMap = getTotalPurchasesPerProduct


	this.purchasesPerCategory = function(){


		var catGroup = {
		  	'Imasi': 'Dairy',
		  	'Bread': 'Bakery',
		  	'Chakalaka Can': 'Canned Food',
		  	'Gold Dish Vegetable Curry Can': 'Canned Food',
		  	'Fanta 500ml': 'Cold Beverages',
		  	'Coke 500ml': 'Cold Beverages',
		  	'Milk 1l' : 'Dairy',
		  	'Cream Soda 500ml': 'Cold Beverages',
		  	'Iwisa Pap 5kg': 'Bulk',
		  	'Top Class Soy Mince': 'Soup',
		  	'Shampoo 1 litre': 'Cosmetics',
		  	'Soap Bar': 'Cosmetics',
		  	'Bananas - loose': 'Fruit',
		  	'Apples - loose': 'Fruit',
		  	'Mixed Sweets 5s': 'Confectionery',
		  	'Heart Chocolates': 'Confectionery',
		  	'Rose (plastic)': 'Valentine Goodies',
		  	'Valentine Cards': 'Valentine Goodies',
		  };

		var purchasesMap = getTotalPurchasesPerProduct()  
		var profCatMap = {};
		
		for(var productName in purchasesMap){
			var catName = catGroup[productName];
			var qty = purchasesMap[productName];
			// is the productName in the map?
			if(profCatMap[catName] == undefined){
				//if it is not in the map add it to the map...
				profCatMap[catName] = 0;
			}

			// now add the qty for each product to the correct qty...
			profCatMap[catName] = profCatMap[catName] + Number(qty);
		}
		//console.log(profCatMap)
		
		return profCatMap;

	}



}