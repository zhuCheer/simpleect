//作者：zhuCheer QQ:zhu.cheer@qq.com
(function($){
	$.fn.cutWord=function(settings){
	var settings=$.extend({
			strlen:25,
			spread:0,
			notcut:"shouqi",
			incut:"zhankai"
		},settings||{});
		return this.each(function(index,element){
			var thisObj=$(this);
			var alldata=$.trim(thisObj.text());
			var status=null;
			if(settings.spread){
				thisObj.html("<span class='cut-data'>"+alldata+"</span> <a class='cuts-btn' href='javascript:void(0);' status='notcut'>"+settings.notcut+"</a>");
			}else{
				thisObj.html("<span class='cut-data'>"+$.trim(alldata.substr(0,settings.strlen))+"...</span> <a class='cuts-btn' href='javascript:void(0);' status='incut'>"+settings.incut+"</a>");
			}
			thisObj.children("a.cuts-btn").bind("click",function(){
				var status=$(this).attr("status");
				var dataObj=$(this).prev("span.cut-data");
				if(status=="notcut"){
					dataObj.html($.trim(alldata.substr(0,settings.strlen))+"...");
					$(this).attr("status","incut").html(settings.incut);
				}else if(status=="incut"){
					dataObj.html(alldata);
					$(this).attr("status","notcut").html(settings.notcut);
				}
			});
			
			//alert(thisObj.text());
		});
	}
	$.fn.floatBox=function(settings){
		var settings=$.extend({
			speed:20,
			position:{left:50,top:50},
			step:1,
			onstop:1
		},settings||{});
		return this.each(function(index,element){
			var thisObj=$(this);
			var thisWith=thisObj.width();
			var thisHeight=thisObj.height();
			thisObj.css({"position":"absolute","left":settings.position.left+"px","top":settings.position.top+"px"});
			var documentWidth=$(document).width()-thisWith;
			var documentHeight=$(window).height()-thisHeight;
			var scrollTops=null;
			$(window).scroll(function() {
			 documentWidth=$(document).width()-thisWith;
			 documentHeight=$(window).height()-thisHeight+$(window).scrollTop();
			 scrollTops=parseInt($(window).scrollTop());
			 var relationHeight=parseInt(thisObj.css("top"))-scrollTops;//相对屏幕顶部距离
			 if(relationHeight<=settings.position.top){
			 	relationHeight=settings.position.top;
			 }else if((relationHeight+scrollTops)>=documentHeight){
				relationHeight=documentHeight-scrollTops;
			 }
			thisObj.stop().fadeOut();//跟着屏幕跑
			thisObj.stop().fadeIn(100).animate({"top":scrollTops+relationHeight+"px"},300);
			});//scroll-end
			
			
			//XMove
			var leftFlag=1;
			var topFlag=1;
			var timesetX=null;
			var timesetY=null;
			var rightMove=function(){//向右飘
			var thisLeft=parseInt(thisObj.css("left"));
			var tmp=null;
				if(thisLeft+settings.step<documentWidth){
					tmp=thisLeft+settings.step;
				}else{
					tmp=documentWidth;
				}
				thisObj.css("left",tmp+"px");
				if(thisLeft>=documentWidth-settings.step){
					leftFlag=0;
					clearInterval(timesetX);
					xmove(leftFlag);
					
				}
				
			}
			var leftMove=function(){//向左飘
			var thisLeft=parseInt(thisObj.css("left"));
			var tmp=null;
				if(thisLeft-settings.step>0){
					tmp=thisLeft-settings.step;
				}else{
					tmp=0;
				}
				thisObj.css("left",tmp+"px");
				if(thisLeft<=0){
					leftFlag=1;
					clearInterval(timesetX);
					xmove(leftFlag);
				}
			}
			function xmove(pos){
				if(pos){
					clearInterval(timesetX);
					 timesetX=setInterval(rightMove,settings.speed);
				}else{
					clearInterval(timesetX);
					 timesetX=setInterval(leftMove,settings.speed);
				}
			}
			//YMove
			var downMove=function(){//向下飘
			var thisTop=parseInt(thisObj.css("top"));
			var tmp=null;
				if(thisTop+settings.step<documentHeight){
					tmp=thisTop+settings.step;
				}else{
					tmp=documentHeight;
				}
				thisObj.css("top",tmp+"px");
				if(thisTop>=documentHeight){
					topFlag=0;
					clearInterval(timesetY);
					ymove(topFlag);
					
				}
			}
			var upMove=function(){//向上飘
			var thisTop=parseInt(thisObj.css("top"));
				var tmp=null;
				if(thisTop-settings.step>scrollTops){
					tmp=thisTop-settings.step;
				}else{
					tmp=0+scrollTops;
				}
				thisObj.css("top",tmp+"px");
				if(thisTop<=scrollTops){
					topFlag=1;
					clearInterval(timesetY);
					ymove(topFlag);
				}
			}
			function ymove(pos){
				if(pos){
					clearInterval(timesetY);
					 timesetY=setInterval(downMove,settings.speed);
				}else{
					clearInterval(timesetY);
					 timesetY=setInterval(upMove,settings.speed);
				}
			}			
			xmove(leftFlag);
			ymove(topFlag);
			if(settings.onstop){
			thisObj.mouseover(function(){
				clearInterval(timesetX);
				clearInterval(timesetY);
			});//鼠标经过
			thisObj.mouseout(function(){
				clearInterval(timesetX);
				clearInterval(timesetY);
				if(leftFlag){
					 timesetX=setInterval(rightMove,settings.speed);
				 }else{
					 timesetX=setInterval(leftMove,settings.speed);
				}
				if(topFlag){
					 timesetY=setInterval(downMove,settings.speed);
				 }else{
					 timesetY=setInterval(upMove,settings.speed);
				}
			});//鼠标移开
			}//if-end
		});
	}
	
	$.fn.rollAction=function(settings){
			var settings=$.extend({
				speed:40,
				direction:'left',
				onstop:1
			},settings||{});
			this.css('overflow','hidden');			
		
			return this.each(function(index,element){
				var thisObj=$(this);
				var html=thisObj.html();
				if(settings.direction=='left'||settings.direction=='right'){
					thisObj.html("<div class='cell-box' style='float:left;'>"+html+"</div>");
				}
				if(settings.direction=='up'||settings.direction=='down'){
					thisObj.html("<div class='cell-box' style='height:auto;'>"+html+"</div>");
				}
				thisObj.children(".cell-box").wrap("<div class='roll-box' ></div>");
				var thisBox=thisObj.children(".roll-box");
				var cellBox=thisBox.children(".cell-box");
				if(settings.direction=='left'||settings.direction=='right'){
					thisBox.css({
						"width":"999999px",
						"height":"100%",
						"cursor":"pointer"
					});	
				}
				if(settings.direction=='up'||settings.direction=='down'){
					thisBox.css({
						"width":"100%",
						"height":"9999999px",
						"cursor":"pointer"
					});	
				}
				var objWidth=cellBox.width();
				var objHeight=cellBox.height(); 
				var customerWidth=thisObj.width();//用户div宽度
				var customerHeight=thisObj.height();//用户div高度
				if((customerHeight<objHeight)||(customerWidth<objWidth)){
					thisBox.append(thisBox.html());
				}
				//元素布局完成
				
				var leftAction=function (){//左滚动方法
					thisObj.scrollLeft(thisObj.scrollLeft()+1);
					if(thisObj.scrollLeft()>=objWidth){
						thisObj.scrollLeft(0);
					}
				}
				var rightAction=function (){//右滚动方法
					if(thisObj.scrollLeft()==0){
						thisObj.scrollLeft(objWidth);
					}
					thisObj.scrollLeft(thisObj.scrollLeft()-1);
				}
				var upAction=function (){//上滚动方法
					thisObj.scrollTop(thisObj.scrollTop()+1);
					if(thisObj.scrollTop()>=objHeight){
						thisObj.scrollTop(0);
					}
				}
				var downAction=function (){//下滚动方法
					if(thisObj.scrollTop()==0){
						thisObj.scrollTop(objHeight);
					}
					thisObj.scrollTop(thisObj.scrollTop()-1);
				}
				//滚动方法结束
			
				if(customerWidth<objWidth){//内容宽度小于用户div宽度则不滚动
					switch(settings.direction){
						case 'left':
						var timeset=setInterval(leftAction,settings.speed);
						break;
						case 'right':
						var timeset=setInterval(rightAction,settings.speed);
						break;
					}
				}
				if(customerHeight<objHeight){//内容高度小于用户div高度则不滚动
					switch(settings.direction){
						case 'up':
						var timeset=setInterval(upAction,settings.speed);
						break;
						case 'down':
						var timeset=setInterval(downAction,settings.speed);
						break;
					}
				}
				thisObj.mouseover(function(){
					if(settings.onstop){
					clearInterval(timeset);
					}
				});
				if((customerHeight<objHeight)||(customerWidth<objWidth)){
					thisObj.mouseout(function(){
						if(settings.onstop){
							clearInterval(timeset);
							switch(settings.direction){
								case 'left':
								timeset=setInterval(leftAction,settings.speed);
								break;
								case 'right':
								timeset=setInterval(rightAction,settings.speed);
								break;
								case 'up':
								timeset=setInterval(upAction,settings.speed);
								break;
								case 'down':
								timeset=setInterval(downAction,settings.speed);
								break;
							}
						}
					});
				}
			});//end-each
	}
	
	$.fn.focusImg1=function(settings){
         var settings=$.extend({
                   speed:3000,
                   zindex:999,
				   delay:800,
				   cycle:1,
                   tag:"img"
              },settings||{});

         

         return this.each(function(index,element){

                   var thisObj=$(this);

                   thisObj.css({"position":"relative","z-index":settings.zindex});

                   thisObj.children(settings.tag).css({"position":"absolute","left":0,"top":0,"z-index":settings.zindex});

                   thisObj.children(settings.tag).hide().eq(0).show().attr("show","1");
				if(settings.cycle!=1){	
					var imgFlag=0;
				}
				var picAct=function(){
				  var objCount=thisObj.children(settings.tag).length;
				  var showStatus=thisObj.children(settings.tag+"[show='1']");
                  var currentObj=showStatus.index();//当前图片index
				  if(currentObj>=objCount-1){
					  thisObj.children(settings.tag+":eq(0)").show().css("z-index",settings.zindex-1).attr("show","1");
				  }else{
					 thisObj.children(settings.tag+":eq("+parseInt(currentObj+1)+")").show().css("z-index",settings.zindex-1).attr("show","1");
				  }
				  showStatus.css("z-index",settings.zindex+1).removeAttr("show").fadeOut(settings.delay);
				  if(settings.cycle!=1){	
				  imgFlag++;
					  if(imgFlag>=objCount-1){
						  clearInterval(timeset);
					  }
				  }
				}
               var timeset=setInterval(picAct,settings.speed);  
         });

     }//end-fn

	 
	$.fn.focusImg2=function(settings){
		 var settings=$.extend({
			   speed:3000,
			   zindex:999,
			   delay:800,
			   cycle:1
		  },settings||{});
		
		   return this.each(function(index,element){
			   var thisObj=$(this);
			   var objWidth=parseInt(thisObj.width());
			   var objHeight=parseInt(thisObj.height());
			   var objCount=thisObj.children().size();
			   var maxLeft=objWidth*(objCount-1);
			   if(objCount<=1){
				return false;//只有一个图片则不进行轮换
				}
//				if(!objWidth){
//					alert("第"+(index+1)+"个焦点图对象需要定义固定宽度");
//					return false;
//				}
				thisObj.css({"overflow":"hidden","position":"relative"});
				thisObj.children().css({"float":"left","width":objWidth}).wrapAll("<div style='width:9999px;position:absolute; left:0;' class='focusWrap'></div>");
				if(settings.cycle!=1){	
					var imgFlag=0;
				}
				var leftMoveAct=function(){
				var currentLeft=parseInt(thisObj.children(".focusWrap").css("left"));
				
				if(currentLeft<=-maxLeft){
					thisObj.children(".focusWrap").animate({"left":"0px"},settings.delay);
				}else{
					thisObj.children(".focusWrap").animate({"left":(currentLeft-objWidth)+"px"},settings.delay);
				}
				
					if(settings.cycle!=1){	//判断是否循环播放
					  imgFlag++;
						  if(imgFlag>=objCount-1){
							  clearInterval(timeset);return false
						  }
					 }
					  var timeset=setTimeout(leftMoveAct,settings.speed); 
				}					
				setTimeout(leftMoveAct,settings.speed);
		   });	 
								
		   
			 
	}//end-fn
	
	$.fn.focusImg3=function(settings){
		var settings=$.extend({
			   speed:3000,
			   zindex:999,
			   delay:800,
			   cycle:1
		  },settings||{});
		 return this.each(function(index,element){
		   var thisObj=$(this);
		   var objWidth=parseInt(thisObj.width());
		   var objHeight=parseInt(thisObj.height());
		   var objCount=thisObj.children().size();
		   if(objCount<=1){
			return false;//只有一个图片则不进行轮换
			}
			thisObj.css({"overflow":"hidden","position":"relative"});
			thisObj.children().css({"position":"absolute","width":objWidth,"display":"block"});
			for(var i=1;i<objCount;i++){
				thisObj.children().eq(i).hide().css({"z-index":settings.zindex});
			}
			var flag=0;
			if(settings.cycle!=1){	
				var imgFlag=0;
			}
			var timeset=null;
			
			var leftMoveAct=function(){//向左飞
				if(flag>=objCount-1){
					thisObj.children().eq(0).show().css({"z-index":settings.zindex+1,"left":objWidth});
					thisObj.children().eq(flag).css({"z-index":settings.zindex});
					thisObj.children().eq(0).animate({left:0},settings.delay,function(){
						thisObj.children().eq(flag).hide();
						flag=0;
					});
					
				}else{
					thisObj.children().eq(flag+1).show().css({"z-index":settings.zindex+1,"left":objWidth});
					thisObj.children().eq(flag).css({"z-index":settings.zindex});
					thisObj.children().eq(flag+1).animate({left:0},settings.delay,function(){
						thisObj.children().eq(flag).hide();
						flag++;
					});
				}
				if(settings.cycle!=1){	//判断是否循环播放
				  imgFlag++;
				  if(imgFlag>=objCount-1){
					  clearInterval(timeset);return false
				  }
				 }
			}//end-moveAct
			
/*			var rightMoveAct=function(){//向右飞
				if(flag>=objCount-1){
				
				}else{
				
				}
				if(settings.cycle!=1){	//判断是否循环播放
				  imgFlag++;
				  if(imgFlag>=objCount-1){
					  clearInterval(timeset);return false
				  }
				}
			}*/
			
			
			
			timeset=setInterval(leftMoveAct,settings.speed);
			
			
			
			
		 });
		
		
	}//end-fn

$.fn.hoverBtn=function(settings){
	var settings=$.extend({
		   type:"show"
	  },settings||{});
	
      return this.each(function(index,element){
		var thisObj=$(this);
		var thisTag=this.tagName.toLocaleLowerCase();
		if(thisTag!='img'){
			alert("The tags must be img!");
			return false;
		}

		//thisObj.wrap("<div style='height:aoto;width:auto;display:inline-block; '></div>");
		thisObj.attr("status","default");
		thisObj.after("<img src='"+thisObj.attr("hover")+"' status='hover'>");
		thisObj.next("img[status='hover']").hide();
		
		var timeset=null;
		switch(settings.type){
			case "show":
			thisObj.mouseover(function(){
			var thiselement=$(this);
			var actions=function(){
				thiselement.hide();
				thiselement.next("img[status='hover']").show();
			}
			timeset=setTimeout(actions,160);
			});
			thisObj.mouseout(function(){
				clearTimeout(timeset);
			});
			thisObj.next("img[status='hover']").mouseout(function(){

				$(this).hide();
				thisObj.show();	
			});
			break;
			
			case "fade":
			thisObj.mouseover(function(){
			var thiselement=$(this);
			var actions=function(){
				thiselement.hide();
				thiselement.next("img[status='hover']").fadeIn();
			}
			timeset=setTimeout(actions,160);	
			});
			thisObj.mouseout(function(){
				clearTimeout(timeset);
			});
			thisObj.next("img[status='hover']").mouseout(function(){
				$(this).hide();
				thisObj.stop().fadeIn();	
			});
			break;
			
		}
		
	  });

}//end-fn

$.fn.tabcolor=function(settings){
		var settings=$.extend({
		   firstRow:0,
		   odd:"#fff",
		   even:"#fff",
		   hover:0
	  },settings||{});
	
      return this.each(function(index,element){
		var thisObj=$(this);	
		function panter1(){
			$(thisObj).find("tr:eq(0)").css("background-color",settings.firstRow);
			if(settings.even){
				$(thisObj).find("tr:even").not($("tr:eq(0)")).css("background-color",settings.even);
			}
			if(settings.odd){
				$(thisObj).find("tr:odd").not($("tr:eq(0)")).css("background-color",settings.odd);
			}
		}
		function panter2(){
			if(settings.even){
				$(thisObj).find("tr:even").css("background-color",settings.even);
			}
			if(settings.odd){
				$(thisObj).find("tr:odd").css("background-color",settings.odd);
			}
		}
		if(settings.firstRow!=0){
			panter1();
		}else{
			panter2();
		}
		if(settings.hover){
			$(thisObj).find("tr").hover(function(){
				if(settings.firstRow!=0){
					$(this).not($("tr:eq(0)")).css("background-color",settings.hover);
				}else{
					$(this).css("background-color",settings.hover);
				}
			},function(){
				if(settings.firstRow!=0){
					panter1();
				}else{
					panter2();
				}
			});
		}
	  });
	
}//end-fn

	
$.fn.msgbox=function(settings){
		var settings=$.extend({
		   offsetX:0,
		   offsetY:0,
		   claname:"msgstyle",
		   html:"null",
		   delay:500
	  },settings||{});
	
      return this.each(function(index,element){
	  	var thisObj=$(this);	
		var thisPos=thisObj.css("position");
		var thisHeight=thisObj.height();
		var thisTop=null;var thisLeft=null;
		if(thisPos=="static"){
			thisTop=thisObj.position().top+thisHeight+settings.offsetY;
			thisLeft=thisObj.position().left+settings.offsetX;
		}else{
			thisTop=thisHeight+settings.offsetY;
			thisLeft=settings.offsetX;
		}
		
		$("<div class='"+settings.claname+"'>"+settings.html+"</div>").appendTo(thisObj);
		var boxWidth=$("."+settings.claname).width();
		var documentWidth=$(window).width();
		
		if(thisObj.position().left+boxWidth>documentWidth){
			thisLeft=thisLeft-(thisObj.position().left+boxWidth-documentWidth);
		}
		$("."+settings.claname).css({
			"position":"absolute",
			"top":thisTop,
			"left":thisLeft,
			"display":"none"
		});
		
		var timeset=null;
		thisObj.mouseover(function(){
			var showact=function(){
			$("."+settings.claname).fadeIn();
			}
			timeset=setTimeout(showact,settings.delay);
		});
		$("html,body").mouseover(function(event){
			if(event.target==this){
			clearTimeout(timeset);
			$("."+settings.claname).fadeOut();
			}
		});
		
		
		
	  });
}//end-fn
	
	
})(jQuery)