export interface KasTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'masuk' | 'keluar';
  receiptNo: string;
  verifiedBy: string;
}

export interface Officer {
  id: string;
  name: string;
  role: string;
  phone: string;
  waLink: string;
  initials: string;
  status: 'online' | 'busy' | 'offline';
  badgeColor: string;
  avatar?: string;
  bio?: string;
}

export interface UmkmItem {
  id: string;
  name: string;
  category: 'kuliner' | 'jasa' | 'kerajinan' | 'harian';
  categoryLabel: string;
  description: string;
  address: string;
  locationNotes: string;
  priceNote: string;
  badge: string;
  image: string;
  imageAlt: string;
  phone: string;
  waText: string;
  rating?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  album: 'kerja-bakti' | 'senam' | 'kemerdekaan' | 'posyandu';
  albumLabel: string;
  date: string;
  participants: string;
  description: string;
  image: string;
  imageAlt: string;
  isVideo?: boolean;
  videoDuration?: string;
}

export interface ComplaintTicket {
  id: string;
  ticketNo: string;
  reporterName: string;
  isAnonymous: boolean;
  phone: string;
  block: string;
  houseNo: string;
  category: string;
  urgency: 'Biasa' | 'Cukup Mendesak' | 'Darurat';
  specificLocation: string;
  detail: string;
  status: 'selesai' | 'dikerjakan' | 'tinjauan';
  timeAgo: string;
  followUpNote?: string;
}

export interface NewsAgenda {
  id: string;
  title: string;
  category: string;
  categoryBadge: string;
  date: string;
  time: string;
  location: string;
  summary: string;
  fullContent: string;
  image: string;
  imageAlt: string;
}

export const initialKasTransactions: KasTransaction[] = [
  {
    id: 'tx-1',
    date: '24 Okt 2025',
    description: 'Iuran Warga Kolektif Blok B (18 KK)',
    category: 'Iuran Rutin',
    amount: 1800000,
    type: 'masuk',
    receiptNo: 'KW-0892',
    verifiedBy: 'Bendahara Agus Santoso',
  },
  {
    id: 'tx-2',
    date: '22 Okt 2025',
    description: 'Beli 6 Unit Lampu LED Solar Gang Melati',
    category: 'PJU & Sarana',
    amount: 720000,
    type: 'keluar',
    receiptNo: 'NT-1102',
    verifiedBy: 'Sie Pembangunan RT 11',
  },
  {
    id: 'tx-3',
    date: '20 Okt 2025',
    description: 'Sumbangan Donatur Warga (Keluarga Bpk. Hartanto Blok D)',
    category: 'Donasi Bebas',
    amount: 1000000,
    type: 'masuk',
    receiptNo: 'DN-0041',
    verifiedBy: 'Ketua RT Bambang Sutrisno',
  },
  {
    id: 'tx-4',
    date: '18 Okt 2025',
    description: 'Konsumsi & Air Mineral Kerja Bakti Massal RT',
    category: 'Kegiatan Guyub',
    amount: 380000,
    type: 'keluar',
    receiptNo: 'NT-1099',
    verifiedBy: 'Sie Konsumsi Karang Taruna',
  },
  {
    id: 'tx-5',
    date: '15 Okt 2025',
    description: 'Token Listrik Pos Ronda & WiFi Sentral RT',
    category: 'Operasional',
    amount: 250000,
    type: 'keluar',
    receiptNo: 'PLN-998',
    verifiedBy: 'Sie Keamanan & Pos Ronda',
  },
  {
    id: 'tx-6',
    date: '10 Okt 2025',
    description: 'Iuran Warga Blok A (20 KK) via QRIS Portal',
    category: 'Iuran Rutin',
    amount: 2000000,
    type: 'masuk',
    receiptNo: 'QRIS-771',
    verifiedBy: 'Bendahara Agus Santoso',
  },
  {
    id: 'tx-7',
    date: '04 Okt 2025',
    description: 'Peremajaan Alat Pemadam Ringan (APAR) Balai Warga',
    category: 'Sarana & Keamanan',
    amount: 450000,
    type: 'keluar',
    receiptNo: 'APR-204',
    verifiedBy: 'Sie Keamanan RT 11',
  },
];

