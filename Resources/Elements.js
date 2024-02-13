
//Elements

ELEMENTS=[];

class Element{
	constructor(type,variables,placement_function,change_function){
		this.type=type;
		this.vars=variables;
		this.showMe=placement_function;
		this.change=change_function;
		this.deleteMe=false;
	}
	display = function(){
		this.showMe(this.variables);
	}
	move = function(){
		this.change(this.variables);
	}
}

function draw_all(){
	for(var i=0;i<ELEMENTS.length;i++){
		ELEMENTS[i].display();
	}
}

function change_all(){
	for(var i=0;i<ELEMENTS.length;i++){
		ELEMENTS[i].move();
	}
}

function deleteExpired(){
	for(var i=ELEMENTS.length-1;i>=0;i--){
		if(ELEMENTS[i].deleteMe){
			ELEMENTS.splice(i,1);
		}
	}
}

function getElementsByType(type){
	NEWLIST=[]
	for(var i=0;i<ELEMENTS.length;i++){
		if(ELEMENTS[i].type==type) NEWLIST.push(ELEMENTS[i]);
	}
	return NEWLIST
}


//Ground

function add_ground_block(x){
	ground_size=60
	type="Ground"
	vars={"x":x, "h": ground_size, "w": ground_size}
	function show(){
		image(images.grass,x-x_scroll%ground_size, height-ground_size, ground_size, ground_size);
	}
	ELEMENTS.push(new Element(type,vars,show,function(v){}));
}

function add_ground(){
	ground_size=60;
	for(var i=-2; i<20; i++){
		add_ground_block(i*ground_size);
	}
}


//Decoration
function add_decoration(x,y,w,h,img){
	type="Decoration"
	vars={"x":x, "y":y, "h": h, "w": w, "i":img};
	function show(){
		image(this.vars["i"](images), this.vars["x"]-x_scroll, height-this.vars["y"],this.vars["w"],this.vars["h"]);
	}
	ELEMENTS.push(new Element(type,vars,show,function(v){}));

}


//Platforms


function add_platform_block(x,y){
	platform_size=60
	type="Platform"
	vars={"x":x,"y":y, "w": platform_size, "h": platform_size}
	function show(){
		image(images.grass, this.vars["x"]-x_scroll, height-this.vars["y"],platform_size,platform_size);
	}

	ELEMENTS.push(new Element(type,vars,show,function(v){}));
}

function add_platform(x,y,length){
	platform_size=60
	for(var i=0;i<length;i++){
		add_platform_block(x+platform_size*i,y);
	}
}

function add_wall(x,y,length){
	platform_size=60
	for(var i=0;i<length;i++){
		add_platform_block(x,platform_size*i+y);
	}

}


//Main Character

//0 is left, 1 is right
char_direction=1

UP=0
RIGHT=0
BIRDX=0
BIRDY=0

SPEED_UP=5
SPEED_DOWN=8
SPEED_HOR=7
function spawn_main_character(x,y){
	char_height=80
	char_width=80
	type="Player"
	vars={"x":x,"y":y, "h":char_height, "w":char_width}
	function show(){
		if(char_direction==0)
			image(images.flapL, this.vars["x"]-x_scroll, height-this.vars["y"], char_width,char_height);
		if(char_direction==1)
			image(images.flapR, this.vars["x"]-x_scroll, height-this.vars["y"], char_width,char_height);
	}

	function move(){
		UP=0
		RIGHT=0
		if (keyIsDown(UP_ARROW)) {
			if (this.vars["y"]<780){
				this.vars["y"]+=SPEED_UP;
				UP+=1
			}
		}
		if (keyIsDown(DOWN_ARROW)) {
			if (this.vars["y"]>140){
				this.vars["y"]-=SPEED_DOWN;
				UP-=1
			}
		}
		if (keyIsDown(RIGHT_ARROW)) {
		    x_scroll += SPEED_HOR;
		    this.vars["x"]+=SPEED_HOR;
		    char_direction=1;
		    RIGHT+=1
		}
		if (keyIsDown(LEFT_ARROW)) {
		    if(x_scroll>-800){
		    	x_scroll -= SPEED_HOR;
		    	this.vars["x"]-=SPEED_HOR;
		    	char_direction=0;
		    	RIGHT-=1
		    }
		}
	    BIRDX=this.vars["x"]
	    BIRDY=this.vars["y"]
	}

	ELEMENTS.push(new Element(type,vars,show,move));
}



//Hearts

class FakeHeart{
	constructor(x,y,motion,d){
		this.vars={"x":x,"y":y,"w":20,"h":20,"motion":motion,"stage":0, "d":d}
	}
	moveMe(){
		this.vars["motion"](this);
	}
}

