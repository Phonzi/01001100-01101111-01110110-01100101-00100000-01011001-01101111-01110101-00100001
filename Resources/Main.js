
function setup() {
	//Sets Canvas Size 
	createCanvas(800, 800);
	//Loads Images
	images=new Images();
}


function draw() {
	background(148,198,230);
	draw_all();
	change_all()
	deleteExpired()
	//Tick - 15 Milliseconds
	startTime = millis();
	//while (millis() < startTime + 15) {}
}

