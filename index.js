const express = require('express');
const app = express();
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const pino = require('pino');
app.use(express.json());

const PIC = 'https://files.catbox.moe/y5dtyc.jpg';
const COUNT_FILE = path.join(__dirname, 'counts.json');
const AUTH_BASE = path.join(__dirname, 'live_auth');
if(!fs.existsSync(AUTH_BASE)) fs.mkdirSync(AUTH_BASE,{recursive:true});

function getCounts(){ try{ if(!fs.existsSync(COUNT_FILE)) return {s1:2,s2:1,s3:5}; return JSON.parse(fs.readFileSync(COUNT_FILE,'utf8')); }catch{return {s1:2,s2:1,s3:5}} }
function saveCounts(c){ try{fs.writeFileSync(COUNT_FILE, JSON.stringify(c));}catch{} }
function incCount(id){ const c=getCounts(); const key='s'+id; if(c[key]>=50) return {full:true,counts:c}; c[key]=(c[key]||0)+1; saveCounts(c); return {full:false,counts:c}; }

async function startLiveBot(authDir){
  try{
    const {state, saveCreds} = await useMultiFileAuthState(authDir);
    const sock = makeWASocket({auth:state, logger:pino({level:'silent'}), browser:Browsers.ubuntu('Chrome')});
    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', async (u)=>{
      if(u.connection==='open') console.log('LIVE BOT CONNECTED: '+authDir);
    });
    sock.ev.on('messages.upsert', async ({messages})=>{
      const m = messages[0]; if(!m.message || m.key.fromMe) return;
      const from = m.key.remoteJid;
      const text = (m.message.conversation || m.message.extendedTextMessage?.text || '').trim();
      if(!text.startsWith('.')) return;
      const cmd = text.slice(1).split(' ')[0].toLowerCase();
      if(cmd==='menu'){
        await sock.sendMessage(from, {image:{url:PIC}, caption:`*╭━〘 COOLGUY MD V10 〙━⊷*\n*┃* 🔥 Professor Coolguy - Arsenal Edition\n*┃* ⚡ Live Public Bot - NO DEPLOY NEEDED!\n*╰━━━━━━━━━━━━━━━⊷*\n\n*MAIN*\n.menu, .ping, .alive, .owner, .bot\n\n*© 2026 COOLGUY MD V10 LIVE*`}, {quoted:m});
      }
      if(cmd==='ping') await sock.sendMessage(from, {text:`*PONG!* ⚡ Coolguy V10 Live!`});
      if(cmd==='alive') await sock.sendMessage(from, {image:{url:PIC}, caption:`*COOLGUY V10 IS ALIVE!* 🔥`});
      if(cmd==='owner') await sock.sendMessage(from, {text:`*OWNER:* Professor Coolguy\n📍 Uganda`});
    });
  }catch(e){console.log('Live bot err', e.message)}
}
fs.readdirSync(AUTH_BASE).forEach(dir=>{ const full=path.join(AUTH_BASE,dir); if(fs.statSync(full).isDirectory()) startLiveBot(full); });

