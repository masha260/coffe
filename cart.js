document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація кошика
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Додавання товару в кошик
    if (document.querySelector('.add-to-cart')) {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const drinkId = this.getAttribute('data-id');
                const drinkCard = this.closest('.drink-card');
                const drinkName = drinkCard.querySelector('h3').textContent;
                const drinkPrice = parseFloat(drinkCard.querySelector('.price').textContent.replace('₴', ''));
                
                // Перевірка чи товар вже в кошику
                const existingItem = cart.find(item => item.id === drinkId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: drinkId,
                        name: drinkName,
                        price: drinkPrice,
                        quantity: 1
                    });
                }
                
                updateCart();
                alert(`${drinkName} додано до кошика!`);
            });
        });
    }
    
    // Оновлення кошика
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        
        if (document.querySelector('.cart-items')) {
            const cartItemsContainer = document.querySelector('.cart-items');
            const totalPriceElement = document.querySelector('.total-price');
            
            cartItemsContainer.innerHTML = '';
            let totalPrice = 0;
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Кошик порожній</p>';
                totalPriceElement.textContent = '₴0';
                return;
            }
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;
                
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <div>
                        <h4>${item.name}</h4>
                        <p>₴${item.price} x ${item.quantity}</p>
                    </div>
                    <div>
                        <span>₴${itemTotal.toFixed(2)}</span>
                        <button class="remove-item" data-id="${item.id}">×</button>
                    </div>
                `;
                
                cartItemsContainer.appendChild(itemElement);
            });
            
            totalPriceElement.textContent = `₴${totalPrice.toFixed(2)}`;
            
            // Додавання обробників подій для кнопок видалення
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-id');
                    cart = cart.filter(item => item.id !== itemId);
                    updateCart();
                });
            });
        }
    }
    
    // Оновлення кошика при завантаженні сторінки
    updateCart();
    
    // Обробка оформлення замовлення
    if (document.querySelector('.checkout-btn')) {
        document.querySelector('.checkout-btn').addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Кошик порожній!');
                return;
            }
            
            alert('Замовлення оформлено! Дякуємо за покупку!');
            cart = [];
            updateCart();
        });
    }
});