let chairModel;

function preload() {
  // Load model dengan try-catch biar kalau gagal program gak mati
  try {
    chairModel = loadModel('chair.obj', true);
  } catch (e) {
    console.error("Model gagal load");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // SOLUSI SAKTI LU KEMARIN
  createARCanvas(); 
}

function draw() {
  clear(); // Transparan
  
  // Cahaya Terang
  ambientLight(200);
  directionalLight(255, 255, 255, 0, 0, -1);

  // --- TEST VISUAL OTOMATIS (GAK PERLU KLIK) ---
  
  // Kita kunci posisi objek di koordinat kamera (Head-Locked)
  // Artinya objek ini bakal "nempel" terus di pandangan lu
  
  push();
  // Posisi: 0 (Tengah), 0 (Tengah), -0.5 (Setengah meter di depan mata)
  // Kalau Z kejauhan (misal -5), bakal kekecilan.
  translate(0, 0, -0.5); 
  
  // Rotasi biar kelihatan hidup
  rotateY(frameCount * 0.01);
  rotateX(frameCount * 0.01);

  // 1. RENDER KOTAK MERAH (Penanda Dasar)
  push();
  noStroke();
  fill(255, 0, 0); 
  box(0.1); // Ukuran 10cm
  pop();

  // 2. RENDER KURSI (Di posisi yang sama)
  push();
  scale(0.05); // Skala kursi
  // Geser dikit biar gak tabrakan sama kotak merah
  translate(0, 2, 0); 
  
  if (chairModel) {
    normalMaterial();
    model(chairModel);
  }
  pop();

  pop();
}

// Hapus mousePressed dulu biar gak bikin bingung
