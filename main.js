
Webcam.set({
    width:350,
    height:300,
    image_formate:"png",
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';

    });
}

console.log("ml5 version: ",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/370zuh8-V/model.json ",modeloaded);
function modeloaded(){
    console.log ("modeloaded");
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}

function gotresult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log (result);
        prediction1=result[0].label;
        prediction2=result[1].label;
        document.getElementById("result_gestures_name").innerHTML=prediction1;
        
        speak();
        if(prediction1=="victory"){
            document.getElementById("update_gestures").innerHTML="&#9996;";
        }
        if(prediction1=="amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(prediction1=="best"){
            document.getElementById("update_emoji").innerHTML="&#128077";
        }
    }
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data="the  prediction is " + prediction1;
    var utterthis=new SpeechSynthesisUtterance(speak_data);
    utterthis.rate=0.5;
    synth.speak(utterthis);
}