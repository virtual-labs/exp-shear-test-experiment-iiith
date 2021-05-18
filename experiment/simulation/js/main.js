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

	
	const slab1x = 500
	const slab1y = 200
	const slab_width = 200
	const slab_length = 40
	const vslabx = 580
	const vslaby = 200
	const vslab_width = 40
	const vslab_length = 3*slab_length
	const gap = 3;
	const slab2x = 500
	const slab2y = 280
	const materialx = 480
	const materialy = 240
	const movement = 2
	let flag = 0;

	let slab1 = [
		[slab1x ,slab1y],
		[slab1x + slab_width ,slab1y],
		[slab1x + slab_width ,slab1y+ slab_length],
		[slab1x, slab1y + slab_length]
		
	]

	let slab2 = [
		[slab2x ,slab2y],
		[slab2x + slab_width ,slab2y],
		[slab2x + slab_width ,slab2y+ slab_length],
		[slab2x, slab2y + slab_length]
		
	]

	let material = [
		[materialx ,materialy],
		[materialx + slab_width ,materialy],
		[materialx + slab_width ,materialy+ slab_length],
		[materialx, materialy + slab_length]
		
	]

	let part1 = [
		[materialx -movement ,materialy],
		[vslabx - movement ,materialy],
		[vslabx - movement ,materialy+ slab_length],
		[materialx -movement, materialy + slab_length]
	]

	let part2 = [
		[vslabx - movement + vslab_width ,materialy],
		[materialx -movement + slab_width ,materialy],
		[materialx -movement + slab_width ,materialy+ slab_length],
		[vslabx - movement + vslab_width, materialy + slab_length]
		
	]
	
	let vslab = [
		[vslabx ,vslaby],
		[vslabx + vslab_width ,vslaby],
		[vslabx + vslab_width ,vslaby+ vslab_length],
		[vslabx, vslaby + vslab_length]
		
	]
	let vpart1 = [
		[vslabx ,vslaby],
		[vslabx + vslab_width ,vslaby],
		[vslabx + vslab_width ,vslaby+ vslab_width],
		[vslabx, vslaby + vslab_width]
	]

	let vpart2 = [
		[vslabx - movement ,vslaby+ gap + vslab_width],
		[vslabx - movement + vslab_width ,vslaby+gap + vslab_width],
		[vslabx - movement + vslab_width ,vslaby+ 2*vslab_width-gap],
		[vslabx - movement, vslaby + 2*vslab_width-gap]
	]

	let vpart3 = [
		[vslabx ,vslaby + 2*vslab_width],
		[vslabx + vslab_width ,vslaby + 2*vslab_width],
		[vslabx + vslab_width ,vslaby + 3*vslab_width],
		[vslabx, vslaby + 3*vslab_width]
	]


	function canvas_arrow(context, fromx, fromy, tox, toy) {
		let headlen = 10; // length of head in pixels
		let dx = tox - fromx;
		let dy = toy - fromy;
		let angle = Math.atan2(dy, dx);
		context.moveTo(fromx, fromy);
		context.lineTo(tox, toy);
		context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
		context.moveTo(tox, toy);
		context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
	  }

	function drawstatic(ctx, obj,color) //for drawing the topknob
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
		ctx.font = "30px Arial";
		ctx.fillStyle = "black";
		
		let text = "Shear Strength of Material : 452.703 N/mm^2";
		ctx.fillText(text, 320,50);
		ctx.font = "20px Arial";
		ctx.fillText("F/2",760,225)
		ctx.fillText("F/2",760,305)
		ctx.fillText("F",410,265)

		ctx.stroke();

		ctx.fillStyle = fill;

		drawstatic(ctx, slab1,"black");
		drawstatic(ctx, slab2,"black");

		if(flag >= 40)
		{
			
			drawstatic(ctx,vpart1,"blue");
			drawstatic(ctx,vpart3,"blue");
			drawstatic(ctx,vpart2,"blue");
			drawstatic(ctx,part1,"grey");
			drawstatic(ctx,part2,"grey");
		}
		else
		{
			drawstatic(ctx, material,"grey");
			drawstatic(ctx, vslab,"blue");
		}

		ctx.beginPath();
		canvas_arrow(ctx, 720, 220, 750, 220);
		canvas_arrow(ctx, 720, 300, 750, 300);
		canvas_arrow(ctx, 460, 260, 430, 260);
		ctx.stroke();

		flag++;
		tmHandle = window.setTimeout(draw, 1000 / fps);
	}
	let tmHandle = window.setTimeout(draw, 1000 / fps);
});
