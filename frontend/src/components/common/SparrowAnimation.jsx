import React, { useState, useEffect } from 'react';
import './SparrowAnimation.css';

/**
 * SparrowSVG Component
 * Renders an anatomically detailed, lightweight SVG House Sparrow (गौरैया - Passer domesticus)
 * Features realistic Indian house sparrow markings:
 * - Chestnut crown & nape
 * - Cream/buff cheek patch & dark eyestripe
 * - Black throat bib & soft buff/grey underparts
 * - Warm rufous mantle with darker streaking
 * - Distinctive white/buff wingbar & layered flight feathers
 * - Small gripping feet to perch on the hero card's top edge
 * - Separate flying wings (flapping during flight) and folded wing (visible when perched)
 */
function SparrowSVG({ id, state = 'perched', facing = 'right', scale = 1 }) {
  const isFacingLeft = facing === 'left';

  return (
    <div
      className={`sparrow-bird-wrap sparrow-${id} state-${state} ${isFacingLeft ? 'facing-left' : 'facing-right'}`}
      style={{ '--sparrow-scale': scale }}
      aria-hidden="true"
    >
      <svg
        className="sparrow-svg"
        viewBox="0 0 64 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle gradient for soft sparrow underbelly */}
          <linearGradient id={`belly-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DFD6C9" />
            <stop offset="100%" stopColor="#C4B9AA" />
          </linearGradient>

          {/* Warm chestnut mantle gradient */}
          <linearGradient id={`mantle-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9C5830" />
            <stop offset="60%" stopColor="#824320" />
            <stop offset="100%" stopColor="#5E2F16" />
          </linearGradient>

          {/* Primary wing feathers gradient */}
          <linearGradient id={`primaries-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A3628" />
            <stop offset="100%" stopColor="#2E2017" />
          </linearGradient>

          {/* Wing flapping gradient */}
          <linearGradient id={`flight-wing-grad-${id}`} x1="0%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#8D4F2A" />
            <stop offset="35%" stopColor="#F0E8DC" />
            <stop offset="45%" stopColor="#543B2B" />
            <stop offset="100%" stopColor="#2C1D14" />
          </linearGradient>
        </defs>

        {/* ── FAR WING (Visible during flight, flapping behind body) ── */}
        <g className="sparrow-wing-far">
          <path
            d="M 28 19 C 23 11 18 2 12 0 C 10 3 12 9 14 14 C 11 16 9 20 12 24 C 16 26 23 24 28 19 Z"
            fill="#38251B"
          />
          <path d="M 12 0 C 13 4 15 10 17 14" stroke="#22150E" strokeWidth="0.8" />
          <path d="M 14 6 C 16 11 19 16 22 19" stroke="#22150E" strokeWidth="0.8" />
        </g>

        {/* ── TAIL FEATHERS (Perched & flight) ── */}
        <g className="sparrow-tail">
          {/* Outer tail feathers */}
          <path
            d="M 20 32 L 3 39 L 4 43 L 22 36 Z"
            fill="#3A281E"
          />
          {/* Central tail feathers with realistic notched tip */}
          <path
            d="M 21 31 L 4 38 L 5 41.5 L 22 35 Z"
            fill="#4D3728"
          />
          <path
            d="M 4 38 L 2.5 40.2 L 4.5 41.8"
            stroke="#261911"
            strokeWidth="0.8"
            fill="none"
          />
          {/* Subtle tail feather separation lines */}
          <path d="M 18 33 L 7 38.5" stroke="#281A12" strokeWidth="0.6" />
        </g>

        {/* ── LEGS & CLAWS (Clasping the card's top rim at y = 43.5) ── */}
        <g className="sparrow-legs">
          {/* Back leg */}
          <path
            d="M 27 37 L 26 43"
            stroke="#5C4537"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          {/* Back foot clasping the top border edge */}
          <path
            d="M 23 44.5 C 24.5 43.5 26 43 27 43.2 M 26 43 L 26.5 45.2 M 26 43 L 28.5 44.8"
            stroke="#4A3427"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Front leg */}
          <path
            d="M 33 37 L 33 43"
            stroke="#4F3B2E"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Front foot toes gripping and curling over the front edge of the card */}
          <path
            d="M 30 44.5 C 31.5 43.5 33 43 34 43.2 M 33 43 L 33.5 45.5 M 33 43 L 35.8 44.8"
            stroke="#3D2B20"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* ── MAIN BODY & HEAD ── */}
        <g className="sparrow-body">
          {/* Breast & Belly (Soft plump silhouette) */}
          <path
            d="M 21 34 
               C 19 32, 22 38, 28 41 
               C 34 42.5, 41 41, 45 35 
               C 48 30, 48 23, 46 19 
               C 43 19, 38 21, 35 24 
               C 28 26, 23 29, 21 34 Z"
            fill={`url(#belly-grad-${id})`}
          />

          {/* Mantle / Back (Warm chestnut brown) */}
          <path
            d="M 21 34 
               C 23 28, 27 24, 32 19 
               C 34 16, 37 13, 41 12 
               C 37 11.5, 31 14, 27 19 
               C 23 24, 20 28, 19 32 Z"
            fill={`url(#mantle-grad-${id})`}
          />
          {/* Mantle feather streaks (Rufous/dark markings) */}
          <path d="M 29 19 Q 26 23 24 28" stroke="#3A1C0C" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M 32 21 Q 30 25 28 30" stroke="#3A1C0C" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M 35 23 Q 33 26 31 29" stroke="#3A1C0C" strokeWidth="0.8" strokeLinecap="round" />

        {/* ── HEAD & FACIAL FEATURES (Pivots gently during idle glances) ── */}
        <g className="sparrow-head">
          {/* Black throat bib (Characteristic of Indian House Sparrow) */}
          <path
            d="M 46 19 
               C 47 21, 46.5 25.5, 44 28.5 
               C 42 27, 41 24, 42 21 
               C 43 19.5, 44.5 19, 46 19 Z"
            fill="#231913"
          />

          {/* Head & Crown (Chestnut cap) */}
          <path
            d="M 34 16 
               C 34 12, 38 9.5, 43 10 
               C 47 10.5, 49 13.5, 49 16.5 
               C 49 18, 47 19, 45 19 
               C 40 19, 36 18, 34 16 Z"
            fill="#753C1E"
          />

          {/* Buff cheek patch */}
          <ellipse
            cx="43.5"
            cy="17.2"
            rx="3.5"
            ry="2.6"
            fill="#ECE3D4"
          />

          {/* Dark eyestripe running from bill through eye */}
          <path
            d="M 50 16.5 L 45 15.5 L 39 16"
            stroke="#2B1A11"
            strokeWidth="1.1"
            strokeLinecap="round"
          />

          {/* Eye with white sparkle catchlight */}
          <circle cx="44.2" cy="15.2" r="1.6" fill="#150E0A" />
          <circle cx="44.7" cy="14.8" r="0.5" fill="#FFFFFF" />

          {/* Sparrow Beak (Short, conical, strong seed-eating bill) */}
          {/* Upper mandible */}
          <path
            d="M 48.5 14.8 L 56 17 L 49 18 Z"
            fill="#342C26"
          />
          {/* Lower mandible */}
          <path
            d="M 49 18 L 56 17 L 48.5 19.2 Z"
            fill="#4A3F37"
          />
        </g>
      </g>

        {/* ── FOLDED WING (Visible when perched) ── */}
        <g className="sparrow-wing-folded">
          {/* Main wing base */}
          <path
            d="M 36 21 
               C 36 21, 30 22, 22 28 
               C 16 32, 13 36, 12 37 
               C 15 37, 21 34, 27 30 
               C 33 26, 37 23, 36 21 Z"
            fill={`url(#primaries-grad-${id})`}
          />

          {/* Chestnut shoulder & scapulars */}
          <path
            d="M 36 21 
               C 34 20, 30 22, 27 25 
               C 29 27, 34 25, 36 21 Z"
            fill="#914E27"
          />

          {/* White/buff wingbar (Iconic sparrow hallmark) */}
          <path
            d="M 33 23.5 C 31 24.8 28 26.5 25 28.5"
            stroke="#F5EFE6"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Second subtle wingbar */}
          <path
            d="M 31 25.5 C 29 27 26 29 24 30.8"
            stroke="#DCD2C3"
            strokeWidth="0.9"
            strokeLinecap="round"
          />

          {/* Primaries feather divisions */}
          <path d="M 23 30.5 L 14 36.2" stroke="#22160E" strokeWidth="0.8" />
          <path d="M 25 29 L 16 34.8" stroke="#22160E" strokeWidth="0.8" />
          <path d="M 27 27.5 L 19 33.2" stroke="#22160E" strokeWidth="0.8" />
        </g>

        {/* ── NEAR WING IN FLIGHT (Active during flight, flapping) ── */}
        <g className="sparrow-wing-near-flying">
          <path
            d="M 32 22 
               C 27 15, 20 4, 13 2 
               C 11 5, 14 11, 16 16 
               C 13 18, 11 22, 14 27 
               C 18 31, 26 28, 32 22 Z"
            fill={`url(#flight-wing-grad-${id})`}
          />
          {/* White wingbar on flying wing */}
          <path
            d="M 24 16 C 21 17 18 19 16 21"
            stroke="#F7F1E6"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Primary flight feather vanes */}
          <path d="M 13 2 C 15 7 18 13 21 18" stroke="#26170E" strokeWidth="0.9" />
          <path d="M 16 8 C 18 13 21 18 24 22" stroke="#26170E" strokeWidth="0.9" />
          <path d="M 19 14 C 21 19 24 24 27 26" stroke="#26170E" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
}

/**
 * SparrowAnimation Component
 * 
 * Displays 2–3 small realistic Indian House Sparrows arriving naturally on the FarmIT Hero Card.
 * - Bird 1: Enters gracefully from the left, settles on the top-left edge of the hero card.
 * - Bird 2: Enters gracefully from the right, settles on the top-right edge (clearing the weather widget).
 * - Bird 3: (Desktop) Follows Bird 1 from the left, slightly smaller, settles near the center-left.
 * 
 * Post-landing:
 * Each bird settles smoothly with a tiny bounce, tucks its wings, and transitions into
 * calm, natural perching idle animations (subtle breathing, occasional head glances & tail twitches).
 */
export default function SparrowAnimation() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [bird1State, setBird1State] = useState('entering');
  const [bird2State, setBird2State] = useState('entering');
  const [bird3State, setBird3State] = useState('entering');

  useEffect(() => {
    // Initial short pause before the sparrows appear
    const startTimer = setTimeout(() => {
      setAnimationStarted(true);
    }, 200);

    // Timing transitions from flying to perched (matches flight CSS duration)
    // Bird 1 lands at ~2.3s
    const b1LandTimer = setTimeout(() => {
      setBird1State('perched');
    }, 2350);

    // Bird 2 lands at ~2.8s
    const b2LandTimer = setTimeout(() => {
      setBird2State('perched');
    }, 2850);

    // Bird 3 lands at ~3.2s
    const b3LandTimer = setTimeout(() => {
      setBird3State('perched');
    }, 3250);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(b1LandTimer);
      clearTimeout(b2LandTimer);
      clearTimeout(b3LandTimer);
    };
  }, []);

  if (!animationStarted) {
    return <div className="sparrow-container-root pointer-events-none" aria-hidden="true" />;
  }

  return (
    <div className="sparrow-container-root pointer-events-none" aria-hidden="true">
      {/* ── BIRD 1: Enters from left, perches on top-left edge ── */}
      <div className="sparrow-slot slot-bird-1">
        <SparrowSVG id="1" state={bird1State} facing="right" scale={1.0} />
      </div>

      {/* ── BIRD 2: Enters from right, perches on top-right edge ── */}
      <div className="sparrow-slot slot-bird-2">
        <SparrowSVG id="2" state={bird2State} facing="left" scale={0.96} />
      </div>

      {/* ── BIRD 3: (Desktop only) Smaller sparrow, perches center-left ── */}
      <div className="sparrow-slot slot-bird-3">
        <SparrowSVG id="3" state={bird3State} facing="right" scale={0.84} />
      </div>
    </div>
  );
}
