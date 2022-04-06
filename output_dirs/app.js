var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.onresize = () => {
    canvas.resizeCanvas();
    basicoperation();
};
const canvasElement = document.getElementById('canvas');
const canvas = new CanvasComponent(canvasElement);
var ele = document.getElementById("pushbutton");
var ele2 = document.getElementById("popbutton");
var topbtn = document.getElementById("topbutton");
var isemptybtn = document.getElementById("isemptybutton");
var isfullbtn = document.getElementById("isfullbutton");
var restartbtn = document.getElementById("restartbutton");
var nextbtn = document.getElementById("nextbutton");
var stack = new Stack();
var insdiv = document.getElementById("instructions");
var observation = document.getElementById("Observation");
const ctx = canvas.getContext();
var arrElmnts = new Array();
var arrNum = new Array();
var popElmnt = new Array();
var Top = -1;
ctx.lineWidth = 5;
ctx.strokeStyle = 'orange';
let temp, flag = 0;
for (let p = 0; p < 10; p++) {
    flag = 0;
    while (flag != 1) {
        temp = Math.floor((Math.random() * 99) + 1);
        if (arrNum.indexOf(temp) == -1) {
            arrNum[p] = temp;
            flag = 1;
        }
    }
}
var elementWidth;
var elementHight;
var arrayStartX;
var arrayStartY;
function writeInstructionsStack(string, highlight) {
    if (canvas.width() < 550)
        insdiv.style.fontSize = "smaller";
    insdiv.innerHTML = string;
    if (highlight) {
        insdiv.style.color = "#000dff";
    }
    else {
        insdiv.style.color = "black";
    }
}
let limit = 10;
function myArray(count) {
    arrayStartX = Math.floor(canvas.width() * 0.1);
    arrayStartX % 2 == 0 ? arrayStartX : arrayStartX += 1;
    arrayStartY = Math.floor(120);
    let i;
    let arrayXIndex = arrayStartX;
    elementWidth = Math.floor(stack.width * 0.85);
    elementWidth % 2 == 0 ? elementWidth : elementWidth += 1;
    elementHight = Math.floor(stack.height / 4.5);
    ctx.font = "15px Georgia";
    // ctx.clearRect(100,120,300,40);
    if (canvas.width() < 449)
        limit = 5;
    else if (canvas.width() < 550)
        limit = 6;
    else if (canvas.width() < 650)
        limit = 7;
    else if (canvas.width() < 750)
        limit = 8;
    else if (canvas.width() < 850)
        limit = 9;
    for (i = 0; i < limit; i++) {
        arrElmnts[i] = new element(ctx, canvas, arrayXIndex, arrayStartY, elementWidth, elementHight, arrNum[i]);
        arrElmnts[i].drawArrayElement();
        if (count == undefined || count < i) {
            arrElmnts[i].writeData();
        }
        arrayXIndex += elementWidth;
    }
}
function myArray2(color) {
    ctx.strokeStyle = color;
    let arrayXIndex = arrayStartX;
    for (let i = 0; i < limit; i++) {
        arrElmnts[i] = new element(ctx, canvas, arrayXIndex, arrayStartY, elementWidth, elementHight, arrNum[i]);
        arrElmnts[i].drawArrayElement();
        arrayXIndex += elementWidth;
    }
}
function stopArrayBlink() {
    ctx.strokeStyle = "orange";
    let arrayXIndex = arrayStartX;
    for (let i = 0; i < limit; i++) {
        arrElmnts[i] = new element(ctx, canvas, arrayXIndex, arrayStartY, elementWidth, elementHight, arrNum[i]);
        arrElmnts[i].drawArrayElement();
        arrayXIndex += elementWidth;
    }
    clearInterval(blinkArrID);
}
let blinkArrID;
function blinkArray() {
    myArray2('blue');
    blinkArrID = setInterval(() => {
        myArray2('blue');
        setTimeout(() => {
            myArray2('red');
            // stopArrayBlink();
        }, 300);
    }, 700);
}
function demoRestart() {
    ctx.clearRect(1, 0, canvas.width(), canvas.height());
    instruction = "Click on the Push Button to Insert an Element in Stack";
    writeInstructionsStack(instruction, true);
    limit = 10;
    ele.disabled = false;
    topbtn.disabled = false;
    isemptybtn.disabled = false;
    isfullbtn.disabled = false;
    restartbtn.disabled = false;
    nextbtn.disabled = true;
    ele2.disabled = false;
    height = 30;
    gap = 90;
    Top = -1;
    popArrIndex = -1;
    stckElmnt = [];
    popElmnt = [];
    stp = stack.startX - 50;
    cnt = -1;
    ele.disabled = false;
    poppedElements();
    topValueIndex();
    stack.myStack('red');
    myArray();
}
function demoIsEmpty() {
    // stopArrayBlink()
    clearpoppedElement();
    topValueIndex();
    stopBlinkStack();
    ctx.clearRect(stack.leftX + stack.width + 115, stack.leftY - (stack.height / 2), canvas.width(), stack.height / 2);
    let pointX = canvas.width() * 0.4;
    let pointY = arrayStartY - arrayStartY * 0.55;
    //  ctx.clearRect(635,250,canvas.width(),120)
    //delete popped element
    ctx.font = "15px Georgia";
    ctx.fillStyle = "#000dff";
    if (canvas.width() > 550)
        instruction = "isEmpty returns True if stack is empty else False.<br>" +
            "If stack is empty then top index will be -1.<br>" +
            "Current Top index:" + Top + ".<br>";
    else
        instruction = "isEmpty returns True if stack is empty else False." +
            "If stack is empty then top index will be -1." +
            "Current Top index:" + Top + ".";
    if (canvas.width() > 550) {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 15, pointY - 18, 100, 70);
    }
    else {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 10, pointY - 15, 80, 70);
    }
    if (Top > -1) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        //ctx.strokeRect(stckElmnt[Top].X-90,stckElmnt[Top].Y,stckElmnt[Top].width*6,stckElmnt[Top].height);
        ctx.strokeRect(stckElmnt[Top].X - 40, stckElmnt[Top].Y, stckElmnt[Top].width + 155, stckElmnt[Top].height);
        instruction += "isEmpty:False.";
    }
    else if (Top == -1) {
        ctx.font = "15px Georgia";
        ctx.fillStyle = "#000dff";
        instruction += "isEmpty:True.";
        blinkStack();
    }
    writeInstructionsStack(instruction, true);
    ctx.fillStyle = "black";
}
function demoIsFull() {
    // stopArrayBlink()
    clearpoppedElement();
    topValueIndex();
    stopBlinkStack();
    // ctx.clearRect(635,250,canvas.width(),120)
    ctx.clearRect(stack.leftX + stack.width + 115, stack.leftY - (stack.height / 2), canvas.width(), stack.height / 2);
    let pointX = canvas.width() * 0.4;
    let pointY = arrayStartY - arrayStartY * 0.55;
    instruction = "isFull returns True if stack is full else False.";
    if (canvas.width() > 550) {
        instruction += "</br>";
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 15, pointY - 18, 100, 70);
    }
    else {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 10, pointY - 15, 80, 70);
    }
    if (Top >= 0 && Top <= 3) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        if (Top != 3) {
            ctx.strokeRect(stckElmnt[Top].X - 40, stckElmnt[Top].Y, stckElmnt[Top].width + 155, stckElmnt[Top].height);
        }
        else if (Top == 3)
            blinkStack();
        ctx.font = "15px Georgia";
    }
    else if (Top == -1) {
        /*  ctx.fillText("Here stack will be full when Top Index will be 3.",250,60);
         ctx.fillText("Current Top Index is "+Top+". So",250,80) */
        // blinkStack();
    }
    if (canvas.width() > 550)
        instruction += "Here stack will be full when Top Index will be 3.<br>" +
            "Current Top Index is " + Top + ".<br>So ";
    else
        instruction += "Here stack will be full when Top Index will be 3.<br>" +
            "Current Top Index is " + Top + ".So ";
    ctx.font = "15px Georgia";
    ctx.fillStyle = "#000dff";
    Top == 3 ? instruction += " isFull:True" : instruction += " isFull:False";
    writeInstructionsStack(instruction, true);
    ctx.fillStyle = "black";
}
function demoTop() {
    // stopArrayBlink()
    clearpoppedElement();
    topValueIndex();
    stopBlinkStack();
    /*  ctx.clearRect(635,250,canvas.width(),120)
      ctx.clearRect(100,0,740,115);*/
    ctx.clearRect(stack.leftX + stack.width + 115, stack.leftY - (stack.height / 2), canvas.width(), stack.height / 2);
    if (canvas.width() > 550)
        instruction = "Top operation allows to see Top of Stack.<br>";
    else
        instruction = "Top operation allows to see Top of Stack.";
    if (Top > -1) {
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 5;
        ctx.strokeRect(stckElmnt[Top].X - 40, stckElmnt[Top].Y, stckElmnt[Top].width + 155, stckElmnt[Top].height);
        //ctx.strokeRect(stckElmnt[Top].X-90,stckElmnt[Top].Y,stckElmnt[Top].width*6,stckElmnt[Top].height);            //ctx.fillText("Current Top index:"+Top+".",250,60)
        //ctx.fillText("Current Top index element:"+stckElmnt[Top].data+".",250,80);
        if (canvas.width() > 550) {
            instruction += "Current Top index:" + Top + ".<br/>" +
                "Current Top index element:" + stckElmnt[Top].data + ".<br/>";
        }
        else
            instruction += "Current Top index:" + Top + "." +
                "Current Top index element:" + stckElmnt[Top].data + ".";
    }
    else {
        // ctx.fillText("Stack is Empty.",250,60)
        // ctx.fillText("So current Top index:"+Top+".",250,80);
        if (canvas.width() > 550)
            instruction += "Stack is Empty.<br>" +
                "So current Top index:" + Top + ".";
        else
            instruction += "Stack is Empty." +
                "So current Top index:" + Top + ".";
        blinkStack();
    }
    let pointX = canvas.width() * 0.4;
    let pointY = arrayStartY - arrayStartY * 0.55;
    if (canvas.width() > 550) {
        instruction += "</br>";
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 15, pointY - 18, 100, 70);
    }
    else {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 10, pointY - 15, 80, 70);
    }
    writeInstructionsStack(instruction, true);
    ctx.fillStyle = "black";
}
let popArrIndex = -1;
let gap = 90;
function singleElementDeleteStack(stckElmnt, cnt) {
    return __awaiter(this, void 0, void 0, function* () {
        let pointX = canvas.width() * 0.4;
        let pointY = arrayStartY - arrayStartY * 0.55;
        var myreq;
        let popvalue;
        stckElmnt[Top].drawStackElement1();
        stckElmnt[Top].writeData();
        stack.myStack('red');
        /* for(let i=0;i<=popArrIndex;i++){
            popElmnt[i].drawPrevElementStack()
            popElmnt[i].writeData()
        } */
        //  Top>0?stp=stckElmnt[Top-1].Y-stckElmnt[Top-1].height:stp=stack.leftY-stckElmnt[Top].height-3
        // ctx.lineWidth=2;
        //  canvas_arrow1(ctx,stckElmnt[Top].X+stckElmnt[Top].width+5,stckElmnt[Top].Y+(30/2),stckElmnt[Top].X+stckElmnt[Top].width+15,stckElmnt[Top].Y+(30/2));
        for (let i = Top; i >= 0; i--) {
            stckElmnt[i].drawPrevElementStack();
            stckElmnt[i].writeData();
        }
        //  console.log(stckElmnt[Top].X+"  "+stckElmnt[Top].Y)
        if ((stckElmnt[Top].X == 2 || stckElmnt[Top].X == 2 + 1) && stckElmnt[Top].Y >= 184)
            stckElmnt[Top].incrementY(2);
        else if (stckElmnt[Top].Y > 184)
            stckElmnt[Top].decrementY(2);
        else if (stckElmnt[Top].X > 2)
            stckElmnt[Top].decrementX(2);
        let stoppop = Math.floor((canvas.height() * 0.9) - 60);
        stoppop % 2 == 0 ? stoppop : stoppop += 1;
        if ((stckElmnt[Top].X == 2 || stckElmnt[Top].X == 2 + 1) && stckElmnt[Top].Y == stoppop) {
            //  if((stckElmnt[Top].X==2||stckElmnt[Top].X==2+1) && stckElmnt[Top].Y==330){
            if (canvas.width() > 550) {
                popElmnt[++popArrIndex] = new element(ctx, canvas, gap, canvas.height() * 0.88, 50, 30, stckElmnt[Top].data);
                gap += 80;
            }
            else {
                popElmnt[++popArrIndex] = new element(ctx, canvas, gap, canvas.height() * 0.88, 34, 30, stckElmnt[Top].data);
                gap += 35;
            }
            popvalue = stckElmnt[Top].data;
            Top--;
            if (Top > -1) {
                ctx.font = "13px Georgia";
                if (canvas.width() > 550)
                    instruction = "After popping element from Stack,Top index will be decreased by 1.<br>" +
                        "Current Top index:" + Top + "." +
                        "Current Top index element:" + stckElmnt[Top].data + ".";
                else
                    instruction = "After popping element from Stack,Top index will be decreased by 1." +
                        "Current Top index element:" + stckElmnt[Top].data + ".";
                writeInstructionsStack(instruction, true);
                //   canvas_arrow(ctx,522,stckElmnt[Top].Y+(30/2),600,stckElmnt[Top].Y+(30/2));
                // ctx.stroke();
                canvas_arrow1(ctx, stckElmnt[Top].X + stckElmnt[Top].width + 5, stckElmnt[Top].Y + (30 / 2), stckElmnt[Top].X + stckElmnt[Top].width + 80, stckElmnt[Top].Y + (30 / 2));
                ctx.font = "15px Georgia";
                ctx.fillStyle = "black";
                ctx.fillText("Top", stckElmnt[Top].X + stckElmnt[Top].width + 85, stckElmnt[Top].Y + (30 / 2) + 5);
            }
            else {
                if (canvas.width() > 550)
                    instruction = "After popping element from Stack,Top index will be decreased by 1.<br>" +
                        "Current Top index:" + Top + ".<br>" +
                        "Stack is Empty.";
                else
                    instruction = "After popping element from Stack,Top index will be decreased by 1." +
                        "Current Top index:" + Top + "." +
                        "Stack is Empty.";
                writeInstructionsStack(instruction, true);
            }
            ele2.disabled = false;
            topbtn.disabled = false;
            ele.disabled = false;
            isemptybtn.disabled = false;
            isfullbtn.disabled = false;
            topValueIndex();
            ctx.font = "13px Georgia";
            if (canvas.width() > 550) {
                instruction += "</br>";
                ctx.fillStyle = "rgba(0,0,0,0.1)";
                ctx.fillRect(pointX - 15, pointY - 18, 100, 70);
            }
            else {
                ctx.fillStyle = "rgba(0,0,0,0.1)";
                ctx.fillRect(pointX - 10, pointY - 15, 80, 70);
            }
            return;
        }
        myreq = window.requestAnimationFrame(() => { this.singleElementDeleteStack(stckElmnt, cnt); });
    });
}
function demoPop() {
    return __awaiter(this, void 0, void 0, function* () {
        // stopArrayBlink()
        clearpoppedElement();
        topValueIndex();
        stopBlinkStack();
        ctx.fillStyle = "black";
        ele2.disabled = true;
        ele.disabled = true;
        topbtn.disabled = true;
        isemptybtn.disabled = true;
        isfullbtn.disabled = true;
        ctx.clearRect(arrayStartX, arrayStartY + elementHight + 2, canvas.width(), canvas.height());
        stack.myStack('red');
        for (let i = Top; i >= 0; i--) {
            stckElmnt[i].drawPrevElementStack();
            stckElmnt[i].writeData();
        }
        if (Top == -1) {
            //ctx.clearRect(100,0,740,115);
            /*  ctx.fillStyle = "rgba(0,0,0,0.1)";
             ctx.fillRect(240, 25, 550, 80);
             ctx.fillStyle = "#000dff";
             ctx.fillText("Current Top index is "+Top+".So Stack is Empty.",250,40);
             ctx.fillText("When a stack is empty(TOP = -1) and an element is tried to popped",250,60)
             ctx.fillText("from stack is called Stack underflow.",250,80);
             ctx.fillStyle = "#150485";
             ctx.font="bold 13px Georgia";
             ctx.fillText("Push an element in stack to pop an element from Stack.",250,100) */
            if (canvas.width() > 550)
                instruction = "Current Top index is " + Top + ".So Stack is Empty.<br/>" +
                    "When a stack is empty(TOP = -1) and an element is tried to popped <br/>" +
                    "from stack is called Stack underflow.<br>" +
                    "Push an element in stack to pop that element from Stack.";
            else {
                instruction = "Current Top index is " + Top + ".So Stack is Empty." +
                    "When a stack is empty(TOP = -1) and an element is tried to popped " +
                    "from stack is called Stack underflow." +
                    "Push an element in stack to pop that element from Stack.";
            }
            writeInstructionsStack(instruction, true);
            blinkStack();
            let pointX = canvas.width() * 0.4;
            let pointY = arrayStartY - arrayStartY * 0.55;
            if (canvas.width() > 550) {
                ctx.fillStyle = "rgba(0,0,0,0.1)";
                ctx.fillRect(pointX - 15, pointY - 18, 100, 70);
            }
            else {
                ctx.fillStyle = "rgba(0,0,0,0.1)";
                ctx.fillRect(pointX - 10, pointY - 15, 80, 70);
            }
            ctx.fillStyle = "black";
            ele2.disabled = false;
            ele.disabled = false;
            topbtn.disabled = false;
            isemptybtn.disabled = false;
            isfullbtn.disabled = false;
            return;
        }
        // canvas_arrow(ctx,522,stckElmnt[Top].Y+(30/2),600,stckElmnt[Top].Y+(30/2));
        // ctx.stroke();
        //  ctx.font="15px Georgia";
        // ctx.fillText("Top",605,stckElmnt[Top].Y+(30/2)+5); 
        //canvas_arrow(ctx,stack.rightX+5,stp+(30/2),stack.rightX+78,stp+(30/2));
        // canvas_arrow1(ctx,stack.rightX+5,stp+(30/2),stack.rightX+78,stp+(30/2));
        /*   ctx.stroke();
          ctx.font="15px Georgia";
          ctx.fillText("Top",stack.rightX+80,stckElmnt[Top].Y+(30/2)+5);  */
        //ctx.clearRect(250,0,350,93);
        // ctx.clearRect(100,0,740,115);
        if (canvas.width() > 550)
            instruction = "Current Top index is " + Top + " which will be used for Pop. <br/>" +
                "So index " + (Top) + " value will be popped from stack <br/>";
        else
            instruction = "Current Top index is " + Top + " which will be used for Pop." +
                "So index " + (Top) + " value will be popped from stack";
        writeInstructionsStack(instruction, true);
        yield delayAnimation();
        ctx.fillStyle = "black";
        writeInstructionsStack(instruction);
        singleElementDeleteStack(stckElmnt, cnt);
    });
}
let height = 30;
function singleElementInsertStack(stckElmnt, stp, cnt, leftxfloor) {
    //  let leftxfloor=Math.floor(stack.leftX)+Math.floor(stack.width*0.10)
    // leftxfloor%2==0?leftxfloor+=6:leftxfloor+=7
    let stop = stp;
    var myreq;
    stckElmnt[Top].drawStackElement();
    stckElmnt[Top].writeData();
    // ctx.clearRect(stckElmnt[Top].x,stckElmnt[Top].y,stckElmnt[Top].width,stckElmnt[Top].height);
    canvas_arrow1(ctx, stack.rightX + 5, stp + (30 / 2), stack.rightX + 78, stp + (30 / 2));
    ctx.font = "15px Georgia";
    ctx.fillText("Top", stack.rightX + 80, stp + (30 / 2) + 5);
    myArray(cnt);
    /*
    ctx.font="bold 15px Georgia";
    ctx.fillText("Stack",463,375) */
    stack.myStack('red');
    let count = cnt;
    /*  for(let i=0;i<=popArrIndex;i++){
         popElmnt[i].drawPrevElementStack()
         popElmnt[i].writeData()
     } */
    for (let i = 0; i < Top; i++) {
        stckElmnt[i].drawPrevElementStack();
        stckElmnt[i].writeData();
    }
    if ((stckElmnt[Top].X >= leftxfloor) && (stckElmnt[Top].Y >= stp)) {
        ele.disabled = false;
        ele2.disabled = false;
        topbtn.disabled = false;
        isemptybtn.disabled = false;
        isfullbtn.disabled = false;
        return;
    }
    if (stckElmnt[Top].Y < 181)
        stckElmnt[Top].incrementY(2);
    else if (stckElmnt[Top].X < leftxfloor)
        stckElmnt[Top].incrementX(2);
    //   else if((stckElmnt[Top].X==leftxfloor ||stckElmnt[Top].X==leftxfloor+1) && stckElmnt[Top].Y>=137)
    else if (stckElmnt[Top].X == leftxfloor && stckElmnt[Top].Y >= 137)
        stckElmnt[Top].incrementY(2);
    else if (stckElmnt[Top].X > leftxfloor)
        stckElmnt[Top].decrementX(2);
    //topValueIndex(); 
    myreq = window.requestAnimationFrame(() => { this.singleElementInsertStack(stckElmnt, stp, cnt, leftxfloor); });
}
function poppedElements() {
    ctx.clearRect(0, canvas.height() * 0.85, canvas.width(), canvas.height());
    ctx.font = "bold 15px Georgia";
    ctx.fillText("Popped", 2, canvas.height() * 0.90);
    ctx.fillText("Elements", 1, canvas.height() * 0.94);
    for (let i = 0; i <= popArrIndex; i++) {
        popElmnt[i].drawPrevElementStack();
        popElmnt[i].writeData();
    }
}
function canvas_arrow1(context, fromx, fromy, tox, toy) {
    context.strokeStyle = "red";
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}
function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}
/*  function topValueElement(){
     ctx.fillStyle = "black";
     ctx.lineWidth=2
     ctx.font="bold 15px Georgia";
     ctx.fillText("Top Index",arrayStartX+(limit*elementWidth)+elementWidth*0.80,arrayStartY-elementHight);
     ctx.fillText(Top+"",arrayStartX+(limit*elementWidth)+elementWidth,arrayStartY);
    // console.warn(arrayStartX)
     ctx.strokeRect(arrayStartX+(limit*elementWidth)+elementWidth*0.9,arrayStartY-elementHight*0.75,50,35);
 } */
