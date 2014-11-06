var
	slideIndex = 0,
	slide = document.getElementById("slide"+slideIndex),
	points = slide.querySelectorAll(".point"),
	point=0,
	RIGHT_ARROW = 39,
	LEFT_ARROW = 37;

window.onclick = show_next;

window.onkeydown = function(e){
	 var key = e.keyCode;
	if(key === RIGHT_ARROW) show_next();
	else if(key === LEFT_ARROW) show_previous();
}

function show_next(){
	if(point < points.length){
		points[point++].style.display="inline";
	} else {
		var newslide = document.getElementById("slide"+(++slideIndex))
		if(!newslide)return;
		slide.style.display="none";
		slide = newslide;
		slide.style.display="inline"
		points= slide.querySelectorAll(".point");
		point=0;
	}
}

function show_previous(){
	if(point > 0){
		points[point--].style.display="none";
	} else {
		var newslide = document.getElementById("slide"+(--slideIndex))
		if(!newslide)return;
		slide.style.display="none";
		slide = newslide;
		slide.style.display="inline"
		points= slide.querySelectorAll(".point");
		point=points.length -1;
	}
}

var balls;
function setupBalls(){
	var circles = [].slice.call(document.querySelectorAll("#circles > circle"));
	balls = [];
	circles.forEach(function(e,i){
		balls.push({
			element:e,
			vx:Math.random(),
			vy:Math.random(),
			r:+e.getAttribute("r"),
			get x(){
				var bb = e.getBBox();
				return bb.x + bb.width/2;
			},
			set x(nx){
				e.setAttribute("cx",nx,"");
			},
			get y(){
				var bb = e.getBBox();
				return bb.y + bb.height/2;
			},
			set y(ny){
				e.setAttribute("cy",ny,"");
			}
		});
	});
}

// Slide 4 stuff
var svgns = "http://www.w3.org/2000/svg";
function slide4_update(){
	if(slideIndex === 4){
		slide4_addCircle();
		setTimeout(slide4_update,1000);
	} else setTimeout(slide4_update,4000);
}
function slide4_makeCircle(){
	var cir = document.createElementNS(svgns,"circle");
	cir.setAttribute("cx",Math.random()*100,'');
	cir.setAttribute("cy",Math.random()*100,'');
	cir.setAttribute("r",Math.random()*6+5);
	cir.setAttribute("fill-opacity","0.3",'');
	cir.setAttribute("fill","#A0F",'');
	return cir;
}
function slide4_addCircle(){
	var cont = document.getElementById("slide4_circles");
	cont.appendChild(slide4_makeCircle());
	if(cont.childNodes.length > 10)
		cont.removeChild(cont.childNodes[0]);
}
document.getElementById("huetrigger").addEventListener("click",function(e){
	e.stopPropagation();
	document.getElementById('slide4filter').beginElement();
	return false
})
document.getElementById("click_example").addEventListener("click",function(e){
	e.stopPropagation();
	this.setAttribute('fill','#F0F','');
	return false;
})


// Ball animation in the background
function dist(x1,y1,x2,y2){
	var dx = x1-x2,dy = y1-y2;
	return Math.sqrt(dx*dx+dy*dy);
}
function animateBalls(){
	balls.forEach(function(ball){
		balls.some(function(other){
			if(ball === other)return;
			if(dist(ball.x, ball.y,other.x,other.y)<(ball.r+other.r)){
				ball.vx*=-1;
				ball.vy*=-1;
				return true;
			}
		});
		if((ball.x+ball.r) > 100 && ball.vx > 0)
			ball.vx*=-1;
		if((ball.y+ball.r) > 100 && ball.vy > 0)
			ball.vy*=-1;

		if((ball.x-ball.r) < 0 && ball.vx < 0)
			ball.vx*=-1;
		if((ball.y-ball.r) < 0 && ball.vy < 0)
			ball.vy*=-1;

		ball.x += ball.vx;
		ball.y += ball.vy;
	});
	setTimeout(animateBalls,16);
}

// Initialize everything
slide.style.display="inline";
setupBalls();
animateBalls();
slide4_update();
