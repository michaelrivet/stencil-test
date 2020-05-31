

// var bundleBasket = ["SLLPJ-20D88EFC", "CC3C", "OTL"];


var bundleBasket = [77, 93, 104];

const cartUrl = 'https://stencil-test.mybigcommerce.com/cart.php';

const addToCart = function() {
    if (bundleBasket.length) {
      for (var i=0; i < bundleBasket.length; i++) {
        $.ajax({
          type: 'GET',
          async: false,
          url: cartUrl+'?action=add&amp;product_id='+bundleBasket[i]+'&amp;fastcart=1&amp;ajaxsubmit=1',
          success: function(data) {
            var obj = JSON.parse($(data).html());
            if (obj.success) {
            } else {
              console.log("error")
            }
          }
        });
      }
    }
    window.location.replace(cartUrl);
  }; 
  
$('#bundle-button').click(addToCart);