// Mobile menu
const menuToggle=document.getElementById("menu-toggle");
const navMenu=document.querySelector(".nav-menu");
menuToggle.addEventListener("click",()=>{navMenu.classList.toggle("mobile-active");menuToggle.setAttribute("aria-expanded",navMenu.classList.contains("mobile-active"));});
document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>{navMenu.classList.remove("mobile-active");menuToggle.setAttribute("aria-expanded","false");}));

// Mouse-following glow
const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";});

// 3D tilt cards
document.querySelectorAll(".tilt").forEach(el=>{
  el.addEventListener("pointermove",e=>{
    if(innerWidth<800)return;
    const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
    el.style.transform=`perspective(900px) rotateX(${(-y/r.height)*14}deg) rotateY(${(x/r.width)*14}deg) translateZ(10px)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="perspective(900px) rotateX(0) rotateY(0) translateZ(0)");
});

// 3D hero follows mouse
const hero=document.getElementById("hero-visual"),profile=document.querySelector(".profile-card-3d");
hero.addEventListener("pointermove",e=>{
  if(innerWidth<800)return;
  const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  profile.style.transform=`translate(-50%,-50%) rotateY(${x*24}deg) rotateX(${-y*20}deg)`;
});
hero.addEventListener("pointerleave",()=>profile.style.transform="translate(-50%,-50%) rotateY(-12deg) rotateX(7deg)");

// Magnetic buttons
document.querySelectorAll(".magnetic").forEach(btn=>{
  btn.addEventListener("pointermove",e=>{
    if(innerWidth<800)return;
    const r=btn.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
    btn.style.transform=`translate(${x*.16}px,${y*.16}px)`;
  });
  btn.addEventListener("pointerleave",()=>btn.style.transform="translate(0,0)");
});

// Scroll reveal
const observer=new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("active");obs.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// Active nav
const sections=document.querySelectorAll("section[id]");
window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(s=>{if(scrollY>=s.offsetTop-150)current=s.id;});
  document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});

// Contact form demo
document.getElementById("contact-form").addEventListener("submit",e=>{
  e.preventDefault();
  document.getElementById("form-message").textContent="Message ready — connect the form to your email/backend to receive submissions.";
  e.target.reset();
});

// Subtle scroll parallax
window.addEventListener("scroll",()=>{
  document.querySelectorAll(".cube").forEach((cube,i)=>cube.style.marginTop=(scrollY*.03*(i%2? -1:1))+"px");
});
