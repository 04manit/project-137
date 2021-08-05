let status="", object, objects = [];
function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300,300);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
    object = document.getElementById("object").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}
function draw(){
    image(video, 0, 0, 300, 300);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(let i=0;i<objects.length;i++){
            percent = Math.floor(objects[i].confidence * 100);
            label = objects[i].label;
            if(label == object){
                fill('#ff0000');
                text(label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
                noFill();
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                document.getElementById("detected").innerHTML = "object mentioned found";
                break;
            }else{
                document.getElementById("detected").innerHTML = "object mentioned not found";
            }
        }
    }
}