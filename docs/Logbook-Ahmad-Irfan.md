# Logbook Projek Cyber Clash — Ahmad Irfan Bin Hedher

**Nama Pelajar:** Ahmad Irfan Bin Hedher  
**Institusi:** Institut Teknikal Jepun-Malaysia (JMTi) — Sem 4  
**Tajuk Projek:** Cyber Clash — Web-Based 1v1 PvP Cybersecurity Simulation Game  
**Peranan:** Pembangunan Modul Red Team (Godot Engine & Node.js Server Integration)  

---

### 19/8

**Item for Discussion**
* Pembentangan idea awal projek Cyber Clash dan rasional pemilihannya berdasarkan silibus modul CU 03 Computer System Security Control di JMTi.
* Mengenal pasti jurang pembelajaran sedia ada, khususnya kekurangan platform latihan amali interaktif yang membolehkan pelajar merasai dinamik serangan siber sebenar dalam persekitaran terkawal.
* Perbincangan terperinci mengenai konsep simulasi 1v1 PvP (Player vs Player) berbanding model PvE (Player vs AI), dari segi impak pembelajaran dan penglibatan pelajar.
* Penetapan skop peranan Red Team (pihak penyerang), merangkumi taktik serangan asas seperti *Reconnaissance*, *Gaining Access*, dan *Maintaining Access*.
* Penentuan metodologi kerja kumpulan, pembahagian peranan utama antara tiga orang ahli kumpulan, dan penyelarasan garis masa kasar projek.
* Format penulisan logbook, laporan kemajuan projek, serta jangkaan penyelia terhadap pematuhan piawaian akademik JMTi.

**Record of Discussion**
* Penyelia memberi pandangan tentang kesesuaian tajuk projek dan mengesahkan bahawa topik simulasi keselamatan siber sangat relevan dengan keperluan industri IT.
* Penyelia mencadangkan agar permainan memberi nilai pembelajaran (*educational value*) yang jelas kepada pelajar IT, bukan sekadar hiburan kosong.
* Ahli kumpulan bersetuju membangunkan konsep PvP dengan pembahagian peranan: Ahmad Irfan (Red Team), Muhammad Azrul Aiman (Blue Team), dan Tarrsiny Vidyasshri (Scenario Generation & Scoring).
* Ahmad Irfan diberi tanggungjawab penuh bagi mereka bentuk, memprogram, menguji, dan mendokumentasikan keseluruhan modul Red Team.

**Troubleshooting**
* Mengatasi kekeliruan skop antara simulasi serangan peringkat lanjutan (advance penetration testing) dengan tahap kefahaman pelajar diploma asas IT.
* Memilih senarai serangan yang seimbang agar tidak terlalu rumit untuk diprogramkan dalam fasa prototaip namun tetap mewakili senario ancaman dunia sebenar.

**Action List**
* Memuktamadkan tajuk dan objektif projek bersama ahli kumpulan.
* Menyenaraikan skop pembangunan sistem dan had keupayaan prototaip.
* Membuat kajian awal terhadap fungsi serangan Red Team berasaskan rangka kerja keselamatan siber standard.
* Menyediakan lakaran konsep awal permainan dan aliran interaksi antara penyerang dan pertahanan.

---

### 2/9

**Item for Discussion**
* Penyelarasan objektif terperinci dan skop teknikal projek bagi mengelakkan pertindihan fungsi antara modul ahli kumpulan.
* Pemilihan platform dan perisian pembangunan (*tech stack*): perbandingan antara Godot Engine, Unity, dan pembangunan web tulen (HTML5/Canvas).
* Rasional penggunaan Node.js dan WebSocket sebagai pelayan autoritatif berpusat untuk mengendalikan komunikasi masa nyata perlawanan.
* Perancangan seni bina asas modul Red Team, merangkumi komponen antaramuka pemain (UI), pemprosesan tindakan giliran (*turn processing*), dan pemformatan payload data JSON.
* Penentuan senarai fungsi serangan awal yang praktikal untuk dilaksanakan pada fasa awal (seperti *Modify Event*, *Add Malicious Link*, dan *Spoof Source*).
* Struktur penulisan Bab 1 Laporan Projek: Latar Belakang, Pernyataan Masalah, Persoalan Kajian, Objektif Projek, dan Skop Projek.

