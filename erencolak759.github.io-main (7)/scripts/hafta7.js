// ===================================
// Hafta 7 - Bootstrap + JavaScript
// Etkinlik Kayıt Sayfası Etkileşimleri
// ===================================

// --- DOM Elementleri ---
const themeToggle = document.getElementById("themeToggle");
const themeToggleHero = document.getElementById("themeToggleHero");
const registrationForm = document.getElementById("registrationForm");
const formSection = document.getElementById("formSection");
const resultSection = document.getElementById("resultSection");
const resultContent = document.getElementById("resultContent");
const resultPlaceholder = document.getElementById("resultPlaceholder");
const alertContainer = document.getElementById("alertContainer");
const scrollToFormBtn = document.getElementById("scrollToForm");
const resetBtn = document.getElementById("resetBtn");

// Form alanları
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const sinifInput = document.getElementById("sinif");
const sinifSelect = document.getElementById("sinifSelect");
const oturumSelect = document.getElementById("oturum");
const katilimTuruSelect = document.getElementById("katilimTuru");
const kisaMesajInput = document.getElementById("kisaMesaj");
const kvkkCheckbox = document.getElementById("kvkkCheckbox");

// ===================================
// 1. TEMA DEĞİŞTİRME
// ===================================

// Sayfa yüklenirken kayıtlı temayı uygula
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("h7theme") || "light";
  applyTheme(savedTheme);
});

// Navbar tema butonu
themeToggle.addEventListener("click", () => {
  const current = document.body.getAttribute("data-bs-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("h7theme", next);
});

// Hero tema butonu
themeToggleHero.addEventListener("click", () => {
  const current = document.body.getAttribute("data-bs-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("h7theme", next);
});

function applyTheme(theme) {
  document.body.setAttribute("data-bs-theme", theme);
  const isDark = theme === "dark";

  // Navbar butonunu güncelle
  themeToggle.textContent = isDark ? "☀️ Açık Tema" : "🌙 Koyu Tema";
  themeToggle.title = isDark ? "Açık Temaya Geç" : "Koyu Temaya Geç";

  // Hero butonunu güncelle
  themeToggleHero.textContent = isDark ? "☀️ Açık Temaya Geç" : "🌙 Koyu Temaya Geç";
}

// ===================================
// 2. SCROLL TO FORM
// ===================================

scrollToFormBtn.addEventListener("click", () => {
  formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => {
    fullNameInput.focus();
  }, 600);
});

// ===================================
// 3. KART DETAY BUTONLARI
// ===================================

const card1Btn = document.getElementById("card1Btn");
const card2Btn = document.getElementById("card2Btn");
const card3Btn = document.getElementById("card3Btn");

if (card1Btn) {
  card1Btn.addEventListener("click", () => {
    alert("Responsive Tasarım: Bootstrap'in container, row ve col sınıfları kullanılarak farklı ekran boyutlarına uyumlu grid yapısı kurulur.");
  });
}
if (card2Btn) {
  card2Btn.addEventListener("click", () => {
    alert("Form Yapıları: Bootstrap form-control, form-select, textarea ve form-check bileşenleri kullanılarak şık ve kullanışlı formlar oluşturulur.");
  });
}
if (card3Btn) {
  card3Btn.addEventListener("click", () => {
    alert("JavaScript Etkileşimi: Form submit eventi yakalanır, event.preventDefault() ile yenileme engellenir, alanlar kontrol edilir ve özet dinamik üretilir.");
  });
}

// ===================================
// 4. FORM DOĞRULAMA VE GÖNDERME
// ===================================

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Hata alanını temizle
  alertContainer.innerHTML = "";
  const errors = [];

  // 1. Ad Soyad
  if (fullNameInput.value.trim() === "") {
    errors.push("Ad Soyad alanı boş bırakılamaz.");
  } else if (fullNameInput.value.trim().length < 3) {
    errors.push("Ad Soyad en az 3 karakter olmalıdır.");
  }

  // 2. E-posta
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    errors.push("E-posta alanı boş bırakılamaz.");
  } else if (!emailPattern.test(emailInput.value.trim())) {
    errors.push("Lütfen geçerli bir e-posta adresi giriniz.");
  }

  // 3. Sınıf (text)
  if (sinifInput.value.trim() === "") {
    errors.push("Sınıf alanı boş bırakılamaz.");
  }

  // 4. Sınıf Seçimi
  if (sinifSelect.value === "") {
    errors.push("Lütfen sınıf seçiniz.");
  }

  // 5. Oturum
  if (oturumSelect.value === "") {
    errors.push("Lütfen katılmak istediğiniz oturumu seçiniz.");
  }

  // 6. Katılım Türü
  if (katilimTuruSelect.value === "") {
    errors.push("Lütfen katılım türü seçiniz.");
  }

  // 7. KVKK Onayı
  if (!kvkkCheckbox.checked) {
    errors.push("Bilgilerin kullanımına onay vermeniz gerekmektedir.");
  }

  // Hata varsa göster
  if (errors.length > 0) {
    let html = '<div class="alert alert-danger alert-dismissible fade show rounded-3" role="alert">';
    html += "<strong>❌ Lütfen aşağıdaki hataları düzeltin:</strong><ul class='mb-0 mt-2'>";
    errors.forEach((err) => {
      html += `<li>${err}</li>`;
    });
    html += "</ul>";
    html += '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Kapat"></button>';
    html += "</div>";
    alertContainer.innerHTML = html;
    alertContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }

  // Başarılı → özet oluştur
  createSummary();
});

