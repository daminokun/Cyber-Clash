# Cyber Clash

## Dokumen Reka Bentuk Permainan (GDD) v0.1

> **Nota:** Dokumen ini ialah ringkasan Bahasa Melayu yang meliputi Bahagian
> 1-8. Rujuk [GDD utama](../Game-Design-Document.md) untuk keperluan
> teknikal, berbilang pemain, UI, pengujian dan skop prototaip terkini.

---

## 1. Gambaran Keseluruhan Permainan

### 1.1 Tajuk Permainan

**Cyber Clash**

### 1.2 Jenis Permainan

Permainan simulasi keselamatan siber ini menampilkan perlawanan pemain lawan pemain (PvP).

### 1.3 Pemain

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

Satu perlawanan terdiri daripada beberapa senario. Setiap senario mewakili peristiwa yang mungkin berlaku dalam persekitaran permainan.

### 3.1 Penjanaan Senario

Pada permulaan senario, permainan akan menjana satu peristiwa.

Contohnya:

* Seorang pekerja menerima e-mel.
* Seorang pengguna log masuk ke akaun.
* Peranti USB yang tidak diketahui disambungkan.
* Aktiviti rangkaian yang luar biasa dikesan.

Peristiwa yang dijana mungkin sah, dimanipulasi oleh Red Team atau dipengaruhi oleh peristiwa yang tidak dijangka.

### 3.2 Red Team

Red Team menerima maklumat peribadi tambahan tentang senario tersebut.

Pemain boleh memilih untuk:

* Jangan lakukan apa-apa.
* Manipulasi peristiwa.
* Cipta ancaman palsu.
* Eksploitasi situasi.
* Cipta gangguan.

Objektif Red Team adalah untuk mencapai matlamatnya tanpa dikesan atau dihentikan oleh Blue Team.

### 3.3 Blue Team

Blue Team menerima senario tersebut tetapi tidak mengetahui tindakan yang telah diambil oleh Red Team.

Blue Team boleh:

* Abaikan peristiwa.
* Periksa peristiwa.
* Lapor peristiwa.
* Sekat sumber.
* Siasat dengan lebih lanjut.
* Ambil tindakan pertahanan.

Blue Team mesti membuat keputusan berdasarkan maklumat yang tersedia.

### 3.4 penipuan

Penipuan merupakan bahagian penting dalam Cyber Clash.

Red Team boleh mencipta situasi yang membuatkan Blue Team percaya bahawa serangan sedang berlaku walaupun hakikatnya mungkin tidak begitu.

Sebagai contoh, Red Team mungkin mencipta peristiwa mencurigakan palsu sebagai gangguan, manakala objektif sebenar berlaku di tempat lain.

Hal ini menghalang Blue Team daripada menganggap setiap peristiwa mencurigakan sebagai serangan.

### 3.5 Peristiwa Tidak Dijangka

Permainan boleh memperkenalkan peristiwa yang tidak dijangka semasa senario.

Contohnya:

* Peristiwa sistem yang sah.
* Ralat sistem rawak.
* Satu peristiwa disebabkan oleh another pengguna.
* Peristiwa kedua yang berlaku tanpa diduga.
* Serangan yang menghasilkan bukti tidak dijangka.
* Penggera palsu.

Peristiwa yang tidak dijangka menjadikan setiap senario kurang dapat diramal dan memerlukan pemain menyesuaikan diri dengan perubahan situasi.

### 3.6 Hasil Senario

Selepas kedua-dua pemain melengkapkan tindakan masing-masing, server menentukan hasil senario.

Hasil bergantung pada:

* asal senario.
* Tindakan tersembunyi Red Team.
* Tindak balas Blue Team.
* Bukti yang tersedia.
* Peristiwa yang tidak dijangka.

Hasil tersebut digunakan untuk mengira skor pemain dan mengemas kini keadaan permainan.

## 4. Red Team

### 4.1 Peranan

