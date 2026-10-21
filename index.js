const express = require('express');
const app = express();
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const pino = require('pino');
app.use(express.json());

const PIC = 'https://files.catbox.moe/y5dtyc.jpg';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<title>PROFESSOR COOLGUY MD V10 - REAL PIC PAIR | Arsenal Hacker</title>
<meta name="description" content="COOLGUY MD V10 Ultra Pairing by PROFESSOR COOLGUY - Real Arsenal Pic Live - Kampala Uganda">
<meta name="keywords" content="coolguy md, professor coolguy, coolguy md v10 pair, whatsapp bot uganda">
<meta name="author" content="PROFESSOR COOLGUY">
<meta name="robots" content="index, follow">

<!-- GOOGLE + WHATSAPP PREVIEW - YOUR PIC EVERYWHERE -->
<meta property="og:type" content="website">
<meta property="og:title" content="PROFESSOR COOLGUY MD V10 - REAL PIC LIVE">
<meta property="og:description" content="Ultra Pairing System - Your Arsenal Pic is LIVE!">
<meta property="og:image" content="${PIC}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://coolguy-md-v10-pair.onrender.com">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="PROFESSOR COOLGUY MD V10">
<meta name="twitter:description" content="Real Pic Edition - Arsenal Hacker">
<meta name="twitter:image" content="${PIC}">
<link rel="icon" href="${PIC}">
<link rel="apple-touch-icon" href="${PIC}">
<meta itemprop="image" content="${PIC}">

<!-- SEO JSON-LD FOR GOOGLE -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebSite","name":"COOLGUY MD V10","image":"${PIC}","author":{"@type":"Person","name":"PROFESSOR COOLGUY","image":"${PIC}"}}
</script>

