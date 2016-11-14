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
	$(".modal").fadeOut(100);
});

$(".openConfig").on("click", function(){
	$(".config").fadeIn(100);
});
$(".export").on("click", function(){
	//GS.exportBackground();
	//GS.exportCollision();
	GS.exportLevel();
});
$(".generateWithExist").on("click",function(){
	var text = $(".text_exist").val();
	$(".modal").fadeOut(100);
	GS.uploadScene(text);

});
$(".Openusing").on("click", function(){
	$(".using").fadeIn(100);
});
$(".addElement").on("click", function(){
	var title = $(".newPersonalElement").val();
	var r = Math.round(Math.random()*255);
	var g = Math.round(Math.random()*255);
	var b = Math.round(Math.random()*255);
	var a = 0.5; //transparencia entre 0 a 1
	var color_aleatorio = "rgba("+r+", "+g+", "+b+", "+a+")";
	$(".list_personalElement").append("<li data-value='"+title+"' data-color='"+color_aleatorio+"' class='elementPersonal' style='background-color:"+color_aleatorio+"'>"+title+"</li>");
	$(".newPersonalElement").val('');
	var element = $(".elementPersonal").attr("data-value");
	tilesActive = "pe";
	personalElement = title;
	var arr_element = new Array(title);
	arrayElements.push(arr_element);
		$(".elementPersonal").on("click", function(){
			personalElement = $(this).attr("data-value");
			$(".selectObject").css("border","1px solid #CCC");
			tilesActive = "pe";
		});
});
