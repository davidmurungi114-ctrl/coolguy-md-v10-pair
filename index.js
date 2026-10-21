const express = require('express');
const app = express();
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const pino = require('pino');
app.use(express.json());
const PIC = 'https://files.catbox.moe/y5dtyc.jpg';
const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>COOLGUY MD V10 - V26 FIXED NODES</title><meta property="og:image" content="${PIC}"><style>
*{margin:0;padding:0;box-sizing:border-box}body{background:#070a12;color:#e8ecf1;font-family:sans-serif;padding:16px}
.card{background:#151c28;border:2px solid #00ff88;border-radius:24px;padding:0;overflow:hidden;margin-bottom:14px}
.banner{width:100%;height:380px;object-fit:cover;object-position:center top;display:block;background:#0a0e16}
.profile-box{padding:16px;display:flex;gap:14px;align-items:center;background:#151c28}
.profile-box img{width:80px;height:80px;border-radius:50%;border:3px solid #00ff88;object-fit:cover;object-position:center top}
.title{font-size:22px;font-weight:900}.title span{color:#ff3b3b}
.nodes{background:#101722;border-radius:16px;padding:12px;margin:14px}
.node{border:2px solid #1e2d42;background:#0a0e16;border-radius:14px;padding:14px;text-align:center;margin-bottom:10px;cursor:pointer;transition:0.3s}
.node.active{border-color:#00ff88;background:#0a1a14;box-shadow:0 0 15px rgba(0,255,136,0.4);transform:scale(1.02)}
.node b{font-size:13px}.node div{color:#00ff88;font-size:12px;margin-top:4px}
.mainframe{border-left:4px solid #00ff88;background:#101a14;border-radius:0 14px 14px 0;padding:16px;margin-bottom:14px}
.vip{background:#1a160e;border:1px solid #3d3414;border-radius:16px;padding:16px;margin-bottom:18px}.vip-badge{background:#ffcc00;color:#000;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:900}
.label{margin:18px 0 10px 4px;font-weight:700}.input-wrap{background:#101722;border:1px solid #1e2d42;border-radius:14px;padding:14px 16px;display:flex;gap:10px}.input-wrap input{background:transparent;border:none;outline:none;color:#fff;width:100%;font-size:17px}
.generate{width:100%;margin-top:18px;background:#00ff88;border:none;padding:17px;border-radius:14px;font-weight:900;font-size:16px;color:#000;cursor:pointer}
.code-box{margin-top:14px;border:2px dashed #00ff88;background:#0a1210;border-radius:14px;padding:20px;text-align:center;color:#00ff88;font-weight:800;font-size:20px;min-height:60px;display:flex;justify-content:center;align-items:center;word-break:break-all;cursor:pointer}
.status{text-align:center;margin-top:10px;font-size:13px;font-weight:700}.footer{text-align:center;color:#3a455c;font-size:11px;margin:30px 0 10px}
</style></head><body>
<div class="card"><img class="banner" src="${PIC}?v=26" onerror="this.src='${PIC}'"><div class="profile-box"><img src="${PIC}?v=26"><div><div class="title"><span>P</span>ROFESSOR COOLGUY MD V10</div><div style="color:#8b98b0;font-size:13px">V26 NODES FIXED - TAP TO SELECT<br>Arsenal Edition</div></div></div>
<div class="nodes"><div style="display:flex;justify-content:space-between;color:#8b98b0;font-size:13px;margin-bottom:10px"><span>Available Nodes - TAP TO SELECT</span><span>✕</span></div>
<div class="node active" id="n1" onclick="sel(1)"><b>COOLGUY SERVER 01 ★ NEW</b><div id="s1">✓ SELECTED - ONLINE · 2/50</div></div>
<div class="node" id="n2" onclick="sel(2)"><b>COOLGUY SERVER 02 ★ ARSENAL</b><div id="s2">ONLINE · 1/50 - YOUR PIC</div></div>
<div class="node" id="n3" onclick="sel(3)"><b>COOLGUY SERVER 03 ★ GHOST</b><div id="s3">ONLINE · 5/50</div></div>
</div></div>
<div class="mainframe"><b>🛡️ System Mainframe Node - V26 LIVE</b><div id="mainMsg">Selected: COOLGUY SERVER 01 - Ready to pair! Tap a node above, then generate code below.</div></div>
<div class="vip"><span class="vip-badge">VIP</span><b style="color:#ffcc00;display:block;margin-top:10px">VIP Access Zone - REAL PIC CONFIRMED</b><div style="color:#8b98b0;font-size:13px;margin-top:4px">Your Arsenal pic is LIVE! Nodes now clickable!</div></div>
<div class="label">WhatsApp Number</div><div class="input-wrap">📞 <input id="num" placeholder="256781539746"></div>
<button class="generate" onclick="getCode()">🔑 Generate Pair Code</button>
<div class="code-box" id="result" onclick="copyCode()">Your pairing code will appear here</div>
<div class="status" id="status"></div>
<div class="footer">© 2026 COOLGUY MD V10 | V26 FIXED | PROFESSOR COOLGUY<br>Pic: ${PIC}</div>
<script>
let selected=1;
function sel(n){
  selected=n;
  document.querySelectorAll('.node').forEach(e=>e.classList.remove('active'));
  document.getElementById('n'+n).classList.add('active');
  document.getElementById('s1').innerText='ONLINE · 2/50';document.getElementById('s2').innerText='ONLINE · 1/50 - YOUR PIC';document.getElementById('s3').innerText='ONLINE · 5/50';
  document.getElementById('s'+n).innerText='✓ SELECTED - ONLINE';
  document.getElementById('mainMsg').innerText='Selected: COOLGUY SERVER 0'+n+' - Ready to pair! Now enter number below and Generate Code!';
  document.getElementById('status').innerHTML='<span style="color:#00ff88">✓ Server 0'+n+' selected! Now enter number below.</span>';
}
function copyCode(){
  const el=document.getElementById('result');const t=el.innerText.trim();
  if(t.includes('Your pairing')||t.includes('Connecting')||t.length<6)return;
  navigator.clipboard.writeText(t).then(()=>{document.getElementById('status').innerHTML='<span style="color:#00ff88">✅ Copied: '+t+' - Go to WhatsApp > Linked Devices > Link with phone number</span>';});
}
async function getCode(){
  const num=document.getElementById('num').value.trim();const b=document.getElementById('result');const st=document.getElementById('status');
  if(!num||num.length<10){alert('Enter number e.g 256781539746');return;}
  b.innerText='Connecting to SERVER 0'+selected+'... wait 20 sec';st.innerHTML='<span style="color:#ffcc00">⏳ Connecting to Server 0'+selected+'...</span>';
  try{
    const r=await fetch('/pair?number='+encodeURIComponent(num));
    const d=await r.json();
    if(d.code){b.innerText=d.code;st.innerHTML='<span style="color:#00ff88">✅ CODE READY! TAP CODE TO COPY - Server 0'+selected+'</span>';}
    else{b.innerText='Error: '+(d.error||'Failed');st.innerHTML='<span style="color:#ff4444">❌ '+d.error+'</span>';}
  }catch(e){b.innerText='Network error';st.innerHTML='<span style="color:#ff4444">❌ Network error - try again</span>';}
}
</script></body></html>`;
app.get('/',(req,res)=>{res.set('Cache-Control','no-store');res.send(html);});
app.get('/pair',async(req,res)=>{
  let num=req.query.number;if(!num)return res.json({error:'Number required'});num=num.replace(/[^0-9]/g,'');
  const dir=path.join(__dirname,'auth_'+num+'_'+Date.now());if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});
  try{
    const {state,saveCreds}=await useMultiFileAuthState(dir);
    const sock=makeWASocket({auth:state,printQRInTerminal:false,logger:pino({level:'silent'}),browser:Browsers.ubuntu('Chrome')});
    sock.ev.on('creds.update',saveCreds);await delay(2000);
    let code=await sock.requestPairingCode(num);code=code?.match(/.{1,4}/g)?.join('-')||code;
    res.json({code});await delay(30000);try{fs.rmSync(dir,{recursive:true,force:true});}catch{}
  }catch(e){res.json({error:e.message});}
});
const PORT=process.env.PORT||3000;app.listen(PORT,()=>console.log('V26 FIXED LIVE'));