<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#070a12;color:#e8ecf1;font-family:'Segoe UI',system-ui,sans-serif;padding:0;min-height:100vh}
.container{padding:16px;max-width:480px;margin:0 auto}
.top-bar{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:#0f1522;border-bottom:1px solid #1e2d42}
.top-btn{background:#151c28;border:1px solid #1e2d42;color:#fff;padding:8px 14px;border-radius:20px;font-size:12px}
.hero-card{background:#151c28;border:2px solid #00ff88;border-radius:24px;overflow:hidden;margin-bottom:16px;box-shadow:0 0 30px rgba(0,255,136,0.25)}
.hero-card img.main-banner{width:100%;height:420px;object-fit:cover;object-position:center top;display:block}
.hero-info{padding:18px;display:flex;gap:14px;align-items:center;background:linear-gradient(180deg,#151c28 0%,#0f1522 100%)}
.hero-info img.circle{width:84px;height:84px;border-radius:50%;border:3px solid #00ff88;object-fit:cover;object-position:center top;box-shadow:0 0 20px rgba(0,255,136,0.6)}
.title{font-size:23px;font-weight:900}.title span{color:#ff3b3b}.sub{color:#8b98b0;font-size:13px;margin-top:4px}
.card{background:#151c28;border:1px solid #1e2d42;border-radius:20px;padding:16px;margin-bottom:14px}
.nodes{background:#101722;border-radius:16px;padding:12px;margin-top:14px}
.nodes-head{display:flex;justify-content:space-between;color:#8b98b0;font-size:13px;font-weight:700;margin-bottom:10px}
.node-item{background:#0a0e16;border:1px solid #1e2d42;border-radius:14px;padding:14px;text-align:center;margin-bottom:10px}
.node-item b{font-size:13px}.node-item div{color:#00ff88;font-size:12px;margin-top:4px}
.mainframe{border-left:4px solid #00ff88;background:#101a14;border-radius:0 14px 14px 0;padding:16px;margin-bottom:14px}
.mainframe b{color:#00ff88;font-size:15px}.mainframe div{color:#8b98b0;font-size:13px;margin-top:6px}
.vip{background:#1a160e;border:1px solid #3d3414;border-radius:16px;padding:16px;margin-bottom:18px}
.vip-badge{background:#ffcc00;color:#000;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:900}
.vip b{color:#ffcc00;margin-top:10px;display:block}.vip div{color:#8b98b0;font-size:13px;margin-top:4px}
.label{margin:18px 0 10px 4px;font-weight:700}
.input-wrap{background:#101722;border:1px solid #1e2d42;border-radius:14px;padding:14px 16px;display:flex;gap:10px;align-items:center}
.input-wrap input{background:transparent;border:none;outline:none;color:#fff;width:100%;font-size:17px}
.generate{width:100%;margin-top:18px;background:linear-gradient(90deg,#00ff88,#00cc6a);border:none;padding:17px;border-radius:14px;font-weight:900;font-size:16px;color:#000;cursor:pointer;box-shadow:0 0 20px rgba(0,255,136,0.4)}
.code-box{margin-top:14px;border:2px dashed #1e3d2f;background:#0a1210;border-radius:14px;padding:20px;text-align:center;color:#5a657e;font-size:14px;min-height:60px;display:flex;justify-content:center;align-items:center;word-break:break-all;cursor:pointer;user-select:all}
.code-box.has-code{color:#00ff88;font-weight:900;font-size:22px;border-color:#00ff88;background:#0a1a14;letter-spacing:2px}
.copyMsg{text-align:center;color:#00ff88;font-weight:800;margin-top:10px;display:none}
.footer{text-align:center;color:#3a455c;font-size:11px;margin:30px 0 10px;line-height:1.6}
.footer span{color:#00ff88}
.watermark{position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;border:2px solid #00ff88;opacity:0.15;pointer-events:none;object-fit:cover}
</style>
</head>
<body>
<img class="watermark" src="${PIC}">
<div class="top-bar"><div class="top-btn">🌐 EN</div><div style="display:flex;gap:8px"><div class="top-btn">🎨 Theme</div><div class="top-btn">☰ Menu</div></div></div>

<div class="container">
<div class="hero-card">
<img class="main-banner" src="${PIC}" alt="PROFESSOR COOLGUY REAL PIC">
<div class="hero-info">
<img class="circle" src="${PIC}" alt="PROFESSOR COOLGUY">
<div><div class="title"><span>P</span>ROFESSOR COOLGUY MD V10</div><div class="sub">V25 ULTIMATE - REAL PIC EVERYWHERE<br>🔴 Arsenal Edition | Kampala UG</div></div>
</div>
</div>

<div class="card">
<div class="nodes">
<div class="nodes-head"><span>Available Nodes</span><span>✕</span></div>
<div class="node-item"><b>COOLGUY SERVER 01 ★ NEW</b><div>ONLINE · 2/50</div></div>
<div class="node-item"><b>COOLGUY SERVER 02 ★ ARSENAL</b><div>ONLINE · 1/50 - YOUR PIC</div></div>
<div class="node-item"><b>COOLGUY SERVER 03 ★ GHOST</b><div>ONLINE · 5/50</div></div>
</div>
</div>

<div class="mainframe"><b>🛡️ System Mainframe Node - V25 LIVE</b><div>Your real pic is now visible on Render Dashboard, Google Preview, and Pair Site! Connection ready.</div></div>

<div class="vip"><span class="vip-badge">VIP</span><b>VIP Access Zone - REAL PIC CONFIRMED</b><div>Your image ${PIC} is live on OG tags, favicon, banner and circle. Google will index it!</div></div>

<div class="label">WhatsApp Number</div>
<div class="input-wrap">📞 <input id="num" placeholder="256781539746"></div>

<button class="generate" onclick="getCode()">🔑 Generate Pair Code - V25</button>
<div class="code-box" id="result" onclick="copyCode()">Your pairing code will appear here - Tap to copy</div>
<div class="copyMsg" id="copyMsg">✅ Copied! Go to WhatsApp > Linked Devices > Link with phone number</div>

<div class="footer">© 2026 COOLGUY MD V10 | Powered by <span>PROFESSOR COOLGUY</span><br><span style="color:#ff3b3b">PROFESSOR COOLGUY</span> Neon + Arsenal Shirt - Real Pic Edition<br>Image: ${PIC}<br>Kampala, Uganda - V25 EVERYWHERE</div>
</div>

<script>
function copyCode(){
  const el=document.getElementById('result');
  const t=el.innerText.trim();
  if(t.includes('Your pairing')||t.includes('Connecting')||t.includes('Error')||t.length<5)return;
  navigator.clipboard.writeText(t).then(()=>{
    document.getElementById('copyMsg').style.display='block';
    setTimeout(()=>document.getElementById('copyMsg').style.display='none',4000);
  });
}
async function getCode(){
  const n=document.getElementById('num').value.trim();
  const b=document.getElementById('result');
  if(!n||n.length<10){alert('Enter number like 256781539746');return;}
  b.innerText='Connecting to COOLGUY SERVER 02 (YOUR PIC NODE)... wait 20 sec';
  b.classList.remove('has-code');
  try{
    const r=await fetch('/pair?number='+encodeURIComponent(n));
    const d=await r.json();
    if(d.code){b.innerText=d.code; b.classList.add('has-code');}
    else{b.innerText='Error: '+(d.error||'Failed');}
  }catch(e){b.innerText='Network error - retry after 30 sec';}
}
</script>
</body>
</html>`;

app.get('/', (req,res)=>{
  res.set('Cache-Control','no-store');
  res.send(html);
});

app.get('/pair', async (req,res)=>{
  let num=req.query.number;
  if(!num) return res.json({error:'Number required'});
  num=num.replace(/[^0-9]/g,'');
  const dir=path.join(__dirname,'auth_'+num+'_'+Date.now());
  if(!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});
  try{
    const {state,saveCreds}=await useMultiFileAuthState(dir);
    const sock=makeWASocket({auth:state,printQRInTerminal:false,logger:pino({level:'silent'}),browser:Browsers.ubuntu('Chrome')});
    sock.ev.on('creds.update',saveCreds);
    await delay(2000);
    let code=await sock.requestPairingCode(num);
    code=code?.match(/.{1,4}/g)?.join('-')||code;
    res.json({code});
    await delay(30000);
    try{fs.rmSync(dir,{recursive:true,force:true});}catch{}
  }catch(e){res.json({error:e.message});}
});

app.get('/robots.txt',(req,res)=>res.type('text/plain').send('User-agent: *\\nAllow: /\\nSitemap: https://coolguy-md-v10-pair.onrender.com/sitemap.xml'));
app.get('/sitemap.xml',(req,res)=>res.type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://coolguy-md-v10-pair.onrender.com/</loc><lastmod>2026-05-13</lastmod><changefreq>daily</changefreq><priority>1.0</priority><image:image><image:loc>'+PIC+'</image:loc></image:image></url></urlset>'));

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log('V25 EVERYWHERE LIVE - PIC: '+PIC));
