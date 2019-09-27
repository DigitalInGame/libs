
window.onload=function(){
setup();
u();
}
let u=function(){
draw();
update();

requestAnimationFrame(u);
}

let redraw=()=>{
document.getElementById('game')
.getContext('2d')
.clearRect(0,0,document.getElementById('game').width,document.getElementById('game').height);
}



// { Cream new Button Object
let Button=function(x=10,y,width,height){

this.x=x;
this.y=y;
this.width=width;
this.height=height;
this.fill='rgba(0,0,255,0.1)';

this.layer=document.querySelector('canvas').getContext('2d');


this.draw=function(){
this.layer.fillStyle=this.fill;
this.layer.fillRect(this.x,this.y,this.width,this.height);
}

this.click=function(f){
let t_x;
let p_x=this.x;
let p_y=this.y;
let w=this.width;
let h=this.height;
window.ontouchstart=function(e){
t_x=e.touches[0].clientX;
if(t_x>p_x  && t_x<p_x+w){
let func=f;
func();
}//if
}
} //click


this.Fill=function(r,g,b,a){
this.r=r||0;
this.g=g||this.r;
this.b=b||this.r;
this.a=a||0.1;
this.fill=`rgba(${this.r},${this.g},${this.b},${this.a})`;
  //else
 
}// Fill
} // break class BUTTON




