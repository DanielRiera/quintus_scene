var GS = {
	initial: function(){
		console.log("Ok System");
		tilesActive = null;
		totalWidth = 0;
		widthCell = 32;
		urlTiles = "images/tiles.png";
		clicking = true;
	},
	generationScene: function(width, height, number,widthCell){
		var rows = "";
		totalWidth = width;
		for(i=0;i<width;i++) {
			var rows = rows + "<td data-i='"+i+"' class='cell'></td>";
		}
		var scene = $(".scene table");
		scene.css({
			'width': width*widthCell+'px',
			'height': height*widthCell+'px',

		});
		for(i=0;i<height;i++) {
			scene.append("<tr>"+rows+"</tr>");
		}
		$(".config").fadeOut(100);
		//Generating Objects
		GS.prepareSprite(number,widthCell);
	},
	prepareSprite: function(number,widthCell) {
		$(".objects").html("<h2>Objects</h2><ul>");
		objects = new Array();
		for(i=0;i<number;i++) {
			var pos = '-'+parseInt(widthCell*i);
			objects.push(pos);
			var background = 'background: url("'+urlTiles+'") '+pos+'px 0;';
			$(".objects").append("<li><div class='selectObject' data-i='"+i+"' style='width:"+widthCell+"px;height:"+widthCell+"px;"+background+"'></div><input type='number' data-i='"+i+"' class='collision' value='0' /><a class='allCells' data-i='"+i+"'>All</a></li>");
		}
		$(".objects").append("</ul>");
		console.log(objects);
		$(".selectObject").on("click", function(){
			tilesActive = $(this).attr("data-i");
			console.log("Tile active is " + tilesActive);
		});
		$('.cell').mousedown(function(){
    		clicking = true;
    		
		});
		$('.cell').mouseup(function(){
    		clicking = false;
    		
		});
		$(".cell").mousemove(function(){
			if(clicking === false && tilesActive!=null) return;

			var pos = objects[tilesActive];
			$(this).css({
				'width': '32px',
				'background-image': 'url("'+urlTiles+'")',
				'background-position': pos+'px 0',
				'height': '32px'
			});
			console.log("Cell - " + pos);
			$(this).attr("data-value",tilesActive);
		});
		$(".cell").click(function(){
			if(tilesActive!=null) {
				var pos = objects[tilesActive];
				$(this).css({
					'width': '32px',
					'background-image': 'url("'+urlTiles+'")',
					'background-position': pos+'px 0',
					'height': '32px'
				});
				console.log("Cell - " + pos);
				$(this).attr("data-value",tilesActive);
			}
		});
		$(".allCells").on("click", function(){
			console.log("Add all style");
			var objectSelectAll = $(this).attr("data-i");
			tilesActive = objectSelectAll;
			var pos = objects[$(this).attr("data-i")];
			$(".scene table tr td").css({
				'width': widthCell+'px',
				'background-image': 'url("'+urlTiles+'")',
				'background-position': pos+'px 0',
				'height': widthCell+'px'
			}).attr("data-value",objectSelectAll);
		});
		$('.cell').hover(function(){   
		   var $this = $(this);
		   var col   = $this.index();
		   var row   = $this.closest('tr').index();

		   $(".position").html( [col+1,row+1].join(',') );
		}, function(){
			$(".position").html('');
		});
	},
    exportBackground: function(){
        var scene = $(".scene table tr td");
        console.log(scene.length);
        var background = new Array();
        var rowsLine = new Array();
        for(i=0;i<scene.length;i++) {
            if (i % totalWidth === 0) {
            var rowsLine = new Array();
            }
            var value = $(".scene table tr td:eq("+i+")").attr("data-value");
            if(value==null || value=="") {
                value = 0;
            }
            rowsLine.push(value);
            if (parseInt(i+1) % totalWidth === 0) {
                background.push(rowsLine);
                var rowsLine = new Array();
            }
            
        }
        GS.downloadFile("level_background.json", JSON.stringify(background));
    },
    exportCollision: function() {
        var scene = $(".scene table tr td");
    console.log(scene.length);
    var collision = new Array();
    var line = new Array();
    for(i=0;i<scene.length;i++) {
        if (i % totalWidth === 0) {
        var line = new Array();
        }
        var value = $(".scene table tr td:eq("+i+")").attr("data-value");
        var valueCollision = $(".collision[data-i='"+value+"']").val();
        if(valueCollision==null || valueCollision=="") {
            valueCollision = 0;
        }
        line.push(valueCollision);
        if (parseInt(i+1) % totalWidth === 0) {
            collision.push(line);
            var line = new Array();
        }
        
    }
    GS.downloadFile("level_collision.json", JSON.stringify(collision));
    },
    downloadFile: function(name, contents){
		mime_type = "application/json";

        var blob = new Blob([contents], {type: mime_type});

        var dlink = document.createElement('a');
        dlink.download = name;
        dlink.href = window.URL.createObjectURL(blob);
        dlink.onclick = function(e) {
            // revokeObjectURL needs a delay to work properly
            var that = this;
            setTimeout(function() {
                window.URL.revokeObjectURL(that.href);
            }, 1500);
        };

        dlink.click();
        dlink.remove();
    },
    uploadScene: function(data) {
    	var text = JSON.parse(data);
    	var scene = $(".scene table tr td");
        //var sceneExist = new Array();
        //var rowsSceneExist = new Array();
        console.log("Objectos es " + JSON.stringify(objects));
       	var b = -1;
       	var i = 0;
        for(i=0;i<scene.length;i++) {
        	if (i % totalWidth === 0) {
                b++;
                i=0;
            }
        	var index = text[b][i];
             var pos = objects[index];
            $(".scene table tr:eq("+b+") td:eq("+i+")").css({
            	'width': widthCell+'px',
				'background-image': 'url("'+urlTiles+'")',
				'background-position': pos+'px 0',
				'height': widthCell+'px'
            }).attr("data-value",index);
            
           
            console.log("Cargado desde archivo BACKGROUND " + JSON.stringify(index) + " con b en " +b+" con i en " + i);
        }
        
    }

};