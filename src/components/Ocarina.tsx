"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
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

export default function Ocarina({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const audio = useRef<AudioContext | null>(null);
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
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
      if (travelTimer.current) clearTimeout(travelTimer.current);
      if (audio.current) {
        void audio.current.close().catch(() => {});
        audio.current = null;
      }
    };
  }, []);

  function sound(frequency: number) {
    if (muted) return;
    try {
      const context = audio.current ?? new AudioContext();
      audio.current = context;
      if (context.state === "suspended") void context.resume().catch(() => setAudioUnavailable(true));
      const now = context.currentTime;
      // A soft fundamental and quiet overtone; no sample downloads or idle oscillator.
      [1, 2].forEach((harmonic) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency * harmonic;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(harmonic === 1 ? .12 : .012, now + .025);
        gain.gain.exponentialRampToValueAtTime(.001, now + .36);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
        oscillator.start(now);
        oscillator.stop(now + .38);
      });
    } catch { setAudioUnavailable(true); }
  }

  function play(key: string, timestamp: number) {
    const note = NOTES.find((item) => item.key === key);
    if (!note || travelling.current) return;
    sound(note.frequency);
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
      travelTimer.current = setTimeout(() => window.location.assign(song.url), 1800);
    }
  }

  function reset() {
    if (travelTimer.current) clearTimeout(travelTimer.current);
    travelTimer.current = null;
    travelling.current = false;
    sequence.current = "";
    setPlayed("");
    setMatched(null);
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
    <dialog ref={dialog} className="ocarina-dialog" aria-labelledby="ocarina-title" aria-describedby="ocarina-instructions"
      onKeyDown={keyDown} onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="ocarina-panel">
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
          <button type="button" aria-pressed={muted} onClick={() => { setMuted(!muted); if (audio.current) void audio.current.suspend().catch(() => {}); }}>{muted ? "Unmute" : "Mute"}</button>
          <button type="button" onClick={reset}>{matched ? "Stay here" : "Clear notes"}</button>
        </div>
      </div>
    </dialog>
  );
}
