"use client";

import { useMemo } from "react";
import { m } from "motion/react";
import { MapPin, Phone } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { FadeIn } from "@/components/motion/fx";

type Area = { name: string; x: number; y: number; hq?: boolean };

const VW = 1000;
const VH = 640;

/**
 * A drawn map, not an embed: no third-party requests, no cookies, and it
 * matches the page. A dot grid for the land, the Columbia across the top and
 * the Willamette running north through the city, a coverage ring that draws
 * itself in, and a pulse on every town we serve. Towns are also listed in
 * plain text, which is what search engines and screen readers need.
 */
export function ServiceArea({
  heading,
  sub,
  areas,
  phone,
}: {
  heading: string;
  sub: string;
  areas: Area[];
  phone: { display: string; href: string };
}) {
  const dots = useMemo(() => {
    const out: { x: number; y: number; o: number }[] = [];
    for (let y = 16; y < VH; y += 24) {
      for (let x = 16; x < VW; x += 24) {
        const dx = (x - VW / 2) / (VW * 0.55);
        const dy = (y - VH / 2) / (VH * 0.6);
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 1) out.push({ x, y, o: 0.16 * (1 - d * 0.85) });
      }
    }
    return out;
  }, []);

  const hq = areas.find((a) => a.hq) ?? areas[0];
  const cx = (hq.x / 100) * VW;
  const cy = (hq.y / 100) * VH;

  return (
    <section id="service-area" className="py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-4">
            <FadeIn>
              <h2 className="text-section text-mc-navy">{heading}</h2>
              <p className="mt-5 max-w-[42ch] text-body text-mc-muted">{sub}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5">
                {areas.map((a) => (
                  <li key={a.name} className="flex items-center gap-2 text-[0.9375rem] text-mc-navy">
                    <MapPin aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0 text-mc-ember" />
                    {a.name}
                  </li>
                ))}
              </ul>
              <a
                href={phone.href}
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-mc-line bg-white px-5 text-sm text-mc-navy transition-[border-color,box-shadow] duration-300 ease-mc hover:border-mc-navy/30 hover:shadow-card"
              >
                <Phone aria-hidden="true" strokeWidth={2} className="size-4 text-mc-ember" />
                Not listed? Call <span className="font-semibold tabular-nums">{phone.display}</span>
              </a>
            </FadeIn>
          </div>

          <FadeIn effect="scale" className="lg:col-span-8">
            <div className="overflow-hidden rounded-[2rem] border border-mc-line bg-gradient-to-br from-white to-mc-ice shadow-card">
              <svg viewBox={`0 0 ${VW} ${VH}`} className="block h-auto w-full" role="img" aria-label="Map of the Portland metro showing the towns we serve">
                {dots.map((d, i) => (
                  <circle key={i} cx={d.x} cy={d.y} r={1.6} fill="#0c1a26" opacity={d.o} />
                ))}

                {/* Columbia River */}
                <m.path
                  d="M -20 118 C 180 96, 300 150, 470 122 S 760 70, 1020 132"
                  fill="none"
                  stroke="#bfe0f5"
                  strokeWidth={30}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Willamette River */}
                <m.path
                  d="M 452 660 C 470 560, 430 500, 488 420 S 520 260, 505 132"
                  fill="none"
                  stroke="#bfe0f5"
                  strokeWidth={16}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
                <text x={930} y={100} textAnchor="end" className="fill-mc-frost text-[15px] italic" style={{ fontFamily: "var(--font-display)" }}>
                  Columbia River
                </text>
                <text x={470} y={600} textAnchor="end" className="fill-mc-frost text-[15px] italic" style={{ fontFamily: "var(--font-display)" }}>
                  Willamette
                </text>

                {/* Coverage ring */}
                <m.circle
                  cx={cx}
                  cy={cy}
                  r={330}
                  fill="rgba(43,132,198,0.05)"
                  stroke="#2b84c6"
                  strokeWidth={1.5}
                  strokeDasharray="6 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />

                {areas.map((a, i) => {
                  const x = (a.x / 100) * VW;
                  const y = (a.y / 100) * VH;
                  return (
                    <m.g
                      key={a.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <circle
                        className="ping"
                        cx={x}
                        cy={y}
                        r={a.hq ? 16 : 11}
                        fill={a.hq ? "#e8622b" : "#2b84c6"}
                        opacity={0.35}
                        style={{ "--d": `${i * 0.3}s` } as React.CSSProperties}
                      />
                      <circle cx={x} cy={y} r={a.hq ? 9 : 6} fill={a.hq ? "#e8622b" : "#0c1a26"} stroke="#fff" strokeWidth={3} />
                      <text
                        x={x}
                        y={y - (a.hq ? 24 : 18)}
                        textAnchor="middle"
                        className={a.hq ? "fill-mc-navy" : "fill-mc-navy max-sm:hidden"}
                        style={{ fontSize: a.hq ? 26 : 17, fontWeight: a.hq ? 600 : 500 }}
                      >
                        {a.name}
                      </text>
                    </m.g>
                  );
                })}
              </svg>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
