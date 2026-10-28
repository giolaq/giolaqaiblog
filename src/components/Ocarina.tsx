"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { SITE_CONFIG } from "@/lib/constants";

const NOTES = [
  { key: "a", pitch: "D", frequency: 587.33 },
  { key: "s", pitch: "F", frequency: 698.46 },
  { key: "d", pitch: "A", frequency: 880 },
  { key: "f", pitch: "B", frequency: 987.77 },
  { key: "g", pitch: "D′", frequency: 1174.66 },
];
const SONGS = [
  { name: "The builder’s song", keys: "adfadf", destination: "GitHub", url: SITE_CONFIG.social.github },
  { name: "The meeting song", keys: "sgfsgf", destination: "LinkedIn", url: SITE_CONFIG.social.linkedin },
];
type Song = typeof SONGS[number];
type PlaybackSession = { type: string };

export default function Ocarina({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const audioGeneration = useRef(0);
  const voices = useRef(new Set<OscillatorNode>());
  const sessionRestore = useRef<(() => void) | null>(null);
  const sequence = useRef("");
  const lastNote = useRef(0);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const travelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const travelling = useRef(false);
  const [played, setPlayed] = useState("");
  const [active, setActive] = useState("");
  const [muted, setMuted] = useState(false);
  const [audioUnavailable, setAudioUnavailable] = useState(false);
  const [matched, setMatched] = useState<Song | null>(null);

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function releaseAudio() {
      audioGeneration.current += 1;
      voices.current.forEach((voice) => voice.stop());
      voices.current.clear();
      sessionRestore.current?.();
      sessionRestore.current = null;
      const context = audio.current;
      audio.current = null;
      if (context) void context.close().catch(() => {});
    }
    function leavePage() {
      releaseAudio();
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
      if (travelTimer.current) clearTimeout(travelTimer.current);
      highlightTimer.current = null;
      travelTimer.current = null;
    }
    function restorePage(event: PageTransitionEvent) {
      if (!event.persisted) return;
      // Back/forward cache restores React state without remounting this dialog.
      leavePage();
      travelling.current = false;
      sequence.current = "";
      lastNote.current = 0;
      setMatched(null);
      setPlayed("");
      setActive("");
      setAudioUnavailable(false);
    }
    window.addEventListener("pagehide", leavePage);
    window.addEventListener("pageshow", restorePage);
    return () => {
      window.removeEventListener("pagehide", leavePage);
      window.removeEventListener("pageshow", restorePage);
      leavePage();
      element?.close();
      document.body.style.overflow = overflow;
    };
  }, []);

  async function sound(frequency: number, celebration = false) {
    if (muted) return;
    const generation = audioGeneration.current;
    try {
      // Set playback intent inside the tap/keypress, before starting Web Audio.
      // This API is optional; other browsers use their normal audio policy.
      const session = (navigator as Navigator & { audioSession?: PlaybackSession }).audioSession;
      if (session && !sessionRestore.current) {
        const previousType = session.type;
        try {
          session.type = "playback";
          sessionRestore.current = () => {
            try { session.type = previousType; } catch { /* Optional browser API. */ }
          };
        } catch { /* Web Audio can still work without Audio Session support. */ }
      }
      const context = audio.current?.state === "closed" || !audio.current
        ? new AudioContext()
        : audio.current;
      audio.current = context;
      // Safari can also report "interrupted" after a call or switching apps.
      if (context.state !== "running") await context.resume();
      if (audio.current !== context || generation !== audioGeneration.current) return;
      if (context.state !== "running") throw new Error("Audio has not resumed");
      setAudioUnavailable(false);
      const now = context.currentTime;
      // An original ascending treasure chime, synthesized without audio downloads.
      const score = celebration
        ? [[659.25, .15], [783.99, .33], [987.77, .51], [1174.66, .74], [1567.98, 1.02]]
        : [[frequency, 0]];
      score.forEach(([pitch, delay], index) => {
        const start = now + delay;
        const duration = celebration && index === score.length - 1 ? 1.1 : .38;
        [1, 2].forEach((harmonic) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          oscillator.type = "sine";
          oscillator.frequency.value = pitch * harmonic;
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(harmonic === 1 ? .12 : .012, start + .025);
          gain.gain.exponentialRampToValueAtTime(.001, start + duration - .02);
          oscillator.connect(gain);
          gain.connect(context.destination);
          voices.current.add(oscillator);
          oscillator.onended = () => { voices.current.delete(oscillator); oscillator.disconnect(); gain.disconnect(); };
          oscillator.start(start);
          oscillator.stop(start + duration);
        });
      });
    } catch {
      if (generation === audioGeneration.current) setAudioUnavailable(true);
    }
  }

  function play(key: string, timestamp: number) {
    const note = NOTES.find((item) => item.key === key);
    if (!note || travelling.current) return;
    void sound(note.frequency);
    setActive(key);
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    highlightTimer.current = setTimeout(() => setActive(""), 180);
    if (timestamp - lastNote.current > 8000) sequence.current = "";
    lastNote.current = timestamp;
    sequence.current = (sequence.current + key).slice(-6);
    setPlayed(sequence.current);
    const song = SONGS.find((item) => item.keys === sequence.current);
    if (song) {
      travelling.current = true;
      setMatched(song);
      void sound(note.frequency, true);
      travelTimer.current = setTimeout(() => window.location.assign(song.url), 3200);
    }
  }

  function stopNotes() {
    audioGeneration.current += 1;
    voices.current.forEach((voice) => voice.stop());
    voices.current.clear();
  }

  function toggleMute() {
    stopNotes();
    setMuted(!muted);
    if (!muted && audio.current) void audio.current.suspend().catch(() => {});
  }

  function reset() {
    stopNotes();
    if (travelTimer.current) clearTimeout(travelTimer.current);
    travelTimer.current = null;
    travelling.current = false;
    sequence.current = "";
    setPlayed("");
    setMatched(null);
    requestAnimationFrame(() => dialog.current?.querySelector<HTMLButtonElement>(".ocarina-notes button")?.focus());
  }

  function keyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.repeat || event.nativeEvent.isComposing || event.metaKey || event.ctrlKey || event.altKey) return;
    const key = event.key.toLowerCase();
    if (NOTES.some((note) => note.key === key)) {
      event.preventDefault();
      play(key, event.timeStamp);
    } else if (event.key === "Backspace") {
      event.preventDefault();
      reset();
    }
  }

  return (
    <dialog ref={dialog} className={`ocarina-dialog${matched ? " is-celebrating" : ""}`} aria-labelledby="ocarina-title" aria-describedby="ocarina-instructions"
      onKeyDown={keyDown} onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      {matched && <div className="ocarina-celebration">
        <div className="ocarina-confetti" aria-hidden="true">
          {Array.from({ length: 36 }, (_, index) => <i key={index} style={{
            "--x": `${Math.cos(index * 2.4) * (120 + index * 5)}px`,
            "--y": `${Math.sin(index * 2.4) * (100 + index * 4)}px`,
            "--spin": `${index * 67}deg`,
            "--delay": `${(index % 6) * .035}s`,
            background: ["#d8bc73", "#91b88a", "#f6edcf", "#7bbfc0"][index % 4],
          } as CSSProperties} />)}
        </div>
        <div className="ocarina-reward">
          <span className="ocarina-reward-symbol" aria-hidden="true">✦</span>
          <div role="status" aria-live="polite" aria-atomic="true">
            <h2>Song complete.</h2>
            <p>Travelling to {matched.destination}…</p>
          </div>
          <div className="ocarina-actions">
            <button type="button" autoFocus onClick={reset}>Stay here</button>
            <button type="button" aria-pressed={muted} onClick={toggleMute}>{muted ? "Unmute" : "Mute"}</button>
          </div>
          <button type="button" className="ocarina-reward-close" onClick={onClose}>Close <kbd>Esc</kbd></button>
        </div>
      </div>}
      <div className="ocarina-panel" hidden={!!matched}>
        <div className="ocarina-top"><span>A secret, well kept.</span><button type="button" onClick={onClose} aria-label="Close ocarina">Close <kbd>Esc</kbd></button></div>
        <h2 id="ocarina-title">The pocket ocarina</h2>
        <p id="ocarina-instructions">Play with <strong>A S D F G</strong>, or tap the notes. Complete a song to travel to its destination.</p>
        <div className="ocarina-notes" role="group" aria-label="Ocarina notes">
          {NOTES.map((note) => <button key={note.key} type="button" className={active === note.key ? "is-playing" : ""}
            aria-label={`Play ${note.pitch}, key ${note.key.toUpperCase()}`} onClick={(event) => play(note.key, event.timeStamp)} disabled={!!matched}>
            <kbd>{note.key.toUpperCase()}</kbd><span>{note.pitch}</span>
          </button>)}
        </div>
        <div className="ocarina-score" aria-label={`Played notes: ${played.toUpperCase().split("").join(" ") || "none"}`}>
          {Array.from({ length: 6 }, (_, index) => <span key={index}>{played[index]?.toUpperCase() || "·"}</span>)}
        </div>
        <div className="ocarina-songs">
          {SONGS.map((song) => <div key={song.keys}><div><strong>{song.name}</strong></div>
            <p aria-label={song.keys.toUpperCase().split("").join(" ")}>{song.keys.split("").map((key, index) => <kbd key={index}>{key.toUpperCase()}</kbd>)}</p>
          </div>)}
        </div>
        <div className="ocarina-status" role="status">{matched ? `Song complete. Travelling to ${matched.destination}…` : audioUnavailable ? "Sound is unavailable here. The note sequences still work." : "Two original melodies. Two places to find me."}</div>
        <div className="ocarina-actions">
          <button type="button" aria-pressed={muted} onClick={toggleMute}>{muted ? "Unmute" : "Mute"}</button>
          <button type="button" onClick={reset}>{matched ? "Stay here" : "Clear notes"}</button>
        </div>
      </div>
    </dialog>
  );
}
