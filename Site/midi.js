if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMidiSuccess, onMidiFailure);
} else {
    console.log('WebMIDI is not supported in this browser.');
}


function onMidiSuccess(midiAccess) {

    midiAccess.onstatechange = function(connectionEvent) {
        setupMidiAccess(connectionEvent.currentTarget);
    }

    setupMidiAccess(midiAccess);
}

function setupMidiAccess(midiAccess) {
    for (let input of midiAccess.inputs.values()) {
        input.onmidimessage = onMidiMessage;
    }
}

function onMidiFailure() {
    console.error('Failed to access Midi devices');
}


function onMidiMessage(message) {

    const deviceDiv = document.getElementById("midi-device");
    const messageDiv = document.getElementById("midi-message");

    const target = message.currentTarget;
    deviceDiv.innerHTML = `${target.name} - ${target.manufacturer}`;
    messageDiv.innerHTML = message.data;
}