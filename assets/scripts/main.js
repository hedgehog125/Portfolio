// TODO: scrolling
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
                }
            ]
        },
        sprites: [
            {
                id: "Menu",
                type: "GUI",
                submenu: "main",
                submenus: {
                    main: {}
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
                        color: "#EFEFEF",
                        text: "About Me",
                        size: 40,
                        x: 525,
                        y: 25,
                        submenu: "main"
                    },
                    {
                        type: "image",
                        color: "#EFEFEF",
                        width: 175,
                        x: 525,
                        y: 42,
                        height: 3,
                        submenu: "main"
                    },
                    {
                        type: "text",
                        color: "#EFEFEF",
                        x: 525,
                        text: "Hi, I'm, Nico Clack and I'm mostly programming in JavaScript at the moment. My main 3 hobbies are programming, watching videos and playing videogames but I'm working on expanding my interests by listening to audio books, cooking and swimming more.\n\nI've been programming since I was about 8 and a half so I've produced a fair bit over the years (I'm 17). My older stuff is under hedgehog125 and earlier nicoclack on Scratch.\n\nAnyway, scroll down for my semi recent projects...",
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
