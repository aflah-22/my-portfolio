document.addEventListener("DOMContentLoaded", function () {
    //them toggle functionality
    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;
    const icon = themeToggle.querySelector("i");

    // check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // apply theme based on saved preference or system preference
    if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
        html.classList.add("dark");
        icon.classList.replace("fa-moon", "fa-sun");
        document
            .querySelector('meta[name="theme-color"]')
            .setAttribute("content", "#000000");
    }

    // toggle theme on button click
    themeToggle.addEventListener("click", function () {
        html.classList.toggle("dark");

        // update the icon
        if (html.classList.contains("dark")) {
            icon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "dark");
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute("content", "#000000");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "light");
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute("content", "#0070f3");
        }
    });


    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("menuClose");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.remove("translate-x-full"); // Show menu
            document.body.classList.add("overflow-hidden");
        });

        closeMenu.addEventListener("click", () => {
            mobileMenu.classList.add("translate-x-full"); // Hide menu
            document.body.classList.remove("overflow-hidden");
        });

        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("translate-x-full");
                document.body.classList.remove("overflow-hidden");
            });
        });
    }

    // smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector("header").offsetHeight;
                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });

    // for submission handling
    const contactForm = document.getElementById("ContactForm"); // ✅ Corrected the ID case
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            // For demo purposes, we'll just log it and show a success message
            console.log("Form submitted:", { name, email, message });

            // show success message
            const button = contactForm.querySelector("button[type='submit']");
            const originalText = button.textContent;
            button.textContent = "Message Sent!";
            button.classList.add("bg-green-500");

            // Reset form
            contactForm.reset();

            // Restore button text after delay
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove("bg-green-500");
            }, 3000);
        });
    }

    // Add scroll evend for header shadow and reveal animation
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("section");

    function checkScroll() {
        // header shadow
        if (window.scrollY > 0) {
            header.classList.add("shadow-md");
        } else {
            header.classList.remove("shadow-md");
        }


        // reveal animation for sections
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.85) {
                section.classList.add("opacity-100", "translate-y-0");
                section.classList.remove("opacity-0", "translate-y-4");
            }
        })
    }


    window.addEventListener("scroll", checkScroll);

    // Run on page load
    checkScroll();


    // Add intersection observer for animatins
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("opacity-100", "translate-y-0");
                entry.target.classList.remove("opacity-0", "translate-y-4");
                // Stop observing the target once it is in view
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const terminalContainer = document.getElementById("terminal-container");
const terminalContent = document.querySelector(".terminal-content");
const commandSpan = document.querySelector(".command-span");

if (terminalContainer && terminalContent && commandSpan) {
    const commandText = "git clone https://github.com/aflah-22/my-portfolio.git";

    let i = 0;
    const typeCommand = () => {
        if (i < commandText.length) {
            commandSpan.textContent += commandText.charAt(i);
            i++;
            setTimeout(typeCommand, 50);
        } else {
            // Blinking cursor effect after typing
            const cursor = document.createElement("span");
            cursor.className = 'inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle';
            terminalContent.appendChild(cursor);
        }
    };

    setTimeout(typeCommand, 1000);
}



});
