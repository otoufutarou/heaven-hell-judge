export type Reaction = { kind: "heaven" | "hell"; n: number } | null;

const FLAMES = [4, 10, 17, 24, 31, 38, 45, 52, 58];
const SPARKS = [8, 15, 22, 30, 37, 44, 51, 57];

export default function Scene({ reaction }: { reaction: Reaction }) {
  return (
    <div className="scene-card" role="img" aria-label="審判室の少女と猫">
    <svg className="scene-svg" viewBox="0 0 64 40" preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges" aria-hidden="true">
      {/* reaction effects */}
      {reaction?.kind === "heaven" && (
        <g key={`h${reaction.n}`} className="fx">
          <rect width="64" height="40" fill="#8fe3c2" className="flash" />
          <rect x="29" y="2" width="6" height="1.5" fill="#d9f4e9" className="halo" />
          {SPARKS.map((x, i) => (
            <rect key={x} x={x} y="34" width="1.5" height="1.5" fill="#d9f4e9" className="spark" style={{ animationDelay: `${i * 0.08}s` }} />
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
