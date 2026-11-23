(function(){
  "use strict";

  var STORAGE_KEY = "selfevopi-lang";
  var THEME_KEY = "selfevopi-theme";
  var lang = window.__selfevopiLang === "pt" ? "pt" : "en";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;

  var tableLabels = {
    en: { "Surface":"Surface", "Model relation":"Model relation", "Memory":"Memory", "Tools":"Tools", "Evolution":"Evolution", "Sandbox":"Sandbox", "Metric":"Metric", "Value":"Value", "Command":"Command", "Date":"Date" },
    pt: { "Surface":"Superfície", "Model relation":"Relação com o modelo", "Memory":"Memória", "Tools":"Ferramentas", "Evolution":"Evolução", "Sandbox":"Sandbox", "Metric":"Métrica", "Value":"Valor", "Command":"Comando", "Date":"Data" }
  };

  function currentTheme(){
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function syncThemeButton(){
    var btn = document.getElementById("themeButton");
    if(!btn){ return; }
    var next = currentTheme() === "light" ? "dark" : "light";
    var en = "Switch to " + next + " theme";
    var pt = "Mudar para o tema " + (next === "dark" ? "escuro" : "claro");
    btn.setAttribute("data-en-aria", en);
    btn.setAttribute("data-pt-aria", pt);
    btn.setAttribute("aria-label", root.lang === "pt" ? pt : en);
    btn.setAttribute("aria-pressed", currentTheme() === "light" ? "true" : "false");
  }

  function applyLang(next){
    lang = next === "pt" ? "pt" : "en";
    root.lang = lang;
    var nodes = document.querySelectorAll("[data-en],[data-pt]");
    var i, el, value, tag;
    for(i = 0; i < nodes.length; i++){
      el = nodes[i];
      value = el.getAttribute("data-" + lang);
      if(value === null){ continue; }
      tag = el.tagName.toLowerCase();
      if(tag === "meta"){ el.setAttribute("content", value); }
      else if(tag === "title" && el.namespaceURI === "http://www.w3.org/1999/xhtml"){ document.title = value; }
      else { el.textContent = value; }
    }
    var labelled = document.querySelectorAll("[data-en-aria],[data-pt-aria]");
    for(i = 0; i < labelled.length; i++){
      value = labelled[i].getAttribute("data-" + lang + "-aria");
      if(value !== null){ labelled[i].setAttribute("aria-label", value); }
    }
    var cells = document.querySelectorAll("[data-label]");
    for(i = 0; i < cells.length; i++){
      if(!cells[i].getAttribute("data-label-en")){ cells[i].setAttribute("data-label-en", cells[i].getAttribute("data-label")); }
      var key = cells[i].getAttribute("data-label-en");
      cells[i].setAttribute("data-label", tableLabels[lang][key] || key);
    }
    syncThemeButton();
    try{ localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
  }
  applyLang(lang);

  var langButton = document.getElementById("langButton");
  if(langButton){
    langButton.addEventListener("click", function(){
      applyLang(root.lang === "en" ? "pt" : "en");
    });
  }

  var themeButton = document.getElementById("themeButton");
  function setTheme(theme){
    theme = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", theme);
    try{ localStorage.setItem(THEME_KEY, theme); }catch(e){}
    syncThemeButton();
    if(reduceMotion){ paintDustStatic(); }
  }
  if(themeButton){
    themeButton.addEventListener("click", function(){
      setTheme(currentTheme() === "light" ? "dark" : "light");
    });
  }

  var menuButton = document.getElementById("menuButton");
  var navLinks = document.getElementById("navLinks");
  function closeMenu(){
    if(!navLinks || !menuButton){ return; }
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
  if(menuButton && navLinks){
    menuButton.addEventListener("click", function(){
      var open = navLinks.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function(e){ if(e.target && e.target.tagName === "A"){ closeMenu(); } });
    document.addEventListener("keydown", function(e){ if(e.key === "Escape"){ closeMenu(); } });
    window.addEventListener("resize", function(){ if(window.innerWidth > 760){ closeMenu(); } });
  }

  var steps = Array.prototype.slice.call(document.querySelectorAll(".track-step"));
  steps.forEach(function(button){
    button.addEventListener("click", function(){
      steps.forEach(function(other){ other.classList.remove("is-active"); other.setAttribute("aria-pressed", "false"); });
      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");
    });
  });

  var dialog = document.getElementById("downloadDialog");
  var dialogTriggers = Array.prototype.slice.call(document.querySelectorAll("[data-download-open]"));
  var closeButton = document.getElementById("closeDialog");
  var lastTrigger = null;
  if(dialog && closeButton && dialogTriggers.length){
    dialogTriggers.forEach(function(trigger){
      trigger.addEventListener("click", function(){
        lastTrigger = trigger;
        if(typeof dialog.showModal === "function"){ dialog.showModal(); }
        else { dialog.setAttribute("open", ""); }
        closeButton.focus();
      });
    });
    closeButton.addEventListener("click", function(){
      if(typeof dialog.close === "function"){ dialog.close(); } else { dialog.removeAttribute("open"); lastTrigger && lastTrigger.focus(); }
    });
    dialog.addEventListener("close", function(){ if(lastTrigger && lastTrigger.focus){ lastTrigger.focus(); } });
    dialog.addEventListener("click", function(e){ if(e.target === dialog){ if(typeof dialog.close === "function"){ dialog.close(); } } });
  }

  var loader = document.getElementById("loader");
  var loaderFill = document.getElementById("loaderFill");
  var images = Array.prototype.slice.call(document.images);
  var total = Math.max(images.length, 1);
  var loaded = 0;
  var counted = [];
  function bump(img){
    if(counted.indexOf(img) !== -1){ return; }
    counted.push(img);
    loaded++;
    if(loaderFill){ loaderFill.style.width = Math.round(loaded / total * 100) + "%"; }
  }
  images.forEach(function(img){
    if(img.complete){ bump(img); }
    else { img.addEventListener("load", function(){ bump(img); }); img.addEventListener("error", function(){ bump(img); }); }
  });
  var started = Date.now();
  function finishLoader(){
    loaded = total;
    if(loaderFill){ loaderFill.style.width = "100%"; }
    setTimeout(function(){
      if(loader){ loader.classList.add("is-hidden"); }
      document.body.classList.remove("is-loading");
    }, Math.max(0, 520 - (Date.now() - started)) + 260);
  }
  if(document.readyState === "complete"){ finishLoader(); }
  else { window.addEventListener("load", finishLoader); }
  setTimeout(finishLoader, 4000);

  if(!reduceMotion && "IntersectionObserver" in window){
    root.classList.add("motion-ready");
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add("in-view"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function(node){ observer.observe(node); });
  }

  var toTop = document.getElementById("toTopButton");
  if(toTop){
    toTop.addEventListener("click", function(){
      if(reduceMotion){
        window.scrollTo(0, 0);
        return;
      }
      try{ window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }
      catch(e){ window.scrollTo(0, 0); }
    });
  }

  var scrollQueued = false;
  function handleScroll(){
    scrollQueued = false;
    var y = window.pageYOffset || root.scrollTop || 0;
    var h = window.innerHeight || 1;
    var intro = Math.min(1, Math.max(0, y / h));
    var max = Math.max(1, document.documentElement.scrollHeight - h);
    var evo = Math.min(1, Math.max(0, y / max));
    if(y >= max - 8){ evo = 1; }
    root.style.setProperty("--intro", intro.toFixed(3));
    root.style.setProperty("--evo", evo.toFixed(3));
    if(toTop){ toTop.classList.toggle("is-visible", y > 600); }
  }
  window.addEventListener("scroll", function(){
    if(!scrollQueued){ scrollQueued = true; window.requestAnimationFrame(handleScroll); }
  }, { passive: true });

  var spyPairs = [];
  Array.prototype.forEach.call(document.querySelectorAll(".nav-links a[href^='#']"), function(link){
    var id = (link.getAttribute("href") || "").slice(1);
    var section = id ? document.getElementById(id) : null;
    if(section){ spyPairs.push({ link: link, section: section }); }
  });
  function setActiveLink(id){
    for(var i = 0; i < spyPairs.length; i++){
      if(id && spyPairs[i].section.id === id){ spyPairs[i].link.setAttribute("aria-current", "page"); }
      else { spyPairs[i].link.removeAttribute("aria-current"); }
    }
  }
  if("IntersectionObserver" in window && spyPairs.length){
    var vh = window.innerHeight || 800;
    var visible = {};
    var spyObserver = new IntersectionObserver(function(entries){
      for(var i = 0; i < entries.length; i++){
        if(entries[i].isIntersecting){ visible[entries[i].target.id] = true; }
        else { delete visible[entries[i].target.id]; }
      }
      var bestId = null, bestTop = Infinity, id, el, top;
      for(id in visible){
        if(!Object.prototype.hasOwnProperty.call(visible, id)){ continue; }
        el = document.getElementById(id);
        if(!el){ continue; }
        top = el.getBoundingClientRect().top;
        if(top < bestTop){ bestTop = top; bestId = id; }
      }
      setActiveLink(bestId);
    }, { rootMargin: "-" + Math.round(vh * 0.35) + "px 0px -" + Math.round(vh * 0.5) + "px 0px", threshold: 0 });
    spyPairs.forEach(function(pair){ spyObserver.observe(pair.section); });
  }

  var mouse = { x:-9999, y:-9999 };
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var canvas = document.getElementById("dustCanvas");
  var ctx = canvas ? canvas.getContext("2d") : null;
  var particles = [];

  function makeParticle(x, y){
    return { x:x, y:y, vx:(Math.random()-0.5)*0.16, vy:(Math.random()-0.5)*0.16, r:0.6+Math.random()*1.0, a:0.10+Math.random()*0.18 };
  }
  function seedDust(){
    if(!ctx){ return; }
    var count = Math.min(200, Math.floor(window.innerWidth * window.innerHeight / 7200));
    particles = [];
    for(var i = 0; i < count; i++){ particles.push(makeParticle(Math.random()*window.innerWidth, Math.random()*window.innerHeight)); }
  }
  function resizeCanvas(){
    if(!canvas){ return; }
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  seedDust();
  window.addEventListener("resize", function(){ resizeCanvas(); seedDust(); });

  function dustStyle(){
    var light = currentTheme() === "light";
    return { ink: light ? "0,0,0" : "255,255,255", dim: light ? 0.55 : 1 };
  }

  function paintDust(){
    if(!ctx){ return; }
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    var w = window.innerWidth, h = window.innerHeight;
    var evo = parseFloat(root.style.getPropertyValue("--evo")) || 0;
    var gain = 0.7 + evo * 0.9;
    var style = dustStyle();
    for(var i = 0; i < particles.length; i++){
      var p = particles[i];
      var dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx*dx + dy*dy;
      if(d2 < 22500 && d2 > 1){
        var d = Math.sqrt(d2), f = (22500 - d2) / 22500 * 0.08;
        p.vx += dx / d * f; p.vy += dy / d * f;
      }
      p.x += p.vx; p.y += p.vy; p.vx *= 0.985; p.vy *= 0.99;
      if(p.x < -10){ p.x = w + 10; } if(p.x > w + 10){ p.x = -10; }
      if(p.y < -10){ p.y = h + 10; } if(p.y > h + 10){ p.y = -10; }
      ctx.fillStyle = "rgba(" + style.ink + "," + Math.min(0.5, p.a * gain * style.dim).toFixed(3) + ")";
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    }
    window.requestAnimationFrame(paintDust);
  }

  function paintDustStatic(){
    if(!ctx){ return; }
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    var style = dustStyle();
    for(var i = 0; i < particles.length; i++){
      var p = particles[i];
      ctx.fillStyle = "rgba(" + style.ink + "," + Math.min(0.5, p.a * style.dim).toFixed(3) + ")";
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    }
  }

  if(ctx){ if(reduceMotion){ paintDustStatic(); } else { window.requestAnimationFrame(paintDust); } }

  var ring = document.getElementById("cursorRing");
  var rx = -100, ry = -100, tx = -100, ty = -100, ringActive = false;
  window.addEventListener("mousemove", function(e){
    mouse.x = e.clientX; mouse.y = e.clientY; tx = e.clientX; ty = e.clientY;
    if(ring && !reduceMotion){
      if(!ringActive){ ring.classList.add("is-visible"); ringActive = true; rx = tx; ry = ty; }
      rx += (tx - rx) * 0.22; ry += (ty - ry) * 0.22;
      ring.style.transform = "translate3d(" + (rx-11).toFixed(1) + "px," + (ry-11).toFixed(1) + "px,0)";
      var hit = e.target && e.target.closest && e.target.closest("a,button,.tier,.track-step,tbody tr,.limit-column li,.harness-note");
      ring.classList.toggle("is-hover", !!hit);
    }
  }, { passive: true });
  document.addEventListener("mouseleave", function(){ if(ring){ ring.classList.remove("is-visible"); } ringActive = false; });

  if("serviceWorker" in navigator){
    window.addEventListener("load", function(){
      navigator.serviceWorker.register("sw.js").catch(function(){});
    });
  }

  handleScroll();
})();