//UI NAMESPACE
let UI={

// { Create new Image OBJECT
Image:function(x,y,src){
let _s=this;
this.x=x;
this.y=y;
this.width=null;
this.height=null;
this.source=src;
let flTime=0;
let fl=false;
let startTime=false;

let i=new Image();

i.src=this.source;


let c=document.querySelector('canvas').getContext('2d');

_s.draw=function(){

this.width=this.width||i.width;
this.height=this.height||i.height;

c.drawImage(i,this.x,this.y,this.width,this.height);

}

} // break IMAGE
,
Button:function(x,y,w,h){
let self=this;
this.x=x;
this.y=y;
this.width=w;
this.height=h;

let c=list.getCanvas().getContext('2d');

self.draw=function(){
c.fillRect(this.x,this.y,this.width,this.height);
}

}//break Button

,
// { Create new HitArea OBJECT }
HitArea:function(x,y,settings){
let _s=this;
let touchX=0;
let touchY=0;
this.x=x;
this.y=y;
this.width=settings.width;
this.height=settings.height;
this.color='lightgreen';
this.debug=true;
let click=false;

let c=list.getCanvas().getContext('2d');

_s.draw=function(){
if(this.debug)
c.strokeStyle=this.color;
c.strokeRect(this.x,this.y,this.width,this.height);
c.stroke();
 //if





}  //break draw

_s.onClick=function(func){

document.body.ontouchstart=function(e){
//touchX=e.touches[0].clientX;
//touchY=e.touches[0].clientY;
click=true;
}

document.body.ontouchend=function(e){
//touchX=e.touches[0].clientX;
//touchY=e.touches[0].clientY;
click=false;
}


if(click){
alert('hi');
}
/*addEventListener('touchmove',function(e){
touchX=e.touches[0].clientX;
touchY=e.touches[0].clientY;
hit=true;
},false);*/
return this.hit;


} 

}
,
// { Create new TextPisc OBJECT }
TextPisc:function(x,y,settings,labs){
let _s=this;
this.x=x;
this.y=y;
this.frame=settings.frame;
this.labels=labs;
let currentFrame=0;
let frameTime=0;
this.color=settings.color||'black';

let c=list.getCanvas().getContext('2d');

// [draw the animation]
_s.draw=function(){
c.fillStyle=this.color;
c.fillText(this.labels[currentFrame],this.x,this.y);
} //break draw

// [play the animation]
_s.play=function(){
frameTime++;

if(frameTime>this.frame){
currentFrame+=1;
frameTime=0;
}

if(currentFrame>=this.labels.length){
currentFrame=0;
}

} // break play

_s.setLabels=function(labs){
this.labels=labs;
}
} //break TextPisc
,

// {create new Slide OBJECT }
Slide:function(x,y,settings){
let _s=this;
let touchX,touchY;
let tClick=false;
let tMove=false;

this.x=x;
this.y=y;
this.type=settings.type||'left-right';
this.lineWidth=settings.lineWidth;
this.lineHeight=settings.lineHeight;
this.lineColor=settings.lineColor;
this.filterColor=settings.filterColor||"magenta";
this.handleColor=settings.handleColor;
this.handleRadius=settings.handleRadius;
this.filter=settings.filter;
this.value=settings.value;

let c=list.getCanvas().getContext('2d');

// [draw the Slider]
_s.draw=function(){

c.strokeStyle=this.lineColor;
c.fillStyle=this.handleColor;
c.lineWidth='1';
c.lineCap='round';

// control type result
switch(this.type){
case 'left-right':
c.beginPath();
c.moveTo(this.x,this.y);
c.lineTo(this.x+this.lineWidth,this.y);
c.stroke();

//filter
if(typeof this.filter=='boolean' &&
this.filter){
c.strokeStyle=this.filterColor;
c.lineCap='round';
c.beginPath();
c.moveTo(this.x,this.y);
c.lineTo(this.x+this.lineWidth/1*this.value,this.y);
c.stroke();
}

c.lineWidth=1;
c.strokeStyle='black';
c.fillStyle=this.handleColor;
//c.lineCap='butt';
c.beginPath();
c.arc(this.x+this.lineWidth/1*this.value,this.y,this.handleRadius,0,2*Math.PI);
c.fill();
//c.closePath();
c.stroke();
break;

//case UP-DOWN
c.lineWidth='1';
case 'up-down':
c.beginPath();
c.moveTo(this.x,this.y);
c.lineTo(this.x,this.y-this.lineHeight);
c.stroke();

//filter
if(typeof filter=='boolean' &&
filter){
c.strokeStyle=this.filterColor;
c.lineCap='round';
c.beginPath();
c.moveTo(this.x,this.y);
c.lineTo(this.x,Math.abs(this.y-this.lineHeight/1*this.value));
c.stroke();
}

//handle
c.lineWidth=1;
c.strokeStyle='black';
c.fillStyle=this.handleColor;
//c.lineCap='butt';
c.beginPath();
c.arc(this.x,Math.abs(this.y-this.lineHeight/1*this.value),this.handleRadius,0,2*Math.PI);
c.fill();
//c.closePath();
c.stroke();
break;
} //break switch

//c.fillText(this.value,this.x,90);
addEventListener('touchstart',function(e){
touchX=e.touches[0].clientX;
touchY=e.touches[0].clientY;
tClick=true;
});

addEventListener('touchmove',function(e){
touchX=e.touches[0].clientX;
touchY=e.touches[0].clientY;
tMove=true;
});

addEventListener('touchend',function(){

tClick=false;
tMove=false;
});

//left -right
if(this.type=='left-right' &&tClick && tMove &&
(touchX>this.x && touchX<this.x+this.lineWidth+15)&&
(touchY>this.y-10 && touchY <this.y+10)){
this.value=-0.5+touchX/this.lineWidth*1;
}

if(this.type=='left-right'&& tClick && !tMove &&
(touchX>this.x && touchX<this.x+this.lineWidth+15)&&
(touchY>this.y-10 && touchY <this.y+10)){
this.value=-0.5+touchX/this.lineWidth*1;
}

//type up-down
//
if(this.type=='up-down' &&tClick && tMove &&
(touchX>this.x-10 && touchX<this.x+10)&&
(touchY>(-this.y-15) && touchY <this.y+this.lineHeight)){
this.value=1.6-touchY/this.lineHeight*1;
}

if(this.type=='up-down' &&tClick && !tMove &&
(touchX>this.x-10 && touchX<this.x+10)&&
(touchY>(-this.y-15) && touchY <this.y+this.lineHeight)){
this.value=1.6-touchY/this.lineHeight*1;
}


if(this.value<=0){
this.value=0;
}else

if(this.value>=1){
this.value=1;
}


}// [break draw]
}
,
// { Create new ShapeFill Object }
ShapeFill:function(x,y,settings){
let _s=this;
this.x=x;
this.y=y;
this.width=settings.width;
this.height=settings.height;
this.background=settings.background;
this.fill=settings.fill;
this.max=settings.max;
this.value=settings.value;
let c=list.getCanvas().getContext('2d');

//[draw Object ShapeFill]
_s.draw=function(){
c.fillStyle=this.background;
c.strokeStyle='rgba(0,0,0,0.4)';
c.strokeRect(this.x,this.y,this.width,this.height);
c.fillRect(this.x,this.y,this.width,this.height);


c.fillStyle=this.fill;
c.fillRect(this.x,this.y,this.width/this.max*this.value,this.height);

if(this.value>=this.x+this.width/this.max){
this.value=this.max;
}

if(this.value<0){
this.value=1;
}
}

}
,
// { Create new Image OBJECT }
Img:function(x=25,y=25,path){
let _s=this;
this.x=x;
this.y=y;
this.width=64;
this.height=64;
this.source=path;
let img=new Image();
img.src=this.source;

let c=list.canvas.getContext('2d');

// [Draw  Image]
_s.draw=function(){
if(img.complete){
c.drawImage(img,this.x,this.y,this.width,this.height);

}
}// break draw

// [set the IMAGE WIDTH]
_s.setWidth=function(_w){
this.width=_w;
}// setWidth

// [set the IMAGE HEIGHT]
_s.setHeight=function(_h){
this.height=_h;
}// setWidth

}
,

//{ CREATE NEW TEXT USER INTERFACE }
Text:function(pos_x=50,pos_y=50,string_text='your text here',color='black'){
//initiation sets
let _s=this;
this.x=pos_x;
this.y=pos_y;
this.text=string_text;
this.color=color;

let b;
let gameStart;
try{
 b=list.getCanvas().getContext('2d');
gameStart=true;
}catch(e){
alert('new Engine.Game().start needs to use');
gameStart=false;
}

// [draw Text]
_s.draw=function(){
b.fillStyle=this.color;
if(gameStart)
b.fillText(this.text,this.x,this.y);
}//break draw

// [change Text STRING]
_s.setText=function(nText){
this.text=nText;
}

// [change Text color]
_s.setColor=function(_color){
this.color=_color;
return _s;
}

// [get the TEXT Width]
_s.getTextWidth=function(){
return b.measureText(this.text).width;
}

}// {break TEXT Object}

}//break UI

