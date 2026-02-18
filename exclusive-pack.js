// =========================
// EXCLUSIVE PACK JS
// =========================

gsap.from("#logoText", { y: 50, opacity:0, duration:1.2, ease:"power3.out" });
gsap.from(".subtitle", { y: 40, opacity:0, duration:1.2, delay:0.2, ease:"power3.out" });

// =========================
// MODAL SETUP
// =========================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const caption = document.getElementById("caption");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
const galleryImages = Array.from(document.querySelectorAll(".scroll-container img"));

// باز کردن مدال با افکت سینمایی
function openModal(src, alt="") {
  modal.style.display = "flex";
  modalImg.src = src;
  caption.textContent = alt;
  currentIndex = galleryImages.findIndex(img => img.src.includes(src));

  // اضافه کردن افکت سینمایی قاب دور عکس
  modalImg.style.border = "3px solid rgba(255,106,0,0.6)";
  modalImg.style.boxShadow = "0 0 25px rgba(255,106,0,0.5), 0 0 50px rgba(255,106,0,0.25)";
}

// بستن مدال
function closeModal() {
  modal.style.display = "none";
}

// ناوبری تصاویر
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
  caption.textContent = galleryImages[currentIndex].alt;
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
  caption.textContent = galleryImages[currentIndex].alt;
};

// اضافه کردن کلیک روی تصاویر اسکرول برای باز کردن مدال
galleryImages.forEach(img => {
  img.addEventListener("click", () => openModal(img.src, img.alt));
});

// =========================
// OPTIONAL: SUBTLE FLOAT ANIMATION ON IMAGES
// =========================
galleryImages.forEach(img => {
  gsap.to(img, {
    y: 5,
    repeat: -1,
    yoyo: true,
    duration: 4,
    ease: "sine.inOut"
  });
});
