"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

const ITEMS = [
  { label: "Extended Reality", icon: "/assets/comp-extended-reality.svg" },
  { label: "Enterprise Automation", icon: "/assets/comp-enterprise-automation.svg" },
  { label: "Robotics", icon: "/assets/comp-robotics.svg" },
  { label: "Quantum Computing", icon: "/assets/comp-quantum-computing.svg" },
  { label: "Block Chain", icon: "/assets/comp-block-chain.svg" },
  { label: "IoT", icon: "/assets/comp-iot.svg" },
];

function Item({ i, progress, label, icon }: { i: number; progress: MotionValue<number>; label: string; icon: string }) {
  const left = i % 2 === 0;
  const start = 0.18 + i * 0.07;
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  const x = useTransform(progress, [start, start + 0.12], [left ? 40 : -40, 0]);
  return (
    <motion.li style={{ opacity, x }} className={`flex items-center gap-3 ${left ? "flex-row-reverse justify-self-end text-right" : "justify-self-start"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" width={56} height={56} className="size-[clamp(44px,3.6vw,56px)]" />
      <span className="text-[clamp(14px,1.1vw,16px)] font-medium text-navy">{label}</span>
    </motion.li>
  );
}

/** "Our competencies": the rocket opens as you scroll and the six competencies fly out.
 *  Desktop: scroll-driven (sticky). Phones/tablets and reduced-motion: a static vertical layout. */
export function Competencies() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const topY = useTransform(scrollYProgress, [0.05, 0.55], ["0%", "-115%"]);
  const botY = useTransform(scrollYProgress, [0.05, 0.55], ["0%", "115%"]);
  const midScale = useTransform(scrollYProgress, [0.05, 0.4], [1, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section aria-labelledby="competencies-title">
      {/* Desktop, scroll-driven */}
      {!reduce && (
        <div ref={ref} className="relative hidden h-[220vh] lg:block">
          <div className="sticky top-[var(--header-h)] flex h-[calc(100vh-var(--header-h))] items-center justify-center overflow-hidden">
            <div className="relative flex h-full max-h-[760px] w-full max-w-[900px] items-center justify-center">
              <motion.img style={{ y: topY }} src="/assets/r-top.svg" alt="" aria-hidden width={55} height={195} className="absolute left-1/2 top-[8%] h-[24%] w-auto -translate-x-1/2" />
              <motion.img style={{ scaleY: midScale }} src="/assets/r-mid.svg" alt="" aria-hidden width={101} height={260} className="absolute left-1/2 top-[32%] h-[34%] w-auto -translate-x-1/2 origin-center" />
              <motion.img style={{ y: botY }} src="/assets/r-bottom.svg" alt="" aria-hidden width={69} height={156} className="absolute bottom-[8%] left-1/2 h-[22%] w-auto -translate-x-1/2" />
              <motion.h2 id="competencies-title" style={{ opacity: titleOpacity }} className="t-h2 relative z-10 whitespace-nowrap">
                Our competencies
              </motion.h2>
              <ul className="absolute inset-x-0 top-1/2 grid -translate-y-1/2 grid-cols-2 gap-x-[clamp(220px,24vw,320px)] gap-y-[clamp(40px,6vh,72px)] px-4">
                {ITEMS.map((it, i) => (
                  <Item key={it.label} i={i} progress={scrollYProgress} {...it} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Mobile / tablet / reduced motion: static, fluid layout */}
      <div className={`container-x section-y ${reduce ? "" : "lg:hidden"}`}>
        <h2 id={reduce ? "competencies-title" : undefined} className="t-h2 reveal text-center">
          Our competencies
        </h2>
        <div className="relative mx-auto mt-10 max-w-[420px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/r-top.svg" alt="" aria-hidden width={55} height={195} className="mx-auto h-[150px] w-auto" />
          <ul className="my-4 space-y-5">
            {ITEMS.map((it, i) => (
              <li key={it.label} className={`reveal grid grid-cols-[1fr_auto_1fr] items-center gap-3`}>
                <span className={`text-sm font-medium text-navy ${i % 2 === 0 ? "text-right" : "invisible"}`}>{i % 2 === 0 ? it.label : ""}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.icon} alt="" width={64} height={64} className="size-16" />
                <span className={`text-sm font-medium text-navy ${i % 2 === 1 ? "" : "invisible"}`}>{i % 2 === 1 ? it.label : ""}</span>
              </li>
            ))}
          </ul>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/r-bottom.svg" alt="" aria-hidden width={69} height={156} className="mx-auto h-[110px] w-auto" />
        </div>
      </div>
    </section>
  );
}
