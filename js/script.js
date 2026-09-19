// ===============================
// CONTENIDO PERSONALIZABLE
// ===============================

const CONTENT = {
  pin: "210924",

  names: {
    her: "Papoi",
    from: "Chicharron",
    initials: "N ♥ L"
  },

  photos: {
    portada: "images/portada.jpg",
    carta: "images/carta.jpg",
    final: "images/final.jpg",
    historia1: "images/historia1.jpg",
    historia2: "images/historia2.jpg",
    historia3: "images/historia3.jpg",
    historia4: "images/historia4.jpg",
    tu1: "images/tu1.jpg",
    tu2: "images/tu2.jpg",
    tu3: "images/tu3.jpg",
    nosotros1: "images/nosotros1.jpg",
    nosotros2: "images/nosotros2.jpg",
    nosotros3: "images/nosotros3.jpg",
    nosotros4: "images/nosotros4.jpg"
  },

  history: [
    { date:"21 · 09 · 2024", title:"El comienzo", description:"Este día empezó nuestra historia y no tenia ni idea cuanto te amaria.", photo:"historia1" },
    { date:"RECUERDITO", title:"Un momento que recuerdo", description:"Nuestro primer viaje juntos y lo bien que la pasamos esos dias haciendo algo diferente.", photo:"historia2" },
    { date:"UN DÍA ESPECIAL", title:"Un dia que nunca olvidare", description:"Hoy hace 1 año cuando celebramos nuestro primer aniversarioy fue uno de los dias más felices que he tenido.", photo:"historia3" },
    { date:"HOY", title:"Y aquí seguimos", description:"2 años después de esas salidas nocturnas al parque seguimos chingandonos las vidas pero con mucho amor.", photo:"historia4" }
  ],

  thingsIAdore: [
    { title:"Tu forma de amar", text:"Porque aunque no seas la persona más afectiva logras demostrar ese amor de otras formas que me haces sentir muy amado.", photo:"tu1" },
    { title:"Cómo haces especiales los momentos simples", text:"No necesitamos que pase algo super top para volver cualquier momento memorable y lindo.", photo:"tu2" },
    { title:"La persona que eres", text:"Admiro todos esos pequeños detalles que hacen que seas tú, y que hacen que te quiera tanto.", photo:"tu3" }
  ],

  relationship: [
    { title:"Nuestro apoyo incondicional", text:"Amo saber que podemos estar el uno para el otro incluso cuando las cosas no salen exactamente como esperábamos." },
    { title:"Nuestra forma de divertirnos", text:"Las conversaciones, las risas y esos momentos que probablemente confundirian con retraso y que nadie más entendería (Somos increibles)." },
    { title:"Todo lo que hemos aprendido", text:"Cada experiencia nos ha enseñado algo y, de alguna manera, nos ha ayudado a crecer juntos como personas y pareja." }
  ],

  future: [
    { icon:"✈", title:"Viajes", text:"Poder visitar esos lugares de los que tanto hablamos que nos gustaria ir." },
    { icon:"⌂", title:"Lugares", text:"Descubrir nuevos lugares y sitios donde podamos crear momentos y recuerdos lindos." },
    { icon:"∞", title:"Metas", text:"Ver cómo cada uno persigue sus sueños mientras nos acompañamos y apoyamos." },
    { icon:"♡", title:"Experiencias", text:"Seguir diciendo que sí a todo lo que no hayamos experimentado." }
  ],

  letter: [
    "Papoi,",
    "Gracias por este año. Gracias por cada conversación, cada risa, cada abrazo y también por todos esos momentos pequeños que quizá pasaban desapercibidos, pero que para mí siempre significan muchísimo.",
    "Me gusta mirar atrás y ver cuántas cosas hemos vivido juntos. Ver como pasamos de salir ocasionalmente en las noches a estar todo el dia juntos",
    "Pero sinceramente lo que más me gusta es pensar en todo lo que nos falta por vivir.",
    "Ojalá sigamos construyendo nuestra historia con la misma ilusión, aprendiendo, creciendo y encontrando nuevas razones para seguir adelante juntos como compañeros de vida.",
    "Feliz aniversario. Gracias por formar parte de mi vida y por hacerme muy feliz en cada momento vivido."
  ],

  finalPhrase: "Y si pudiera volver al principio, nunca dudes que no volvería a elegirte.",
  finalThanks: "Gracias por este año, Lau."
};