**Record of Discussion**
* Projek diputuskan menggunakan Godot Engine sebagai platform pembangunan utama kerana cirinya yang ringan, sokongan eksport web/desktop yang baik, dan kemudahan bahasa GDScript.
* Pelayan Node.js disahkan sebagai arkitektur pelayan autoritatif bagi memastikan semua pengiraan markah, pengesahan giliran, dan rahsia perlawanan diurus secara berpusat.
* Ahmad Irfan bertanggungjawab membangunkan tindakan serangan dan sistem giliran Red Team dalam Godot serta menyambungkannya dengan pelayan.
* Fungsi serangan awal dipertimbangkan termasuk *Modify Event*, *Add Malicious Link* dan *Spoof Source*.

**Troubleshooting**
* Menentukan struktur komunikasi antara klien Godot dengan pelayan Node.js agar mesej tindakan Red Team dihantar dalam bentuk payload JSON yang standard dan selamat.
* Memastikan logik permainan tidak diletakkan sepenuhnya pada klien bagi mengelakkan isu manipulasi data atau percanggahan state perlawanan.

**Action List**
* Menyediakan kandungan awal Bab 1 mengikut format piawai.
* Membuat kajian literatur berkaitan simulasi keselamatan siber dan corak permainan *turn-based*.
* Membina lakaran aliran tindakan Red Team dari fasa persediaan hingga penghantaran serangan.
* Merancang hubungan sistem giliran Red Team dengan giliran penyiasatan Blue Team.

---

### 30/9

**Item for Discussion**
* Reka bentuk terperinci mekanik permainan dalam Game Design Document (GDD), memfokuskan kepada peraturan giliran perlawanan (*turn rules*), fasa tindakan, dan pengiraan kemenangan.
* Pembahagian sempadan maklumat antara Red Team dan Blue Team berasaskan prinsip *Information Asymmetry* (penyerang mengetahui senario sebenar, manakala pertahanan hanya melihat bukti/petunjuk).
* Perincian parameter setiap tindakan serangan Red Team: kos giliran (*action point/turn limit*), jenis manipulasi bukti, dan kesan langsung terhadap petunjuk senario.
* Reka bentuk susun atur antaramuka pengguna (UI) Red Team dalam Godot: panel pilihan serangan, paparan butiran senario tersembunyi, log tindakan, dan status masa nyata.
* Struktur payload mesej JSON antara klien Red Team dan pelayan Node.js semasa fasa serangan dihantar.

**Record of Discussion**
* Permainan menggunakan konsep PvP untuk dua pemain, di mana Red Team memulakan tindakan serangan dan Blue Team bertindak balas sebagai pihak pertahanan.
* Setiap tindakan Red Team perlu mempunyai kesan yang jelas terhadap keputusan dan aliran permainan.
* Maklumat private Red Team (seperti motif sebenar, pautan berniat jahat yang disuntik, atau pengubahsuaian sumber log) ditegaskan oleh penyelia agar tidak sekali-kali terdedah pada klien Blue Team sebelum perlawanan tamat.

**Troubleshooting**
* Mengesan potensi maklumat Red Team bocor melalui pemaparan state permainan apabila pelayan menyiarkan data tanpa penapisan.
* Melaksanakan pemisahan maklumat private menggunakan paparan berasingan untuk Red Team dan Blue Team pada peringkat pelayan.
* Menguji supaya Red Team mendapat maklumat private scenario, manakala Blue Team tidak mendapatnya.
* Menambah pemeriksaan untuk menolak tindakan Red Team yang tidak sah atau di luar senarai dibenarkan.

**Action List**
* Menyediakan seksyen spesifikasi Red Team dalam dokumen GDD.
* Membuat lakaran carta alir modul Red Team yang terperinci.
* Melaksanakan pemisahan paparan maklumat Red Team dan Blue Team pada skrip pelayan.
* Menyediakan lakaran antaramuka (*UI mockups*) untuk modul Red Team di Godot.

