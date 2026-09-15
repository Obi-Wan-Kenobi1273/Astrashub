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
            ".discord-cta, " +
            ".minecraft-designer, " +
            ".minecraft-build-card"
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
            "#astrawave, " +
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
            status ===
            "offline"
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
                data.status ===
                "online"
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

        "Start RobTop Journey Extra.",

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

        "Do absolutely nothing productive and call it research.",

        "Build a Minecraft house instead of finishing the other project.",

        "Make a Minecraft castle for absolutely no reason.",

        "Add another feature to the Minecraft Build Designer.",

        "Spend an hour choosing Minecraft blocks.",

        "Generate a build at 3AM and immediately regenerate it."

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
            function (event) {

                event.preventDefault();

                var currentIdea =
                    brainResult.textContent.trim();

                var randomIndex =
                    Math.floor(
                        Math.random() *
                        brainIdeas.length
                    );


                if (
                    brainIdeas.length > 1 &&
                    brainIdeas[randomIndex] ===
                    currentIdea
                ) {

                    randomIndex =
                        (randomIndex + 1) %
                        brainIdeas.length;

                }


                brainResult.classList.remove(
                    "brain-result-pop"
                );


                void brainResult.offsetWidth;


                brainResult.textContent =
                    brainIdeas[randomIndex];


                brainResult.classList.add(
                    "brain-result-pop"
                );


                brainButton.classList.remove(
                    "is-spinning"
                );


                void brainButton.offsetWidth;


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
       MINECRAFT BUILD DESIGNER
       ========================= */

    var minecraftDesigner =
        document.querySelector(
            ".minecraft-designer"
        );


    if (minecraftDesigner) {

        var buildType =
            document.getElementById(
                "minecraft-build-type"
            );

        var buildStyle =
            document.getElementById(
                "minecraft-build-style"
            );

        var widthInput =
            document.getElementById(
                "minecraft-width"
            );

        var lengthInput =
            document.getElementById(
                "minecraft-length"
            );

        var heightInput =
            document.getElementById(
                "minecraft-height"
            );

        var generateButton =
            document.getElementById(
                "minecraft-generate"
            );

        var regenerateButton =
            document.getElementById(
                "minecraft-regenerate"
            );

        var favouriteButton =
            document.getElementById(
                "minecraft-favourite"
            );

        var copyMaterialsButton =
            document.getElementById(
                "minecraft-copy-materials"
            );

        var materialList =
            document.getElementById(
                "minecraft-material-list"
            );

        var buildTime =
            document.getElementById(
                "minecraft-build-time"
            );

        var dimensionOutput =
            document.getElementById(
                "minecraft-dimensions"
            );

        var blockCountOutput =
            document.getElementById(
                "minecraft-block-count"
            );

        var instructionsOutput =
            document.getElementById(
                "minecraft-instructions"
            );

        var layerOutput =
            document.getElementById(
                "minecraft-layers"
            );

        var visualOutput =
            document.getElementById(
                "minecraft-visual"
            );

        var buildStatus =
            document.getElementById(
                "minecraft-build-status"
            );

        var favouriteList =
            document.getElementById(
                "minecraft-favourites"
            );


        var minecraftMaterials = {

            oak: {
                name: "Oak Planks",
                multiplier: 1
            },

            spruce: {
                name: "Spruce Planks",
                multiplier: 1
            },

            birch: {
                name: "Birch Planks",
                multiplier: 1
            },

            stone: {
                name: "Stone",
                multiplier: 1
            },

            cobblestone: {
                name: "Cobblestone",
                multiplier: 1
            },

            deepslate: {
                name: "Deepslate",
                multiplier: 1
            },

            bricks: {
                name: "Bricks",
                multiplier: 1
            },

            quartz: {
                name: "Quartz Block",
                multiplier: 1
            },

            glass: {
                name: "Glass",
                multiplier: 1
            },

            concrete: {
                name: "White Concrete",
                multiplier: 1
            },

            sandstone: {
                name: "Sandstone",
                multiplier: 1
            },

            dark_oak: {
                name: "Dark Oak Planks",
                multiplier: 1
            },

            iron: {
                name: "Iron Block",
                multiplier: 0.18
            },

            copper: {
                name: "Copper Block",
                multiplier: 0.22
            },

            lantern: {
                name: "Lantern",
                multiplier: 0.025
            },

            glass_pane: {
                name: "Glass Pane",
                multiplier: 0.08
            },

            stairs: {
                name: "Stairs",
                multiplier: 0.12
            },

            slabs: {
                name: "Slabs",
                multiplier: 0.10
            },

            doors: {
                name: "Doors",
                multiplier: 0.012
            }

        };


        var buildProfiles = {

            House: {
                foundation: 0.28,
                walls: 0.34,
                roof: 0.22,
                detail: 0.16,
                time: 1.0
            },

            Castle: {
                foundation: 0.32,
                walls: 0.40,
                roof: 0.10,
                detail: 0.18,
                time: 2.5
            },

            Tower: {
                foundation: 0.25,
                walls: 0.50,
                roof: 0.10,
                detail: 0.15,
                time: 1.8
            },

            Bridge: {
                foundation: 0.35,
                walls: 0.15,
                roof: 0.05,
                detail: 0.45,
                time: 1.5
            },

            Factory: {
                foundation: 0.30,
                walls: 0.40,
                roof: 0.15,
                detail: 0.15,
                time: 2.0
            },

            Farm: {
                foundation: 0.20,
                walls: 0.25,
                roof: 0.15,
                detail: 0.40,
                time: 1.2
            },

            Storage: {
                foundation: 0.28,
                walls: 0.38,
                roof: 0.18,
                detail: 0.16,
                time: 1.1
            },

            Custom: {
                foundation: 0.28,
                walls: 0.35,
                roof: 0.20,
                detail: 0.17,
                time: 1.4
            }

        };


        var styleModifiers = {

            Medieval: {
                wall: 1.05,
                roof: 1.15,
                detail: 1.25,
                complexity: 1.15
            },

            Modern: {
                wall: 0.95,
                roof: 0.85,
                detail: 1.30,
                complexity: 1.05
            },

            Rustic: {
                wall: 1.10,
                roof: 1.05,
                detail: 1.15,
                complexity: 1.00
            },

            Fantasy: {
                wall: 1.10,
                roof: 1.20,
                detail: 1.40,
                complexity: 1.35
            },

            Industrial: {
                wall: 1.15,
                roof: 0.95,
                detail: 1.20,
                complexity: 1.20
            },

            Futuristic: {
                wall: 1.00,
                roof: 0.90,
                detail: 1.35,
                complexity: 1.30
            },

            Japanese: {
                wall: 1.00,
                roof: 1.20,
                detail: 1.25,
                complexity: 1.20
            }

        };


        function getSelectedMaterials() {

            var selected = [];

            var materialInputs =
                minecraftDesigner.querySelectorAll(
                    'input[type="checkbox"][data-material]'
                );


            materialInputs.forEach(
                function (input) {

                    if (input.checked) {

                        var key =
                            input.getAttribute(
                                "data-material"
                            );


                        if (
                            minecraftMaterials[key]
                        ) {

                            selected.push(
                                key
                            );

                        }

                    }

                }
            );


            if (
                selected.length === 0
            ) {

                selected.push("oak");
                selected.push("stone");
                selected.push("glass");

            }


            return selected;

        }


        function getNumber(
            input,
            fallback
        ) {

            if (!input) {
                return fallback;
            }


            var value =
                parseInt(
                    input.value,
                    10
                );


            if (
                isNaN(value) ||
                value < 1
            ) {

                return fallback;

            }


            return Math.min(
                value,
                256
            );

        }


        function getBuildOptions() {

            return {

                type:
                    buildType &&
                    buildType.value
                        ? buildType.value
                        : "House",

                style:
                    buildStyle &&
                    buildStyle.value
                        ? buildStyle.value
                        : "Medieval",

                width:
                    getNumber(
                        widthInput,
                        12
                    ),

                length:
                    getNumber(
                        lengthInput,
                        12
                    ),

                height:
                    getNumber(
                        heightInput,
                        8
                    ),

                materials:
                    getSelectedMaterials()

            };

        }


        function calculateBuild(
            options
        ) {

            var profile =
                buildProfiles[
                    options.type
                ] ||
                buildProfiles.Custom;


            var style =
                styleModifiers[
                    options.style
                ] ||
                styleModifiers.Medieval;


            var footprint =
                options.width *
                options.length;


            var perimeter =
                (options.width * 2) +
                (options.length * 2);


            var wallBlocks =
                Math.round(
                    perimeter *
                    options.height *
                    0.75 *
                    profile.walls *
                    style.wall *
                    4
                );


            var floorBlocks =
                Math.round(
                    footprint *
                    profile.foundation
                );


            var roofBlocks =
                Math.round(
                    footprint *
                    profile.roof *
                    1.25 *
                    style.roof *
                    3
                );


            var detailBlocks =
                Math.round(
                    footprint *
                    profile.detail *
                    style.detail *
                    2
                );


            var totalStructuralBlocks =
                Math.max(
                    1,
                    floorBlocks +
                    wallBlocks +
                    roofBlocks +
                    detailBlocks
                );


            var materialCount =
                options.materials.length;


            var materialQuantities = {};


            options.materials.forEach(
                function (material, index) {

                    var definition =
                        minecraftMaterials[
                            material
                        ];


                    if (!definition) {
                        return;
                    }


                    var baseShare =
                        1 /
                        materialCount;


                    var variation =
                        0.82 +
                        (
                            Math.sin(
                                index * 7.31 +
                                options.width +
                                options.height
                            ) *
                            0.12
                        );


                    var quantity =
                        Math.round(
                            totalStructuralBlocks *
                            baseShare *
                            variation *
                            definition.multiplier *
                            5
                        );


                    materialQuantities[
                        material
                    ] =
                        Math.max(
                            1,
                            quantity
                        );

                }
            );


            var calculatedMaterialTotal =
                Object.keys(
                    materialQuantities
                ).reduce(
                    function (
                        total,
                        key
                    ) {

                        return (
                            total +
                            materialQuantities[key]
                        );

                    },
                    0
                );


            var missing =
                totalStructuralBlocks -
                calculatedMaterialTotal;


            if (
                missing > 0 &&
                options.materials.length > 0
            ) {

                var primary =
                    options.materials[0];


                materialQuantities[
                    primary
                ] +=
                    missing;

            }


            var complexity =
                style.complexity;


            var sizeFactor =
                (
                    options.width *
                    options.length *
                    options.height
                ) / 1200;


            var hours =
                (
                    0.8 +
                    sizeFactor *
                    profile.time *
                    complexity
                );


            if (
                options.type ===
                "Castle"
            ) {
                hours *= 1.45;
            }


            if (
                options.type ===
                "Bridge"
            ) {
                hours *= 1.15;
            }


            if (
                options.type ===
                "Tower"
            ) {
                hours *= 1.25;
            }


            if (hours < 0.5) {
                hours = 0.5;
            }


            return {

                totalBlocks:
                    totalStructuralBlocks,

                materials:
                    materialQuantities,

                hours:
                    hours,

                footprint:
                    footprint,

                perimeter:
                    perimeter

            };

        }


        function formatTime(
            hours
        ) {

            if (
                hours < 1
            ) {

                return Math.round(
                    hours * 60
                ) + " minutes";

            }


            var wholeHours =
                Math.floor(
                    hours
                );

            var minutes =
                Math.round(
                    (
                        hours -
                        wholeHours
                    ) * 60
                );


            if (
                minutes >= 60
            ) {

                wholeHours++;
                minutes = 0;

            }


            return (
                wholeHours +
                "h " +
                minutes +
                "m"
            );

        }


        function renderMaterials(
            materials
        ) {

            if (!materialList) {
                return;
            }


            materialList.innerHTML = "";


            Object.keys(
                materials
            ).forEach(
                function (key) {

                    var item =
                        document.createElement(
                            "li"
                        );


                    item.className =
                        "minecraft-material-item";


                    var definition =
                        minecraftMaterials[
                            key
                        ];


                    var name =
                        definition
                            ? definition.name
                            : key;


                    var quantity =
                        materials[key];


                    var nameElement =
                        document.createElement(
                            "span"
                        );


                    nameElement.className =
                        "minecraft-material-name";


                    nameElement.textContent =
                        name;


                    var quantityElement =
                        document.createElement(
                            "strong"
                        );


                    quantityElement.className =
                        "minecraft-material-quantity";


                    quantityElement.textContent =
                        "× " +
                        quantity;


                    item.appendChild(
                        nameElement
                    );


                    item.appendChild(
                        quantityElement
                    );


                    materialList.appendChild(
                        item
                    );

                }
            );

        }


        function createInstructions(
            options,
            result
        ) {

            var instructions = [];


            instructions.push(
                "Prepare a flat building area measuring " +
                options.width +
                " × " +
                options.length +
                " blocks."
            );


            instructions.push(
                "Mark the four corners of the build before placing the main structure."
            );


            instructions.push(
                "Build the foundation across the full footprint using your primary material."
            );


            instructions.push(
                "Raise the exterior walls to approximately " +
                options.height +
                " blocks high."
            );


            if (
                options.type ===
                "Castle"
            ) {

                instructions.push(
                    "Add reinforced corner towers and connect them with the main castle walls."
                );

            } else if (
                options.type ===
                "Tower"
            ) {

                instructions.push(
                    "Build upward in sections, adding windows and support details between floors."
                );

            } else if (
                options.type ===
                "Bridge"
            ) {

                instructions.push(
                    "Construct the supports first, then extend the bridge deck between them."
                );

            } else if (
                options.type ===
                "Farm"
            ) {

                instructions.push(
                    "Divide the interior into crop, storage and access areas."
                );

            } else if (
                options.type ===
                "Factory"
            ) {

                instructions.push(
                    "Add large industrial rooms, support beams and exterior machinery details."
                );

            } else {

                instructions.push(
                    "Add doors, windows and the main interior layout."
                );

            }


            instructions.push(
                "Construct the roof using the selected " +
                options.style.toLowerCase() +
                " style."
            );


            instructions.push(
                "Add windows, doors, stairs, lighting and decorative details."
            );


            instructions.push(
                "Check every layer against the layer guide before moving to the next section."
            );


            instructions.push(
                "Finish the exterior landscaping and surrounding details."
            );


            instructions.push(
                "Walk around the completed build and replace any blocks that look out of place."
            );


            return instructions;

        }


        function renderInstructions(
            instructions
        ) {

            if (!instructionsOutput) {
                return;
            }


            instructionsOutput.innerHTML =
                "";


            instructions.forEach(
                function (instruction) {

                    var item =
                        document.createElement(
                            "li"
                        );


                    item.className =
                        "minecraft-instruction";


                    item.textContent =
                        instruction;


                    instructionsOutput.appendChild(
                        item
                    );

                }
            );

        }


        function renderLayers(
            options
        ) {

            if (!layerOutput) {
                return;
            }


            layerOutput.innerHTML =
                "";


            var totalLayers =
                options.height;


            var maxDisplayed =
                Math.min(
                    totalLayers,
                    32
                );


            for (
                var layer = 1;
                layer <= maxDisplayed;
                layer++
            ) {

                var item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "minecraft-layer";


                var percentage =
                    Math.round(
                        (
                            layer /
                            totalLayers
                        ) * 100
                    );


                var description;


                if (
                    layer === 1
                ) {

                    description =
                        "Foundation and floor layout";

                } else if (
                    layer <=
                    Math.max(
                        2,
                        Math.floor(
                            totalLayers *
                            0.65
                        )
                    )
                ) {

                    description =
                        "Main walls, windows and structural details";

                } else if (
                    layer <
                    totalLayers
                ) {

                    description =
                        "Upper walls and decorative features";

                } else {

                    description =
                        "Roof and final details";

                }


                var title =
                    document.createElement(
                        "strong"
                    );


                title.textContent =
                    "Layer " +
                    layer;


                var progress =
                    document.createElement(
                        "span"
                    );


                progress.textContent =
                        percentage +
                        "% complete";


                var descriptionElement =
                    document.createElement(
                        "p"
                    );


                descriptionElement.textContent =
                    description;


                item.appendChild(
                    title
                );


                item.appendChild(
                    progress
                );


                item.appendChild(
                    descriptionElement
                );


                layerOutput.appendChild(
                    item
                );

            }


            if (
                totalLayers >
                maxDisplayed
            ) {

                var more =
                    document.createElement(
                        "p"
                    );


                more.className =
                    "minecraft-more-layers";


                more.textContent =
                    "…and " +
                    (
                        totalLayers -
                        maxDisplayed
                    ) +
                    " additional layers.";


                layerOutput.appendChild(
                    more
                );

            }

        }


        function renderVisual(
            options,
            result
        ) {

            if (!visualOutput) {
                return;
            }


            visualOutput.innerHTML =
                "";


            var preview =
                document.createElement(
                    "div"
                );


            preview.className =
                "minecraft-preview";


            var gridWidth =
                Math.min(
                    options.width,
                    18
                );


            var gridLength =
                Math.min(
                    options.length,
                    18
                );


            preview.style.gridTemplateColumns =
                "repeat(" +
                gridWidth +
                ", 1fr)";


            for (
                var z = 0;
                z < gridLength;
                z++
            ) {

                for (
                    var x = 0;
                    x < gridWidth;
                    x++
                ) {

                    var block =
                        document.createElement(
                            "span"
                        );


                    block.className =
                        "minecraft-preview-block";


                    var edge =
                        x === 0 ||
                        z === 0 ||
                        x === gridWidth - 1 ||
                        z === gridLength - 1;


                    if (edge) {

                        block.classList.add(
                            "minecraft-preview-edge"
                        );

                    }


                    preview.appendChild(
                        block
                    );

                }

            }


            visualOutput.appendChild(
                preview
            );


            var caption =
                document.createElement(
                    "p"
                );


            caption.className =
                "minecraft-preview-caption";


            caption.textContent =
                options.width +
                " × " +
                options.length +
                " footprint • " +
                options.height +
                " blocks high";


            visualOutput.appendChild(
                caption
            );

        }


        function updateStatus(
            message,
            type
        ) {

            if (!buildStatus) {
                return;
            }


            buildStatus.textContent =
                message;


            buildStatus.classList.remove(
                "success",
                "working",
                "error"
            );


            if (type) {

                buildStatus.classList.add(
                    type
                );

            }

        }


        function saveFavourite(
            options,
            result
        ) {

            var favourites =
                JSON.parse(
                    localStorage.getItem(
                        "astrashub-minecraft-favourites"
                    ) ||
                    "[]"
                );


            var build = {

                id:
                    Date.now(),

                type:
                    options.type,

                style:
                    options.style,

                width:
                    options.width,

                length:
                    options.length,

                height:
                    options.height,

                materials:
                    options.materials,

                totalBlocks:
                    result.totalBlocks,

                savedAt:
                    new Date().toLocaleString()

            };


            favourites.unshift(
                build
            );


            if (
                favourites.length >
                20
            ) {

                favourites =
                    favourites.slice(
                        0,
                        20
                    );

            }


            localStorage.setItem(
                "astrashub-minecraft-favourites",
                JSON.stringify(
                    favourites
                )
            );


            renderFavourites();


            updateStatus(
                "⭐ Build saved to favourites.",
                "success"
            );

        }


        function renderFavourites() {

            if (!favouriteList) {
                return;
            }


            var favourites =
                JSON.parse(
                    localStorage.getItem(
                        "astrashub-minecraft-favourites"
                    ) ||
                    "[]"
                );


            favouriteList.innerHTML =
                "";


            if (
                favourites.length === 0
            ) {

                var empty =
                    document.createElement(
                        "p"
                    );


                empty.className =
                    "minecraft-favourites-empty";


                empty.textContent =
                    "No saved builds yet.";


                favouriteList.appendChild(
                    empty
                );


                return;

            }


            favourites.forEach(
                function (build) {

                    var item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "minecraft-favourite";


                    var title =
                        document.createElement(
                            "strong"
                        );


                    title.textContent =
                        build.type +
                        " • " +
                        build.style;


                    var dimensions =
                        document.createElement(
                            "span"
                        );


                    dimensions.textContent =
                        build.width +
                        " × " +
                        build.length +
                        " × " +
                        build.height;


                    var blocks =
                        document.createElement(
                            "small"
                        );


                    blocks.textContent =
                        build.totalBlocks.toLocaleString() +
                        " blocks";


                    item.appendChild(
                        title
                    );


                    item.appendChild(
                        dimensions
                    );


                    item.appendChild(
                        blocks
                    );


                    item.addEventListener(
                        "click",
                        function () {

                            if (buildType) {
                                buildType.value =
                                    build.type;
                            }


                            if (buildStyle) {
                                buildStyle.value =
                                    build.style;
                            }


                            if (widthInput) {
                                widthInput.value =
                                    build.width;
                            }


                            if (lengthInput) {
                                lengthInput.value =
                                    build.length;
                            }


                            if (heightInput) {
                                heightInput.value =
                                    build.height;
                            }


                            var materialInputs =
                                minecraftDesigner.querySelectorAll(
                                    'input[type="checkbox"][data-material]'
                                );


                            materialInputs.forEach(
                                function (input) {

                                    input.checked =
                                        build.materials.indexOf(
                                            input.getAttribute(
                                                "data-material"
                                            )
                                        ) !== -1;

                                }
                            );


                            generateBuild();

                        }
                    );


                    favouriteList.appendChild(
                        item
                    );

                }
            );

        }


        function copyMaterials() {

            if (!materialList) {
                return;
            }


            var lines = [];


            materialList
                .querySelectorAll("li")
                .forEach(
                    function (item) {

                        lines.push(
                            item.textContent
                        );

                    }
                );


            if (
                lines.length === 0
            ) {

                return;

            }


            var text =
                "Minecraft Build Materials\n" +
                "=========================\n" +
                lines.join("\n");


            if (
                navigator.clipboard &&
                navigator.clipboard.writeText
            ) {

                navigator.clipboard
                    .writeText(
                        text
                    )
                    .then(
                        function () {

                            updateStatus(
                                "📋 Material list copied to clipboard.",
                                "success"
                            );

                        }
                    )
                    .catch(
                        function () {

                            fallbackCopy(
                                text
                            );

                        }
                    );

            } else {

                fallbackCopy(
                    text
                );

            }

        }


        function fallbackCopy(
            text
        ) {

            var textarea =
                document.createElement(
                    "textarea"
                );


            textarea.value =
                text;


            textarea.style.position =
                "fixed";


            textarea.style.opacity =
                "0";


            document.body.appendChild(
                textarea
            );


            textarea.select();


            try {

                document.execCommand(
                    "copy"
                );


                updateStatus(
                    "📋 Material list copied to clipboard.",
                    "success"
                );

            } catch (error) {

                updateStatus(
                    "Unable to copy the material list.",
                    "error"
                );

            }


            textarea.remove();

        }


        function generateBuild() {

            var options =
                getBuildOptions();


            updateStatus(
                "🤖 Generating your Minecraft build...",
                "working"
            );


            if (generateButton) {

                generateButton.disabled =
                    true;

            }


            setTimeout(
                function () {

                    var result =
                        calculateBuild(
                            options
                        );


                    renderMaterials(
                        result.materials
                    );


                    renderInstructions(
                        createInstructions(
                            options,
                            result
                        )
                    );


                    renderLayers(
                        options
                    );


                    renderVisual(
                        options,
                        result
                    );


                    if (
                        dimensionOutput
                    ) {

                        dimensionOutput.textContent =
                            options.width +
                            " × " +
                            options.length +
                            " × " +
                            options.height;

                    }


                    if (
                        blockCountOutput
                    ) {

                        blockCountOutput.textContent =
                            result.totalBlocks.toLocaleString();

                    }


                    if (
                        buildTime
                    ) {

                        buildTime.textContent =
                            formatTime(
                                result.hours
                            );

                    }


                    var constructionTime =
                        minecraftDesigner.querySelector(
                            ".minecraft-build-time-display"
                        );


                    if (
                        constructionTime
                    ) {

                        constructionTime.textContent =
                            formatTime(
                                result.hours
                            );

                    }


                    minecraftDesigner.dataset.generated =
                        "true";


                    minecraftDesigner.dataset.build =
                        JSON.stringify(
                            {
                                options:
                                    options,

                                result:
                                    result
                            }
                        );


                    updateStatus(
                        "✅ Build generated successfully.",
                        "success"
                    );


                    if (generateButton) {

                        generateButton.disabled =
                            false;

                    }

                },
                350
            );

        }


        if (
            generateButton
        ) {

            generateButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    generateBuild();

                }
            );

        }


        if (
            regenerateButton
        ) {

            regenerateButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    var materialInputs =
                        minecraftDesigner.querySelectorAll(
                            'input[type="checkbox"][data-material]'
                        );


                    if (
                        materialInputs.length > 1
                    ) {

                        var randomInput =
                            materialInputs[
                                Math.floor(
                                    Math.random() *
                                    materialInputs.length
                                )
                            ];


                        randomInput.checked =
                            !randomInput.checked;

                    }


                    generateBuild();

                }
            );

        }


        if (
            favouriteButton
        ) {

            favouriteButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    var rawBuild =
                        minecraftDesigner.dataset.build;


                    if (!rawBuild) {

                        generateBuild();


                        setTimeout(
                            function () {

                                var generated =
                                    minecraftDesigner.dataset.build;


                                if (generated) {

                                    var parsed =
                                        JSON.parse(
                                            generated
                                        );


                                    saveFavourite(
                                        parsed.options,
                                        parsed.result
                                    );

                                }

                            },
                            450
                        );


                        return;

                    }


                    var parsed =
                        JSON.parse(
                            rawBuild
                        );


                    saveFavourite(
                        parsed.options,
                        parsed.result
                    );

                }
            );

        }


        if (
            copyMaterialsButton
        ) {

            copyMaterialsButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    copyMaterials();

                }
            );

        }


        minecraftDesigner
            .querySelectorAll(
                'input[type="number"]'
            )
            .forEach(
                function (input) {

                    input.addEventListener(
                        "change",
                        function () {

                            if (
                                parseInt(
                                    input.value,
                                    10
                                ) < 1
                            ) {

                                input.value =
                                    1;

                            }


                            if (
                                parseInt(
                                    input.value,
                                    10
                                ) > 256
                            ) {

                                input.value =
                                    256;

                            }

                        }
                    );

                }
            );


        renderFavourites();

    }


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
       DASH VISUAL EFFECT
       ========================= */

    var dashEffectActive = false;


    function triggerDashEffect() {

        if (dashEffectActive) {
            return;
        }


        dashEffectActive = true;


        var overlay =
            document.createElement(
                "div"
            );


        overlay.className =
            "dash-easter-egg";


        var flash =
            document.createElement(
                "div"
            );


        flash.className =
            "dash-flash";


        overlay.appendChild(
            flash
        );


        var speedLines =
            document.createElement(
                "div"
            );


        speedLines.className =
            "dash-speed-lines";


        for (
            var lineIndex = 0;
            lineIndex < 18;
            lineIndex++
        ) {

            var line =
                document.createElement(
                    "span"
                );


            line.className =
                "dash-speed-line";


            line.style.setProperty(
                "--dash-line-x",
                (
                    Math.random() * 100
                ) + "%"
            );


            line.style.setProperty(
                "--dash-line-delay",
                (
                    Math.random() * 0.35
                ) + "s"
            );


            line.style.setProperty(
                "--dash-line-duration",
                (
                    Math.random() * 0.45 +
                    0.35
                ) + "s"
            );


            line.style.setProperty(
                "--dash-line-width",
                (
                    Math.random() * 180 +
                    70
                ) + "px"
            );


            speedLines.appendChild(
                line
            );

        }


        overlay.appendChild(
            speedLines
        );


        var grid =
            document.createElement(
                "div"
            );


        grid.className =
            "dash-grid"
        ;


        overlay.appendChild(
            grid
        );


        var title =
            document.createElement(
                "div"
            );


        title.className =
            "dash-title";


        title.innerHTML =
            "<span>DASH</span><small>ASTRASHUB EASTER EGG</small>";


        overlay.appendChild(
            title
        );


        var cube =
            document.createElement(
                "div"
            );


        cube.className =
            "dash-cube";


        cube.innerHTML =
            "<span></span><span></span><span></span><span></span>";


        overlay.appendChild(
            cube
        );


        var particles =
            document.createElement(
                "div"
            );


        particles.className =
            "dash-particles";


        for (
            var particleIndex = 0;
            particleIndex < 45;
            particleIndex++
        ) {

            var particle =
                document.createElement(
                    "span"
                );


            particle.className =
                "dash-particle";


            particle.style.setProperty(
                "--dash-particle-x",
                (
                    Math.random() * 100
                ) + "%"
            );


            particle.style.setProperty(
                "--dash-particle-y",
                (
                    Math.random() * 100
                ) + "%"
            );


            particle.style.setProperty(
                "--dash-particle-delay",
                (
                    Math.random() * 0.8
                ) + "s"
            );


            particle.style.setProperty(
                "--dash-particle-size",
                (
                    Math.random() * 7 +
                    3
                ) + "px"
            );


            particles.appendChild(
                particle
            );

        }


        overlay.appendChild(
            particles
        );


        document.body.appendChild(
            overlay
        );


        document.body.classList.add(
            "dash-screen-shake"
        );


        window.setTimeout(
            function () {

                document.body.classList.remove(
                    "dash-screen-shake"
                );

            },
            850
        );


        window.setTimeout(
            function () {

                overlay.classList.add(
                    "dash-ending"
                );

            },
            1800
        );


        window.setTimeout(
            function () {

                overlay.remove();

                dashEffectActive = false;

            },
            2400
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


            /* =========================
               DEATHSHOCK SECRET
               ========================= */

            if (
                typedKeys.indexOf(
                    "DEATHSHOCK"
                ) !== -1
            ) {

                alert(
                    "💀 DEATHSHOCK\n\n" +
                    "INSANE difficulty.\n" +
                    "3:38 of suffering.\n" +
                    "364+ attempts.\n" +
                    "3,673 jumps.\n" +
                    "6,719 objects.\n\n" +
                    "Verified and uploaded.\n" +
                    "Worth it? Probably not."
                );


                typedKeys = "";

                return;

            }


            /* =========================
               364 SECRET
               ========================= */

            if (
                typedKeys.indexOf(
                    "364"
                ) !== -1
            ) {

                alert(
                    "💀 364\n\n" +
                    "You found the number.\n\n" +
                    "364 attempts.\n" +
                    "One Deathshock.\n" +
                    "Absolutely zero sanity.\n\n" +
                    "And somehow...\n" +
                    "it was worth it. 💀"
                );


                typedKeys = "";

                return;

            }


            /* =========================
               NETFLIX SECRET
               ========================= */

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

                return;

            }


            /* =========================
               WALL OF SHAME SECRET
               ========================= */

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

                return;

            }


            /* =========================
               DASH SECRET
               ========================= */

            if (
                typedKeys.indexOf(
                    "DASH"
                ) !== -1
            ) {

                typedKeys = "";

                triggerDashEffect();

                return;

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
        "%c🌌 AstraShub v2.4",
        "font-size: 24px; font-weight: 800; color: #8f7cff;"
    );

    console.log(
        "%cIf you're reading this, you're probably nosy.",
        "font-size: 13px; color: #aaa5bd;"
    );

    console.log(
        "%cTry typing DEATHSHOCK, 364, NETFLIX, SHAME or DASH.",
        "font-size: 12px; color: #ff72c6;"
    );

    console.log(
        "%c🧠 Astra's Brain online. Braincells remaining: 3.",
        "font-size: 12px; color: #8f7cff;"
    );

    console.log(
        "%c🧱 Minecraft Build Designer loaded.",
        "font-size: 12px; color: #63d7ff;"
    );

});
