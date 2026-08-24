/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* ================= CLOSE MENU AFTER CLICK ================= */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >= sectionTop - 150 &&
            window.scrollY < sectionTop + sectionHeight - 150
        ) {

            current = section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* ================= NAVBAR SCROLL EFFECT ================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(11, 11, 11, 0.97)";

    } else {

        navbar.style.background = "rgba(11, 11, 11, 0.9)";

    }

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .stat-card, .experience-card, .education-card, .certificate-card"
);


const revealOnScroll = () => {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;

        const elementTop =
            element.getBoundingClientRect().top;

        const revealPoint = 100;


        if (elementTop < windowHeight - revealPoint) {

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";

        }

    });

};


/* Initial Animation State */

revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "all 0.6s ease";

});


window.addEventListener(
    "scroll",
    revealOnScroll
);


revealOnScroll();


/* ================= BACK TO TOP ================= */

const backToTop = document.querySelector(
    'footer a[href="#home"]'
);


backToTop.addEventListener("click", (e) => {

    e.preventDefault();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        const emailSubject = encodeURIComponent(
            `${subject} - Portfolio Contact`
        );

        const emailBody = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );

        window.location.href =
            `mailto:chanduabbireddy247@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        formMessage.innerText =
            "Opening your email client...";

    });

}