Red Team bertindak sebagai penyerang dalam permainan ini. Objektif utama adalah untuk mendapatkan kelebihan melalui eksploitasi, manipulasi atau penipuan.

Red Team tidak perlu menyerang setiap senario. Pemain boleh memilih untuk menyerang, mencipta gangguan atau tidak mengambil tindakan.

Ini membolehkan Red Team menggunakan strategi yang berbeza tanpa bergantung pada serangan langsung.

### 4.2 Red Team Maklumat

Red Team menerima maklumat tambahan yang tidak tersedia kepada Blue Team.

Sebagai contoh:

```text
SCENARIO

Pekerja menerima e-mel daripada IT Jabatan.

RED TEAM INFO

E-mel Status: sah
Peluang: tersedia

Tindakan yang Mungkin:

[Jangan Lakukan Apa-apa]
[Ubah suai E-mel]
[Tambah Pautan Berniat Jahat]
[Palsukan Sumber]
[Cipta Gangguan]
```

Blue Team tidak menerima maklumat Red Team.

Perbezaan maklumat antara kedua-dua pasukan mewujudkan ketidakpastian dan membolehkan Red Team menggunakan penipuan.

### 4.3 Red Team Tindakans

Red Team boleh melaksanakan berbeza tindakan bergantung pada senario.

| Tindakan | Penerangan |
| ------------------ | ------------------------------------------------------------ |
| Jangan Lakukan Apa-apa | Red Team tidak tidak interfere dengan peristiwa. |
| Ubah Suai Peristiwa | Red Team perubahan part daripada asal peristiwa. |
| Pautan Berniat Jahat | Red Team adds malicious pautan peristiwa. |
| Palsukan Sumber | Red Team disguises asal sumber daripada peristiwa. |
| Cipta Gangguan | Red Team mewujudkan palsu peristiwa distract Blue Team. |

tersedia tindakan boleh change bergantung pada senario.

### 4.4 penipuan

penipuan ialah satu daripada utama mekanik daripada Cyber Clash.

Red Team boleh mencipta mengelirukan situasi mempengaruhi keputusan daripada Blue Team.

Sebagai contoh, Red Team mungkin mencipta amaran log masuk yang mencurigakan sebagai gangguan, manakala e-mel asal kekal sebagai peluang sebenar untuk serangan.

Blue Team perlu menentukan sama ada peristiwa itu benar-benar ancaman atau sekadar gangguan.

### 4.5 Jangan Lakukan Apa-apa

Red Team boleh memilih **Jangan Lakukan Apa-apa** sebagai tindakan yang sah.

Hal ini penting kerana tidak setiap senario merupakan serangan.

Sebagai contoh, E-mel yang sah mungkin diterima oleh pengguna. Jika Red Team tidak berbuat apa-apa, peristiwa itu kekal sah.

Blue Team mungkin masih menentukan melaporkan atau menyekat peristiwa. Hal ini boleh mengakibatkan kesan positif palsu.

### 4.6 Red Team had

Red Team mungkin mempunyai sumber atau mata tindakan yang terhad bagi menghalang pemain daripada melaksanakan tindakan tanpa had.

Satu sistem yang mungkin ialah:

```text
RED TEAM

Tindakan mata: 3

Jangan Lakukan Apa-apa -> 0
Ubah Suai Peristiwa -> 1
Pautan Berniat Jahat -> 1
Palsukan Sumber -> 1
Cipta Gangguan -> 2
```

Sistem sumber yang tepat akan ditentukan semasa reka bentuk dan pengujian permainan selanjutnya.

### 4.7 Red Team objektifs

objektif daripada Red Team boleh change bergantung pada senario.

Objektif yang mungkin termasuk:

* Mendapatkan akses kepada sistem.
* Mendapatkan maklumat sensitif.
* Mengelakkan pengesanan.
* Menyebabkan Blue Team membuat keputusan yang salah.
* Mencipta penggera palsu.
* Melengkapkan serangan dengan berjaya.

