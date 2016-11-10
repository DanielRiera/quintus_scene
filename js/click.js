$(".generateScene").on("click", function(){
	var width = $(".width_scene").val();
	var height = $(".height_scene").val();
	var number = $(".objects_tiles").val();
	var widthCell = $(".width_cell").val();
	urlTiles = $(".urlTiles").val();
	console.log("Generating a scene ("+width+") for ("+height+")");
	GS.generationScene(width, height, number,widthCell);
});

$(".closeConfig").on("click", function(){
	$(".config").fadeOut(100);
});

$(".openConfig").on("click", function(){
	$(".config").fadeIn(100);
});
$(".export").on("click", function(){
	GS.exportBackground();
	GS.exportCollision();
});
$('td').hover(function(){   
   var $this = $(this);
   var col   = $this.index();
   var row   = $this.closest('tr').index();

   $(".position").html( [col,row].join(',') );
});