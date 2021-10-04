const game = (_ => {
    const githubHandler = (menuSprite, animationVars) => {
        if (! game.vars.loadingExternalPage) {
            if (game.vars.externalPageDelay == 0) {
                // It'll take a second or two to load anyway so start loading while the animation is active
                let projectID = menuSprite.submenu.split(".");
                projectID.splice(0, 1);
                projectID.splice(projectID.length - 1, 1);
                projectID = projectID.join(".");
                location.href = menuSprite.vars.githubURLs[projectID];
                game.vars.loadingExternalPage = true;
            }
            else {
                game.vars.externalPageDelay--;
            }
        }
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
                        src: "assets/imgs/backArrow.png"
                    },

                    {
                        id: "ProjectIcon.BagelJS",
                        src: "assets/imgs/projectIcons/bagelJS.png",
                        webP: "assets/imgs/projectIcons/bagelJS.webp"
                    }
                ]
            },
            sprites: [
                {
                    id: "Menu",
                    type: "GUI",
                    vars: {
                        githubURLs: {
                            BagelJS: "https://github.com/hedgehog125/Bagel.js"
                        }
                    },
                    submenu: "main",
                    submenus: {
                        main: {
                            scroll: {
                                y: {
                                    min: 0,
                                    max: 450
                                }
                            }
                        },
                        "Project.BagelJS": {
                            scroll: {
                                y: {
                                    min: 0,
                                    max: 233
                                }
                            }
                        },
                        "Project.BagelJS.GitHub": {
                            animationMain: githubHandler
                        }
                    },
                    stateToActivate: "menu",
                    elements: [
                        {
                            type: "image",
                            img: "Logo",
                            x: 150,
                            width: 200,
                            height: 200,
                            submenu: "main"
                        },
                        {
                            type: "text",
                            color: "white",
                            text: "About Me",
                            size: 40,
                            x: 525,
                            y: 38,
                            submenu: "main"
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
                            wordWrapWidth: 450,
                            submenu: "main"
                        },

                        {
                            type: "text",
                            color: "#EFEFEF",
                            text: "Top Picks",
                            size: 40,
                            y: 450 + 25,
                            submenu: "main"
                        },
                        {
                            type: "image",
                            color: "#EFEFEF",
                            width: 175,
                            x: 401,
                            y: 450 + 42,
                            height: 3,
                            submenu: "main"
                        },
                        {
                            type: "button",
                            color: "yellow",
                            icon: "ProjectIcon.BagelJS",
                            y: 450 + 225,
                            size: 100,
                            onclick: {
                                submenu: "Project.BagelJS",
                                animation: {
                                    type: "circle"
                                }
                            },
                            submenu: "main"
                        },

                        {
                            type: "image",
                            color: "#202020",
                            width: 800,
                            height: 450,
                            submenu: "Project.BagelJS"
                        },
                        {
                            type: "text",
                            color: "white",
                            text: "Bagel.js",
                            size: 40,
                            y: 38,
                            submenu: "Project.BagelJS"
                        },
                        {
                            type: "text",
                            color: "#EFEFEF",
                            left: 25,
                            top: 80,
                            text:
`Release Date: 22/6/20 (1.0b) / 7/2/19 (game.js uploaded onto GitHub)
Status: Paused
Latest Version: 1.5.1b/1.6a (WIP)`,
                            size: 15,
                            wordWrapWidth: 250,
                            submenu: "Project.BagelJS"
                        },
                        {
                            type: "text",
                            color: "#EFEFEF",
                            left: 301,
                            top: 75,
                            text:
`Bagel.js is a 2D JavaScript games framework where objects and arrays are heavilly used to structure data and code. The idea being that it reduces repetition for commands such as creating a sprite.`,
                            size: 20,
                            wordWrapWidth: 474,
                            submenu: "Project.BagelJS"
                        },
                        {
                            type: "text",
                            color: "#EFEFEF",
                            left: 25,
                            top: 202,
                            text:
`It's technically based on my previous game framework: Begining.js but most of the underlying code was significantly changed so syntax is the main similarity. (also similar to the previous previous: JAMESCRIPT) They also share the same GitHub repository so Begining.js isn't listed here.

Looking back, I'm conflicted about Bagel.js. It's been an interesting learning and it's definitely my best framework so far. However, it was designed for the organisation needed for large projects, in a language primarily designed for simpler programs. Ironically, it looks like I'm going to be using it for simple projects as I have my UI plugin. Especially since I'm now much more comfortable with Unity as I'm using it on my Games Development course.`,
                            size: 20,
                            wordWrapWidth: 750,
                            submenu: "Project.BagelJS"
                        },
                        {
                            type: "text",
                            color: "#EFEFEF",
                            left: 25,
                            top: 507,
                            text:
`I guess it's a reflection of my obsession to do things my way, often to a fault. Still, at least it's a lesson and I imagine the more programming teamwork I do, the less I'll be like this. Either that or I'll convince them all to learn and use Bagel.js...`,
                            size: 20,
                            wordWrapWidth: 750,
                            submenu: "Project.BagelJS"
                        },

                        {
                            type: "image",
                            color: "#202020",
                            width: 800,
                            height: 75,
                            fixedToCamera: true,
                            bottom: 450,
                            submenu: "Project.BagelJS"
                        },
                        {
                            type: "button",
                            icon: "GitHub",
                            color: "black",
                            onclick: {
                                submenu: "Project.BagelJS.GitHub",
                                animation: {
                                    type: "triangleScroll"
                                }
                            },
                            size: 65,
                            y: 412.5,
                            fixedToCamera: true,
                            submenu: "Project.BagelJS"
                        },
                        {
                            type: "button",
                            icon: "Back",
                            color: "white",
                            onclick: {
                                submenu: "main",
                                animation: {
                                    type: "circle",
                                    direction: "close",
                                    x: 400,
                                    y: 450 + 225
                                }
                            },
                            size: 50,
                            x: 25 + 25,
                            y: 25 + 25,
                            fixedToCamera: true,
                            submenu: "Project.BagelJS"
                        },

                        {
                            type: "image",
                            color: "black",
                            width: 800,
                            height: 450,
                            submenu: "Project.BagelJS.GitHub"
                        },
                    ]
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
