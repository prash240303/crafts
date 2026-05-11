"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 2000;
const ROWS = 2000;
const COUNT = COLS * ROWS;

// ── Vertex shader ──────────────────────────────────────────────────────────
const VERT = `#version 300 es
precision highp float;

in vec2 a_uv;

uniform sampler2D u_tex;
uniform vec2      u_mouse;
uniform float     u_vel;
uniform float     u_aspect;
uniform float     u_time;

out vec4 v_color;

void main() {
  v_color = texture(u_tex, a_uv);

  vec2 pos = vec2(a_uv.x * 2.0 - 1.0, 1.0 - a_uv.y * 2.0);
  vec2 m   = vec2(u_mouse.x * 2.0 - 1.0, 1.0 - u_mouse.y * 2.0);

  vec2  diff  = pos - m;
  vec2  diffS = vec2(diff.x * u_aspect, diff.y);
  float dist  = max(length(diffS), 0.001);

  vec2 dir = diffS / dist;
  dir.x /= u_aspect;

  float force    = u_vel * u_vel;
  float ripple   = sin(dist * 10.0 - u_time * 7.0);
  float envelope = exp(-dist * 4.0);

  pos += dir * force * ripple * envelope * 0.18;

  gl_Position  = vec4(pos, 0.0, 1.0);
  gl_PointSize = 1.5;
}`;

// ── Fragment shader ────────────────────────────────────────────────────────
const FRAG = `#version 300 es
precision mediump float;

in  vec4 v_color;
out vec4 outColor;

void main() {
  float luma = dot(v_color.rgb, vec3(0.299, 0.587, 0.114));
  if (luma < 0.015) discard;
  outColor = v_color;
}`;