const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>COOLGUY MD V10 - V29.1 LIVE</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#070a12;color:#e8ecf1;font-family:sans-serif;padding:16px}
.card{background:#151c28;border:2px solid #00ff88;border-radius:24px;overflow:hidden;margin-bottom:14px}
.banner{width:100%;height:380px;object-fit:cover;display:block}.profile-box{padding:16px;display:flex;gap:14px;align-items:center}
.profile-box img{width:80px;height:80px;border-radius:50%;border:3px solid #00ff88}.title{font-size:22px;font-weight:900}.title span{color:#ff3b3b}
.mode-select{display:flex;gap:10px;margin:14px}.mode-btn{flex:1;border:2px solid #1e2d42;background:#0a0e16;border-radius:14px;padding:14px;text-align:center;cursor:pointer}
.mode-btn.active{border-color:#00ff88;background:#0a1a14}.nodes{background:#101722;border-radius:16px;padding:12px;margin:14px}
.node{border:2px solid #1e2d42;background:#0a0e16;border-radius:14px;padding:14px;text-align:center;margin-bottom:10px;cursor:pointer}
.node.active{border-color:#00ff88;background:#0a1a14}.node.full{border-color:#ff4444;background:#1a0a0a;opacity:0.6}
.mainframe{border-left:4px solid #00ff88;background:#101a14;border-radius:0 14px 14px 0;padding:16px;margin-bottom:14px}
.label{margin:18px 0 10px 4px;font-weight:700}.input-wrap{background:#101722;border:1px solid #1e2d42;border-radius:14px;padding:14px 16px;display:flex;gap:10px}
.input-wrap input{background:transparent;border:none;outline:none;color:#fff;width:100%;font-size:17px}
.generate{width:100%;margin-top:18px;background:#00ff88;border:none;padding:17px;border-radius:14px;font-weight:900;font-size:16px;color:#000;cursor:pointer}
.generate.live{background:#ffcc00}.code-box{margin-top:14px;border:2px dashed #00ff88;background:#0a1210;border-radius:14px;padding:20px;text-align:center;color:#00ff88;font-weight:800;font-size:16px;min-height:60px;display:flex;justify-content:center;align-items:center;word-break:break-all;cursor:pointer;flex-direction:column}
.status{text-align:center;margin-top:10px;font-size:13px;font-weight:700}.footer{text-align:center;color:#3a455c;font-size:11px;margin:30px 0 10px}
</style></head><body>
<div class="card"><img class="banner" src="${PIC}"><div class="profile-box"><img src="${PIC}"><div><div class="title"><span>P</span>ROFESSOR COOLGUY MD V10</div><div style="color:#8b98b0;font-size:13px">V29.1 LIVE HYBRID FIXED - PUBLIC + PRIVATE<br>Arsenal Edition</div></div></div>
<div class="nodes">
<div style="color:#8b98b0;font-size:13px;margin-bottom:10px">CHOOSE MODE</div>
<div class="mode-select">
<div class="mode-btn active" id="modeLive" onclick="setMode('live')">🤖 LIVE BOT<br><span style="font-size:11px;color:#8b98b0">No deploy - .menu instant</span></div>
<div class="mode-btn" id="modeSession" onclick="setMode('session')">🔑 SESSION ID<br><span style="font-size:11px;color:#8b98b0">Private deploy</span></div>
</div>
<div style="display:flex;justify-content:space-between;color:#8b98b0;font-size:13px;margin:10px 0"><span>Available Nodes - REAL COUNT</span></div>
<div class="node active" id="n1" onclick="sel(1)"><b>SERVER 01</b><div id="s1">Loading...</div></div>
<div class="node" id="n2" onclick="sel(2)"><b>SERVER 02</b><div id="s2">Loading...</div></div>
<div class="node" id="n3" onclick="sel(3)"><b>SERVER 03</b><div id="s3">Loading...</div></div>
</div></div>
<div class="mainframe"><b>🛡️ V29.1 FIXED</b><div id="mainMsg">Live: .menu instant | Session: After link wait 30s for Coolguy~</div></div>
<div class="label">WhatsApp Number</div><div class="input-wrap">📞 <input id="num" placeholder="256781539746"></div>
<button class="generate live" id="genBtn" onclick="getCode()">🤖 Generate LIVE BOT Pair Code</button>
<div class="code-box" id="result" onclick="copyCode()">Your code / session will appear here</div>
<div class="status" id="status"></div>
<div class="footer">© 2026 COOLGUY MD V10 | V29.1 FIXED | PROFESSOR COOLGUY</div>
<script>
let selected=1; let counts={s1:0,s2:0,s3:0}; let mode='live';
function setMode(m){ mode=m; document.querySelectorAll('.mode-btn').forEach(e=>e.classList.remove('active')); document.getElementById(m==='live'?'modeLive':'modeSession').classList.add('active'); const btn=document.getElementById('genBtn'); if(m==='live'){btn.innerText='🤖 Generate LIVE BOT Pair Code';btn.className='generate live';} else{btn.innerText='🔑 Generate Pair Code + Get SESSION ID';btn.className='generate';} }
async function loadCounts(){try{const r=await fetch('/counts');counts=await r.json();updateUI();}catch{}}
function updateUI(){ for(let i=1;i<=3;i++){ const c=counts['s'+i]||0; const el=document.getElementById('s'+i); const node=document.getElementById('n'+i); if(c>=50){el.innerText='❌ FULL 50/50';node.classList.add('full');} else{el.innerText=(i===selected?'✓ SELECTED - ':'')+'ONLINE · '+c+'/50';node.classList.remove('full');} } document.getElementById('mainMsg').innerText='Real: S1 '+counts.s1+'/50 | S2 '+counts.s2+'/50 | S3 '+counts.s3+'/50 - Mode: '+mode.toUpperCase(); }
function sel(n){ const c=counts['s'+n]||0; if(c>=50){document.getElementById('status').innerHTML='<span style="color:#ff4444">❌ FULL!</span>';return;} selected=n; document.querySelectorAll('.node').forEach(e=>e.classList.remove('active')); document.getElementById('n'+n).classList.add('active'); updateUI(); }
function copyCode(){ const el=document.getElementById('result'); let t=el.innerText.trim(); if(t.includes('Your code')||t.length<6) return; const firstLine=t.split('\\n')[0]; navigator.clipboard.writeText(firstLine).then(()=>{document.getElementById('status').innerHTML='<span style="color:#00ff88">✅ Copied!</span>';}); }
async function getCode(){
  const num=document.getElementById('num').value.trim(); const b=document.getElementById('result'); const st=document.getElementById('status');
  if(!num||num.length<10){alert('Enter number 256...');return;}
  const cur=counts['s'+selected]||0; if(cur>=50){st.innerHTML='<span style="color:#ff4444">❌ FULL!</span>';return;}
  b.innerHTML='Connecting to SERVER 0'+selected+' ('+mode+')... wait 20 sec'; st.innerHTML='<span style="color:#ffcc00">⏳ Connecting...</span>';
  try{
    const r=await fetch('/pair?number='+encodeURIComponent(num)+'&server='+selected+'&mode='+mode);
    const d=await r.json();
    if(d.code){
      if(mode==='live'){
        b.innerHTML=d.code+'<br><span style="font-size:13px;color:#ffcc00">✅ LIVE BOT! Link now → Type .menu → Works!</span>';
        st.innerHTML='<span style="color:#00ff88">✅ LIVE CODE READY!</span>';
      }else{
        b.innerHTML=d.code+'<br><span style="font-size:13px;color:#ffcc00">✅ Step1: Link this code in WhatsApp!</span><br><span style="font-size:12px;color:#8b98b0">Step2: After linking, wait 20 sec then click button below to get SESSION ID</span><br><br><button onclick="fetchSession(\\''+num+'\\')" style="background:#00ff88;color:#000;border:none;padding:10px 18px;border-radius:10px;font-weight:900">🔑 GET SESSION ID NOW</button>';
        st.innerHTML='<span style="color:#ffcc00">⏳ Link code in WhatsApp first, then tap GET SESSION ID!</span>';
      }
      counts=d.counts||counts; updateUI();
    }else{ b.innerText='Error: '+(d.error||'Failed'); st.innerHTML='<span style="color:#ff4444">❌ '+(d.error||'Failed')+'</span>'; }
  }catch(e){b.innerText='Network error';}
}
async function fetchSession(num){
  const b=document.getElementById('result'); const st=document.getElementById('status');
  b.innerHTML='⏳ Generating Session ID... wait 10 sec...'; st.innerHTML='<span style="color:#ffcc00">⏳ Fetching Coolguy~ session...</span>';
  try{ const r=await fetch('/getsession?number='+encodeURIComponent(num)); const d=await r.json(); if(d.session){ b.innerHTML=d.session+'<br><span style="font-size:11px;color:#8b98b0">Copy → Paste to Render ENV SESSION_ID in COOLGUY-MD.V10 repo</span>'; st.innerHTML='<span style="color:#00ff88">✅ SESSION READY! Copy it!</span>'; } else { b.innerText=d.error||'Not ready yet, link first then wait 10 sec and try again'; st.innerHTML='<span style="color:#ff4444">❌ '+(d.error||'Not linked yet')+'</span>'; } }catch(e){b.innerText='Network error fetching session';}
}
loadCounts();
</script></body></html>`;

app.get('/',(req,res)=>{res.set('Cache-Control','no-store');res.send(html);});
app.get('/counts',(req,res)=>{res.json(getCounts());});

// Store active sockets for session generation
const activeSessions = {};

app.get('/pair',async(req,res)=>{
  let num=req.query.number; let serv=parseInt(req.query.server)||1; let mode=req.query.mode||'live';
  if(!num) return res.json({error:'Number required'}); num=num.replace(/[^0-9]/g,'');
  let check=incCount(serv);
  if(check.full){return res.json({error:'Server FULL 50/50', full:true, counts:check.counts});}
  const baseDir = path.join(AUTH_BASE, 'auth_'+num);
  if(!fs.existsSync(baseDir)) fs.mkdirSync(baseDir,{recursive:true});
  try{
    const {state,saveCreds}=await useMultiFileAuthState(baseDir);
    const sock=makeWASocket({auth:state,printQRInTerminal:false,logger:pino({level:'silent'}),browser:Browsers.ubuntu('Chrome')});
    sock.ev.on('creds.update',saveCreds);
    activeSessions[num]= {sock, dir: baseDir};
    await delay(2000);
    let code=await sock.requestPairingCode(num); code=code?.match(/.{1,4}/g)?.join('-')||code;
    if(mode==='live'){
      await delay(1000);
      startLiveBot(baseDir);
    }
    res.json({code, counts:getCounts()});
  }catch(e){
    const c=getCounts(); c['s'+serv]=Math.max(0,(c['s'+serv]||1)-1); saveCounts(c);
    res.json({error:e.message, counts:c});
  }
});

app.get('/getsession', async (req,res)=>{
  let num=req.query.number; if(!num) return res.json({error:'Number required'}); num=num.replace(/[^0-9]/g,'');
  const baseDir = path.join(AUTH_BASE, 'auth_'+num);
  const credsPath = path.join(baseDir,'creds.json');
  if(!fs.existsSync(credsPath)){ return res.json({error:'Not linked yet! First link pair code in WhatsApp, wait 10 sec, then try again'}); }
  try{
    const data = fs.readFileSync(credsPath,'utf8');
    const b64 = Buffer.from(data).toString('base64');
    const session = 'Coolguy~'+b64;
    res.json({session});
  }catch(e){ res.json({error:e.message}); }
});

const PORT=process.env.PORT||3000;app.listen(PORT,()=>console.log('V29.1 LIVE HYBRID FIXED ONLINE'));