export const officersList: Officer[] = [
  {
    id: 'off-1',
    name: 'Bpk. H. Bambang Sutrisno',
    role: 'Ketua RT 11 (2024 - 2027)',
    phone: '0812-8877-1101',
    waLink: 'https://wa.me/6281288771101?text=Halo%20Pak%20RT%2011,%20saya%20warga%20ingin%20berkonsultasi',
    initials: 'BS',
    status: 'online',
    badgeColor: 'bg-primary-container/20 text-primary-container',
    bio: 'Mengabdi untuk kerukunan dan transparansi warga RT 11 dengan pendekatan pelayanan ramah dan cepat.',
  },
  {
    id: 'off-2',
    name: 'Ibu Ratna Dewi, S.Pd',
    role: 'Sekretaris RT 11',
    phone: '0813-2211-1102',
    waLink: 'https://wa.me/6281322111102?text=Halo%20Ibu%20Sekretaris%20RT%2011,%20saya%20ingin%20konfirmasi%20administrasi',
    initials: 'RD',
    status: 'online',
    badgeColor: 'bg-secondary-container/40 text-secondary',
    bio: 'Mengelola tata kelola persuratan, arsip sensus penduduk digital, dan verifikasi berkas permohonan surat.',
  },
  {
    id: 'off-3',
    name: 'Bpk. Agus Santoso',
    role: 'Bendahara Kas RT',
    phone: '0815-9988-1103',
    waLink: 'https://wa.me/6281599881103?text=Halo%20Pak%20Bendahara%20RT%2011,%20saya%20ingin%20konfirmasi%20iuran%20warga',
    initials: 'AS',
    status: 'online',
    badgeColor: 'bg-tertiary-container/20 text-tertiary',
    bio: 'Menjamin akuntabilitas dana paguyuban 100% cocok kuitansi dengan sistem pelaporan ledger terbuka.',
  },
  {
    id: 'off-4',
    name: 'Rian Maulana',
    role: 'Ketua Karang Taruna RT 11',
    phone: '0819-4455-1104',
    waLink: 'https://wa.me/6281944551104?text=Halo%20Mas%20Rian,%20saya%20ingin%20info%20kegiatan%20Karang%20Taruna',
    initials: 'RM',
    status: 'online',
    badgeColor: 'bg-primary-fixed/20 text-primary-fixed',
    bio: 'Menggerakkan pemuda dalam inovasi siber, pos ronda, kerja bakti, olahraga, dan pemberdayaan UMKM.',
  },
];

