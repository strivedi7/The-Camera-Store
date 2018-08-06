var vendorGlobal = [];
var catagoryGlobal = [];


$(document).ready(function () {

	$('#vF input:checkbox').on('click',function(){
			if($(this).is(':checked')){
				vendorGlobal.push($(this).val());
				displayFilteredProducts();
			}else{
				const index = vendorGlobal.indexOf($(this).val());
				vendorGlobal.splice(index, 1);
				displayFilteredProducts();
			}
			if((vendorGlobal == null || vendorGlobal == '' || vendorGlobal == undefined) && (catagoryGlobal == null || catagoryGlobal == '' || catagoryGlobal == undefined)){
				ShowProducts();
			}		
	});

	$('#ctF input:checkbox').on('click',function(){
			if($(this).is(':checked')){
				catagoryGlobal.push($(this).val());
				displayFilteredProducts();
			}else{
				const index = catagoryGlobal.indexOf($(this).val());
				catagoryGlobal.splice(index, 1);
				displayFilteredProducts();
			}

			if((vendorGlobal == null || vendorGlobal == '' || vendorGlobal == undefined) && (catagoryGlobal == null || catagoryGlobal == '' || catagoryGlobal == undefined)){
				ShowProducts();
			}
			
	});

	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];

	proj4_data = new Array();
	var cart = new shopping_cart("jadrn046");
	document.getElementById('CartSize').innerHTML = cart.size();

	$.ajax({
		url:"http://jadran.sdsu.edu/jadrn046/servlets/servlet/GetDetails", 
		success: function(result){		
			storeData(result);
			ShowProducts();
    	},
		error: function(result) {
               		alert(result+"There is some error to fetch data from Database.<br>Please refres page!");
        }
	});

	FilterArray = new Array();
	
	$('#ApplyFilter').on('click', function(e) {
		 	checkFilter();
	});

	$('#SearchForm').on('submit', function(e) {
	 	e.preventDefault();
	 	var parameter = document.getElementById("SearchButton").value;
  			if($( "table:contains("+parameter+")" )) {
  					search(parameter);
  			}	
	});



	function search(keyword){
	keyword = keyword.toUpperCase();
	var tmpString = " ";
    for(var i=0; i < proj4_data.length-1; i++) {   	

    		if(  (proj4_data[i][1].toUpperCase()).includes(keyword) || (proj4_data[i][2].toUpperCase()).includes(keyword) || (proj4_data[i][3].toUpperCase()).includes(keyword) || (proj4_data[i][6].toUpperCase()).includes(keyword) || (proj4_data[i][7].toUpperCase()).includes(keyword)){

    			tmpString += "<table class=\"chocolateBox\">";

            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
              
				tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
				tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
			
				if(proj4_data[i][4] <= 0){
					tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
				}else{
					tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
				}
				
				tmpString += "</table>"; 
	        }else{

	        }
    	}
    	if(tmpString == " "){
    		tmpString += "<div id='EmptyCart'>No result found<br>"+
                "<a id='ShopNowAnker' href='proj2.html'><div id='ShopNow'>See all product</div></a>";
    	}
     var handle = document.getElementById('Main');
        handle.innerHTML = tmpString;
	}


	$('#Main').on('click', "input[type=button]", function(e) {
	 	if($(e.target).val() != 'Add to Cart') return;
	 	 var sku = $(e.target).attr("name");
	 	cart.add(sku,1);
	 	document.getElementById('CartSize').innerHTML = cart.size();
	 	$(e.target).next().fadeIn(50).fadeOut(2000);
    });

    $('#modal-body').on('click', "input[type=button]", function(e) {
	 	if($(e.target).val() != 'Add to Cart') return;
	 	 var sku = $(e.target).attr("name");
	 	cart.add(sku,1);
	 	document.getElementById('CartSize').innerHTML = cart.size();
	 	$(e.target).next().fadeIn(50).fadeOut(2000);
    });

	 $('#Main').on('click', "table" ,function(e) {
	 	if(e.target.nodeName == "IMG"){
	 		 ShowProducts1(e.target.id);
	 		 modal.style.display = "block";
	 	}else{
	 		return;
	 	}
	 });

	span.onclick = function() {
    	modal.style.display = "none";
	}


	function checkFilter(){
		alert("Inside CheckFilter");
	}
});
	function storeData(response) {
	    var tmpArray = explodeArray(response,';');
		for(var i=0; i < tmpArray.length; i++) {
	        innerArray = explodeArray(tmpArray[i],'|');
	        proj4_data[i] = innerArray;
	    }	
	}

	function explodeArray(item,delimiter) {

		tempArray=new Array(1);
		var Count=0;
		var tempString=new String(item);

		while (tempString.indexOf(delimiter)>0) {
			tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
			tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
			Count=Count+1
		}

		tempArray[Count]=tempString;
		return tempArray;
	}

	function ShowProducts(){
        var tmpString = "";
       
        for(var i=0; i < proj4_data.length-1; i++) {
            {
				tmpString += "<table class=\"chocolateBox\">";

            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
              
				tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
				tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
			
				if(proj4_data[i][4] <= 0){
					tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
				}else{
					tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
				}
				
				tmpString += "</table>"; 
            }
        }
        var handle = document.getElementById('Main');
        handle.innerHTML = tmpString;

}

