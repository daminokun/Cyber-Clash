# Cyber Clash

## Dokumen Reka Bentuk Permainan (GDD) v0.1

---

## 1. Gambaran Keseluruhan Permainan

### 1.1 Tajuk Permainan

**Cyber Clash**

### 1.2 Jenis Permainan

Permainan simulasi keselamatan siber ini menampilkan perlawanan pemain lawan pemain (PvP).

### 1.3 pemain

Permainan ini direka untuk **dua pemain**:

* **Red Team** - bertindak sebagai penyerang.
* **Blue Team** - bertindak sebagai pembela.

### 1.4 Pemain Sasaran

Permainan ini direka untuk pemula yang ingin mempelajari konsep asas keselamatan siber melalui permainan interaktif.

### 1.5 Platform

Permainan ini akan dibangunkan menggunakan **Godot** dan akan menyokong permainan berbilang pemain melalui sistem client-server.

---


## 2. Konsep Permainan

Cyber Clash ialah permainan simulasi keselamatan siber 1v1 yang memberikan Red Team dan Blue Team maklumat serta objektif yang berbeza.

Red Team cuba mengeksploitasi, memanipulasi atau memperdaya Blue Team melalui pelbagai senario keselamatan siber. Walau bagaimanapun, Red Team tidak perlu menyerang setiap senario.

Blue Team menerima peristiwa atau situasi tanpa mengetahui sama ada peristiwa itu normal, telah dimanipulasi oleh Red Team atau dijana oleh permainan sebagai peristiwa yang tidak dijangka.

Keadaan ini menimbulkan ketidakpastian semasa permainan. Blue Team mesti menyiasat situasi tersebut dan menentukan tindak balas berdasarkan bukti yang tersedia.

Konsep utama permainan ialah:

> **Sesuatu peristiwa tidak semestinya bermakna serangan telah berlaku.**

Permainan ini menekankan **penipuan, pembuatan keputusan, maklumat yang tidak lengkap dan peristiwa yang tidak dijangka**, bukannya sekadar meminta pemain mengenal pasti serangan siber.

---


## 3. Permainan Teras

Cyber Clash menggunakan sistem senario berasaskan giliran. Red Team dan Blue Team berinteraksi dalam senario yang sama, tetapi menerima maklumat yang berbeza.

Setiap senario mengikut urutan tindakan yang ditetapkan. Red Team cuba mencapai objektif senario melalui serangan, manipulasi atau penipuan, manakala Blue Team menyiasat bukti yang tersedia dan memilih tindak balas pertahanan yang sesuai.

Server permainan mengurus keadaan senario, mengesahkan tindakan pemain dan menentukan hasil akhir.

### 3.1 Penjanaan Senario

Pada permulaan setiap pusingan, server menjana senario menggunakan templat yang telah ditetapkan serta variasi yang dikawal.

Prototaip awal akan menyokong empat kategori senario utama:

- E-mel
- Log Masuk Aktiviti
- Peranti USB
- Rangkaian Aktiviti

Setiap senario mengandungi peristiwa awal, keadaan tersembunyi, tindakan pemain yang tersedia dan hasil yang berkemungkinan.

Senario mungkin sah, memberikan peluang kepada Red Team atau mengandungi keadaan yang membolehkan insiden keselamatan berlaku.

### 3.2 Fasa Red Team

Red Team menerima maklumat peribadi tentang senario, termasuk peluang yang berkaitan dan tindakan yang tersedia.

Pemain memilih satu tindakan yang sah berdasarkan senario semasa. Tindakan yang mungkin termasuk:

- Jangan Lakukan Apa-apa
- Ubah Suai Peristiwa
- Tambah Pautan Berniat Jahat
- Palsukan Sumber
- Cipta Gangguan, jika disokong oleh senario

Server mengesahkan tindakan yang dipilih dan mengemas kini keadaan tersembunyi senario.

Memilih Jangan Lakukan Apa-apa ialah keputusan strategik yang sah. Red Team tidak perlu menyerang setiap senario.

### 3.3 Fasa Blue Team

Selepas tindakan Red Team diproses, Blue Team menerima maklumat peristiwa yang dibenarkan oleh keadaan senario semasa.

Blue Team tidak menerima maklumat peribadi Red Team atau keseluruhan keadaan tersembunyi senario.

Pemain boleh memeriksa maklumat yang tersedia dan menyiasat peristiwa untuk mendapatkan bukti tambahan. Hasil siasatan mungkin tidak lengkap dan tidak semestinya mendedahkan punca sebenar peristiwa.

Selepas fasa siasatan, peristiwa yang tidak dijangka mungkin berlaku jika dibenarkan oleh senario semasa. Blue Team menerima maklumat tentang peristiwa baharu mengikut peraturan maklumat permainan.

Blue Team kemudian menilai bukti yang tersedia dan sebarang peristiwa baharu sebelum memilih tindak balas akhir, seperti:

- Lapor
- Abaikan
- Sekat
- Laksanakan tindakan pertahanan khusus senario

Tindakan yang tersedia bergantung pada senario dan keadaan semasanya.

### 3.4 Peristiwa Tidak Dijangka

Peristiwa yang tidak dijangka mungkin berlaku apabila syarat senario yang telah ditetapkan dipenuhi.

Peristiwa yang tidak dijangka mungkin dijana secara berasingan daripada tindakan Red Team atau mungkin timbul akibat tindakan yang diambil semasa permainan.

Dalam prototaip awal, satu senario mungkin mengandungi satu peristiwa utama dan maksimum satu peristiwa sekunder pada satu-satu masa.

server menentukan punca sebenar peristiwa dan mengemas kini keadaan senario sewajarnya. Blue Team hanya menerima maklumat yang dibenarkan oleh peraturan maklumat permainan.

Peristiwa yang tidak dijangka mesti mewujudkan ketidakpastian yang bermakna tanpa menjamin kejayaan mana-mana pemain secara automatik.

### 3.5 Penyelesaian Senario

Selepas tindakan yang diperlukan dilengkapkan oleh pemain, server menyelesaikan senario.

Server menilai:

- asal senario keadaan.
- Tindakan yang dipilih oleh Red Team.
- Siasatan dan tindak balas akhir Blue Team.
- Bukti yang tersedia.
- Sebarang peristiwa yang tidak dijangka.
- Objektif dan syarat senario.

server menentukan hasil menggunakan peraturan penyelesaian yang telah ditetapkan, bukannya bergantung pada client pemain.

Hasil yang mungkin termasuk serangan berjaya, serangan yang dihalang, positif palsu, cubaan penipuan yang gagal atau senario tanpa kesan keselamatan yang ketara.

### 3.6 Pemarkahan dan Kemas Kini Keadaan Permainan

Selepas menyelesaikan senario, server mengira perubahan skor dan mengemas kini keadaan perlawanan.

Peraturan pemarkahan mengambil kira hasil sebenar dan keberkesanan keputusan setiap pemain. Percubaan menyerang atau melaporkan peristiwa tidak memberikan mata secara automatik.

server then menyediakan setiap pemain dengan sesuai senario summary tanpa revealing maklumat itu mesti remain tersembunyi semasa active perlawanan.

### 3.7 Senario Seterusnya

If perlawanan mempunyai tidak reached its end condition, server generates seterusnya senario dan repeats permainan iniplay urutan.

untuk awal prototaip, perlawanan akan menggunakan fixed number daripada pusingan. tepat number daripada pusingan dan mata values akan menjadi established semasa implementation dan permainan pengujian.

### 3.8 Permainan Teras Loop

core permainan loop ialah:

**Menjana Senario -> Tindakan Red Team -> Siasatan Blue Team -> Pemprosesan Peristiwa Tidak Dijangka (jika berkenaan) -> Tindak Balas Akhir Blue Team -> Penyelesaian Server -> Kemas Kini Skor -> Senario Seterusnya**

Struktur ini membolehkan kedua-dua pemain membuat keputusan yang bermakna sambil mengekalkan ketidakpastian, penipuan dan maklumat tidak lengkap yang menjadi teras Cyber Clash.

---


## 4. Red Team

Red Team represents penyerang dalam Cyber Clash. Its primary objektif ialah exploit tersedia peluang, manipulate peristiwa-peristiwa atau mislead Blue Team manakala mencuba achieve objektif daripada setiap senario.

Red Team menerima peribadi maklumat itu ialah tidak tersedia Blue Team. Ini maklumat mungkin termasuk asal peristiwa status, tersedia peluang, mungkin tindakan dan relevant senario syarat.

Red Team tidak tidak need serangan setiap senario. memilih tidak act mungkin menjadi sah strategi apabila serangan ialah unnecessary atau apabila taking tindakan could increase risk daripada detection.

### 4.1 Red Team Maklumat

Pada permulaan Red Team fasa, pemain menerima maklumat khusus semasa senario.

Contoh:

**Senario:** Satu pekerja menerima e-mel claiming menjadi daripada university IT jabatan.

**Red Team Maklumat:**
- asal E-mel Status: sah
- tersedia Peluang: E-mel manipulasi
- tersedia Tindakans: Jangan Lakukan Apa-apa, Ubah Suai Peristiwa, Tambah Pautan Berniat Jahat, Palsukan Sumber

maklumat displayed bergantung pada senario. Red Team tidak tidak secara automatik menerima setiap mungkin tindakan dalam setiap pusingan.

### 4.2 Red Team Tindakans

awal prototaip supports following tindakan jenis apabila applicable semasa senario.

| Tindakan | Penerangan |
|---|---|
| Jangan Lakukan Apa-apa | Leaves peristiwa unchanged dan takes no direct tindakan. |
| Ubah Suai Peristiwa | perubahan dipilih properties daripada peristiwa mempengaruhi how Blue Team interprets it. |
| Tambah Pautan Berniat Jahat | Adds simulated malicious pautan suitable senario, seperti e-mel. |
| Palsukan Sumber | perubahan displayed identity atau sumber maklumat membuat peristiwa appear originate elsewhere. |
| Cipta Gangguan | Introduces secondary peristiwa intended divert Blue Team's attention daripada another peluang. |

setiap tindakan mesti satisfy senario yang telah ditetapkan peraturan. Satu tindakan itu ialah incompatible dengan semasa senario akan tidak menjadi tersedia atau akan menjadi rejected oleh server.

These tindakan ialah simulated dalam permainan ini dan do tidak melaksanakan serangan against real systems.

### 4.3 Jangan Lakukan Apa-apa strategi

Jangan Lakukan Apa-apa ialah sah Red Team keputusan.

pemain mungkin memilih ini tindakan preserve existing peluang, mengelakkan revealing mencurigakan aktiviti atau membolehkan senario proceed tanpa interference.

Sebagai contoh, if e-mel ialah sah dan Red Team chooses Jangan Lakukan Apa-apa, Blue Team mungkin masih membuat incorrect keputusan oleh melaporkan it as malicious.

However, Red Team tidak tidak secara automatik menerima mata semata-mata untuk memilih Jangan Lakukan Apa-apa. Sebarang skor change bergantung pada senario hasil dan ditetapkan pemarkahan peraturan.

### 4.4 penipuan dan gangguan

Red Team mungkin attempt mislead Blue Team oleh manipulating peristiwa, presenting mengelirukan maklumat atau creating gangguan.

Sebagai contoh, Red Team mungkin introduce mencurigakan login notification manakala mengekalkan peluang involving berasingan e-mel senario.

Blue Team mesti menentukan yang peristiwa menyiasat berdasarkan tersedia maklumat dan bukti.

untuk awal prototaip, Cipta Gangguan ialah hanya tersedia apabila senario supports compatible secondary peristiwa. Permainan ini mesti tidak membolehkan arbitrary peristiwa-peristiwa itu cannot menjadi resolved oleh senario peraturan.

### 4.5 Tindakan Pengesahan dan tersembunyi keadaan

apabila Red Team memilih tindakan, server validates request sebelum applying its effects.

validation proses checks:

- sama ada pemain ialah assigned Red Team.
- sama ada semasa fasa membolehkan tindakan.
- sama ada tindakan ialah tersedia dalam semasa senario.
- sama ada tindakan memenuhi senario syarat.
- sama ada sebarang applicable resource atau usage limits ialah met.

selepas validation, server kemas kini tersembunyi senario keadaan. Blue Team menerima hanya resulting peristiwa maklumat dan bukti dibenarkan oleh maklumat sistem.

Red Team peribadi maklumat dan dipilih tindakan mesti tidak menjadi secara langsung exposed Blue Team sebelum senario ialah resolved.

### 4.6 Red Team objektifs

Red Team mungkin menjadi evaluated berdasarkan its ability kepada:

- Achieve objektif ditetapkan oleh senario.
- dengan berjaya exploit sah peluang.
- mengelakkan detection atau berkesan defensive tindakan.
- Mislead Blue Team apabila penipuan ialah disokong oleh senario.
- menggunakan tindakan efficiently tanpa creating unnecessary bukti.

tidak setiap objektif applies setiap senario. server menentukan sama ada objektif mempunyai telah achieved berdasarkan akhir senario keadaan.

### 4.7 Red Team Reka Bentuk Prinsip

Red Team sistem follows theseprinsip:

- **strategik choice:** pemain mungkin serangan, deceive atau do nothing.
- **Senario-dependent tindakan:** tersedia tindakan depend pada semasa senario.
- **tersembunyi keadaan:** server maintains maklumat itu mesti tidak menjadi exposed Blue Team.
- **Fair penyelesaian:** Tindakans menghasilkan outcomes according yang telah ditetapkan peraturan.
- **Controlled complexity:** awal prototaip menggunakan terhad set daripada tindakan itu boleh menjadi tested dan balanced.