export const initialUmkmList: UmkmItem[] = [
  {
    id: 'umkm-1',
    name: 'Warung Sembako Barokah Bu Siti',
    category: 'harian',
    categoryLabel: 'Kebutuhan Harian',
    description:
      'Menyediakan kebutuhan pokok harian keluarga: beras organik Pandan Wangi, minyak goreng higienis, telur ayam negeri segar, gas LPG 3kg, dan aneka bumbu dapur.',
    address: 'Blok C No. 12',
    locationNotes: 'Buka 06.00 - 21.00 WIB',
    priceNote: 'Harga Tetangga Bersahabat',
    badge: 'Warga Terverifikasi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOIErrSlHPmEHtRv-Jc74_XehUPQwQ_dRz-ATDI_KWsAgI7ySePfVNiLftqhz8MwSpWC9fnAbzCIwcy1HglF3trj3ID0lSe4gWAa3GFeg-VhXrU_6JhhXDlE8U9_FDwulDX3tMbj3hbhIR-qML1EfzEnyC4s3by_-xj0LH4_3GSmyOzGxiCw2eDqfep6cXfRsyVb6O9x7vOROSqOY0S2wz2jxf1ldSGu8AXh0iNGsUhBxOE2Xwvw4D',
    imageAlt: 'Warung Sembako Barokah Bu Siti',
    phone: '6281288880001',
    waText: 'Halo Bu Siti Warung Barokah, saya warga RT 11 ingin pesan sembako',
  },
  {
    id: 'umkm-2',
    name: 'Keripik Tempe Gurih Mbak Rina',
    category: 'kuliner',
    categoryLabel: 'Kuliner & Snack',
    description:
      'Camilan renyah tanpa pengawet dengan resep bumbu daun jeruk warisan keluarga. Pilihan rasa: Original Ketumbar, Pedas Manis Balado, dan Keju Bakar Spesial.',
    address: 'Gang 3',
    locationNotes: 'Depan Pos Ronda B',
    priceNote: 'Rp 15.000 / bks',
    badge: 'Warga Terverifikasi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVu3qEElBdtOARNeJkBxKtF5qzeha6US5OT19UlAHAcdqjDA1l7IyOAzIRXYvE8noviX9IEni7UGUvK6_Coxe4oQrBIAM2ZxNGmnoE8yqGa7JJ6hmV3zmXDxT4fDS90MBBFHlBcbZuOqA8xCid_B24WcT3XE1yFYDQW-WdzkKfihzS_IAgSG-bXWKZ17q1SIHnBTP7c7GvFaR8NR-tMLhqv-zzbhNWlrcLG_iv1N1IrlrG6psvlMoM',
    imageAlt: 'Keripik Tempe Gurih Mbak Rina',
    phone: '6281288880002',
    waText: 'Halo Mbak Rina, saya warga RT 11 ingin order keripik tempe',
  },
  {
    id: 'umkm-3',
    name: 'Servis Elektronik & Pompa Mas Dedi',
    category: 'jasa',
    categoryLabel: 'Jasa & Bengkel',
    description:
      'Solusi cepat kerusakan peralatan rumah tangga: servis TV Smart/LED, mesin cuci mati total, perbaikan kipas angin, instalasi toren, dan ganti spul pompa air tanah.',
    address: 'Blok A No. 5',
    locationNotes: 'Siap Panggil ke Rumah',
    priceNote: 'Garansi 30 Hari',
    badge: 'Warga Terverifikasi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvljfN7y86MyRikQ9sP9L60q0jPpYw1AM4tMEhU0GIN87TKCDhIoDLy0boDQEKwKI-P_A_TPOuwzUffOPfIV3axrpdOyCy0r1en0l8KSZhHWnQnKYI5h--98Qc7WXMDkjUqi1Xgu1Q4-ywDi9fMfF52yfnd38wSGSAaF6FkGnBsEUmbhZKkrjh6F0qzB3vdq3BYFqFaiXsdMxQbGf8QzDjZ91SNzcUt71HicKAXiK7sLZlg6vDXaD5',
    imageAlt: 'Servis Elektronik Mas Dedi',
    phone: '6281288880003',
    waText: 'Halo Mas Dedi, saya warga RT 11 butuh bantuan servis elektronik',
  },
  {
    id: 'umkm-4',
    name: 'Dapur Mama Endang (Katering & Nasi Kotak)',
    category: 'kuliner',
    categoryLabel: 'Kuliner & Snack',
    description:
      'Katering harian keluarga, prasmanan hajatan, paket nasi kotak syukuran, tumpeng mini nusantara, dan aneka jajanan kue basah tradisional siap antar pagi.',
    address: 'Gang 1',
    locationNotes: 'Samping Masjid Baitul Muttaqin',
    priceNote: 'Pesan H-1 / Ready Harian',
    badge: 'Warga Terverifikasi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLWQp9ywe_IsbDHN8EGwJRc_kRpDUm_vElFAIaqeZVbXzYzUchcHz0A1WJb2zGkIvR6NBfy3CO9d1eukRlOFNwa7T6wdeP_rY1kSTo9-V6R98xWZamcHq_ccmdJP2hdWUx-bEbYq9IFPAj5bM_G22KmkYURXGIWi92Cwo4_cqgqMFAT0gvncOZneBIexc47aTtYi1I1e8AshgcxKZ_dpzFrbaBRTslq_ov-SCkcLlZuNyzY0sapsLN',
    imageAlt: 'Dapur Mama Endang',
    phone: '6281288880004',
    waText: 'Halo Mama Endang, saya warga RT 11 mau tanya menu katering',
  },
  {
    id: 'umkm-5',
    name: 'Jahit & Permak Pakaian Bu Ani',
    category: 'kerajinan',
    categoryLabel: 'Kerajinan Tangan',
    description:
      'Spesialis jahit kebaya wisuda & pesta, seragam sekolah anak, pasang kancing, potong/permak celana jeans ekspres, dan kreasi sarung bantal rajut tangan.',
    address: 'Gang 4',
    locationNotes: 'Rumah Warna Hijau No. 18',
    priceNote: 'Pengerjaan Bisa Ditunggu',
    badge: 'Warga Terverifikasi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDWiGbTc7Ie_jdjYfDIoaU_TQifKncUcL5V7vohvIFiFF9yUJ5CIqBE2cW02nbQmONIrjvrruLoOeQ8-eDx0SfQF1w41bNxdxI_1vElYlyLXcTBdnoDor7yq6yvFA2L1Kkr533sISm_o0N0U_PQ6uFpPf3B7v7BznedQ6cXFx0_YZBaTmuy4Y_vxP5IlsukMXuTmZpcOJQHC3llv35Gun844g3h5LyDI7f0iWN4f3zMseNASHVH_6SB',
    imageAlt: 'Jahit & Permak Pakaian Bu Ani',
    phone: '6281288880005',
    waText: 'Halo Bu Ani, saya warga RT 11 mau permak pakaian',
  },
  {
    id: 'umkm-6',
    name: 'Depot Isi Ulang Tirta Bersih Pak RT',
    category: 'harian',
    categoryLabel: 'Kebutuhan Harian',
    description:
      'Air minum galon higienis melalui 8 tingkat filtrasi mikro karbon dan sterilisasi Ozon UV. Layanan pesan antar gratis galon langsung sampai ke dapur warga RT 11.',
    address: 'Blok B No. 01',
    locationNotes: 'Balai RT 11',
    priceNote: 'Rp 6.000 / galon',
    badge: 'Warga Terverifikasi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1IswKMLgLO7Bjpu3NRw3erzb0-AgoZA8fWfd4DEDjeI4z8IOidwJzoHECV3nueaz4WzXrJ9KcqQnTImd5M3myG-65hIR5GRGqbfX3copriLeYvefWbAl9FwvGfukvuNH9wyKs6l-m_odbNOpuZmxUYVw2MCZW0bOxoO3_l47DziZlU80HmC9r7Ltjps_I9W10QfWYApxvfnIEySMxVKAAw--oTn_B-P9d3nOKGwmA_ZAyttyXKtIY',
    imageAlt: 'Depot Isi Ulang Tirta Bersih Pak RT',
    phone: '6281288880006',
    waText: 'Halo Pak RT, pesan antar galon Tirta Bersih ke rumah saya',
  },
];

