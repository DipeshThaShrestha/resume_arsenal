const $ = (selector, parent=document) => parent.querySelector(selector);
const $$ = (selector, parent=document) => [...parent.querySelectorAll(selector)];

window.addEventListener('load', () => {
  const preloader = $('#preloader');
  setTimeout(() => { preloader.style.opacity = '0'; preloader.style.visibility = 'hidden'; }, 420);
});

const nav = $('#nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 70), { passive:true });

const menuBtn = $('#menuBtn'); const navLinks = $('#navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
$$('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const kitToggle = $('#kitToggle');
kitToggle.addEventListener('click', () => {
  document.body.classList.toggle('away-kit');
  const away = document.body.classList.contains('away-kit');
  $('span', kitToggle).textContent = away ? 'AWAY KIT' : 'HOME KIT';
  localStorage.setItem('dipeshKit', away ? 'away' : 'home');
});
if(localStorage.getItem('dipeshKit') === 'away') kitToggle.click();

const revealTargets = $$('.section-label,.statement-main,.statement-copy,.section-head,.pitch,.skill-panel,.lab-top,.dash-card,.fixture,.tunnel-top,.tunnel-path article,.trophy,.contact-inner');
revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }}), {threshold:.12,rootMargin:'0px 0px -25px 0px'});
revealTargets.forEach(el => observer.observe(el));

const players = $$('.player'); const pitch = $('#pitch');
players.forEach(player => player.addEventListener('click', () => {
  players.forEach(p => p.classList.remove('active'));
  player.classList.add('active');
  $('#skillName').textContent = player.dataset.skill.toUpperCase();
  $('#skillRating').textContent = player.dataset.rating;
  $('#ratingFill').style.width = `${player.dataset.rating}%`;
  $('#skillCopy').textContent = player.dataset.copy;
  pitch.animate([{filter:'brightness(1)'},{filter:'brightness(1.25)'},{filter:'brightness(1)'}],{duration:520,easing:'ease-out'});
}));

const chartData = {
  goals: {label:'Goals',data:[9,12,11,16,14,18],color:'#c8102e'},
  wins: {label:'Wins',data:[3,4,4,5,4,6],color:'#b98511'},
  xg: {label:'Expected Goals',data:[8.4,10.6,10.1,13.3,12.8,15.4],color:'#1d7963'}
};
let performanceChart;
function drawChart(mode='goals'){
  const d=chartData[mode];
  if(performanceChart) performanceChart.destroy();
  performanceChart = new Chart($('#performanceChart'),{type:'line',data:{labels:['AUG','SEP','OCT','NOV','DEC','JAN'],datasets:[{label:d.label,data:d.data,borderColor:d.color,backgroundColor:d.color+'22',fill:true,tension:.36,borderWidth:3,pointBackgroundColor:'#f7f3ec',pointBorderColor:d.color,pointBorderWidth:3,pointRadius:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{displayMode:'index',intersect:false,backgroundColor:'#151515',titleFont:{family:'DM Mono'},bodyFont:{family:'Manrope'}}},scales:{x:{grid:{display:false},ticks:{font:{family:'DM Mono',size:9},color:'#706862'}},y:{beginAtZero:true,grid:{color:'#ded5cb'},border:{display:false},ticks:{font:{family:'DM Mono',size:9},color:'#706862'}}}}});
}
drawChart(); $('#chartMode').addEventListener('change', e=>drawChart(e.target.value));

function animateNumber(el){const target=Number(el.dataset.count);const decimal=el.dataset.decimal==='true';const start=performance.now();const duration=1100;function tick(now){const value=Math.min(1,(now-start)/duration);const ease=1-Math.pow(1-value,3);el.textContent=decimal?(target*ease).toFixed(1):Math.round(target*ease);if(value<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)}
const metrics=$$('.metric b');
const metricObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){metrics.forEach(animateNumber);metricObserver.disconnect()}}),{threshold:.4});
metricObserver.observe($('.key-stats'));

