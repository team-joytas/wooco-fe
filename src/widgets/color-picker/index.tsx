'use client';
import { useState, useRef } from "react";

export default function ColorPicker() {
  const [angle, setAngle] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = wheelRef.current?.getBoundingClientRect();
    if (!rect) return;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    let deg = Math.atan2(dy, dx) * (180 / Math.PI);
    if (deg < -90) deg += 360;

    setAngle(deg);
  };

  const hue = Math.round(angle) + 90;
  const hex = hslToHex(hue);
  return (
    <div
      ref={wheelRef}
      className='relative w-[240px] h-[240px] rounded-full select-none flex items-center justify-center'
      onMouseMove={(e) => e.buttons === 1 && handleMouseMove(e)}
      onClick={handleMouseMove}
    >
      {/* Color Wheel */}
      <div
        className='absolute inset-0 rounded-full'
        style={{
          background: `
            conic-gradient(
              hsl(0, 100%, 50%),
              hsl(60, 100%, 50%),
              hsl(120, 100%, 50%),
              hsl(180, 100%, 50%),
              hsl(240, 100%, 50%),
              hsl(300, 100%, 50%),
              hsl(360, 100%, 50%)
            )
          `,
        }}
      ></div>

      {/* Donut hole */}
      <div className='absolute inset-[16px] bg-white rounded-full'></div>
      <div className='flex justify-center items-center absolute inset-[50px] rounded-full text-white text-main01' style={{ backgroundColor: `${hex}`}}>
        {hex.toUpperCase()}
      </div>

      {/* Slider knob */}
      <div
        className='relative w-8 h-8 bg-white border-1 border-black rounded-full z-20 drop-shadow-[0_0_13.7px_rgba(0,0,0,0.27)]'
        style={{
          transform: `rotate(${angle}deg) translateX(128px) translate(-50%, -50%)`,
          transformOrigin: 'center center',
        }}
      >
        <div className='absolute inset-1 rounded-full' style={{ backgroundColor: `${hex}`}}></div>
      </div>
    </div>
  )
}

const hslToHex = (h : number, s = 100, l = 50) => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = function (p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = function (x) {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
}