Red Team boleh therefore mendapatkan kelebihan tidak hanya oleh secara langsung attacking sistem, tetapi also oleh manipulating keputusan dibuat oleh Blue Team.

## 5. Blue Team

### 5.1 Peranan

Blue Team bertindak sebagai pembela dalam permainan ini.

utama objektif daripada Blue Team ialah mengenal pasti potential ancaman, menyiasat mencurigakan peristiwa-peristiwa dan melindungi sistem daripada serangan.

However, Blue Team tidak tidak know sama ada peristiwa mempunyai telah dimanipulasi oleh Red Team, ialah sah peristiwa, atau ialah tidak dijangka peristiwa dijana oleh permainan ini.

Oleh itu, Blue Team mesti membuat keputusan berdasarkan maklumat dan bukti yang tersedia.

### 5.2 Blue Team Maklumat

Blue Team menerima awam maklumat berkaitan senario.

Sebagai contoh:

```text
baharu peristiwa

Pekerja diterima e-mel
daripada IT Jabatan.

penghantar:
it-menyokong@university-contoh.com

subjek:
penting Account Verification

tersedia Tindakans:

[Periksa]
[Lapor]
[Abaikan]
[Sekat]
[Siasat]
```

Blue Team tidak tidak menerima tersembunyi maklumat tersedia Red Team.

### 5.3 Blue Team Tindakans

tersedia tindakan depend pada jenis daripada senario.

| Tindakan | Penerangan |
| ----------- | ------------------------------------------------------------ |
| Periksa | Examine tersedia maklumat daripada peristiwa. |
| Lapor | Lapor peristiwa as potential keselamatan ancaman. |
| Abaikan | Take no tindakan against peristiwa. |
| Sekat | Sekat sumber atau peristiwa daripada continuing. |
| Siasat | melaksanakan tambahan siasatan mendapatkan lebih maklumat. |

sesetengah tindakan mungkin memerlukan tambahan masa atau sumber.

### 5.4 siasatan

siasatan membolehkan Blue Team mendapatkan tambahan maklumat sebelum membuat keputusan.

Sebagai contoh, apabila investigating e-mel, Blue Team mungkin menjadi able memeriksa:

* penghantar maklumat.
* pautan destination.
* lampiran maklumat.
* Previous komunikasi sejarah.
* Basic keselamatan petunjuk.

siasatan tidak tidak always menyediakan jelas answer.

sesetengah bukti mungkin menjadi tidak lengkap, mengelirukan atau dipengaruhi oleh tindakan dilaksanakan oleh Red Team.

### 5.5 Positif Palsu

Blue Team tidak sepatutnya melaporkan setiap peristiwa mencurigakan secara automatik.

Jika Blue Team tersilap mengenal pasti peristiwa yang sah sebagai serangan, permainan ini mungkin apply palsu-positif akibat.

Sebagai contoh:

```text
sebenar Peristiwa:
sah E-mel

Blue Team Tindakan:
Lapor

Hasil:
Positif Palsu
```

Akibatnya mungkin termasuk kehilangan mata, penggunaan sumber atau pembaziran masa.

Penalti sebenar akan ditentukan semasa pengimbangan permainan selanjutnya.

### 5.6 Defensive Response

Apabila Blue Team mengenal pasti ancaman sebenar, pemain boleh mengambil tindakan pertahanan.

Contohnya:

* Sekating malicious sumber.
* mengkuarantin mencurigakan kandungan.
* mengunci compromised akaun.
* memantau mencurigakan aktiviti.
* Laporing insiden.

keberkesanan daripada tindak balas bergantung pada sebenar senario dan tindakan dilaksanakan oleh Red Team.

### 5.7 ketidakpastian

Blue Team tidak dijamin menerima maklumat yang lengkap.

Satu peristiwa mungkin be:

1. Satu sah peristiwa.
2. dimanipulasi oleh Red Team.
3. Satu palsu peristiwa dicipta as gangguan.
4. Satu tidak dijangka peristiwa dijana oleh permainan ini.

Oleh itu, Blue Team mesti menilai bukti yang tersedia sebelum memilih tindak balas.

### 5.8 Blue Team objektif

Objektif utama Blue Team ialah:

* Mengesan ancaman sebenar.
* Melindungi sistem dan maklumat.
* Minimise damage disebabkan oleh serangan.
* Mengelakkan tindakan pertahanan yang tidak perlu.
* mengenal pasti deceptive atau mengelirukan peristiwa-peristiwa.

Blue Team ialah rewarded untuk membuat sesuai keputusan sebaliknya daripada semata-mata responding setiap peristiwa.

## 6. Sistem Senario

### 6.1 Gambaran Keseluruhan Senario

Senario mewakili peristiwa atau situasi yang berlaku semasa perlawanan.

Satu senario tidak tidak secara automatik mean itu serangan mempunyai occurred. It mungkin represent sah peristiwa, peristiwa dimanipulasi oleh Red Team, atau tidak dijangka peristiwa dijana oleh permainan ini.

senario sistem menyediakan situasi dalam yang kedua-dua pemain membuat their keputusan.

### 6.2 Senario aliran

Senario asas mengikuti proses berikut:

```text
Senario dijana
->
Red Team menerima tambahan Maklumat
->
Red Team memilih Tindakan
->
Blue Team menerima Peristiwa
->
Blue Team Siasats atau Responds
->
tidak dijangka Peristiwa May berlaku
->
Server Resolves Senario
->
hasil dan skor
```

### 6.3 Jenis Senario

Katalog senario mengandungi banyak jenis. Setiap perlawanan memilih tiga
senario yang berbeza secara rawak:

| Senario jenis | Contoh |
| ------------- | ------------------------------------------------- |
| E-mel | Pekerja menerima e-mel daripada IT Jabatan. |
| Log Masuk | Unusual login aktiviti ialah dikesan. |
| USB | Satu tidak diketahui USB peranti ialah disambungkan computer. |
| Rangkaian | mencurigakan network aktiviti ialah dikesan. |
| Malware | Satu pemasangan perisian mencurigakan dimuat turun. |
| Ransomware | Banyak fail ditukar nama secara luar biasa. |
| Akses Cloud | Permission folder cloud berubah secara tidak dijangka. |
| Phishing QR | Kod QR membawa pengguna ke laman tidak dipercayai. |
| MFA | Pengguna menerima banyak permintaan pengesahan. |
| Endpoint | Extension browser meminta akses berlebihan. |
| Keselamatan Fizikal | Laptop organisasi dilaporkan hilang. |
| Rantaian Perisian | Update perisian mempunyai sumber tidak dipercayai. |
| Risiko Orang Dalam | Akaun staf membuka rekod dalam jumlah luar biasa. |
| Wi-Fi dan Bluetooth | Peranti wireless tidak dikenali cuba menyambung. |
| Log dan Backup | Rekod audit atau backup menunjukkan perubahan. |
| Akaun Servis | Akaun sistem digunakan melalui sesi interaktif. |
| Aplikasi Mobile | Aplikasi meminta permission yang tidak berkaitan. |

Senario tambahan mempunyai fail kandungan dan module server sendiri. Senario
boleh ditambah tanpa mengubah logik utama perlawanan.

### 6.4 Variasi Senario

Setiap jenis senario boleh mempunyai variasi yang berbeza bagi mengelakkan permainan menjadi berulang.

Sebagai contoh, E-mel senario mungkin termasuk:

* IT notification.
* Password reset request.
* University announcement.
* Account verification.
* File sharing notification.

Senario yang dijana mungkin mempunyai ciri yang berbeza bergantung pada situasi.
Setiap module senario menentukan tindakan counter Red, dependency defensive
response dan perubahan action seterusnya. Tindakan sebelumnya boleh membuang
atau mengubah action pihak lawan. Server menggunakan peraturan yang sama dalam
paparan pemain dan validation action.