Red Team ialah direka encourage strategik thinking sebaliknya daripada semata-mata selecting serangan dalam setiap pusingan.

---


## 5. Blue Team

Blue Team represents pembela dalam Cyber Clash. Its primary objektif ialah mengenal pasti genuine ancaman, melindungi simulated persekitaran dan membuat sesuai keselamatan keputusan berdasarkan tersedia maklumat.

Blue Team menerima awam senario maklumat dan sebarang tambahan bukti obtained melalui siasatan. However, it tidak tidak menerima Red Team peribadi maklumat atau lengkap tersembunyi senario keadaan.

Blue Team mesti consider sama ada peristiwa ialah sah, mencurigakan, dimanipulasi oleh Red Team atau associated dengan tidak dijangka peristiwa sebelum selecting tindak balas.

### 5.1 Blue Team Maklumat

semasa Blue Team fasa, pemain menerima peristiwa maklumat dibenarkan oleh semasa senario.

Contoh:

**Senario:** Satu pekerja menerima e-mel claiming menjadi daripada university IT jabatan.

**tersedia Maklumat:**
- penghantar: `it-menyokong@university-contoh.com`
- subjek: penting Account Verification
- Message: pekerja ialah asked verify their akaun.
- awal Evidence: terhad penghantar dan message maklumat.

displayed maklumat bergantung pada senario. It mungkin contain sah butiran, mencurigakan petunjuk atau tidak lengkap maklumat.

Blue Team mesti tidak assume itu peristiwa ialah malicious semata-mata because it appears luar biasa.

### 5.2 Blue Team Tindakans

awal prototaip supports following tindakan apabila applicable semasa senario.

| Tindakan | Penerangan |
|---|---|
| Periksa | Examines maklumat already tersedia dalam senario, seperti penghantar, peristiwa butiran atau displayed petunjuk. |
| Siasat | Requests tambahan bukti daripada server, seperti pautan destination, login sejarah atau relevant keselamatan petunjuk. |
| Lapor | Submits keselamatan concern untuk evaluation oleh senario peraturan. |
| Abaikan | Takes no selanjutnya tindakan against semasa peristiwa. |
| Sekat | Applies defensive measure disokong target, seperti penghantar, sumber atau simulated akaun. |

Tindakan ini mempunyai tujuan yang berbeza. Periksa menilai maklumat yang
tersedia, manakala Siasat meminta bukti tambahan. Lapor menandakan potensi
ancaman, manakala Sekat cuba menghalang aktiviti lanjut terhadap sasaran yang
sah.

tindakan tersedia Blue Team depend pada semasa senario dan its keadaan.

### 5.3 Periksaion dan siasatan

Periksaion dan siasatan membolehkan Blue Team improve its understanding daripada peristiwa sebelum membuat akhir keputusan.

**Periksa** ialah digunakan review maklumat already displayed oleh permainan ini. It tidak tidak necessarily reveal baharu tersembunyi maklumat.

**Siasat** requests tambahan bukti itu semasa senario permits pemain akses. bergantung pada senario, ini mungkin termasuk:

- penghantar atau sumber butiran.
- pautan destinations.
- lampiran maklumat.
- Previous login aktiviti.
- Relevant peristiwa sejarah.
- Basic keselamatan petunjuk.

siasatan hasil mungkin menjadi tidak lengkap. sesetengah bukti mungkin remain untersedia, ambiguous atau mengelirukan because daripada senario tersembunyi syarat.

untuk awal prototaip, siasatan hasil ialah ditentukan oleh yang telah ditetapkan senario peraturan sebaliknya daripada unrestricted real-world keselamatan analysis.

### 5.4 Laporing dan Defensive tindak balas

selepas reviewing tersedia maklumat, Blue Team mungkin melaporkan suspected ancaman atau melaksanakan defensive tindakan.

**Lapor** submits peristiwa untuk evaluation. It tidak tidak secara automatik stop serangan unkurang senario explicitly defines itu behaviour.

**Sekat** cuba menghalang aktiviti yang melibatkan sasaran yang disokong.
Keberkesanannya bergantung pada keadaan sebenar senario dan sasaran yang
dipilih.

Other defensive tindakan, seperti mengunci simulated akaun atau isolating USB peranti, mungkin menjadi introduced untuk senario-senario itu menyokong them.

Satu defensive tindakan mungkin menjadi ineffective if target ialah incorrect, ancaman mempunyai already progressed atau tindakan tidak tidak address sebenar problem.

### 5.5 Positif Palsus dan Missed ancaman

Satu palsu positif berlaku apabila Blue Team incorrectly identifies sah peristiwa as ancaman.

Sebagai contoh, if Red Team chooses Jangan Lakukan Apa-apa semasa sah e-mel senario, melaporkan e-mel as malicious mungkin hasil dalam palsu positif.

Satu missed ancaman berlaku apabila Blue Team fails mengenal pasti atau respond effectively genuine ancaman.

These outcomes mungkin affect Blue Team's skor dan simulated keselamatan keadaan according senario dan pemarkahan peraturan.

However, melaporkan mencurigakan peristiwa hendaklah tidak secara automatik menjadi treated as mistake semata-mata because tersedia bukti ialah inconclusive. evaluation mesti consider maklumat reasonably tersedia pemain apabila keputusan ialah dibuat.

### 5.6 Handling ketidakpastian dan penipuan

Blue Team mungkin encounter several jenis daripada peristiwa-peristiwa:

- sah aktiviti itu resembles ancaman.
- peristiwa dimanipulasi oleh Red Team.
- Secondary peristiwa-peristiwa intended mencipta distractions.
- tidak dijangka peristiwa-peristiwa dijana oleh permainan ini sistem.
- Genuine ancaman accompanied oleh tidak lengkap atau mengelirukan bukti.

Blue Team mesti prioritize its siasatan dan memilih sesuai tindak balas tanpa having lengkap maklumat.

untuk awal prototaip, permainan ini akan menggunakan terhad set daripada yang telah ditetapkan siasatan hasil dan defensive outcomes keep permainan iniplay understandable dan testable.

### 5.7 Blue Team objektifs

Blue Team mungkin menjadi evaluated berdasarkan its ability kepada:

- mengenal pasti genuine ancaman.
- menghalang atau limit berjaya serangan.
- Gather relevant bukti.
- memilih sesuai defensive tindak balas.
- mengelakkan unnecessary atau ineffective tindakan.
- Recognize penipuan apabila sufficient bukti ialah tersedia.

pemarkahan sistem mesti evaluate sebenar hasil dan quality daripada keputusan sebaliknya daripada rewarding setiap melaporkan atau defensive tindakan secara automatik.

### 5.8 Blue Team Reka Bentuk Prinsip

Blue Team sistem follows theseprinsip:

- **Evidence-berdasarkan keputusan:** pemain hendaklah menggunakan tersedia maklumat sebaliknya daripada rely pada rawak guessing.
- **bermakna tindakan:** Periksaion, siasatan, melaporkan dan blocking serve berbeza purposes.
- **tidak lengkap maklumat:** siasatan improves understanding tanpa always revealing full truth.
- **Fair evaluation:** keputusan ialah assessed according bukti dan syarat tersedia at masa.
- **Beginner-friendly learning:** Permainan ini menyediakan understandable feedback help pemain learn daripada berjaya dan unberjaya keputusan.

Blue Team ialah direka teach pemain how assess keselamatan peristiwa-peristiwa, respond proportionately dan mengurus ketidakpastian.

---


## 6. Sistem Senario

Sistem Senario ialah bertanggungjawab untuk creating dan managing keselamatan siber situasi digunakan semasa Cyber Clash perlawanan.

setiap senario defines awal peristiwa, its underlying keadaan, tindakan tersedia kedua-dua pemain, mungkin tidak dijangka peristiwa-peristiwa dan peraturan digunakan menentukan hasil.

sistem menggunakan yang telah ditetapkan senario templates dengan controlled variasi. Ini approach membolehkan senario-senario feel berbeza manakala keeping their behaviour consistent, testable dan suitable untuk beginner-level keselamatan siber education.

### 6.1 Senario kategori

awal prototaip termasuk empat utama senario kategori:

| kategori | Penerangan | Contoh |
|---|---|---|
| E-mel | Simulates e-mel-berkaitan keselamatan situasi. | Satu pekerja menerima akaun verification e-mel. |
| Log Masuk Aktiviti | Simulates akaun akses dan authentication peristiwa-peristiwa. | Satu luar biasa login attempt ialah recorded. |
| Peranti USB | Simulates risks associated dengan removable storage devices. | Satu pekerja connects unfamiliar USB peranti. |
| Rangkaian Aktiviti | Simulates asas network keselamatan peristiwa-peristiwa. | Unusual traffic ialah dikesan daripada simulated peranti. |

setiap kategori mungkin contain pelbagai templates dengan berbeza peristiwa butiran, bukti dan mungkin outcomes.

### 6.2 Senario struktur

setiap senario ialah ditetapkan oleh set daripada properties diuruskan oleh permainan ini server.

These properties mungkin termasuk:

- Senario ID dan kategori.
- awal peristiwa dan awam description.
- asal peristiwa status.
- tersembunyi senario syarat.
- tersedia Red Team tindakan.
- tersedia Blue Team tindakan.
- siasatan bukti.
- mungkin Peristiwa yang tidak dijangka.
- Senario objektif.
- Penyelesaian peraturan.

tidak setiap property ialah displayed kedua-dua pemain. server menentukan yang maklumat boleh menjadi shown setiap pemain according Sistem Maklumat ditetapkan dalam Section 9.

### 6.3 Penjanaan Senario

Pada permulaan pusingan, server memilih suitable senario template dan applies controlled variasi.

variasi mungkin termasuk:

- Peristiwa descriptions dan context.
- Simulated users atau devices.
- E-mel penghantar dan message butiran.
- Log Masuk sources dan aktiviti sejarah.
- USB peranti maklumat.
- Rangkaian peristiwa petunjuk.
- awal syarat dan tersedia peluang.

penjanaan proses mesti menghasilkan sah senario dengan consistent awal syarat, compatible tindakan dan ditetapkan penyelesaian peraturan.

untuk awal prototaip, senario penjanaan akan menggunakan yang telah ditetapkan templates dan structured data sebaliknya daripada unrestricted AI-dijana senario-senario.

### 6.4 Keadaan Senarios

Satu senario mungkin represent berbeza underlying syarat, termasuk:

- **sah Peristiwa:** peristiwa ialah genuine dan tidak tidak contain Red Team serangan.
- **Red-dimanipulasi Peristiwa:** Red Team mempunyai diubah suai peristiwa atau introduced simulated ancaman.
- **serangan Peluang:** senario mengandungi condition itu Red Team mungkin exploit.
- **tidak dijangka Peristiwa:** Satu tambahan peristiwa berlaku because daripada yang telah ditetapkan sistem syarat atau tindakan-berkaitan akibat.

These syarat ialah tidak necessarily mutually exclusive. Sebagai contoh, sah awal peristiwa mungkin menjadi dimanipulasi oleh Red Team, manakala unrelated tidak dijangka peristiwa mungkin berlaku semasa sama pusingan.

server maintains sebenar senario keadaan dan menentukan yang butiran ialah visible setiap pemain.

### 6.5 Senario dan penipuan

Sistem Senario menyediakan foundation untuk penipuan Sistem described dalam Section 7.

Red Team mungkin manipulate disokong peristiwa, introduce simulated ancaman atau mencipta gangguan apabila senario permits it.

Satu penipuan tindakan mesti mempunyai ditetapkan effect pada senario keadaan. sistem mesti tidak treat setiap mencurigakan-looking peristiwa as proof daripada Red Team serangan.

Sebagai contoh, mencurigakan login notification mungkin menjadi introduced as secondary peristiwa manakala Red Team sebenar peluang involves e-mel senario.

Blue Team menerima hanya maklumat dibenarkan oleh senario dan mesti menentukan yang peristiwa deserves attention.

### 6.6 Peristiwa Tidak Dijangka

Peristiwa yang tidak dijangka menambahkan ketidakpastian dalam senario.

Satu peristiwa mungkin menjadi triggered oleh yang telah ditetapkan syarat, controlled rawak selection atau akibat daripada pemain tindakan.

mungkin examples termasuk:

- Satu baharu login notification.
- Satu simulated network amaran.
- tambahan aktiviti daripada another pengguna.
- Satu sistem error atau service interruption.
- baharu bukti associated dengan existing peristiwa.

Dalam prototaip awal, satu senario mungkin mengandungi satu peristiwa utama dan maksimum satu peristiwa sekunder pada satu-satu masa.

setiap tidak dijangka peristiwa mesti mempunyai ditetapkan punca, effect dan penyelesaian rule. server records sebenar punca even apabila itu punca ialah tidak visible pemain.

### 6.7 Penyelesaian Senario

setiap senario mesti contain enough maklumat untuk server menentukan sah hasil selepas required pemain tindakan ialah completed.

penyelesaian proses menilai:

- asal senario syarat.
- Red Team disahkan tindakan.
- Blue Team's siasatan dan tindak balas.
- Evidence tersedia at masa daripada keputusan.
- Sebarang peristiwa yang tidak dijangka.
- senario objektif dan penyelesaian peraturan.

mungkin outcomes termasuk serangan menjadi prevented, serangan succeeding, palsu positif, ineffective defensive tindak balas atau no ketara keselamatan kesan.

server applies corresponding skor perubahan dan kemas kini perlawanan keadaan according pemarkahan dan Syarat Kemenangan peraturan dalam Section 11.

### 6.8 Senario Data dan Pengesahan

