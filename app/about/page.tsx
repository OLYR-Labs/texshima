import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Discover the story, philosophy and everyday approach behind TEXSHIMA.",
};

export default function About() {
  return (
    <main className="overflow-hidden">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[72vh] overflow-hidden rounded-b-[2.5rem] bg-black text-white">
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2200&q=90"
          alt="TEXSHIMA fashion editorial"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />

        <div className="relative z-10 flex min-h-[72vh] items-end page-pad pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" />
              The TEXSHIMA story
            </div>

            <h1 className="display max-w-5xl text-6xl font-semibold leading-[0.88] tracking-[-0.05em] sm:text-7xl md:text-8xl lg:text-[9rem]">
              Clothes for
              <br />
              <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                everyday life.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              TEXSHIMA is built around a simple idea — clothing should feel
              effortless, look considered, and fit naturally into the way you
              live.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="page-pad section-pad">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              Who we are
            </p>

            <h2 className="display mt-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Less noise.
              <br />
              More intention.
            </h2>
          </div>

          <div className="space-y-6 text-sm leading-8 text-muted sm:text-base">
            <p>
              TEXSHIMA was created for people who want their clothes to work as
              hard as they do. We focus on clean silhouettes, versatile pieces
              and details that feel right without demanding attention.
            </p>

            <p>
              We believe good clothing doesn&apos;t need to be complicated.
              The best pieces are the ones you reach for again and again —
              whether you&apos;re heading out, staying in, or somewhere in
              between.
            </p>

            <p>
              Every collection is guided by the same philosophy: thoughtful
              design, everyday comfort and a modern point of view.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATEMENT
      ========================================================= */}
      <section className="page-pad pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-black px-7 py-20 text-white sm:px-12 md:py-28 lg:px-20">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />

          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
              Our philosophy
            </p>

            <h2 className="display mt-7 text-4xl font-semibold leading-[1] tracking-[-0.04em] sm:text-5xl md:text-7xl">
              We don&apos;t design for
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                one moment.
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              We design for all the moments in between. The everyday routines,
              spontaneous plans, late nights, early mornings and everything
              that makes life yours.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          IMAGE + STORY
      ========================================================= */}
      <section className="page-pad section-pad bg-black text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85"
              alt="TEXSHIMA collection"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
              Designed with purpose
            </p>

            <h2 className="display mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              Built around
              <br />
              your everyday.
            </h2>

            <p className="mt-7 text-sm leading-8 text-white/55 sm:text-base">
              From the fabrics we choose to the silhouettes we create, every
              decision starts with how a piece will actually be worn.
            </p>

            <p className="mt-5 text-sm leading-8 text-white/55 sm:text-base">
              Our approach is intentionally simple. Create pieces that work
              together, feel comfortable and stay relevant beyond a single
              season.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {[
                ["01", "Simplicity"],
                ["02", "Comfort"],
                ["03", "Quality"],
                ["04", "Identity"],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
                >
                  <p className="text-2xl font-semibold">{number}</p>

                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}
      <section className="page-pad section-pad">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              What matters to us
            </p>

            <h2 className="display mt-4 text-4xl font-semibold sm:text-5xl md:text-6xl">
              The TEXSHIMA mindset.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Keep it simple.",
                text: "Clean design leaves room for individuality. We remove what doesn't need to be there.",
              },
              {
                number: "02",
                title: "Make it wearable.",
                text: "Fashion should fit into real life. Versatility and comfort are always part of the equation.",
              },
              {
                number: "03",
                title: "Stay authentic.",
                text: "Trends come and go. Personal style lasts. We create pieces that feel relevant without chasing every trend.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group rounded-[1.75rem] border border-black/8 bg-black/[0.02] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                  {item.number}
                </div>

                <h3 className="mt-7 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          LOCATION / GOOGLE MAP
      ========================================================= */}
      <section className="page-pad section-pad">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              Find us
            </div>

            <div className="mt-6 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="display text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                  Come visit
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                    TEXSHIMA.
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">
                  Find us at our location in Sri Lanka. Use the map below to
                  get directions and plan your visit.
                </p>
              </div>

              <a
                href="https://maps.app.goo.gl/7F9htvYPTx6sXs2P7"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/20"
              >
                Open Google Maps

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Google Maps */}
          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-black shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
            <div className="pointer-events-none absolute -right-32 -top-32 z-20 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />

            <div className="relative h-[380px] w-full sm:h-[480px] lg:h-[560px]">
              <iframe
                title="TEXSHIMA Textile Google Maps Location"
                src="https://www.google.com/maps?q=6.7168645,80.0628578&z=17&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />

              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-black/10" />
            </div>

            <div className="relative z-30 flex flex-col gap-5 border-t border-white/10 bg-black px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                  TEXSHIMA Textile
                </p>

                <p className="mt-2 text-sm text-white/70">
                  Sri Lanka
                </p>
              </div>

              <a
                href="https://maps.app.goo.gl/7F9htvYPTx6sXs2P7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                Get directions
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="page-pad pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-black px-7 py-16 text-white sm:px-12 md:py-20 lg:px-20">
          <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
                Discover TEXSHIMA
              </p>

              <h2 className="display mt-5 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                Find your everyday.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">
                Explore the latest pieces and find something that belongs in
                your everyday rotation.
              </p>
            </div>

            <Link
              href="/shop/all"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Explore collection

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}