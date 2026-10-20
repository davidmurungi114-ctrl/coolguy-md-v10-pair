const express = require('express');
const fs = require('fs');
const path = require('path');
const pino = require('pino');
const { default: makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, delay } = require('@whiskeysockets/baileys');
const app = express();
app.get('/sitemap.xml', (req,res)=>res.sendFile(path.join(__dirname,'sitemap.xml')));
app.get('/robots.txt', (req,res)=>res.sendFile(path.join(__dirname,'robots.txt')));
const PORT = process.env.PORT || 3000;

const html = `<!DOCTYPE html><html><head><meta name="google-site-verification" content="fOUBkJSZSHMLHJ53HA3tIe79xr6GsYnMYNnlBZ5djKo" /><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>COOLGUY-MD V10 - Ultra Pair</title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"><style>@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');*{margin:0;padding:0;box-sizing:border-box;font-family:'Space Grotesk',sans-serif}body{background:#070b12;color:#fff;min-height:100vh;padding:14px}.top{display:flex;justify-content:space-between;margin-bottom:16px}.pill{background:#141b26;border:1px solid #1e2a3a;padding:7px 14px;border-radius:30px;font-size:13px;display:flex;gap:6px;align-items:center}.card{background:linear-gradient(180deg,#151c28 0%,#0f141e 100%);border:1px solid #1e2d42;border-radius:20px;padding:18px;margin-bottom:12px}.profile{display:flex;gap:14px;align-items:center}.avatar{width:54px;height:54px;border-radius:50%;border:2px solid #00ff88;background:#000 url('https://files.catbox.moe/y5dtyc.jpg') center/cover}.name{font-size:21px;font-weight:800}.name span{color:#ff2a2a}.sub{color:#8a9bb3;font-size:12px}.row{display:flex;justify-content:space-between;align-items:center}.btn-sel{background:#00ff88;color:#000;border:none;padding:7px 16px;border-radius:20px;font-weight:800;font-size:12px;cursor:pointer}.mainframe{border-left:3px solid #00ff88;background:linear-gradient(90deg,rgba(0,255,136,.09),transparent)}.vip{background:linear-gradient(180deg,#1e1a0f,#141107);border:1px solid #3a2f14;border-radius:16px;padding:14px}.badge{background:#ffcc00;color:#000;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:900;display:inline-block;margin-bottom:6px}.input{margin-top:12px;background:#101722;border:1px solid #1e2d42;border-radius:14px;padding:13px;display:flex;gap:10px;align-items:center}.input input{background:transparent;border:none;outline:none;color:#fff;width:100%;font-size:15px}.generate{width:100%;margin-top:16px;background:#00ff88;border:none;padding:14px;border-radius:14px;color:#000;font-weight:800;font-size:15px;cursor:pointer}.code{margin-top:14px;border:1px dashed #1e3a2a;background:#0a1210;border-radius:14px;padding:16px;text-align:center;color:#5a7a6a;font-weight:700;letter-spacing:2px;min-height:52px;display:flex;justify-content:center;align-items:center;word-break:break-all}.code.active{color:#00ff88;border-color:#00ff88;background:rgba(0,255,136,.07);font-size:22px}.hint{font-size:11px;color:#6b7f6b;margin-top:6px}.footer{margin-top:18px;text-align:center;color:#4a5a6a;font-size:11px}#nodeModal{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:99;justify-content:center;align-items:center;padding:20px}.modalBox{background:#101722;border:1px solid #1e2d42;border-radius:20px;padding:20px;width:100%;max-width:360px}.nodeOpt{padding:12px;border:1px solid #1e2d42;border-radius:12px;margin-bottom:10px;cursor:pointer;display:flex;justify-content:space-between;align-items:center}.nodeOpt:hover{border-color:#00ff88;background:rgba(0,255,136,0.06)}.nodeOpt.active{border-color:#00ff88;background:rgba(0,255,136,0.12)}</style></head><body><div class="top"><div class="pill"><i class="fa-solid fa-globe"></i> EN</div><div style="display:flex;gap:8px"><div class="pill"><i class="fa-solid fa-palette"></i> Theme</div><div class="pill"><i class="fa-solid fa-bars"></i></div></div></div><div class="card"><div class="profile"><div class="avatar"></div><div><div class="name"><span>C</span>OOLGUY MD</div><div class="sub">Ultra Pairing System V10 - PROFESSOR COOLGUY</div></div></div></div><div class="card"><div class="row"><div><div style="font-weight:700;display:flex;gap:8px"><i class="fa-solid fa-server" style="color:#00ff88"></i> Select Deployment Node</div><div style="color:#6c7d98;font-size:11px;margin-left:24px" id="nodeStatus">Active: 3 | Limit: 50 | Node: <b id="curNode">Mainframe</b></div></div><button class="btn-sel" onclick="openNodes()">Select</button></div></div><div class="card mainframe"><div style="color:#00ff88;font-weight:700;margin-bottom:4px"><i class="fa-solid fa-shield-halved"></i> <span id="nodeTitle">System Mainframe Node</span></div><div style="color:#9aafc8;font-size:12px" id="nodeDesc">Connection socket is ready. Enter your WhatsApp number to generate secure pairing code.</div></div><div class="vip"><div class="badge">VIP</div><div style="color:#ffdd57;font-weight:800;font-size:14px">VIP Access Zone - FREE!</div><div style="color:#8c7e5a;font-size:11px">Premium priority - faster nodes - exclusive support. Unlocked for all COOLGUY users!</div></div><div style="margin-top:16px;font-weight:600;font-size:14px">WhatsApp Number</div><div class="input"><i class="fa-solid fa-phone" style="color:#6c7d98"></i><input id="num" placeholder="256750765838"></div><div class="hint">💡 Enter with country code, no + or spaces</div><button class="generate" onclick="getCode()"><i class="fa-solid fa-key"></i> Generate Pair Code</button><div class="code" id="result">Your pairing code will appear here</div><div class="footer">COOLGUY TECH - Kampala Uganda - COOLGUY-MD.V10 - PROFESSOR COOLGUY</div><div id="nodeModal" onclick="if(event.target==this)closeNodes()"><div class="modalBox"><div style="font-weight:800;font-size:18px;margin-bottom:14px"><i class="fa-solid fa-server" style="color:#00ff88"></i> Choose Node</div><div class="nodeOpt active" onclick="selectNode(this,'mainframe','System Mainframe Node','Connection socket is ready. Best for stable long-term bot.')"><div><b>System Mainframe</b><div style="font-size:11px;color:#6c7d98">Stable - Recommended</div></div><i class="fa-solid fa-check" style="color:#00ff88"></i></div><div class="nodeOpt" onclick="selectNode(this,'vip','VIP Priority Node','VIP priority routing with faster pairing.')"><div><b>VIP Priority</b><div style="font-size:11px;color:#6c7d98">Fast - Priority</div></div><i class="fa-solid fa-crown" style="color:#ffcc00"></i></div><div class="nodeOpt" onclick="selectNode(this,'fast','Turbo Fast Node','Turbo pairing - 3 sec.')"><div><b>Turbo Fast</b><div style="font-size:11px;color:#6c7d98">3 sec - Testing</div></div><i class="fa-solid fa-bolt" style="color:#00ff88"></i></div><div class="nodeOpt" onclick="selectNode(this,'backup','Backup Relay Node','Backup relay if mainframe is full.')"><div><b>Backup Relay</b><div style="font-size:11px;color:#6c7d98">Backup - Auto</div></div><i class="fa-solid fa-rotate" style="color:#6c7d98"></i></div><button class="generate" style="margin-top:10px" onclick="closeNodes()">Done</button></div></div><script>
let cur='mainframe';
function openNodes(){document.getElementById('nodeModal').style.display='flex';}
function closeNodes(){document.getElementById('nodeModal').style.display='none';}
function selectNode(el,id,title,desc){
 cur=id;
 document.getElementById('curNode').innerText=title.split(' ')[0];
 document.getElementById('nodeTitle').innerText=title;
 document.getElementById('nodeDesc').innerText=desc;
 document.querySelectorAll('.nodeOpt').forEach(e=>e.classList.remove('active'));
 el.classList.add('active');
}
async function getCode(){
 const n=document.getElementById('num').value.trim();
 const b=document.getElementById('result');
 if(!n || n.length<10){alert('Enter number with country code e.g. 256750765838');return;}
 b.innerText='Generating on '+cur.toUpperCase()+' node... wait 8 sec'; b.classList.remove('active');
 try{
  const r=await fetch('/pair?number='+encodeURIComponent(n)+'&node='+cur);
  const d=await r.json();
  if(d.code){ b.innerText=d.code; b.classList.add('active'); } else { b.innerText='Error: '+(d.error||'Failed'); }
 }catch(e){ b.innerText='Backend error - try again'; }
}
</script></body></html>`;

