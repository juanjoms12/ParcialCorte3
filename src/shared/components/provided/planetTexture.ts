// ============================================================
// PROVIDED HELPER - DO NOT MODIFY.
// Generates a simple procedural surface texture for each planet
// so they look closer to the real ones (not photorealistic).
// ============================================================

import { CanvasTexture, SRGBColorSpace } from "three";
import type { Planet } from "@/types/planet";

function rng(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function blobs(ctx: CanvasRenderingContext2D, rand: () => number, n: number, color: string, min: number, max: number, w: number, h: number, yMin = 0, yMax = 1) {
  ctx.fillStyle = color;
  for (let i = 0; i < n; i++) {
    const x = rand() * w;
    const y = (yMin + rand() * (yMax - yMin)) * h;
    const r = min + rand() * (max - min);
    for (const dx of [-w, 0, w]) {
      ctx.beginPath();
      ctx.ellipse(x + dx, y, r, r * (0.5 + rand() * 0.5), rand() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function bands(ctx: CanvasRenderingContext2D, rand: () => number, colors: string[], w: number, h: number, wobble: number) {
  const rows = 22;
  for (let i = 0; i < rows; i++) {
    ctx.fillStyle = colors[Math.floor(rand() * colors.length)];
    const y0 = (i / rows) * h;
    ctx.beginPath();
    ctx.moveTo(0, y0);
    for (let x = 0; x <= w; x += 16) ctx.lineTo(x, y0 + Math.sin(x * 0.03 + i) * wobble);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();
  }
}

export function createPlanetTexture(planet: Planet): CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const w = 512;
  const h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const rand = rng(planet.id);

  ctx.fillStyle = planet.color;
  ctx.fillRect(0, 0, w, h);

  switch (planet.id) {
    case "earth":
      ctx.fillStyle = "#1f5fb8";
      ctx.fillRect(0, 0, w, h);
      blobs(ctx, rand, 14, "#3f8a3f", 18, 52, w, h, 0.15, 0.85);
      blobs(ctx, rand, 8, "#c9b27a", 8, 22, w, h, 0.25, 0.75);
      blobs(ctx, rand, 26, "rgba(255,255,255,0.55)", 8, 30, w, h);
      ctx.fillStyle = "#f2f6ff";
      ctx.fillRect(0, 0, w, 14);
      ctx.fillRect(0, h - 14, w, 14);
      break;
    case "mars":
      blobs(ctx, rand, 22, "#a8442b", 10, 38, w, h);
      blobs(ctx, rand, 14, "#e8845f", 8, 24, w, h);
      ctx.fillStyle = "#f4efe8";
      ctx.fillRect(0, 0, w, 10);
      ctx.fillRect(0, h - 10, w, 10);
      break;
    case "mercury":
      blobs(ctx, rand, 40, "#8c8379", 4, 16, w, h);
      blobs(ctx, rand, 25, "#cfc6ba", 3, 9, w, h);
      break;
    case "venus":
      bands(ctx, rand, ["#e3b67a", "#d19b55", "#f0cf9a"], w, h, 14);
      blobs(ctx, rand, 20, "rgba(255,240,200,0.35)", 15, 45, w, h);
      break;
    case "jupiter":
      bands(ctx, rand, ["#d8a77a", "#b9825a", "#efd9bd", "#a56a45"], w, h, 6);
      ctx.fillStyle = "#b5472f";
      ctx.beginPath();
      ctx.ellipse(w * 0.62, h * 0.62, 26, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "saturn":
      bands(ctx, rand, ["#e8d08a", "#d4b46c", "#f3e4b3"], w, h, 4);
      break;
    case "uranus":
      bands(ctx, rand, ["#8fe3e8", "#7ad4da", "#a6eef2"], w, h, 3);
      break;
    case "neptune":
      bands(ctx, rand, ["#4a6fe0", "#3a5bc4", "#5d83f0"], w, h, 5);
      blobs(ctx, rand, 4, "rgba(20,30,90,0.6)", 12, 24, w, h, 0.3, 0.7);
      blobs(ctx, rand, 6, "rgba(255,255,255,0.4)", 6, 14, w, h, 0.3, 0.7);
      break;
    default:
      blobs(ctx, rand, 20, "rgba(0,0,0,0.2)", 10, 30, w, h);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
