$(document).ready(function () {
	var cart = new shopping_cart("jadrn046");
	var cartArray = cart.getCartArray();
                for(i=0; i < cartArray.length; i++) {
                  
                    $.ajax({
                        url:"http://jadran.sdsu.edu/jadrn046/servlets/servlet/Submit?SKU="+ cartArray[i][0] + "&Quantity=" + cartArray[i][1], 
                        success: function(result){
  
                        },
                        error: function(result) {
                            
                        }
                        
                    });
        }

        document.cookie = "jadrn046=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});