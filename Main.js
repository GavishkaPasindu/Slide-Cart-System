
let cartItems = [];

let cartIcon = document.querySelector('#click-cart');
let cart = document.querySelector('.cart-container');
let cartClose = document.querySelector('#close-cart');


cartIcon.onclick = () => {
  cart.classList.add("active");
};


cartClose.onclick = () => {
  cart.classList.remove("active");
};


document.addEventListener('DOMContentLoaded', ready);


function ready()
{

  var removeButtons = document.getElementsByClassName("bi-trash3");
for (var i = 0; i < removeButtons.length; i++) {
  var button = removeButtons[i];
  button.addEventListener('click', (event) => removeCartItems(event, i));
}



 


 
  var addCart = document.getElementsByClassName("add-button");
  for (var i = 0; i < addCart.length; i++)
  {
      var button = addCart[i];
      button.addEventListener("click",addCartClicked)
  }


}
function removeCartItems(event, index) {
  cartItems.splice(index, 1); // Remove the item from the cartItems array
  updatetotal(); // Update the cart display and total
}



function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 0;
  }

  updatetotal();
}
function updateQuantity(event, index) {
  var newQuantity = parseInt(event.target.value);
  if (!isNaN(newQuantity) && newQuantity >= 0) {
    cartItems[index].quantity = newQuantity;
    updatetotal();
  }
}

function updatetotal() {
  var cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";

  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var itemTotal = item.price * item.quantity;
    total += itemTotal;

    var cartItemHTML = `
      <div class="single-item-detailes">
        <img src="${item.imageSrc}" alt="selected items" class="cart-img">
        <div class="details-box">
          <div class="product-title">${item.title}</div>
          <div class="price">LKR ${item.price}</div>
          <input type="number" value="${item.quantity}" class="cart-quantity" min="1" onchange="updateQuantity(event, ${i})">
        </div>
          <i class="bi-trash3" onclick="removeCartItems(event, ${i})"></i>
		  
      </div>
    `;

    cartItemsContainer.innerHTML += cartItemHTML;
  }

  document.querySelector(".total-price").innerText = "LKR " + total;
  var cartIconAmount = document.querySelector(".cartAmount");
  var cartIconTotalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  cartIconAmount.innerText = cartIconTotalQuantity.toString();
}

function addCartClicked(event) {
  var button = event.target;
  var card = button.parentElement;
  var title = card.getElementsByClassName("desc")[0].getElementsByTagName("p")[0].innerText;
  var price = parseFloat(card.getElementsByClassName("unit-price")[0].innerText.replace("LKR", ""));
  var imageSrc = card.getElementsByTagName("img")[0].getAttribute("src");

  addToCart(title, price, imageSrc);
  updatetotal();
  updateCartIconAmount();
}
function addToCart(title, price, imageSrc) {
  var cartItem = {
    title: title,
    price: price,
    imageSrc: imageSrc,
    quantity: 1
  };

  
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].title === title) {
      cartItems[i].quantity++;
      return;
    }
  }

  
  cartItems.push(cartItem);
}
function updateCartIconAmount() {
  var cartIconAmount = document.querySelector(".cartAmount");
  var cartIconTotalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  cartIconAmount.innerText = cartIconTotalQuantity.toString();
}




















