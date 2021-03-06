MembraneSynth = new Tone.MembraneSynth({
	"pitchDecay" : 0.05,
	"octaves" : 10,
	"oscillator" : {
		"type" : "sine",
	},
	"envelope" : {
		"attack" : 0.001,
		"decay" : 0.4,
		"sustain" : 0.01,
		"release" : 1.4,
		"attackCurve" : "exponential"
	}
});