//##############@##########@###
//GEOMETRY NAMESPACE
let Geo={
Rect:function(id,x,y,w,h,c){
let ms=this;
this.id=id;
this.x=x;
this.y=y;
this.width=w;
this.height=h;
this.color=c;
this.enableCollision=true;
this.isStatic=true;
this.collision=false;

let can=document.querySelector('canvas')
.getContext('2d');

ms.draw=function(){
can.fillStyle=this.color;
can.fillRect(this.x,this.y,this.width,this.height);
}

}

}


//######################3#3

//create preload data,use to preload ASSETS

let Preload=function(){
var loads=[];

this.load=function(id,p){
loads.push({id:id,path:p});
}//load

this.get=function(id){
for(let x=0; x<loads.length; x++){
if(loads[x].id==id){
return loads[x].path;
} //if
}//for

} //function get

// return ALL id for this path/
this.loads=function(){
let res=[];
for(let x=0; x<loads.length; x++){
 return loads;
}//for

}//break loads

} //break Preload




//Dialog namespace alerts
let Dialog=
{
AlertBox:function(title,x,y,msg){
let _s=this;
let butt=document.createElement('input');
butt.type='button';
butt.value='Ok';
butt.style.background='lightblue';
butt.style.position='absolute';
butt.style.transformOrigin='0 0';

this.title=title;
this.x=x;
this.y=y;
this.width=200;
this.height=150;
this.buttonX=0;
this.msg=msg;
this.show=true;
let hasCanvas=false;
let c;

butt.style.visibility='hidden';
butt.onclick=function(){
_s.show=false;
butt.style.visibility='hidden';
//alert ('visible');

}
document.body.appendChild(butt);
try{
c=list.canvas.getContext('2d');
hasCanvas=true;
}catch(e){
console.error('Error: (DialogException) canvas not defined;');
hasCanvas=false;
}

_s.draw=function(){
//c.save();
if(hasCanvas && this.show==true){


c.fillStyle='lightblue';
c.strokeStyle='rgba(0,0,0,0.5)';
c.fillRect(this.x,this.y,this.width,this.height);
c.strokeRect(this.x,this.y,this.width,this.height);

c.fillStyle='blue';
c.fillRect(this.x,this.y,this.width,this.height/8);
c.fillStyle='black';
c.font='Normal 9px Bolder';
c.fillText(this.title,this.x+this.width/10,this.y+this.height/11);



//button
/*c.fillStyle='lightblue';
c.strokeStyle='black';
c.fillRect(this.x+this.width-55,this.y+this.height/3*2.55,45,18);
c.strokeRect(this.x+this.width-55,this.y+this.height/3*2.55,45,18);
//text button
c.fillStyle='black';
c.fillText('Ok',this.x+this.width-55+45/2.8,this.y+this.height/3*2.8);
*/
//bg msg
c.beginPath();
c.fillStyle='white';
c.rect(this.x+5,this.y+this.height/6.5,this.width-10,this.height/1.5);
c.fill();

//c.clip();

//msg
c.fillStyle='black';
c.fillText(this.msg,this.x+8-90,this.y+this.height/4);

//c.restore();
butt.style.visibility='visible';
//c.fillRect(10,70,90,50);

if(this.buttonX!=0){
butt.style.left=this.x+30+this.buttonX+'px';
}else
{
butt.style.left=this.x+this.width-30+'px';
}

butt.style.top=this.y+10+this.height-27+'px';

if(butt.offsetLeft<this.x+10){
butt.style.left=this.x+40+'px';
}
else
if(butt.offsetLeft>this.x+this.width){
butt.style.left=(this.x+this.width)-30+'px';
}
//butt.style.left=this.x+this.buttonX+'px';
}//if



}//break draw


}
}


let util={
// [{create a List Object}]
List:function(){
let itens={};

this.add=function(id,val){
itens[id]=val;
}

this.hasKey=function(key){

if(itens[key]){
return true;
}
return false;
}

this.get=function(key){
return itens[key];

}


}


}