const express = require('express');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <html><head><title>COOLGUY PAIR</title></head>
    <body style="font-family:Arial;text-align:center;padding:30px;background:#111;color:white;">
      <h1>🔥 COOLGUY-MD V10 PAIR 🔥</h1>
      <p>Enter number with country code (e.g. 2567xxxxxxx):</p>
      <input id="num" placeholder="2567xxxxxxx" style="padding:10px;width:220px;"/>
      <button onclick="getCode()" style="padding:10px 20px;background:green;color:white;border:none;">Get Pair Code</button>
      <h2 id="result" style="color:lime;margin-top:20px;"></h2>
      <script>
        async function getCode(){
          const n=document.getElementById('num').value;
          if(!n) return alert('Enter number');
          document.getElementById('result').innerText='Generating... wait 10 seconds...';
          const r=await fetch('/pair?number='+n);
          const d=await r.json();
          document.getElementById('result').innerText=d.code?'YOUR CODE: '+d.code:'Error: '+d.error;
        }
      </script>
    </body></html>
  `);
});

app.get('/pair', async (req,res)=>{
  const number=req.query.number?.replace(/[^0-9]/g,'');
  if(!number) return res.json({error:'Enter number with country code'});
  try{
    const {state,saveCreds}=await useMultiFileAuthState('./auth');
    const sock=makeWASocket({auth:state,printQRInTerminal:false,logger:pino({level:'silent'}),browser:['COOLGUY-MD','Chrome','1.0.0']});
    if(!sock.authState.creds.registered){
      const code=await sock.requestPairingCode(number);
      res.json({code:code});
    }
    sock.ev.on('creds.update',saveCreds);
    setTimeout(()=>{try{sock.end();}catch{}},30000);
  }catch(e){res.json({error:e.message});}
});

app.listen(PORT,()=>console.log('Running on '+PORT));
