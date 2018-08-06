var cart;
$(document).ready(function () {

	proj4_data = new Array();
	cart = new shopping_cart("jadrn046");

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
	$('#Products').on('click',$('input[type="button"]'), function(e) {
	
        if($(e.target).val() != 'Remove from Cart') {
        	return;       	
        }else{
        	
        var sku = $(e.target).attr("name");
        cart.delete(sku);
        ShowProducts();
        }
	});

    $('#Products').on('focusout',$('input[type="text"]'), function(e) {

        if($(e.target).val() == 'Update Cart') {
            return;
        }
      var sku = $(e.target).attr("name");
      var quantity = $(e.target).val();
     
      if( $(e.target).val() < 1){
                 cart.delete(sku);
                 ShowProducts();
                return;                 
              }
      if(isNaN($(e.target).val())){
                 cart.delete(sku);
                 ShowProducts();
                return;                 
      }
        for(var i=0; i < proj4_data.length-1; i++) {
            if(proj4_data[i][0] == sku){
                if(parseInt(quantity) < parseInt(proj4_data[i][4])){
                    cart.setQuantity(sku,quantity);
                }else{
                    $(e.target).next().fadeIn(50).fadeOut(2000);
                    alert("quantity exceed, Max we have "+ proj4_data[i][4]);
                }
            }
        }
      ShowProducts();
    });

     $('#Products').on('keydown',$('input[type="text"]'), function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)  && (e.which < 96 || e.which > 105) ) {
            e.preventDefault();
            return false;
        }
    });

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
    var cartArray = cart.getCartArray();

    for(var i=0; i < cartArray.length; i++) {
            for(var j=0; j < proj4_data.length-1; j++) {
                    if(proj4_data[j][0] == cartArray[i][0]){
                          if(parseInt(cartArray[i][1]) >= parseInt(proj4_data[j][4])){
                            cart.setQuantity(cartArray[i][0],proj4_data[j][4]);
                            cartArray = cart.getCartArray();
                        }
                    }
                }
            }
  
        var tmpString = "";
        var total = 0;
        if(cartArray.length < 1){
            var tmpString = " <div id='EmptyCart'>Your cart is empty!<br>"+
                "<a id='ShopNowAnker' href='proj2.html'><div id='ShopNow'>Shop Now</div></a>";
        }
        else{
            for(i=0; i < cartArray.length; i++) {
                for(j=0; j < proj4_data.length; j++) {
                    if(proj4_data[j][0] == cartArray[i][0]){
         
                        tmpString += "<table border=\"0\" class=\"chocolateBox\">";
                        
                        tmpString += "<tr><td rowspan=\"4\" class=\"ImageTd\"><center><img  src=\"http://jadran.sdsu.edu/~jadrn046/proj1/Images/"+proj4_data[j][0]+".jpg\" alt=\""+proj4_data[j][2]+"\"" +
                        " width=\"100px\"  /></center></td><td class=\"NameTd\">"+ proj4_data[j][2] + " " + proj4_data[j][1] +"</td></tr>";     
                      
                        tmpString += "<tr><td> Price   $"+proj4_data[j][5] + "</td></tr>";

                        tmpString += "<tr><td><input id='UpdateBox' type='text' name='"+proj4_data[j][0]+"' class='CartInput' value='"+ cartArray[i][1] +"' /> Box</td></tr>";
                            
                        tmpString += "<tr><td><input type='button' name='"+proj4_data[j][0]+"' value='Update Cart' /> <input type='button' name='"+proj4_data[j][0]+ "' value='Remove from Cart' /></td></tr>";

                        tmpString += "</table>"; 

                        total += cartArray[i][1]*proj4_data[j][5];
                    }
                       
                }
            }
            tmpString += "<div class='OrderBox'><div id='OrderSummary'>Order Summary</div><table id='OrderSummaryTable'>"; 

            tmpString += "<tr><td class='Name' >Items ("+ cart.size() +")</td><td class='Value'>"+ Math.floor(total * 100) / 100  +" $</td></tr>";
            tmpString += "<tr><td class='Name'>Shipping</td><td class='Value'>5 $</td></tr>";

            total += 5;
            tmpString += "<tr><td class='Name'> Estimated tax to be collected</td><td class='Value'>"+ Math.floor((0.0775*total) * 100) / 100  +" $</td></tr>";
            
            tmpString += "<tr><td class='Name'><hr></td><td class='Value'><hr></td></tr>";
            tmpString += "<tr><td class='Name' >Totol</td><td class='Value'>"+   Math.floor(((1.0775*total)) * 100) / 100  + " $</td></tr>";

            tmpString += "</table><a href='http://jadran.sdsu.edu/jadrn046/Form.html' id='OrderNow' >Order Now</a></div>";
            // $('#Total').val(Math.floor(total * 100) / 100);
            // $('#TotalItem').val(cart.size());
            
            
        }
         $('#Products').html(tmpString);
    }
