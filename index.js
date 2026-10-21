const express = require('express');
const app = express();
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const pino = require('pino');
app.use(express.json());

const PIC = 'https://files.catbox.moe/y5dtyc.jpg';
const COUNT_FILE = path.join(__dirname, 'counts.json');

// --- REAL COUNTER LOGIC ---
function getCounts(){
  try{
    if(!fs.existsSync(COUNT_FILE)) return {s1:2, s2:1, s3:5};
    return JSON.parse(fs.readFileSync(COUNT_FILE,'utf8'));
  }catch{return {s1:2,s2:1,s3:5}}
}
function saveCounts(c){
  try{fs.writeFileSync(COUNT_FILE, JSON.stringify(c));}catch{}
}
function incCount(serverId){
  const c=getCounts();
  const key='s'+serverId;
  if(c[key]>=50) return {full:true, counts:c};
  c[key]=(c[key]||0)+1;
  saveCounts(c);
  return {full:false, counts:c};
}

const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>COOLGUY MD V10 - Official WhatsApp Bot Pairing Site | Arsenal Edition</title>
<meta name="description" content="COOLGUY MD V10 Official Pairing Site - Get WhatsApp Bot Pair Code Instant. Professor Coolguy Arsenal Edition. Fast, Secure, 24/7 Nodes.">
<meta name="keywords" content="Coolguy MD V10, Coolguy bot, WhatsApp bot pairing, Coolguy pairing site, Professor Coolguy, WhatsApp MD bot Uganda">
<meta property="og:image" content="${PIC}">
<meta property="og:title" content="COOLGUY MD V10 - Official Pairing Site">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{background:#070a12;color:#e8ecf1;font-family:sans-serif;padding:16px}
.card{background:#151c28;border:2px solid #00ff88;border-radius:24px;padding:0;overflow:hidden;margin-bottom:14px}
.banner{width:100%;height:380px;object-fit:cover;object-position:center top;display:block;background:#0a0e16}
.profile-box{padding:16px;display:flex;gap:14px;align-items:center;background:#151c28}
.profile-box img{width:80px;height:80px;border-radius:50%;border:3px solid #00ff88;object-fit:cover;object-position:center top;background:#0a0e16}
.title{font-size:22px;font-weight:900}.title span{color:#ff3b3b}
.nodes{background:#101722;border-radius:16px;padding:12px;margin:14px}
.node{border:2px solid #1e2d42;background:#0a0e16;border-radius:14px;padding:14px;text-align:center;margin-bottom:10px;cursor:pointer;transition:0.3s}
.node.active{border-color:#00ff88;background:#0a1a14;box-shadow:0 0 15px rgba(0,255,136,0.4);transform:scale(1.02)}
.node.full{border-color:#ff4444;background:#1a0a0a;opacity:0.6;cursor:not-allowed}
.node b{font-size:13px}.node div{color:#00ff88;font-size:12px;margin-top:4px}
.node.full div{color:#ff4444}
.mainframe{border-left:4px solid #00ff88;background:#101a14;border-radius:0 14px 14px 0;padding:16px;margin-bottom:14px}
.vip{background:#1a160e;border:1px solid #3d3414;border-radius:16px;padding:16px;margin-bottom:18px}.vip-badge{background:#ffcc00;color:#000;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:900}
.label{margin:18px 0 10px 4px;font-weight:700}.input-wrap{background:#101722;border:1px solid #1e2d42;border-radius:14px;padding:14px 16px;display:flex;gap:10px}.input-wrap input{background:transparent;border:none;outline:none;color:#fff;width:100%;font-size:17px}
.generate{width:100%;margin-top:18px;background:#00ff88;border:none;padding:17px;border-radius:14px;font-weight:900;font-size:16px;color:#000;cursor:pointer}
.code-box{margin-top:14px;border:2px dashed #00ff88;background:#0a1210;border-radius:14px;padding:20px;text-align:center;color:#00ff88;font-weight:800;font-size:20px;min-height:60px;display:flex;justify-content:center;align-items:center;word-break:break-all;cursor:pointer}
.status{text-align:center;margin-top:10px;font-size:13px;font-weight:700}.footer{text-align:center;color:#3a455c;font-size:11px;margin:30px 0 10px}
</style></head><body>
<div class="card"><img class="banner" src="${PIC}?v=28" onerror="this.src='${PIC}'"><div class="profile-box"><img src="${PIC}" onerror="this.src='${PIC}'"><div><div class="title"><span>P</span>ROFESSOR COOLGUY MD V10</div><div style="color:#8b98b0;font-size:13px">V28 REAL COUNTER - LIVE USERS<br>Arsenal Edition - Google Indexed</div></div></div>
<div class="nodes"><div style="display:flex;justify-content:space-between;color:#8b98b0;font-size:13px;margin-bottom:10px"><span>Available Nodes - TAP TO SELECT - REAL COUNT</span><span>✕</span></div>
<div class="node active" id="n1" onclick="sel(1)"><b>COOLGUY SERVER 01 ★ NEW</b><div id="s1">Loading...</div></div>
<div class="node" id="n2" onclick="sel(2)"><b>COOLGUY SERVER 02 ★ ARSENAL</b><div id="s2">Loading...</div></div>
<div class="node" id="n3" onclick="sel(3)"><b>COOLGUY SERVER 03 ★ GHOST</b><div id="s3">Loading...</div></div>
</div></div>
<div class="mainframe"><b>🛡️ System Mainframe Node - V28 LIVE</b><div id="mainMsg">Real counter active! Shows real users connected!</div></div>
<div class="vip"><span class="vip-badge">VIP</span><b style="color:#ffcc00;display:block;margin-top:10px">VIP Access Zone - REAL COUNT LIVE</b><div style="color:#8b98b0;font-size:13px;margin-top:4px">Each pair code = +1 user. 50/50 = FULL auto block!</div></div>
<div class="label">WhatsApp Number</div><div class="input-wrap">📞 <input id="num" placeholder="256781539746"></div>
<button class="generate" onclick="getCode()">🔑 Generate Pair Code</button>
<div class="code-box" id="result" onclick="copyCode()">Your pairing code will appear here</div>
<div class="status" id="status"></div>
<div class="footer">© 2026 COOLGUY MD V10 | V28 REAL COUNTER | PROFESSOR COOLGUY<br>Google SEO Ready - Indexed</div>
<script>
let selected=1;
let counts={s1:0,s2:0,s3:0};
async function loadCounts(){
  try{
    const r=await fetch('/counts'); const d=await r.json(); counts=d;
    updateUI();
  }catch{}
}
function updateUI(){
  for(let i=1;i<=3;i++){
    const c=counts['s'+i]||0;
    const el=document.getElementById('s'+i);
    const node=document.getElementById('n'+i);
    if(c>=50){
      el.innerText='❌ FULL - 50/50 - SELECT OTHER';
      node.classList.add('full');
      if(selected===i) el.innerText='❌ THIS SERVER FULL! Select other';
    }else{
      el.innerText=(i===selected?'✓ SELECTED - ONLINE · ':'ONLINE · ')+c+'/50'+(i===2?' - YOUR PIC':'');
      node.classList.remove('full');
    }
  }
  document.getElementById('mainMsg').innerText='Real Users: S1 '+counts.s1+'/50 | S2 '+counts.s2+'/50 | S3 '+counts.s3+'/50 - Selected Server 0'+selected;
}
function sel(n){
  const c=counts['s'+n]||0;
  if(c>=50){
    document.getElementById('status').innerHTML='<span style="color:#ff4444">❌ Server 0'+n+' is FULL (50/50)! Tap other server!</span>';
    return;
  }
  selected=n;
  document.querySelectorAll('.node').forEach(e=>e.classList.remove('active'));
  document.getElementById('n'+n).classList.add('active');
  updateUI();
  document.getElementById('status').innerHTML='<span style="color:#00ff88">✓ Server 0'+n+' selected! Users: '+c+'/50 - Now enter number</span>';
}
function copyCode(){
  const el=document.getElementById('result');const t=el.innerText.trim();
  if(t.includes('Your pairing')||t.includes('Connecting')||t.length<6)return;
  navigator.clipboard.writeText(t).then(()=>{document.getElementById('status').innerHTML='<span style="color:#00ff88">✅ Copied: '+t+'</span>';});
}
async function getCode(){
  const num=document.getElementById('num').value.trim();const b=document.getElementById('result');const st=document.getElementById('status');
  if(!num||num.length<10){alert('Enter number e.g 256781539746');return;}
  const cur=counts['s'+selected]||0;
  if(cur>=50){st.innerHTML='<span style="color:#ff4444">❌ Server 0'+selected+' FULL! Select other server!</span>';return;}
  b.innerText='Connecting to SERVER 0'+selected+'... wait 20 sec';st.innerHTML='<span style="color:#ffcc00">⏳ Connecting to Server 0'+selected+'... ('+cur+'/50)</span>';
  try{
    const r=await fetch('/pair?number='+encodeURIComponent(num)+'&server='+selected);
    const d=await r.json();
    if(d.code){
      b.innerText=d.code;
      st.innerHTML='<span style="color:#00ff88">✅ CODE READY! TAP TO COPY - Server 0'+selected+' now '+(cur+1)+'/50</span>';
      counts=d.counts||counts; updateUI();
    }else{
      if(d.full){
        b.innerText='SERVER FULL 50/50'; st.innerHTML='<span style="color:#ff4444">❌ Server 0'+selected+' FULL! '+d.counts['s'+selected]+'/50 - Select other!</span>';
        counts=d.counts; updateUI();
      }else{
        b.innerText='Error: '+(d.error||'Failed'); st.innerHTML='<span style="color:#ff4444">❌ '+(d.error||'Failed')+'</span>';
      }
    }
  }catch(e){b.innerText='Network error';st.innerHTML='<span style="color:#ff4444">❌ Network error</span>';}
}
loadCounts();
</script></body></html>`;

app.get('/',(req,res)=>{res.set('Cache-Control','no-store');res.send(html);});

app.get('/counts',(req,res)=>{
  res.json(getCounts());
});

app.get('/sitemap.xml',(req,res)=>{
  res.set('Content-Type','text/xml');
  res.send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://'+req.headers.host+'/</loc><priority>1.0</priority></url></urlset>');
});

app.get('/robots.txt',(req,res)=>{
  res.set('Content-Type','text/plain');
  res.send('User-agent: *\\nAllow: /\\nSitemap: https://'+req.headers.host+'/sitemap.xml');
});

app.get('/pair',async(req,res)=>{
  let num=req.query.number; let serv=parseInt(req.query.server)||1;
  if(!num)return res.json({error:'Number required'});num=num.replace(/[^0-9]/g,'');
  let check=incCount(serv);
  if(check.full){return res.json({error:'Server FULL 50/50', full:true, counts:check.counts});}
  const dir=path.join(__dirname,'auth_'+num+'_'+Date.now());if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});
  try{
    const {state,saveCreds}=await useMultiFileAuthState(dir);
    const sock=makeWASocket({auth:state,printQRInTerminal:false,logger:pino({level:'silent'}),browser:Browsers.ubuntu('Chrome')});
    sock.ev.on('creds.update',saveCreds);await delay(2000);
    let code=await sock.requestPairingCode(num);code=code?.match(/.{1,4}/g)?.join('-')||code;
    res.json({code, counts:getCounts()});await delay(30000);try{fs.rmSync(dir,{recursive:true,force:true});}catch{}
  }catch(e){
    // rollback count if failed to generate code
    const c=getCounts(); c['s'+serv]=Math.max(0,(c['s'+serv]||1)-1); saveCounts(c);
    res.json({error:e.message, counts:c});
  }
});
const PORT=process.env.PORT||3000;app.listen(PORT,()=>console.log('V28 REAL COUNTER LIVE'));
