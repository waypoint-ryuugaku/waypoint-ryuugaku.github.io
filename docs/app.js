(() => {
  const C = window.SITE_CONFIG;
  const S = window.SCHOOLS.filter((s) => (C.publishedIds || []).includes(s.id));
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const uniq = (arr) => [...new Set(arr)];

  // ブランド・LINE反映
  $("brand-name").textContent = C.brandName;
  $("brand-tagline").textContent = C.brandTagline;
  $("footer-brand").textContent = C.brandName;
  $("line-gift").textContent = C.lineGift;
  $("note-link").href = C.noteProfileUrl;
  $("insta-link").href = C.instagramUrl;
  document.querySelectorAll(".js-line").forEach((a) => { a.href = C.lineUrl; a.target = "_blank"; a.rel = "noopener"; });

  // 件数カウントアップ
  let n = 0; const t = setInterval(() => { if (n >= S.length) return clearInterval(t); $("stat-count").textContent = ++n; }, 40);

  // フィルタ選択肢
  const fill = (id, vals) => vals.forEach((v) => $(id).insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`));
  fill("f-region", uniq(S.map((s) => s.region)));
  fill("f-style", uniq(S.map((s) => s.style)));
  fill("f-purpose", uniq(S.flatMap((s) => s.purposes)));

  const compare = new Set();

  const card = (s, i = 0) => `
    <article class="card glass" style="animation-delay:${i * 40}ms">
      <div class="card-top">
        <span class="tag style-${esc(s.style)}">${esc(s.style)}</span>
        <span class="tag">📍${esc(s.region)}・${esc(s.area)}</span>
      </div>
      <h3>${esc(s.name)}</h3>
      <p class="catch">${esc(s.catch)}</p>
      <div class="specs">
        <div><b>${s.manToMan}</b><small>マンツーマン/日</small></div>
        <div><b>${s.cost4w[0]}〜${s.cost4w[1]}</b><small>4週間(万円)</small></div>
        <div><b style="font-size:.8rem">${esc(s.jpRatio.split("（")[0])}</b><small>日本人比率</small></div>
      </div>
      <div class="purposes">${s.purposes.map((p) => `<span>#${esc(p)}</span>`).join("")}</div>
      <label class="compare-check"><input type="checkbox" data-id="${s.id}" ${compare.has(s.id) ? "checked" : ""}> 比較に追加</label>
      <div class="card-actions">
        <a class="btn btn-ghost" href="${s.note || C.noteProfileUrl}" target="_blank" rel="noopener">紹介noteを読む</a>
        <a class="btn btn-line" href="${C.lineUrl}" target="_blank" rel="noopener">この学校を相談</a>
      </div>
    </article>`;

  function render() {
    const kw = $("f-keyword").value.trim().toLowerCase();
    const r = $("f-region").value, st = $("f-style").value, p = $("f-purpose").value;
    const b = Number($("f-budget").value), sort = $("f-sort").value;
    let list = S.filter((s) =>
      (!kw || (s.name + s.catch + s.features.join("") + s.area).toLowerCase().includes(kw)) &&
      (!r || s.region === r) && (!st || s.style === st) && (!p || s.purposes.includes(p)) &&
      (!b || s.cost4w[0] <= b));
    if (sort === "cost") list.sort((a, c) => a.cost4w[0] - c.cost4w[0]);
    if (sort === "m2m") list.sort((a, c) => c.manToMan - a.manToMan);
    $("result-count").textContent = `${list.length}校が見つかりました`;
    $("school-grid").innerHTML = list.length ? list.map(card).join("") :
      `<p style="color:var(--muted)">条件に合う学校がありません。<a href="${C.lineUrl}" style="color:var(--teal)">LINEで相談</a>すれば非掲載校もご案内できます。</p>`;
  }
  ["f-keyword", "f-region", "f-style", "f-purpose", "f-budget", "f-sort"].forEach((id) => $(id).addEventListener("input", render));
  render();

  // 比較
  document.addEventListener("change", (e) => {
    if (!e.target.matches(".compare-check input")) return;
    const id = e.target.dataset.id;
    if (e.target.checked) {
      if (compare.size >= 3) { e.target.checked = false; alert("比較は最大3校までです"); return; }
      compare.add(id);
    } else compare.delete(id);
    $("compare-label").textContent = `${compare.size}校選択中`;
    $("compare-tray").classList.toggle("show", compare.size > 0);
  });
  $("compare-clear-btn").onclick = () => { compare.clear(); $("compare-tray").classList.remove("show"); render(); };
  $("compare-close-btn").onclick = () => $("compare-modal").classList.remove("show");
  $("compare-modal").onclick = (e) => { if (e.target.id === "compare-modal") e.currentTarget.classList.remove("show"); };
  $("compare-open-btn").onclick = () => {
    const list = S.filter((s) => compare.has(s.id));
    const rows = [
      ["地域", (s) => `${s.region}（${s.area}）`], ["スタイル", (s) => s.style],
      ["マンツーマン", (s) => `${s.manToMan}コマ/日`], ["4週間費用", (s) => `${s.cost4w[0]}〜${s.cost4w[1]}万円`],
      ["日本人比率", (s) => s.jpRatio], ["寮", (s) => s.dorm], ["おすすめ", (s) => s.purposes.join("・")],
      ["特徴", (s) => `<ul>${s.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`],
      ["注意点", (s) => `<ul>${s.cautions.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`],
    ];
    $("compare-table").innerHTML = `<table><tr><th></th>${list.map((s) => `<td><b>${esc(s.name)}</b></td>`).join("")}</tr>
      ${rows.map(([k, f]) => `<tr><th>${k}</th>${list.map((s) => `<td>${k === "特徴" || k === "注意点" ? f(s) : esc(f(s))}</td>`).join("")}</tr>`).join("")}
      </table><p style="text-align:center;margin-top:24px"><a class="btn btn-line" href="${C.lineUrl}" target="_blank" rel="noopener">この比較結果をLINEで相談する</a></p>`;
    $("compare-modal").classList.add("show");
  };

  // 診断
  const Q = [
    { q: "留学の一番の目的は？", key: "purpose", opts: ["初心者", "日常英会話", "IELTS", "TOEIC", "ビジネス", "親子"] },
    { q: "どんな環境で勉強したい？", key: "style", opts: ["スパルタ", "セミスパルタ", "リゾート", "こだわらない"] },
    { q: "4週間の予算は？", key: "budget", opts: ["〜20万円", "〜25万円", "〜30万円", "30万円以上もOK"] },
  ];
  const ans = {};
  function quiz(step = 0) {
    const body = $("quiz-body");
    if (step < Q.length) {
      const it = Q[step];
      body.innerHTML = `<div class="progress"><div style="width:${(step / Q.length) * 100}%"></div></div>
        <p class="quiz-q">Q${step + 1}. ${it.q}</p>
        <div class="quiz-opts">${it.opts.map((o, i) => `<button id="quiz-${step}-${i}" data-v="${o}">${o}</button>`).join("")}</div>`;
      body.querySelectorAll("button").forEach((b) => b.onclick = () => { ans[it.key] = b.dataset.v; quiz(step + 1); });
      return;
    }
    const bud = { "〜20万円": 20, "〜25万円": 25, "〜30万円": 30 }[ans.budget] || 99;
    const scored = S.map((s) => ({
      s, score: (s.purposes.includes(ans.purpose) ? 3 : 0) + (ans.style === "こだわらない" || s.style === ans.style ? 2 : 0) + (s.cost4w[0] <= bud ? 2 : 0),
    })).sort((a, b) => b.score - a.score).slice(0, 3);
    body.innerHTML = `<div class="quiz-result"><div class="progress"><div style="width:100%"></div></div>
      <p class="quiz-q">あなたにおすすめの学校はこちら！</p>
      <div class="grid">${scored.map((x, i) => card(x.s, i)).join("")}</div>
      <p style="color:var(--muted);margin-bottom:18px">診断結果をもとに、プロが無料で最適なプランをご提案します。</p>
      <a class="btn btn-line btn-lg" href="${C.lineUrl}" target="_blank" rel="noopener">診断結果をLINEで相談する</a>
      <p style="margin-top:16px"><button class="btn-text" id="quiz-retry">もう一度診断する</button></p></div>`;
    $("quiz-retry").onclick = () => quiz(0);
  }
  quiz();
})();
