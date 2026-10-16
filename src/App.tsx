import { useState } from "react";
import Scene, { type Reaction } from "./components/Scene";
import { candidates, introLines, type Relation } from "./data";

type Verdict = "heaven" | "hell";

const TOTAL = candidates.length;
const QUOTA = TOTAL / 2;

export default function App() {
  const [reaction, setReaction] = useState<Reaction>(null);
  const [intro, setIntro] = useState(0);
  const [index, setIndex] = useState(0);
  const [heaven, setHeaven] = useState(0);
  const [hell, setHell] = useState(0);
  const [log, setLog] = useState("最初の履歴書を読もう。");
  const [verdicts, setVerdicts] = useState<Verdict[]>([]);

  const inIntro = intro < introLines.length;
  const done = index >= TOTAL;
  const current = candidates[index];

  const judge = (v: Verdict) => {
    if (done) return;
    if ((v === "heaven" ? heaven : hell) >= QUOTA) return;
    const label = v === "heaven" ? "天国" : "地獄";
    if (v === "heaven") setHeaven(heaven + 1);
    else setHell(hell + 1);
    setReaction({ kind: v, n: index + 1 });
    setIndex(index + 1);
    setVerdicts([...verdicts, v]);
    setLog(`${current.name} を${label}へ。`);
  };

  const reset = () => {
    setIntro(introLines.length);
    setReaction(null);
    setIndex(0);
    setHeaven(0);
    setHell(0);
    setVerdicts([]);
    setLog("最初の履歴書を読もう。");
  };

  const heavenFull = heaven >= QUOTA;
  const hellFull = hell >= QUOTA;
  const screenState = reaction ? `is-${reaction.kind}` : "";

  if (inIntro) {
    return (
      <main className="app game-screen intro" onClick={() => setIntro(intro + 1)}>
        <div className="fx-transition" key={`intro-${intro}`} aria-hidden="true" />
        <div className="scene-transition">
          <h1 className="title">地獄の審判者</h1>
          <Scene reaction={null} />
          <p className="bubble">{introLines[intro]}</p>
        </div>
        <p className="hint">タップして進む（{intro + 1}/{introLines.length}）</p>
        <p className="note">※ 死や自死など重いテーマを含みます。</p>
      </main>
    );
  }

  return (
    <main className={`app game-screen ${screenState}`}>
      <div className="fx-transition" key={`scene-${index}`} aria-hidden="true" />
      {reaction?.kind === "heaven" && (
        <div className="fx-heaven" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              style={{
                left: `${8 + ((i * 29) % 84)}%`,
                top: `${12 + ((i * 37) % 72)}%`,
                animationDelay: `${(i % 5) * -0.8}s`,
              }}
            />
          ))}
        </div>
      )}
      {reaction?.kind === "hell" && <div className="fx-hell" aria-hidden="true" />}
      <header className="panel status">
        <div>判定 <b>{Math.min(index, TOTAL)}/{TOTAL}</b></div>
        <div className="heaven-text">天国 <b>{heaven}</b></div>
        <div className="hell-text">地獄 <b>{hell}</b></div>
        <div>残り <b>{TOTAL - index}</b></div>
      </header>

      <section className="judge" aria-label="審判者">
        <Scene reaction={reaction} completed={done} />
        <p className="bubble candidate-speech">
          {done ? "業務終了。おつかれさま。" : `「${current.statement}」`}
        </p>
      </section>

      <section
        className={`panel resume${index > 0 ? " paper-page" : ""}`}
        key={index}
        aria-live="polite"
      >
        {done ? (
          <div className="result">
            <h2>審判終了</h2>
            <p>天国 {heaven} 人 / 地獄 {hell} 人</p>
            <p>ノルマ達成！</p>
            <ul className="summary">
              {candidates.map((c, i) => (
                <li key={c.id} className={verdicts[i]}>
                  {c.name}（{c.age}歳・{c.cause}）→ {verdicts[i] === "heaven" ? "天国" : "地獄"}
                </li>
              ))}
            </ul>
            <button className="reset" onClick={reset}>もう一度</button>
          </div>
        ) : (
          <>
            <h2>No.{current.id} {current.name}</h2>
            <p className="who">享年 {current.age}歳　死因：{current.cause}</p>
            <h3>報告書</h3>
            <Section title="彼（彼女）を恨んでいる人" items={current.resented} />
            <Section title="彼（彼女）に感謝している人" items={current.grateful} />
            <h4>〈所感〉</h4>
            <ul>
              {current.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </>
        )}
      </section>

      <div className="actions">
        <button className="btn heaven" disabled={done || heavenFull} onClick={() => judge("heaven")}>
          ✧ 天国へ{heavenFull && "（満員）"}
        </button>
        <button className="btn hell" disabled={done || hellFull} onClick={() => judge("hell")}>
          ◇ 地獄へ{hellFull && "（満員）"}
        </button>
      </div>

      <footer className="panel log">{log}</footer>
    </main>
  );
}

function Section({ title, items }: { title: string; items: Relation[] }) {
  return (
    <>
      <h4>〈{title}〉</h4>
      {items.length === 0 ? (
        <p className="none">なし</p>
      ) : (
        <ul>
          {items.map((r) => (
            <li key={r.who}>
              <b>{r.who}</b>
              <br />▶ {r.detail}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