const projectData={
  investing:{kicker:'WEB EXPERIENCE / 01',title:'INVESTING UNIVERSITY',copy:'A learning-focused web experience designed to make investing knowledge easier to explore for people beginning their financial journey. The project translates a broad topic into practical sections, explainers, and calculator-style learning tools.',metrics:[['ROLE','Web design & development'],['FOCUS','Financial education'],['STACK','HTML, CSS, JavaScript'],['OUTCOME','Clearer learning journey']],link:'https://dipeshthashrestha.github.io/investinguniversity/index.html'},
  baghchal:{kicker:'AI / GAME DEVELOPMENT / 02',title:'BAGHCHAL 2.0 WITH AI',copy:'A browser-based reimagining of the traditional Nepali strategy game Baghchal. The project blends cultural storytelling, game logic, and AI gameplay into an approachable interactive experience.',metrics:[['ROLE','Developer'],['FOCUS','AI game interaction'],['STACK','HTML, CSS, JavaScript'],['OUTCOME','Playful strategy experience']],link:'https://dipeshthashrestha.github.io/baghchal-two-with-ai/'},
  cars:{kicker:'MACHINE LEARNING / 03',title:'USED CAR PRICE PREDICTION',copy:'An end-to-end data science project using real vehicle listings to study price patterns and build predictive models. The work centers on cleaning inputs, feature thinking, model comparison, and turning output into useful insights.',metrics:[['ROLE','Data analyst & ML builder'],['FOCUS','Regression & price prediction'],['STACK','Python, Pandas, Scikit-learn'],['OUTCOME','End-to-end ML workflow']],link:'https://github.com/dipeshthashrestha1'},
  ucl:{kicker:'DATA ANALYTICS / 04',title:'UEFA CHAMPIONS LEAGUE ANALYSIS',copy:'A football data analysis project that turns competition statistics into visual stories. It explores performance indicators, patterns across teams, and how dashboards can make complex sports data easier to read.',metrics:[['ROLE','Data analyst'],['FOCUS','Sports data storytelling'],['STACK','Python, Tableau / visualization'],['OUTCOME','Football insights dashboard']],link:'https://github.com/dipeshthashrestha1'}
};
const certData={
 google:{kicker:'TROPHY CABINET',title:'GOOGLE DATA ANALYTICS',copy:'Professional certificate focused on the foundations of data cleaning, analysis, visualization, structured problem solving, and communicating insights for business decisions.',metrics:[['ISSUER','Google'],['FOCUS','Data analytics'],['SKILLS','Spreadsheets, SQL, visualization'],['TYPE','Professional certificate']]},
 claude:{kicker:'TROPHY CABINET',title:'CLAUDE CODE 101',copy:'An introductory AI development achievement covering practical work with Claude Code and AI-assisted software workflows.',metrics:[['ISSUER','Anthropic'],['FOCUS','AI development'],['SKILLS','Prompting, coding workflows'],['TYPE','Course certificate']]},
 who:{kicker:'TROPHY CABINET',title:'ETHICS & GOVERNANCE OF AI',copy:'A course focused on the responsible use of artificial intelligence, including governance, ethical considerations, and the role of AI in real-world systems.',metrics:[['ISSUER','World Health Organization'],['FOCUS','Responsible AI'],['SKILLS','Governance, ethics, risk'],['TYPE','Course certificate']]}
};
const modal=$('#detailModal'); const content=$('#modalContent');
function openDetail(item, isProject){
  const action = isProject && item.link ? `<a href="${item.link}" target="_blank" rel="noreferrer">OPEN LIVE PROJECT ↗</a>` : '';
  content.innerHTML=`<p class="modal-kicker">${item.kicker}</p><h2>${item.title}</h2><div class="modal-grid"><div><p>${item.copy}</p><div class="modal-actions">${action}<a href="#contact" onclick="document.getElementById('detailModal').close()">LET'S CONNECT →</a></div></div><div class="modal-metrics">${item.metrics.map(m=>`<div><span>${m[0]}</span><b>${m[1]}</b></div>`).join('')}</div></div>`;
  modal.showModal();
}
$$('.project-trigger').forEach(btn=>btn.addEventListener('click',()=>openDetail(projectData[btn.dataset.project],true)));
$$('.trophy').forEach(btn=>btn.addEventListener('click',()=>openDetail(certData[btn.dataset.cert],false)));
$('#modalClose').addEventListener('click',()=>modal.close()); modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});

const soundToggle=$('#soundToggle'); let ambience; let soundOn=false;
function startAmbience(){ const ctx=new (window.AudioContext||window.webkitAudioContext)(); const gain=ctx.createGain(); gain.gain.value=.018; gain.connect(ctx.destination); const oscillator=ctx.createOscillator(); oscillator.type='sawtooth'; oscillator.frequency.value=68; const filter=ctx.createBiquadFilter(); filter.type='lowpass'; filter.frequency.value=380; oscillator.connect(filter);filter.connect(gain); oscillator.start(); ambience={ctx,oscillator,gain}; }
function stopAmbience(){ ambience?.oscillator.stop(); ambience?.ctx.close(); ambience=null; }
soundToggle.addEventListener('click',()=>{soundOn=!soundOn;if(soundOn){startAmbience();soundToggle.classList.add('on');soundToggle.setAttribute('aria-pressed','true');$('small',soundToggle).textContent='ON'}else{stopAmbience();soundToggle.classList.remove('on');soundToggle.setAttribute('aria-pressed','false');$('small',soundToggle).textContent='OFF'}});


// Static contact form: prepares a pre-filled email without exposing a third-party form endpoint.
const contactForm = $('#contactForm');
if (contactForm) {
  const formStatus = $('#formStatus');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = $('#contactName').value.trim();
    const email = $('#contactEmail').value.trim();
    const topic = $('#contactTopic').value;
    const message = $('#contactMessage').value.trim();
    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formStatus.textContent = 'Please add your name, a valid email, and a message.';
      formStatus.className = 'error';
      return;
    }
    const subject = encodeURIComponent(`[Portfolio] ${topic} — ${name}`);
    const body = encodeURIComponent(`Hi Dipesh,\n\n${message}\n\nName: ${name}\nEmail: ${email}\nTopic: ${topic}`);
    formStatus.textContent = 'Opening your email app…';
    formStatus.className = 'success';
    window.location.href = `mailto:dipeshthashrestha1@gmail.com?subject=${subject}&body=${body}`;
  });
}