// ===================================
// 5. BAŞVURU ÖZETİ OLUŞTURMA
// ===================================

function createSummary() {
  const sinifLabels = {
    "1": "1. Sınıf",
    "2": "2. Sınıf",
    "3": "3. Sınıf",
    "4": "4. Sınıf",
  };

  const oturumLabels = {
    "bootstrap-js": "Bootstrap + JS Projesi",
    "css-tasarim": "CSS Tasarım Atölyesi",
    "github-pages": "GitHub Pages Kurulumu",
    "form-yapilari": "Form Yapıları",
  };

  const katilimLabels = {
    "yüzyüze": "Yüz Yüze",
    "online": "Online",
    "hibrit": "Hibrit",
  };

  const summaryHTML = `
    <div class="card border-0 shadow rounded-4">
      <div class="card-body p-4">
        <h5 class="fw-bold mb-4">✅ Başvuru Özeti</h5>
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <p class="mb-1 text-muted small">Ad Soyad</p>
            <p class="fw-semibold">${escapeHtml(fullNameInput.value.trim())}</p>
          </div>
          <div class="col-md-6">
            <p class="mb-1 text-muted small">E-posta</p>
            <p class="fw-semibold">${escapeHtml(emailInput.value.trim())}</p>
          </div>
          <div class="col-md-6">
            <p class="mb-1 text-muted small">Sınıf</p>
            <p class="fw-semibold">${escapeHtml(sinifInput.value.trim())}</p>
          </div>
          <div class="col-md-6">
            <p class="mb-1 text-muted small">Sınıf Seçimi</p>
            <p class="fw-semibold">${sinifLabels[sinifSelect.value] || sinifSelect.value}</p>
          </div>
          <div class="col-md-6">
            <p class="mb-1 text-muted small">Katılmak İstediği Oturum</p>
            <p class="fw-semibold">${oturumLabels[oturumSelect.value] || oturumSelect.value}</p>
          </div>
          <div class="col-md-6">
            <p class="mb-1 text-muted small">Katılım Türü</p>
            <p class="fw-semibold">${katilimLabels[katilimTuruSelect.value] || katilimTuruSelect.value}</p>
          </div>
          ${
            kisaMesajInput.value.trim() !== ""
              ? `<div class="col-12">
                  <p class="mb-1 text-muted small">Kısa Mesaj</p>
                  <p class="fw-semibold">${escapeHtml(kisaMesajInput.value.trim())}</p>
                </div>`
              : ""
          }
        </div>
        <hr />
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-primary btn-sm rounded-3" id="newRegistration">Yeni Başvuru</button>
        </div>
      </div>
    </div>
  `;

  // Sonuç alanını güncelle
  resultContent.innerHTML = summaryHTML;
  resultPlaceholder.classList.add("d-none");
  resultContent.classList.remove("d-none");

  // Sonuca scroll et
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });

  // Yeni Başvuru butonu
  document.getElementById("newRegistration").addEventListener("click", () => {
    registrationForm.reset();
    alertContainer.innerHTML = "";
    resultContent.classList.add("d-none");
    resultPlaceholder.classList.remove("d-none");
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => fullNameInput.focus(), 600);
  });
}

// ===================================
// 6. FORMU TEMİZLE BUTONU
// ===================================

resetBtn.addEventListener("click", () => {
  registrationForm.reset();
  alertContainer.innerHTML = "";
});

// ===================================
// 7. YARDIMCI FONKSİYONLAR
// ===================================

// XSS koruması için HTML escape
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

console.log("✅ Hafta 7 JavaScript dosyası başarıyla yüklendi!");