function ShowProducts1(sku){
	tmpString = "";
    headerString = "";
    footerString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][0] == sku){

            	tmpString += "<div class=\"modal-body\">";
            	tmpString += "<img class=\"BigPicture\" src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" height=\"400px\" />";
            	headerString += proj4_data[i][2] + " " + proj4_data[i][1];
				tmpString += "<table border='0' cellspacing='10'>";

            	tmpString += "<tr><td>Price</td><td>$"+proj4_data[i][5]+"</td></tr>"; 
            	tmpString += "<tr><td>category</td><td>"+proj4_data[i][3]+"</td></tr>";  

            	tmpString += "<tr valign='top'><td>Description</td><td>"+proj4_data[i][6]+"</td></tr>"; 
            	tmpString += "<tr valign='top'><td>Features</td><td>"+proj4_data[i][7]+"</td></tr>";       				
				if(proj4_data[i][4] <= 0){
					tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
				}else{
					tmpString += "<tr><td colspan='2'><input type='button' class = 'AddToCartBig' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>       Added to Cart</span></td></tr>";
				}
				tmpString += "</table></div>"; 
	
            }
        }
        var headerHandle = document.getElementById('modal-header-text');
        headerHandle.innerHTML = headerString;
        var handle = document.getElementById('modal-body');
        handle.innerHTML = tmpString;
        var footerHandle = document.getElementById('modal-footer-text');
        footerHandle.innerHTML = footerString;
}
$(document).keyup(function(e) {
  if (e.keyCode === 27)  $(".modal").css("display", "none"); 
});

// Filter code

