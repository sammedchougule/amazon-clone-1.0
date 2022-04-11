function getCartItems() {
    db.collection("cart-items").onSnapshot((snapshot) => {
        let totalCount = 0;
        snapshot.docs.forEach((doc) => {
            totalCount += doc.data().quantity;
        })
        // console.log(totalCount);
        setCartCounter(totalCount);
    })
}

function setCartCounter(totalCount) {
    // cart-item-number
    document.querySelector(".cart-items-number").innerText = totalCount;
}


getCartItems();