Senario templates akan menjadi stored as structured data, menggunakan JSON atau equivalent format disokong oleh implementation.

sebelum senario ialah digunakan, sistem mesti verify itu:

- Required fields ialah present.
- awal keadaan ialah sah.
- tersedia tindakan ialah compatible dengan senario.
- siasatan bukti follows senario peraturan.
- tidak dijangka peristiwa-peristiwa mempunyai sah triggers dan effects.
- Penyelesaian peraturan cover disokong outcomes.

Invalid senario definitions mesti menjadi rejected atau handled safely sebaliknya daripada causing perlawanan enter unresolved keadaan.

### 6.9 Sistem Senario Reka Bentuk Prinsip

Sistem Senario follows theseprinsip:

- **Template-berdasarkan penjanaan:** Senarios ialah built daripada yang telah ditetapkan, testable templates.
- **Controlled variasi:** perubahan introduce variety tanpa breaking permainan peraturan.
- **Server-diuruskan keadaan:** server maintains authoritative senario keadaan.
- **Peranan-khusus maklumat:** setiap pemain menerima hanya maklumat dibenarkan untuk their role.
- **bermakna ketidakpastian:** Senarios menyokong siasatan dan keputusan-membuat tanpa bergantung pada arbitrary outcomes.
- **Extensibility:** baharu senario templates boleh menjadi added tanpa redesigning entire sistem.

Sistem Senario ialah direka menyediakan varied, fair dan educational keselamatan siber situasi manakala remaining manageable untuk awal prototaip.

---


## 7. penipuan Sistem

### 7.1 penipuan Gambaran Keseluruhan

penipuan Sistem ialah digunakan membolehkan Red Team mislead Blue Team semasa permainan.

dan bukannya secara langsung attacking sistem, Red Team boleh manipulate maklumat atau mencipta situasi itu mempengaruhi keputusan dibuat oleh Blue Team.

purpose daripada sistem ialah mencipta ketidakpastian dan membuat Blue Team menentukan sama ada peristiwa ialah genuine ancaman, sah peristiwa, atau gangguan.

### 7.2 Jenis daripada penipuan

Red Team boleh menggunakan several jenis daripada penipuan bergantung pada senario.

| penipuan jenis | Penerangan |
| ------------------- | --------------------------------------------------------------------------------------- |
| palsu Peristiwa | mencipta peristiwa itu appears mencurigakan tetapi mungkin tidak represent sebenar serangan. |
| Peristiwa manipulasi | perubahan part daripada existing peristiwa membuat it lebih mencurigakan atau mengelirukan. |
| sumber Spoofing | membuat peristiwa appear originate daripada berbeza sumber. |
| gangguan | mencipta another peristiwa draw Blue Team's attention away daripada sebenar objektif. |
| mengelirukan Evidence | menyediakan maklumat itu mungkin punca Blue Team membuat incorrect keputusan. |

tersedia penipuan jenis depend pada senario dan tindakan tersedia Red Team.

### 7.3 penipuan Proses

Satu asas penipuan proses boleh menjadi represented as:

```text
Senario dijana
->
Red Team Identifies Peluang
->
Red Team memilih penipuan
->
Peristiwa atau Maklumat ialah diubah suai
->
Blue Team menerima tersedia Maklumat
->
Blue Team membuat keputusan
->
Server menentukan sebenar hasil
```

Blue Team tidak tidak secara langsung menerima maklumat tentang sama ada penipuan mempunyai telah digunakan.

### 7.4 penipuan dan siasatan

Blue Team boleh menggunakan siasatan menentukan sama ada peristiwa ialah mencurigakan.

However, siasatan tidak tidak guarantee itu Blue Team akan immediately mengenal pasti penipuan.

Sebagai contoh, spoofed e-mel mungkin contain maklumat itu appears normal at pertama. Blue Team mungkin need memeriksa penghantar, pautan destination atau other tersedia bukti sebelum membuat keputusan.

Ini encourages Blue Team analyse maklumat daripada immediately responding peristiwa.

### 7.5 penipuan Risk

penipuan ialah tidak guaranteed succeed.

sesetengah deceptive tindakan mungkin leave bukti itu boleh menjadi discovered oleh Blue Team.

Sebagai contoh, modifying e-mel mungkin mencipta inconsistencies dalam penghantar maklumat atau pautan destination.

If Blue Team discovers enough bukti, penipuan mungkin fail dan Red Team mungkin kehilangan peluang atau sumber.

Therefore, Red Team mesti consider risk daripada menjadi dikesan apabila menggunakan penipuan.

### 7.6 penipuan objektifs

Red Team boleh menggunakan penipuan achieve berbeza objektif, termasuk:

* Distracting Blue Team.
* Causing palsu positif.
* Hiding sebenar serangan.
* Wasting Blue Team's masa atau sumber.
* Causing Blue Team take incorrect defensive tindakan.
* Creating peluang untuk later serangan.

objektif bergantung pada semasa senario dan Red Team strategi.

### 7.7 Contoh daripada penipuan

Satu contoh daripada penipuan semasa permainan ialah:

```text
asal Senario:
Pekerja menerima e-mel daripada IT Jabatan.

Red Team:
mencipta mencurigakan login amaran as gangguan.

Blue Team:
Siasats mencurigakan login.

sebenar situasi:
e-mel remains utama peluang untuk Red Team.

Hasil:
Blue Team spends masa investigating gangguan
manakala Red Team memperoleh kelebihan.
```

Ini contoh shows how Red Team boleh mempengaruhi Blue Team tanpa secara langsung attacking asal peristiwa.

### 7.8 penipuan Principle

utama principle daripada penipuan Sistem ialah:

> **Blue Team hendaklah tidak always know sama ada peristiwa ialah real ancaman, sah peristiwa, atau penipuan.**

sistem ialah direka encourage careful siasatan, keputusan-membuat dan awareness daripada mengelirukan maklumat.

---


## 8. tidak dijangka Peristiwa Sistem

### 8.1 tidak dijangka Peristiwa Gambaran Keseluruhan

**tidak dijangka Peristiwa Sistem** introduces tambahan peristiwa-peristiwa itu mungkin berlaku manakala senario ialah dalam kemajuan.

These peristiwa-peristiwa ialah tidak necessarily disebabkan oleh **Red Team**. They mungkin berlaku due permainan ini sistem, pengguna tindakan, atau khusus syarat dalam senario.

purpose daripada ini sistem ialah membuat setiap senario kurang predictable dan memerlukan kedua-dua pasukan adapt their keputusan berdasarkan perubahan itu berlaku semasa permainan.

### 8.2 Jenis daripada Peristiwa Tidak Dijangka

Several jenis daripada Peristiwa Tidak Dijangka mungkin berlaku semasa permainan:

| Peristiwa jenis | Penerangan |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Sistem Peristiwa | Satu peristiwa disebabkan oleh permainan ini sistem, seperti sistem error atau service interruption. |
| User Peristiwa | Satu peristiwa disebabkan oleh tidak dijangka tindakan daripada pengguna atau NPC. |
| Security amaran | Satu baharu keselamatan amaran appears manakala semasa senario ialah dalam kemajuan. |
| Secondary Peristiwa | Satu second peristiwa berlaku manakala asal peristiwa ialah masih menjadi handled. |
| baharu Evidence | tambahan maklumat becomes tersedia dan mungkin change understanding daripada semasa situasi. |

jenis daripada tidak dijangka Peristiwa bergantung pada senario dan semasa permainan keadaan.

### 8.3 tidak dijangka Peristiwa Trigger

Peristiwa Tidak Dijangka boleh menjadi triggered apabila yang telah ditetapkan senario syarat ialah satisfied. Satu senario mungkin also menggunakan configured probability menentukan sama ada eligible peristiwa berlaku.

untuk awal prototaip, tidak dijangka Peristiwa mungkin menjadi triggered oleh:

- Satu yang telah ditetapkan senario condition.
- Satu controlled rawak selection dibenarkan oleh senario configuration.
- Satu akibat daripada disahkan pemain tindakan.

Permainan ini server menentukan apabila peristiwa boleh berlaku dan validates trigger against semasa senario keadaan.

Peristiwa Tidak Dijangka mesti hanya berlaku at ditetapkan mata dalam permainan iniplay aliran. untuk awal prototaip, eligible peristiwa mungkin menjadi triggered semasa Blue Team fasa, selepas siasatan stage dan sebelum Blue Team memilih its akhir tindak balas. peristiwa boleh hanya berlaku if semasa senario configuration permits it.

apabila tidak dijangka Peristiwa berlaku, server kemas kini senario keadaan dan menyediakan Blue Team dengan maklumat dibenarkan oleh permainan ini maklumat peraturan.

Contoh:

asal Senario:
Pekerja menerima e-mel.

Red Team:
Jangan Lakukan Apa-apa

Blue Team:
Siasats e-mel.

tidak dijangka Peristiwa:
mencurigakan login dikesan.

Blue Team:
menilai baharu peristiwa menggunakan Bukti yang tersedia.

baharu peristiwa mungkin change Blue Team's priorities even apabila Red Team mempunyai tidak dilaksanakan serangan.

### 8.4 Relationship dengan Red Team Tindakans

Satu tidak dijangka Peristiwa boleh berlaku secara berasingan daripada Red Team tindakan.

Sebagai contoh, Red Team mungkin pilih **Jangan Lakukan Apa-apa**, tetapi permainan ini sistem boleh masih menjana baharu **Security amaran**.

Ini prevents Blue Team daripada assuming itu setiap baharu peristiwa ialah secara automatik disebabkan oleh Red Team.

However, sesetengah Red Team tindakan mungkin also menghasilkan tidak dijangka akibat.

Sebagai contoh, berjaya serangan mungkin menjana luar biasa network aktiviti, yang boleh become **tambahan bukti** untuk Blue Team.

### 8.5 tersembunyi punca

sebenar punca daripada tidak dijangka Peristiwa ialah stored dan diuruskan oleh **permainan server**.

Blue Team tidak tidak immediately know sebenar punca daripada peristiwa.

peristiwa mungkin menjadi disebabkan oleh:

* Red Team.
* Permainan ini sistem.
* Another pengguna.
* sah aktiviti.
* Satu peristiwa berkaitan asal senario.
* Satu unrelated peristiwa.

sebenar punca remains tersembunyi daripada Blue Team until senario ialah resolved.

### 8.6 Effect pada permainan

Peristiwa Tidak Dijangka boleh affect permainan dalam several ways, termasuk:

* Creating baharu siasatan peluang.
* Increasing difficulty daripada senario.
* Providing tambahan bukti.
* Creating palsu alarm.
* Changing priority daripada peristiwa.
* Creating baharu keselamatan ancaman.
* Giving kelebihan sama ada team.

effect bergantung pada jenis daripada peristiwa dan semasa keadaan daripada senario.

### 8.7 Controlled Randomness

Peristiwa Tidak Dijangka akan tidak berlaku completely randomly tanpa restrictions.

Permainan ini akan menggunakan yang telah ditetapkan syarat dan configurable kebarangkalian menentukan sama ada eligible tidak dijangka Peristiwa boleh berlaku.

untuk awal prototaip, setiap senario mungkin contain satu utama peristiwa dan maximum daripada satu secondary peristiwa at masa. Satu secondary peristiwa ialah optional dan boleh hanya berlaku apabila disokong oleh senario configuration.

server mesti ensure itu setiap peristiwa mempunyai sah trigger, ditetapkan effect dan resolvable hasil. sistem mesti also menghalang tambahan peristiwa-peristiwa daripada exceeding prototaip's peristiwa limit.

tepat kebarangkalian dan trigger configurations akan menjadi ditentukan semasa implementation dan permainan pengujian.

Ini approach introduces ketidakpastian manakala maintaining permainan balance dan keeping sistem manageable untuk awal prototaip.

### 8.8 Contoh Senario

Satu contoh daripada tidak dijangka Peristiwa semasa permainan ialah shown below:

```text
asal Senario:
Pekerja menerima e-mel daripada IT Jabatan.

Red Team:
Jangan Lakukan Apa-apa

Blue Team:
Siasats e-mel.

tidak dijangka Peristiwa:
mencurigakan login dikesan.

Blue Team:
Must menentukan sama ada login ialah berkaitan
kepada e-mel atau ialah berasingan peristiwa.

sebenar punca:
Unknown Blue Team.

Server:
Stores sebenar punca dan resolves senario.
```

dalam ini situasi, Blue Team cannot immediately menentukan sama ada mencurigakan login ialah sebenar serangan, sah aktiviti, atau unrelated peristiwa.

Blue Team mesti menggunakan tersedia bukti sebelum membuat keputusan.

### 8.9 tidak dijangka Peristiwa Principle

utama principle daripada tidak dijangka Peristiwa Sistem ialah:

> **tidak setiap tidak dijangka peristiwa ialah serangan, dan tidak setiap serangan menghasilkan obvious peristiwa.**

Ini sistem membuat setiap senario lebih unpredictable dan memerlukan pemain continuously evaluate situasi berdasarkan maklumat tersedia them.

---


## 9. Sistem Maklumat

### 9.1 Sistem Maklumat Gambaran Keseluruhan

Sistem Maklumat controls what maklumat ialah tersedia Red Team, Blue Team, dan permainan ini server.

Cyber Clash menggunakan **asymmetric maklumat** as satu daripada its utama permainan mekanik. Ini means itu kedua-dua pemain do tidak menerima exactly sama maklumat semasa senario.

Red Team mungkin menerima tambahan maklumat tentang senario dan mungkin serangan peluang, manakala Blue Team mesti membuat keputusan berdasarkan terhad maklumat.

