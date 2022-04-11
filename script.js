function getItems(){
    db.collection("items").get().then((querySnapshot) => {
        let items = [];
    querySnapshot.forEach((doc) => {
        items.push({
            id: doc.id,
            image: doc.data().image,
            name: doc.data().name,
            make: doc.data().make,
            rating: doc.data().rating,
            price: doc.data().price
        })
    });
   //console.log(items);
   generateItems(items)
});
}

function addToCart(item) {
    // console.log("Add to cart clicked");
    // console.log(item);
    
    // Adding items Cart & Firebase
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get()
    .then(function (doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        }
        else {
        cartItem.set({
            image: item.image,
            make: item.make,
            name: item.name,
            rating: item.rating,
            price: item.price,
            quantity: 1
        })
        }
    })
    
}

function generateItems(items) {
    let itemsHTML = "";
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add("main-product", "mr-5", "mb-5");
        doc.innerHTML = `
            <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
                 <img class="w-48 h-48 object-contain" src="${item.image}" alt="">
            </div>
            <div class="product-name font-bold text-md text-gray-700">
            ${item.name}
            </div>
            <div class="product-make font-bold text-sm text-green-700">
                ${item.make}
            </div>
            <div class="product-rating font-bold text-md text-gray-700">
                ⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="product-price font-bold text-lg text-gray-700">
            ${numeral(item.price).format('$ 0,000.00')}
            </div>
        `
        let addToCartEl = document.createElement("div");
        addToCartEl.classList.add("hover:bg-yellow-600", "cursor-pointer", "product-add", "h-8", "w-28", "rounded", "bg-yellow-500", "text-white", "text-md", "flex", "justify-center", "items-center");
        addToCartEl.innerText = "Add to cart";
        addToCartEl.addEventListener("click", function(){
            addToCart(item);
        })
        doc.appendChild(addToCartEl);
        document.querySelector(".main-section-products").appendChild(doc);

    })
}

getItems();