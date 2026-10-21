const express = require('express');
const fs = require('fs');
const pino = require('pino');
const { default: makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, delay, Browsers, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const app = express();
const PORT = process.env.PORT || 3000;

const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>COOLGUY MD V12</title><style>
*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0e16;color:#fff;font-family:sans-serif;padding:16px;min-height:100vh}
.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.top button{background:#151c28;border:1px solid #1e2d42;color:#fff;padding:10px 16px;border-radius:20px;font-weight:600}
.card{background:#151c28;border:1px solid #1e2d42;border-radius:22px;padding:18px;margin-bottom:14px}.profile{display:flex;gap:14px;align-items:center}.profile img{width:56px;height:56px;border-radius:50%;border:2px solid #00ff88;object-fit:cover}
.title{font-size:22px;font-weight:900}.title span:first-child{color:#ff3b3b}.sub{color:#8b98b0;font-size:13px;margin-top:4px;line-height:1.3}
.node{border-left:3px solid #00ff88;background:#101a14}.node b{color:#00ff88}.node div{color:#8b98b0;font-size:12px;margin-top:6px}
.vip{background:#1a160e;border:1px solid #3d3414}.vip span{background:#ffcc00;color:#000;padding:4px 12px;border-radius:12px;font-size:11px;font-weight:900}.vip b{display:block;margin-top:10px;color:#ffcc00}.vip div{color:#8b98b0;font-size:11px;margin-top:4px}
.label{margin:18px 0 8px 4px;font-weight:600}.input{background:#101722;border:1px solid #1e2d42;border-radius:14px;padding:14px;display:flex;gap:10px;align-items:center}.input input{background:transparent;border:none;outline:none;color:#fff;width:100%;font-size:16px}
.generate{width:100%;margin-top:16px;background:#00ff88;border:none;padding:15px;border-radius:14px;font-weight:900;font-size:15px;cursor:pointer;color:#000}
.code{margin-top:14px;border:1px dashed #00ff88;background:#0a1210;border-radius:14px;padding:18px;text-align:center;color:#00ff88;font-weight:800;min-height:56px;display:flex;justify-content:center;align-items:center;word-break:break-all;font-size:18px;letter-spacing:1px;user-select: all; -webkit-user-select: all; cursor: pointer;}
.copyHint{text-align:center;color:#5a657e;font-size:11px;margin-top:6px}
.copyMsg{text-align:center;color:#00ff88;font-size:13px;margin-top:8px;font-weight:700;display:none}
.footer{margin-top:24px;text-align:center;color:#3a455c;font-size:10px;letter-spacing:1px}
</style></head><body>
<div class="top"><button>🌐 EN</button><div style="display:flex;gap:8px"><button>🎨 Theme</button><button>☰</button></div></div>
<div class="card"><div class="profile"><img src="https://i.imgur.com/8Km9tLL.jpg"><div><div class="title"><span>C</span>OOLGUY MD</div><div class="sub">Ultra Pairing System V12 - PROFESSOR COOLGUY - GHOST FINAL</div></div></div></div>
<div class="card node"><b>🛡️ System Mainframe Node - V19 COPY FIX</b><div>TAP CODE TO COPY - 10 MIN!</div></div>
<div class="card vip"><span>VIP</span><b>V19 COPY ACTIVE!</b><div>Tap code to auto copy</div></div>
<div class="label">WhatsApp Number</div>
<div class="input">📞 <input id="num" placeholder="256781539746"></div>
<div style="color:#5a657e;font-size:12px;margin-top:6px">Enter with country code, no + or spaces</div>
<button class="generate" onclick="getCode()">🔑 Generate Pair Code</button>
<div class="code" id="result" onclick="copyCode()">Code will appear here - Tap to copy</div>
<div class="copyHint">👆 Tap the code to copy</div>
<div class="copyMsg" id="copyMsg">✅ Copied! Now paste in WhatsApp > Linked Devices > Link with phone number</div>
<div class="footer">COOLGUY TECH - Kampala Uganda - V19</div>
<script>
function copyCode(){
  const el = document.getElementById('result');
  const text = el.innerText.trim();
  if(text.includes('Code will appear') || text.includes('Connecting') || text.includes('Error') || text.length < 6) return;
  if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(()=>{
      document.getElementById('copyMsg').style.display='block';
      setTimeout(()=>{ document.getElementById('copyMsg').style.display='none'; }, 4000);
    });
  } else {
    const range = document.createRange();
    range.selectNodeContents(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    document.getElementById('copyMsg').style.display='block';
  }
}
async function getCode(){const n=document.getElementById('num').value.trim();const b=document.getElementById('result');if(!n||n.length<10){alert('Enter number');return;}b.innerText='Connecting to WhatsApp... wait 20 sec';document.getElementById('copyMsg').style.display='none';try{const r=await fetch('/pair?number='+encodeURIComponent(n));const d=await r.json();if(d.code){b.innerText=d.code}else{b.innerText='Error: '+(d.error||'Failed')};}catch(e){b.innerText='Network error - try again in 60 sec';}}</script></body></html>`;

app.get('/',(req,res)=>res.send(html));
app.get('/pair',async(req,res)=>{
 let number=req.query.number?.replace(/[^0-9]/g,'');
 if(!number) return res.json({error:'Enter valid number'});
 const dir='./temp-'+number+'-'+Date.now();
 try{
  if(fs.existsSync(dir)) fs.rmSync(dir,{recursive:true,force:true});
  const { state, saveCreds } = await useMultiFileAuthState(dir);
  let version;
  try {
    const v = await fetchLatestBaileysVersion();
    version = v.version;
  } catch { version = [2,3000,1023223821]; }
  console.log('V19 VERSION:',version,'NODE:',process.version);
  const sock = makeWASocket({ 
   version, 
   logger: pino({level:'silent'}), 
   printQRInTerminal:false, 
   browser: Browsers.macOS('Desktop'),
   auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level:'silent'})) }
  });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (u)=> {
   console.log('CONN UPDATE:',u.connection,'error:',u.lastDisconnect?.error?.message);
  });
  await delay(6000);
  if(!sock.authState.creds.registered){
   let code = await sock.requestPairingCode(number);
   code = code?.match(/.{1,4}/g)?.join('-')||code;
   if(!res.headersSent) res.json({code});
   console.log('✅ V19 CODE OK:',code);
   setTimeout(()=>{ try{ sock.end(); }catch{} try{ if(fs.existsSync(dir)) fs.rmSync(dir,{recursive:true,force:true}); }catch{} }, 600000);
  }
 }catch(e){ 
  console.error('V19 CRITICAL ERROR:',e);
  try{ if(fs.existsSync(dir)) fs.rmSync(dir,{recursive:true,force:true}); }catch{}
  if(!res.headersSent) res.json({error:e.message + ' | Node:'+process.version}); 
 }
});
app.listen(PORT,()=>console.log('V19 RUNNING NODE',process.version));
