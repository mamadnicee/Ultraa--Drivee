gsap.registerPlugin(ScrollTrigger);

gsap.from("#logoText", { y: 150, opacity: 0, duration: 1.5, ease: "power4.out" });
gsap.from(".subtitle", { y: 80, opacity: 0, duration: 1.5, delay: 0.3, ease: "power4.out" });

gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: "top 85%" },
    y: 100, opacity: 0, delay: i*0.2, duration: 1.2, ease: "power3.out"
  });
});

gsap.to(".hero", { y: 10, repeat: -1, yoyo: true, ease: "sine.inOut", duration:4 });

/* =========================
   AUTO CONNECT TO WALLPAPERS
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const containers = document.querySelectorAll(".scroll-container");

  containers.forEach(container => {

    const images = Array.from(container.querySelectorAll("img"));

    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        openExclusive(images.map(i => i.src), index);
      });
    });

  });

});

function openExclusive(images, startIndex = 0) {

  const modal = document.createElement("div");
  modal.className = "exclusive-modal";

  const track = document.createElement("div");
  track.className = "exclusive-track";

  const closeBtn = document.createElement("div");
  closeBtn.className = "exclusive-close";
  closeBtn.innerHTML = "×";

  modal.appendChild(track);
  modal.appendChild(closeBtn);
  document.body.appendChild(modal);

  images.forEach(src => {
    const card = document.createElement("div");
    card.className = "exclusive-card";
    const img = document.createElement("img");
    img.src = src;
    card.appendChild(img);
    track.appendChild(card);
  });

  let current = startIndex;
  const cards = track.querySelectorAll(".exclusive-card");

  function update() {
    cards.forEach((c,i)=>{
      c.classList.remove("active");
      if(i === current) c.classList.add("active");
    });

    const cardWidth = cards[0].offsetWidth + 60;
    track.style.transform = `translateX(${-current * cardWidth}px)`;
  }

  update();

  modal.addEventListener("wheel", e=>{
    if(e.deltaY > 0 && current < images.length-1) current++;
    if(e.deltaY < 0 && current > 0) current--;
    update();
  });

  closeBtn.onclick = ()=> modal.remove();
}
