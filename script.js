// Fitur JS Umum
document.addEventListener('DOMContentLoaded', () => {

  //Navigasi  
  const toggleBtn = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

//Fitur Tombol "Ikuti Aksi Ini" (Halaman aksi.html)
  const btnAksiList = document.querySelectorAll('.btn-aksi');
  btnAksiList.forEach(button => {
    button.addEventListener('click', () => {
      // Langsung mengarahkan ke halaman relawan.html saat diklik
      window.location.href = 'relawan.html';
    });
});

//fitur halaman index.html
const treeElem = document.getElementById('counter-tree');
  if (treeElem) {
    let count = 0;
    const target = 1500;
    const interval = setInterval(() => {
      count += 50;
      treeElem.innerText = count;
      if (count >= target) clearInterval(interval);
    }, 30);
  }

// Validasi Form Relawan & Hitung Total Relawan
const formRelawan = document.getElementById('form-relawan');
if (formRelawan) {
  formRelawan.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const domisili = document.getElementById('domisili').value.trim();
    let bidang = selectBidang ? selectBidang.value : '';
    const pesan = document.getElementById('pesan-form');

    // Jika memilih "lainnya", ambil teks dari input tambahan (#bidang-lain)
    if (bidang === 'lainnya' && inputBidangLain) {
      bidang = inputBidangLain.value.trim();
    }

    if (nama === '' || email === '' || whatsapp === '' || domisili === '' || bidang === '') {
      pesan.style.color = 'red';
      pesan.innerText = 'Mohon isi semua kolom termasuk domisili dan bidang aksi!';  
    } else {
      // Ambil jumlah relawan dari localStorage (mulai dari 0)
      let jumlahRelawan = localStorage.getItem('totalRelawan') ? parseInt(localStorage.getItem('totalRelawan')) : 0;
      jumlahRelawan += 1; // Tambah 1 setiap ada yang daftar
      localStorage.setItem('totalRelawan', jumlahRelawan);

      pesan.style.color = 'green';
      pesan.innerText = `Terima kasih ${nama} dari ${domisili}, pendaftaran untuk bidang "${bidang}" berhasil!`;
      formRelawan.reset();
      
      // Sembunyikan kembali input teks tambahan setelah form di-reset
      if (wrapperBidangLain) {
        wrapperBidangLain.style.display = 'none';
      }
    }
  });
}

// Menampilkan Total Relawan Otomatis di Halaman Beranda
const counterVolunteers = document.getElementById('counter-volunteers');
if (counterVolunteers) {
  const savedVolunteers = localStorage.getItem('totalRelawan') || '0';
  counterVolunteers.innerText = savedVolunteers;
}