function fontChange(){

	hershey = document.getElementById("fontSelect").value 

	jQuery.get(hershey, function(data) {
		fileString = data
	})
	.done(function() {
		parseFont()
	})
}

function startRead(){  
	var file = document.getElementById('fontLoad').files[0];
	if(file){
		getAsText(file)    
	}
}

function getAsText(readFile){
	var reader

	try{
		reader = new FileReader()
	}

	catch(e){
		console.log("Error: seems File API is not supported on your browser")
		return;
	  }
   
  reader.readAsText(readFile, "UTF-8")
  reader.onload = loaded;
  reader.onerror = errorHandler;
}

function loaded(e){   
	fileString = e.target.result;
	parseFont()
}

function errorHandler(e)
{
  if(e.target.error.code == e.target.error.NOT_READABLE_ERR)
	{
		console.log("Error reading file...")
  }
}
