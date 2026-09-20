import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import { iconMap } from "../../lib/iconMap";
import { useLanguage } from "../../i18n/LanguageContext";

const AUTOPLAY_DELAY = 4500;
const SCROLL_DURATION = 550;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function Projects() {
  const { t, language } = useLanguage();
  const { projects, loading } = useProjects();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const didDrag = useRef(false);
  const downIndex = useRef<number | null>(null);

  // velocity tracking for momentum on release
  const lastMoveX = useRef(0);
  const lastMoveTime = useRef(0);
  const velocity = useRef(0);

  const animFrame = useRef<number | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || projects.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isAnimating.current || isDragging.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.95) {
            setActive(Number(entry.target.getAttribute("data-index")));
          }
        });
      },
      { root: track, threshold: 0.95 }
    );
    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, [projects.length]);

  const getCardOffset = (index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return 0;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offsetWithinTrack = cardRect.left - trackRect.left + track.scrollLeft;
    return offsetWithinTrack - (track.clientWidth - card.clientWidth) / 2;
  };

  const animateScrollTo = (target: number, duration = SCROLL_DURATION) => {
    const track = trackRef.current;
    if (!track) return;
    if (animFrame.current) cancelAnimationFrame(animFrame.current);

    const start = track.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();
    isAnimating.current = true;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      track.scrollLeft = start + distance * easeInOutCubic(progress);
      if (progress < 1) {
        animFrame.current = requestAnimationFrame(step);
      } else {
        isAnimating.current = false;
      }
    };
    animFrame.current = requestAnimationFrame(step);
  };

  const goTo = (index: number, duration?: number) => {
    if (projects.length === 0) return;
    const clamped = (index + projects.length) % projects.length;
    setActive(clamped);
    animateScrollTo(getCardOffset(clamped), duration);
  };

  const goPrev = () => goTo(active - 1);
  const goNext = () => goTo(active + 1);

  useEffect(() => {
    if (paused || projects.length <= 1) return;
    const timer = setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % projects.length;
        animateScrollTo(getCardOffset(next), SCROLL_DURATION);
        return next;
      });
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [paused, projects.length]);

  const nearestIndexToOffset = (offset: number) => {
    let closest = 0;
    let closestDist = Infinity;
    cardRefs.current.forEach((_, i) => {
      const dist = Math.abs(getCardOffset(i) - offset);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    return closest;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    isAnimating.current = false;

    const cardEl = (e.target as HTMLElement).closest("[data-index]");
    downIndex.current = cardEl ? Number(cardEl.getAttribute("data-index")) : null;
    isDragging.current = true;
    didDrag.current = false;
    dragStartX.current = e.clientX;
    dragStartScroll.current = track.scrollLeft;
    lastMoveX.current = e.clientX;
    lastMoveTime.current = performance.now();
    velocity.current = 0;
    track.setPointerCapture(e.pointerId);
    setPaused(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 5) didDrag.current = true;
    track.scrollLeft = dragStartScroll.current - delta;

    const now = performance.now();
    const dt = now - lastMoveTime.current;
    if (dt > 0) {
      velocity.current = (lastMoveX.current - e.clientX) / dt; // px/ms, scroll direction
    }
    lastMoveX.current = e.clientX;
    lastMoveTime.current = now;
  };

  const handlePointerUp = () => {
    const track = trackRef.current;
    isDragging.current = false;

    if (!didDrag.current && downIndex.current !== null) {
      goTo(downIndex.current);
    } else if (track) {
      // project a short momentum-based distance, then settle on the nearest card
      const momentumDistance = velocity.current * 120; // tune feel here
      const projected = track.scrollLeft + momentumDistance;
      const nearest = nearestIndexToOffset(projected);
      goTo(nearest, 450);
    }

    downIndex.current = null;
    setPaused(false);
  };

  if (loading) {
    return (
      <section id="projects" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 text-center text-white/40 lg:px-8">Loading…</div>
      </section>
    );
  }
  if (projects.length === 0) return null;

  const current = projects[active];

  return (
    <section
      id="projects"
      className="relative py-32"
  
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#35D6B0]">
              {t.projectsSection.label}
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              {t.projectsSection.headingA}
              <span className="text-[#A8B0D0]"> {t.projectsSection.headingB}</span>
            </h2>
          </div>

          <Link to="/work" className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white">
            {t.projectsSection.viewAll}
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div key={current.slug} className="w-full animate-[fadeIn_0.4s_ease]">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
              {current.category[language]}
            </span>

            <h3 className="mt-6 line-clamp-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {current.title[language]}
            </h3>

            <p className="mt-4 line-clamp-2 max-w-lg leading-7 text-[#A8B0D0]">
              {current.description[language]}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {current.technologies.slice(0, 3).map((technology) => (
                <span key={technology} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                  {technology}
                </span>
              ))}
              {current.technologies.length > 3 && (
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/40">
                  +{current.technologies.length - 3}
                </span>
              )}
            </div>

            <Link
              to={`/work/${current.slug}`}
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-[#35D6B0] px-6 py-3 text-sm font-semibold text-[#080B2A] transition hover:bg-[#4DE4C0]"
            >
              {t.projectsSection.viewCaseStudy}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </Link>
          </div>

          <div>
            <div className="relative mb-6 h-64 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] sm:h-80">
              {projects.map((project, index) =>
                project.images[0] ? (
                  <img
                    key={project.slug}
                    src={project.images[0]}
                    alt={project.title[language]}
                    className={`absolute inset-0 h-full w-full object-contain p-6 transition-opacity duration-700 ${
                      index === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : null
              )}

              <a
                href={current.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-[#080B2A] rtl:right-auto rtl:left-4"
              >
                {t.projectsSection.visitSite}
                <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
              </a>
            </div>

            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="flex max-w-[45rem] snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden active:cursor-grabbing cursor-grab"
            >
              {projects.map((project, index) => {
                const CardIcon = iconMap[project.iconKey];
                return (
                  <div
                    key={project.slug}
                    ref={(el) => { cardRefs.current[index] = el; }}
                    data-index={index}
                    className={`relative flex h-64 w-56 shrink-0 select-none snap-center flex-col justify-between overflow-hidden rounded-[1.75rem] border p-6 transition duration-300 ${
                      index === active ? "border-[#35D6B0]/50 bg-white/10" : "border-white/10 bg-white/[0.03] opacity-60"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <CardIcon size={22} className="text-white" />
                    </div>
                    <div>
                      <span className="font-display text-4xl font-semibold text-white/20">{project.number}</span>
                      <h4 className="mt-2 line-clamp-2 text-lg font-semibold tracking-tight">{project.title[language]}</h4>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button onClick={goPrev} aria-label="Previous project" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white">
                <ArrowLeft size={16} />
              </button>
              <button onClick={goNext} aria-label="Next project" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;