// Key & Notes
const NOTE_DETAILS = [
  { note: "C", key: "Z", frequency: 261.626 },
  { note: "Db", key: "S", frequency: 277.183 },
  { note: "D", key: "X", frequency: 293.665 },
  { note: "Eb", key: "D", frequency: 311.127 },
  { note: "E", key: "C", frequency: 329.628 },
  { note: "F", key: "V", frequency: 349.228 },
  { note: "Gb", key: "G", frequency: 369.994 },
  { note: "G", key: "B", frequency: 391.995 },
  { note: "Ab", key: "H", frequency: 415.305 },
  { note: "A", key: "N", frequency: 440 },
  { note: "Bb", key: "J", frequency: 466.164 },
  { note: "B", key: "M", frequency: 493.883 },
];

// Added audio context
const audioContext = new AudioContext();

// Event Listeners

// Keydown
document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  let keyBoardKey = e.code;
  let noteDetail = getNoteDetails(keyBoardKey);
  if (noteDetail == null) return;
  noteDetail.active = true;
  playNotes();
});

// Keyup
document.addEventListener("keyup", (e) => {
  let keyBoardKey = e.code;
  let noteDetail = getNoteDetails(keyBoardKey);
  if (noteDetail == null) return;
  noteDetail.active = false;
  playNotes();
});

// functions
function getNoteDetails(keyBoardKey) {
  return NOTE_DETAILS.find((n) => `Key${n.key}` === keyBoardKey);
}

function playNotes(n) {
  NOTE_DETAILS.forEach((n) => {
    const keyElement = document.querySelector(`[data-note="${n.note}"]`);
    keyElement.classList.toggle("active", n.active || false);
    if (n.oscillator != null) {
      n.oscillator.stop();
      n.oscillator.disconnect();
    }
  });

  const activeNotes = NOTE_DETAILS.filter((n) => n.active);
  activeNotes.forEach((n) => {
    startNote(n);
  });
}

function startNote(noteDetail) {
  const oscillator = audioContext.createOscillator();
  oscillator.frequency = noteDetail.frequency;
  oscillator.type = "sawtooth";
  oscillator.connect(audioContext.destination);
  oscillator.start();
  noteDetail.oscillator = oscillator;
}
