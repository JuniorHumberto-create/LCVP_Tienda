// LCVP App Interactions

document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const cartBtn = document.getElementById('cartBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCart');
    const addButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const emptyMsg = document.querySelector('.empty-msg');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalValue = document.getElementById('cartTotalValue');
    const toast = document.getElementById('toast');
    const contactForm = document.getElementById('contactForm');

    // State
    let cart = [];

    // Toggle Cart Modal
    const toggleCart = () => {
        cartOverlay.classList.toggle('active');
    };

    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    
    // Close cart clicking outside
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            toggleCart();
        }
    });

    // Add to cart
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const title = card.querySelector('h3').innerText;
            const priceStr = card.querySelector('.price').innerText;
            const price = parseFloat(priceStr.replace('S/ ', ''));

            addItemToCart(title, price);
            showToast();
        });
    });

    // Format currency
    const formatPrice = (price) => {
        return `S/ ${price.toFixed(2)}`;
    };

    // Update cart UI
    const updateCartUI = () => {
        cartCount.innerText = cart.length;
        
        if (cart.length === 0) {
            emptyMsg.style.display = 'block';
            cartItemsList.innerHTML = '';
            cartTotalValue.innerText = formatPrice(0);
            return;
        }

        emptyMsg.style.display = 'none';
        cartItemsList.innerHTML = '';
        
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            
            const li = document.createElement('li');
            li.classList.add('cart-item');
            
            li.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                </div>
                <div class="cart-item-price">
                    ${formatPrice(item.price)}
                </div>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            `;
            
            cartItemsList.appendChild(li);
        });

        cartTotalValue.innerText = formatPrice(total);

        // Re-attach delete listeners
        const removeBtns = document.querySelectorAll('.remove-item');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                removeItem(index);
            });
        });
    };

    const addItemToCart = (title, price) => {
        cart.push({ title, price });
        updateCartUI();
    };

    const removeItem = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    const showToast = () => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    // Form Submittion
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`¡Gracias por tu mensaje, ${name}! Te contactaremos pronto.`);
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