export const initialGalleryList: GalleryItem[] = [
  {
    id: 'gal-vid-1',
    title: 'Aksi Bersih Selokan & Penghijauan Koridor Gang Bersahaja',
    album: 'kerja-bakti',
    albumLabel: 'Kerja Bakti',
    date: '12 Oktober 2025',
    participants: '58 Warga Berpartisipasi',
    description:
      'Pembersihan sedimen saluran air menyambut musim penghujan, pembagian pupuk organik hidroponik Karang Taruna, dan sarapan bersama bubur kacang ijo di teras Balai RT.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUWP1CKfaWHkfepJJPcQrAUiqWE5FlN6AP9sKrgoCuLpXpD4-d3v753dU-lTfAs-zQR8mtHoybsCyvRVt0O5BE9yPO9bIl10oe2DIyndPU5wFCJqfyp547WTjHaffGiZm-WXme_G5aBXebUEXOKT2l1BpR1it7aVJeKBgIiYWygD392t-o2u7mZjVB693l4OOttpLpXp1Xdojj7o8iY0Lg-dZzHOwGiIuFCmE6ysgDU1SKdqDNGAyL',
    imageAlt: 'Video Highlight Kerja Bakti',
    isVideo: true,
    videoDuration: '03:45 HD',
  },
  {
    id: 'gal-vid-2',
    title: 'Festival Tumpeng & Malam Apresiasi Karang Taruna',
    album: 'kemerdekaan',
    albumLabel: 'Peringatan Kemerdekaan',
    date: '17 Agustus 2025',
    participants: '120+ Warga',
    description:
      'Lomba tumpeng kreasi 4 gang binaan, pembagian piala anak cerdas berprestasi, dan pagelaran musik akustik remaja RT 11.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC24efW2U7b39jDTu32QrCW13zqSbedoHO35G_67JS9Mn4kCcCYftyXsw3dKwxzx2m8sHs7PHWMxH5sOfNgzkzx_1DfpmHrkdrwPOrrvVyc2uCq22BxDb8tzU83frxcwGhDApC9MYPK0LgMkLL0lQUXeMHvIWPwAjP5AwSWfON51wTJaCPqpTcUz66zlM5lQ_x95ocsnAwPrq_v-nFI9XpaJkp3zjOl6ETlXvoTET18e7RSONnZga9l',
    imageAlt: 'Video Highlight Peringatan Kemerdekaan',
    isVideo: true,
    videoDuration: '05:12 HD',
  },
  {
    id: 'gal-photo-1',
    title: 'Senam Jantung Sehat Bersama Lansia',
    album: 'senam',
    albumLabel: 'Senam & Olahraga',
    date: '05 Oktober 2025',
    participants: '42 Partisipan',
    description:
      'Instruktur profesional dipandu Bu RT, dilanjutkan cek tensi dan gula darah gratis bagi seluruh bapak dan ibu lansia.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSPFAz0Q-wHJk-0mZzvb0gLjrRi_xH-RBsRUvBCBxQwSUpKDkc0S-PCk2CTFCGlH9fc7xnc2LsjHeu7gNjO6jV94Kbc6MRcadOXsTgLIU3lFM5lo9kGbOQ6zXyBF6aXTdtVYCDTc8Hx46lc-4SUqBF6A0DLWgeQ9K0Ukb5aPEVZ5MfZ934tgVeUw_8MeX2M0Yg2JWhXANt6ZZL17bApjMJ30iHAxoc9XfBgdEX_oMX4lk5JV9dk4Fg',
    imageAlt: 'Senam Minggu Bugar RT 11',
  },
  {
    id: 'gal-photo-2',
    title: 'Penimbangan Balita & Vitamin A Posyandu Bougenville',
    album: 'posyandu',
    albumLabel: 'Posyandu Bougenville',
    date: '20 September 2025',
    participants: '35 Balita & Ibu',
    description:
      'Pemberian makanan tambahan (PMT) puding kacang hijau dan imunisasi terpadu balita oleh bidan desa dan kader posyandu.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUPApzDlR5cXpYhnJuWRM80Ia3OyURQUz-n7QLQYCR2Dux8sS3bm7mUIvbMQP5Oz0eZEoMvyUdY2LkrNDbPDPQSqgb_iykT76bdfROvCkecJM0W8qYR0_QlgSZ0SlbOsOkgJeqh60OdFkkXJa3yodMHJeEK-UTrYbo-r4w1cI6O13IYxMcX16aXTAiHApkMSwbCq26kFytvhY0W6sJF1hFbhYgyLG8_402WQc_UHXPxf_DODkwfcV1',
    imageAlt: 'Layanan Posyandu Bougenville',
  },
  {
    id: 'gal-photo-3',
    title: 'Pesta Rakyat Lomba Tradisional Anak 17-an',
    album: 'kemerdekaan',
    albumLabel: 'Peringatan Kemerdekaan',
    date: '16 Agustus 2025',
    participants: '64 Anak & Remaja',
    description:
      'Lomba makan kerupuk, balap karung helm mini, dan kuis wawasan kebangsaan ceria dipandu kakak-kakak Karang Taruna.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCaiNQhBS5XzHWeWmMxAKZhkwD3-6H5YVUjSMzLUsqxvj5s0iI5ZGLl5WMuu8pc4ApzNAOa8ofgAKvuqlgxh7gSUPMghk9h7giqhRh4oF7RU0uvB6t-p8rk5p1CNRmzOGm_H0oGduYOZpP_WMUDalt5-ojBknuZRsRfa47C95fg0JU9i2Sh1aWOm3wiYXxgCyxPWdhfyX-QL9SGapxoaEc9E3-fFfySRntiwPtDQ49CYmmmsyQNG-_n',
    imageAlt: 'Lomba 17 Agustus Anak Warga',
  },
  {
    id: 'gal-photo-4',
    title: 'Kreasi Mural Cyber-Kampung Gapura RT 11',
    album: 'kerja-bakti',
    albumLabel: 'Kerja Bakti',
    date: '28 September 2025',
    participants: '18 Pemuda Taruna',
    description:
      'Pengecatan artistik pos satkamling dan gerbang masuk berdesain futuristik ramah lingkungan menyatukan karya pemuda.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2MYX-hLdcqyXYBVVeyD9QQZAydthlhrjY0KQctmbTVNLCICN90gcVdM9rcBogRFx-nYrcQCUJjfXI-WRmzesxtb-2F248xwgBcy79Mv4y4l1oh54st5Bap9FzM0xhxwqGaogq70ZiRIZn3E060yPdzgwLGQ_NlXrnaY-CRW6Xkz0D2zHxyzvCJs4dqVZ1-29W55GEYDsHmc8k8X6Ytip_KeZHqzfx1DN5Mnm3zFwTAev1v987BtGX',
    imageAlt: 'Mural Gapura Karang Taruna',
  },
];

