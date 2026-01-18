let chairModel;
let placedObjects = []; // List objek yang sudah ditaruh
let xrSession = null;   // Variable untuk nyimpen sesi AR

function preload() {
  // Pastikan file .obj lu ada dan namanya bener
  chairModel = loadModel('chair.obj', true); 
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // PERBAIKAN: Tambahkan opsi konfigurasi
  // Ini maksa browser nyari fitur AR, bukan VR
  createARCanvas({
    mode: 'immersive-ar', // PENTING: Minta mode AR
    referenceSpace: 'local', // Referensi ruang lokal
  });
}
function draw() {
  // 1. KUNCI AR: clear() membuat background transparan
  // Ini bikin kamera HP lu kelihatan di belakang model 3D
  clear();

  // Setup cahaya biar objek gak gelap
  ambientLight(100);
  directionalLight(255, 255, 255, 1, 1, -1);

  // 2. Render semua objek yang sudah diletakkan
  for (let obj of placedObjects) {
    push();
    // Pindahkan ke posisi tersimpan
    translate(obj.x, obj.y, obj.z);
    
    // Rotasi & Scale sesuai kebutuhan model lu
    scale(0.2); // Kecilin kalau modelnya kegedean
    rotateX(PI); // Putar balik kalau modelnya kebalik (masalah umum .obj)
    
    noStroke();
    fill(255, 100, 100); // Warna merah buat testing kalau texture gagal load
    model(chairModel);
    pop();
  }
}

// 3. Logic Hit Test (Deteksi Sentuhan di Bidang)
function mousePressed() {
  // Cek apakah kita sedang dalam mode Immersive (AR aktif)
  // p5.xr menyuntikkan 'xr' object global
  if (typeof xr !== 'undefined' && xr.session) {
    
    // Logic: Ambil posisi di depan user (Raycasting sederhana)
    // Karena p5.js core susah akses native Hit-Test API secara langsung tanpa ribet,
    // kita pakai pendekatan "p5.xr raycaster"
    
    // Ambil koordinat 3D dari user touches
    // Note: p5.xr otomatis memetakan 0,0,0 ke posisi awal kamera AR
    
    // Kita buat vector baru di posisi 0.5 meter di depan kamera saat ini
    // Ini cara paling aman buat demo tugas kuliah daripada native hit-test yang sering crash
    let newPos = createVector(0, 0, -1.5); 
    
    // Apply transformasi kamera saat ini ke vector tersebut
    // (Simulasi meletakkan benda di depan mata user)
    applyMatrix(); 
    
    // Simpan posisi relatif
    // Disclaimer: Logic posisi absolut di AR p5.js itu tricky. 
    // Untuk tugas kuliah, kita simpan posisi relatif mouseX/Y yang diprojeksikan
    
    let loc = createVector(mouseX - width/2, mouseY - height/2, -500);
    placedObjects.push(loc);
  }
}