// ── Hero canvas drawing ────────────────────────────────────────────────────
// Draws the SaaS hero layout directly onto an offscreen canvas.
// This feeds the WebGL particle texture — no SVG/font-loading issues.
function drawHeroToCanvas(W: number, H: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  const sans = "-apple-system,'Helvetica Neue',Arial,sans-serif";

  // Background (slate-950)
  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, W, H);

  // ── Ambient glows ─────────────────────────────────────────────────────────
  const glow = (x: number, y: number, r: number, col: string, alpha: number) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, col.replace(")", `,${alpha})`).replace("rgb", "rgba"));
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  };
  glow(W * 0.85, H * 0.1,  W * 0.35, "rgb(37,99,235)",   0.18);
  glow(W * 0.5,  H * 0.95, W * 0.3,  "rgb(8,145,178)",   0.14);
  glow(W * 0.05, H * 0.5,  W * 0.2,  "rgb(67,56,202)",   0.12);

  const lx = W * 0.06; // left column x
  const rx = W * 0.58; // right column x

  // ── Badge ─────────────────────────────────────────────────────────────────
  const badgeY = H * 0.22;
  const badgeText = "⚡  AI companies trust Darvin";
  ctx.font = `500 ${Math.round(H * 0.018)}px ${sans}`;
  const bw = ctx.measureText(badgeText).width + 28;
  const bh = Math.round(H * 0.038);
  ctx.strokeStyle = "#1d4ed8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(lx, badgeY - bh / 2, bw, bh, bh / 2);
  else ctx.rect(lx, badgeY - bh / 2, bw, bh);
  ctx.stroke();
  ctx.fillStyle = "#93c5fd";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(badgeText, lx + 14, badgeY);

  // ── H1 line 1 ─────────────────────────────────────────────────────────────
  ctx.font = `700 ${Math.round(H * 0.074)}px ${sans}`;
  ctx.fillStyle = "#e2e8f0";
  ctx.fillText("Billing that scales", lx, H * 0.355);

  // ── H1 line 2 (cyan gradient → flat colour for canvas) ────────────────────
  ctx.fillStyle = "#22d3ee";
  ctx.fillText("with your AI", lx, H * 0.455);

  // ── Description ───────────────────────────────────────────────────────────
  ctx.font = `400 ${Math.round(H * 0.022)}px ${sans}`;
  ctx.fillStyle = "#94a3b8";
  const desc = [
    "From credit-based billing and usage metering to subscriptions",
    "and global payments. Everything AI and SaaS companies need",
    "to monetize, without building billing infrastructure.",
  ];
  desc.forEach((line, i) => ctx.fillText(line, lx, H * 0.535 + i * Math.round(H * 0.032)));

  // ── Buttons ───────────────────────────────────────────────────────────────
  const btnY = H * 0.68;
  const btnH = Math.round(H * 0.056);
  const btnW1 = Math.round(W * 0.18);
  const btnW2 = Math.round(W * 0.15);
  const gap   = Math.round(W * 0.018);

  // Button 1 — solid blue
  const grad = ctx.createLinearGradient(lx, 0, lx + btnW1, 0);
  grad.addColorStop(0, "#2563eb");
  grad.addColorStop(1, "#0891b2");
  ctx.fillStyle = grad;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(lx, btnY - btnH / 2, btnW1, btnH, 8);
  else ctx.rect(lx, btnY - btnH / 2, btnW1, btnH);
  ctx.fill();
  ctx.font = `600 ${Math.round(H * 0.02)}px ${sans}`;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText("Get Started Free →", lx + btnW1 / 2, btnY);

  // Button 2 — outlined
  ctx.textAlign = "left";
  const b2x = lx + btnW1 + gap;
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(b2x, btnY - btnH / 2, btnW2, btnH, 8);
  else ctx.rect(b2x, btnY - btnH / 2, btnW2, btnH);
  ctx.stroke();
  ctx.font = `600 ${Math.round(H * 0.02)}px ${sans}`;
  ctx.fillStyle = "#e2e8f0";
  ctx.textAlign = "center";
  ctx.fillText("Book a demo", b2x + btnW2 / 2, btnY);

  // ── Bullet points ─────────────────────────────────────────────────────────
  ctx.textAlign = "left";
  ctx.font = `400 ${Math.round(H * 0.018)}px ${sans}`;
  ctx.fillStyle = "#475569";
  ["No credit card required", "Used by 500+ AI-first companies"].forEach((t, i) => {
    const by = H * 0.76 + i * Math.round(H * 0.034);
    ctx.fillStyle = "#1d4ed8";
    ctx.beginPath();
    ctx.arc(lx + 4, by, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#475569";
    ctx.fillText(t, lx + 16, by);
  });

  // ── Right card ────────────────────────────────────────────────────────────
  const cardX = rx;
  const cardY = H * 0.12;
  const cardW = W * 0.35;
  const cardH = H * 0.76;
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1;
  ctx.fillStyle = "rgba(15,23,42,0.7)";
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(cardX, cardY, cardW, cardH, 16);
  else ctx.rect(cardX, cardY, cardW, cardH);
  ctx.fill();
  ctx.stroke();

  const cp = 32; // card padding
  const ci = cardX + cp;

  // Card header
  ctx.font = `600 ${Math.round(H * 0.016)}px ${sans}`;
  ctx.fillStyle = "#94a3b8";
  ctx.textAlign = "left";
  ctx.fillText("USAGE METRICS", ci, cardY + cp + 8);

  // Progress bars
  const metrics = [
    { label: "API Calls",         pct: 0.75, delta: "+24%" },
    { label: "Tokens Processed",  pct: 0.70, delta: "+18%" },
    { label: "Active Users",      pct: 0.83, delta: "+42%" },
  ];
  const barW = cardW - cp * 2;
  metrics.forEach(({ label, pct, delta }, i) => {
    const my = cardY + cp * 2.8 + i * (H * 0.11);
    ctx.font = `400 ${Math.round(H * 0.016)}px ${sans}`;
    ctx.fillStyle = "#64748b";
    ctx.textAlign = "left";
    ctx.fillText(label, ci, my);
    ctx.fillStyle = "#4ade80";
    ctx.textAlign = "right";
    ctx.fillText(delta, cardX + cardW - cp, my);
    // track
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(ci, my + 10, barW, 8, 4);
    else ctx.rect(ci, my + 10, barW, 8);
    ctx.fill();
    // fill
    const barGrad = ctx.createLinearGradient(ci, 0, ci + barW * pct, 0);
    barGrad.addColorStop(0, "#3b82f6");
    barGrad.addColorStop(1, "#06b6d4");
    ctx.fillStyle = barGrad;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(ci, my + 10, barW * pct, 8, 4);
    else ctx.rect(ci, my + 10, barW * pct, 8);
    ctx.fill();
  });

  // Divider
  const divY = cardY + cardH - H * 0.18;
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(ci, divY);
  ctx.lineTo(cardX + cardW - cp, divY);
  ctx.stroke();

  // Revenue
  ctx.font = `400 ${Math.round(H * 0.016)}px ${sans}`;
  ctx.fillStyle = "#64748b";
  ctx.textAlign = "left";
  ctx.fillText("Monthly Revenue", ci, divY + 22);
  ctx.font = `700 ${Math.round(H * 0.042)}px ${sans}`;
  const revGrad = ctx.createLinearGradient(ci, 0, ci + 120, 0);
  revGrad.addColorStop(0, "#60a5fa");
  revGrad.addColorStop(1, "#22d3ee");
  ctx.fillStyle = revGrad;
  ctx.fillText("$127,540", ci, divY + 22 + Math.round(H * 0.054));

  return c;
}

