// sketch.js - Logic Pendukung
function setup() {
  noCanvas(); // Canvas disembunyikan
  
  // Ambil elemen console
  let consoleDiv = document.getElementById('p5-console');
  
  // Tambah log palsu biar kelihatan mikir
  setTimeout(() => {
    consoleDiv.innerHTML += "<br>> System Ready.";
  }, 1000);

  // LOGIC AUDIO & UPDATE CONSOLE
  let modelViewer = document.querySelector('model-viewer');
  let audio = document.getElementById('click-sound');

  // Pas Tombol AR diklik
  document.getElementById('ar-button').addEventListener('click', () => {
    consoleDiv.innerHTML = "<span style='color:yellow'> > Requesting WebXR Session...</span>";
  });

  // Pas Kursi diklik (Bunyi)
  modelViewer.addEventListener('click', () => {
    if(audio) {
      audio.currentTime = 0;
      audio.play();
      consoleDiv.innerHTML = "> Interaction: Tap Detected.<br>> Playing SFX.";
    }
  });
}
