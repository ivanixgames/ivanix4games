var ivxCfg = {


    canvas: {
        width: window.innerWidth,
        height: window.innerHeight
    },
 

    sprites: {
        width: 100,
        height: 100,
        deer: [0],
        sled: [4],
        poop: [5],
        plane: [6],
        rope: [7],
        present: [8,9,10,11],
        tree: [12],
        house: [13],
        cane: [14],
        elf: [16],
        santa: [17],
        player: [18],
        snowman: [19]
    },
    scale : {
        player: 0.65,
        snowman: 0.6,
        house: 0.85,
        tree: 0.8,
        sled: 0.6,
        elf: 0.75,
        deer: 0.65,
        poop: 0.5
    },
    bodySize: {
        player: [40,70,0,8],
        snowman: [70,80,0,5],
        house: [80,90,0,5],
        tree: [60,80,0,0],
        poop: [50,80,0,0],
        deer: [80,80,5,0]
    },
    poop: {
        enableTS: 4000,
        max: 500,
        odds: {
            max: 500,
            div: 497
        }
    },
    player: {
        speed: 300
    }

};
ivxCfg.canvas.halfHeight = (ivxCfg.canvas.height /2 )|0;
ivxCfg.canvas.halfWidth = (ivxCfg.canvas.width /2 )|0;
ivxCfg.deer  = {
    leftWall: -500,
    rightWall: ivxCfg.canvas.width + 500,
    spacing: 50
};