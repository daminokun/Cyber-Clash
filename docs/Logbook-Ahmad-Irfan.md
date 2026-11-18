# Logbook Projek Tahun Akhir (FYP) — Cyber Clash 2.0
**Nama Pelajar:** Ahmad Irfan Bin Hedher  
**Institusi:** Institut Teknikal Jepun-Malaysia (JMTi) — Sem 4  
**Tajuk Projek:** Cyber Clash 2.0 — Real-Time Heist & Defense Cybersecurity Simulation  
**Peranan & Tanggungjawab (Red Team):**  
1. Membangunkan modul Red Team (Konsol Hacker) menggunakan Godot Engine.
2. Mengatur cara fungsi serangan mengikut 5 Fasa Ethical Hacking (Recon, Scanning, Exploitation, Maintaining Access, Covering Tracks).
3. Membangunkan sistem tindakan serangan dan perlumbaan objektif masa nyata.
4. Membangunkan fungsi komunikasi multiplayer dua hala menggunakan Node.js WebSocket.
5. Menyediakan lakaran carta alir 5 fasa serangan modul Red Team.
6. Menyediakan penulisan laporan berkaitan pembangunan modul Red Team.
7. Melaksanakan pengujian fungsi serangan dan penyelesaian ralat sistem.
8. Membaiki ralat dan mengintegrasikan modul Red Team dengan pelayan autoritatif.

---

### Sesi 1: 18/8

**Item for Discussion**
* Perbincangan idea projek Cyber Clash dan rasional pemilihannya berdasarkan modul CU 03 Computer System Security Control di JMTi.
* Mengenal pasti isu jurang pembelajaran praktikal keselamatan siber bagi pelajar IT.
* Penetapan skop peranan Red Team (pihak penyerang) yang dipertanggungjawabkan kepada Ahmad Irfan.
* Cadangan mekanik serangan awal (*Reconnaissance, Gaining Access, Maintaining Access*).
* Penetapan garis panduan penulisan akademik dan pembahagian tugas kumpulan.

**Record of Discussion**
* Penyelia memberi maklum balas bahawa tajuk simulasi keselamatan siber sangat relevan dengan industri.
* Penyelia menegaskan permainan perlu memberi nilai pendidikan (*educational value*) yang jelas kepada pelajar IT.
* Pembahagian tugas dimuktamadkan: Ahmad Irfan bertanggungjawab membangunkan keseluruhan modul Red Team.
* Ahmad Irfan perlu menyediakan lakaran carta alir awal dan skop tindakan serangan.

**Troubleshooting**
* Mengimbangi tahap kerumitan simulasi penyerang agar sesuai dengan pelajar diploma IT asas tanpa terlalu rumit.

**Action List**
* Memuktamadkan objektif dan skop modul Red Team.
* Menyenaraikan fungsi serangan awal (Modify Event, Add Malicious Link, Spoof Source).
* Menyediakan lakaran konsep awal interaksi Red Team.

---

### Sesi 2: 1/9

**Item for Discussion**
* Pemilihan platform pembangunan (*tech stack*): Godot Engine (Klien) dan Node.js (Pelayan).
* Penentuan seni bina komunikasi masa nyata menggunakan WebSocket dan format data JSON.
* Perancangan pembangunan sistem tindakan dan giliran Red Team di Godot Engine.
* Struktur penulisan Bab 1 Laporan Projek berkaitan modul Red Team.

**Record of Discussion**
* Projek menggunakan Godot Engine sebagai platform utama pembangunan klien kerana ringan dan menyokong GDScript.
* Pelayan Node.js dipilih sebagai pelayan autoritatif bagi memastikan rahsia dan giliran penyerang diurus secara berpusat.
* Ahmad Irfan memulakan reka bentuk aliran giliran tindakan penyerang.

**Troubleshooting**
* Menentukan struktur mesej payload JSON supaya tindakan penyerang dihantar secara selamat tanpa manipulasi klien.

**Action List**
* Menyediakan draf Bab 1 Laporan Projek (Objektif & Skop Red Team).
* Membina lakaran aliran tindakan dan kitaran giliran Red Team.
* Mereka bentuk format data JSON awal untuk tindakan serangan.

---

### Sesi 3: 29/9

**Item for Discussion**
* Reka bentuk mekanik perlawanan dalam Game Design Document (GDD) bagi seksyen Red Team.
* Penerapan prinsip *Information Asymmetry* (maklumat sulit penyerang tidak didedahkan kepada pihak pertahanan).
* Penyediaan lakaran carta alir modul Red Team.
* Susun atur antaramuka asas modul Red Team di Godot.

**Record of Discussion**
* Permainan menggunakan konsep 1v1 PvP di mana tindakan Red Team memberi impak langsung kepada Blue Team.
* Penyelia menegaskan bahawa maklumat rahsia Red Team (niat serangan sebenar) tidak boleh dibocorkan kepada klien lawan.
* Ahmad Irfan ditugaskan melukis carta alir rasmi modul Red Team.