Permainan ini server stores lengkap senario keadaan dan ialah bertanggungjawab untuk menentukan sebenar hasil.

utama maklumat principle ialah:

> **pemain membuat keputusan berdasarkan maklumat tersedia them, tidak lengkap truth daripada senario.**

---

### 9.2 Maklumat kategori

Maklumat dalam Cyber Clash dibahagikan kepada tiga kategori utama:

| Maklumat jenis | Penerangan | akses |
| -------------------- | ------------------------------------------------------------------------------- | -------------------- |
| awam Maklumat | Maklumat visible kedua-dua pemain. | Red Team + Blue Team |
| Red-hanya Maklumat | peribadi maklumat provided hanya Red Team. | Red Team |
| tersembunyi Maklumat | Internal maklumat digunakan oleh server menentukan sebenar senario keadaan. | Server hanya |

Ini separation prevents sama ada pemain daripada receiving lengkap maklumat tentang senario.

---

### 9.3 awam Maklumat

awam maklumat ialah maklumat itu boleh menjadi observed oleh kedua-dua pemain.

Contohnya:

* Satu baharu e-mel peristiwa.
* Satu login amaran.
* Satu USB peranti connection.
* Satu network aktiviti amaran.
* Visible sistem notifications.
* Hasils daripada certain pemain tindakan.

awam maklumat tidak tidak reveal sama ada peristiwa mempunyai telah dimanipulasi oleh Red Team.

Sebagai contoh:

```text
awam peristiwa

baharu E-mel diterima

penghantar:
it-menyokong@university-contoh.com

subjek:
penting Account Verification
```

kedua-dua pemain mungkin see peristiwa, tetapi hanya Red Team mungkin know sama ada peristiwa mempunyai telah diubah suai.

---

### 9.4 Red-hanya Maklumat

Red-hanya maklumat ialah peribadi maklumat provided Red Team.

Ini maklumat boleh termasuk:

* asal senario status.
* tersedia serangan peluang.
* mungkin Red Team tindakan.
* tersembunyi weaknesses.
* Potential objektif.
* Maklumat tentang keberkesanan daripada certain tindakan.

Sebagai contoh:

```text
RED TEAM maklumat

asal Peristiwa:
sah E-mel

Peluang:
tersedia

Tindakan yang Mungkin:

[Jangan Lakukan Apa-apa]
[Ubah Suai Peristiwa]
[Tambah Pautan Berniat Jahat]
[Palsukan Sumber]
[Cipta Gangguan]
```

Blue Team tidak tidak menerima ini maklumat.

Ini membolehkan Red Team plan its tindakan manakala maintaining ketidakpastian untuk Blue Team.

---

### 9.5 tersembunyi Server Maklumat

tersembunyi maklumat ialah maklumat itu ialah stored dan controlled oleh permainan ini server.

Contohnya:

* sebenar senario keadaan.
* sebenar serangan status.
* Tindakan yang dipilih oleh Red Team.
* tidak dijangka peristiwa punca.
* tersembunyi bukti.
* Senario hasil.
* Internal probability atau penjanaan values.

tersembunyi maklumat ialah tidak secara langsung shown sama ada pemain.

server menggunakan ini maklumat menentukan hasil daripada pemain tindakan.

Sebagai contoh:

```text
SERVER keadaan

Senario:
E-mel

sebenar Status:
dimanipulasi

Red Tindakan:
Tambah Pautan Berniat Jahat

tidak dijangka Peristiwa:
None

Blue Tindakan:
Abaikan

hasil:
serangan berjaya
```

pemain hanya menerima maklumat itu ialah sesuai untuk their role.

---

### 9.6 Aliran Maklumat

maklumat aliran semasa senario boleh menjadi represented as follows:

```text
 SCENARIO GENERATOR
 |
 v
 SERVER SCENARIO keadaan
 / \
 / \
 v v
 RED TEAM maklumat awam maklumat
 | |
 v v
 RED TEAM tindakan BLUE TEAM VIEW
 \ /
 \ /
 v v
 SERVER
 |
 v
 akhir hasil
```

server bertindak as central authority itu manages maklumat shown setiap pemain.

---

### 9.7 Asimetri Maklumat

Maklumat asymmetry ialah perbezaan antara maklumat tersedia Red Team dan Blue Team.

Sebagai contoh:

```text
RED TEAM KNOWS

asal Peristiwa:
sah

Red Tindakan:
Tambah Pautan Berniat Jahat

Blue Team:
melakukan tidak know peristiwa ialah diubah suai.
```

Blue Team mesti menentukan sesuai tindak balas menggunakan bukti tersedia them.

Ini mewujudkan ketidakpastian dan membolehkan berbeza strategi emerge semasa permainan.

---

### 9.8 Maklumat Tidak Lengkap

Blue Team mungkin tidak always menerima enough maklumat menentukan correct answer immediately.

Sebagai contoh, mencurigakan e-mel mungkin contain:

* Satu unfamiliar penghantar.
* Satu mencurigakan pautan.
* No known malware.
* tidak lengkap penghantar maklumat.

Blue Team mesti menentukan sama ada menyiasat selanjutnya, melaporkan peristiwa, mengabaikan it, atau take another defensive tindakan.

Permainan ini therefore memberikan ganjaran keputusan-membuat dan siasatan sebaliknya daripada simple identification.

---

### 9.9 Maklumat Mengelirukan

sesetengah maklumat mungkin menjadi mengelirukan because daripada tindakan dilaksanakan oleh Red Team atau because daripada Peristiwa yang tidak dijangka.

Sebagai contoh, Red Team mungkin spoof sumber daripada e-mel so itu visible penghantar appears sah.

Alternatively, tidak dijangka peristiwa mungkin mencipta keselamatan amaran itu ialah unrelated Red Team.

Ini means itu visible maklumat hendaklah tidak always menjadi treated as absolute proof daripada serangan.

---

### 9.10 Maklumat dan penipuan

Sistem Maklumat secara langsung supports penipuan mekanik daripada Cyber Clash.

Red Team boleh menggunakan its peribadi maklumat manipulate peristiwa-peristiwa manakala Blue Team mesti membuat keputusan tanpa knowing Red Team tindakan.

Sebagai contoh:

```text
asal Peristiwa:
sah Log Masuk

Red Team:
Cipta Gangguan

tambahan Peristiwa:
mencurigakan Rangkaian amaran

Blue Team:
Siasats Rangkaian amaran

sebenar situasi:
amaran ialah dicipta as gangguan.
```

Blue Team mungkin kehilangan masa atau sumber oleh responding wrong peristiwa.

Ini mewujudkan permainan situasi apabila maklumat management ialah as penting as technical detection.

---

### 9.11 Maklumat Reveal

Certain Blue Team tindakan mungkin reveal tambahan maklumat.

Sebagai contoh, siasatan mungkin reveal:

* tambahan peristiwa butiran.
* sumber maklumat.
* pautan destination.
* Account aktiviti.
* Rangkaian maklumat.
* Previous aktiviti berkaitan peristiwa.

However, siasatan hendaklah tidak always reveal lengkap truth.

sesetengah maklumat mungkin remain tersembunyi atau mengelirukan.

Ini prevents siasatan daripada becoming automatic method daripada mengenal pastiing setiap serangan.

---

### 9.12 Maklumat Principle

Sistem Maklumat follows tiga utamaprinsip:

1. **tidak semua maklumat ialah shared antara pemain.**
2. **Visible maklumat tidak tidak always reveal lengkap situasi.**
3. **pemain mesti membuat keputusan menggunakan tidak lengkap maklumat.**

Ini sistem supports utama permainan identity daripada Cyber Clash:

> **pemain who membuat better keputusan dengan terhad maklumat mendapatkan kelebihan.**

---


## 10. Aliran Permainan

### 10.1 Aliran Permainan Gambaran Keseluruhan

Permainan ini aliran defines urutan daripada tindakan itu berlaku semasa Cyber Clash perlawanan.

Satu perlawanan consists daripada pelbagai senario-senario. setiap senario menyediakan Red Team dan Blue Team dengan berbeza maklumat dan peluang membuat keputusan.

Permainan ini server manages perlawanan keadaan, validates pemain tindakan, proseses tidak dijangka peristiwa-peristiwa dan menentukan senario outcomes.

asas perlawanan aliran untuk awal prototaip ialah:

```text
Permulaan Perlawanan
->
pemain Roles Assigned
->
Senario dijana
->
Red Team menerima peribadi Maklumat
->
Red Team memilih Tindakan
->
Server Validates Red Team Tindakan
->
Blue Team menerima Peristiwa Maklumat
->
Blue Team Periksas atau Siasats
->
tidak dijangka Peristiwa May berlaku
->
Blue Team memilih akhir Response
->
Server Resolves Senario
->
skor dan Game keadaan Updated
->
Senario Seterusnya atau Tamat Perlawanan
```

tepat tindakan tersedia semasa setiap senario depend pada its yang telah ditetapkan peraturan. server ensures itu tindakan dan peristiwa-peristiwa ialah prosesed dalam sah order.

---

### 10.2 Permulaan Perlawanan

Pada permulaan perlawanan, dua pemain ialah disambungkan permainan ini session.

pemain ialah assigned berbeza roles:

* **Red Team** - penyerang.
* **Blue Team** - pembela.

server initializes perlawanan keadaan dan prepares pertama senario.

server also ensures itu maklumat intended untuk satu pemain ialah tidak accidentally revealed other pemain.

---

### 10.3 Penjanaan Senario

selepas perlawanan begins, server generates senario.

senario mungkin termasuk:

* Senario jenis.
* awal peristiwa.
* awal peristiwa status.
* tersedia tindakan.
* mungkin serangan peluang.
* mungkin Peristiwa yang tidak dijangka.

senario mungkin menjadi dijana daripada yang telah ditetapkan senario templates combined dengan berbeza variasi.

Sebagai contoh:

```text
Senario jenis:
E-mel

Peristiwa:
Pekerja menerima akaun verification e-mel.

awal Status:
sah

tersedia Red Peluang:
E-mel boleh menjadi dimanipulasi.
```

lengkap senario keadaan remains controlled oleh server.

---

### 10.4 Fasa Red Team

Red Team menerima tambahan maklumat tentang dijana senario.

pemain boleh evaluate tersedia peluang dan memilih tindakan.

mungkin tindakan mungkin termasuk:

* Jangan Lakukan Apa-apa.
* Ubah suai peristiwa.
* Add malicious element.
* Spoof sumber.
* Cipta gangguan.
* melaksanakan another senario-khusus tindakan.

Red Team dipilih tindakan ialah dihantar server.

Blue Team tidak tidak menerima Red Team peribadi maklumat.

---

### 10.5 Pembentangan Peristiwa

selepas Red Team tindakan ialah prosesed, peristiwa ialah presented Blue Team.

Blue Team menerima maklumat itu would normally menjadi visible dalam senario.

Sebagai contoh:

```text
baharu peristiwa

Pekerja diterima e-mel.

penghantar:
it-menyokong@university-contoh.com

subjek:
penting Account Verification

tersedia Tindakans:

[Periksa]
[Siasat]
[Lapor]
[Abaikan]
[Sekat]
```

Blue Team ialah tidak secara langsung informed sama ada peristiwa ialah sah, dimanipulasi, atau dicipta as gangguan.

---

### 10.6 Fasa Blue Team

Blue Team menilai tersedia maklumat dan decides how respond.

pemain may:

* Periksa peristiwa.
* Siasat dengan lebih lanjut.
* Lapor peristiwa.
* Abaikan peristiwa.
* Sekat sumber.
* melaksanakan another defensive tindakan.

keberkesanan daripada tindak balas bergantung pada sebenar senario keadaan.

Satu correct tindak balas mungkin reduce kesan daripada serangan, manakala incorrect tindak balas mungkin mencipta penalty atau membolehkan Red Team mendapatkan kelebihan.

---

### 10.7 Fasa Siasatan

sesetengah Blue Team tindakan mungkin menyediakan tambahan maklumat sebelum akhir keputusan ialah dibuat.

Sebagai contoh, Blue Team mungkin menyiasat:

* penghantar maklumat.
* pautan destination.
* lampiran butiran.
* Log Masuk sejarah.
* Rangkaian aktiviti.
* Previous berkaitan peristiwa-peristiwa.

maklumat obtained melalui siasatan mungkin menjadi tidak lengkap atau mengelirukan.

Therefore, siasatan menyediakan tambahan bukti tetapi tidak tidak guarantee itu Blue Team akan mengenal pasti correct situasi.

---

### 10.8 tidak dijangka Peristiwa fasa

Satu tidak dijangka peristiwa mungkin berlaku semasa senario.

peristiwa mungkin be:

* berkaitan Red Team.
* Unrelated Red Team.
* dijana oleh permainan ini sistem.
* disebabkan oleh another pengguna atau sistem aktiviti.

Sebagai contoh:

```text
utama Peristiwa:
Pekerja menerima e-mel.

Red Team:
Adds malicious pautan.

tidak dijangka Peristiwa:
Satu berasingan login amaran appears.

Blue Team:
Must menentukan sama ada login amaran ialah berkaitan serangan.
```

Ini prevents senario daripada becoming completely predictable.

---

### 10.9 Penyelesaian Senario

selepas required pemain tindakan dan peristiwa prosesing ialah completed, server resolves senario.

Server menilai:

- asal senario keadaan.
- disahkan Red Team tindakan.
- Siasatan dan tindak balas akhir Blue Team.
- Evidence tersedia semasa senario.
- Sebarang peristiwa yang tidak dijangka.
- senario objektif dan penyelesaian peraturan.

