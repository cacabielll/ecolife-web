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
    let bidang = document.getElementById('bidang').value;
    const pesan = document.getElementById('pesan-form');

    // Jika memilih "lainnya", munculkan kotak dialog untuk mengetik bidang sendiri
    if (bidang === 'lainnya') {
      bidang = prompt('Masukkan bidang aksi pilihan Anda:');
      if (!bidang || bidang.trim() === '') {
        pesan.style.color = 'red';
        pesan.innerText = 'Mohon masukkan bidang aksi Anda!';
        return;
      }
      bidang = bidang.trim();
    }

    if (nama === '' || email === '' || whatsapp === '' || bidang === '') {
      pesan.style.color = 'red';
      pesan.innerText = 'Mohon isi semua kolom dan pilih bidang aksi!';
    } else {
      // Ambil jumlah relawan dari localStorage 
      let jumlahRelawan = localStorage.getItem('totalRelawan') ? parseInt(localStorage.getItem('totalRelawan')) : 120;
      jumlahRelawan += 1; // Tambah 1 setiap ada yang daftar
      localStorage.setItem('totalRelawan', jumlahRelawan);

      pesan.style.color = 'green';
      pesan.innerText = `Terima kasih ${nama}, pendaftaran untuk bidang "${bidang}" berhasil!`;
      formRelawan.reset();
    }
  });
}

// Menampilkan Total Relawan Otomatis di Halaman Beranda
const counterVolunteers = document.getElementById('counter-volunteers');
if (counterVolunteers) {
  const savedVolunteers = localStorage.getItem('totalRelawan') || '120';
  counterVolunteers.innerText = savedVolunteers;
}