**Troubleshooting**
* **Isu:** Risiko kebocoran data sulit Red Team melalui penyiaran state pelayan yang tidak ditapis.
* **Penyelesaian:** Melaksanakan pemisahan state pelayan (*server-side filtering*) supaya data rahsia Red Team diasingkan daripada klien Blue Team.

**Action List**
* Menyediakan seksyen spesifikasi Red Team dalam dokumen GDD.
* Menyediakan lakaran carta alir modul Red Team yang lengkap.
* Membangunkan antaramuka asas (*wireframe/mockup*) panel tindakan penyerang di Godot.

---

### Sesi 4: 6/10

**Item for Discussion**
* Pemilihan metodologi pembangunan sistem (Model Waterfall) dan penjadualan Carta Gantt.
* Perancangan urutan fasa pembinaan modul Red Team.
* Kawalan integriti giliran penyerang bagi mengelakkan penghantaran aksi bertindih (*spamming*).

**Record of Discussion**
* Kaedah Waterfall dipilih secara rasmi mengikut fasa analisis, reka bentuk, pengkodan, dan pengujian.
* Ahmad Irfan memulakan pengaturcaraan fungsi penguncian tindakan (*action locking*) pada butang klien Godot.

**Troubleshooting**
* **Isu:** Pemain Red Team berpotensi menekan butang tindakan berulang kali sebelum pelayan memproses giliran.
* **Penyelesaian:** Memasang mekanisme *action locking* pada butang UI Godot dan validasi giliran pada pelayan.

**Action List**
* Menyediakan carta alir metodologi Waterfall dan Carta Gantt pembangunan modul Red Team.
* Mengatur cara fungsi penguncian butang tindakan penyerang di Godot.
* Menguji penolakan tindakan tidak sah pada pelayan Node.js.

---

### Sesi 5: 20/10

**Item for Discussion**
* Semakan draf laporan Bab 1 dan Bab 2 bersama penyelia mengikut format templat rasmi JMTi.
* Semakan rajah carta alir, rajah aktiviti, dan rajah blok modul Red Team.
* Penyeragaman istilah teknikal fungsi serangan merentasi kod GDScript dan dokumen laporan.

**Record of Discussion**
* Penyelia meminta format tajuk, nombor bab, dan penulisan diselaraskan mengikut garis panduan JMTi.
* Ahmad Irfan perlu memperincikan penulisan laporan Bab 3 berkaitan logik pengaturcaraan fungsi Modify Event, Add Malicious Link dan Spoof Source.

**Troubleshooting**
* **Isu:** Ketidakkonsistenan nama fungsi antara kod sumber dan dokumen GDD (istilah lama `change_tactic`).
* **Penyelesaian:** Menyeragamkan istilah fungsi serangan kepada sistem adaptasi senario baharu.

**Action List**
* Membetulkan format laporan Bab 1 dan Bab 2 mengikut komen penyelia.
* Menulis penerangan terperinci logik serangan Red Team dalam Bab 3.
* Melengkapkan rajah carta alir aktiviti (*Activity Diagram*) Red Team.

---

### Sesi 6: 3/11

**Item for Discussion**
* Pembentangan kemajuan prototaip: demonstrasi sambungan soket langsung klien Godot Red Team ke pelayan tempatan.
* Pengujian fungsi serangan Red Team (Modify Event, Add Malicious Link, Spoof Source).
* Pengujian sistem giliran multiplayer dan pengesahan penerimaan tindakan oleh pelayan.

**Record of Discussion**
* Klien Godot berjaya berhubung dengan pelayan Node.js secara dua hala melalui WebSocket.
* Penyelia meminta hasil pengujian disokong oleh tangkap layar antaramuka dan log semakan ralat.

**Troubleshooting**
* **Isu:** Ralat penyegerakan state perlawanan (*state synchronization*) apabila senario bertukar.
* **Penyelesaian:** Menulis semula modulariti senario pelayan (`scenarioModule.js`) agar setiap tindakan serangan boleh diuji secara automatik (*unit testable*).

**Action List**
* Mengatur cara skrip klien Godot untuk sambungan WebSocket dua hala.
* Melaksanakan pengujian fungsi serangan Red Team dalam pelbagai senario.
* Mengambil tangkap layar antaramuka skrin permainan sebagai bukti fasa prototaip.

---

### Sesi 7: 17/11

**Item for Discussion**
* Semakan status keseluruhan projek Cyber Clash dan penilaian kematangan sistem menjelang fasa penilaian akhir.
* Pembentangan penambahbaikan konsep **Cyber Clash 2.0**: peralihan daripada permainan kad statik kepada simulasi 5 Fasa Ethical Hacking (*Reconnaissance, Scanning, Gaining Access, Maintaining Access, Covering Tracks*).
* Pengujian ketahanan multiplayer terhadap situasi luar jangka (pemain terputus sambungan secara tiba-tiba).
* Pengurusan rekod semakan versi (*Semantic Versioning*) dan penyediaan CHANGELOG.md (versi 0.3.0).

**Record of Discussion**
* Penyelia menyambut baik evolusi konsep 2.0 kerana mencerminkan fasa serangan siber sebenar dan memberi impak pembelajaran tinggi.
* Ahmad Irfan bertanggungjawab melengkapkan kod Red Team, suite ujian automatik, dan mendokumentasikan penyelesaian ralat.

