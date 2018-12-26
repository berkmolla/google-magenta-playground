// import {Player} from "@magenta/music";
// import {midiToSequenceProto} from "@magenta/music"

import * as mm from "@magenta/music"

// var player = new mm.SoundFontPlayer("https://storage.googleapis.com/download.magenta.tensorflow.org/soundfonts_js/sgm_plus");
var player = new mm.Player();

var music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
music_rnn.initialize()

import file from './dist/example.mid';
var STEPS_PER_QUARTER = 2;

function importMIDIFile(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onerror = e => {
            reject('Failed to read file')
        }

        reader.onload = e => {
            var seq = mm.midiToSequenceProto(e.target.result);
            var quantizedSeq = mm.sequences.quantizeNoteSequence(seq, STEPS_PER_QUARTER)
            resolve(quantizedSeq)
        }
        reader.readAsBinaryString(file);
    })
}

// theFile = readFile("example.mid", "binary", (err, data) => {
//     console.log(data)
// })

// importMIDIFile(theFile);
document.querySelector('#fileinput').addEventListener('change', e => {
    importMIDIFile(e.target.files[0])
    .then(initializeModel)
    .then(playSeq)
    .catch(err=> {
        player.stop()
        throw err;
    })
})
function playSeq(sample) {
    player.start(sample, 125)

}
function initializeModel(seq) {
    if (player.isPlaying()) { return }
    const rnn_steps = 64;
    var rnn_temperature = 3.0;
    return music_rnn.continueSequence(seq, rnn_steps, rnn_temperature)
}

// function playVAE(seq) {
//     if (vaePlayer.isPlaying()) {
//       vaePlayer.stop();
//       return;
//     }
//     music_vae
//     .sample(1, )
//     .then((sample) => vaePlayer.start(sample[0]));
//   }