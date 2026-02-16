console.log('inside');

const img = document.getElementById('card');
const imgBounds = img.getBoundingClientRect();
console.log(imgBounds);

const imgCenter = {
	x: imgBounds.x + imgBounds.width / 2,
	y: imgBounds.y + imgBounds.height / 2
}

function pointerColision(rect, {x, y}) {
	if (x > rect.x && x < rect.x + rect.width &&
	    y > rect.y && y < rect.y + rect.height) 
	{
		return true;
	}

	return false;
}

function handleMouseHover() {
	mousePos = {
		x: event.clientX,
		y: event.clientY
	}

	const normalizedCenter = {
		x: imgCenter.x - imgBounds.x,
		y: imgCenter.y - imgBounds.y
	}

	const normalizedMouse = {
		x: mousePos.x - imgBounds.x,
		y: mousePos.y - imgBounds.y
	}

	const ratio = { 
		x: (normalizedCenter.x - normalizedMouse.x) / normalizedCenter.x,
		y: (normalizedCenter.y - normalizedMouse.y) / normalizedCenter.y
	}
	const dimFactor = 10;
	const translateFactor = 10;
	const scaleFactor = 3;

	const rX = 1 + ratio.y * translateFactor;
	const rY = 1 + ratio.x * translateFactor;
	console.log(rX);
	console.log(rY);

	img.style.filter = `brightness(${1 + ratio.y / dimFactor})`;
	img.style.transform = `scale(${scaleFactor}) rotateX(${- rX}deg) rotateY(${rY}deg)`;
}

img.addEventListener('mouseover', function(event) {
	img.addEventListener('mousemove', handleMouseHover);
});

img.addEventListener('mouseout', () => {
	img.style.filter = 'brightness(1)';
	img.style.transform = `scale(1)`;
	img.removeEventListener('mousemove', handleMouseHover);
});