---

### 7/10

**Item for Discussion**
* Pemilihan dan justifikasi metodologi pembangunan sistem: penilaian model Waterfall berbanding Agile bagi projek tahun akhir dengan tempoh masa terhad.
* Pembahagian fasa pembangunan berasaskan Waterfall: Fasa Analisis Keperluan, Reka Bentuk Sistem, Pelaksanaan/Pengkodan Modul, Pengujian, dan Integrasi.
* Penyediaan Carta Gantt terperinci: pembahagian tarikh sasaran untuk pembangunan skrip klien Godot, pengaturcaraan pelayan WebSocket, pengujian unit, dan penulisan laporan.
* Perancangan logik giliran perlawanan (*turn management*): penetapan fasa peralihan antara tindakan Red Team dan tindakan tindak balas Blue Team.
* Analisis risiko teknikal semasa fasa pembangunan: kemungkinan berlakunya konflik keadaan perlawanan (*state race conditions*), kegagalan sambungan rangkaian, atau penghantaran aksi berulang kali.

**Record of Discussion**
* Kaedah pembangunan Waterfall dipilih kerana susunan fasa yang sistematik memudahkan pemantauan kemajuan mingguan oleh penyelia.
* Pembangunan dibahagikan kepada beberapa fasa mengikut keperluan dan integrasi sistem.
* Fungsi serangan perlu diselaraskan dengan GDD dan giliran permainan bagi mengelakkan ralat logik.
* Ahmad Irfan memulakan perancangan carta alir pembangunan modul Red Team dan penjadualan tugas teknikal.

**Troubleshooting**
* Mengawal urutan giliran supaya Red Team hanya boleh bertindak pada fasa yang dibenarkan oleh pelayan.
* Menentukan pilihan tindakan Red Team selepas giliran Red Team tamat agar pemain tidak tergantung tanpa maklum balas.
* Menolak tindakan lama atau tidak sah supaya tidak mengganggu keadaan perlawanan sekiranya berlaku kelewatan rangkaian (*latency*).

**Action List**
* Menyediakan carta alir metodologi pembangunan Waterfall.
* Menyediakan carta Gantt projek yang lengkap dengan fasa pembangunan Red Team.
* Mengatur urutan pembangunan modul Red Team daripada pengaturcaraan antaramuka hingga sambungan pelayan.
* Membina logik urutan tindakan dan giliran Red Team pada pelayan Node.js.

---

### 21/10

**Item for Discussion**
* Semakan draf laporan kemajuan Bab 1 (Pengenalan) dan Bab 2 (Kajian Literatur) bersama penyelia dari segi format penulisan, gaya bahasa, dan rujukan ilmiah.
* Penyelarasan format tajuk, subtajuk, dan nombor seksyen laporan mengikut format buku panduan Projek Tahun Akhir JMTi.
* Semakan pemodelan sistem Red Team: lakaran Carta Alir (*Flowchart*), Rajah Blok (*Block Diagram*), dan Carta Alir Interaksi (*Activity Diagram*).
* Perbincangan mengenai penyeragaman nama dan istilah teknikal fungsi serangan di antara dokumen GDD, kod sumber GDScript, dan fail pelayan JavaScript.
* Keperluan dokumentasi penyelesaian ralat (*troubleshooting documentation*) sebagai bukti autentik proses pembangunan teknikal.

**Record of Discussion**
* Penyelia meminta format tajuk dan kandungan laporan diselaraskan mengikut templat rasmi JMTi.
* Lakaran carta alir perlu menjelaskan aliran serangan dan giliran Red Team dengan langkah input, proses pengesahan, dan output yang jelas.
* Penulisan laporan perlu merangkumi pembangunan modul, cabaran teknikal yang dihadapi, pengujian fungsi, dan cara penyelesaian masalah.

**Troubleshooting**
* Membetulkan struktur laporan supaya teratur mengikut format yang ditetapkan dan membuang format lapuk.
* Mengemas kini nama dan istilah fungsi serangan supaya konsisten (contoh: menggugurkan fungsi `change_tactic` lama dan menggantikannya dengan konsep adaptasi serangan).
* Menambah dokumentasi berdasarkan proses pembinaan dan ralat sebenar yang ditemui semasa sesi pengaturcaraan.
* Mengintegrasikan lakaran carta alir Red Team ke dalam fail laporan utama.