**Troubleshooting**
* **Isu:** Pemain terputus sambungan di pertengahan perlawanan (*mid-match disconnect*) menyebabkan lobi tergantung.
* **Penyelesaian:** Membina logik penamatan lobi secara automatik dan melepaskan slot pemadanan pemain (*matchmaking*).
* **Pengujian:** Menjalankan 30 ujian unit automatik Node.js (`npm test`) bagi mengesahkan logik pelayan stabil sepenuhnya.

**Action List**
* Melengkapkan dokumen spesifikasi penuh Cyber Clash 2.0 dalam GDD.
* Mengemas kini fail CHANGELOG.md ke versi 0.3.0 dengan rekod troubleshooting lengkap.
* Menulis bahagian laporan Bab 4 berkaitan pembangunan dan pengujian modul Red Team.
* Menyediakan lampiran bukti pengujian, tangkap layar, dan slaid pembentangan akhir.

---

# 📸 Panduan Bahan Bukti BAHARU (Cyber Clash 2.0) untuk Dilampirkan bagi Setiap Sesi

Semua fail rajah lama Cyber Clash yang lapuk telah digugurkan. Gantikan lampiran anda dengan bahan **Cyber Clash 2.0** yang sah ini:

| Sesi & Tarikh | Tanggungjawab Rasmi (docx) | Bahan Bukti BAHARU 2.0 yang Perlu Anda Tampal / Lampirkan | Lokasi Fail / Tindakan |
|---|---|---|---|
| **Sesi 1 (18/8)** | Tanggungjawab 1 & 2 (Skop Red Team & Fungsi Serangan) | **Lakaran Kertas Idea Asas:** Lakaran kotak mudah di atas kertas menunjukkan idea asal penyerang (Red Team) vs pertahanan (Blue Team). | Lukis tangan ringkas di buku log. |
| **Sesi 2 (1/9)** | Tanggungjawab 4 (Komunikasi Multiplayer) | **Rajah Senibina Sistem 2.0:** Rajah terkini menunjukkan Klien Godot (Konsol Kali Linux & Desktop Windows 11) berhubung dengan Pelayan Node.js WebSocket. | [docs/diagrams/v2/system-architecture-2.0.svg](file:///d:/JMTi/Sem%204/FYP/Cyber-Clash/docs/diagrams/v2/system-architecture-2.0.svg) |
| **Sesi 3 (29/9)** | Tanggungjawab 5 (Lakaran Carta Alir Red Team) | **Carta Alir 5 Fasa Serangan Siber Red Team 2.0:** Rajah alir standard menunjukkan Fasa 1 (Recon) ➔ Fasa 2 (Scan) ➔ Fasa 3 (Exploit) ➔ Fasa 4 (Exfiltrate) ➔ Fasa 5 (Cover Tracks). | [docs/diagrams/v2/red-team-5-phases.svg](file:///d:/JMTi/Sem%204/FYP/Cyber-Clash/docs/diagrams/v2/red-team-5-phases.svg) |
| **Sesi 4 (6/10)** | Tanggungjawab 3 (Sistem Tindakan & Giliran) | **Carta Alir Interaksi Masa Nyata 2.0:** Carta jujukan pertukaran mesej WebSocket, cawangan keputusan mangsa (Silent Drop vs Reverse Shell), dan perlumbaan siren 10-20s. | [docs/diagrams/v2/gameplay-interaction-loop.svg](file:///d:/JMTi/Sem%204/FYP/Cyber-Clash/docs/diagrams/v2/gameplay-interaction-loop.svg) |
| **Sesi 5 (20/10)** | Tanggungjawab 6 (Penulisan Laporan Red Team) | **Keratan Dokumen GDD 2.0 Bahagian Red Team:** Cetak bahagian Bab 2 & Bab 3 GDD yang memperincikan logik serangan siber modular. | Rujuk [Cyber-Clash-Overhaul-GDD.md](file:///d:/JMTi/Sem%204/FYP/Cyber-Clash/docs/GDD/Cyber-Clash-Overhaul-GDD.md). |
| **Sesi 6 (3/11)** | Tanggungjawab 7 (Pengujian Fungsi Serangan) | **Format Data Payload WebSocket 2.0:** Cetak keratan format data JSON bagi tindakan serangan (topik umpan, spoofed sender, pilihan kelajuan muat turun aset). | Keratan kod mesej WebSocket JSON. |
| **Sesi 7 (17/11)** | Tanggungjawab 8 (Membaiki Ralat & Integrasi) | **Lakaran Tangan Konsep 2.0 & Bukti Commit:** <br>1. **Foto lakaran tangan asal** yang anda lukis di atas kertas (*Billionaire vs Hackers*, *Objective*, *Ranks C/B/A/S*).<br>2. Keratan commit Git `2a28dfb` (Versi 0.3.0). | Foto kertas anda & [CHANGELOG.md](file:///d:/JMTi/Sem%204/FYP/Cyber-Clash/CHANGELOG.md). |