export const initialTickets: ComplaintTicket[] = [
  {
    id: 't-1',
    ticketNo: '#RT11-9839',
    reporterName: 'Warga Blok B',
    isAnonymous: false,
    phone: '0812-8899-001',
    block: 'Blok B (Gang 3 - 4)',
    houseNo: 'No. 08',
    category: 'Fasilitas Umum & Lampu PJU',
    urgency: 'Biasa',
    specificLocation: 'Gang 3 Depan Rumah No. 08',
    detail: 'Lampu PJU padam sejak 2 hari yang lalu sehingga lorong gelap saat malam.',
    status: 'selesai',
    timeAgo: '2 Jam Lalu',
    followUpNote:
      'Petugas PLN bersama sie pembangunan pengurus telah mengganti bohlam LED 40W dan menyalakan kembali jalur otomatis.',
  },
  {
    id: 't-2',
    ticketNo: '#RT11-9840',
    reporterName: 'Pak Hendro',
    isAnonymous: false,
    phone: '0813-7788-990',
    block: 'Blok B (Gang 3 - 4)',
    houseNo: 'No. 15',
    category: 'Saluran Air & Drainase',
    urgency: 'Cukup Mendesak',
    specificLocation: 'Saluran Utama Blok B No. 12-20',
    detail: 'Endapan lumpur di saluran got cukup tinggi menjelang puncak musim hujan.',
    status: 'dikerjakan',
    timeAgo: 'Kemarin',
    followUpNote:
      'Koordinasi kerja bakti telah ditetapkan pada Minggu pagi ini bersama warga Blok B dan perlengkapan dari gudang RT.',
  },
  {
    id: 't-3',
    ticketNo: '#RT11-9841',
    reporterName: 'Warga Gang 1',
    isAnonymous: true,
    phone: '0815-3344-556',
    block: 'Blok A (Gang 1 - 2)',
    houseNo: 'No. 04',
    category: 'Saran/Inovasi Program',
    urgency: 'Biasa',
    specificLocation: 'Perlintasan Masuk Portal Gang 1',
    detail: 'Banyak motor melintas kencang saat sore hari, mohon dipasang speed bump / polisi tidur karet.',
    status: 'tinjauan',
    timeAgo: '3 Hari Lalu',
    followUpNote:
      'Masuk agenda pembahasan rapat pengurus RT bulan depan terkait persetujuan tetangga kiri-kanan dan anggaran material semen.',
  },
];

