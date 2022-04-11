
function getCartItems() {
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                // ... Loads all the Data
                ...doc.data()
            })
        })
        // console.log(cartItems, 'what is in Items');
        generateCartItems(cartItems);
        getTotalCost(cartItems);
    })
}

// Cart Total 
function getTotalCost(items){
    let totalCost = 0;
    items.forEach((item) => {
        totalCost += (item.price * item.quantity);
    })
    document.querySelector(".total-cost-number").innerText = numeral(totalCost).format('$ 50,000.00');
}

// Decrease Cart Items
function decreaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function (doc){
        if(doc.exists){
            if(doc.data().quantity > 1){
                cartItem.update({
                    quantity: doc.data().quantity - 1
                })
            }
        }
    })
}

function increaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function (doc){
        if(doc.exists){
            if(doc.data().quantity > 0){
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
        }
    })
}

function deleteItem(itemId) {
    db.collection("cart-items").doc(itemId).delete();
}

function generateCartItems(cartItems) {
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML += `
        <div class="cart-item flex items-center pb-4 border-b border-gray-300">
            <div class="cart-img w-40 h-26 bg-white rounded-lg">
                <img class="w-full h-full object-contain" src="${item.image}" alt="">
            </div>

            <div class="cart-item-details flex-grow ml-5">
                <div class="cart-item-title font-bold text-md text-gray-700">
                    ${item.name}
                </div>
                <div class="cart-item-title font-bold text-sm text-green-600">
                $ ${item.price}
                </div>
                <div class="cart-item-brand font-bold text-sm text-gray-500">
                    ${item.make}
                </div>
            </div>

            <div class="cart-item-counter w-48 items-center flex">
                <div data-id="${item.id}" class="cart-item-decrease">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 bg-white cursor-pointer flex justify-center items-center hover:text-red-500 hover:bg-gray-200 rounded-md mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <h4 class="text-gray-600 ">x ${item.quantity}<h4>
                <div data-id="${item.id}" class="cart-item-increase">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 bg-white cursor-pointer flex justify-center items-center hover:text-green-500 hover:bg-gray-200 rounded-md ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>   
            </div>

            <div class="cart-item-cost w-48 font-bold text-gray-600">
            ${numeral(item.price * item.quantity).format('$ 50,000.00')}
            </div>

            <div data-id="${item.id}" class="cart-item-dlt w-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 cursor-pointer hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div>
        </div>
        `
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListner();
}

function createEventListner() {
    let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
    let increaseButtons = document.querySelectorAll(".cart-item-increase");

    let deleteButtons = document.querySelectorAll(".cart-item-dlt");
    

    // DecreaseCount Button
    decreaseButtons.forEach((button) => {
        button.addEventListener("click", function(){
            //console.log(decreaseButtons)
            decreaseCount(button.dataset.id);
        })
    })

    // IncreaseCount Button
    increaseButtons.forEach((button) => {
        button.addEventListener("click", function(){
            //console.log(increaseButtons)
            increaseCount(button.dataset.id);
        })
    })

    // Delete Button
    deleteButtons.forEach((button) => {
        button.addEventListener("click", function(){
            console.log(deleteButtons)
            deleteItem(button.dataset.id);
        })
    })

}



getCartItems();