let blinkIntervalID;
function blinkStack() {
    stack.myStack('blue');
    blinkElement();
    blinkIntervalID = setInterval(() => {
        stack.myStack('blue');
        blinkElement();
        setTimeout(() => {
            stack.myStack('red');
            stopBlinkElement();
        }, 300);
    }, 700);
}
function stopBlinkStack() {
    stack.myStack("red");
    stopBlinkElement();
    clearInterval(blinkIntervalID);
}
function blinkElement() {
    for (let i = 0; i <= Top; i++) {
        stckElmnt[i].drawPrevElementStack("blue");
        // stckElmnt[i].writeData();
    }
}
function stackElementsData() {
    for (let i = 0; i <= Top; i++) {
        stckElmnt[i].writeData();
    }
}
function stopBlinkElement() {
    for (let i = 0; i <= Top; i++) {
        stckElmnt[i].drawPrevElementStack();
        // stckElmnt[i].writeData();
    }
}
function topValueIndex() {
    let pointX = canvas.width() * 0.4;
    console.log(canvas.width());
    let pointY = arrayStartY - arrayStartY * 0.55;
    // let width=Math.floor(pointY-pointX)
    // ctx.clearRect(pointX,70,canvas.width(),pointY-20);
    ctx.clearRect(pointX - 20, pointY - 19, canvas.width(), pointY + 20);
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 2;
    ctx.fillStyle = "black";
    if (canvas.width() > 550) {
        ctx.font = "bold 15px Georgia";
        ctx.strokeRect(pointX + 15, pointY + 10, 50, 35);
        ctx.fillText(Top + "", (pointX + 15) + (50 / 3), pointY + 30);
    }
    else {
        ctx.font = "bold 12px Georgia";
        //ctx.fillText(Top+"",pointX+15,pointY+30);
        ctx.strokeRect(pointX + 8, pointY + 10, 50, 35);
        ctx.fillText(Top + "", (pointX + 8) + (50 / 3), pointY + 30);
    }
    ctx.fillText("Top Index", pointX, pointY);
}
var stckElmnt = new Array();
let stp = stack.startX - 50;
let cnt = -1;
/*  function observation(){
      ctx.font="bold 15px Georgia";
      ctx.fillStyle="black"
      ctx.fillText("Observation",canvas.width()/2-canvas.width()*0.1,canvas.height()*0.05);
      ctx.font="13px Georgia";
 } */
