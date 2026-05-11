'use client';

import { Squircle } from '@cornerkit/react';
import React, { forwardRef, useEffect, useRef, CSSProperties, ReactNode } from 'react';

interface Props {
  radius?: number;
  smoothing?: number;
  overflow?: 'hidden' | 'visible' | 'auto' | 'scroll';
  border?: { width: number; color: string };
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

// Mirrors cornerkit's internal squircle path generation so clip-path matches exactly.
function toRad(deg: number) { return deg * Math.PI / 180; }
function r2(n: number) { return Math.round(100 * n) / 100; }

interface CP { a: number; b: number; c: number; d: number; p: number; arc: number; r: number; }

function cornerParams(radius: number, smoothing: number, maxP: number): CP {
  const p = (1 + smoothing) * radius;
  const alpha = 90 * (1 - smoothing);
  const arc = Math.sin(toRad(alpha / 2)) * radius * Math.sqrt(2);
  const beta = 45 * smoothing;
  const c = radius * Math.tan(toRad((90 - alpha) / 2 / 2)) * Math.cos(toRad(beta));
  const d = c * Math.tan(toRad(beta));
  const b = (p - arc - c - d) / 3;
  const a = 2 * b;
  if (p > maxP) {
    const scale = maxP / p;
    return { a: a * scale, b: b * scale, c: c * scale, d: d * scale, p: maxP, arc: arc * scale, r: radius };
  }
  return { a, b, c, d, p, arc, r: radius };
}

function squirclePath(w: number, h: number, radius: number, smoothing = 0.6): string {
  if (w <= 0 || h <= 0 || radius <= 0)
    return `M 0,0 L ${r2(w)},0 L ${r2(w)},${r2(h)} L 0,${r2(h)} Z`;

  const rad = Math.min(radius, w / 2, h / 2);
  const s = Math.max(0, Math.min(1, smoothing));
  const cp = cornerParams(rad, s, Math.min(w / 2, h / 2));

  const tr = ({ r, a, b, c, d, arc, p }: CP) => {
    if (r === 0) return `l ${r2(p)} 0`;
    const arc_ = arc > 0.01 ? `a ${r2(r)} ${r2(r)} 0 0 1 ${r2(arc)} ${r2(arc)}` : '';
    return `c ${r2(a)} 0 ${r2(a+b)} 0 ${r2(a+b+c)} ${r2(d)} ${arc_} c ${r2(d)} ${r2(c)} ${r2(d)} ${r2(b+c)} ${r2(d)} ${r2(a+b+c)}`;
  };
  const br = ({ r, a, b, c, d, arc, p }: CP) => {
    if (r === 0) return `l 0 ${r2(p)}`;
    const arc_ = arc > 0.01 ? `a ${r2(r)} ${r2(r)} 0 0 1 ${r2(-arc)} ${r2(arc)}` : '';
    return `c 0 ${r2(a)} 0 ${r2(a+b)} ${r2(-d)} ${r2(a+b+c)} ${arc_} c ${r2(-c)} ${r2(d)} ${r2(-b-c)} ${r2(d)} ${r2(-a-b-c)} ${r2(d)}`;
  };
  const bl = ({ r, a, b, c, d, arc, p }: CP) => {
    if (r === 0) return `l ${r2(-p)} 0`;
    const arc_ = arc > 0.01 ? `a ${r2(r)} ${r2(r)} 0 0 1 ${r2(-arc)} ${r2(-arc)}` : '';
    return `c ${r2(-a)} 0 ${r2(-a-b)} 0 ${r2(-a-b-c)} ${r2(-d)} ${arc_} c ${r2(-d)} ${r2(-c)} ${r2(-d)} ${r2(-b-c)} ${r2(-d)} ${r2(-a-b-c)}`;
  };
  const tl = ({ r, a, b, c, d, arc, p }: CP) => {
    if (r === 0) return `l 0 ${r2(-p)}`;
    const arc_ = arc > 0.01 ? `a ${r2(r)} ${r2(r)} 0 0 1 ${r2(arc)} ${r2(-arc)}` : '';
    return `c 0 ${r2(-a)} 0 ${r2(-a-b)} ${r2(d)} ${r2(-a-b-c)} ${arc_} c ${r2(c)} ${r2(-d)} ${r2(b+c)} ${r2(-d)} ${r2(a+b+c)} ${r2(-d)}`;
  };

  return [
    `M ${r2(w - cp.p)} 0`, tr(cp),
    `L ${r2(w)} ${r2(h - cp.p)}`, br(cp),
    `L ${r2(cp.p)} ${r2(h)}`, bl(cp),
    `L 0 ${r2(cp.p)}`, tl(cp),
    'Z',
  ].join(' ').replace(/\s+/g, ' ').trim();
}

export const SquircleWithOverflow = forwardRef<HTMLDivElement, Props>(
  ({ radius = 20, smoothing = 0.6, border, overflow = 'hidden', style, className, children, ...props }, forwardedRef) => {
    // useRef without generic → MutableRefObject (writable .current)
    const outerRef = useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;
    const innerRef = useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;

    useEffect(() => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;

      const update = () => {
        const w = outer.offsetWidth;
        const h = outer.offsetHeight;
        if (w > 0 && h > 0)
          inner.style.clipPath = `path('${squirclePath(w, h, radius, smoothing)}')`;
      };

      update();
      const ro = new ResizeObserver(update);
      ro.observe(outer);
      return () => ro.disconnect();
    }, [radius, smoothing]);

    const setOuterRef = (el: HTMLDivElement | null) => {
      outerRef.current = el;
      if (typeof forwardedRef === 'function') forwardedRef(el);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      else if (forwardedRef) (forwardedRef as any).current = el;
    };

    return (
      <Squircle
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={setOuterRef as any}
        radius={radius}
        smoothing={smoothing}
        border={border}
        style={{ position: 'relative', ...style }}
        className={className}
        {...props}
      >
        <div
          ref={innerRef}
          style={{ position: 'absolute', inset: 0, overflow }}
        >
          {children}
        </div>
      </Squircle>
    );
  }
);

SquircleWithOverflow.displayName = 'SquircleWithOverflow';
