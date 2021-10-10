/*
TODO
More projects

*/

const game = (_ => {
    const externalHandler = (menuSprite, animationVars) => {
        if (! game.vars.loadingExternalPage) {
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
            animationMain: externalHandler
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
    const sideText = (text, yOffset = 0) => ({
        type: "text",
        color: "#EFEFEF",
        left: 301,
        top: 75 + yOffset,
        text: text,
        size: 20,
        wordWrapWidth: 474
    });
    const paragraph = (text, y) => ({
        type: "text",
        color: "#EFEFEF",
        left: 25,
        top: y,
        text: text,
        size: 20,
        wordWrapWidth: 750
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
    const projectButton = (name, color, x, y, hover) => {
        return {
            type: "button",
            color: color,
            icon: "ProjectIcon." + name,
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
            externalPageDelay: 30
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
                            Frontier: "https://github.com/hedgehog125/Frontier-Fan-Made-Game"
                        },
                        pagesURLs: {
                            Frontier: "https://hedgehog125.github.io/Frontier-Fan-Made-Game/"
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

                                projectButton("BagelJS", "yellow", 300, 450 + 225, "Bagel.js"),
                                projectButton("Frontier", "black", 500, 450 + 225, "Frontier")
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
                                backButton(300, 450 + 225, "yellow")
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
                                sideText(`Frontier is a HTML5 space shooter game inspired by the Scratch game: Frontier 2. It was made using JAMESCRIPT.`, -5),
                                paragraph(
`Overall, I'm proud of this game. The resulting game is fun (if simplistic) and it also shows a bit how my code has improved. Both how it got better since then and how it improved between Rummikub and it.`,
                                171),
                                paragraph(
`But yes, the golobal variables are confusing. Some are JAMESCRIPT methods and some are to tell it which assets and sprites to make (I think?).`,
                                272),

                                ...projectBar("Frontier", true),
                                backButton(500, 450 + 225, "black")
                            ],
                            scroll: {},
                            ...hoverText(true)
                        },
                        ...transitionSubmenu("Frontier", "GitHub"),
                        ...transitionSubmenu("Frontier", "Pages")
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
