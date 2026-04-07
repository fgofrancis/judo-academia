 // <script>
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const navMenu = document.getElementById('navMenu');

        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                // Close mobile menu if open
                navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for CTA buttons
        document.querySelectorAll('.btn[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe all sections for animation
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Form submission fgo
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const nombre = formData.get('nombre');
            const email = formData.get('email');
            const telefono = formData.get('telefono');
            const programa = formData.get('programa');
            const mensaje = formData.get('mensaje');

            // Simple form validation
            if (!nombre || !email) {
                alert('Por favor, completa los campos obligatorios.');
                return;
            }

            // Simulate form submission
           //  alert(`¡Gracias ${nombre}! Hemos recibido tu mensaje y te contactaremos pronto. ¡Bienvenido a la familia del judo!`);

                try {
                    const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

            if (response.ok) {
                // alert(`¡Gracias ${nombre}! Hemos recibido tu mensaje y te contactaremos pronto.`);

                document.getElementById("userName").textContent = formData.get("nombre");
                    const banner = document.getElementById("successBanner");
                    banner.style.display = "block";

                    // Ocultar automáticamente después de 5 segundos
                    setTimeout(() => {
                      banner.style.display = "none";
                    }, 5000);


                this.reset();
            } else {
                alert('Hubo un error al enviar el formulario.');
            }
            } catch (error) {
                console.error(error);
                alert('Error de conexión al enviar el formulario.');
            }

            // Reset form
            this.reset();
        });

        // Add some interactive effects
        document.querySelectorAll('.program-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add floating animation to hero elements
        const heroContent = document.querySelector('.hero-content');
        let floatY = 0;

        function animateHero() {
            floatY += 0.02;
            const offset = Math.sin(floatY) * 5;
            heroContent.style.transform = `translateY(${offset}px)`;
            requestAnimationFrame(animateHero);
        }

        animateHero();

        // Add dynamic background pattern
        function createFloatingElements() {
            const hero = document.querySelector('.hero');

            for (let i = 0; i < 20; i++) {
                const element = document.createElement('div');
                element.innerHTML = '🥋';
                element.style.position = 'absolute';
                element.style.fontSize = '20px';
                element.style.opacity = '0.1';
                element.style.left = Math.random() * 100 + '%';
                element.style.top = Math.random() * 100 + '%';
                element.style.animation = `float ${5 + Math.random() * 10}s ease-in-out infinite`;
                element.style.animationDelay = Math.random() * 5 + 's';
                hero.appendChild(element);
            }
        }

                // Add scroll animations for credo lines
        const credoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });

        // Observe credo lines when they exist
        window.addEventListener('load', function() {
            document.querySelectorAll('.credo-line').forEach(line => {
                credoObserver.observe(line);
            });
        });

        // Add typing effect to hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';

            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect
        window.addEventListener('load', function() {
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                setTimeout(() => {
                    typeWriter(heroTitle, originalText, 80);
                }, 1000);
            }
        });


        document.addEventListener('DOMContentLoaded', () => {
            //?nocache=' + new Date().getTime() para evitar el cache, esto es solo para desarrollo
           // fetch('videos/videos.json?nocache=' + new Date().getTime()) // la desactivé a nivel de pom.xml
           const version = /*[[ ${jsonVersion}]]*/ '1'
           fetch('videos/videos.json?v=' + version)
            .then(response => response.json())
            .then(videos => {
              const container = document.getElementById('videoList');
              const description = document.querySelector('#videos p'); // párrafo dentro de la sección

              videos.forEach(video => {
                const iframe = document.createElement('iframe');
                iframe.src = video.url;
                iframe.title = video.title;
                iframe.width = "560";
                iframe.height = "315";
                iframe.allowFullscreen = true;
                iframe.frameBorder = "0";

                container.appendChild(iframe);

                // Actualizar el párrafo con el título del video
                if (description) {
                  description.textContent = video.title;
                }
              });
            })
            .catch(error => console.error("Error cargando videos: ", error));
        });


