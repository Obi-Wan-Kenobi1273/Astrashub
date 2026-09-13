document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       CONFIGURATION
       ========================= */

    var BOT_STATUS_URL =
        "https://astrabot-status.farrellandrew07.workers.dev/status";


    /* =========================
       FLOATING HEARTS
       ========================= */

    var heartField = document.createElement("div");

    heartField.className = "heart-field";

    document.body.appendChild(heartField);


    function createHeart() {

        var heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.textContent = "♥";

        var size =
            Math.random() * 12 + 9;

        var left =
            Math.random() * 100;

        var duration =
            Math.random() * 10 + 12;

        var drift =
            (Math.random() - 0.5) * 180;

        var rotation =
            (Math.random() - 0.5) * 80;

        var opacity =
            Math.random() * 0.30 + 0.25;


        heart.style.left =
            left + "%";

        heart.style.fontSize =
            size + "px";


        heart.style.setProperty(
            "--heart-duration",
            duration + "s"
        );

        heart.style.setProperty(
            "--heart-drift",
            drift + "px"
        );

        heart.style.setProperty(
            "--heart-rotation",
            rotation + "deg"
        );

        heart.style.setProperty(
            "--heart-opacity",
            opacity
        );


        heartField.appendChild(heart);


        heart.addEventListener(
            "animationend",
            function () {
                heart.remove();
            }
        );

    }


    var heartCount =
        window.innerWidth <= 650
            ? 8
            : 14;


    for (
        var i = 0;
        i < heartCount;
        i++
    ) {

        setTimeout(
            function () {
                createHeart();
            },
            Math.random() * 8000
        );

    }


    setInterval(
        createHeart,
        1800
    );


    /* =========================
       SCROLL REVEAL
       ========================= */

    var revealElements =
        document.querySelectorAll(
            ".section, " +
            ".project-card, " +
            ".video-card, " +
            ".stat, " +
            ".link-card, " +
            ".media-platform, " +
            ".media-card, " +
            ".tiktok-card, " +
            ".status-card, " +
            ".metric-card, " +
            ".currently-card, " +
            ".gaming-card, " +
            ".experiment-card, " +
            ".timeline-item, " +
            ".shame-card, " +
            ".achievement-card, " +
            ".roadmap-card, " +
            ".hall-of-fame-card, " +
            ".brain-card, " +
            ".download-card, " +
            ".system-card, " +
            ".discord-cta"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        var revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "revealed"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "reveal"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "revealed"
                );

            }
        );

    }


    /* =========================
       SMOOTH NAVIGATION
       ========================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        var targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {
                            return;
                        }


                        var target =
                            document.getElementById(
                                targetId.substring(1)
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        var header =
                            document.querySelector(
                                "header"
                            );

                        var headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        var targetPosition =
                            target
                                .getBoundingClientRect()
                                .top +
                            window.pageYOffset -
                            headerHeight -
                            20;


                        window.scrollTo({
                            top:
                                targetPosition,
                            behavior:
                                "smooth"
                        });


                        history.pushState(
                            null,
                            "",
                            targetId
                        );


                        closeMobileMenu();

                    }
                );

            }
        );


    /* =========================
       ACTIVE NAVBAR
       ========================= */

    var navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    var sections =
        document.querySelectorAll(
            "#home, " +
            "#about, " +
            "#dashboard, " +
            "#projects, " +
            "#gaming, " +
            "#achievements, " +
            "#roadmap, " +
            "#experiments, " +
            "#changelog, " +
            "#music, " +
            "#videos, " +
            "#links"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        var navObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            var sectionId =
                                entry.target.id;


                            navLinks.forEach(
                                function (link) {

                                    link.classList.remove(
                                        "active"
                                    );


                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        "#" +
                                        sectionId
                                    ) {

                                        link.classList.add(
                                            "active"
                                        );

                                    }

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",
                    threshold: 0
                }
            );


        sections.forEach(
            function (section) {
                navObserver.observe(
                    section
                );
            }
        );

    }


    /* =========================
       MOBILE MENU
       ========================= */

    var mobileMenuButton =
        document.getElementById(
            "mobile-menu-button"
        );

    var navContainer =
        document.getElementById(
            "nav-links"
        );


    function closeMobileMenu() {

        if (!navContainer) {
            return;
        }


        navContainer.classList.remove(
            "open"
        );


        if (mobileMenuButton) {

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    }


    if (
        mobileMenuButton &&
        navContainer
    ) {

        mobileMenuButton.addEventListener(
            "click",
            function () {

                var isOpen =
                    navContainer.classList.toggle(
                        "open"
                    );


                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                mobileMenuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

            }
        );


        navContainer
            .querySelectorAll("a")
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {
                            closeMobileMenu();
                        }
                    );

                }
            );

    }


    /* =========================
       CURSOR GLOW
       ========================= */

    var cursorGlow =
        document.createElement(
            "div"
        );

    cursorGlow.className =
        "cursor-glow";

    document.body.appendChild(
        cursorGlow
    );


    document.addEventListener(
        "mousemove",
        function (event) {

            cursorGlow.style.left =
                event.clientX + "px";

            cursorGlow.style.top =
                event.clientY + "px";

        }
    );


    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {

        cursorGlow.style.display =
            "none";

    }


    /* =========================
       PROJECT CARD TILT
       ========================= */

    var projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(
        function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    if (
                        window.matchMedia(
                            "(hover: none)"
                        ).matches
                    ) {
                        return;
                    }


                    var rect =
                        card.getBoundingClientRect();


                    var mouseX =
                        event.clientX -
                        rect.left;

                    var mouseY =
                        event.clientY -
                        rect.top;


                    var centerX =
                        rect.width / 2;

                    var centerY =
                        rect.height / 2;


                    var rotateX =
                        (mouseY - centerY) /
                        25;

                    var rotateY =
                        (centerX - mouseX) /
                        25;


                    card.style.transform =
                        "perspective(800px) " +
                        "rotateX(" +
                        rotateX +
                        "deg) " +
                        "rotateY(" +
                        rotateY +
                        "deg) " +
                        "translateY(-6px)";

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "perspective(800px) " +
                        "rotateX(0deg) " +
                        "rotateY(0deg) " +
                        "translateY(0)";

                }
            );

        }
    );


    /* =========================
       CURRENT TIME
       ========================= */

    function updateLastChecked() {

        var element =
            document.getElementById(
                "last-checked"
            );


        if (!element) {
            return;
        }


        var now =
            new Date();


        element.textContent =
            now.toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );

    }


    updateLastChecked();


    setInterval(
        updateLastChecked,
        1000
    );


    /* =========================
       ASTRA BOT STATUS
       ========================= */

    function setBotStatus(
        status,
        text,
        detail
    ) {

        var pill =
            document.getElementById(
                "astrabot-status-pill"
            );

        var description =
            document.getElementById(
                "astrabot-status-text"
            );

        var detailElement =
            document.getElementById(
                "astrabot-status-detail"
            );

        var bar =
            document.getElementById(
                "astrabot-status-bar"
            );


        if (!pill) {
            return;
        }


        pill.classList.remove(
            "online",
            "unknown",
            "working"
        );


        if (status === "online") {

            pill.classList.add(
                "online"
            );

            pill.textContent =
                "Online";


            if (bar) {
                bar.style.width =
                    "100%";
            }

        } else if (
            status === "offline"
        ) {

            pill.classList.add(
                "unknown"
            );

            pill.textContent =
                "Offline";


            if (bar) {
                bar.style.width =
                    "0%";
            }

        } else {

            pill.classList.add(
                "unknown"
            );

            pill.textContent =
                "Unknown";


            if (bar) {
                bar.style.width =
                    "35%";
            }

        }


        if (description && text) {
            description.textContent =
                text;
        }


        if (detailElement && detail) {
            detailElement.textContent =
                detail;
        }

    }


    async function checkBotStatus() {

        if (!BOT_STATUS_URL) {

            setBotStatus(
                "unknown",
                "Live status endpoint not configured.",
                "Configure BOT_STATUS_URL in script.js"
            );

            return;
        }


        try {

            var response =
                await fetch(
                    BOT_STATUS_URL,
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {
                throw new Error(
                    "Status request failed"
                );
            }


            var data =
                await response.json();


            if (
                data.online === true ||
                data.status === "online"
            ) {

                setBotStatus(
                    "online",
                    data.text ||
                        "Discord bot is online.",
                    data.detail ||
                        "Live status confirmed."
                );

            } else {

                setBotStatus(
                    "offline",
                    data.text ||
                        "Discord bot appears to be offline.",
                    data.detail ||
                        "Live status endpoint responded."
                );

            }

        } catch (error) {

            console.warn(
                "Unable to check AstraBot status:",
                error
            );


            setBotStatus(
                "unknown",
                "Unable to reach the status endpoint.",
                "Check the endpoint or CORS settings."
            );

        }

    }


    checkBotStatus();


    if (BOT_STATUS_URL) {

        setInterval(
            checkBotStatus,
            30000
        );

    }


    /* =========================
       ASTRA'S BRAIN
       ========================= */

    var brainIdeas = [

        "Build another Geometry Dash level.",

        "Add another 20 commands to AstraBot.",

        "Make a Cloudflare Worker for absolutely no reason.",

        "Start another YAF project.",

        "Rewrite the website again.",

        "Make another API.",

        "Create a random Discord command.",

        "Try another AI video experiment.",

        "Build something at 2AM.",

        "Say \"I'll do it later\" and immediately start it.",

        "Make AstraShub even more unnecessarily complicated.",

        "Add another section to AstraShub.",

        "Build something that nobody asked for.",

        "Make another Geometry Dash XL level.",

        "Create a project and immediately add it to the roadmap.",

        "Open VS Code and accidentally start another project.",

        "Make AstraBot do something completely unnecessary.",

        "Turn a random idea into an actual website.",

        "Spend three hours improving something nobody noticed.",

        "Do absolutely nothing productive and call it research."

    ];


    var brainButton =
        document.getElementById(
            "brain-randomize"
        );

    var brainResult =
        document.getElementById(
            "brain-result"
        );


    if (
        brainButton &&
        brainResult
    ) {

        brainButton.addEventListener(
            "click",
            function () {

                var randomIndex =
                    Math.floor(
                        Math.random() *
                        brainIdeas.length
                    );


                brainResult.textContent =
                    brainIdeas[
                        randomIndex
                    ];


                brainButton.classList.add(
                    "is-spinning"
                );


                setTimeout(
                    function () {

                        brainButton.classList.remove(
                            "is-spinning"
                        );

                    },
                    500
                );

            }
        );

    }


    /* =========================
       ACHIEVEMENTS
       ========================= */

    var achievementCards =
        document.querySelectorAll(
            ".achievement-card"
        );


    achievementCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    card.classList.toggle(
                        "achievement-active"
                    );

                }
            );

        }
    );


    /* =========================
       ROADMAP STATUS
       ========================= */

    var roadmapCards =
        document.querySelectorAll(
            ".roadmap-card"
        );


    roadmapCards.forEach(
        function (card) {

            var status =
                card.getAttribute(
                    "data-status"
                );


            if (!status) {
                return;
            }


            card.classList.add(
                "roadmap-" + status
            );

        }
    );


    /* =========================
       GEOMETRY DASH HALL OF FAME
       ========================= */

    var hallOfFameCards =
        document.querySelectorAll(
            ".hall-of-fame-card"
        );


    hallOfFameCards.forEach(
        function (card, index) {

            card.style.setProperty(
                "--hof-index",
                index
            );


            card.addEventListener(
                "click",
                function () {

                    hallOfFameCards.forEach(
                        function (otherCard) {

                            if (
                                otherCard !== card
                            ) {

                                otherCard.classList.remove(
                                    "hof-selected"
                                );

                            }

                        }
                    );


                    card.classList.toggle(
                        "hof-selected"
                    );

                }
            );

        }
    );


    /* =========================
       DOWNLOAD CARDS
       ========================= */

    var downloadCards =
        document.querySelectorAll(
            ".download-card"
        );


    downloadCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    card.classList.add(
                        "download-started"
                    );


                    setTimeout(
                        function () {

                            card.classList.remove(
                                "download-started"
                            );

                        },
                        1000
                    );

                }
            );

        }
    );


    /* =========================
       SYSTEM STATUS
       ========================= */

    var systemCards =
        document.querySelectorAll(
            ".system-card"
        );


    systemCards.forEach(
        function (card) {

            var status =
                card.getAttribute(
                    "data-status"
                );


            if (!status) {
                return;
            }


            card.classList.add(
                "system-" + status
            );

        }
    );


    /* =========================
       DISCORD CTA
       ========================= */

    var discordButtons =
        document.querySelectorAll(
            ".discord-cta-button"
        );


    discordButtons.forEach(
        function (button) {

            button.addEventListener(
                "mouseenter",
                function () {

                    button.classList.add(
                        "discord-hover"
                    );

                }
            );


            button.addEventListener(
                "mouseleave",
                function () {

                    button.classList.remove(
                        "discord-hover"
                    );

                }
            );

        }
    );


    /* =========================
       HERO EASTER EGG
       ========================= */

    var siteTitle =
        document.querySelector(
            ".hero h1"
        );


    var clickCount = 0;

    var clickTimer;


    if (siteTitle) {

        siteTitle.style.cursor =
            "pointer";


        siteTitle.addEventListener(
            "click",
            function () {

                clickCount++;


                clearTimeout(
                    clickTimer
                );


                clickTimer =
                    setTimeout(
                        function () {
                            clickCount = 0;
                        },
                        2000
                    );


                if (
                    clickCount === 5
                ) {

                    alert(
                        "🥚 SECRET UNLOCKED!\n\n" +
                        "AstraShub has been tampered with.\n" +
                        "Please contact absolutely nobody."
                    );


                    clickCount = 0;

                }

            }
        );

    }


    /* =========================
       KEYBOARD EASTER EGGS
       ========================= */

    var typedKeys = "";


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key.length !== 1
            ) {
                return;
            }


            typedKeys +=
                event.key.toUpperCase();


            if (
                typedKeys.length > 20
            ) {

                typedKeys =
                    typedKeys.slice(-20);

            }


            if (
                typedKeys.indexOf(
                    "DEATHSHOCK"
                ) !== -1
            ) {

                alert(
                    "💀 DEATHSHOCK\n\n" +
                    "3:38 of suffering.\n" +
                    "364+ attempts.\n" +
                    "3,673 jumps.\n" +
                    "6,719 objects.\n\n" +
                    "Worth it? Probably not."
                );


                typedKeys = "";

            }


            if (
                typedKeys.indexOf(
                    "NETFLIX"
                ) !== -1
            ) {

                alert(
                    "🎬 FAILED NETFLIX DIRECTOR\n\n" +
                    "Your application has been reviewed.\n\n" +
                    "Unfortunately, Netflix has decided\n" +
                    "that you are far too qualified."
                );


                typedKeys = "";

            }


            if (
                typedKeys.indexOf(
                    "SHAME"
                ) !== -1
            ) {

                alert(
                    "🔥 WALL OF SHAME\n\n" +
                    "You found it.\n" +
                    "You already knew it existed.\n" +
                    "Why did you type SHAME?"
                );


                typedKeys = "";

            }

        }
    );


    /* =========================
       FOOTER YEAR
       ========================= */

    var yearElement =
        document.getElementById(
            "current-year"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =========================
       CONSOLE MESSAGE
       ========================= */

    console.log(
        "%c🌌 AstraShub v2.2",
        "font-size: 24px; font-weight: 800; color: #8f7cff;"
    );

    console.log(
        "%cIf you're reading this, you're probably nosy.",
        "font-size: 13px; color: #aaa5bd;"
    );

    console.log(
        "%cTry typing DEATHSHOCK, NETFLIX or SHAME.",
        "font-size: 12px; color: #ff72c6;"
    );

    console.log(
        "%c🧠 Astra's Brain online. Braincells remaining: 3.",
        "font-size: 12px; color: #8f7cff;"
    );

});
