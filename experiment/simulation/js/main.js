'use strict';

document.addEventListener('DOMContentLoaded', function() {

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', function() { restart(); });

    const playButton = document.getElementById('play');
    playButton.addEventListener('click', function() { play(); });

    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', function() { pause(); });

    const slider = document.getElementById('speed');
    const output = document.getElementById('demo_speed');
    output.innerHTML = (slider.value) / 4;
    slider.oninput = function() {
        output.innerHTML = (this.value) / 4;
        FPS = originalFPS * (output.innerHTML);
        restart();
    };


    function restart() {
        window.clearTimeout(tmHandle);
        window.clearTimeout(tms);
        setAll();
        play();
    }

    function play() {
        tmHandle = window.setTimeout(draw, 1000 / FPS);
        pauseButton.removeAttribute("disabled");
        restartButton.removeAttribute("disabled");
        playButton.setAttribute("disabled", "true");
    }

    function pause() {
        window.clearTimeout(tmHandle);
        pauseButton.setAttribute("disabled", "true");
        playButton.removeAttribute("disabled");
    }

    function drawObject(ctx, obj, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(obj[0][0], obj[0][1]);

        for (let i = 0; i < obj.length; ++i) {
            const next = (i + 1) % obj.length;
            ctx.lineTo(obj[next][0], obj[next][1]);
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }


    const canvas = document.getElementById("main");
    canvas.width = 600;
    canvas.height = 600;
    canvas.style = "border:3px solid;";
    const ctx = canvas.getContext("2d");

    const fill = "black";
    const lineWidth = 1.5;
    const originalFPS = 10;
    let FPS = 10;
    let tmHandle;
    let tms;

    const standX = 0;
    const standY = 520;
    const standWidth = 600;
    const standHeight = 80;

    const boxX = 200;
    const boxWidth = 200;
    const boxY = 240;
    const boxHeight = 280;

    const slabX = 220;
    const slabWidth = 160;
    const slabY = 100;
    const slabHeight = 200;

    const rodX = 100;
    const rodWidth = 400;
    const rodY = 330;
    const rodHeight = 20;

    let box = [];
    let stand = [];
    let slab = [];
    let brokenPart1 = [];
    let brokenPart2 = [];
    let leftPart = [];

    function setAll() {
        box = [
            [boxX, boxY],
            [boxX + boxWidth, boxY],
            [boxX + boxWidth, boxY + boxHeight],
            [boxX, boxY + boxHeight]
        ];

        stand = [
            [standX, standY],
            [standX + standWidth, standY],
            [standX + standWidth, standY + standHeight],
            [standX, standY + standHeight]
        ];

        slab = [
            [slabX, slabY],
            [slabX + slabWidth, slabY],
            [slabX + slabWidth, slabY + slabHeight],
            [slabX, slabY + slabHeight]
        ];

        brokenPart1 = [
            [rodX, rodY],
            [boxX - 5, rodY],
            [boxX - 5, rodY + rodHeight],
            [rodX, rodY + rodHeight]
        ];

        brokenPart2 = [
            [boxX + boxWidth + 5, rodY],
            [rodX + rodWidth, rodY],
            [rodX + rodWidth, rodY + rodHeight],
            [boxX + boxWidth + 5, rodY + rodHeight]
        ];

        leftPart = [
            [boxX + 5, rodY],
            [boxX - 5 + boxWidth, rodY],
            [boxX - 5 + boxWidth, rodY + rodHeight],
            [boxX + 5, rodY + rodHeight]
        ];
        document.getElementById("load").innerHTML = "?";
        document.getElementById("shear").innerHTML = "?";
    }
    setAll();
    drawStatic();


    drawObject(ctx, brokenPart1, "#71797E");
    drawObject(ctx, brokenPart2, "#71797E");
    drawObject(ctx, leftPart, "#71797E");

    function drawStatic() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = fill;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";


        drawObject(ctx, stand, "#643D01");
        drawObject(ctx, box, "black");
        drawObject(ctx, slab, "#43464B");

        ctx.font = "30px Arial";
        ctx.fillText("Load", slab[1][0] - 40, slab[1][1] - 70);
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(slab[1][0] - 70, slab[1][1] - 70);
        ctx.lineTo(slab[1][0] - 70, slab[1][1] - 10);
        ctx.lineTo(slab[1][0] - 90, slab[1][1] - 30);
        ctx.moveTo(slab[1][0] - 70, slab[1][1] - 10);
        ctx.lineTo(slab[1][0] - 50, slab[1][1] - 30);
        ctx.stroke();
    }

    function move(tube, flag) {
        for (let i = 0; i < tube.length; ++i) {
            tube[i][1] += flag;
        }
    }

    function draw() {
        if (slab[2][1] < brokenPart2[1][1]) {
            drawStatic();
            drawObject(ctx, brokenPart1, "#71797E");
            drawObject(ctx, brokenPart2, "#71797E");
            drawObject(ctx, leftPart, "#71797E");
            move(slab, 1);
            tmHandle = window.setTimeout(draw, 500 / FPS);

        } else if (slab[2][1] === brokenPart2[1][1]) {
            slab[2][1]++;
            tms = window.setTimeout(draw, 20000 / FPS);
        } else if (leftPart[2][1] < standY - 5) {
            drawStatic();
            drawObject(ctx, brokenPart1, "#71797E");
            drawObject(ctx, brokenPart2, "#71797E");
            move(leftPart, 1);
            drawObject(ctx, leftPart, "#71797E");
            tmHandle = window.setTimeout(draw, 10 / FPS);
            document.getElementById("load").innerHTML = "1700";
            document.getElementById("shear").innerHTML = "289.23";
        }


    }

});