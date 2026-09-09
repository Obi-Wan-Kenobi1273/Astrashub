document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SCROLL REVEAL
       ========================= */

    var revealElements = document.querySelectorAll(
        ".section, .project-card, .video-card, .stat, .link-card, .media-platform, .media-card, .tiktok-card"
    );

    var revealObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });


    /* =========================
       SMOOTH NAVIGATION
       ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            var targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            var target = document.getElementById(targetId.substring(1));

            if (!target) {
                return;
            }

            event.preventDefault();

            var header = document.querySelector("header");
            var headerHeight = header ? header.offsetHeight : 0;

            var targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            history.pushState(null, "", targetId);

        });

    });


    /* =========================
       ACTIVE NAVBAR
       ========================= */

    var navLinks = document.querySelectorAll(".nav-links a");

    var sections = document.querySelectorAll(
        "#home, #about, #projects, #music, #videos, #links"
    );

    var navObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) {
                return;
            }

            var sectionId = entry.target.id;

            navLinks.forEach(function (link) {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + sectionId) {
                    link.classList.add("active");
                }

            });

        });

    }, {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    });

    sections.forEach(function (section) {
        navObserver.observe(section);
    });


    /* =========================
       CURSOR GLOW
       ========================= */

    var cursorGlow = document.createElement("div");

    cursorGlow.style.position = "fixed";
    cursorGlow.style.width = "300px";
    cursorGlow.style.height = "300px";
    cursorGlow.style.borderRadius = "50%";
    cursorGlow.style.pointerEvents = "none";
    cursorGlow.style.zIndex = "0";

    cursorGlow.style.background =
        "radial-gradient(circle, rgba(143, 153, 251, 0.12) 0%, rgba(143, 153, 251, 0) 70%)";

    cursorGlow.style.transform = "translate(-50%, -50%)";
    cursorGlow.style.left = "0px";
    cursorGlow.style.top = "0px";

    cursorGlow.style.transition =
        "left 0.08s ease-out, top 0.08s ease-out";

    document.body.appendChild(cursorGlow);

    document.addEventListener("mousemove", function (event) {

        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";

    });

    if (window.matchMedia("(hover: none)").matches) {
        cursorGlow.style.display = "none";
    }


    /* =========================
       PROJECT CARD TILT
       ========================= */

    var projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(function (card) {

        card.addEventListener("mousemove", function (event) {

            var rect = card.getBoundingClientRect();

            var mouseX = event.clientX - rect.left;
            var mouseY = event.clientY - rect.top;

            var centerX = rect.width / 2;
            var centerY = rect.height / 2;

            var rotateX = (mouseY - centerY) / 20;
            var rotateY = (centerX - mouseX) / 20;

            card.style.transform =
                "perspective(800px) rotateX(" +
                rotateX +
                "deg) rotateY(" +
                rotateY +
                "deg) translateY(-6px)";

        });

        card.addEventListener("mouseleave", function () {

            card.style.transform =
                "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";

        });

    });


    /* =========================
       EASTER EGGS
       ========================= */

    var siteTitle = document.querySelector(".hero h1");
    var clickCount = 0;
    var clickTimer;

    if (siteTitle) {

        siteTitle.style.cursor = "pointer";

        siteTitle.addEventListener("click", function () {

            clickCount++;

            clearTimeout(clickTimer);

            clickTimer = setTimeout(function () {
                clickCount = 0;
            }, 2000);

            if (clickCount === 5) {

                alert(
                    "🥚 SECRET UNLOCKED!\n\n" +
                    "AstraShub has been tampered with.\n" +
                    "Please contact absolutely nobody."
                );

                clickCount = 0;
            }

        });

    }


    /* =========================
       KEYBOARD EASTER EGGS
       ========================= */

    var typedKeys = "";

    document.addEventListener("keydown", function (event) {

        if (event.key.length !== 1) {
            return;
        }

        typedKeys += event.key.toUpperCase();

        if (typedKeys.length > 20) {
            typedKeys = typedKeys.slice(-20);
        }


        if (typedKeys.indexOf("DEATHSHOCK") !== -1) {

            alert(
                "💀 DEATHSHOCK\n\n" +
                "2:15 of suffering.\n" +
                "454 attempts.\n" +
                "6,298 jumps.\n\n" +
                "Worth it? Probably not."
            );

            typedKeys = "";
        }


        if (typedKeys.indexOf("NETFLIX") !== -1) {

            alert(
                "🎬 FAILED NETFLIX DIRECTOR\n\n" +
                "Your application has been reviewed.\n\n" +
                "Unfortunately, Netflix has decided\n" +
                "that you are far too qualified."
            );

            typedKeys = "";
        }

    });

});
