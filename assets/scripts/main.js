/*
TODO
More projects
Images? In a separate submenu?
Links

*/

const game = (_ => {
    const externalHandler = (menuSprite, animationVars) => {
        if (game.vars.loadingExternalPage) {
            if (game.vars.externalPageLoaded) {
                let menuSprite = game.get.sprite("Menu");
                if (new Date() - game.vars.backforwardRecoverTick > 1000 && (! menuSprite.animationActive)) {
                    // Back/forward cache has put the page in a weird state
                    if (! game.vars.backforwardRecovering) {
                        game.vars.backforwardRecovering = true;
                        window.onbeforeunload = null;

                        game.game.sprites.find(sprite => sprite && sprite.type == "sprite").delete();
                        setTimeout(_ => {
                            let vars = game.vars;
                            vars.externalPageLoaded = false;
                            vars.loadingExternalPage = false;
                            vars.externalPageDelay = 30;
                            vars.backforwardRecovering = false;
                        }, 1000);

                        let submenu = menuSprite.submenu.split(".");
                        submenu.splice(submenu.length - 1, 1);
                        submenu = submenu.join(".");
                        menuSprite.animateSubmenuChange(submenu, {
                            type: "triangleScroll",
                            direction: "left"
                        });
                    }
                }
            }
        }
        else {
            if (game.vars.externalPageDelay == 0) {
                // It'll take a second or two to load anyway so start loading while the animation is active
                let projectID = menuSprite.submenu.split(".");
                let type = projectID[projectID.length - 1];
                projectID.splice(0, 1);
                projectID.splice(projectID.length - 1, 1);
                projectID = projectID.join(".");
                if (type == "GitHub") {
                    location.href = menuSprite.vars.githubURLs[projectID];
                }
                else {
                    location.href = menuSprite.vars.pagesURLs[projectID];
                }
                game.vars.loadingExternalPage = true;
            }
            else {
                game.vars.externalPageDelay--;
            }

            window.onbeforeunload = _ => {
                game.vars.backforwardRecoverTick = new Date();
                game.vars.externalPageLoaded = true;
            };
        }
    };
    const transitionSubmenu = (name, type) => {
        let submenuID = "Project." + name + "." + type;
        let ob = {};
        ob[submenuID] = {
            elements: [
                {
                    type: "image",
                    color: "black",
                    width: 800,
                    height: 450
                }
            ],
            animationMain: externalHandler,
            main: externalHandler
        };
        return ob;
    };
    const projectBar = (submenu, pages) => {
        let elements = [{
            type: "image",
            color: "#202020",
            width: 800,
            height: 95,
            fixedToCamera: true,
            bottom: 450
        },
        {
            type: "button",
            icon: "GitHub",
            color: "black",
            onHover: "View on GitHub",
            onClick: {
                submenu: "Project." + submenu + ".GitHub",
                animation: {
                    type: "triangleScroll"
                }
            },
            size: 50,
            x: 400,
            y: 400,
            fixedToCamera: true
        }];
        if (pages) {
            elements[1].x = 360;
            elements.push({
                type: "button",
                icon: "Play",
                color: "lime",
                onHover: pages == 2? "Run it" : "Play it",
                onClick: {
                    submenu: "Project." + submenu + ".Pages",
                    animation: {
                        type: "triangleScroll"
                    }
                },
                size: 50,
                x: 440,
                y: 400,
                fixedToCamera: true
            });
        }
        return elements;
    };
    const title = text => ({
        type: "text",
        color: "white",
        text: text,
        size: 40,
        y: 38
    });
    const basicInfo = (releaseDate, status, latestVersion) => ({
        type: "text",
        color: "#EFEFEF",
        left: 25,
        top: 80,
        text:
`Release Date: ${releaseDate}
Status: ${status}
Latest Version: ${latestVersion}`,
        size: 15,
        wordWrapWidth: 250
    });
    const sideText = (text, xOffset = 0, yOffset = 0) => ({
        type: "text",
        color: "#EFEFEF",
        left: 301 + xOffset,
        top: 75 + yOffset,
        text: text,
        size: 20,
        wordWrapWidth: 474 - xOffset
    });
    const paragraph = (text, y, xOffset = 0) => ({
        type: "text",
        color: "#EFEFEF",
        left: 25 + xOffset,
        top: y,
        text: text,
        size: 20,
        wordWrapWidth: 750 - xOffset
    });

    const background = _ => ({
        type: "image",
        color: "#202020",
        width: 800,
        height: 450,
        fixedToCamera: true
    });
    const hoverText = lower => ({
        hoverText: {
            color: "white",
            ...(lower? {bottom: 450} : {})
        }
    });
    const backButton = (x, y, color) => {
        return {
            type: "button",
            icon: "Back",
            color: "white",
            onClick: {
                submenu: "main",
                animation: {
                    type: "circle",
                    color: color,
                    direction: "close",
                    x: x,
                    y: y
                }
            },
            size: 50,
            x: 50,
            y: 50,
            fixedToCamera: true
        };
    };
    const projectButton = (name, color, x, y, hover, iconSize = 0.85) => {
        return {
            type: "button",
            color: color,
            icon: "ProjectIcon." + name,
            iconSize: iconSize,
            x: x,
            y: y,
            size: 100,
            onHover: hover,
            onClick: {
                submenu: "Project." + name,
                animation: {
                    type: "circle"
                }
            }
        };
    };

    return Bagel.init({
        id: "menu",
        state: "menu",
        vars: {
            loadingExternalPage: false,
            externalPageDelay: 30,
            backforwardRecoverTick: null,
            backforwardRecovering: false
        },
        game: {
            plugins: [
                {
                    src: "assets/plugins/gui.js"
                }
            ],
            assets: {
                imgs: [
                    {
                        id: "Logo",
                        src: "assets/imgs/logo.png",
                        webP: "assets/imgs/logo.webp"
                    },
                    {
                        id: "GitHub",
                        src: "assets/imgs/github.png",
                        webP: "assets/imgs/github.webp"
                    },
                    {
                        id: "Back",
                        src: "assets/imgs/backArrow.png",
                        webP: "assets/imgs/backArrow.webp"
                    },
                    {
                        id: "Play",
                        src: "assets/imgs/play.png",
                        webP: "assets/imgs/play.webp"
                    },

                    {
                        id: "ProjectIcon.BagelJS",
                        src: "assets/imgs/projectIcons/bagelJS.png",
                        webP: "assets/imgs/projectIcons/bagelJS.webp",
                        upscale: {
                            width: 150,
                            height: 150,
                            antialias: false
                        }
                    },
                    {
                        id: "ProjectIcon.Frontier",
                        src: "assets/imgs/projectIcons/frontier.png",
                        webP: "assets/imgs/projectIcons/frontier.webp",
                        upscale: {
                            width: 150,
                            height: 131,
                            antialias: false
                        }
                    },
                    {
                        id: "ProjectIcon.Rummikub",
                        src: "assets/imgs/projectIcons/rummikub.png",
                        src: "assets/imgs/projectIcons/rummikub.webp"
                    },
                    {
                        id: "ProjectIcon.Itch",
                        src: "assets/imgs/projectIcons/itch.png",
                        src: "assets/imgs/projectIcons/itch.webp"
                    },
                    {
                        id: "ProjectIcon.BagelUI",
                        src: "assets/imgs/projectIcons/bagelUI.png",
                        src: "assets/imgs/projectIcons/bagelUI.webp",
                        upscale: {
                            width: 150,
                            height: 150,
                            antialias: false
                        }
                    }
                ]
            },
            sprites: [
                {
                    id: "Menu",
                    type: "GUI",
                    vars: {
                        githubURLs: {
                            BagelJS: "https://github.com/hedgehog125/Bagel.js",
                            Frontier: "https://github.com/hedgehog125/Frontier-Fan-Made-Game",
                            Rummikub: "https://github.com/hedgehog125/Rummikub-clone",
                            Itch: "https://github.com/hedgehog125/Itch",
                            BagelUI: "https://github.com/hedgehog125/Bagel.js-UI"
                        },
                        pagesURLs: {
                            Frontier: "https://hedgehog125.github.io/Frontier-Fan-Made-Game/",
                            Rummikub: "https://hedgehog125.github.io/Rummikub-clone",
                            Itch: "https://hedgehog125.github.io/Itch",
                            BagelUI: "https://hedgehog125.github.io/Bagel.js-UI/"
                        }
                    },
                    submenu: "main",
                    submenus: {
                        main: {
                            elements: [
                                {
                                    type: "image",
                                    img: "Logo",
                                    x: 150,
                                    width: 200,
                                    height: 200
                                },
                                {
                                    type: "text",
                                    color: "white",
                                    text: "About Me",
                                    size: 40,
                                    x: 525,
                                    y: 38
                                },
                                {
                                    type: "text",
                                    color: "#EFEFEF",
                                    x: 525,
                                    y: 252,
                                    text: `Hi, I'm Nico Clack and I'm mostly programming in JavaScript at the moment. My main 3 hobbies are programming, watching videos and playing videogames but I'm working on expanding my interests by listening to audio books, cooking and swimming more.

I've been programming since I was about 8 and a half so I've produced a fair bit over the years (I'm 17). My older stuff is under hedgehog125 and earlier nicoclack on Scratch.

Anyway, scroll down for my semi recent projects...`,
                                    size: 21,
                                    wordWrapWidth: 450
                                },

                                {
                                    type: "text",
                                    color: "#EFEFEF",
                                    text: "Top Picks",
                                    size: 40,
                                    y: 450 + 25
                                },
                                {
                                    type: "image",
                                    color: "#EFEFEF",
                                    width: 175,
                                    x: 401,
                                    y: 450 + 42,
                                    height: 3
                                },

                                projectButton("BagelJS", "yellow", 200, 450 + 150, "Bagel.js"),
                                projectButton("Frontier", "black", 400, 450 + 150, "Frontier"),
                                projectButton("Rummikub", "white", 600, 450 + 150, "Rummikub"),
                                projectButton("Itch", "#DEDEDE", 300, 450 + 300, "Itch"),
                                projectButton("BagelUI", "yellow", 500, 450 + 300, "Bagel.js UI", 0.7)
                            ],
                            scroll: {
                                y: {
                                    min: 0,
                                    max: 450
                                }
                            },
                            ...hoverText()
                        },
                        "Project.BagelJS": {
                            elements: [
                                background(),
                                title("Bagel.js"),
                                basicInfo(
                                    "22/6/20 (1.0b) / 7/2/19 (game.js uploaded onto GitHub)",
                                    "Paused",
                                    "1.5.1b/1.6a (WIP)"
                                ),
                                sideText(`Bagel.js is a 2D JavaScript games framework where objects and arrays are heavily used to structure data and code. The idea being that it reduces repetition for commands such as creating a sprite.`),
                                paragraph(
`It's technically based on my previous game framework: Begining.js but most of the underlying code was significantly changed so syntax is the main similarity. (also similar to the previous previous: JAMESCRIPT) They also share the same GitHub repository so Begining.js isn't listed here.

Looking back, I'm conflicted about Bagel.js. It's been an interesting learning opportunity and it's definitely my best framework so far. However, it was designed for the organisation needed for large projects, in a language primarily designed for simpler programs. Ironically, it looks like I'm going to be using it for simple projects as I have my UI plugin. Especially since I'm now much more comfortable with Unity as I'm using it on my Games Development course.`,
                                202),
                                paragraph(
`I guess it's a reflection of my obsession to do things my way, often to a fault. Still, at least it's a lesson and I imagine the more programming teamwork I do, the less I'll be like this. Either that or I'll convince them all to learn and use Bagel.js...`,
                                507),

                                ...projectBar("BagelJS"),
                                backButton(200, 450 + 150, "yellow")
                            ],
                            scroll: {
                                y: {
                                    min: 0,
                                    max: 233
                                }
                            },
                            ...hoverText(true)
                        },
                        ...transitionSubmenu("BagelJS", "GitHub"),

                        "Project.Frontier": {
                            elements: [
                                background(),
                                title("Frontier"),
                                basicInfo(
                                    "31/11/17 (v1.0)",
                                    "Discontinued/semi finished",
                                    "v1.1"
                                ),
                                sideText(`Frontier is a HTML5 space shooter game inspired by the Scratch game: Frontier 2. It was made using JAMESCRIPT.`, -22, -5),
                                paragraph(
`Overall, I'm proud of this game. The resulting game is fun (if simplistic) and it also shows a bit how my code has improved. Both how it got better since then and how it improved between Rummikub and it.`,
                                171),
                                paragraph(
`But yes, the golobal variables are confusing. Some are JAMESCRIPT methods and some are to tell it which assets and sprites to make (I think?).`,
                                272),

                                ...projectBar("Frontier", true),
                                backButton(400, 450 + 150, "black")
                            ],
                            scroll: {},
                            ...hoverText(true)
                        },
                        ...transitionSubmenu("Frontier", "GitHub"),
                        ...transitionSubmenu("Frontier", "Pages"),

                        "Project.Rummikub": {
                            elements: [
                                background(),
                                title("Rummikub"),
                                basicInfo(
                                    "27/3/17",
                                    "Finished",
                                    "1.0"
                                ),
                                sideText(`This project is a clone of the Romanian board game with the same name. It's very popular in the Netherlands so I guess part of my Dutch heritance is to play it sometimes (and also make it in my case I guess :P).`, -102, -5),
                                paragraph(
`My recreation is pretty accurate except it uses the joker rules we use in my immediate family. There's also no AI but the physical board game doesn't so...`,
                                196),
                                paragraph(
`The game technically uses my very fist games framework: GameLib. However, other than using some of the methods in it, it mustly just renders straight to the 2D canvas.`,
                                272),
                                paragraph(
`Overall, the code is pretty bad. But it was my first big JavaScript project so I can't bash it too much. It also used my first games framework which doesn't help.`,
                                348),

                                ...projectBar("Rummikub", true),
                                backButton(600, 450 + 150, "white")
                            ],
                            scroll: {
                                y: {
                                    min: 0,
                                    max: 50
                                }
                            },
                            ...hoverText(true)
                        },
                        ...transitionSubmenu("Rummikub", "GitHub"),
                        ...transitionSubmenu("Rummikub", "Pages"),

                        "Project.Itch": {
                            elements: [
                                background(),
                                title("Itch"),
                                basicInfo(
                                    "25/6/17 (the last version before development stopped)",
                                    "Cancelled",
                                    "N/A"
                                ),
                                sideText(`Itch was easilly my biggest cancelled project. If I had gone on to finish it, it would have about 7500 lines of code.`, 0, 5),
                                paragraph(
`I previously mentioned on Scratch (although I apparently removed a lot of it) why I cancelled it but here's the rundown:`,
                                181),
                                paragraph(
` • I was making it and realised using WebGL would make it much faster
 • WebGL is complicated so I looked into frameworks
 • I found Phaser and started making Frontier using it so I understood it
 • I realised making games is much easier and more fun with a framework
 • I had no reason to make Itch as Phaser was good enough for me (I guess that didn't completely turn out since I made JAMESCRIPT and Bagel.js)
`,
                                232, 25),

                                ...projectBar("Itch", 2),
                                backButton(300, 450 + 300, "#DEDEDE")
                            ],
                            scroll: {
                                y: {
                                    min: 0,
                                    max: 35
                                }
                            },
                            ...hoverText(true)
                        },
                        ...transitionSubmenu("Itch", "GitHub"),
                        ...transitionSubmenu("Itch", "Pages"),

                        "Project.BagelUI": {
                            elements: [
                                background(),
                                title("Bagel.js UI"),
                                basicInfo(
                                    "N/A",
                                    "In development",
                                    "N/A"
                                ),
                                sideText(`Bagel.js UI is a customisable Bagel.js plugin for creating user interfaces. It features buttons, text and images but can also be expanded by loading external files (not implemented yet).`, -98, -5),
                                paragraph(
`This website was also made using it.`,
                                171),
                                paragraph(
`(This page will likely be updated to be more detailed once it's done and I can reflect on it)`,
                                221),

                                ...projectBar("BagelUI", 2),
                                backButton(500, 450 + 300, "yellow")
                            ],
                            ...hoverText(true)
                        },
                        ...transitionSubmenu("BagelUI", "GitHub"),
                        ...transitionSubmenu("BagelUI", "Pages")
                    },
                    stateToActivate: "menu"
                }
            ]
        },
        width: 800,
        height: 450,
        config: {
            display: {
                backgroundColor: "#202020",
                renderer: "canvas",
                antialiasing: true
            }
        }
    });
})();
