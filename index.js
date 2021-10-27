/***************************************

COPYRIGHT!!! https://github.com/Antosser

***************************************/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var h = window.innerHeight;
var h2 = window.innerHeight / 2;
var w = window.innerWidth;
var w2 = window.innerWidth / 2;
var keysPressed = new Set;
var size = Math.min(w, h);
var size2 = Math.min(w, h) / 2;
canvas.height = size;
canvas.width = size;

var logKey = (e) => {
	keysPressed.add(e.code);
}
var logKey2 = (e) => {
	keysPressed.delete(e.code);
}

document.addEventListener('keydown', logKey);
document.addEventListener('keyup', logKey2);

var player = {
	pos: {
		x: 0,
		y: 0,
		z: -5,
	},
	ang: {
		x: 0,
		y: 0,
		z: 0,
	},
	fov: 100,
};

/*class Rect3d {
	x1 = 0;
	y1 = 0;
	z1 = 0;

	x2 = 0;
	y2 = 0;
	z2 = 0;
};*/

var line = (x1, y1, x2, y2) => {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}


var circle = (x, y, r, b, e) => {
	ctx.beginPath();
	ctx.arc(x, y, r, b, e * 3.1415);
	ctx.stroke();
}

var getPoint2d = (x, y, z) => {
	x -= player.pos.x;
	y -= player.pos.y;
	z -= player.pos.z;

	[x, z] = [
		x*Math.cos(player.ang.x * 3.1415/180) - z*Math.sin(player.ang.x * 3.1415/180),
    	x*Math.sin(player.ang.x * 3.1415/180) + z*Math.cos(player.ang.x * 3.1415/180),
	];

	[z, y] = [
		z*Math.cos(-player.ang.y * 3.1415/180) - y*Math.sin(-player.ang.y * 3.1415/180),
    	z*Math.sin(-player.ang.y * 3.1415/180) + y*Math.cos(-player.ang.y * 3.1415/180),
	];

	[x, y] = [
		x*Math.cos(-player.ang.z * 3.1415/180) - y*Math.sin(-player.ang.z * 3.1415/180),
    	x*Math.sin(-player.ang.z * 3.1415/180) + y*Math.cos(-player.ang.z * 3.1415/180),
	];

	// x 
	//cx = (Math.atan2(x * -1, z) * 180 / 3.1415 / -1) / player.fov;
	cx = Math.atan2(x, Math.sqrt(y*y + z*z)) * 180 / 3.1415 / player.fov;
	
	// y
	cy = Math.atan2(y, Math.sqrt(x*x + z*z)) * 180 / 3.1415 / player.fov;

	cx *= h;
	cy *= h;

	//console.log([cx, cy]);

	return [cx + size2, cy + size2];
}

var drawPoint3d = (x, y, z) => {
	[cx, cy] = getPoint2d(x, y, z);
	s = 50 / Math.sqrt((x-player.pos.x)**2 + (y-player.pos.y)**2 + (z-player.pos.z)**2);
	ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
}

var drawLine3d = (x1, y1, z1, x2, y2, z2) => {
	[cx1, cy1] = getPoint2d(x1, y1, z1);
	[cx2, cy2] = getPoint2d(x2, y2, z2);

	line(cx1, cy1, cx2, cy2);
}

var drawCuboid = (x1, y1, z1, x2, y2, z2, d, l) => {
	if (d) {
		drawPoint3d(x1,y1,z2);
		drawPoint3d(x1,y1,z1);
		drawPoint3d(x1,y2,z2);
		drawPoint3d(x1,y2,z1);
		drawPoint3d(x2,y1,z2);
		drawPoint3d(x2,y1,z1);
		drawPoint3d(x2,y2,z2);
		drawPoint3d(x2,y2,z1);
	}

	if (l) {
		drawLine3d(x1, y1, z1, x2, y1, z1);
		drawLine3d(x1, y1, z1, x1, y2, z1);
		drawLine3d(x1, y1, z1, x1, y1, z2);
		drawLine3d(x2, y1, z2, x1, y1, z2);
		drawLine3d(x2, y1, z2, x2, y2, z2);
		drawLine3d(x2, y1, z2, x2, y1, z1);
		drawLine3d(x1, y1, z2, x1, y2, z2);
		drawLine3d(x2, y1, z1, x2, y2, z1);
		drawLine3d(x1, y2, z1, x1, y2, z2);
		drawLine3d(x1, y2, z1, x2, y2, z1);
		drawLine3d(x2, y2, z2, x1, y2, z2);
		drawLine3d(x2, y2, z2, x2, y2, z1);
	}
}

var fps = 30;

var loop = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawPoint3d(-1, -1, -1);
	drawPoint3d(1, -1, -1);
	drawPoint3d(-1, 1, -1);
	drawPoint3d(1, 1, -1);
	drawPoint3d(-1, -1, 1);
	drawPoint3d(1, -1, 1);
	drawPoint3d(-1, 1, 1);
	drawPoint3d(1, 1, 1);

	drawLine3d(	-1,	-1,	-1,	1,	-1,	-1,	);
	drawLine3d(	-1,	-1,	-1,	-1,	1,	-1,	);
	drawLine3d(	-1,	-1,	-1,	-1,	-1,	1,	);
	drawLine3d(	1,	-1,	1,	-1,	-1,	1,	);
	drawLine3d(	1,	-1,	1,	1,	1,	1,	);
	drawLine3d(	1,	-1,	1,	1,	-1,	-1,	);
	drawLine3d(	-1,	-1,	1,	-1,	1,	1,	);
	drawLine3d(	1,	-1,	-1,	1,	1,	-1,	);
	drawLine3d(	-1,	1,	-1,	-1,	1,	1,	);
	drawLine3d(	-1,	1,	-1,	1,	1,	-1,	);
	drawLine3d(	1,	1,	1,	-1,	1,	1,	);
	drawLine3d(	1,	1,	1,	1,	1,	-1,	);

	//console.log(keysPressed);

	if (keysPressed.has("KeyA") == true) {
		player.pos.x -= 0.1;
	}
	if (keysPressed.has("KeyD") == true) {
		player.pos.x += 0.1;
	}
	if (keysPressed.has("KeyW") == true) {
		player.pos.y -= 0.1;
	}
	if (keysPressed.has("KeyS") == true) {
		player.pos.y += 0.1;
	}
	if (keysPressed.has("ArrowLeft") == true) {
		player.ang.x -= 1;
	}
	if (keysPressed.has("ArrowRight") == true) {
		player.ang.x += 1;
	}
	if (keysPressed.has("ArrowUp") == true) {
		player.ang.y -= 1;
	}
	if (keysPressed.has("ArrowDown") == true) {
		player.ang.y += 1;
	}

}

setInterval(loop, 1000 / fps)