server menentukan akhir hasil according yang telah ditetapkan peraturan.

mungkin outcomes termasuk serangan menjadi prevented, serangan succeeding, palsu positif, ineffective defensive tindak balas, bermakna kelebihan untuk sama ada pemain atau no ketara kesan.

hasil ialah ditentukan oleh server's authoritative senario keadaan, tidak oleh sama ada pemain's client.

---

### 10.10 Game keadaan Kemas Kini

selepas senario ialah resolved, server kemas kini semasa permainan keadaan.

kemas kini mungkin termasuk:

* pemain skor.
* sumber.
* Security status.
* serangan kemajuan.
* Defensive status.
* Senario sejarah.
* perlawanan objektif.

tepat pemarkahan dan resource sistem akan menjadi ditetapkan dan balanced semasa later stages daripada pembangunan.

---

### 10.11 Senario Seterusnya

If perlawanan mempunyai tidak reached its end condition, server generates another senario.

seterusnya senario mungkin mempunyai berbeza:

* Senario jenis.
* Peristiwa.
* Red Team peluang.
* Bukti yang tersedia.
* tidak dijangka peristiwa.
* mungkin hasil.

Ini mewujudkan variasi antara senario-senario dan prevents pemain daripada bergantung pada fixed urutan.

---

### 10.12 Tamat Perlawanan

untuk awal prototaip, perlawanan ends selepas yang telah ditetapkan number daripada senario-senario mempunyai telah completed.

server mengira akhir hasil menggunakan accumulated skor dan akhir perlawanan keadaan.

pemain dengan higher akhir skor wins perlawanan. If kedua-dua pemain mempunyai sama skor, perlawanan ends dalam draw.

semasa prototaip menggunakan provisional values dalam Section 11.8 dan
resolves satu senario at masa. number daripada senario-senario dalam lengkap perlawanan
will menjadi balanced selepas pertama playable client aliran ialah tested.

akhir hasil ialah presented kedua-dua pemain melalui perlawanan hasil interface.

---

### 10.13 lengkap perlawanan Contoh

Satu simplified contoh daripada satu senario dalam Cyber Clash perlawanan ialah shown below:

```text
SCENARIO START
->
Senario: Pekerja menerima e-mel
->
Red Team menerima peribadi maklumat
->
Red Team memilih Tambah Pautan Berniat Jahat
->
Server validates dan applies tindakan
->
Blue Team menerima dibenarkan e-mel maklumat
->
Blue Team investigates e-mel
->
tidak dijangka Peristiwa Trigger ialah Evaluated
->
Secondary Peristiwa: mencurigakan Log Masuk dikesan
->
Blue Team reviews tersedia maklumat
->
Blue Team submits akhir tindak balas
->
Server resolves senario
->
skor dan Game keadaan Updated
->
Senario Seterusnya atau Tamat Perlawanan
```

Ini contoh demonstrates utama permainan loop daripada Cyber Clash:

->

loop encourages pemain evaluate tersedia bukti, respond changing situasi dan consider itu visible peristiwa-peristiwa mungkin tidak reveal lengkap underlying keadaan.


---

## 11. pemarkahan dan Syarat Kemenangan

### 11.1 Gambaran Keseluruhan Sistem Pemarkahan

pemarkahan Sistem menilai prestasi daripada kedua-dua pemain melaluiout Cyber Clash perlawanan.

sistem memberikan ganjaran berkesan keputusan-membuat, berjaya objektif, sesuai defensive tindak balas dan strategik menggunakan daripada tersedia maklumat.

kedua-dua Red Team dan Blue Team boleh memperoleh atau kehilangan mata bergantung pada their tindakan dan sebenar hasil daripada setiap senario.

pemarkahan sistem ialah direka menghalang sama ada pemain daripada bergantung pada single strategi melaluiout perlawanan.

Sebagai contoh, Blue Team hendaklah tidak secara automatik melaporkan setiap peristiwa, manakala Red Team hendaklah tidak menjadi rewarded semata-mata untuk mencuba serangan.

server ialah bertanggungjawab untuk mengira skor dan menentukan akhir perlawanan hasil.

### 11.2 Red Team pemarkahan

Red Team memperoleh mata dengan mencapai objektifnya melalui serangan, manipulasi dan penipuan.

pemarkahan ialah berdasarkan sebenar hasil daripada senario sebaliknya daripada tindakan dipilih alone.

Syarat pemarkahan yang mungkin termasuk:

- dengan berjaya mencapai senario objektif.
- melengkapkan serangan tanpa menjadi dikesan.
- menggunakan penipuan mempengaruhi Blue Team's keputusan.
- Creating gangguan itu menyediakan bermakna strategik kelebihan.
- mencapai objektif melalui berkesan keputusan do nothing.

Red Team tidak menerima mata secara automatik kerana mencuba serangan, mengubah peristiwa atau mencipta gangguan. mata ialah awarded hanya apabila tindakan menghasilkan hasil itu memenuhi senario pemarkahan peraturan.

Satu unberjaya serangan mungkin menerima lebih sedikit mata atau no mata, bergantung pada senario objektif.

memilih **Jangan Lakukan Apa-apa** ialah sah tindakan. However, it hanya earns mata apabila keputusan menyumbang ditetapkan objektif atau menghasilkan bermakna kelebihan.

server menilai senario hasil dan mengira Red Team skor menggunakan yang telah ditetapkan pemarkahan peraturan.

### 11.3 Blue Team pemarkahan

Blue Team earns mata oleh mengenal pastiing genuine ancaman, membuat sesuai keputusan dan mengurangkan kesan daripada berjaya serangan.

Syarat pemarkahan yang mungkin termasuk:

- Correctly mengenal pastiing genuine ancaman.
- dengan berjaya preventing atau stopping serangan.
- Gathering useful bukti melalui siasatan.
- Selecting sesuai defensive tindak balas.
- Avoiding unnecessary defensive tindakan.
- Recognising mengelirukan maklumat atau distractions.

Blue Team ialah rewarded untuk membuat keputusan disokong oleh tersedia bukti sebaliknya daripada semata-mata guessing sama ada peristiwa ialah malicious.

Satu siasatan mungkin contribute skor apabila it menyediakan useful bukti atau helps Blue Team membuat lebih sesuai keputusan. However, melaksanakan siasatan tidak tidak secara automatik award mata.

server menilai Blue Team's keputusan against sebenar senario keadaan dan yang telah ditetapkan pemarkahan peraturan.

### 11.4 Positif Palsu Penalty

Satu palsu positif berlaku apabila Blue Team incorrectly identifies sah peristiwa as confirmed keselamatan ancaman.

palsu positives ialah penting part daripada Cyber Clash because tidak setiap mencurigakan peristiwa represents serangan.

Sebagai contoh:

```text
sebenar Peristiwa:
sah E-mel

Red Team Tindakan:
Jangan Lakukan Apa-apa

Blue Team Tindakan:
Lapor E-mel as Confirmed serangan

hasil:
Positif Palsu
```

Blue Team mungkin kehilangan mata apabila it incorrectly reports sah peristiwa as confirmed serangan.

However, melaporkan mencurigakan peristiwa untuk selanjutnya siasatan hendaklah tidak secara automatik hasil dalam penalty apabila tersedia bukti ialah inconclusive.

server menentukan sama ada palsu positif mempunyai occurred oleh evaluating sebenar senario keadaan, Blue Team's tindak balas dan peraturan associated dengan senario.

Ini encourages careful siasatan dan bukti-berdasarkan keputusan tanpa discouraging pemain daripada melaporkan genuine keselamatan concerns.

### 11.5 gagal serangan dan Missed Detection

pemarkahan sistem mesti distinguish antara unberjaya serangan dan berjaya serangan itu ialah tidak dikesan oleh Blue Team.

untuk Red Team, serangan itu fails achieve its objektif hendaklah generally menerima lebih sedikit mata daripada serangan itu dengan berjaya achieves its objektif.

untuk Blue Team, dengan berjaya detecting dan preventing genuine serangan hendaklah menyediakan defensive reward.

If genuine serangan succeeds because Blue Team ignores peristiwa atau memilih ineffective tindak balas, Red Team mungkin menerima mata untuk mencapai its objektif, manakala Blue Team mungkin kehilangan peluang memperoleh defensive mata atau menerima penalty according senario peraturan.

sama hasil mesti tidak menjadi counted lebih daripada once melalui overlapping pemarkahan syarat.

server menentukan akhir pemarkahan hasil berdasarkan sebenar senario keadaan, pemain' tindakan dan yang telah ditetapkan pemarkahan peraturan.

### 11.6 penipuan pemarkahan

penipuan boleh menyediakan Red Team dengan strategik kelebihan oleh influencing Blue Team's keputusan.

Sebagai contoh, Red Team mungkin mencipta palsu keselamatan amaran distract Blue Team daripada berasingan serangan peluang.

Red Team mungkin memperoleh mata if gangguan meaningfully menyumbang its objektif.

However, creating palsu peristiwa hendaklah tidak secara automatik award mata if Blue Team recognises penipuan atau if peristiwa mempunyai no bermakna kesan.

Blue Team mungkin memperoleh mata oleh mengenal pastiing mengelirukan maklumat, avoiding unnecessary tindak balas atau correctly prioritising lebih ketara ancaman.

Ini ensures itu penipuan memberikan ganjaran strategi sebaliknya daripada unlimited creation daripada palsu peristiwa-peristiwa.

### 11.7 tidak dijangka Peristiwa pemarkahan

tidak dijangka peristiwa-peristiwa mungkin affect hasil daripada senario even apabila they ialah tidak disebabkan oleh sama ada pemain.

pemarkahan sistem mesti consider sebenar punca daripada peristiwa apabila mengira hasil.

Sebagai contoh, Blue Team hendaklah tidak secara automatik menerima penalty untuk failing menghalang unrelated sistem error. Similarly, Red Team hendaklah tidak secara automatik menerima mata untuk tidak dijangka peristiwa itu tidak tidak contribute its objektif.

apabila tidak dijangka peristiwa perubahan senario, server menilai its effect pada semasa permainan keadaan dan tindakan taken oleh kedua-dua pemain.

Ini helps maintain fairness apabila unpredictable peristiwa-peristiwa berlaku.

### 11.8 pemarkahan Prinsip

pemarkahan sistem follows theseprinsip:

1. Objektif yang berjaya hendaklah menerima ganjaran yang lebih tinggi daripada
   percubaan yang tidak berjaya.
2. Keputusan pertahanan yang sesuai hendaklah menerima ganjaran.
3. Positif palsu hendaklah mempunyai akibat apabila keputusan tidak disokong oleh
   bukti yang tersedia.
4. Penipuan hanya boleh menerima ganjaran apabila menghasilkan kelebihan yang
   bermakna.
5. Peristiwa yang tidak dijangka hendaklah dinilai berdasarkan kesan sebenar.
6. Server mesti mengira skor secara konsisten untuk kedua-dua pemain.

untuk semasa e-mel senario prototaip, server menggunakan these provisional values:

| Senario hasil | Red Team | Blue Team |
|---|---:|---:|
| Serangan berjaya | +5 | 0 |
| serangan ialah prevented | 0 | +3 |
| palsu positif pada sah e-mel | 0 | -2 |
| No ketara kesan | 0 | 0 |

These values ialah implementation values untuk awal prototaip dan mungkin be
rebalanced selepas permainan pengujian. Sebarang perubahan mesti menjadi reflected dalam server
tests dan senario documentation.

### 11.9 Syarat Kemenangans

primary win condition untuk Cyber Clash ialah berdasarkan akhir skor accumulated oleh setiap pemain melaluiout perlawanan.

untuk awal prototaip, perlawanan follows these peraturan:

1. perlawanan ends selepas yang telah ditetapkan number daripada senario-senario mempunyai telah completed.
2. server mengira dan records skor daripada kedua-dua pemain selepas setiap senario ialah resolved.
3. pemain dengan higher akhir skor wins perlawanan.
4. If kedua-dua pemain mempunyai sama akhir skor, perlawanan ends dalam draw.

akhir skor reflects keberkesanan daripada setiap pemain's keputusan, achievement daripada senario objektif dan sebenar outcomes daripada senario-senario.

Neither pemain wins semata-mata oleh mencuba serangan atau selecting defensive tindakan. server menentukan hasil berdasarkan senario keadaan dan yang telah ditetapkan pemarkahan peraturan.

semasa server prototaip resolves satu senario at masa. Satu multi-senario
perlawanan length remains balancing keputusan untuk later prototaip milestone.

### 11.10 perlawanan Hasil

At end daripada perlawanan, server mengira akhir skor dan menentukan winner atau draw according established win syarat.

hasil screen mungkin display:

- Red Team akhir skor.
- Blue Team akhir skor.
- akhir perlawanan hasil, termasuk winner atau draw.
- berjaya dan gagal objektif.
- serangan prevented atau completed.
- Detection dan siasatan hasil.
- palsu positives.
- ketara penipuan dan Peristiwa yang tidak dijangka.

perlawanan summary helps pemain understand akibat daripada their keputusan dan learn daripada senario outcomes.

server ialah bertanggungjawab untuk providing akhir perlawanan hasil kedua-dua pemain ensure itu displayed hasil ialah consistent.


### 11.11 akan datang Balancing

pemarkahan sistem akan initially menjadi implemented menggunakan simple set daripada peraturan suitable untuk prototaip.

mata values, penalties, objektif keperluan dan perlawanan duration akan menjadi adjusted melalui pengujian.

Balancing akan focus pada preventing dominant strategi, ensuring bermakna choices untuk kedua-dua pasukan dan keeping permainan ini understandable untuk pemula.

