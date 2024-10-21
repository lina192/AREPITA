// ANIMACIÓN

    document.addEventListener('DOMContentLoaded', function() {
        const faqItems = document.querySelectorAll('.faq-item h3');

        faqItems.forEach(item => {
            item.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                
                // Alternar la visibilidad de la respuesta
                answer.style.display = (answer.style.display === 'none' || answer.style.display === '') ? 'block' : 'none';
            });
        });
    });
