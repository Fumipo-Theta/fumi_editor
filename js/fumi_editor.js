	(function(){
		/* ajax loading */
		var loadObj={
			menu_bar:{
				url:"./comp/menu_master.html",
				target:"#menu_bar",
			},
			sectionApp:{
				url:"./comp/sectionAppender.html",
				target:"#sectionAppender",
			},
			figureApp:{
				url:"./comp/figureAppender.html",
				target:"#figureAppender",
			},
		
		};

		for (var key in loadObj){
		(function(obj){
			$.ajax({
				type: "GET",
				url: obj.url,
				cache: true,
				async: false,
				dataType: "html",
				success: function(data){
					//console.log(data)
					$(obj.target).html($(data)).trigger("create");
				},
				error: function(){
					//console.log(obj)
					alert("Failed to load html: "+obj.url);
				}
			});
		})(loadObj[key]);
		};
	})();

window.onload=function(){
	/* section append */
	document.getElementById("button__section_append").onclick=function(){
		var newSection=d3.select("#sections").append("div").attr("class","item");
		newSection.append("h2").text("Section title");
		newSection.append("div").attr("class","content").append("p").text("content");
	};
	
	/* figure append */
	document.getElementById("button__figure_append").onclick=function(){
		var figId=document.getElementById("figureId").value;
		var figUrl=document.getElementById("figureUrl").value;
		
		if(! figureUrl) return alert("Input URL for image file.");
		if(! figId) return alert("Input figure name.");
		
			var newFigure=d3.select("#figures").append("div").attr("id",figId).attr("class","item");
			newFigure.append("div").attr("class","title").text("Figure (#"+figId+")");
			newFigure.append("div").attr("class","content fig")
				.append("a").attr("href",figUrl).attr("target","_blank")
				.append("img").attr("src",figUrl).attr("alt",figId).attr("title",figUrl);
			newFigure.select(".content.fig").append("p").attr("class","caption").text("caption");
	}
	
	/* save as html file */
	document.getElementById("button__save_as_file").onclick=function(){
		var htmlContents=document.getElementsByTagName("html")[0].innerHTML;
		var blob=new Blob([htmlContents],{type: "text/plain"});
		var url=window.location.href;
		var fileName=url.match(".+/(.+?)([\?#;].*)?$")[1];
		
		if(fileName == "initial.html") fileName="new.html";
		
		var a=document.createElement("a");
		a.href=URL.createObjectURL(blob);
		a.target="_blank";
		a.download=fileName;
		a.click();
	};
	
	//editArea=document.getElementById("main");
	//editArea.contentEditable=false;

	/* checkSelectionText */
	function checkSelectionText() { 
		var selectionFlag = ( 
 		document.getSelection().toString().length > 0); 
 		if (!selectionFlag) { 
  		alert('文字が選択されていません。\n文字を選択してください。'); 
  	} 
    return selectionFlag; 
  } 
  
  /* edit start */
  document.getElementById("button__edit_start").onclick=function(){
  	var editArea=document.getElementById("main");
  		editArea.contentEditable=true;
  		//alert("edit start")
  	d3.select("#button__edit_start").attr("style","background-color: #999922");
  }
  
  /* edit end */
  document.getElementById("button__edit_end").onclick=function(){
  	var editArea=document.getElementById("main");
  		editArea.contentEditable=false;
  		//alert("edit end")
  	d3.select("#button__edit_start").attr("style","");
  }
	
	/* set bold */
	document.getElementById("setBold").onclick=function(){
		if (checkSelectionText()){
			document.execCommand('bold');
		}
	}
	
	/* set italic */
	document.getElementById("setItalic").onclick=function(){
		if (checkSelectionText()){
			document.execCommand('italic');
		}
	}
	
	/* create link */
	document.getElementById("crtLink").onclick=function(){
		if (checkSelectionText()){
			var url=document.getElementById("urlBox").value;
			if (url)document.execCommand('createLink', false, url);
			d3.selectAll("a").each(function(d){
				var a=d3.select(this)
				var hashtag=a.attr("href");
				var reg=new RegExp(/^#/);
				
				if( ! reg.test(hashtag) ) a.attr("target","_blank");
				
			});
		}
	}
	
	/* append referrence */
	document.getElementById("button__append_refList").onclick=function(){
		var refList=d3.select("#refList").append("li");
		
	}
}