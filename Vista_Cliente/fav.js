document.addEventListener('DOMContentLoaded', function() {
    // Obtener los productos favoritos del almacenamiento local
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Información de productos de ejemplo (esto normalmente vendría del servidor)
    const productInfo = {
        'product1': {
            name: 'De la Casa',
            description: 'Carne de hamburguesa, carne, pollo, tocineta, champiñon, cebolla, tomate, lechuga, huevo frito y queso.',
            price: '$24.000',
            image: 'img/h1.png'
        },
        'product2': {
            name: 'Super',
            description: 'Carne de hamburguesa, pollo, champiñon, tocineta, cebolla, tomate, lechuga, queso y huevo de cordoniz.',
            price: '$22.000',
            image: 'img/h2.png'
        },
        'product3': {
            name: 'Especial',
            description: 'Carne de hamburguesa, champiñon, cebolla, tomate, lechuga, queso, huevo de cordoniz, tocineta y papas chip.',
            price: '$20.000',
            image: 'img/h5.png'
        },
        'product4': {
            name: 'Tradicional',
            description: 'Carne de hamburguesa, cebolla, tomate, lechuga, queso y papas chip.',
            price: '$15.000',
            image: 'img/h3.png'
        },
        'product5': {
            name: 'Hawaiana',
            description: 'Carne de hamburguesa, piña, queso, jamon, huevo de cordoniz, papas chip, lechuga y tomate.',
            price: '$18.000',
            image: 'img/h4.png'
        },
        'product6': {
            name: 'Epa',
            description: 'Carne de hamburguesa, platano maduro, queso campesino, papas chip, cebolla, tomate y lechuga.',
            price: '$18.000',
            image: 'img/h6.png'
        },
        'product7': {
            name: 'Especial',
            description: 'Carne, pollo, champiñon, jamon, queso, y huevo de cordoniz.',
            price: '$18.000',
            image: 'img/a9.png'
        },
        'product8': {
            name: 'Ranchera',
            description: 'Carne, pollo, choriso, queso y huevo de cordoniz.',
            price: '$17.000',
            image: 'img/a10.png'
        },
        'product9': {
            name: 'Mixta',
            description: 'Carne, pollo, queso y huevo de cordoniz.',
            price: '$16.000',
            image: 'img/a3.png'
        },
        'product10': {
            name: 'Con Todo',
            description: 'Carne, pollo, carne de hamburguesa, champiñon, jamon, queso y huevo de cordoniz.',
            price: '$22.000',
            image: 'img/a4.png'
        },
        'product11': {
            name: 'Super Especial',
            description: 'Carne, pollo, carne de hamburguesa, queso y huevo de cordoniz.',
            price: '$20.000',
            image: 'img/a11.png'
        },
        'product12': {
            name: 'Criolla',
            description: 'Carne, Pollo, huevo frito, tocineta y queso.',
            price: '$17.000',
            image: 'img/a6.png'
        },
        'product13': {
            name: 'Pollo y champiñon',
            description: 'Pollo, champiñon, queso y huevo de cordoniz.',
            price: '$16.000',
            image: 'img/a7.png'
        },
        'product14': {
            name: 'Arepa Burguer',
            description: 'Carne de hamburguesa y queso.',
            price: '$10.000',
            image: 'img/a8.png'
        },
        'product15': {
            name: 'Epa',
            description: 'Platano maduro, queso, champiñon, carne y pollo.',
            price: '$20.000',
            image: 'img/a1.png'
        },
        'product16': {
            name: 'Callejera',
            description: 'Pollo, champiñon, choriso, cebolla, queso y huevo de cordoniz.',
            price: '$18.000',
            image: 'img/a3.png'
        },
        'product17': {
            name: 'Del Campo',
            description: 'Carne, pollo, cebolla, lechuga, tomate, queso y huevo de cordoniz.',
            price: '$17.000',
            image: 'img/a11.png'
        },
        'product18': {
            name: 'Hawaiana',
            description: 'Jamon, queso, piña y huevo de cordoniz.',
            price: '$10.000',
            image: 'img/a12.png'
        },
        'product19': {
            name: 'Clasica',
            description: 'Papas a la francesa, salchicha, tocineta, huevo de cordoniz y queso.',
            price: '$12.000',
            image: 'img/sa1.png'
        },
        'product20': {
            name: 'Especial',
            description: 'Papas a la francesa, salchicha, tocineta, huevo de cordoniz y queso.',
            price: '$18.000',
            image: 'img/sa2.png'
        },
        'product21': {
            name: 'Con Todo',
            description: 'Papas a la francesa, salchicha, carne, pollo, tocineta, huevo de cordoniz y queso.',
            price: '$23.000',
            image: 'img/sa3.png'
        },
        'product22': {
            name: 'Ranchero',
            description: 'Papas a la francesa, salchicha, carne, pollo, tocineta, huevo de cordoniz, queso y maiz tierno.',
            price: '$25.000',
            image: 'img/sa1.png'
        },
        'product23': {
            name: 'Con Todo',
            description: 'Salchicha, pollo, tocineta, maiz tierno, cebolla, salsas, queso y huevo de cordoniz.',
            price: '$20.000',
            image: 'img/p1.png'
        },
        'product24': {
            name: 'Especial',
            description: 'Salchicha, champiñon, tocineta, maiz tierno, cebolla, queso y huevo de cordoniz.',
            price: '$18.500',
            image: 'img/p3.png'
        },
        'product25': {
            name: 'Hawaiano',
            description: 'Salchicha, tocineta, piña, queso, salsas, huevo de cordoniz, papas chip.',
            price: '$14.000',
            image: 'img/p2.png'
        },
        'product26': {
            name: 'Clasico',
            description: 'Salchicha, cebolla, queso, salsas, huevo de cordoniz, papas chip.',
            price: '$12.000',
            image: 'img/p4.png'
        },
        'product27': {
            name: 'Patacon Burguer',
            description: 'Platano, carne, pollo, champiñon, maiz tierno, cebolla, huevo de cordoniz, papas chip y queso.',
            price: '$26.000',
            image: 'img/pa1.png'
        },
        'product28': {
            name: 'Con Todo',
            description: 'Platano, carne, pollo, champiñon, maiz tierno, cebolla, huevo de cordoniz y queso.',
            price: '$24.000',
            image: 'img/pa2.png'
        },
        'product29': {
            name: 'Mixto',
            description: 'Platano, carne, pollo, champiñon y queso.',
            price: '$22.000',
            image: 'img/pa3.png'
        },
        'product30': {
            name: 'Ranchero',
            description: 'Platano, carne, champiñon, huevo frito y queso.',
            price: '$22.000',
            image: 'img/pa1.png'
        },
        'product31': {
            name: 'Mazorcada con todo',
            description: 'Carne, pollo, tocineta, champiñon, maiz tierno, huevo de cordoniz, papas chip y queso.',
            price: '$24.000',
            image: 'img/v1.png'
        },
        'product32': {
            name: 'Mazorcada Sencilla',
            description: 'Pollo, tocineta, maiz tierno, huevo de cordoniz, papas chip y queso.',
            price: '$20.000',
            image: 'img/v2.png'
        },
        'product33': {
            name: 'Chorizo',
            description: 'Chorizo con arepa y queso',
            price: '$8.500',
            image: 'img/v3.png'
        },
        'product34': {
            name: 'Chori perro de la casa',
            description: 'Pollo, tocineta, maiz tierno, cebolla, queso y huevo de cordoniz.',
            price: '$18.500',
            image: 'img/v5.png'
        },
        'product35': {
            name: 'Chori perro de la casa',
            description: 'champiñon, tocineta, Maiz tierno, cebolla y queso.',
            price: '$10.000',
            image: 'img/v4.png'
        },
        'product36': {
            name: 'Cocacola',
            description: '',
            price: '$2.500',
            image: 'img/b1.png'
        },
        'product37': {
            name: 'Postobon - Manzana',
            description: '',
            price: '$2.000',
            image: 'img/b2.png'
        },
        'product38': {
            name: 'Postobon - Colombiana',
            description: '',
            price: '$2.500',
            image: 'img/b3.png'
        },
        'product39': {
            name: 'Pepsi',
            description: '',
            price: '$2.500',
            image: 'img/b4.png'
        },
        'product40': {
            name: 'Cuatro',
            description: '',
            price: '$2.000',
            image: 'img/b5.png'
        },
    };



    





    const favoritesContainer = document.getElementById('favorites-container');

    function renderFavorites() {
        favoritesContainer.innerHTML = '';
        favorites.forEach(productId => {
            const product = productInfo[productId];
            if (product) {
                const favoriteCard = document.createElement('div');
                favoriteCard.classList.add('favorite-card');
                favoriteCard.setAttribute('data-id', productId);

                favoriteCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="content">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        <span class="price">${product.price}</span>
                        <a href="#" class="btn-2">Comprar</a>
                        <button class="btn-remove">Eliminar</button>
                    </div>
                `;

                favoritesContainer.appendChild(favoriteCard);
            }
        });
    }

    renderFavorites();

    // Manejar el clic en el botón de comprar
    favoritesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-2')) {
            const productId = event.target.closest('.favorite-card').getAttribute('data-id');
            const product = productInfo[productId];

            // Añadir producto al carrito
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(productId);  // Guardamos solo el ID del producto
            localStorage.setItem('cart', JSON.stringify(cart));  // Actualizar carrito en localStorage

            // SweetAlert para mostrar éxito
            Swal.fire({
                title: '¡De tus favoritos al carrito!',
                text: `${product.name} ha sido añadido a tu carrito.`,
                icon: 'success',
                toast: true,
                position: 'top',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                showCancelButton: true,
                cancelButtonText: 'Ir al carrito',
                customClass: {
                    confirmButton: 'custom-btn',
                    cancelButton: 'custom-btn-secondary'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.close(); // Cerrar la alerta si se hace clic en 'Aceptar'
                } else if (result.isDismissed) {
                    // Guardar el ID del producto en localStorage
                    localStorage.setItem('lastAddedProduct', productId);
                    
                    // Redirigir al usuario al carrito
                    window.location.href = '../vista_cliente/carrito2.html'; 
                }
            });
        }
    });

    // Manejar el clic en el botón de eliminar
    favoritesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-remove')) {
            const productId = event.target.closest('.favorite-card').getAttribute('data-id');
            favorites = favorites.filter(id => id !== productId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
            toggleNoFavoritesMessage();
        }
    });

    const noFavoritesMessage = document.getElementById('no-favorites');
    function toggleNoFavoritesMessage() {
        if (favorites.length === 0) {
            noFavoritesMessage.style.display = 'block';
        } else {
            noFavoritesMessage.style.display = 'none';
        }
    }
    toggleNoFavoritesMessage();
});