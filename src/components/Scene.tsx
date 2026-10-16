import { useEffect, useState } from "react";
const catImage = new URL("../../57E25FD4-9398-4EC1-AC6E-1E4EFC6AD72F.png", import.meta.url).href;
const girlImage = new URL("../../Girl_20261016221626.png", import.meta.url).href;
const deskImage = new URL("../../ACEF1B10-2B34-46B4-A70C-E10BD171A00F.png", import.meta.url).href;

export type Reaction = { kind: "heaven" | "hell"; n: number } | null;

const FLAMES = [4, 10, 17, 24, 31, 38, 45, 52, 58];
const SPARKS = [8, 15, 22, 30, 37, 44, 51, 57];
const CHAT_LINES = [
  "仕事はめんどくさいよね",
  "猫吸わないとやってられないよ",
  "社員証って肩こらない？",
  "この仕事をはじめてもう70年か〜",
  "ねむたい〜",
  "僕も大往生だったんだよ",
];

export default function Scene({
  reaction,
  completed = false,
}: {
  reaction: Reaction;
  completed?: boolean;
}) {
  const [chatIndex, setChatIndex] = useState(0);

  useEffect(() => {
    if (completed) return;

    const timer = window.setInterval(() => {
      setChatIndex((current) => {
        const choices = CHAT_LINES.map((_, index) => index).filter((index) => index !== current);
        return choices[Math.floor(Math.random() * choices.length)];
      });
    }, 5000);

    return () => window.clearInterval(timer);
  }, [completed]);

  return (
    <div className="scene-stage" role="group" aria-label="審判室の少女と猫">
      <img className="scene-image desk-image" src={deskImage} alt="" />
      <img className="scene-image girl-image" src={girlImage} alt="" />
      <img className="scene-image cat-image" src={catImage} alt="" />
      <p className="bubble scene-bubble" aria-live="polite" key={completed ? "completed" : chatIndex}>
        {completed ? "ふう、ひと休憩〜" : CHAT_LINES[chatIndex]}
      </p>
      <svg
        className="scene-svg"
        viewBox="0 0 64 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {reaction?.kind === "heaven" && (
          <g key={`h${reaction.n}`} className="fx">
            <rect width="64" height="40" fill="#8fe3c2" className="flash" />
            <rect x="29" y="2" width="6" height="1.5" fill="#d9f4e9" className="halo" />
            {SPARKS.map((x, i) => (
              <rect
                key={x}
                x={x}
                y="34"
                width="1.5"
                height="1.5"
                fill="#d9f4e9"
                className="spark"
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </g>
        )}
        {reaction?.kind === "hell" && (
          <g key={`f${reaction.n}`} className="fx">
            <rect width="64" height="40" fill="#0e2f2b" className="flash" />
            {FLAMES.map((x, i) => (
              <g key={x} className="flame" style={{ animationDelay: `${i * 0.06}s` }}>
                <rect x={x} y="32" width="4" height="8" fill="#1e5a52" />
                <rect x={x + 1} y="29" width="2" height="4" fill="#4dbb9a" />
                <rect x={x + 1} y="35" width="2" height="5" fill="#8fe3c2" />
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
