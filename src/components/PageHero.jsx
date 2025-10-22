"use client";

export default function PageHero({
  title,
  subtitle,
  image = "/hero.jpg",
  height = "50vh", // ajuste fácil por página se quiser
}) {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center text-center"
      style={{ height }}
    >
      {/* Fundo fixo (sem parallax aqui para simplicidade e leveza) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* Camada escura + gradiente */}
      <div className="absolute inset-0 bg-[#0f1724]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1724]/55 to-[#0f1724]/85" />

      {/* Conteúdo com cartão */}
      <div className="relative z-10 px-6">
        <div className="inline-block rounded-2xl bg-black/35 backdrop-blur-[2px] px-6 py-4 ring-1 ring-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.55)]">
          <h1
            className="text-3xl md:text-5xl font-serif font-bold text-white"
            style={{ textShadow: "0 3px 14px rgba(0,0,0,0.9)" }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="mt-3 text-base md:text-lg italic text-gray-50"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.75)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
