// app-pages.js — small demo data + cart + basic behaviors (client-side)
document.addEventListener('DOMContentLoaded', function(){
  // set year if not already
  var yEl = document.getElementById('year'); if (yEl) yEl.textContent = new Date().getFullYear();

  // Simple cart stored in memory for demo
  window._cart = window._cart || { items: [], total:0 };
  function updateCartUI(){
    var count = window._cart.items.reduce((s,i)=>s+i.qty,0);
    var total = window._cart.items.reduce((s,i)=>s.qty*i.price,s);
    window._cart.total = total;
    var cEl = document.getElementById('cartCount'); if (cEl) cEl.textContent = count;
    var totalEl = document.getElementById('cartTotal'); if (totalEl) totalEl.textContent = total;
    var cartItems = document.getElementById('cartItems');
    if (cartItems){
      if (window._cart.items.length===0) cartItems.innerHTML = '<p class="muted">No items yet.</p>';
      else cartItems.innerHTML = window._cart.items.map(it=>`
        <div style="display:flex;justify-content:space-between;margin:0.4rem 0">
          <div>${it.name} x ${it.qty}</div><div>NPR ${it.qty*it.price}</div>
        </div>
      `).join('') + '<button id="clearCart" class="btn" style="margin-top:0.6rem">Clear</button>';
      var clear = document.getElementById('clearCart'); if (clear) clear.addEventListener('click', function(){ window._cart.items=[]; updateCartUI(); });
    }
    var checkout = document.getElementById('checkoutBtn'); if (checkout) checkout.disabled = window._cart.items.length===0;
  }
  updateCartUI();

  // Inject sample restaurants
  var restaurantsList = document.getElementById('restaurantsList');
  if (restaurantsList){
    var sample = [
      {id:1,name:'Spice Villa',cuisine:'Asian',desc:'Tasty curries and noodles',rating:4.5},
      {id:2,name:'Burger House',cuisine:'Fast Food',desc:'Grilled burgers & fries',rating:4.2},
      {id:3,name:'Pizza Corner',cuisine:'Italian',desc:'Wood-fired pizzas',rating:4.6}
    ];
    restaurantsList.innerHTML = sample.map(r=>`
      <div class="card">
        <h3>${r.name}</h3>
        <p class="muted">${r.cuisine} • ${r.desc}</p>
        <div class="actions"><a class="btn small" href="menu.html?rid=${r.id}">View Menu</a><button class="btn small" data-id="${r.id}" onclick="window.location.href='menu.html?rid=${r.id}'">Order</button></div>
      </div>
    `).join('');
  }

  // Inject sample menu items if on menu page
  var menuList = document.getElementById('menuList');
  if (menuList){
    // sample menu
    var items = [
      {id:101,name:'Veg Burger',desc:'Veg patty, lettuce, tomato',price:220,img:'../images/back1.jpg'},
      {id:102,name:'Spicy Paneer',desc:'Paneer in tomato gravy',price:280,img:'../images/back1.jpg'},
      {id:103,name:'Margherita Pizza',desc:'Tomato, basil, cheese',price:450,img:'../images/back1.jpg'}
    ];
    menuList.innerHTML = items.map(it=>`
      <div class="menu-item">
        <img src="${it.img}" alt="${it.name}">
        <div class="meta">
          <h4>${it.name} — NPR ${it.price}</h4>
          <p class="muted">${it.desc}</p>
        </div>
        <div>
          <input type="number" value="1" min="1" style="width:64px;margin-bottom:0.4rem" id="qty-${it.id}">
          <button class="btn small primary" data-id="${it.id}" data-name="${it.name}" data-price="${it.price}">Add</button>
        </div>
      </div>
    `).join('');

    // add handlers
    menuList.querySelectorAll('button[data-id]').forEach(btn=>{
      btn.addEventListener('click', function(){
        var id = this.dataset.id, name=this.dataset.name, price=Number(this.dataset.price);
        var qtyEl = document.getElementById('qty-'+id);
        var qty = qtyEl ? Number(qtyEl.value) : 1;
        var found = window._cart.items.find(x=>x.id==id);
        if (found) found.qty += qty; else window._cart.items.push({id,name,price,qty});
        updateCartUI();
      });
    });
  }

  // simple forgot form
  var forgot = document.getElementById('forgotForm');
  if (forgot){
    forgot.addEventListener('submit', function(e){
      e.preventDefault();
      var msg = document.getElementById('forgotMsg');
      msg.textContent = 'If this email exists we sent a reset link (demo).';
    });
  }

  // profile save (demo)
  var saveProfile = document.getElementById('saveProfile');
  if (saveProfile){
    saveProfile.addEventListener('click', function(){
      document.getElementById('profileMsg').textContent = 'Profile saved (demo).';
    });
  }

  // fill dashboard user info from localStorage (demo)
  var user = JSON.parse(localStorage.getItem('sf_user') || '{}');
  if (user && user.name){
    var elN = document.getElementById('userName'); if (elN) elN.textContent = user.name;
    var elE = document.getElementById('userEmail'); if (elE) elE.textContent = user.email;
  }
});
