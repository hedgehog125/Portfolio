const game = Bagel.init({
    id: "menu",
    state: "menu",
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
                    src: "assets/imgs/logo.png"
                },

                {
                    id: "ProjectIcon.BagelJS",
                    src: "assets/imgs/projectIcons/bagelJS.png"
                }
            ]
        },
        sprites: [
            {
                id: "Menu",
                type: "GUI",
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
                        left: 0,
                        y: 252,
                        text:
`Release Date: 22/6/20 (1.0b) / 7/2/19 (game.js uploaded onto GitHub)
Status: Paused
Latest Version: 1.5.1b/1.6a (WIP)`,
                        size: 21,
                        wordWrapWidth: 450,
                        submenu: "Project.BagelJS"
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
            renderer: "canvas"
        }
    }
});