**Action List**
* Membetulkan format tajuk, jidar, dan penomboran laporan Bab 1 dan Bab 2.
* Mengemas kini kandungan laporan dengan memasukkan penerangan terperinci modul Red Team.
* Menulis dokumentasi logik dan melukis carta alir Red Team yang bersih dan kemas.
* Menambah bukti lakaran atau tangkap layar fasa awal pembangunan ke dalam fail dokumentasi.

---

### 4/11

**Item for Discussion**
* Pembentangan kemajuan prototaip sistem: demonstrasi sambungan soket secara langsung antara klien Godot Red Team dan pelayan tempatan Node.js.
* Semakan pelaksanaan tindakan serangan utama (*Modify Event*, *Add Malicious Link*, *Spoof Source*) dan pengesahan impaknya terhadap parameter bukti permainan.
* Pengujian sistem giliran multiplayer: memastikan tindakan Red Team berjaya diterima oleh pelayan, dikunci, dan mencetuskan fasa giliran untuk Blue Team secara konsisten.
* Semakan keselarasan dokumen GDD dengan perubahan kod terkini, khususnya penstrukturan semula fail senario JSON (`server/scenarios/`).
* Perbincangan mengenai kaedah merekod ralat, log konsol, dan bukti pengujian bagi tujuan pembentangan dan semakan penyelia.

**Record of Discussion**
* Ahmad Irfan telah merancang dan memprogram tindakan serta giliran Red Team menggunakan Godot Engine dan berjaya berhubung dengan pelayan.
* Sistem multiplayer perlu menerima tindakan Red Team dan memaparkan keputusan serta status giliran secara konsisten tanpa ada kelewatan yang menyebabkan ralat paparan.
* Dokumentasi GDD dan fail arahan modul Red Team perlu dikemas kini selaras dengan senario baharu yang ditambah.

**Troubleshooting**
* Mengatasi masalah paparan tindakan yang masih aktif selepas Red Team menghantar tindakan (butang masih boleh ditekan semula).
* Menambah penguncian tindakan (*action locking*) pada butang UI Godot supaya Red Team tidak boleh bertindak berkali-kali dalam giliran yang sama.
* Menukar strategi serangan generik kepada tindakan adaptasi yang spesifik untuk setiap senario siber.
* Mengeluarkan tindakan `change_tactic` lama dan memastikan sebarang cubaan menghantar payload tersebut ditolak dengan mesej ralat yang sesuai.
* Menghalang maklumat adaptasi serangan Red Team daripada didedahkan kepada antaramuka Blue Team.
* Memastikan Blue Team hanya menerima maklumat bukti yang dibenarkan mengikut kebenaran senario.

**Action List**
* Mengemas kini dokumen GDD dengan senarai tindakan adaptasi senario terkini.
* Mengembangkan sistem giliran dan memantapkan interaksi UI Red Team dalam Godot.
* Melaksanakan pengujian fungsi tindakan serangan bagi setiap senario yang disediakan.
* Merekod ralat dan penyelesaian semasa proses integrasi ke dalam fail catatan pembangunan.
* Mengintegrasikan logik Red Team dengan modul pelayan Node.js secara menyeluruh.

---

### 18/11

**Item for Discussion**
* Penilaian status kesiapsiagaan menyeluruh projek Cyber Clash menjelang fasa penilaian akhir FYP Semester 4.
* Semakan mendalam terhadap nilai pembelajaran (*educational value*) bagi setiap tindakan serangan Red Team: adakah ia mencerminkan konsep ancaman siber sebenar yang dipelajari dalam silibus IT.
* Pengujian ketahanan dan integriti sistem multiplayer: simulasi situasi luar jangka seperti pemain terputus sambungan secara tiba-tiba (*network disconnection* / *browser close*).
* Semakan pelaksanaan ujian automatik (*automated testing*) menggunakan suite ujian Node.js (`node --test`) untuk mengesahkan kestabilan logik perlawanan.
* Pembahagian tugas persediaan pembentangan akhir, penyediaan bahan slaid pembentangan, video demonstrasi prototaip, dan kelengkapan lampiran laporan.
* Piawaian pengurusan kawalan versi (*Version Control*): penyelarasan fail CHANGELOG.md mengikut spesifikasi *Semantic Versioning* (SemVer) dari versi awal hingga versi semasa `0.2.5`.