app.get('/', (req,res)=> res.send(html));
app.get('/google9aff0c4a62c2c2e1.html', (req,res)=> res.send('google-site-verification: google9aff0c4a62c2c2e1.html'));
app.get('/pair', async (req,res)=>{
  let number = req.query.number?.replace(/[^0-9]/g,'');
  if(!number) return res.json({error:'Enter valid number'});
  const dir = './temp-'+number+'-'+Date.now();
  try{
    if(fs.existsSync(dir)) fs.rmSync(dir,{recursive:true,force:true});
    const { state, saveCreds } = await useMultiFileAuthState(dir);
    const sock = makeWASocket({
      logger: pino({level:'silent'}),
      printQRInTerminal:false,
      browser: ["Ubuntu","Chrome","20.0.04"],
      auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level:'silent'})) }
    });
    sock.ev.on('creds.update', saveCreds);
    await delay(3500);
    if(!sock.authState.creds.registered){
      await delay(1500);
      let code = await sock.requestPairingCode(number);
      code = code?.match(/.{1,4}/g)?.join('-') || code;
      res.json({code});
      console.log('CODE FOR '+number+': '+code);
    } else { res.json({error:'Number already registered, delete linked devices'}); }
    setTimeout(()=>{ try{ fs.rmSync(dir,{recursive:true,force:true}); }catch{} try{ sock.end(); }catch{} }, 60000);
  }catch(e){
    console.log('PAIR ERROR:', e);
    try{ if(fs.existsSync(dir)) fs.rmSync(dir,{recursive:true,force:true}); }catch{}
    res.json({error: 'WhatsApp blocked, try again: '+e.message});
  }
});
app.listen(PORT, ()=> console.log('COOLGUY GHOST ULTRA PAIR running on '+PORT));
