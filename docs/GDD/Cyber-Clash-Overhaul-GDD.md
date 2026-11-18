# Cyber Clash 2.0 — Spesifikasi Reka Bentuk Permainan (Overhaul GDD)

**Nama Projek:** Cyber Clash 2.0 (The Heist & Defense Simulation)  
**Genre:** 1v1 PvP / PvE Real-Time Cybersecurity Simulation  
**Platform:** Godot Engine (Klien) & Node.js WebSocket (Pelayan Autoritatif)  
**Sasaran Pengguna:** Pelajar IT & Keselamatan Siber (JMTi CU 03 Computer System Security Control)  
**Status Dokumen:** Dimuktamadkan (10,000% Clarity — Production Ready)

---

## 1. Konsep Teras & Penentuan Kemenangan (Core Concept & Win Conditions)

Permainan ini berasaskan **Perlumbaan Objektif (*Objective Race*)** secara masa nyata:
* **Objektif Hacker**: Menyusup masuk mengikut 5 fasa serangan, mencuri aset utama, dan memadam jejak sebelum Target tamat syif atau sebelum polis siber tiba.
* **Objektif Target**: Menyelesaikan **3 Tugasan Harian Sah** tanpa melakukan kesilapan keselamatan.
* **Tamat Waktu Bekerja (*Shift Ended Victory*)**: Jika Target berjaya menyelesaikan ketiga-tiga tugasan sebelum diceroboh, Target menang secara automatik.
* **Kemenangan Batal Lawan (*Forfeit Victory*)**: Jika seorang pemain terputus sambungan (*disconnect / rage quit*), pemain yang tinggal serta-merta menang (*Default Win*).
* **Menu ESC (Non-Pausing)**: Oleh kerana ini permainan atas talian (*online multiplayer*), menekan kekunci **ESC tidak akan menghentikan permainan**. Ia hanya memaparkan menu ringkas: `[ Sambung Permainan ]` atau `[ Menyerah Kalah / Surrender ]`.

---

## 2. Struktur 5 Fasa Serangan (Red Team Engine — Ahmad Irfan)

Aliran serangan Hacker:

```
[1. Reconnaissance] ➔ [2. Scanning] ➔ [3. Gaining Access] ➔ [4. Maintaining Access] ➔ [5. Covering Tracks]
```

### Fasa 1: Reconnaissance (Information Gathering)
* **Status:** 100% Senyap.
* **Tindakan:** Meneliti Dossier Profil OSINT mangsa (Nama, Hobi, Bank, Emel Bocor, Jenis Peranti).

### Fasa 2: Scanning & Enumeration
* **Pilihan Imbasan:** *Passive Social Inspection* (senyap), *Active Network/Port Scan* (berisiko cetus amaran), atau *Vulnerability Scan*.

### Fasa 3: Gaining Access (Modular Bait Builder & Silent Drop)
* **Had Umpan:** Hanya **1 umpan pada satu masa**.
* **Sistem Pembina Umpan Modular:**
  - Pilih Topik (cth: *Tawaran Pelaburan*, *Invois Pembekal*, *Reset Kata Laluan*).
  - Pilih Alamat Penghantar (*Typo-squatting*, cth: `admin@paypa1.com`).
  - Pilih Jenis Perangkap (*Malicious Link* atau *Disguised Attachment*).
* **Maklum Balas Terminal Konsol:**
  - **Jika Mangsa Terpedaya (Klik):** Paparan terminal keluar teks hijau:  
    `[+] Payload Executed! Reverse Shell Connection Established.`
  - **Jika Mangsa Sekat / Padam (Block/Delete):** **Tiada maklum balas (*Silent Drop / No Beacon*)**. Terminal Hacker kekal senyap seperti dunia sebenar.

### Fasa 4: Maintaining Access & Pilihan Kelajuan Exfiltration
* **Fast Exfiltration (~5 saat) — Risiko Tinggi:** Aset disedut laju, tetapi ikon rangkaian di taskbar mangsa berkelip laju dan baki akaun susut secara langsung.
* **Slow Exfiltration (~15 saat) — Senyap & Selamat:** Muat turun perlahan tanpa sebarang petunjuk fizikal pada skrin mangsa.

### Fasa 5: Covering Tracks & Perlumbaan Penggera (The 10–20s Lockdown Race)
* Aset selesai disedut ➔ Siren penggera merah berbunyi.
* Hacker berlumba menekan: `[Clear Event Logs]` ➔ `[Delete Dropped Payloads]` ➔ `[Disconnect]`.
* Target berlumba menekan butang: `[Isolate Network & Report to Police]`.
* Sesiapa yang lebih pantas dalam 10-20 saat ini menentukan keputusan perlawanan.

