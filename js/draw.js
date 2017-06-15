var char = []
var glyph = []
var jhf = []
var path = []
var vhf = []
var fileString
var hershey = "star"
var mouseDown = false
var mouseX = 0
var mouseY = 0
var k = 0
var count = 0
var selected = -1 
var xmax = 0
var xmin = 0
var SBP
var lineX = 0 
var lineY = 0
var display = []
var displayScale = 1.2
var screenY = 70*displayScale

var tagCutout = []
var tagHole = {X:34,Y:25,R:2}
var toolRad = 8

var cutDepth = 0
var sf
var line = 0

var char = String.raw` 12JZRIPOJOOSMYRUWYUSZOTORI`

var mode = 2 //0=type, 1=submit

cutOut()

function cutOut(){

var tagWidth = 80+toolRad
var tagHeight = 50+toolRad
var tagRadius = 10

var X = ((tagWidth/2) - (tagRadius)) 
var Y = ((tagHeight/2) - (tagRadius))

for (i=0;i<=100;i++) {

	if((i>25)&&(i<50)){
		Y = (-(tagHeight/2) + (tagRadius))
	}
	else if((i>50)&&(i<75)){
		X = (-(tagWidth/2) + (tagRadius))
	}
	else if(i>75){
		Y = ((tagHeight/2) - (tagRadius))
	}
	
		tagCutout.push({X:(X+Math.sin((Math.PI*2)/100*i)*(tagRadius) ),Y:(Y+Math.cos((Math.PI*2)/100*i)*(tagRadius))})
	
}

tagCutout.push(tagCutout[0])

console.log(tagCutout)


}


function modeChange(){
	mode = parseInt(document.getElementById("toggle").value)
	draw()
}

function draw(){

	document.getElementById("fontLoad").style.display="none"

	if (mode==1){
		document.getElementById("paper").style.display="block"
		document.getElementById("submit").style.display="block"
		document.getElementById("backspace").style.display="block"
		$('.trash-icon').show()
		screen()
	}
	else if(mode==0){
		document.getElementById("paper").style.display="none"
		document.getElementById("submit").style.display="none"
		document.getElementById("backspace").style.display="none"
		$('.trash-icon').hide()
	}
	else if(mode==2){
		document.getElementById("paper").style.display="none"
		//document.getElementById("submit").style.display="none"
		//document.getElementById("backspace").style.display="none"
		//$('.trash-icon').hide()
		document.getElementById("size").style.display="none"
		//document.getElementById("fontSelect").style.display="none"
		demo()
		screenY=170
	}

	c = document.getElementById("myCanvas")
	ctx = c.getContext("2d")

	ctx.canvas.width = $(window).innerWidth()-70

	var ymax = Math.round((Math.ceil((path.length*70)/ctx.canvas.width )*70))

	if( ($(window).innerHeight()-140) < (ymax+screenY)   ){
		ctx.canvas.height = ymax+screenY+140
	}
	else{
		ctx.canvas.height = $(window).innerHeight()-70
	}
	
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
	//ctx.lineJoin="round"
	//ctx.lineCap="round"
	ctx.lineWidth=1
	ctx.strokeStyle="#444"
	ctx.fillStyle="#ddd"

	var glyphNum = 96
	var row = 1

	var x = 20
	var y = 50

	if (mode==1){
		y+=screenY+10
	}
	else if (mode==2){
		y+=screenY+10
	}

	for(i=0;i<path.length;i++){
		ctx.beginPath()

		if((mouseX<x+50)&&(mouseX>=x-10)&&(mouseY<y+50)&&(mouseY>=y-10)){
			if(mouseDown==true){
				ctx.fillStyle="#ccc"
				selected = i
			}
			else{
				ctx.fillStyle="#fff"
			}
		}
		else{
			ctx.fillStyle="#ddd"
		}

		ctx.fillRect(x-10,y,60,40)
		ctx.fill()

		ctx.beginPath()
		ctx.fillRect(x,y-10,40,60)
		ctx.fill()	
	
		ctx.beginPath()
		ctx.arc(x,y,10,0,(Math.PI*2))
		ctx.fill()

		ctx.beginPath()
		ctx.arc(x+40,y,10,0,(Math.PI*2))
		ctx.fill()

		ctx.beginPath()
		ctx.arc(x+40,y+40,10,0,(Math.PI*2))
		ctx.fill()

		ctx.beginPath()
		ctx.arc(x,y+40,10,0,(Math.PI*2))			
		ctx.fill()
	
		if(x>=ctx.canvas.width-130){
			x=20
			y+=70
		}
		else{
			x+=70
		}
	}


	x = 40
	y = 70
	if (mode==1){
		y+=screenY+10
	}
	else if (mode==2){
		y+=screenY+10
	}

	for(i=0;i<path.length;i++){		
		for(j=0;j<path[i].length;j++){
			ctx.beginPath()
			for(l=0;l<path[i][j].length;l++){
				ctx.lineTo( parseFloat((x+(path[i][j][l].X))), parseFloat(y+(path[i][j][l].Y)) )
			}
			ctx.stroke()
		}
		if(x>=ctx.canvas.width-110){
			x=40
			y+=70
		}
		else{
			x+=70
		}
	}

}