akhir pemarkahan configuration akan menjadi documented selepas core permainan mekanik mempunyai telah implemented dan evaluated.


---

## 12. Dynamic Penjanaan Senario

### 12.1 Gambaran Keseluruhan

Dynamic Penjanaan Senario Sistem ialah bertanggungjawab untuk creating varied permainan senario-senario semasa Cyber Clash perlawanan.

dan bukannya bergantung entirely pada fixed senario-senario, sistem combines yang telah ditetapkan senario templates dengan berbeza peristiwa butiran, senario keadaans, tersedia tindakan dan mungkin Peristiwa yang tidak dijangka.

Ini approach membolehkan permainan ini menghasilkan berbeza situasi manakala maintaining consistent permainan peraturan.

sistem ialah direka menyokong replayability, ketidakpastian dan strategik keputusan-membuat untuk kedua-dua Red Team dan Blue Team.

### 12.2 Senario Templates

Senario templates menjadi teras asas struktur daripada setiap senario.

setiap template mengandungi maklumat tentang peristiwa jenis, mungkin variasi, tersedia tindakan dan syarat itu menentukan how senario boleh develop.

awal prototaip akan menggunakan empat utama senario kategori:

* E-mel
* Log Masuk Aktiviti
* Peranti USB
* Rangkaian Aktiviti

Sebagai contoh, E-mel senario template mungkin represent password reset request, university announcement atau akaun verification e-mel.

template menyediakan reusable struktur itu boleh menjadi diubah suai apabila baharu senario ialah dijana.

### 12.3 Variasi Senario

setiap senario template mungkin contain pelbagai variasi.

variasi boleh termasuk:

* Peristiwa descriptions.
* User atau sistem butiran.
* penghantar atau sumber maklumat.
* Security petunjuk.
* awal peristiwa status.
* tersedia Red Team tindakan.
* tersedia Blue Team tindakan.
* mungkin Peristiwa yang tidak dijangka.

Sebagai contoh, dua E-mel senario-senario mungkin share sama asas struktur tetapi contain berbeza penghantar butiran, messages dan keselamatan petunjuk.

These variasi help menghalang permainan iniplay daripada becoming repetitive.

### 12.4 Keadaan Senario penjanaan

apabila baharu senario ialah dijana, permainan ini server mewujudkan its awal keadaan.

keadaan mungkin termasuk:

* Senario identifier.
* Senario kategori.
* asal peristiwa status.
* tersedia peluang.
* tersembunyi syarat.
* Evidence tersedia setiap pemain.
* mungkin senario outcomes.

server stores lengkap senario keadaan dan menentukan yang maklumat boleh menjadi shared dengan setiap pemain.

Red Team mungkin menerima tambahan maklumat tentang tersedia peluang, manakala Blue Team menerima maklumat required evaluate visible peristiwa.

### 12.5 Red Team Interaction

selepas senario mempunyai telah dijana, Red Team mungkin interact dengan it melalui senario-khusus tindakan.

These tindakan boleh termasuk modifying peristiwa, introducing mengelirukan element, creating gangguan atau memilih do nothing.

tersedia tindakan depend pada senario template dan its semasa keadaan.

sistem mesti ensure itu tindakan ialah sah sebelum applying it senario.

Ini membolehkan Red Team mempengaruhi permainan tanpa giving pemain unrestricted control over senario.

### 12.6 Blue Team Interaction

Blue Team menerima peristiwa selepas relevant senario keadaan dan Red Team tindakan mempunyai telah prosesed.

pemain boleh memeriksa tersedia maklumat, menyiasat selanjutnya atau pilih defensive tindak balas.

maklumat presented Blue Team mesti reflect semasa awam keadaan daripada senario tanpa revealing tersembunyi maklumat.

berbeza senario variasi mungkin memerlukan berbeza siasatan options dan defensive tindakan.

### 12.7 tidak dijangka Peristiwa penjanaan

Dynamic Penjanaan Senario Sistem mungkin introduce tidak dijangka peristiwa-peristiwa semasa active senario.

These peristiwa-peristiwa boleh termasuk sistem errors, tambahan pengguna aktiviti, unrelated keselamatan alerts atau perubahan dalam surrounding situasi. tidak dijangka peristiwa-peristiwa mungkin berlaku secara berasingan daripada Red Team atau hasil daripada disahkan pemain tindakan.

server menentukan sama ada tidak dijangka peristiwa ialah eligible berlaku, validates its trigger dan kemas kini senario keadaan sewajarnya.

untuk awal prototaip, setiap senario mungkin contain satu utama peristiwa dan maximum daripada satu secondary peristiwa at masa. Satu secondary peristiwa ialah optional dan mesti menjadi disokong oleh senario configuration.

tidak dijangka peristiwa-peristiwa mesti follow permainan iniplay urutan ditetapkan dalam Section 10. apabila triggered semasa Blue Team fasa, peristiwa mesti berlaku sebelum Blue Team memilih its akhir tindak balas.

Their purpose ialah introduce bermakna ketidakpastian sebaliknya daripada arbitrary disruption.

### 12.8 Senario Combination

sistem mungkin combine compatible peristiwa jenis dalam single senario mencipta lebih complex situasi.

Sebagai contoh, E-mel senario mungkin contain secondary Log Masuk Aktiviti peristiwa. login peristiwa mungkin menjadi berkaitan e-mel, disebabkan oleh unrelated sistem aktiviti atau introduced as gangguan.

sebenar relationship antara peristiwa-peristiwa ialah ditentukan oleh tersembunyi senario keadaan dan diuruskan oleh permainan ini server.

untuk awal prototaip, senario combinations akan menggunakan yang telah ditetapkan relationships dan mesti follow peristiwa limit ditetapkan dalam Section 12.7. Satu secondary peristiwa mesti tidak secara automatik mencipta baharu senario atau pusingan.

Ini membolehkan pemain menyiasat mungkin connections antara peristiwa-peristiwa manakala keeping senario management dan penyelesaian manageable.

### 12.9 Senario Pengesahan

setiap dijana senario mesti menjadi disahkan sebelum it ialah presented pemain.

Pengesahan checks mungkin termasuk:

* Required senario data ialah tersedia.
* awal keadaan ialah consistent.
* tersedia tindakan ialah sah untuk senario.
* Evidence ialah assigned correct maklumat kategori.
* mungkin outcomes boleh menjadi resolved oleh server.
* tidak dijangka peristiwa-peristiwa ialah compatible dengan semasa senario.

If dijana senario ialah invalid, sistem hendaklah reject it dan pilih atau menjana sah alternative.

Ini helps menghalang tidak lengkap senario-senario dan tidak dijangka permainan errors.

### 12.10 Randomness dan Fairness

Randomness ialah digunakan introduce variasi, tetapi it mesti tidak menentukan hasil tanpa considering pemain keputusan.

sistem hendaklah ensure itu kedua-dua pemain menerima sah peluang membuat bermakna choices.

Randomly dijana peristiwa-peristiwa hendaklah follow yang telah ditetapkan peraturan dan constraints.

Sebagai contoh, tidak dijangka peristiwa hendaklah tidak secara automatik guarantee win untuk sama ada pemain. Its kesan hendaklah depend pada senario keadaan dan tindakan taken oleh kedua-dua pasukan.

Ini approach combines unpredictable permainan dengan consistent peraturan.

### 12.11 Data-Driven Senario Reka Bentuk

Senario definitions mungkin menjadi stored dalam structured data files seperti JSON.

Ini membolehkan senario kandungan menjadi diubah suai atau expanded tanpa changing utama permainan logic untuk setiap baharu senario.

Satu senario definition mungkin contain fields seperti:

* Senario identifier.
* Senario kategori.
* Peristiwa description.
* awal syarat.
* tersedia tindakan.
* Evidence definitions.
* mungkin Peristiwa yang tidak dijangka.
* Penyelesaian peraturan.

Permainan ini server interprets these definitions dan menggunakan them construct active senario.

semasa prototaip stores e-mel senario struktur dalam JSON dengan fields
untuk senario identifier, kategori, awam peristiwa, asal status, Red Team
objektif dan siasatan bukti. struktur boleh menjadi extended apabila
tidak dijangka peristiwa-peristiwa dan tambahan senario kategori ialah implemented.

### 12.12 prototaip Implementation

awal prototaip akan menggunakan terhad collection daripada yang telah ditetapkan senario templates dan controlled variasi.

sistem akan focus pada demonstrating itu:

* berbeza senario-senario boleh menjadi dijana daripada reusable templates.
* Senario keadaans boleh contain tersembunyi maklumat.
* Red Team tindakan boleh Ubah suai senario outcomes.
* Blue Team keputusan boleh affect akhir hasil.
* tidak dijangka peristiwa-peristiwa boleh introduce tambahan ketidakpastian.
* server boleh resolve senario-senario consistently.

lebih advanced penjanaan methods mungkin menjadi considered selepas core permainan sistem mempunyai telah implemented dan tested.

### 12.13 Dynamic penjanaan Principle

Dynamic Penjanaan Senario Sistem follows theseprinsip:

1. Senarios ialah dicipta daripada reusable templates dan controlled variasi.
2. server maintains lengkap senario keadaan.
3. pemain tindakan boleh mempengaruhi pembangunan dan hasil daripada senario.
4. tidak dijangka peristiwa-peristiwa introduce ketidakpastian tanpa removing bermakna pemain keputusan.
5. dijana senario-senario mesti remain sah dan consistent dengan permainan ini peraturan.

utama objektif ialah mencipta varied dan replayable permainan manakala mengekalkan core identity daripada Cyber Clash:

> **setiap perlawanan boleh present berbeza situasi, tetapi setiap situasi mesti remain playable, bermakna dan fair.**


---

## 13. Sistem Berbilang Pemain

### 13.1 Multipemain Gambaran Keseluruhan

Cyber Clash ialah direka as dua-pemain permainan berbilang pemain apabila satu pemain controls Red Team dan other controls Blue Team.

kedua-dua pemain participate dalam sama perlawanan tetapi menerima berbeza maklumat according their assigned roles.

Sistem Berbilang Pemain manages pemain connections, role assignment, senario synchronisation, pemain tindakan dan komunikasi antara permainan ini clients dan server.

sistem mesti ensure itu kedua-dua pemain interact dengan sama underlying perlawanan keadaan manakala maintaining maklumat separation required oleh permainan iniplay mekanik.

### 13.2 Seni Bina Client-Server

Cyber Clash akan menggunakan client-server architecture.

setiap pemain runs permainan client dibangunkan menggunakan Godot. server manages perlawanan dan bertindak as authoritative sumber untuk penting permainan keputusan.

architecture consists daripada tiga utama components:

- **Red Team Client:** Displays Red Team maklumat dan sends penyerang's dipilih tindakan.
- **Blue Team Client:** Displays dibenarkan senario maklumat dan sends pembela's siasatan dan defensive tindakan requests.
- **Game Server:** Manages perlawanan keadaan, validates pemain tindakan, resolves senario-senario dan mengira skor.

server ialah bertanggungjawab untuk menentukan sebenar hasil daripada senario sebaliknya daripada allowing individual clients menentukan their own hasil.

### 13.3 Sambungan Pemain

Pada permulaan perlawanan, dua pemain mesti menyambung sama permainan session. server verifies their connections dan manages perlawanan initialisation proses.

connection proses untuk awal prototaip ialah:

```text
Red Team Client -
 - Game Server
Blue Team Client -
 |
 v
 Connection Check
 |
 v
 Penetapan Peranan
 |
 v
 Permulaan Perlawanan
```

If hanya satu pemain ialah disambungkan, server waits untuk second pemain join. perlawanan begins hanya selepas kedua-dua pemain mempunyai dengan berjaya disambungkan dan server mempunyai confirmed itu session ialah ready.

setiap pemain mesti menjadi associated dengan correct perlawanan session menghalang tindakan atau kemas kini daripada menjadi applied another perlawanan.

awal prototaip memberi tumpuan supporting satu active perlawanan involving dua disambungkan pemain. Advanced matchmaking dan session management mungkin menjadi added dalam akan datang versions.

### 13.4 Penetapan Peranan

setiap perlawanan mengandungi dua roles:

- **Red Team:** Attacker.
- **Blue Team:** Defender.

server assigns satu role setiap pemain dan ensures itu kedua-dua pemain cannot occupy sama role dalam single perlawanan.

assigned role menentukan yang interface, maklumat dan tindakan ialah tersedia setiap pemain.

untuk semasa prototaip, pertama disambungkan pemain ialah assigned Red
Team dan second disambungkan pemain ialah assigned Blue Team. Ini
deterministic assignment simplifies local pengujian. Random atau lobby-controlled
assignment mungkin menjadi added later.

### 13.5 Penyegerakan Senario

kedua-dua pemain mesti menerima kemas kini berkaitan sama active senario.

However, synchronisation tidak tidak mean itu kedua-dua pemain menerima identical maklumat.

server sends sesuai senario maklumat setiap client according pemain's role dan semasa permainan keadaan.

Sebagai contoh, Red Team mungkin menerima maklumat tentang tersembunyi peluang, manakala Blue Team menerima hanya awam peristiwa butiran.

server mesti maintain consistent senario keadaan even apabila maklumat displayed setiap pemain ialah berbeza.

### 13.6 Pengendalian Tindakan Pemain

apabila pemain memilih tindakan, client sends tindakan request server. server validates request sebelum applying sebarang perubahan perlawanan keadaan.

Pengesahan termasuk checking:

- sama ada pemain ialah disambungkan correct perlawanan.
- sama ada pemain mempunyai correct role.
- sama ada requested tindakan ialah dibenarkan untuk itu role.
- sama ada senario ialah currently accepting itu tindakan.
- sama ada tindakan memenuhi senario peraturan.
- sama ada sebarang other senario-khusus syarat ialah satisfied.

server proseses sah tindakan according semasa permainan fasa. Tindakans submitted outside dibenarkan fasa atau selepas relevant keputusan mempunyai telah finalised ialah rejected.

server mesti also menghalang repeated requests daripada applying sama tindakan pelbagai times. di mana necessary, tindakan requests hendaklah termasuk identifiers untuk perlawanan, senario dan tindakan submission.

server returns sesuai tindak balas indicate sama ada tindakan ialah accepted atau rejected.

hanya disahkan tindakan boleh affect authoritative permainan keadaan. client mesti tidak menentukan senario hasil atau kemas kini official skor secara berasingan.

### 13.7 Keadaan Permainan Berkuasa Server

Permainan ini server maintains authoritative perlawanan keadaan.

Ini termasuk:

- semasa senario.
- pemain roles.
- Red Team tindakan.
- Blue Team tindakan.
- tersembunyi senario syarat.
- tidak dijangka peristiwa keadaans.
- pemain skor.
- perlawanan kemajuan.
- Senario outcomes.

clients display maklumat provided oleh server dan submit pemain tindakan.

They mesti tidak menjadi trusted menentukan their own skor, reveal tersembunyi maklumat atau declare akhir hasil daripada senario.

server records pemain tindakan dan controls yang maklumat ialah disclosed setiap pemain. Satu pemain's own tindakan mungkin menjadi shown itu pemain, manakala maklumat tentang opponent's tindakan dan tersembunyi senario syarat remains restricted according permainan ini peraturan.

Ini approach helps maintain consistency dan reduces peluang untuk cheating atau unauthorised keadaan perubahan.

### 13.8 Keselamatan Maklumat

Maklumat separation ialah essential Cyber Clash because penipuan dan tidak lengkap maklumat ialah core permainan mekanik.

server mesti ensure itu peribadi maklumat ialah hanya dihantar intended recipient.

Sebagai contoh:

- Red Team peribadi maklumat ialah dihantar hanya Red Team client.
- awam peristiwa maklumat ialah dihantar kedua-dua pemain apabila sesuai.
- tersembunyi server maklumat remains pada server unkurang permainan ini peraturan permit its disclosure.
- Blue Team siasatan hasil ialah dihantar according siasatan peraturan.

sistem mesti tidak hantar lengkap tersembunyi senario keadaan client dan merely hide it melalui pengguna interface.

Maklumat itu pemain ialah tidak dibenarkan know mesti tidak menjadi included dalam itu pemain's client messages.

### 13.9 Communication dan kemas kini

clients dan server exchange messages mengurus perlawanan.

semasa WebSocket prototaip menggunakan JSON messages. disokong message
kategori ialah:

- pemain connection dan disconnection.
- perlawanan initialisation.
- Peranan assignment.
- Senario presentation.
- pemain tindakan requests dan validation tindak balas.
- siasatan hasil.
- tidak dijangka peristiwa notifications.
- Senario outcomes.
- skor kemas kini.
- perlawanan completion.
- Reconnection dan perlawanan resumption.

semasa message shapes ialah:

```json
{"jenis":"tindakan","tindakan":"add_malicious_pautan"}
```

```json
{"jenis":"joined","role":"red"}
```

```json
{"jenis":"keadaan","keadaan":{}}
```

```json
{"jenis":"error","error":"invalid_blue_tindakan"}
```

`keadaan` object ialah dijana separately untuk setiap role. It mesti tidak contain
peribadi atau tersembunyi maklumat itu receiving pemain ialah tidak authorised kepada
see. protocol mungkin menjadi extended as siasatan, tidak dijangka peristiwa-peristiwa,
reconnection dan perlawanan completion ialah implemented.

All messages itu affect perlawanan mesti menjadi prosesed according semasa perlawanan keadaan dan relevant permainan peraturan.

### 13.10 Disconnection Handling

Satu pemain mungkin disconnect semasa perlawanan because daripada network problems atau because pemain closes permainan ini.

server mesti mengesan disconnection dan preserve semasa perlawanan keadaan apabila mungkin.

untuk awal prototaip, disconnection policy ialah:

1. server detects itu pemain mempunyai disconnected.
2. semasa perlawanan ialah temporarily paused menghalang selanjutnya permainan tindakan daripada menjadi prosesed.
3. disconnected pemain mungkin reconnect sama perlawanan session dalam yang telah ditetapkan reconnection period.
4. If pemain reconnects dengan berjaya, server restores sesuai perlawanan maklumat dan resumes perlawanan apabila kedua-dua pemain ialah ready.
5. If pemain tidak tidak reconnect sebelum reconnection period expires, perlawanan ends as tidak lengkap.

server mesti preserve authoritative perlawanan keadaan semasa temporary pause dan menghalang disconnected pemain daripada submitting tindakan until reconnection ialah disahkan.

reconnection period dan detailed recovery behaviour akan menjadi ditentukan semasa implementation dan pengujian.

untuk awal prototaip, asas disconnection policy ialah sufficient. lebih advanced recovery features mungkin menjadi introduced dalam akan datang versions.

### 13.11 perlawanan keadaan Consistency

server mesti maintain consistent urutan daripada peristiwa-peristiwa melaluiout perlawanan, even apabila network delays, repeated requests atau pemain disconnections berlaku.

pemain tindakan mesti menjadi prosesed according semasa perlawanan keadaan, senario fasa dan yang telah ditetapkan permainan peraturan.

server mesti menghalang invalid atau duplicate requests daripada applying sama tindakan lebih daripada once. di mana necessary, tindakan requests hendaklah menjadi associated dengan senario identifier dan submission identifier distinguish baharu tindakan daripada repeated submissions.

apabila simultaneous requests atau delayed messages berlaku, server menentukan yang requests ialah sah according established tindakan-handling peraturan.

If pemain disconnects, server preserves semasa keadaan apabila mungkin dan follows disconnection policy ditetapkan dalam Section 13.10.

These peraturan help ensure itu kedua-dua clients menerima consistent kemas kini dan itu senario outcomes dan skor remain under server control.

### 13.12 Multipemain prototaip Requirements

awal berbilang pemain prototaip hendaklah demonstrate itu:

- Two pemain boleh menyambung sama perlawanan.
- setiap pemain menerima correct role.
- kedua-dua pemain participate dalam sama senario.
- peribadi maklumat ialah separated according pemain roles.
- pemain tindakan ialah disahkan oleh server.
- server resolves senario outcomes.
- skor dan perlawanan kemajuan ialah synchronised.
- Basic disconnection dan reconnection handling ialah disokong.

implementation akan begin dengan small, functional berbilang pemain sistem sebelum lebih advanced rangkaian features ialah introduced.

### 13.13 Multipemain Reka Bentuk Principle

Sistem Berbilang Pemain follows theseprinsip:

1. kedua-dua pemain participate dalam sama authoritative perlawanan.
2. setiap pemain menerima maklumat sesuai their role.
3. server validates tindakan dan menentukan outcomes.
4. tersembunyi senario maklumat mesti tidak menjadi exposed unauthorised clients.
5. sistem hendaklah remain manageable untuk awal prototaip.

utama objektif ialah menyediakan fair berbilang pemain experience manakala mengekalkan ketidakpastian dan penipuan itu menjadi teras Cyber Clash.


---

## 14. Antara Muka Pengguna (UI)

### 14.1 UI Gambaran Keseluruhan

Antara Muka Pengguna (UI) menyediakan visual elements melalui yang pemain interact dengan Cyber Clash.

interface ialah direka present senario maklumat, pemain tindakan, siasatan hasil dan perlawanan kemajuan dalam jelas dan understandable way.

Since Cyber Clash ialah direka untuk pemula, UI hendaklah mengelakkan unnecessary complexity dan menggunakan simple labels, jelas instructions dan bermakna feedback.

Red Team dan Blue Team akan mempunyai berbeza interfaces berdasarkan their respective roles dan maklumat akses.

### 14.2 utama Menu

utama Menu ialah pertama screen displayed apabila permainan ini starts.

It menyediakan akses utama permainan functions.

awal prototaip mungkin termasuk following options:

* **Play** - Enter permainan berbilang pemain aliran.
* **How Play** - Display asas permainan instructions.
* **Settings** - Configure tersedia permainan settings.
* **Quit** - Exit permainan ini.

tambahan features seperti pemain profiles, matchmaking dan statistics mungkin menjadi considered dalam akan datang versions.

### 14.3 Multipemain Lobby

Multipemain Lobby membolehkan dua pemain prepare untuk perlawanan.

lobby mungkin display:

* pemain connection status.
* pemain identifiers atau display names.
* Assigned atau dipilih roles.
* perlawanan readiness status.
* Start perlawanan option.

perlawanan hendaklah begin hanya apabila required pemain ialah disambungkan dan start syarat mempunyai telah satisfied.

server manages lobby keadaan dan confirms apabila perlawanan ialah ready begin.

### 14.4 Red Team Interface

Red Team Interface menyediakan maklumat dan controls required oleh penyerang.

interface mungkin contain:

* **Gambaran Keseluruhan Senario** - Displays semasa senario.
* **peribadi Intelligence Panel** - Displays tambahan maklumat tersedia hanya Red Team.
* **Tindakan Panel** - Displays tersedia serangan, manipulasi dan penipuan tindakan.
* **objektif Panel** - Displays semasa Red Team objektif.
* **perlawanan Status Panel** - Displays relevant perlawanan kemajuan dan skor maklumat.

Sebagai contoh:

```text id "r5d2p1"
RED TEAM

SCENARIO
Pekerja menerima e-mel.

peribadi INTELLIGENCE
asal Status: sah
Peluang: tersedia

tersedia tindakan
[Jangan Lakukan Apa-apa]
[Ubah Suai Peristiwa]
[Tambah Pautan Berniat Jahat]
[Palsukan Sumber]
[Cipta Gangguan]

objektif
Achieve objektif tanpa menjadi dikesan.
```

interface mesti tidak display maklumat itu ialah untersedia Red Team atau reveal tersembunyi server maklumat itu ialah tidak intended untuk pemain.

tersedia tindakan mungkin change according semasa senario.

### 14.5 Blue Team Interface

Blue Team Interface menyediakan maklumat dan controls required oleh pembela.

interface mungkin contain:

* **Peristiwa Panel** - Displays semasa awam peristiwa.
* **Evidence Panel** - Displays Bukti yang tersedia.
* **siasatan Panel** - menyediakan options untuk gathering tambahan maklumat.
* **Defensive Tindakan Panel** - Displays tersedia defensive tindak balas.
* **perlawanan Status Panel** - Displays relevant perlawanan kemajuan dan skor maklumat.

Sebagai contoh:

```text id "cr7n2b"
BLUE TEAM

baharu peristiwa
Pekerja menerima e-mel.

penghantar:
it-menyokong@university-contoh.com

subjek:
penting Account Verification

tersedia tindakan
[Periksa]
[Siasat]
[Lapor]
[Abaikan]
[Sekat]
```

Blue Team Interface mesti tidak secara langsung reveal sama ada peristiwa ialah sah, dimanipulasi atau dicipta as gangguan.

pemain mesti evaluate tersedia bukti sebelum deciding how respond.

### 14.6 Senario Panel

Senario Panel presents maklumat berkaitan active senario.

It mungkin display:

* Senario kategori.
* Peristiwa description.
* Relevant pengguna atau sistem butiran.
* semasa awam maklumat.
* tersedia interaction options.
* Relevant peristiwa kemas kini.

maklumat shown bergantung pada pemain's role dan semasa senario keadaan.

Senario Panel hendaklah remain readable dan organised so itu pemain boleh understand situasi tanpa searching melalui excessive maklumat.

### 14.7 siasatan dan Evidence Panel

siasatan dan Evidence Panel membolehkan Blue Team examine tambahan maklumat tentang peristiwa.

bergantung pada senario, panel mungkin display:

* penghantar atau sumber butiran.
* pautan destination.
* lampiran maklumat.
* Log Masuk sejarah.
* Rangkaian aktiviti.
* berkaitan peristiwa-peristiwa.
* siasatan findings.

maklumat revealed bergantung pada siasatan tindakan dan peraturan daripada active senario.

siasatan hasil mungkin menjadi tidak lengkap dan hendaklah tidak secara automatik reveal lengkap tersembunyi keadaan.

### 14.8 Peristiwa Log dan Notifications

Peristiwa Log records penting peristiwa-peristiwa itu berlaku semasa perlawanan.

It mungkin termasuk:

* baharu senario notifications.
* Peristiwa yang tidak dijangka.
* siasatan hasil.
* Tindakan confirmations.
* Defensive tindak balas hasil.
* Senario penyelesaian messages.

Notifications inform pemain apabila penting perubahan berlaku.

Sebagai contoh, baharu login amaran mungkin appear manakala Blue Team ialah investigating e-mel.

interface hendaklah distinguish baharu notifications daripada previous peristiwa-peristiwa help pemain understand urutan daripada peristiwa-peristiwa.

Peristiwa Log hendaklah display hanya maklumat itu pemain ialah authorised akses.

### 14.9 perlawanan Status Panel

perlawanan Status Panel menyediakan maklumat tentang semasa keadaan daripada perlawanan.

It mungkin display:

* pemain role.
* semasa senario.
* semasa skor.
* perlawanan kemajuan.
* Remaining masa, if timer ialah implemented.
* semasa objektif.
* perlawanan connection status.