function delayAnimation() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
}
function delayAnimationStack() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
}
function clearpoppedElement() {
    let stoppop = Math.floor((canvas.height() * 0.9) - 60);
    stoppop % 2 == 0 ? stoppop : stoppop += 1;
    ctx.lineWidth = 1;
    ctx.clearRect(1, stoppop - 5, elementWidth + 5, elementHight + 5);
    // ctx.strokeRect(1,stoppop-5,elementWidth+5,elementHight+5)
}
function demoPush() {
    return __awaiter(this, void 0, void 0, function* () {
        clearpoppedElement();
        topValueIndex();
        stopBlinkStack();
        ele.disabled = true;
        ele2.disabled = true;
        topbtn.disabled = true;
        isemptybtn.disabled = true;
        isfullbtn.disabled = true;
        if (cnt >= limit - 1) {
            // ctx.fillStyle="green"
            //ctx.strokeRect(100,0,740,115);
            /* ctx.fillStyle = "rgba(0,0,0,0.1)";
             ctx.fillRect(240, 25, 450, 80);
             ctx.fillStyle = "#000dff";*/
            instruction = "All the elements of Array are pushed in Stack.<br>Click Restart Button to Restart demonstration.";
            writeInstructionsStack(instruction, true);
            // ctx.fillStyle = "#150485";
            //ctx.font="bold 13px Georgia";
            // ctx.fillText("Click Restart Button to Restart demonstration.",250,70);
            ctx.fillStyle = "black";
            ele.disabled = false;
            ele2.disabled = false;
            topbtn.disabled = false;
            isemptybtn.disabled = false;
            isfullbtn.disabled = false;
            return;
        }
        else if (Top == 3) {
            // stp=stckElmnt[Top].Y-stckElmnt[Top-1].height
            ctx.clearRect(0, arrayStartY + elementHight + 2, canvas.width(), canvas.height());
            canvas_arrow1(ctx, stack.rightX + 5, stckElmnt[Top].Y + (30 / 2), stack.rightX + 78, stckElmnt[Top].Y + (30 / 2));
            ctx.font = "15px Georgia";
            ctx.fillText("Top", stack.rightX + 80, stp + (30 / 2) + 5);
            if (canvas.width() > 550)
                instruction = "Current Top index is " + Top + ".<br/>" +
                    "So Stack is Full.<br/>" +
                    "When stack is full and element is tried to be inserted in stack is called Stack Overflow.<br>" +
                    "Pop an element from stack to push an element in Stack.";
            else
                instruction = "Current Top index is " + Top + "." +
                    "So Stack is Full." +
                    "When stack is full and element is tried to be inserted in stack is called Stack Overflow.";
            "Pop an element from stack to push an element in Stack.";
            writeInstructionsStack(instruction, true);
            ctx.fillStyle = "black";
            ctx.font = "13px Georgia";
            blinkStack();
            stackElementsData();
            ele.disabled = false;
            ele2.disabled = false;
            topbtn.disabled = false;
            isemptybtn.disabled = false;
            isfullbtn.disabled = false;
            return;
        }
        ++cnt;
        ++Top;
        stp -= 30;
        ctx.clearRect(arrayStartX, (arrayStartY + elementWidth + 10), canvas.width(), canvas.height());
        stack.myStack('red');
        for (let i = 0; i < Top; i++) {
            stckElmnt[i].drawPrevElementStack();
            stckElmnt[i].writeData();
        }
        ctx.clearRect(100, 0, 740, 115);
        if (canvas.width() > 550)
            instruction = "For pushing an element increase top index by 1.<br/>" +
                "Previous top index:" + (Top - 1) + ".<br/>" +
                "After incrementing top index:" + Top + ".";
        else
            instruction = "For pushing an element increase top index by 1." +
                "Previous top index:" + (Top - 1) +
                ".After incrementing top index:" + Top + ".";
        writeInstructionsStack(instruction, true);
        ctx.fillStyle = "black";
        height += 30;
        stckElmnt[Top] = new element(ctx, canvas, arrElmnts[cnt].X, arrElmnts[cnt].Y, stack.width * 0.85, stack.height / 4.5, arrNum[cnt]);
        // let leftxfloor=Math.floor(stack.leftX)+Math.floor(stack.width*0.10)
        //leftxfloor%2==0?leftxfloor:leftxfloor+=1
        let leftxfloor = Math.floor(stack.startX) + ((stack.width - elementWidth) / 2);
        leftxfloor % 2 == 0 ? leftxfloor : leftxfloor += 1;
        Top > 0 ? stp = stckElmnt[Top - 1].Y - stckElmnt[Top - 1].height : stp = stack.leftY - stckElmnt[Top].height - 3;
        ctx.lineWidth = 2;
        canvas_arrow1(ctx, stack.rightX + 5, stp + (30 / 2), stack.rightX + 78, stp + (30 / 2));
        ctx.font = "15px Georgia";
        ctx.fillText("Top", stack.rightX + 80, stp + (30 / 2) + 5);
        topValueIndex();
        yield delayAnimationStack();
        ctx.font = "13px Georgia";
        // ctx.fillStyle = "#000dff";
        // ctx.fillText("Now element "+arrNum[cnt]+" will be pushed at top index "+Top,300,100);
        yield delayAnimationStack();
        ctx.fillStyle = "black";
        // ctx.clearRect(100,0,740,115);
        //  observation();
        //ctx.fillStyle = "#000dff";
        // ctx.fillText("For pushing an element increase top index by 1",300,40); 
        // ctx.fillText("Previous top index:"+(Top-1)+"",300,60); 
        // ctx.fillText("After incrementing top index:"+Top+"",300,80);
        //  ctx.fillText("Now element "+arrNum[cnt]+" will be pushed at top index "+Top,300,100);
        //console.warn("h= "+stack.height/4.3);
        if (canvas.width() > 550)
            instruction += "<br>Now element " + arrNum[cnt] + " will be pushed at top index " + Top + ".";
        else
            instruction += "Now element " + arrNum[cnt] + " will be pushed at top index " + Top + ".";
        writeInstructionsStack(instruction);
        singleElementInsertStack(stckElmnt, stp, cnt, leftxfloor);
    });
}
//skip intro set 11 to skip
let next = 0;
let pointX;
let pointY;
function StackExplanation() {
    ctx.clearRect(1, 1, canvas.width(), canvas.height());
    ctx.lineWidth = 2;
    ctx.font = "30px Georgia";
    ctx.fillStyle = "brown";
    ctx.fillText("Stack", canvas.width() / 2 - 50, 50);
    if (canvas.width() > 550)
        ctx.font = "20px Georgia";
    else
        ctx.font = "16px Georgia";
    ctx.fillStyle = "black";
    if (canvas.width() > 550) {
        ctx.fillRect(50, 80, 8, 8);
        pointX = 100;
        pointY = 90;
        ctx.fillText("A Stack is a linear data structure that follows the principle of ", pointX, pointY);
        ctx.font = "small-caps bold 20px Georgia";
        ctx.fillText("Last In First Out(LIFO).", 643, 90);
        ctx.font = "20px Georgia";
        ctx.fillRect(50, 110, 8, 8);
        ctx.fillText("This means the last element inserted inside the stack is removed first.", 100, 120);
    }
    else {
        ctx.fillRect(10, 80, 8, 8);
        pointX = 25;
        pointY = 90;
        ctx.fillText("A Stack is a linear data structure that follows", pointX, pointY);
        ctx.fillText("the principle of ", pointX, pointY + 20);
        ctx.font = "small-caps bold 16px Georgia";
        ctx.fillText("Last In First Out(LIFO).", pointX, pointY + 40);
        ctx.font = "16px Georgia";
        ctx.fillRect(10, 150, 8, 8);
        ctx.fillText("This means the last element inserted", pointX, pointY + 70);
        ctx.fillText("inside the stack is removed first.", pointX, pointY + 90);
    }
    //++next;
}
function imagine() {
    if (canvas.width() > 550) {
        ctx.fillStyle = "brown";
        ctx.font = "30px Georgia";
        ctx.fillText("Let's Imagine Stack", canvas.width() / 2 - 140, 180);
    }
    else {
        ctx.fillStyle = "brown";
        ctx.font = "22px Georgia";
        ctx.fillText("Let's Imagine Stack", canvas.width() / 2 - 100, pointY + 140);
    }
}
function Stack1() {
    let h = 337;
    pointX = canvas.width() / 4;
    if (canvas.width() < 550) {
        h = 400;
        pointX = canvas.width() / 6;
    }
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pointX, h - 100);
    ctx.lineTo(pointX, h + 40);
    ctx.lineTo(pointX + 100, h + 40);
    ctx.lineTo(pointX + 100, h - 100);
    ctx.stroke();
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = "#ffff66";
        ctx.fillRect(pointX + 5, h, 90, 40);
        ctx.fillStyle = "Black";
        ctx.font = "20px Georgia";
        ctx.fillText("Book " + (i + 1), pointX + 15, h + 33);
        h -= 45;
    }
    if (canvas.width() > 550) {
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation similar to a pile of books", 150, 400);
    }
    else {
        ctx.font = "14px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation ", canvas.width() * 0.15, 460);
        ctx.fillText("similar to a pile of books", canvas.width() * 0.13, 480);
    }
}
function Stack2() {
    let h = 360;
    pointX = canvas.width() / 2 + 150;
    if (canvas.width() < 550) {
        h = 430;
        pointX = canvas.width() / 3 + 100;
    }
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pointX, h - 130);
    ctx.lineTo(pointX, h + 10);
    ctx.lineTo(pointX + 100, h + 10);
    ctx.lineTo(pointX + 100, h - 130);
    ctx.stroke();
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        //ctx.lineWidth=0
        ctx.strokeStyle = "#ffff66";
        ctx.fillStyle = "#ffff66";
        ctx.ellipse(pointX + 50, h - 10, 50, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "20px Georgia";
        ctx.fillStyle = "Black";
        ctx.fillText("Plate " + (i + 1), pointX + 25, h);
        h -= 40;
    }
    if (canvas.width() > 550) {
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation similar to a pile of plates", 600, 400);
    }
    else {
        ctx.font = "14px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation ", pointX, 460);
        ctx.fillText("similar to a ", pointX, 480);
        ctx.fillText("pile of plates", pointX, 500);
    }
}
function Stack3() {
    ctx.beginPath();
    if (canvas.width() > 550) {
        ctx.moveTo((canvas.width() / 10) + 100, 150);
        ctx.lineTo((canvas.width() / 10) + 150, 150);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 10) + 150, 150, (canvas.width() / 10) + 150, 210);
        let h = 247;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvas.width() / 10 + 100, 190);
        ctx.lineTo(canvas.width() / 10 + 100, 380);
        ctx.lineTo((canvas.width() / 10) + 200, 380);
        ctx.lineTo((canvas.width() / 10) + 200, 190);
        ctx.stroke();
        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvas.width() / 10) + 105, 247, 90, 40);
        ctx.fillStyle = "Black";
        ctx.font = "20px Georgia";
        ctx.fillText(1 + "", 190 + (190 / 3) + 5, h + 23);
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 1", 240, 400); //canvaswidth=800
    }
    else {
        ctx.moveTo((canvas.width() / 20) - 50, 200);
        ctx.lineTo((canvas.width() / 20) + 50, 200);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 20) + 50, 200, (canvas.width() / 20) + 50, 230);
        let h = 247;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvas.width() / 20, 220);
        ctx.lineTo(canvas.width() / 20, 350);
        ctx.lineTo((canvas.width() / 20) + 100, 350);
        ctx.lineTo((canvas.width() / 20) + 100, 220);
        ctx.stroke();
        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvas.width() / 20) + 5, 247, 90, 40);
        ctx.fillStyle = "Black";
        ctx.font = "18px Georgia";
        ctx.fillText(1 + "", (canvas.width() / 20) + 20, h + 23);
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 1", (canvas.width() / 20) + 25, h + 120);
    }
}
function Stack4() {
    ctx.beginPath();
    if (canvas.width() > 550) {
        ctx.moveTo((canvas.width() / 10) + 300, 150);
        ctx.lineTo((canvas.width() / 10) + 350, 150);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 10) + 350, 150, (canvas.width() / 10) + 350, 210);
        let h = 337;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvas.width() / 10) + 300, 190);
        ctx.lineTo((canvas.width() / 10) + 300, 380);
        ctx.lineTo((canvas.width() / 10) + 400, 380);
        ctx.lineTo((canvas.width() / 10) + 400, 190);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvas.width() / 10) + 305, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", 454, h + 23);
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 2", (canvas.width() / 10) + 335, 400);
    }
    else {
        ctx.moveTo((canvas.width() / 20) + 180, 200);
        ctx.lineTo((canvas.width() / 20) + 230, 200);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 20) + 230, 200, (canvas.width() / 20) + 230, 230);
        let h = 247 + 45;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvas.width() / 20) + 180, 220);
        ctx.lineTo((canvas.width() / 20) + 180, 350);
        ctx.lineTo((canvas.width() / 20) + 280, 350);
        ctx.lineTo((canvas.width() / 20) + 280, 220);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvas.width() / 20) + 185, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", (canvas.width() / 20) + 200, h + 23);
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 2", (canvas.width() / 20) + 205, h + 123 + 45);
    }
}
function Stack5() {
    ctx.beginPath();
    if (canvas.width() > 550) {
        ctx.moveTo((canvas.width() / 10) + 500, 150);
        ctx.lineTo((canvas.width() / 10) + 550, 150);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 10) + 550, 150, (canvas.width() / 10) + 550, 210);
        let h = 337;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvas.width() / 10) + 500, 190);
        ctx.lineTo((canvas.width() / 10) + 500, 380);
        ctx.lineTo((canvas.width() / 10) + 600, 380);
        ctx.lineTo((canvas.width() / 10) + 600, 190);
        ctx.stroke();
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvas.width() / 10) + 505, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", 654, h + 23);
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 3", (canvas.width() / 10) + 535, 400);
    }
    else {
        ctx.moveTo((canvas.width() / 20) - 50, 400);
        ctx.lineTo((canvas.width() / 20) + 50, 400);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 20) + 50, 400, (canvas.width() / 20) + 50, 430);
        let h = 390 + 3 * 45;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvas.width() / 20, 420);
        ctx.lineTo(canvas.width() / 20, 570);
        ctx.lineTo((canvas.width() / 20) + 100, 570);
        ctx.lineTo((canvas.width() / 20) + 100, 420);
        ctx.stroke();
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect(canvas.width() / 20 + 5, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", canvas.width() / 20 + 20, h + 23);
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 3", canvas.width() / 20 + 25, 585);
    }
}
function Stack6() {
    ctx.beginPath();
    if (canvas.width() > 550) {
        ctx.moveTo(850, 175);
        ctx.lineTo(850, 150);
        ctx.stroke();
        canvas_arrow1(ctx, 850, 150, 920, 150);
        let h = 337;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvas.width() / 10) + 700, 190);
        ctx.lineTo((canvas.width() / 10) + 700, 380);
        ctx.lineTo((canvas.width() / 10) + 800, 380);
        ctx.lineTo((canvas.width() / 10) + 800, 190);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvas.width() / 10) + 705, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", 854, h + 23);
            h -= 45;
        }
        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvas.width() / 10) + 705, 180, 90, 40);
        ctx.font = "20px Georgia";
        ctx.fillStyle = "Black";
        ctx.fillText(3 + "", 854, 203);
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Pop 3", (canvas.width() / 10) + 735, 400);
    }
    else {
        ctx.moveTo((canvas.width() / 20) + 230, 430);
        ctx.lineTo((canvas.width() / 20) + 230, 400);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 20) + 230, 400, (canvas.width() / 20) + 260, 400);
        let h = 390 + 3 * 45;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvas.width() / 20) + 180, 420);
        ctx.lineTo((canvas.width() / 20) + 180, 570);
        ctx.lineTo((canvas.width() / 20) + 280, 570);
        ctx.lineTo((canvas.width() / 20) + 280, 420);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvas.width() / 20) + 185, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", (canvas.width() / 20) + 200, h + 23);
            h -= 45;
        }
        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvas.width() / 20) + 185, h - 15, 90, 40);
        ctx.font = "20px Georgia";
        ctx.fillStyle = "Black";
        ctx.fillText(3 + "", (canvas.width() / 20) + 200, h + 13);
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Pop 4", canvas.width() / 20 + 205, 585);
    }
}
function Stacktop() {
    if (canvas.width() > 550) {
        ctx.fillStyle = "Black";
        ctx.font = "20px Georgia";
        ctx.fillRect(50, 430, 8, 8);
        ctx.fillText("New book/plate can be added from top and top book/plate can be removed.", 100, 440);
        canvas_arrow1(ctx, 400, 270, 460, 270);
        canvas_arrow1(ctx, 860, 270, 940, 270);
        ctx.font = "17px Georgia";
        ctx.fillText("Top", 460, 275);
        ctx.fillText("Top", 940, 275);
    }
    else {
        ctx.fillStyle = "Black";
        ctx.font = "16px Georgia";
        ctx.fillRect(10, 530, 8, 8);
        ctx.fillText("New book/plate can be added from top ", 25, 540);
        ctx.fillText("and top book/plate can be removed.", 25, 560);
        canvas_arrow1(ctx, 140, 330, 170, 330);
        canvas_arrow1(ctx, 280, 330, 300, 330);
        ctx.font = "14px Georgia";
        ctx.fillText("Top", 170, 335);
        ctx.fillText("Top", 300, 335);
    }
}
function lifoprinciple() {
    if (canvas.width() > 550) {
        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(50, 420, 8, 8);
        ctx.fillText("Here item3 was kept last,it was removed first.This is how the LIFO", 90, 430);
        ctx.fillText("(Last In First Out) Principle works.", 676, 430);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        ctx.strokeRect((canvas.width() / 10) + 505, 250, 90, 40);
        ctx.strokeRect((canvas.width() / 10) + 705, 180, 90, 40);
    }
    else {
        ctx.font = "14px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(10, 610, 8, 8);
        ctx.fillText("Here item3 was kept last,it was removed first", 25, 610);
        ctx.fillText("This is how the LIFO Principle works.", 25, 630);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        ctx.strokeRect(canvas.width() / 20 + 5, 390 + 45, 90, 40);
        ctx.strokeRect((canvas.width() / 20) + 185, 390 + 33, 90, 40);
    }
}
function principle() {
    ctx.clearRect(1, 1, canvas.width(), canvas.height());
    if (canvas.width() > 550) {
        ctx.font = "30px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("LIFO Principle of Stack", canvas.width() / 3, 50);
        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(50, 80, 8, 8);
        ctx.fillText("Putting an item on top of stack is called ", 90, 90);
        ctx.font = "bold 21px Georgia";
        ctx.fillText("push", 441, 90);
        ctx.font = "20px Georgia";
        ctx.fillText("and removing an item is called", 500, 90);
        ctx.font = "bold 21px Georgia";
        ctx.fillText("pop.", 775, 90);
        ctx.font = "20px Georgia";
        ctx.fillText("Let's Push and Pop in Stack.", 90, 120);
    }
    else {
        ctx.font = "20px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("LIFO Principle of Stack", 30, 50);
        ctx.font = "16px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(10, 80, 8, 8);
        ctx.fillText("Putting an item on top of stack is called ", 25, 90);
        ctx.font = "bold 17px Georgia";
        ctx.fillText("push", 25, 110);
        ctx.font = "16px Georgia";
        ctx.fillText("and removing an item is called", 25, 130);
        ctx.font = "bold 17px Georgia";
        ctx.fillText("pop.", 25, 150);
        ctx.font = "16px Georgia";
        ctx.fillText("Let's Push and Pop in Stack.", 25, 180);
    }
}
let instructionXPoint;
let instruction;
function basicoperation() {
    //  insdiv.style.display="block";
    // observation.style.display="block";
    instructionXPoint = Math.floor(canvas.width() * 0.1);
    ;
    //  console.warn("startArrayx= "+arrayStartX);
    ctx.clearRect(1, 1, canvas.width(), canvas.height());
    // blinkStack();
    poppedElements();
    ctx.font = "30px Georgia";
    ctx.
        font = "13px Georgia";
    instruction = "Array and Stack are given.Elements from Array can be inserted inside Stack.";
    if (canvas.width() > 550)
        instruction += "<br>";
    instruction += "Basic Stack operations can be performed.";
    if (canvas.width() > 550)
        instruction += "<br>";
    instruction += "Click on the Push Button to Insert an Element in Stack.";
    writeInstructionsStack(instruction, true);
    //   ctx.fillText("Width:"+canvas.width(),canvas.width()*0.1,canvas.height()*0.1)
    //  ctx.fillText("Height:"+canvas.height(),canvas.width()*0.1,canvas.height()*0.5)
    // observation()
    // insdiv.innerHTML="Array and Stack are given.Elements from Array can be inserted inside Stack.<br/>" +
    //"Basic Stack operations can be performed.<br/>" + 
    // "Click on the Push Button to Insert an Element in Stack";
    // insdiv.style.border="2px #ffe53b solid";
    // ctx.fillStyle = "#000dff";
    //  insdiv.style.backgroundColor="rgba(0,0,0,0.1)"
    // insdiv.style.color="#000dff";
    /*ctx.fillStyle = "rgba(0,0,0,0.1)";*/
    ctx.fillStyle = "black";
    stack.myStack('red');
    myArray();
    topValueIndex();
    ele.disabled = false;
    ele2.disabled = false;
    topbtn.disabled = false;
    isemptybtn.disabled = false;
    isfullbtn.disabled = false;
    restartbtn.disabled = false;
    nextbtn.disabled = true;
}
function demoNext() {
    switch (next) {
        case 1:
            StackExplanation();
            nextbtn.value = "Next";
            ++next;
            break;
        case 2:
            imagine();
            ++next;
            break;
        case 3:
            Stack1();
            ++next;
            break;
        case 4:
            Stack2();
            ++next;
            break;
        case 5:
            Stacktop();
            ++next;
            break;
        case 6:
            principle();
            ++next;
            break;
        case 7:
            Stack3();
            ++next;
            break;
        case 8:
            Stack4();
            ++next;
            break;
        /*case 7: Stack4();
            ++next;
            break;*/
        case 9:
            Stack5();
            ++next;
            break;
        case 10:
            Stack6();
            ++next;
            break;
        case 11:
            lifoprinciple();
            ++next;
            break;
        case 12:
            basicoperation();
            ++next;
            break;
    }
}
ele.disabled = true;
ele2.disabled = true;
topbtn.disabled = true;
isemptybtn.disabled = true;
isfullbtn.disabled = true;
restartbtn.disabled = true;
if (canvas.width() > 550) {
    ctx.font = "20px Georgia";
    ctx.fillText("Click on Start button to start the demonstration", canvas.width() / 3, 50);
}
else {
    ctx.font = "15px Georgia";
    ctx.fillText("Click on Start button to start the demonstration", 10, 50);
}
++next;
/* stack.myStack();
 ctx.font="40px Georgia";
 ctx.fillText("Array=>",50,130)
 ctx.fillText("Stack=>",50,350)
 ctx.font="20px Georgia";
 ctx.fillText("Click on the Push Button",280,50);
 ctx.fillText("for Inserting an Element in Stack",250,80);
 myArray();
 topValueElement()
 topValueIndex(-1)
 ele2.disabled = true;*/
//# sourceMappingURL=app.js.map