**Record of Discussion**
* Penyelia menegaskan bahawa permainan perlu memberi manfaat pembelajaran yang nyata kepada pelajar IT dalam memahami taktik penyerang dan pertahanan.
* Red Team perlu mempunyai pilihan serangan yang relevan dengan konsep keselamatan siber semasa (contoh: *phishing*, *malware download*, *credential manipulation*, dan *spoofing*).
* Tindakan Red Team perlu disambungkan dengan respons Blue Team secara logik dan adil dari segi pengiraan markah.
* Sistem multiplayer perlu membolehkan pemain menghantar tindakan dan menerima keputusan dalam giliran mereka tanpa berlaku situasi permainan tergantung (*hung state*).
* Setiap tindakan Red Team perlu direkodkan untuk pengiraan skor perlawanan, log audit pengujian, dan lampiran dokumentasi.

**Troubleshooting**
* Membetulkan ralat putus sambungan ketika perlawanan sedang berjalan (*mid-match disconnect*) supaya lobi ditamatkan secara automatik dan slot pemadanan (*matchmaking*) dibebaskan serta-merta.
* Menguji dan memastikan pemain baharu tidak dapat menyertai perlawanan yang sudah ditinggalkan atau tidak sah.
* Memastikan perlawanan yang sedang berjalan lancar masih boleh menyelesaikan pusingan (*round resolution*) dan meneruskan pusingan seterusnya tanpa gangguan.
* Memastikan tindak balas pelayan menolak secara automatik sekiranya tindakan Red Team tidak sah atau dihantar pada fasa yang salah.
* Memastikan data rahsia (*private scenario state*) Red Team tidak sesekali disertakan dalam paparan atau payload Blue Team.
* Menjalankan ujian menyeluruh terhadap tindakan Red Team, adaptasi senario, giliran Blue Team, dan penentuan keputusan akhir melalui Node.js test suite.

**Action List**
* Melengkapkan fungsi dan melukis carta alir akhir bagi modul Red Team.
* Menguji tindakan serangan *Modify Event*, *Add Malicious Link* dan *Spoof Source* merentasi pelbagai senario permainan.
* Melaksanakan pengujian menyeluruh terhadap sistem giliran Red Team dalam mod multiplayer.
* Membaiki ralat putus sambungan dan memastikan penyelarasan lobi multiplayer berjalan lancar.
* Mengintegrasikan modul Red Team dengan modul Blue Team dan komponen senario pelayan.
* Menulis bahagian laporan Bab 4 berkaitan pembangunan dan pengujian modul Red Team.
* Menyediakan tangkap layar antara muka permainan, rajah sistem, dan log bukti pengujian untuk slaid pembentangan.
* Meneruskan pemurnian prototaip Cyber Clash menggunakan Godot Engine dan pelayan Node.js.

---

### Lampiran Rujukan Fail Projek:
* Tangkap layar UI Klien Godot: [ui-game-screen.png](file:///d:/JMTi/Sem%204/FYP/Cyber-Clash/docs/diagrams/ui-game-screen.png)
* Dokumen Reka Bentuk Permainan (GDD): [Game-Design-Document.md](file:///d:/JMTi/Sem%204/FYP/Cyber-Clash/docs/GDD/Game-Design-Document.md)
* Rekod Sejarah Versi & Troubleshooting: [CHANGELOG.md](file:///d:/JMTi/Sem%204/FYP/Cyber-Clash/CHANGELOG.md)
* Jadual Pembahagian Tugasan Kumpulan: [pembahagian tugasan.docx](file:///d:/JMTi/Sem%204/FYP/Cyber-Clash/pembahagian%20tugasan.docx)