function displayFilteredProducts(){
		vendorCheckBox = false;
		catagoryCheckBox = false;
		var tmpString = "";
		document.getElementById('Main').innerHTML = "";
	if(vendorGlobal.length != 0) {
		vendorCheckBox = true;
	}
	if(catagoryGlobal.length != 0) {
		catagoryCheckBox = true;
	}
	
	if(vendorGlobal.length == 0){
		for(var l = 0; l<catagoryGlobal.length; l++){
			for(var i=0; i < proj4_data.length; i++) {
			    if(vendorCheckBox & catagoryCheckBox){
			    	if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (vendorGlobal[l] != undefined ? vendorGlobal[l].toUpperCase() : vendorGlobal[l]) 
			    			&& ((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (catagoryGlobal[l] != undefined ? catagoryGlobal[l].toUpperCase() : catagoryGlobal[l]))){

				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>";  
				        }
			    	}else if(vendorCheckBox){
			    		if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (vendorGlobal[l] != undefined ? vendorGlobal[l].toUpperCase() : vendorGlobal[l])){
				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>";
			    		}
			    	}
			    	else if(catagoryCheckBox){
			    		if((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (catagoryGlobal[l] != undefined ? catagoryGlobal[l].toUpperCase() : catagoryGlobal[l])){
				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>";
			    		
					}	
				}
			}
		}
	}else if(catagoryGlobal.length == 0){
		for(var l = 0; l<vendorGlobal.length; l++){
			for(var i=0; i < proj4_data.length; i++) {
			    if(vendorCheckBox & catagoryCheckBox){
			    		//if(proj4_data[i][2] == vendorGlobal[k] && proj4_data[i][3] == catagoryGlobal[k]){
				        if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (vendorGlobal[l] != undefined ? vendorGlobal[l].toUpperCase() : vendorGlobal[l]) 
			    			&& ((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (catagoryGlobal[l] != undefined ? catagoryGlobal[l].toUpperCase() : catagoryGlobal[l]))){

				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>"; 

				        }
			    	}else if(vendorCheckBox){
			    		if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (vendorGlobal[l] != undefined ? vendorGlobal[l].toUpperCase() : vendorGlobal[l])){
				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>"; 
			    		}
			    	}
			    	else if(catagoryCheckBox){
			    		if((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (catagoryGlobal[l] != undefined ? catagoryGlobal[l].toUpperCase() : catagoryGlobal[l])){
				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>";  
			    		}
			    }
			}
		}
	}
	else
	{	
		// for(var k = 0; k<vendorGlobal.length || k<catagoryGlobal.length; k++){
	    if(vendorGlobal.length < catagoryGlobal.length){
		for(var k = 0; k<vendorGlobal.length; k++){
	    		for(var l = 0; l<catagoryGlobal.length; l++){
	    			for(var i=0; i < proj4_data.length; i++) {
		    	if(vendorCheckBox & catagoryCheckBox){
		    		//if(proj4_data[i][2] == vendorGlobal[k] && proj4_data[i][3] == catagoryGlobal[k]){
			        if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (vendorGlobal[k] != undefined ? vendorGlobal[k].toUpperCase() : vendorGlobal[k]) 
			    			&& ((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (catagoryGlobal[l] != undefined ? catagoryGlobal[l].toUpperCase() : catagoryGlobal[l]))){

				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>";  
				        }
			    	}else if(vendorCheckBox){
			    		if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (vendorGlobal[k] != undefined ? vendorGlobal[k].toUpperCase() : vendorGlobal[k])){
				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>";  
			    		}
			    	}
			    	else if(catagoryCheckBox){
			    		if((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (catagoryGlobal[l] != undefined ? catagoryGlobal[l].toUpperCase() : catagoryGlobal[l])){
				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>";
			    		}
		    	}	
			}
		}
	}
	}else{
		for(var k = 0; k<catagoryGlobal.length; k++){
	    		for(var l = 0; l<vendorGlobal.length; l++){
	    			for(var i=0; i < proj4_data.length; i++) {
		    	if(vendorCheckBox & catagoryCheckBox){
		    		//if(proj4_data[i][2] == vendorGlobal[k] && proj4_data[i][3] == catagoryGlobal[k]){
			        if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (vendorGlobal[l] != undefined ? vendorGlobal[l].toUpperCase() : vendorGlobal[l]) 
			    			&& ((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (catagoryGlobal[k] != undefined ? catagoryGlobal[k].toUpperCase() : catagoryGlobal[k]))){

				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>"; 
				        }
			    	}else if(vendorCheckBox){
			    		if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (vendorGlobal[l] != undefined ? vendorGlobal[l].toUpperCase() : vendorGlobal[l])){
				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>"; 
			    		}
			    	}
			    	else if(catagoryCheckBox){
			    		if((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (catagoryGlobal[k] != undefined ? catagoryGlobal[k].toUpperCase() : catagoryGlobal[k])){
				        	tmpString += "<table class=\"chocolateBox\">";

			            	tmpString += "<tr><td class=\"ImageTd\"><center><img src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+ "id = \""+ proj4_data[i][0] +"\" width=\"200px\" /></center></td></tr>";     
			              
							tmpString += "<tr><td class=\"NameTd\">"+ proj4_data[i][2] + " " + proj4_data[i][1] + "</td></tr>";
							tmpString += "<tr><td>Price  $"+ proj4_data[i][5] + "</td></tr>";
						
							if(proj4_data[i][4] <= 0){
								tmpString += "<tr><td><div class='OutOfStock'>Out of stock</div>";
							}else{
								tmpString += "<tr><td><input type='button' class='AddToCart' name="+proj4_data[i][0]+ " value='Add to Cart' /><span class='addedToCart'>        Added to Cart</span></td></tr>";
							}
							
							tmpString += "</table>";
			    		}
		    	}	
			}
		}
	}
	}

	}
    document.getElementById('Main').innerHTML = tmpString;
}