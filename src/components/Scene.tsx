export type Reaction = { kind: "heaven" | "hell"; n: number } | null;

const PALETTE: Record<string, string> = {
  H: "#2b2b3a", S: "#ffe0c8", C: "#2b6f6b", W: "#ffffff", R: "#f5a0a0",
  B: "#e0b341", K: "#232330", Y: "#f6d84a", P: "#f3b9b0",
};

const GIRL = [
  "....HHHHHHHH....",
  "...HHHHHHHHHH...",
  "..HHHSSSSSSHHH..",
  "..HHSSSSSSSSHH..",
  "..HHSSSSSSSSHH..",
  "..HHSSSSSSSSHH..",
  "..HHSRSSSSRSHH..",
  "..HH.SSSSSS.HH..",
  "...H.CWWWWC.H...",
  "....CCCWWCCC....",
  "...CCCCCCCCCC...",
  "..CCCCCCCCCCCC..",
  "..CCCCCCCCCCCC..",
  "..SCCCCCCCCCCS..",
  "...CCCCBBCCCC...",
  "...CCCCCCCCCC...",
  "...CCCCCCCCCC...",
  "....SS....SS....",
  "....SS....SS....",
];

const CAT = [
  "K..K......",
  "KKKK......",
  "KYKYK.....",
  "KKPKK.....",
  "KKKKKKKKK.",
  "KKKKKKKKKK",
  "KKKKKKKKKK",
  "K.K....K.K",
];

function Sprite({ rows, x, y }: { rows: string[]; x: number; y: number }) {
  return (
    <g>
      {rows.flatMap((row, j) =>
        [...row].map((ch, i) =>
          PALETTE[ch] ? (
            <rect key={`${i}-${j}`} x={x + i} y={y + j} width={1.02} height={1.02} fill={PALETTE[ch]} />
          ) : null
        )
      )}
    </g>
  );
}

const FLAMES = [4, 10, 17, 24, 31, 38, 45, 52, 58];
const SPARKS = [8, 15, 22, 30, 37, 44, 51, 57];

export default function Scene({ reaction }: { reaction: Reaction }) {
  const gx = 24, gy = 8;
  return (
    <svg className="scene-svg" viewBox="0 0 64 40" shapeRendering="crispEdges" role="img" aria-label="審判室の少女と猫">
      <rect width="64" height="40" fill="#cfeeea" />
      <rect y="27" width="64" height="13" fill="#a9d4cf" />
      {/* window */}
      <rect x="4" y="4" width="14" height="14" fill="#2b6f6b" />
      <rect x="5" y="5" width="12" height="12" fill="#26324f" />
      <rect x="12" y="7" width="3" height="3" fill="#f6efb0" />
      <rect x="10" y="6" width="1" height="1" fill="#fff" className="twinkle" />
      <rect x="7" y="12" width="1" height="1" fill="#fff" className="twinkle t2" />
      <rect x="10.5" y="5" width="1" height="12" fill="#2b6f6b" />
      {/* lantern */}
      <rect x="50" y="4" width="1" height="4" fill="#2b6f6b" />
      <rect x="48" y="8" width="5" height="5" fill="#e0b341" className="glow" />
      {/* girl */}
      <g key={reaction ? `g${reaction.n}` : "g"} className={reaction ? `girl ${reaction.kind}-react` : "girl"}>
        <Sprite rows={GIRL} x={gx} y={gy} />
        <g className="blink">
          <rect x={gx + 5} y={gy + 4} width="1.2" height="1.4" fill="#1d3b3a" />
          <rect x={gx + 10} y={gy + 4} width="1.2" height="1.4" fill="#1d3b3a" />
        </g>
      </g>
      {/* desk with papers */}
      <rect x="0" y="27" width="64" height="13" fill="#8a5a3c" />
      <rect x="0" y="27" width="64" height="2" fill="#b07a54" />
      <rect x="10" y="31" width="14" height="6" fill="#fff" />
      <rect x="12" y="33" width="10" height="1" fill="#9fd6d0" />
      <rect x="12" y="35" width="7" height="1" fill="#9fd6d0" />
      {/* cat */}
      <g className="cat">
        <Sprite rows={CAT} x={46} y={19} />
        <g className="tail">
          <rect x="56" y="22" width="1.2" height="5" fill="#232330" />
          <rect x="57" y="20" width="1.2" height="3" fill="#232330" />
        </g>
      </g>
      {/* reaction effects */}
      {reaction?.kind === "heaven" && (
        <g key={`h${reaction.n}`} className="fx">
          <rect width="64" height="40" fill="#fff7c2" className="flash" />
          <rect x="29" y="2" width="6" height="1.5" fill="#f6d84a" className="halo" />
          {SPARKS.map((x, i) => (
            <rect key={x} x={x} y="34" width="1.5" height="1.5" fill="#f6d84a" className="spark" style={{ animationDelay: `${i * 0.08}s` }} />
          ))}
        </g>
      )}
      {reaction?.kind === "hell" && (
        <g key={`f${reaction.n}`} className="fx">
          <rect width="64" height="40" fill="#b0392f" className="flash" />
          {FLAMES.map((x, i) => (
            <g key={x} className="flame" style={{ animationDelay: `${i * 0.06}s` }}>
              <rect x={x} y="32" width="4" height="8" fill="#e8672a" />
              <rect x={x + 1} y="29" width="2" height="4" fill="#f6a63a" />
              <rect x={x + 1} y="35" width="2" height="5" fill="#f6d84a" />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
