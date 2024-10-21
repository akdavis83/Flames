window.onload = function (){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//Make the canvas occupy the full page
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	var particles = [];
	var mouse = {};
	
	//Lets create some particles now
	var particle_count = 100;
	for(var i = 0; i < particle_count; i++)
	{
		particles.push(new particle());
	}
	
	//finally some mouse tracking
	canvas.addEventListener('mousemove', track_mouse, false);
	
	function track_mouse(e)
	{
		//since the canvas = full page the position of the mouse 
		//relative to the document will suffice
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	}
	
	function particle()
	{
		//speed, life, location, life, colors
		//speed.x range = -2.5 to 2.5 
		//speed.y range = -15 to -5 to make it move upwards
		//lets change the Y speed to make it look like a flame
		this.speed = {x: -2.5+Math.random()*5, y: -15+Math.random()*10};
		//location = mouse coordinates
		//Now the flame follows the mouse coordinates
		if(mouse.x && mouse.y)
		{
			this.location = {x: mouse.x, y: mouse.y};
		}
		else
		{
			this.location = {x: W/2, y: H/2};
		}
		//radius range = 10-30
		this.radius = 10+Math.random()*20;
		//life range = 20-30
		this.life = 20+Math.random()*10;
		this.remaining_life = this.life;
		//colors
		this.r = 74;
		this.g = 77;
		this.b = 84;
//		this.r = Math.round(Math.random()*255);
//		this.g = Math.round(Math.random()*255);
//		this.b = Math.round(Math.random()*255);
	}
	
	
	function draw()
	{
		//Painting the canvas black
		//Time for lighting magic
		//particles are painted with "lighter"
		//In the next frame the background is painted normally without blending to the 
		//previous framevar im = new Image();
		
	ctx.globalCompositeOperation = "source-over";
//		var im = new Image();
//		im.src = "./background.jpg";
//		im.onload = function (){
//		ctx.drawImage(im, W, H);
//		}

		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, W, H);	
		
//		var src    = "../images/background.jpg";
//	    var img    = new Image();
//	    img.src    = src;
//	    $(img).load(function() {
//			var pattern = ctx.createPattern(img, 'repeat');
//			ctx.fillStyle = pattern;
//			ctx.fillRect(0, 0, W, H);
//		  });

		ctx.globalCompositeOperation = "lighter";
		
		for(var i = 0; i < particles.length; i++)
		{
			var p = particles[i];
			ctx.beginPath();
			//changing opacity according to the life.
			//opacity goes to 0 at the end of life of a particle
			p.opacity = Math.round(p.remaining_life/p.life*100)/100
			//a gradient instead of white fill
			var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
//			p.r = 128;
//			p.g = 34;
//			p.b = 34;
			p.r = 255;
			p.g = 69;
			p.b = 0;
			gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(0.2, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
			ctx.fillStyle = gradient;
			ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
			ctx.fill();
			
			//lets move the particles
			p.remaining_life--;
			p.radius--;
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;
			
			//regenerate particles
			if(p.remaining_life < 0 || p.radius < 0)
			{
				//a brand new particle replacing the dead one
				particles[i] = new particle();
			}
		}

		ctx.font = "30px Comic Sans MS";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Flames Of Fire", canvas.width/2, canvas.height/2); 
	}
	
	setInterval(draw, 33);

/****************************TORCH LIGHT*********************************/

//
//canvas.addEventListener('mouseout', function(e) {
//  window.cancelAnimationFrame(raf);
//  running = false;
//});
	
function update(e){
	//set e as .torch class
 //var element = document.getElementsByClassName("torch"); 
  var x = e.clientX || e.touches[0].clientX
  var y = e.clientY || e.touches[0].clientY

  
  document.documentElement.style.setProperty('--cursorX', x + 'px')
  document.documentElement.style.setProperty('--cursorY', y + 'px')
}

document.addEventListener('mousemove',update)
document.addEventListener('touchmove',update)

// lets light up canvas element after click

//	function change_the_before_attribute(other_background) {
//	other_background.className="torch after-click";
//}
	$(function () {
    $(".torch").click(function () {
        $(".torch").addClass(".torch .after-click");
    });
});
	//changes background of body
//$(function () {
//    $("body").click(function () {
//        $(this).css('background-color', 'rgba(255,0,0,.95)');
//    });
//});
	
	
}