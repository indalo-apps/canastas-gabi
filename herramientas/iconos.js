// Dibuja los iconos y og.png de Canastas (necesita Playwright y Chrome): node herramientas/iconos.js
// Hoy: «+ − ×» en fila. Para cuando haya divisiones, cambiar SIGNOS por SIGNOS_CUATRO («+ −» arriba, «× ÷» abajo).
const SIGNOS = 'M246 512h112M302 456v112M456 512h112M666 456l112 112M778 456l-112 112';
const SIGNOS_CUATRO = 'M342 402h120M402 342v120M562 402h120M360 580l84 84M444 580l-84 84M562 622h120M622 570h0M622 674h0';
const { chromium } = require('playwright');
const balon = (s=1) => `
<g transform="translate(512 512) scale(${s}) translate(-512 -512)">
  <circle cx="512" cy="512" r="378" fill="#f47b20" stroke="#7a3a0a" stroke-width="26"/>
  <g fill="none" stroke="#7a3a0a" stroke-width="22" stroke-linecap="round">
    <path d="M512 134V890M134 512H890"/>
    <path d="M300 200C420 330 420 694 300 824M724 200C604 330 604 694 724 824"/>
  </g>
  <g stroke-linecap="round" fill="none">
    <path d="${SIGNOS}" stroke="#1d3557" stroke-width="88"/>
    <path d="${SIGNOS}" stroke="#fff" stroke-width="48"/>
  </g>
</g>`;
const icon = (s=1) => `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><rect width="1024" height="1024" fill="#1d3557"/>${balon(s)}</svg>`;
const og = `<!doctype html><html><body style="margin:0"><div style="width:1200px;height:630px;background:#1d3557;display:flex;align-items:center;font-family:Inter,'Helvetica Neue',Arial,sans-serif">
<svg width="300" height="300" viewBox="112 112 800 800" style="margin:0 50px 0 70px">${balon(1)}</svg>
<div><div style="color:#f5f6fa;font-size:96px;font-weight:800;letter-spacing:-1px">Canastas</div>
<div style="color:#ffb547;font-size:38px;font-weight:700;margin-top:10px">Sumas, restas y tablas</div>
<div style="color:#c9d1e3;font-size:30px;margin-top:14px">Practica jugando al baloncesto</div>
<div style="display:inline-block;background:#ffe066;color:#2a1d00;font-size:26px;font-weight:700;padding:14px 60px;border-radius:30px;margin-top:30px">Gratis y sin registrarse</div></div></div></body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const p = await b.newPage({ viewport:{width:1024,height:1024} });
  for (const [n,s] of [['icon-1024.png',1],['icon-maskable-1024.png',.8]]) {
    await p.setContent(`<body style="margin:0">${icon(s)}</body>`); await p.screenshot({ path:n, clip:{x:0,y:0,width:1024,height:1024} }); }
  const q = await b.newPage({ viewport:{width:1200,height:630} });
  await q.setContent(og); await q.screenshot({ path:'og.png' });
  await b.close();
})();