export const initialNews: NewsAgenda[] = [
  {
    id: 'news-1',
    title: 'Kerja Bakti Akbar Bersih Saluran Air Musim Hujan',
    category: 'Aksi Lingkungan',
    categoryBadge: 'bg-primary-container text-on-primary-container',
    date: 'Minggu ini, 07:00 WIB',
    time: '07:00 - 10:30 WIB',
    location: 'Seluruh Lorong RT 11 (Kumpul di Balai RT)',
    summary:
      'Gotong royong massal membersihkan selokan, pemangkasan dahan pohon rimbun yang menyentuh kabel listrik, dan fogging mandiri.',
    fullContent:
      'Menyambut musim penghujan, pengurus RT 11 mengajak seluruh warga untuk bahu-membahu dalam agenda rutin Kerja Bakti Akbar. Diharapkan setiap kepala keluarga mengirimkan perwakilan. Panitia menyediakan sarapan bubur kacang ijo, kopi, teh, dan perlengkapan kantong sampah. Mari wujudkan lingkungan yang asri, bebas jentik nyamuk, dan terhindar dari genangan air.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3v6vXWTmRusQyB26OJzql5Nu4NC1spkN6GZ1YUeCTD49U1-jFJdQutO9VRouEBmW0iGp4tLOHOE5XixlcUHIWdEr0kxZiWTuIazBpWl7-bbw3AhmfQzeXlwx09wSOAkgJW5HZy64Rc0pN3taoZRQQi44P5d0o59tLJg0n3Ykeowgsy33-GT_qZ7b3kL_O5dbyJil95cgLVeg5Arj6z9NQ9pLnXVeivwDk7ebYHIrfvJZwB4YWqmqd',
    imageAlt: 'Kerja Bakti Warga RT 11',
  },
  {
    id: 'news-2',
    title: 'Posyandu Terpadu Bougenville: Imunisasi & Cek Lansia',
    category: 'Kesehatan Keluarga',
    categoryBadge: 'bg-tertiary-container text-on-tertiary-container',
    date: 'Rabu, 15:30 WIB',
    time: '15:30 - 17:30 WIB',
    location: 'Balai Posko RT 11',
    summary:
      'Pemberian vitamin A, timbang balita, pengukuran tinggi badan, cek tensi darah, dan pemeriksaan gula darah berkala gratis.',
    fullContent:
      'Kader Posyandu Bougenville bekerja sama dengan Puskesmas Pembantu Sukamaju kembali menyelenggarakan pos pelayanan terpadu bulanan. Tersedia vitamin A untuk balita usia 6-59 bulan, konsultasi gizi balita bersama bidan, serta cek asam urat dan kolesterol untuk bapak/ibu lansia dengan kuota 50 orang pertama.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADiZECtvC6PYOeoXv-O2S1Ip1EUNYyYQnbTUBr6soMx-_5E1YIcb_4OwQzYnASUVS8G5yeg2CrIwi2MlVb9q4FgyQP3s6KzACfqNJNs4kSLs5Fk8I9EycMk0l6AJZkyaY_HuELstVdfI27rjqOZV35WWDaOsKGGiMQc_Th9mj3YHZGchz4-A1-5bxQautRrSrrTVFMYQg06p7rfDN0zgxKaUkjKJD9XTGMc-kvJxYpyM7N8kDflTLd',
    imageAlt: 'Posyandu Warga RT 11',
  },
  {
    id: 'news-3',
    title: 'Sosialisasi QRIS Pembayaran Iuran & Validasi Barcode Surat',
    category: 'Inovasi Digital',
    categoryBadge: 'bg-secondary-container text-on-secondary-container',
    date: 'Sabtu Malam, 19:30 WIB',
    time: '19:30 - 21:00 WIB',
    location: 'Ruang Rapat Online & Balai RT',
    summary:
      'Peluncuran kemudahan bayar iuran bulanan warga secara nontunai melalui QRIS terintegrasi dengan pencatatan ledger kas otomatis.',
    fullContent:
      'Dalam rangka modernisasi layanan publik di tingkat rukun tetangga, tim IT Karang Taruna dan Bendahara RT 11 meresmikan sistem pembayaran QRIS Dinamis. Warga dapat membayar iuran kebersihan dan keamanan tanpa harus menitipkan uang tunai, dengan kuitansi otomatis langsung terbit ber-barcode kriptografis.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5IThJglH_W2eW30hsavxUe5XVR7LKSp_fxfpCIKURIAv-x15oFw4A-sdE8qmnA7yfCM-5SlZAuUwVH4HeEsOJPStwkOuxlHPriG907FbOhJ5HK1G95JLFcpBZSUSS6F0TGao6-iSdQNGiN9RT6Q9hXV4Bw06wxVphDvepqJ-OyofVh_I_-r7LnsFgBZVsf0eiOSYVWjfGSQ3c3Sn_68JHvfVpJ8o8LgeMjZbESU3Bor6Kf6PWAQ6d',
    imageAlt: 'Sosialisasi Inovasi Digital RT 11',
  },
];
