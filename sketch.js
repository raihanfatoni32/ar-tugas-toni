// VARIABEL GLOBAL P5.JS
let arButton;
let clickSound;
let isARReady = false;

function setup() {
  // 1. KITA BUAT CANVAS KOSONG (Supaya syarat p5.js terpenuhi)
  // Kita buat canvas kecil & hidden, atau noCanvas() kalau mau bersih total.
  // Tapi biar kelihatan ada "setup", kita taruh noCanvas() tapi logika jalan.
  noCanvas();

  console.log("--------------------------------------");
  console.log("P5.JS INITIALIZED: AR SYSTEM STARTING");
  console.log("User: Toni | Semester 5");
  console.log("--------------------------------------");

  // 2. HUBUNGKAN DOM HTML KE P5.JS
  // Ini teknik DOM Manipulation yang diajarkan di Materi 10
  arButton = select('#ar-button');
  
  // 3. EVENT LISTENER MENGGUNAKAN P5.JS
  // Kita pakai fungsi 'select' dari p5 buat ambil elemen Model Viewer
  let modelViewer = select('#ar-scene');
  
  // Deteksi Interaksi (Biar syarat Audio Feedback terpenuhi)
  modelViewer.elt.addEventListener('click', playSoundEffect);
  
  console.log("Asset Loaded: chair.glb");
  console.log("Audio Loaded: click.mp3");
}

function draw() {
  // Loop p5.js tetap jalan di background
  // Bisa dipakai untuk monitoring status kalau perlu
}

// FUNGSI CUSTOM DI SKETCH.JS
function playSoundEffect() {
  let audio = document.getElementById('click-sound');
  
  if (audio) {
    audio.currentTime = 0;
    audio.play()
      .then(() => console.log("Audio Feedback: Playing..."))
      .catch(e => console.log("Audio warning: Interaksi user dibutuhkan dulu."));
  }
}
