gsap.registerPlugin(ScrollTrigger);

// Hero Animations
gsap.from(".hero #logoText", { y: 50, opacity: 0, duration: 1.5, ease: "power4.out" });
gsap.from(".subtitle", { y: 80, opacity: 0, duration: 1.5, delay: 0.3, ease: "power4.out" });

// Gallery Cards
gsap.utils.toArray(".card").forEach((card,i)=>{
  gsap.from(card,{
    scrollTrigger:{ trigger: card, start: "top 85%" },
    y: 100, opacity:0, delay:i*0.2, duration:1.2, ease:"power3.out"
  });
  VanillaTilt.init(card,{ max:12, speed:500, glare:true,"max-glare":0.35, scale:1.05 });
});

// Hero subtle float
gsap.to(".hero", { y:10, repeat:-1, yoyo:true, ease:"sine.inOut", duration:4 });

// Custom cursor
if(!('ontouchstart' in window)){
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);
  document.addEventListener("mousemove", e=>{
    gsap.to(cursor, { x:e.clientX, y:e.clientY, duration:0.1, ease:"power1.out" });
  });
}

// =========================
// Modal Exclusive + 4K
// =========================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
let currentIndex = 0;
const galleryImages = Array.from(document.querySelectorAll(".scroll-container img"));

function openModal(src){
  modal.style.display = "flex";
  modalImg.src = src;
  currentIndex = galleryImages.findIndex(img=>img.src.includes(src));
  // Slight scale-in effect
  modalImg.style.transform = "scale(0.95)";
  setTimeout(()=>{ modalImg.style.transform="scale(1)"; },10);
}

function closeModal(){ modal.style.display = "none"; }

document.getElementById("prevBtn").onclick = ()=>{
  currentIndex=(currentIndex-1+galleryImages.length)%galleryImages.length;
  modalImg.src=galleryImages[currentIndex].src;
  modalImg.style.transform="scale(0.95)";
  setTimeout(()=>{ modalImg.style.transform="scale(1)"; },10);
}

document.getElementById("nextBtn").onclick = ()=>{
  currentIndex=(currentIndex+1)%galleryImages.length;
  modalImg.src=galleryImages[currentIndex].src;
  modalImg.style.transform="scale(0.95)";
  setTimeout(()=>{ modalImg.style.transform="scale(1)"; },10);
}
