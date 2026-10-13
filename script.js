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

//Interaksi Tombol Selengkapnya pada bagian Edukasi
const tombolDetail = document.querySelectorAll(".btn-detail");

tombolDetail.forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    const kartu = this.parentElement;
    const infoTambahan = kartu.querySelector(".info-tambahan");

    if (infoTambahan.style.display === "none" || infoTambahan.style.display === "") {
      infoTambahan.style.display = "block";
      this.textContent = "Tutup";
    } else {
      infoTambahan.style.display = "none";
      this.textContent = "Baca Selengkapnya";
    }
  });
});

// selesai
// Validasi Form Relawan
// Memunculkan input teks tambahan jika memilih "Lainnya"
const selectBidang = document.getElementById('bidang');
const wrapperBidangLain = document.getElementById('wrapper-bidang-lain');
const inputBidangLain = document.getElementById('bidang-lain');

if (selectBidang) {
  selectBidang.addEventListener('change', function() {
    if (this.value === 'lainnya') {
      if (wrapperBidangLain) {
        wrapperBidangLain.style.display = 'block';
        if (inputBidangLain) inputBidangLain.required = true;
      }
    } else {
      if (wrapperBidangLain) {
        wrapperBidangLain.style.display = 'none';
        if (inputBidangLain) {
          inputBidangLain.required = false;
          inputBidangLain.value = '';
        }
      }
    }
  });
}

// Validasi Form Relawan & Hitung Total Relawan
const formRelawan = document.getElementById('form-relawan');
if (formRelawan) {
  formRelawan.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    let bidang = selectBidang.value;
    const pesan = document.getElementById('pesan-form');

    // Jika memilih "lainnya", ambil nilai dari input teks tambahan
    if (bidang === 'lainnya' && inputBidangLain) {
      bidang = inputBidangLain.value.trim();
    }

    if (nama === '' || email === '' || whatsapp === '' || bidang === '') {
      pesan.style.color = 'red';
      pesan.innerText = 'Mohon isi semua kolom dan tentukan bidang aksi!';
    } else {
      // Ambil jumlah relawan dari localStorage, jika belum ada mulai dari 0
      let jumlahRelawan = localStorage.getItem('totalRelawan') ? parseInt(localStorage.getItem('totalRelawan')) : 0;
      jumlahRelawan += 1; // Tambah 1 setiap ada yang daftar
      localStorage.setItem('totalRelawan', jumlahRelawan);

      pesan.style.color = 'green';
      pesan.innerText = `Terima kasih ${nama}, pendaftaran untuk bidang "${bidang}" berhasil! Konfirmasi dikirim ke WhatsApp (${whatsapp}).`;
      formRelawan.reset();
      
      // Sembunyikan kembali input teks tambahan setelah form di-reset
      if (wrapperBidangLain) {
        wrapperBidangLain.style.display = 'none';
      }
    }
  });
}

// 3. Menampilkan Total Relawan Otomatis di Halaman Beranda (index.html)
const counterVolunteers = document.getElementById('counter-volunteers');
if (counterVolunteers) {
  // Mulai dari 0 jika belum ada yang mendaftar
  const savedVolunteers = localStorage.getItem('totalRelawan') || '0';
  counterVolunteers.innerText = savedVolunteers;
}