class FakeBird{
	constructor(x,y,up,right){
		this.vars={"x":x,"y":y,"w":80,"h":80}
	}
	moveMe(){
		if(UP==1){
			this.vars["y"]+=SPEED_UP
		}
		if(UP==-1){
			this.vars["y"]-=SPEED_DOWN
		}`
		if(RIGHT==1){
			this.vars["x"]+=SPEED_HOR
		}
		if(RIGHT==-1){
			this.vars["x"]-=SPEED_HOR
		}`
	}
}

collected=0
function spawn_heart(x,y,d=500){
	heart_height=20
	heart_width=20
	type="Heart"
	vars={"x":x,"y":y, "h":heart_height, "w":heart_width, "stage":0, "motion":stay, "d":d}
	function show(){
		image(images.heart, this.vars["x"]-x_scroll, height-this.vars["y"], this.vars["w"],this.vars["h"]);
	}

	//Moves

	SPEED=.15
	ANG=8
	function UR_Circ(elem){
		elem.vars["stage"]+=SPEED
		elem.vars["x"]+=Math.cos(elem.vars["stage"]*Math.PI/2)*ANG
		elem.vars["y"]+=Math.sin(elem.vars["stage"]*Math.PI/2)*ANG*2
	}

	function DL_Circ(elem){
		elem.vars["stage"]+=SPEED
		elem.vars["x"]-=Math.cos(elem.vars["stage"]*Math.PI/2)*ANG
		elem.vars["y"]-=Math.sin(elem.vars["stage"]*Math.PI/2)*ANG*2
	}

	function DR_Circ(elem){
		elem.vars["stage"]+=SPEED
		elem.vars["x"]+=Math.cos(elem.vars["stage"]*Math.PI/2/2)*ANG
		elem.vars["y"]-=Math.sin(elem.vars["stage"]*Math.PI/2/2)*ANG
	}

	function LU_Circ(elem){
		elem.vars["stage"]+=SPEED
		elem.vars["x"]-=Math.sin(elem.vars["stage"]*Math.PI/2)*ANG*1.5
		elem.vars["y"]+=Math.cos(elem.vars["stage"]*Math.PI/2)*ANG
	}

	function RU_Circ(elem){
		elem.vars["stage"]+=SPEED
		elem.vars["x"]+=Math.sin(elem.vars["stage"]*Math.PI/2)*ANG*1.5
		elem.vars["y"]+=Math.cos(elem.vars["stage"]*Math.PI/2)*ANG
	}



	function stay(elem){
		elem.vars["stage"]+=.25
	}

	//MOVES
	var motions=[UR_Circ,DL_Circ, DR_Circ,RU_Circ,LU_Circ];
	//Helpers
	function positionScore(bird,heart){
		dist_=heart.vars["d"];
		dBet=Math.abs(distance_between(bird,heart))
		if(dBet<500) score+=(500-dBet)*3
		dStage=Math.abs(heart.vars["d"]-heart.vars["x"])
		if(dStage>500) score+=(dStage-500)*3
		if(heart.vars["y"]>700) score+=(heart.vars["y"]-700)*100;
		if(heart.vars["y"]<100) score+=(heart.vars["y"])*100;
		if(heart.vars["x"]<000) score+=80;
		//if(heart.vars["x"]>10000) score+=80;
		return score
	}

	function move_score(bird,heart){
		score=0;
		it=0
		while(heart.vars["stage"]<1){
			bird.moveMe();
			heart.moveMe();
			score+=positionScore(bird,heart);
			it+=1
		}
		return score/it
	}

	function calcNextMove(elem){
		best_score=10**20
		best_motion=motions[0];
		for(var i=0;i<motions.length;i++){
			heart=new FakeHeart(elem.vars["x"],elem.vars["y"],motions[i],elem.vars["d"]);
			birb=new FakeBird(BIRDX,BIRDY,UP,RIGHT);
			score=move_score(birb,heart);
			if (score<best_score){
				best_score=score;
				best_motion=motions[i];
			}
		}
		elem.vars["motion"]=best_motion;
	}

	function move(){
		main=getElementsByType("Player")[0];
		if(areTouching(main,this)){
			this.deleteMe=true;
			collect_heart();
		}
		this.vars["motion"](this);
		if(this.vars["stage"]>=1.0){
			this.vars["stage"]=0;
			calcNextMove(this);
		}
	}
	ELEMENTS.push(new Element(type,vars,show,move));
}


function collect_heart(){
	heart_height=30
	heart_width=30
	type="Stolen_Heart"
	vars={"x":30+collected*40,"y":770, "h":heart_height, "w":heart_width}
	function show(){
		image(images.heart, this.vars["x"], height-this.vars["y"], this.vars["w"],this.vars["h"]);
		if(collected>9){
			window.location="https://wingsofwax.notion.site/Happy-Valentine-s-Day-a7c425587c6541bba4e3c565bfb58c5f?pvs=4"
		}
	}
	function move(){
	}
	ELEMENTS.push(new Element(type,vars,show,move));
	collected+=1;
}