// ===============================
// LÓGICA DE LA EXPERIENCIA
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  document.body.classList.add("locked");

  // Fotos
  $$("[data-photo]").forEach(img => {
    const key = img.dataset.photo;
    img.src = CONTENT.photos[key] || placeholder(key);
    img.onerror = () => { img.src = placeholder(key); };
  });

  // PIN
  const dots = $("#pin-dots");
  const keypad = $("#pin-keypad");
  const pinMessage = $("#pin-message");
  let entered = "";

  for(let i=0;i<6;i++){
    const dot = document.createElement("span");
    dots.appendChild(dot);
  }

  ["1","2","3","4","5","6","7","8","9","⌫","0"].forEach(value => {
    const btn = document.createElement("button");
    btn.className = "key" + (value === "⌫" ? " delete" : "");
    btn.textContent = value;
    btn.type = "button";
    btn.addEventListener("click", () => {
      if(value === "⌫") entered = entered.slice(0,-1);
      else if(entered.length < 6) entered += value;
      updateDots();
      if(entered.length === 6) checkPin();
    });
    keypad.appendChild(btn);
  });

  function updateDots(){
    [...dots.children].forEach((d,i) => d.classList.toggle("filled", i < entered.length));
  }

  function checkPin(){
    if(entered === CONTENT.pin){
      pinMessage.textContent = "Bienvenida a nuestra historia.";
      setTimeout(() => {
        $("#lock-screen").classList.add("unlocked");
        $("#site").classList.add("visible");
        $("#site").setAttribute("aria-hidden","false");
        document.body.classList.remove("locked");
        initExperience();
      }, 650);
    }else{
      pinMessage.textContent = "Ese no es el código. Inténtalo de nuevo ♡";
      keypad.classList.add("shake");
      setTimeout(()=>keypad.classList.remove("shake"),450);
      entered = "";
      updateDots();
    }
  }

  function initExperience(){
    renderHistory();
    renderQualities();
    renderCollage();
    renderRelationship();
    renderFuture();
    renderLetter();
    $("#final-phrase").textContent = CONTENT.finalPhrase;
    $("#final-thanks").textContent = CONTENT.finalThanks;
    $("#initials").textContent = CONTENT.names.initials;
    setupReveals();
    setupNav();
    createParticles();
  }

  function renderHistory(){
    $("#timeline").innerHTML = CONTENT.history.map(item => `
      <article class="timeline-item reveal">
        <span class="timeline-date">${item.date}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="timeline-photo photo-frame"><img src="${CONTENT.photos[item.photo]}" alt="${item.title}" onerror="this.src='${placeholder(item.photo)}'"></div>
      </article>
    `).join("");
  }

  function renderQualities(){
    $("#qualities").innerHTML = CONTENT.thingsIAdore.map((item,i) => `
      <article class="quality reveal">
        <div>
          ${item.photo ? `<div class="quality-photo"><img src="${CONTENT.photos[item.photo]}" alt="" onerror="this.src='${placeholder(item.photo)}'"></div>` : ""}
          <span class="quality-number">0${i+1}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      </article>
    `).join("");
  }

  function renderCollage(){
    const keys = ["nosotros1","nosotros2","nosotros3","nosotros4"];
    $("#collage").innerHTML = keys.map((key,i) => `
      <div class="collage-item reveal"><img src="${CONTENT.photos[key]}" alt="Recuerdo de nosotros" onerror="this.src='${placeholder(key)}'"></div>
    `).join("");
  }

  function renderRelationship(){
    $("#relationship-cards").innerHTML = CONTENT.relationship.map(item => `
      <article class="relationship-card reveal">
        <h3>${item.title}</h3><p>${item.text}</p>
      </article>
    `).join("");
  }

  function renderFuture(){
    $("#future-grid").innerHTML = CONTENT.future.map(item => `
      <article class="future-card reveal">
        <div class="future-icon">${item.icon}</div>
        <h3>${item.title}</h3><p>${item.text}</p>
      </article>
    `).join("");
  }

  function renderLetter(){
    $("#letter-text").innerHTML = CONTENT.letter.map(p => `<p>${p}</p>`).join("");
    $("#signature").textContent = CONTENT.names.from;
  }

  function setupReveals(){
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    $$(".reveal").forEach(el => observer.observe(el));
  }

  function setupNav(){
    const sections = [
      ["intro","01 — Introducción"],["historia","02 — Historia"],["tu","03 — Tú"],
      ["nosotros","04 — Nosotros"],["futuro","05 — Futuro"],["gracias","06 — Gracias"]
    ];
    $("#chapter-nav").innerHTML = sections.map(([id,label]) => `<a href="#${id}" data-section="${id}">${label}</a>`).join("");
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          $$("#chapter-nav a").forEach(a => a.classList.toggle("active",a.dataset.section===entry.target.id));
        }
      });
    }, {threshold:.35});
    sections.forEach(([id]) => navObserver.observe($("#"+id)));
  }

  function createParticles(){
    const box = $("#particles");
    for(let i=0;i<18;i++){
      const p=document.createElement("span");
      p.className="particle";
      p.style.left=(Math.random()*100)+"%";
      p.style.top=(Math.random()*100)+"%";
      p.style.animationDelay=(Math.random()*5)+"s";
      box.appendChild(p);
    }
  }

  function placeholder(label){
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
      <rect width="900" height="1200" fill="#e8e0d6"/>
      <circle cx="450" cy="500" r="170" fill="#d6c8bd"/>
      <text x="450" y="760" text-anchor="middle" font-family="Georgia" font-size="40" fill="#6d2635">${label}</text>
      <text x="450" y="815" text-anchor="middle" font-family="Arial" font-size="18" fill="#776f68">reemplaza esta foto</text>
    </svg>`;
    return "data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(svg);
  }

  // Música: solamente después de interacción
  $("#music-btn").addEventListener("click", async () => {
    const audio = $("#background-audio");
    if(audio.paused){
      try { await audio.play(); $("#music-btn").textContent="Ⅱ Música"; }
      catch { $("#music-btn").textContent="Añade tu canción"; }
    }else{
      audio.pause(); $("#music-btn").textContent="♫ Música";
    }
  });
});
