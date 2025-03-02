let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>
{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>
{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>
{
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}


var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,

    autoplay: {
        delay: 7500,
        disableOnIntreaction: false,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,

      },
    },
  });

  var swiper = new Swiper(".review-slider", {
    loop: true,
    spaceBetween: 20,

    autoplay: {
        delay: 7500,
        disableOnIntreaction: false,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,

      },
    },
  });
  document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let product = {
                name: this.getAttribute("data-name"),
                price: this.getAttribute("data-price")
            };
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.href = "addtocart.html"; // Redirect to cart page
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge();
  loadCart();
  
  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
          let name = this.getAttribute("data-name");
          let price = Number(this.getAttribute("data-price"));
          addToCart(name, price);
      });
  });
});

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let badge = document.getElementById("cart-badge");

  if (cart.length > 0) {
      badge.innerText = cart.length;
      badge.style.visibility = "visible"; 
  } else {
      badge.style.visibility = "hidden"; 
  }
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsContainer = document.getElementById("cart-items");
  let totalElement = document.getElementById("cart-total");
  cartItemsContainer.innerHTML = "";
  
  let total = 0;

  if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalElement.innerText = "Total: $0";
      return;
  }

  cart.forEach((item, index) => {
      total += Number(item.price);

      let div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
          <h2>${item.name} - $${item.price}</h2>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      `;
      cartItemsContainer.appendChild(div);
  });

  totalElement.innerText = `Total: $${total}`;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartBadge();
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCart();
  updateCartBadge();
}

function continueShopping() {
  window.location.href = "index.html";
}
