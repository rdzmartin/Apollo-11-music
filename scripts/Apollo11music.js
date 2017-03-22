
//links trigger to html button
var trigger = document.getElementById('trigger');

//pingpong delay
var pingPong = new Tone.PingPongDelay("8n", 0.7).toMaster();

// reverb
var freeverb = new Tone.Freeverb().toMaster();
freeverb.dampening.value = 2000;
freeverb.roomSize.value = .1;

//duo synth
var synth = new Tone.DuoSynth({
    "harmonicity" : 0.5,
    "voice0" : {
        "volume" : -10,
        "portamento" : 0.25,
        "oscillator" : {
        "type" : "sine",
    },
        "envelope" : {
            "attack" : 0.6,
            "decay" : 0.3,
            "sustain" : 0.2,
            "release" : 0.5,
        }
    },    
    "voice1" : {
        "volume" : -10,
        "portamento" : 0.25,
        "oscillator" : {
        "type" : "triangle",
        "modulationFrequency" : 0.2
    },
        "filterEnvelope" : {
            "attack" : 0.05,
            "decay" : 0,
            "sustain" : 1,
            "release" : 0.1,
        },               
        "envelope" : {
            "attack" : 0.6,
            "decay" : 0.3,
            "sustain" : 0.2,
            "release" : 0.5,
        }       
    },
}).toMaster();

synth.connect(pingPong);
synth.connect(freeverb);

var amSynth = new Tone.AMSynth().toMaster();

amSynth.connect(pingPong);

var partA = new Tone.Part(function(time, note){
    //the notes given as the second element in the array
    //will be passed in as the second argument
    synth.triggerAttackRelease(note, "2n", time);
}, [["0:0", "C3"],["1:0:1", "C3"], ["2:1:1", "F3"], ["3:0", "C3"], 
["4:0", "C3"],["5:0:1", "D3"], ["6:1:1", "Bb2"], ["7:1", "C3"],]);

partA.loop = 4;
partA.loopEnd = "8m";
partA.humanize = true;

var partB = new Tone.Part(function(time,note){
    amSynth.triggerAttackRelease(note,"8n", time);
}, [["0:2", "C3"],["1:2:", "C3"], ["2:3:1", "F3"], ["3:2", "D4"], 
["4:2", "C4"],["5:2:1", "F3"], ["6:2:1", "C4"], ["7:2", "G3"],]);

partB.loop = 4;
partB.loopEnd = "8m";
partB.humanize = true;

//starts stops arpeggiator
trigger.onmousedown = function mouseDown() {
    Tone.Transport.start(),
    partA.start();
    partB.start();
};


Tone.Transport.bpm.value = 69;
Tone.Transport.timeSignature = 4;

/*//arpeggiator 
var pattern = new Tone.Pattern(function(time,note){
    synth.triggerAttackRelease(note,"1n");
}, ["C3", "D4", "F3", "Bb4"], "randomWalk")

//starts stops arpeggiator
trigger.onmousedown = function mouseDown() {
    pattern.start(0);
};

 trigger.onmouseup = function mouseUp() {
    pattern.stop(0);
};*/




