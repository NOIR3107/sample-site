"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Click-to-load map.
 *
 * The plate is always visible. An earlier version rendered only a small text
 * button, which read as "there is no map here" because there was nothing
 * map-shaped on the page until you found and pressed it. Now the frame, the
 * marker and the address are drawn immediately with zero network cost, and
 * pressing Load map swaps in the real tiles.
 *
 * Nothing third-party is requested until that press. A Google Maps embed
 * loads megabytes and sets cookies on page view, which would have made this
 * site's own privacy notice untrue. OpenStreetMap needs no API key.
 *
 * The tiles are light, so one static inversion keeps the page on a single
 * dark theme. Desaturating afterwards removes the purple cast that plain
 * invert plus hue-rotate leaves behind. Applied once, never animated.
 */
export function LocationMap({
  address,
  lat,
  lon,
}: {
  address: string;
  lat: number;
  lon: number;
}) {
  const [loaded, setLoaded] = useState(false);

  const d = 0.004;
  const bbox = [lon - d, lat - d / 2, lon + d, lat + d / 2].join("%2C");
  // No `marker` parameter: the colour inversion turns OSM's pin green. The
  // bbox is centred on the coordinates, so the centre of the frame is the
  // location and we draw our own marker there in copper.
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;

  return (
    <div className="relative aspect-4/3 w-full border border-mc-line bg-mc-surface">
      {loaded ? (
        <>
          <iframe
            title={`Map showing ${address}`}
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="dial-fade size-full [filter:invert(1)_hue-rotate(180deg)_saturate(0.25)_brightness(0.86)_contrast(1.08)]"
          />
          {/* Our marker, over the frame centre, outside the inverted filter. */}
          <MapPin
            aria-hidden="true"
            strokeWidth={1.5}
            className="pointer-events-none absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-full text-mc-copper"
          />
        </>
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-6 p-8 text-center">
          <MapPin
            aria-hidden="true"
            strokeWidth={1}
            className="size-8 text-mc-copper"
          />
          <p className="font-mono text-spec leading-relaxed text-mc-muted">
            {address}
          </p>
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="inline-flex min-h-11 items-center rounded-control border border-mc-line px-5 font-mono text-spec text-mc-bone transition-colors duration-150 ease-mc hover:border-mc-copper"
          >
            Load map
          </button>
          <p className="max-w-[34ch] font-mono text-eyebrow uppercase leading-relaxed text-mc-muted">
            Loads tiles from OpenStreetMap. Nothing is requested until you
            press it.
          </p>
        </div>
      )}
    </div>
  );
}
