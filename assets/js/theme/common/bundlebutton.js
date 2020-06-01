const cartURL = "/api/storefront/carts";

const bundleItems = {
    "lineItems": [
    {
        "quantity": 1,
        "productId": 88
    },
    {
        "quantity": 1,
        "productId": 104
    },
    {
        "quantity": 1,
        "productId": 93,
        "variantId": 54
    }
]};

function getCart(url) {
    return fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    .then(response => response.json());
 };

//  let cart = getCart('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options');
                
//  let cartId = cart[0].id;

 function addCartItem(url, cartId, cartItems) {
    return fetch(url + '/' + cartId + '/items', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'},
        body: JSON.stringify(cartItems),
    })
    .then(response => response.json());
};

const bundleAdd = () => {
    getCart('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options')
    .then(cart => {
        console.log(JSON.stringify(cart))
        // If the data did not return the ID we need to add an item log and return early
        if(!cart || !cart[0] || !cart[0].id){
            console.warn('getCart did not return id');
            return;
        }
            
        let cartId = cart[0].id;

        addCartItem(cartURL, cartId, bundleItems)
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.error(error));
    });
};


  
$('#bundle-button').click(() => bundleAdd());