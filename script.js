// script.js
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    let autoSlideInterval;

    // Fonction pour afficher une diapositive spécifique
    function showSlide(index) {
        currentIndex = index;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Fonction pour démarrer le défilement automatique des diapositives
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000); // Change de diapositive toutes les 5 secondes
    }

    // Fonction pour arrêter le défilement automatique des diapositives
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Écouteur d'événement pour le bouton précédent
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(currentIndex - 1);
            startAutoSlide();
        });
    }

    // Écouteur d'événement pour le bouton suivant
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(currentIndex + 1);
            startAutoSlide();
        });
    }

    // Afficher la première diapositive et démarrer le défilement automatique
    if (slider) {
        showSlide(currentIndex);
        startAutoSlide();
    }

    // Formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const subject = encodeURIComponent('Nouveau message de ' + name);
            const body = encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\nMessage: ' + message);
            window.location.href = 'mailto:romainlmjc@gmail.com?subject=' + subject + '&body=' + body;
            contactForm.reset();
        });
    }

    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    // Actualités des jeux vidéo en français (limité à 15 articles)
    const newsContainer = document.getElementById('news-container');
    const apiKey = '4cf00df60ffc4b68855685ea5c65066f'; // Votre clé API NewsAPI
    const apiUrl = `https://newsapi.org/v2/everything?q=jeux+vidéo&language=fr&pageSize=15&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');
                    newsItem.innerHTML = `
                        <img src="${article.urlToImage}" alt="${article.title}">
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Lire plus</a>
                    `;
                    newsContainer.appendChild(newsItem);
                });
            } else {
                newsContainer.innerHTML = '<p>Aucun article trouvé.</p>';
            }
        })
        .catch(error => console.error('Erreur lors de la récupération des actualités:', error));
});
