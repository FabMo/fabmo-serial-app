function parseFont(){

	fileString = fileString.replace( /\n/g, '' )
	fileString = fileString.replace( /(\b\d{5}\b|\s\b\d{4}\b|\s{2}\b\d{3}\b)/g,"12345" )
	fileString = fileString.replace( /\sR/g,"--" )

	vhf = fileString.split('12345')
	
	for(i=0;i<vhf.length;i++){
		if(vhf[i].length<=7){
			vhf.splice(i,1)
			i--
		}
	}

	yo = 0-($(window).innerHeight()/2)+100
	xo = 0-($(window).innerWidth()/2)+100
	row=0
	glyph = []
	path = []

	for(k=0;k<vhf.length;k++){		

		char = vhf[k]
		glyph = []

		if(k==0){

		}
		else{
			xo += 50
		}

		makeChar()
	
	}

	draw()

}


function makeChar(){

	count = parseInt(((char.charAt(0) + char.charAt(1) + char.charAt(2)))*2)

	for(i=3;i<count+3;i=i+2){

		if( (i==3) || ((char.charAt(i)+char.charAt(i+1)) == "--")  ){
			glyph.push([])		
		}
		else{
			if(i==5){
				glyph[glyph.length-1].push({X:parseFloat((char.charAt(i).charCodeAt(0))-82),Y:parseFloat((char.charAt(i+1).charCodeAt(0))-82),L:(parseFloat((char.charAt(3).charCodeAt(0))-82)),R:(parseFloat((char.charAt(4).charCodeAt(0))-82))})
			}
			else{
				glyph[glyph.length-1].push({X:parseFloat((char.charAt(i).charCodeAt(0))-82),Y:parseFloat((char.charAt(i+1).charCodeAt(0))-82)})
			}
		}
	}
	path.push(glyph)	
}
