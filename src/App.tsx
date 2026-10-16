import { useState } from "react";
import { candidates } from "./data";

type Verdict = "heaven" | "hell";

const TOTAL = candidates.length;
const QUOTA = TOTAL / 2;

export default function App() {
  const [index, setIndex] = useState(0);
  const [heaven, setHeaven] = useState(0);
  const [hell, setHell] = useState(0);
  const [log, setLog] = useState("最初の履歴書を読もう。");
  const [verdicts, setVerdicts] = useState<Verdict[]>([]);

  const done = index >= TOTAL;
  const current = candidates[index];

  const judge = (v: Verdict) => {
    if (done) return;
    if ((v === "heaven" ? heaven : hell) >= QUOTA) return;
    const label = v === "heaven" ? "天国" : "地獄";
    if (v === "heaven") setHeaven(heaven + 1);
    else setHell(hell + 1);
    setIndex(index + 1);
    setVerdicts([...verdicts, v]);
    setLog(`${current.name} を${label}へ。`);
  };

  const reset = () => {
    setIndex(0);
    setHeaven(0);
    setHell(0);
    setVerdicts([]);
    setLog("最初の履歴書を読もう。");
  };

  const heavenFull = heaven >= QUOTA;
  const hellFull = hell >= QUOTA;

  return (
    <main className="app">
      <header className="panel status">
        <div>判定 <b>{Math.min(index, TOTAL)}/{TOTAL}</b></div>
        <div className="heaven-text">天国 <b>{heaven}</b></div>
        <div className="hell-text">地獄 <b>{hell}</b></div>
        <div>残り <b>{TOTAL - index}</b></div>
      </header>

      <section className="judge" aria-label="審判者">
        <div className="avatar" role="img" aria-label="審判者のイラスト">👹</div>
        <p className="bubble">
          {done ? "業務終了。おつかれさま。" : current.claim}
        </p>
      </section>

      <section className="panel resume" aria-live="polite">
        {done ? (
          <div className="result">
            <h2>審判終了</h2>
            <p>天国 {heaven} 人 / 地獄 {hell} 人</p>
            <p>ノルマ達成！</p>
            <ul className="summary">
              {candidates.map((c, i) => (
                <li key={c.id} className={verdicts[i]}>
                  {c.name}（{c.job}）→ {verdicts[i] === "heaven" ? "天国" : "地獄"}
                </li>
              ))}
            </ul>
            <button className="reset" onClick={reset}>もう一度</button>
          </div>
        ) : (
          <>
            <h2>履歴書 No.{current.id}</h2>
            <p className="who">{current.name}（{current.age}歳）／{current.job}</p>
            <ul>
              {current.history.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </>
        )}
      </section>

      <div className="actions">
        <button className="btn heaven" disabled={done || heavenFull} onClick={() => judge("heaven")}>
          ☁ 天国へ{heavenFull && "（満員）"}
        </button>
        <button className="btn hell" disabled={done || hellFull} onClick={() => judge("hell")}>
          🔥 地獄へ{hellFull && "（満員）"}
        </button>
      </div>

      <footer className="panel log">{log}</footer>
    </main>
  );
}
