document.addEventListener("DOMContentLoaded", function () {
    const leftToRightElements = document.querySelectorAll('.left-to-right');
    const rightToLeftElements = document.querySelectorAll('.right-to-left');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section');

    function checkVisibility() {
        const triggerBottom = window.innerHeight / 5 * 4;

        leftToRightElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < triggerBottom) {
                el.classList.add('visible');
            }
        });

        rightToLeftElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < triggerBottom) {
                el.classList.add('visible');
            }
        });
    }

    function setActiveNav() {
        let index = -1;
        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                index = i;
            }
        });

        navLinks.forEach((link, i) => {
            if (i === index) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href").substring(1);
        const targetPosition = document.getElementById(targetId).offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        window.requestAnimationFrame(step);

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const y = easeInOutCubic(progress, startPosition, distance, duration);
            window.scrollTo(0, y);
            if (progress < duration) window.requestAnimationFrame(step);
        }

        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    window.addEventListener('scroll', () => {
        checkVisibility();
        setActiveNav();
    });

    // Inicializa a verificação ao carregar a página
    checkVisibility();
    setActiveNav();
});



document.addEventListener("DOMContentLoaded", function () {
    const instagramFeed = document.getElementById('instagram-posts');

    // Função para buscar as postagens do Instagram
    function fetchInstagramPosts() {
        // Substitua 'YOUR_KURATOR_API_ENDPOINT' pelo endpoint da sua API do Kurator
        const kuratorApiEndpoint = 'YOUR_KURATOR_API_ENDPOINT';
        
        fetch(kuratorApiEndpoint)
            .then(response => response.json())
            .then(data => {
                const posts = data.posts.slice(0, 6); // Limitar às 6 últimas postagens
                displayInstagramPosts(posts);
            })
            .catch(error => console.error('Erro ao buscar as postagens do Instagram:', error));
    }

    // Função para exibir as postagens no HTML
    function displayInstagramPosts(posts) {
        posts.forEach(post => {
            const col = document.createElement('div');
            col.classList.add('col-lg-4', 'col-md-6', 'mb-4');

            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = post.image;
            img.alt = post.caption;
            img.classList.add('card-img-top');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = post.caption;

            cardBody.appendChild(cardText);
            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            instagramFeed.appendChild(col);
        });
    }

    // Buscar as postagens ao carregar a página
    fetchInstagramPosts();
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('messageForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const templateParams = {
            name: name,
            email: email,
            message: message,
            to_email: 'gabrieldeveloper33@gmail.com' // Destinatário fixo
        };

        emailjs.send('service_flordemaio', 'template_kjrhdfh', templateParams)
            .then(function(response) {
                alert('Mensagem enviada com sucesso!', response.status, response.text);
                $('#messageModal').modal('hide');
            }, function(error) {
                alert('Erro ao enviar a mensagem.', error);
            });
    });
});
(function(){
    var i,e,d=document,s="script";i=d.createElement("script");i.async=1;i.charset="UTF-8";
    i.src="https://cdn.curator.io/published/ca0e69c4-7a5c-4645-b2a5-46e53cf2f4f6.js";
    e=d.getElementsByTagName(s)[0];e.parentNode.insertBefore(i, e);
    })();