### 6.5 Keadaan Senario

setiap senario mengandungi tersembunyi keadaan diuruskan oleh permainan ini server.

keadaan boleh contain maklumat seperti:

* asal peristiwa status.
* Red Team tindakan.
* serangan status.
* Bukti yang tersedia.
* tidak dijangka peristiwa status.
* Senario hasil.

Blue Team tidak tidak mempunyai akses lengkap tersembunyi keadaan.

### 6.6 sah Senario

Satu senario boleh berlaku tanpa sebarang Red Team interference.

Sebagai contoh:

```text
Senario:
Normal IT e-mel

Red Team:
Jangan Lakukan Apa-apa

Blue Team:
Lapor

Hasil:
Positif Palsu
```

Hal ini menghalang Blue Team daripada menganggap setiap senario mengandungi serangan.

### 6.7 dimanipulasi Senario

Red Team boleh manipulate sah senario.

Sebagai contoh:

```text
asal Senario:
Normal IT e-mel

Red Team:
Tambah Pautan Berniat Jahat

Blue Team:
Abaikan

Hasil:
Serangan berjaya
```

Blue Team mesti menentukan sama ada peristiwa ialah sah atau mempunyai telah dimanipulasi.

### 6.8 Deceptive Senario

Red Team boleh mencipta gangguan mempengaruhi Blue Team's keputusan.

Sebagai contoh:

```text
asal Senario:
E-mel peristiwa

Red Team:
Cipta Gangguan

baharu Peristiwa:
mencurigakan login amaran

Blue Team:
Siasats login amaran

Hasil:
Red Team memperoleh kelebihan
```

Ini membolehkan Red Team mempengaruhi Blue Team tanpa secara langsung attacking asal peristiwa.

### 6.9 tidak dijangka Senario peristiwa

tidak dijangka peristiwa-peristiwa mungkin berlaku semasa senario.

Contohnya:

* Sistem errors.
* tambahan pengguna aktiviti.
* baharu keselamatan alerts.
* tidak dijangka network aktiviti.
* Other peristiwa-peristiwa dijana oleh permainan ini.

tidak dijangka peristiwa-peristiwa mungkin berlaku secara berasingan daripada Red Team.

Ini means Blue Team mesti continue evaluating tersedia maklumat daripada assuming itu setiap baharu peristiwa ialah disebabkan oleh Red Team.

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

objektif bergantung pada semasa senario dan Red Team's strategi.

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

Peristiwa Tidak Dijangka boleh menjadi triggered oleh khusus syarat atau melalui predefined kebarangkalian dalam senario.

Sebagai contoh:

```text
asal Senario:
Pekerja menerima e-mel.

Red Team:
Jangan Lakukan Apa-apa

Blue Team:
Siasats e-mel.

tidak dijangka Peristiwa:
mencurigakan login dikesan.

Blue Team:
Must menentukan sama ada login ialah berkaitan
kepada e-mel atau ialah berasingan peristiwa.
```

baharu peristiwa boleh change situasi even apabila Red Team mempunyai tidak dilaksanakan serangan.

### 8.4 Relationship dengan Red Team Tindakans

Satu tidak dijangka Peristiwa boleh berlaku secara berasingan daripada Red Team's tindakan.

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

Peristiwa Tidak Dijangka akan tidak berlaku completely randomly tanpa sebarang restrictions.

Permainan ini akan menggunakan **predefined syarat** dan **kebarangkalian** menentukan apabila tidak dijangka Peristiwa boleh berlaku.

Sebagai contoh:

```text
Senario Condition:
Blue Team starts siasatan.

mungkin tidak dijangka Peristiwa:
baharu login amaran.

Probability:
ditentukan oleh senario configuration.
```

Ini approach membolehkan permainan ini mencipta unpredictable situasi manakala masih maintaining **permainan balance**.

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