// ── Hero HTML overlay ──────────────────────────────────────────────────────
// Text is transparent so particles show through. Buttons are interactive.
function HeroOverlay() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Ambient glows — purely decorative, pointer-events off */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-600/20 rounded-full filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-600/15 rounded-full filter blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-between px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* ── Left column ── */}
        <div className="flex-1 max-w-2xl pr-8 md:pr-12">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-blue-500/30">
            <svg className="w-4 h-4 text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium text-transparent">AI companies trust Darvin</span>
          </div>

          {/* H1 */}
          <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            <span className="text-transparent">Billing that scales</span>
            <br />
            <span className="text-transparent">with your AI</span>
          </h1>

          {/* Description */}
          <p className="mb-8 text-lg md:text-xl text-transparent leading-relaxed max-w-xl">
            From credit-based billing and usage metering to subscriptions and global payments.
            Everything AI and SaaS companies need to monetize,{" "}
            <span className="text-transparent font-semibold">without building billing infrastructure.</span>
          </p>

          {/* Buttons — real interactive elements */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => alert("Get Started!")}
              className="px-8 py-4 bg-transparent border border-blue-500/50 rounded-lg font-semibold text-transparent transition-all cursor-pointer hover:border-blue-400 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                Get Started Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            <button
              onClick={() => alert("Book a demo")}
              className="px-8 py-4 border border-slate-600/50 rounded-lg font-semibold text-transparent transition-all cursor-pointer hover:border-slate-400 active:scale-95"
            >
              Book a demo
            </button>
          </div>

          {/* Bullets */}
          <div className="space-y-3 text-sm text-transparent">
            <p className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-transparent rounded-full border border-blue-500/40" />
              No credit card required
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-transparent rounded-full border border-blue-500/40" />
              Used by 500+ AI-first companies
            </p>
          </div>
        </div>

        {/* ── Right card — transparent so particles show through ── */}
        <div className="hidden lg:flex flex-1 items-center justify-center relative">
          <div className="relative w-96 h-[26rem]">
            <div className="absolute inset-0 rounded-2xl bg-transparent border border-white/5 overflow-hidden">
              <div className="relative h-full flex flex-col p-8 justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-transparent mb-6 tracking-wider">USAGE METRICS</h3>
                  <div className="space-y-4">
                    {[
                      { label: "API Calls",        delta: "+24%" },
                      { label: "Tokens Processed", delta: "+18%" },
                      { label: "Active Users",      delta: "+42%" },
                    ].map(({ label, delta }) => (
                      <div key={label} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-transparent">{label}</span>
                          <span className="text-xs font-semibold text-transparent">{delta}</span>
                        </div>
                        <div className="h-2 bg-transparent rounded-full overflow-hidden border border-white/5" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <p className="text-xs text-transparent mb-2">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-transparent">$127,540</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── WebGL helpers ──────────────────────────────────────────────────────────
function compileShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(s) ?? "shader compile error");
  return s;
}

function buildProgram(gl: WebGL2RenderingContext, vert: string, frag: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compileShader(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(p, compileShader(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(p) ?? "program link error");
  return p;
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function DistortionPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dims, setDims] = useState({ W: 0, H: 0 });

  useEffect(() => {
    setDims({ W: window.innerWidth, H: window.innerHeight });
  }, []);

  useEffect(() => {
    const { W, H } = dims;
    if (!W || !H || !canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width  = W;
    canvas.height = H;

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    if (!gl) { console.error("WebGL2 not supported"); return; }

    let raf = 0;
    let mounted = true;

    let mx = 0.5, my = 0.5, smoothVel = 0;
    let prevX = W / 2, prevY = H / 2, prevT = performance.now();

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt  = Math.max(now - prevT, 1);
      const spd = Math.hypot(e.clientX - prevX, e.clientY - prevY) / dt;
      const tgt = Math.min(spd * 0.55, 1.0);
      smoothVel += (tgt - smoothVel) * 0.35;
      mx = e.clientX / W;
      my = e.clientY / H;
      prevX = e.clientX; prevY = e.clientY; prevT = now;
    };
    window.addEventListener("mousemove", onMove);

    // Rasterise the SaaS hero layout into the particle texture
    const offscreen = drawHeroToCanvas(W, H);

    // ── Program ─────────────────────────────────────────────────────────────
    const prog = buildProgram(gl, VERT, FRAG);
    gl.useProgram(prog);

    // ── Particle UV grid ────────────────────────────────────────────────────
    const uvs = new Float32Array(COUNT * 2);
    let idx = 0;
    for (let y = 0; y < ROWS; y++) {
      const v = y / (ROWS - 1);
      for (let x = 0; x < COLS; x++) {
        uvs[idx++] = x / (COLS - 1);
        uvs[idx++] = v;
      }
    }

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    const aUV = gl.getAttribLocation(prog, "a_uv");
    gl.enableVertexAttribArray(aUV);
    gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);

    // ── Texture ──────────────────────────────────────────────────────────────
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreen);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // ── Uniforms ─────────────────────────────────────────────────────────────
    gl.uniform1i(gl.getUniformLocation(prog, "u_tex"),    0);
    gl.uniform1f(gl.getUniformLocation(prog, "u_aspect"), W / H);
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uVel   = gl.getUniformLocation(prog, "u_vel");
    const uTime  = gl.getUniformLocation(prog, "u_time");

    gl.viewport(0, 0, W, H);
    gl.clearColor(0.008, 0.012, 0.024, 1);
    const t0 = performance.now();

    const render = () => {
      if (!mounted) return;
      smoothVel *= 0.985;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uVel,   smoothVel);
      gl.uniform1f(uTime,  (performance.now() - t0) / 1000);
      gl.drawArrays(gl.POINTS, 0, COUNT);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [dims]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020617]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1]"
      />
      {dims.W > 0 && (
        <div className="absolute inset-0 z-[2]">
          <HeroOverlay />
        </div>
      )}
    </div>
  );
}