function screen(){

	c2 = document.getElementById("paper")
	ctx2 = c2.getContext("2d")

	ctx2.canvas.width = (($(window).innerWidth()-40)-110)
	ctx2.canvas.height = screenY

	ctx2.lineJoin="round"
	ctx2.lineCap="round"
	//console.log(ctx2.canvas.width)
	x=10
	y=35*displayScale+5
	ctx2.lineWidth=displayScale

	for(i=0;i<display.length;i++){

		x+=(Math.abs(display[i][0][0].L*(displayScale+2)))

		if(display[i][0][0].N==true){
			y+=(70*displayScale)
			x=10
		}
		
		for(j=0;j<display[i].length;j++){
			ctx2.beginPath()
			for(l=0;l<display[i][j].length;l++){
				ctx2.lineTo( parseFloat((x)+(display[i][j][l].X*(displayScale+2))), parseFloat(y+(display[i][j][l].Y*(displayScale+2))) )
			}
			ctx2.stroke()
		}

			x+=(display[i][0][0].R*(displayScale+2))
	}

	ctx2.fillStyle = "#eee" 
	
	ctx2.beginPath()
	ctx2.fillRect(x,10+(screenY-(70*displayScale)),3,(50*displayScale))
	ctx2.fill()
}

function displayTxt(g){

	display.push(g)
	draw()
}

function demo(){

	var tagScale = 3
	c3 = document.getElementById("paper2")
	ctx3 = c3.getContext("2d")
	ctx3.canvas.width = 80*tagScale+2+(toolRad*tagScale)
	ctx3.canvas.height = 50*tagScale+2+(toolRad*tagScale)

	ctx3.strokeStyle = "#000"
	ctx3.fillStyle = "rgba(100,100,255,0.3)"


	ctx3.beginPath()
	for(i=0;i<tagCutout.length;i++){
		ctx3.lineTo((tagCutout[i].X*tagScale+(ctx3.canvas.width/2)),tagCutout[i].Y*tagScale+(ctx3.canvas.height/2))
	}
	ctx3.moveTo(ctx3.canvas.width/2+36*tagScale,ctx3.canvas.height/2)
	ctx3.fill()
	ctx3.stroke()

	ctx3.lineWidth=2
	ctx3.strokeStyle = "#fff"

	var x=ctx3.canvas.width/2-(38*tagScale)+0
	var y=ctx3.canvas.height/2-(25*tagScale)+15

	for(i=0;i<display.length;i++){

		x+=(Math.abs(display[i][0][0].L))

		if(display[i][0][0].N==true){
			y+=30
			x=ctx3.canvas.width/2-(38*tagScale)+0
		}
		
		for(j=0;j<display[i].length;j++){
			ctx3.beginPath()
			for(l=0;l<display[i][j].length;l++){
				ctx3.lineTo( parseFloat((x)+(display[i][j][l].X)), parseFloat(y+(display[i][j][l].Y)) )
			}
			ctx3.stroke()
		}

			x+=(display[i][0][0].R)
	}


	ctx3.beginPath()
	ctx3.fillRect(x+2,y-10,3,20)
	ctx3.fill()

}


function displayTag(g){

	display.push(g)
	draw()
}


$(window).resize(function(){
	draw()
})


function space(){
	if(mode>=1){

	var S = [[{L:-8,R:8}]]
	displayTxt(S)

	}
	else{
		SBP = ""
		SBP +="JZ,0.5\n"
		lineX += parseFloat(0.5*sf)
		SBP +="JX," + ((lineX).toFixed(4)) + "\n"
		fabmo.runSBP(SBP)
	}
}

function enter(){
	if(mode>=1){
		screenY+=(70*displayScale)
		//sf = document.getElementById("size").value
		var R = [[{L:0,R:0,N:true}]]
		if(mode==1){
		displayTxt(R)
		}
		else{
		displayTag(R)
		}

	}
	else{
		SBP = ""
		SBP +="JZ,0.5\n"
		lineY += parseFloat(sf) 
		SBP +="J2," + (0) + "," + ((0-lineY).toFixed(4)) + "\n"
		fabmo.runSBP(SBP)
		lineX = 0
	}
}

function backspace(){
	if(mode>=1){
		display.pop()
		draw()
	}

}

