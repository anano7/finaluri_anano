document.addEventListener('DOMContentLoaded', () => {
  //burgeri
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // scroll to top
  const scrollToTopBtn = document.getElementById('scrollToTop');
  window.addEventListener('scroll', () => {
    scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // cookiebi
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');
  if (!localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'flex';
  }
  acceptCookiesBtn.addEventListener('click', () => {
    cookieBanner.style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
  });

  // show hide
  window.togglePassword = function () {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  };

  // formis validacia +regex
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!name || !email || !password) {
      alert('All fields are required!');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Invalid email format!');
      return;
    }
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 6 characters and include upper, lower, and a number.');
      return;
    }

    document.getElementById('login-status').textContent = 'Logged in successfully!';
    contactForm.reset();
  });

  // fetch apit
  fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline')
    .then(res => res.json())
    .then(data => {
      const productList = document.getElementById('product-list');
      const sliced = data.slice(0, 10);
      sliced.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${product.image_link}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.price_sign || '$'}${product.price}</p>
        `;
        productList.appendChild(div);
      });
    })
    .catch(err => console.error('API Error:', err));

  // 50px rom chamocdeba headeri pers icvlis
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // fade-in seqciebis sqrolvisas
  const sections = document.querySelectorAll('section');
  function checkSections() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  }

  window.addEventListener('scroll', checkSections);
  checkSections();
});

// cookiebi tu mushaobs
// localStorage.setItem('cookiesAccepted', 'true');
// console.log(localStorage.getItem('cookiesAccepted')); 
