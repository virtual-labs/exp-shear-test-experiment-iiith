'use strict';

document.addEventListener('DOMContentLoaded', function () {

	const restartButton = document.getElementById('restart');

	restartButton.addEventListener('click', function() {restart();});

	function restart() 
	{ 
		window.clearTimeout(tmHandle); 
		flag = 0;
		tmHandle = window.setTimeout(draw, 1000 / fps); 
	}
	
	const canvas = document.getElementById("main");
	canvas.width = 1200;
	canvas.height = 600;
	canvas.style = "border:3px solid";
	const ctx = canvas.getContext("2d");

	const fill = "#D3D3D3";
	let fps = 12;

	
	const slab1X = 500;
	const slab1Y = 200;
	const slabWidth = 200;
	const slabLength = 40;
	const VslabX = 580;
	const VslabY = 200;
	const VslabWidth = 40;
	const VslabLength = 3*slabLength;
	const gap = 3;
	const slab2X = 500;
	const slab2Y = 280;
	const materialX = 480;
	const materialY = 240;
	const movement = 2;
	let flag = 0;

	let slab1 = [
		[slab1X ,slab1Y],
		[slab1X + slabWidth ,slab1Y],
		[slab1X + slabWidth ,slab1Y+ slabLength],
		[slab1X, slab1Y + slabLength]
		
	];

	let slab2 = [
		[slab2X ,slab2Y],
		[slab2X + slabWidth ,slab2Y],
		[slab2X + slabWidth ,slab2Y+ slabLength],
		[slab2X, slab2Y + slabLength]
		
	];

	let material = [
		[materialX ,materialY],
		[materialX + slabWidth ,materialY],
		[materialX + slabWidth ,materialY+ slabLength],
		[materialX, materialY + slabLength]
		
	];

	let part1 = [
		[materialX -movement ,materialY],
		[VslabX - movement ,materialY],
		[VslabX - movement ,materialY+ slabLength],
		[materialX -movement, materialY + slabLength]
	];

	let part2 = [
		[VslabX - movement + VslabWidth ,materialY],
		[materialX -movement + slabWidth ,materialY],
		[materialX -movement + slabWidth ,materialY+ slabLength],
		[VslabX - movement + VslabWidth, materialY + slabLength]
		
	];
	
	let Vslab = [
		[VslabX ,VslabY],
		[VslabX + VslabWidth ,VslabY],
		[VslabX + VslabWidth ,VslabY+ VslabLength],
		[VslabX, VslabY + VslabLength]
		
	];
	let Vpart1 = [
		[VslabX ,VslabY],
		[VslabX + VslabWidth ,VslabY],
		[VslabX + VslabWidth ,VslabY+ VslabWidth],
		[VslabX, VslabY + VslabWidth]
	];

	let Vpart2 = [
		[VslabX - movement ,VslabY+ gap + VslabWidth],
		[VslabX - movement + VslabWidth ,VslabY+gap + VslabWidth],
		[VslabX - movement + VslabWidth ,VslabY+ 2*VslabWidth-gap],
		[VslabX - movement, VslabY + 2*VslabWidth-gap]
	];

	let Vpart3 = [
		[VslabX ,VslabY + 2*VslabWidth],
		[VslabX + VslabWidth ,VslabY + 2*VslabWidth],
		[VslabX + VslabWidth ,VslabY + 3*VslabWidth],
		[VslabX, VslabY + 3*VslabWidth]
	];


	function canvasArrow(context, fromx, fromy, tox, toy) {
		let headLen = 10; // length of head in pixels
		let dx = tox - fromx;
		let dy = toy - fromy;
		let angle = Math.atan2(dy, dx);
		context.moveTo(fromx, fromy);
		context.lineTo(tox, toy);
		context.lineTo(tox - headLen * Math.cos(angle - Math.PI / 6), toy - headLen * Math.sin(angle - Math.PI / 6));
		context.moveTo(tox, toy);
		context.lineTo(tox - headLen * Math.cos(angle + Math.PI / 6), toy - headLen * Math.sin(angle + Math.PI / 6));
	  }

	function drawStatic(ctx, obj,color) //for drawing the topknob
	{
		ctx.save();
		ctx.fillStyle = color;
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(obj[0][0], obj[0][1]);

		for(let i = 0; i < obj.length; ++i)
		{
			const next = (i + 1) % obj.length;
			ctx.lineTo(obj[next][0], obj[next][1]);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	
	function draw()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.font = "40px Times New Roman";
		ctx.fillStyle = "black";
		
		let text = "Shear Strength of Material : 452.703 N/mm^2";
		ctx.fillText(text, 250,50);
		ctx.font = "20px Arial";
		ctx.fillText("F/2",760,225);
		ctx.fillText("F/2",760,305);
		ctx.fillText("F",410,265);

		ctx.stroke();

		ctx.fillStyle = fill;

		drawStatic(ctx, slab1,"black");
		drawStatic(ctx, slab2,"black");

		if(flag >= 40)
		{
			
			drawStatic(ctx,Vpart1,"blue");
			drawStatic(ctx,Vpart3,"blue");
			drawStatic(ctx,Vpart2,"blue");
			drawStatic(ctx,part1,"grey");
			drawStatic(ctx,part2,"grey");
		}
		else
		{
			drawStatic(ctx, material,"grey");
			drawStatic(ctx, Vslab,"blue");
		}

		ctx.beginPath();
		canvasArrow(ctx, 720, 220, 750, 220);
		canvasArrow(ctx, 720, 300, 750, 300);
		canvasArrow(ctx, 460, 260, 430, 260);
		ctx.stroke();

		flag++;
		tmHandle = window.setTimeout(draw, 1000 / fps);
	}
	let tmHandle = window.setTimeout(draw, 1000 / fps);
});
