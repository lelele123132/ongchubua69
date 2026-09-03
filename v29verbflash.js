/* ==========================================================
   V29 — ĐỘNG TỪ CUỐI SÁCH
   Random flash: ます -> て / 辞書形
   ========================================================== */

let v29VerbState=null;

function openV29VerbAppendix(){
  try{setNav('practice')}catch{}
  const root=document.getElementById('app');
  if(!root)return;

  const counts=[1,2,3].map(g=>V29_VERB_APPENDIX.filter(v=>v.group===g).length);

  root.innerHTML=`<div class="breadcrumb">
    <button onclick="goHome()">Trang chủ</button> ›
    <button onclick="openPractice()">Luyện tập</button> › Động từ cuối sách
  </div>

  <section class="v29-verb-hero">
    <div>
      <span class="v29-verb-kicker">V. BIẾN ĐỔI ĐỘNG TỪ • CUỐI SÁCH N5</span>
      <h1>動 Động từ cuối sách</h1>
      <p>Flashcard random từ bảng động từ ở cuối sách. Mặt trước là <b>ます-form</b>; chọn học <b>て-form</b> hoặc <b>thể thường / nguyên dạng（辞書形）</b>.</p>
    </div>

    <div class="v29-verb-stats">
      <div><b>${V29_VERB_APPENDIX.length}</b><span>động từ</span></div>
      <small>Nhóm I ${counts[0]} • II ${counts[1]} • III ${counts[2]}</small>
    </div>
  </section>

  <div class="v29-source-note">
    <b>Nguồn:</b> mục “V. Biến đổi động từ” ở cuối PDF • Nhóm I / II / III • cột ます・て・thể nguyên dạng.
    Các dòng lặp cùng một cách chia được gộp để Flashcard không lặp vô ích.
  </div>

  <section class="panel v29-verb-setup">
    <div class="v29-verb-options">
      <label>
        <b>Muốn luyện thể nào?</b>
        <select id="v29-verb-mode">
          <option value="te" selected>ます → て-form</option>
          <option value="dictionary">ます → Thể thường / nguyên dạng（辞書形）</option>
        </select>
      </label>

      <label>
        <b>Nhóm động từ</b>
        <select id="v29-verb-group">
          <option value="all" selected>Tất cả Nhóm I + II + III</option>
          <option value="1">Chỉ Nhóm I</option>
          <option value="2">Chỉ Nhóm II</option>
          <option value="3">Chỉ Nhóm III</option>
        </select>
      </label>

      <label>
        <b>Số thẻ</b>
        <select id="v29-verb-count">
          <option value="10">10 thẻ</option>
          <option value="20" selected>20 thẻ</option>
          <option value="50">50 thẻ</option>
          <option value="all">Tất cả</option>
        </select>
      </label>

      <button class="primary-btn" onclick="v29StartVerbFlash()">Bắt đầu Random →</button>
    </div>

    <div class="v29-verb-special">
      <span><b>行きます</b> → いって / いく</span>
      <span><b>着ます（きます）</b> → きて / きる</span>
      <span><b>来ます（きます）</b> → きて / くる</span>
    </div>

    <div id="v29-verb-area"></div>
  </section>`;
}

function v29FilteredVerbs(){
  const group=document.getElementById('v29-verb-group')?.value||'all';
  let pool=[...V29_VERB_APPENDIX];
  if(group!=='all')pool=pool.filter(v=>String(v.group)===group);
  return pool;
}

function v29StartVerbFlash(){
  const mode=document.getElementById('v29-verb-mode')?.value||'te';
  const group=document.getElementById('v29-verb-group')?.value||'all';
  const count=document.getElementById('v29-verb-count')?.value||'20';

  let pool=v29FilteredVerbs();
  pool=shuffle(pool);

  if(count!=='all'){
    pool=pool.slice(0,Math.min(+count,pool.length));
  }

  v29VerbState={
    mode,group,count,
    cards:pool,
    index:0,
    revealed:false,
    remembered:0,
    forgot:0,
    forgotten:[],
    cardStartedAt:Date.now()
  };

  v29RenderVerbCard();
}

function v29VerbAnswer(v){
  return v29VerbState?.mode==='dictionary'?v.dictionary:v.te;
}

function v29ModeLabel(){
  return v29VerbState?.mode==='dictionary'
    ? 'THỂ THƯỜNG / NGUYÊN DẠNG（辞書形）'
    : 'て-FORM';
}

function v29RenderVerbCard(){
  const s=v29VerbState;
  const area=document.getElementById('v29-verb-area');
  if(!s||!area)return;

  if(s.index>=s.cards.length){
    return v29RenderVerbResult();
  }

  const v=s.cards[s.index];
  const pct=Math.round(s.index/s.cards.length*100);

  s.revealed=false;
  s.cardStartedAt=Date.now();

  area.innerHTML=`<div class="v29-verb-session">
    <div class="v29-verb-top">
      <div>
        <span>NHÓM ${v.group}</span>
        <b>ます → ${v29ModeLabel()}</b>
      </div>
      <strong>${s.index+1}/${s.cards.length}</strong>
    </div>

    <div class="progressbar v29-verb-progress">
      <span style="width:${pct}%"></span>
    </div>

    <button class="v29-verb-card" onclick="v29RevealVerb()">
      <small>MẶT TRƯỚC • ます-FORM</small>
      <strong>${escapeHtml(v.display||v.masu)}</strong>
      ${v.display!==v.masu?`<em>${escapeHtml(v.masu)}</em>`:''}
      <span id="v29-verb-hint">Tự chia sang ${v29ModeLabel()} • bấm để lật</span>
      <div id="v29-verb-answer"></div>
    </button>

    <div id="v29-verb-rate"></div>

    <div class="v29-verb-bottom">
      <button class="ghost-btn" onclick="v29ShuffleCurrentVerbSet()">↻ Xáo lại bộ này</button>
    </div>
  </div>`;
}

