const express = require('express');
const fs = require('fs');
const path = require('path');
const pino = require('pino');
const { default: makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, delay, Browsers, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const app = express();
const PORT = process.env.PORT || 3000;
const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>COOLGUY V13 FINAL</title><style>body{background:#070b12;color:#fff;font-family:sans-serif;padding:14px}.card{background:#151c28;border:1px solid #1e2d42;border-radius:20px;padding:18px;margin-bottom:12px}.input{background:#101722;border:1px solid #1e2d42;border-radius:14px;padding:13px;display:flex;gap:10px}.input input{background:transparent;border:none;outline:none;color:#fff;width:100%}.generate{width:100%;margin-top:16px;background:#00ff88;border:none;padding:14px;border-radius:14px;font-weight:800;cursor:pointer}.code{margin-top:14px;border:1px dashed #00ff88;background:#0a1210;border-radius:14px;padding:16px;text-align:center;color:#00ff88;font-weight:700;min-height:52px;display:flex;justify-content:center;align-items:center;word-break:break-all;font-size:22px}</style></head><body><div class="card"><h2>COOLGUY MD V13 - GHOST FINAL FIX</h2><div style="color:#00ff88">Latest WhatsApp Version - 5 Min Alive</div></div><div class="card"><div>WhatsApp Number</div><div class="input"><input id="num" placeholder="256750765838"></div><button class="generate" onclick="getCode()">Generate Pair Code</button><div class="code" id="result">Code will appear here</div></div><script>async function getCode(){const n=document.getElementById('num').value.trim();const b=document.getElementById('result');if(!n||n.length<10){alert('Enter number');return;}b.innerText='Generating with LATEST WA version... wait 15 sec';try{const r=await fetch('/pair?number='+encodeURIComponent(n));const d=await r.json();if(d.code){b.innerText=d.code}else{b.innerText='Error: '+(d.error||'Failed');}}catch(e){b.innerText='Backend error';}}</script></body></html>`;
app.get('/',(req,res)=>res.send(html));
app.get('/pair',async(req,res)=>{
 let number=req.query.number?.replace(/[^0-9]/g,'');
 if(!number) return res.json({error:'Enter valid number'});
 const dir='./temp-'+number+'-'+Date.now();
 try{
  if(fs.existsSync(dir)) fs.rmSync(dir,{recursive:true,force:true});
  const { state, saveCreds } = await useMultiFileAuthState(dir);
  const { version } = await fetchLatestBaileysVersion();
  console.log('USING WA VERSION:',version,'FOR',number);
  const sock = makeWASocket({
   version,
   logger: pino({level:'silent'}),
   printQRInTerminal:false,
   browser: Browsers.ubuntu('Chrome'),
   auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level:'silent'})) }
  });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', async(u)=>{
   const { connection, lastDisconnect } = u;
   if(connection==='open'){ console.log('✅ CONNECTED SUCCESS FOR '+number); setTimeout(()=>{try{fs.rmSync(dir,{recursive:true,force:true});}catch{}},600000); }
   if(connection==='close'){ console.log('CLOSED',number,lastDisconnect?.error?.toString()); }
  });
  await delay(5000);
  if(!sock.authState.creds.registered){
   await delay(2000);
   let code = await sock.requestPairingCode(number);
   code = code?.match(/.{1,4}/g)?.join('-')||code;
   if(!res.headersSent) res.json({code});
   console.log('CODE FOR '+number+': '+code+' WITH VERSION',version);
   setTimeout(()=>{ try{ sock.end(); }catch{} try{ if(fs.existsSync(dir)) fs.rmSync(dir,{recursive:true,force:true}); }catch{} }, 300000);
  } else { if(!res.headersSent) res.json({error:'Already registered'}); }
 }catch(e){ console.log('PAIR ERROR:',e.message); try{ if(fs.existsSync(dir)) fs.rmSync(dir,{recursive:true,force:true}); }catch{} if(!res.headersSent) res.json({error:e.message}); }
});
app.listen(PORT,()=>console.log('COOLGUY V13 FINAL running on '+PORT));
