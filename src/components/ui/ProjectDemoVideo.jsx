import { useCallback, useState } from "react";
import { Play } from "lucide-react";

/**
 * Demo clip: dark pre-play slate (not a poster image); hides after playback starts.
 */
export default function ProjectDemoVideo({ src, title, onLayoutStable }) {
  const [hasStarted, setHasStarted] = useState(false);

  const onPlaying = useCallback(() => {
    setHasStarted(true);
  }, []);

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-slate-950">
      {!hasStarted ? (
        <div
          className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950"
          aria-hidden
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            <Play className="h-7 w-7 translate-x-0.5 text-white" fill="currentColor" stroke="currentColor" strokeWidth={1.25} aria-hidden />
          </div>
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/45">Demo clip</p>
        </div>
      ) : null}
      <video
        className="relative z-0 block h-full min-h-0 w-full object-contain bg-black"
        src={src}
        controls
        playsInline
        preload="metadata"
        onPlaying={onPlaying}
        onLoadedMetadata={onLayoutStable}
        aria-label={`${title} demo video`}
      />
    </div>
  );
}