displayed maklumat mungkin differ antara Red Team dan Blue Team.

interface hendaklah mengelakkan revealing opponent's peribadi maklumat atau tersembunyi objektif melalui skor summaries dan status messages.

### 14.10 Penyelesaian Senario Skrin

selepas senario mempunyai telah resolved, permainan ini displays summary daripada its hasil.

summary mungkin termasuk:

* Senario hasil.
* mata gained atau lost.
* Tindakans taken oleh pemain.
* akibat daripada pemain's keputusan.
* Relevant bukti dan explanations.
* Updated perlawanan kemajuan.

amount daripada maklumat revealed hendaklah depend pada permainan ini maklumat peraturan.

summary hendaklah help pemula understand why tindakan succeeded atau gagal tanpa exposing maklumat itu mesti remain tersembunyi semasa active senario.

### 14.11 perlawanan Hasil Skrin

At end daripada perlawanan, perlawanan Hasil Skrin displays akhir hasil.

It mungkin termasuk:

* Red Team akhir skor.
* Blue Team akhir skor.
* Winning pemain atau team.
* Completed objektif.
* ketara senario outcomes.
* dipilih prestasi statistics.
* Options return utama Menu atau start another perlawanan.

akhir hasil ialah calculated oleh server dan displayed oleh client.

### 14.12 UI Reka Bentuk Prinsip

UI follows theseprinsip:

1. **Clarity:** Maklumat hendaklah menjadi easy understand.
2. **Peranan Separation:** setiap team hendaklah see hanya maklumat intended untuk its role.
3. **Consistency:** Similar tindakan dan notifications hendaklah menggunakan consistent visual patterns.
4. **Feedback:** pemain tindakan hendaklah menyediakan jelas feedback.
5. **Beginner-Friendly Reka Bentuk:** Technical terms hendaklah menjadi explained apabila necessary.
6. **Readability:** penting maklumat hendaklah menjadi easy mengenal pasti.
7. **Scalability:** interface hendaklah menyokong tambahan senario-senario dan tindakan dalam akan datang versions.

### 14.13 prototaip UI Scope

awal prototaip akan focus pada essential interfaces required untuk playable berbilang pemain perlawanan.

These termasuk:

* utama Menu.
* Multipemain Lobby.
* Red Team Interface.
* Blue Team Interface.
* Senario dan Evidence Panels.
* Peristiwa Notifications.
* perlawanan Status Panel.
* Penyelesaian Senario Skrin.
* perlawanan Hasil Skrin.

layout dan visual Reka bentuk akan menjadi refined semasa implementation dan pengujian.

tambahan visual effects, animations dan customisation options mungkin menjadi introduced dalam later versions.


---

## 15. Keperluan Teknikal

### 15.1 Technical Gambaran Keseluruhan

Ini section describes proposed technical keperluan untuk developing Cyber Clash.

project akan menggunakan permainan engine, rangkaian components dan structured senario data menyokong core permainan mekanik.

technical implementation mesti menyokong dua-pemain permainan berbilang pemain, role-berdasarkan maklumat akses, senario penjanaan, pemain tindakan validation dan server-controlled senario penyelesaian.

awal pembangunan akan prioritise functional prototaip sebelum introducing lebih advanced features.

### 15.2 Game Engine

**Godot Engine** akan menjadi digunakan develop permainan ini client dan its pengguna interface.

Godot menyediakan tools untuk creating interactive permainan scenes, pengguna interfaces, permainan logic dan rangkaian functionality.

engine akan menjadi digunakan implement:

* utama Menu dan Multipemain Lobby.
* Red Team dan Blue Team interfaces.
* Senario presentation dan pemain interactions.
* siasatan dan defensive tindakan controls.
* perlawanan status dan skor displays.
* Communication antara permainan ini client dan berbilang pemain server.

khusus Godot version akan menjadi dipilih semasa implementation dan kept consistent melaluiout pembangunan.

### 15.3 Programming Language

**GDScript** akan menjadi primary pengaturcaraan bahasa untuk implementing Godot permainan client.

It akan menjadi digunakan untuk interface interactions, scene management, client-side permainan behaviour dan komunikasi dengan server.

Permainan ini server menggunakan **Node.js** dengan CommonJS modules. server-side
implementation ialah kept berasingan daripada Godot client so itu authoritative
senario keadaan dan skor calculation remain pada server.

### 15.4 Multipemain Seni Bina

Cyber Clash akan menggunakan client-server architecture, consistent dengan Sistem Berbilang Pemain described dalam Section 13.

architecture consists daripada tiga utama components:

- **Red Team Client:** Displays Red Team maklumat dan sends pemain's tindakan requests.
- **Blue Team Client:** Displays dibenarkan senario maklumat dan sends pemain's siasatan dan defensive tindakan requests.
- **Game Server:** Manages perlawanan sessions, assigns pemain roles, maintains authoritative permainan keadaan, validates tindakan, resolves senario-senario dan mengira skor.

kedua-dua permainan clients akan dibangunkan menggunakan Godot. server akan remain bertanggungjawab untuk penting permainan keputusan dan akan menentukan official hasil daripada setiap senario.

server mesti ensure itu kedua-dua pemain participate dalam sama perlawanan manakala receiving hanya maklumat dibenarkan oleh their respective roles.

semasa prototaip menggunakan Node.js dengan `ws` WebSocket library dan JSON
messages. Ini choice supports dua-pemain komunikasi dan
role-khusus keadaan delivery required oleh awal prototaip.

### 15.5 Server-Side Game Logic

server ialah bertanggungjawab untuk prosesing core permainan peraturan.

Its responsibilities termasuk:

* Creating dan managing perlawanan sessions.
* Assigning pemain roles.
* Generating senario keadaans.
* Processing Red Team tindakan.
* Validating Blue Team tindakan.
* Managing Peristiwa yang tidak dijangka.
* Controlling akses peribadi maklumat.
* Resolving senario outcomes.
* mengira skor dan checking win syarat.

server mesti mengesahkan incoming requests daripada trusting values atau hasil supplied oleh clients.

Ini ialah particularly penting because permainan iniplay relies pada tersembunyi maklumat dan penipuan.

### 15.6 Structured Senario Data

Cyber Clash menggunakan JSON store senario definitions dan their variasi.

JSON menyediakan structured format untuk representing senario maklumat seperti:

* Senario identifiers.
* Senario kategori.
* Peristiwa descriptions.
* awal syarat.
* tersedia tindakan.
* Evidence definitions.
* tidak dijangka peristiwa peraturan.
* mungkin outcomes.

server akan interpret senario data dan menggunakan it construct active senario-senario.

Separating senario kandungan daripada utama permainan logic akan membuat it easier add atau Ubah suai senario-senario tanpa rewriting entire sistem.

semasa senario struktur termasuk identifier, kategori, awam peristiwa,
asal status, Red Team objektif dan siasatan bukti. server
loads ini struktur as sumber data untuk active senario. Schema
validation akan menjadi added sebelum lebih senario templates ialah introduced. tambahan fields
untuk tidak dijangka peristiwa-peristiwa dan multi-senario perlawanan mungkin menjadi added later.

### 15.7 Networking dan Communication

berbilang pemain sistem memerlukan komunikasi mechanism antara Godot clients dan permainan ini server.

dipilih mechanism mesti menyokong:

- pemain connection dan disconnection notifications.
- perlawanan session creation dan initialisation.
- pemain role assignment.
- Senario maklumat delivery.
- pemain tindakan requests dan validation tindak balas.
- siasatan hasil dan tidak dijangka peristiwa notifications.
- Senario outcomes dan skor kemas kini.
- perlawanan completion dan reconnection handling.

server mesti proses messages according semasa perlawanan keadaan dan permainan fasa. Invalid, unauthorised atau repeated tindakan requests mesti tidak punca unintended perubahan permainan ini keadaan.

Communication mesti also preserve role-berdasarkan maklumat separation. server mesti hantar hanya maklumat itu setiap pemain ialah authorised menerima dan mesti tidak transmit lengkap tersembunyi senario keadaan kedua-dua clients.

semasa rangkaian protocol ialah WebSocket dengan JSON messages, implemented
menggunakan Node.js `ws` library. server listens pada configurable port
(port 3000 oleh default) dan sends role-khusus keadaan kemas kini selepas accepted
tindakan. protocol ialah documented dalam Section 13.9.

### 15.8 Version Control

**Git dan GitHub** akan menjadi digunakan untuk version control dan project backup.

Git records perubahan project files, manakala GitHub menyediakan remote repository untuk storing dan managing project.

Version control akan menyokong:

* Tracking pembangunan kemajuan.
* Maintaining project sejarah.
* Backing up sumber code dan documentation.
* Managing pembangunan branches.
* Restoring earlier versions apabila necessary.
* Collaborating dengan other contributors if required.

project akan menggunakan `develop` branch untuk ongoing pembangunan dan retain `utama` as stable branch.

perubahan akan menjadi committed regularly maintain jelas pembangunan sejarah.

### 15.9 Development persekitaran

project akan dibangunkan pada compatible desktop operating sistem menggunakan required pembangunan tools.

pembangunan persekitaran akan termasuk:

* Godot Engine.
* Satu code editor seperti Visual Studio Code.
* Git.
* Satu GitHub repository.
* Sebarang tambahan server runtime atau rangkaian tools required oleh dipilih architecture.

tambahan tools akan hanya menjadi introduced apabila they serve ditetapkan project requirement.

### 15.10 Keperluan Pengujian

pengujian akan menjadi conducted melaluiout pembangunan verify functionality, keselamatan dan consistency daripada permainan ini.

awal pengujian activities akan termasuk:

- pengujian individual permainan functions.
- pengujian senario penjanaan dan validation.
- pengujian Red Team dan Blue Team tindakan.
- Verifying maklumat separation antara pemain.
- pengujian server-side tindakan validation.
- pengujian berbilang pemain komunikasi dan senario synchronisation.
- Verifying skor calculation dan win syarat.
- pengujian tidak dijangka peristiwa-peristiwa dan senario outcomes.
- pengujian pemain disconnection, reconnection dan perlawanan recovery.
- Verifying itu invalid atau repeated requests do tidak menghasilkan unintended hasil.

hasil akan menjadi digunakan mengenal pasti defects dan improve reliability daripada prototaip.

### 15.11 Pertimbangan Keselamatan

sistem mesti melindungi integrity daripada perlawanan dan confidentiality daripada tersembunyi senario maklumat.

penting considerations termasuk:

* Keeping authoritative senario keadaan pada server.
* Validating pemain tindakan.
* Preventing clients daripada selecting unauthorised tindakan.
* Avoiding transmission daripada tersembunyi maklumat wrong pemain.
* Validating senario data sebelum menggunakan.
* Handling invalid atau repeated requests safely.

Projek ini ialah simulasi pendidikan keselamatan siber. Pelaksanaan awal hanya
akan menggunakan senario simulasi dan tidak akan menjalankan serangan sebenar
terhadap sistem luaran.

### 15.12 Skop Prototaip

awal prototaip akan focus pada demonstrating essential functionality daripada Cyber Clash.

planned prototaip scope ialah:

- Two-pemain permainan berbilang pemain.
- Red Team dan Blue Team role assignment.
- Satu terhad set daripada yang telah ditetapkan senario templates.
- Controlled senario variasi.
- Peranan-berdasarkan maklumat akses.
- Senario-khusus pemain tindakan.
- Controlled Peristiwa yang tidak dijangka.
- Server-side tindakan validation dan senario penyelesaian.
- Basic pemarkahan dan win syarat.
- Essential pengguna interfaces.
- Basic pemain disconnection dan reconnection handling.

Advanced matchmaking, large-scale berbilang pemain menyokong, sophisticated artificial intelligence dan extensive senario libraries ialah outside awal scope unkurang they become necessary semasa pembangunan.

prototaip akan prioritise reliable dua-pemain perlawanan sebelum introducing lebih advanced rangkaian features.

semasa implementation checkpoint supports:

- One yang telah ditetapkan e-mel akaun-verification senario.
- One active dua-pemain perlawanan.
- Deterministic Red Team dan Blue Team role assignment.
- Red Team `Jangan Lakukan Apa-apa` dan `Tambah Pautan Berniat Jahat` tindakan.
- Blue Team siasatan, melaporkan, mengabaikan dan menyekat tindakan.
- Server-side fasa validation, role-khusus keadaan views dan senario penyelesaian.
- Provisional pemarkahan values documented dalam Section 11.8.
- WebSocket komunikasi menggunakan JSON messages documented dalam Section 13.9.
- Antara muka asas Godot untuk memaparkan peristiwa, maklumat mengikut peranan,
  tindakan dan hasil senario.

following planned features ialah tidak implemented dalam ini checkpoint:

- Multiple senario-senario dalam satu perlawanan.
- tidak dijangka peristiwa penjanaan.
- Reconnection dan perlawanan recovery.
- perlawanan completion dan akhir winner calculation.

### 15.13 Keperluan Teknikal Principle

technical implementation follows theseprinsip:

1. menggunakan tools itu secara langsung menyokong project keperluan.
2. Keep awal architecture manageable.
3. Maintain server authority over penting permainan keadaan dan outcomes.
4. berasingan senario kandungan daripada core permainan logic apabila practical.
5. melindungi role-khusus dan tersembunyi maklumat.
6. Expand sistem hanya apabila core prototaip ialah functional.

Objektif utama ialah membangunkan permainan simulasi keselamatan siber
berbilang pemain yang berfungsi, mudah diselenggara dan boleh diuji serta
menunjukkan konsep teras Cyber Clash.
