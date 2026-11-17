import Image from "next/image";

/** "Building NeuSix with outcome-driven talent shaped @" + company logos. */
export function TrustStrip({ dark = false }: { dark?: boolean }) {
  return (
    <section aria-labelledby="talent-title" className={`relative isolate overflow-hidden ${dark ? "bg-ink text-paper" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/bal.svg" alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
      <div className="container-x reveal flex flex-col items-center py-[clamp(64px,7vw,112px)] text-center">
        <h2 id="talent-title" className="t-h4 max-w-[22ch] sm:max-w-[34ch]">
          Building NeuSix with outcome-driven talent shaped @
        </h2>
        <Image
          src={dark ? "/assets/logo-home-dark.png" : "/assets/logo-home.png"}
          alt="Apple, Google, Microsoft, Deloitte, Datamatics, Bank of America"
          width={3244}
          height={600}
          sizes="(min-width: 1024px) 600px, 90vw"
          className="mt-10 h-auto w-full max-w-[600px]"
        />
      </div>
    </section>
  );
}
