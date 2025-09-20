import React from "react";

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-col brin">
          <h3>BRIN</h3>
          <p>Badan Riset dan Inovasi Nasional</p>
          <p>Alamat: Gedung B.J. Habibie, Jl. M.H. Thamrin No. 8</p>
          <p>Jakarta Pusat 10340</p>
          <p>
            Whatsapp:{" "}
            <a
              href="https://wa.me/6281119333639"
              target="_blank"
              rel="noopener noreferrer"
            >
              +62811-1933-3639
            </a>
          </p>
          <p>
            Email: <a href="mailto:ppid@brin.go.id">ppid@brin.go.id</a>
          </p>
        </div>
        <div className="contact-col">
          <h3>Tentang BRIN</h3>
          <ul>
            <li>
              <a href="#">Pengantar</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">Visi & Misi</a>
            </li>
            <li>
              <a href="#">Tugas & Fungsi</a>
            </li>
            <li>
              <a href="#">Struktur</a>
            </li>
            <li>
              <a href="#">Dewan Pengarah</a>
            </li>
            <li>
              <a href="#">Kebijakan Privasi</a>
            </li>
          </ul>
        </div>
        <div className="contact-col">
          <h3>Kategori</h3>
          <ul>
            <li>
              <a href="#">Berita</a>
            </li>
            <li>
              <a href="#">Siaran Pers</a>
            </li>
            <li>
              <a href="#">Agenda</a>
            </li>
            <li>
              <a href="#">Galeri</a>
            </li>
          </ul>
        </div>
        <div className="contact-col">
          <h3>Layanan</h3>
          <ul>
            <li>
              <a href="#">Mall Pelayanan Publik</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Contact;