function v29RevealVerb(){
  const s=v29VerbState;
  if(!s||s.revealed)return;
  s.revealed=true;

  const v=s.cards[s.index];
  const answer=v29VerbAnswer(v);

  const hint=document.getElementById('v29-verb-hint');
  if(hint)hint.textContent='ĐÁP ÁN';

  const ans=document.getElementById('v29-verb-answer');
  if(ans){
    ans.innerHTML=`<b>${escapeHtml(answer)}</b>
      <small>${escapeHtml(v.masu)} → ${escapeHtml(answer)} • Nhóm ${v.group}</small>`;
  }

  document.getElementById('v29-verb-rate').innerHTML=`
    <div class="v29-verb-rate-row">
      <button class="memory-btn again" onclick="v29RateVerb(false)">Quên</button>
      <button class="memory-btn good" onclick="v29RateVerb(true)">Nhớ</button>
    </div>`;
}

function v29RateVerb(ok){
  const s=v29VerbState;
  if(!s||!s.revealed)return;

  const v=s.cards[s.index];
  const answer=v29VerbAnswer(v);
  const skill=s.mode==='dictionary'
    ? 'verb-appendix-dictionary'
    : 'verb-appendix-te';

  if(ok)s.remembered++;
  else{
    s.forgot++;
    s.forgotten.push(v);
  }

  recordRecallEvent({
    itemKey:recallKey(['verb-appendix',v.group,v.masu,s.mode]),
    domain:'grammar',
    skill,
    itemLabel:v.masu,
    target:answer,
    prompt:`${v.masu} → ${v29ModeLabel()}?`,
    selected:ok?'remembered':'forgot',
    correctAnswer:answer,
    correct:ok,
    rating:ok?'good':'again',
    responseMs:Date.now()-(s.cardStartedAt||Date.now()),
    source:`V29 • Động từ cuối sách • PDF p.${v.sourcePage}`,
    qType:'verb-appendix-flash',
    extra:{group:v.group,sourcePage:v.sourcePage,mode:s.mode}
  });

  s.index++;
  v29RenderVerbCard();
}

function v29RetryForgotten(){
  const s=v29VerbState;
  if(!s?.forgotten?.length)return;

  s.cards=shuffle([...s.forgotten]);
  s.index=0;
  s.revealed=false;
  s.remembered=0;
  s.forgot=0;
  s.forgotten=[];
  v29RenderVerbCard();
}

function v29NewRandomVerbSet(){
  const s=v29VerbState;
  if(!s)return;

  let pool=[...V29_VERB_APPENDIX];
  if(s.group!=='all'){
    pool=pool.filter(v=>String(v.group)===s.group);
  }
  pool=shuffle(pool);

  if(s.count!=='all'){
    pool=pool.slice(0,Math.min(+s.count,pool.length));
  }

  s.cards=pool;
  s.index=0;
  s.revealed=false;
  s.remembered=0;
  s.forgot=0;
  s.forgotten=[];
  v29RenderVerbCard();
}

function v29ShuffleCurrentVerbSet(){
  const s=v29VerbState;
  if(!s)return;
  s.cards=shuffle([...s.cards]);
  s.index=0;
  s.revealed=false;
  s.remembered=0;
  s.forgot=0;
  s.forgotten=[];
  v29RenderVerbCard();
}

function v29RenderVerbResult(){
  const s=v29VerbState;
  const area=document.getElementById('v29-verb-area');
  if(!s||!area)return;

  const total=s.cards.length;
  const pct=total?Math.round(s.remembered/total*100):0;

  area.innerHTML=`<div class="v29-verb-result">
    <span>${v29ModeLabel()} • COMPLETE</span>
    <h2>${s.remembered}/${total}</h2>
    <p>Nhớ <b>${pct}%</b> • Quên ${s.forgot} động từ.</p>

    <div>
      ${s.forgotten.length
        ? `<button class="primary-btn" onclick="v29RetryForgotten()">Ôn lại ${s.forgotten.length} từ quên →</button>`
        : ''}
      <button class="secondary-btn" onclick="v29NewRandomVerbSet()">Random bộ mới ↻</button>
      <button class="ghost-btn" onclick="openV29VerbAppendix()">Đổi thể / số thẻ</button>
    </div>
  </div>`;
}

/* Add a clear card inside Luyện tập. */
function v29InjectVerbPracticeCard(){
  const grid=document.querySelector('.mode-grid');
  if(!grid || grid.querySelector('.v29-verb-practice-card'))return;

  const card=document.createElement('button');
  card.className='mode-card v29-verb-practice-card';
  card.onclick=openV29VerbAppendix;
  card.innerHTML=`<h3>動 Động từ cuối sách</h3>
    <p>Flashcard random: nhìn ます-form rồi tự chia sang て-form hoặc thể thường / nguyên dạng.</p>
    <small>Nhóm I • II • III</small>`;

  grid.appendChild(card);
}

const _v29OpenPractice=openPractice;
openPractice=function(){
  const r=_v29OpenPractice();
  setTimeout(v29InjectVerbPracticeCard,0);
  return r;
};

setTimeout(v29InjectVerbPracticeCard,0);

/* Recall labels */
const _v29RecallSkillLabel=recallSkillLabel;
recallSkillLabel=function(skill){
  const labels={
    'verb-appendix-te':'Động từ: ます → て',
    'verb-appendix-dictionary':'Động từ: ます → 辞書形'
  };
  return labels[skill]||_v29RecallSkillLabel(skill);
};
