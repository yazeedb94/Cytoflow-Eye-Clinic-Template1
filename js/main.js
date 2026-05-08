document.addEventListener("DOMContentLoaded", () => {
    const langSwitchBtn = document.getElementById("lang-switch");
    let currentLang = localStorage.getItem("lang") || "ar";

    // Set initial language and direction
    setLanguage(currentLang);

    // Language switch event listener
    langSwitchBtn.addEventListener("click", () => {
        currentLang = currentLang === "ar" ? "en" : "ar";
        localStorage.setItem("lang", currentLang);
        setLanguage(currentLang);
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById("mobile-toggle");
    const navLinks = document.getElementById("nav-links");

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            // Toggle icon between bars and times
            const icon = mobileToggle.querySelector("i");
            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = mobileToggle.querySelector("i");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            });
        });
    }

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        
        // Update texts based on data-i18n attributes
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        // Update placeholders based on data-i18n-placeholder attributes
        const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
        placeholders.forEach(el => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
        
        // Update language button text
        langSwitchBtn.textContent = translations[lang].switch_lang;
        
        // Optional: Add specific classes for font adjustments
        if(lang === "ar") {
            document.body.classList.remove("lang-en");
            document.body.classList.add("lang-ar");
        } else {
            document.body.classList.remove("lang-ar");
            document.body.classList.add("lang-en");
        }
    }

    // Form submission demo
    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert(currentLang === "ar" ? "تم استلام طلب الحجز الخاص بك وسنتواصل معك قريباً." : "Your booking request has been received and we will contact you soon.");
            bookingForm.reset();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
});