---

## 3. Modul Mangsa & Pertahanan (Blue Team Engine — Azrul Aiman)

### Antaramuka Desktop (Windows 11 Style — Static Modals)
* Menggunakan tetingkap **Popup Statik / Modal** yang kemas dan stabil (aplikasi dibuka di tengah skrin dengan butang tutup `[X]`).

### Tiga Pilihan Tindakan pada Notifikasi Masuk
1. **`[ Buka Pautan / Lampiran ]`** (Meneruskan kerja jika sah; memberi akses kepada Hacker jika phishing).
2. **`[ Imbas dengan Tool ]`** (Menggunakan kuota).
3. **`[ Padam / Block ]`** (Menghapuskan ancaman).

### Sistem 3 Peluang (*3 Chances / 3 Strikes Rule*)
* Jika Target tersalah padam emel kerja yang sah:
  - Diberi **3 peluang kesilapan**.
  - Jika mencecah 3 kesilapan, polisi keselamatan syarikat mencetuskan *Auto-Approval*, membuka kelemahan kepada Hacker.

### Kuota Alatan Keselamatan Terhad (Strict 2x Quota)
* **Link Checker:** Terhad kepada **2 kali** penggunaan.
* **Email Phishing Detector:** Terhad kepada **2 kali** penggunaan.
* Kuota habis ➔ Target wajib menyemak sendiri ejaan domain secara visual.

---

## 4. Sistem Profil Sasaran Rawak (Archetypes — Tarrsiny)

| Arketip | Profil & Nilai Aset | Tugasan Harian Mangsa | Objektif Hacker |
|---|---|---|---|
| **Millionaire** | Dana Jutaan Ringgit, Kod Peti Besi (*Vault Code*). | Luluskan perpindahan dana, semak pelaburan portfolio. | Curi Wang Tunai + Sifar Jejak. |
| **Orang Biasa** | Wang Simpanan ($10k - $50k), Media Sosial. | Sahkan resit e-dagang (Shopee/Lazada), sahkan OTP bank. | Pindahkan simpanan peribadi. |
| **Office Worker** | Akses Intranet, Data Syarikat. | Balas emel laporan mingguan bos, sahkan invois pembekal. | Curi Kredential untuk *Lateral Movement*. |
| **Researcher** | Formula Paten, Data Makmal. | Muat naik kertas kajian, luluskan geran penyelidikan. | Ekstrak fail paten tanpa rosakkan data. |

---

## 5. Pengalaman Pengguna (UX), Ujian Makmal JMTi & Audio

### Menu Utama & Skrin Tutorial ("How to Play"):
* Disediakan butang **`[ Panduan Bermain / How to Play ]`** di menu utama:
  - **Mukasurat 1:** Panduan Hacker (5 Fasa Serangan & pilihan kelajuan exfiltration).
  - **Mukasurat 2:** Panduan Target (3 Tugasan harian, kuota 2x alatan, & sistem 3 nyawa).

### Sokongan Ujian Makmal JMTi (Server IP Input):
* Skrin lobi multiplayer menyediakan ruangan input teks **`Server IP Address`** (secara *default* `127.0.0.1:8080`, boleh ditukar kepada IP LAN seperti `192.168.x.x:8080`) untuk membolehkan demonstrasi antara dua komputer riba berbeza di makmal.

### Tetapan Audio (Audio Settings):
* Disediakan pelaras kelantangan (**Volume Slider**) dan butang togol bisu (**Mute / Unmute Toggle**).

---

## 6. Sistem Pemarkahan & Laporan Pasca-Perlawanan (Results Screen)

### Formula Skor Hacker & Target (Skala 0 – 1,000 Mata):
$$\text{Skor Hacker} = \text{Aset Dicuri} (0-500) + \text{Bonus Objektif} (0-300) - \text{Penalti Jejak / Tertangkap} (0-400)$$
$$\text{Skor Target} = (\text{Tugasan Selesai} \times 200) + (\text{Ancaman Disekat} \times 200) + (\text{Bonus Tangkap Hacker} \times 400) - (\text{Penalti Salah Lapor})$$

* Gred: **S (900-1000)**, **A (750-899)**, **B (600-749)**, **C (400-599)**, **F (<400)**.
* **3 Butang Kawalan Tamat Perlawanan:**
  1. `[ Main Semula / Rematch ]`
  2. `[ Kembali ke Menu Utama ]`
  3. `[ Salin Laporan / Copy Post-Mortem ]` (Laporan pasca-insiden untuk pematuhan modul JMTi CU 03).
