/* ==========================================================
   V26 — VISIBLE 50 LESSONS + VIETNAMESE -> JAPANESE FLASH HUB
   ========================================================== */

const V26_VI_FLASH_STATE_KEY='nihongoV26ViFlashState';
let v26ViFlashState=null;

/* Make Vietnamese -> Japanese the default per-lesson direction. */
n5FlashDirection='vi';
n4mFlashDirection='vi';
try{
  localStorage.setItem(V25_N5_FLASH_DIR_KEY,'vi');
  localStorage.setItem(V25_N4_FLASH_DIR_KEY,'vi');
}catch{}

function v26AllLessons(){
  const n5=LESSONS.map(l=>({
    id:l.id,
    level:'N5',
    vocab:l.vocab,
    open:()=>openLesson(l.id,'flash')
  }));
  const n4=N4_MINNA_LESSONS.map(l=>({
    id:l.id,
    level:'N4',
    vocab:l.vocab,
    open:()=>n4mOpenLesson(l.id,'flash')
  }));
  return [...n5,...n4];
}
function v26Lesson(id){
  id=+id;
  if(id<=25){
    const l=LESSONS[id-1];
    return {id,level:'N5',vocab:l.vocab};
  }
  const l=n4mLesson(id);
  return {id,level:'N4',vocab:l.vocab};
}
function v26Kana(v){ return String(v.kana||v.jp||'').trim(); }

function v26OpenLesson(id){
  id=+id;
  if(id<=25)openLesson(id,'flash');
  else n4mOpenLesson(id,'flash');
}

/* ------------ HOME: make 26–50 visible on the same page ------------ */
function v26InjectHome(){
  const root=document.getElementById('app');
  if(!root)return;

  // Prominent Vietnamese flash card.
  if(!document.getElementById('v26-vi-flash-home')){
    const firstGrid=root.querySelector('.lesson-grid');
    const card=document.createElement('section');
    card.id='v26-vi-flash-home';
    card.className='v26-vi-flash-home';
    card.innerHTML=`<div class="v26-home-icon">🇻🇳</div>
      <div class="v26-home-copy">
        <span>ACTIVE RECALL • 50 BÀI</span>
        <h2>Flashcard Tiếng Việt → nhớ Tiếng Nhật</h2>
        <p>Chọn bất kỳ Bài 1–50. Mặt trước chỉ hiện nghĩa Việt; lật thẻ mới xem Kana tiếng Nhật.</p>
      </div>
      <button class="primary-btn" onclick="openViToJpFlashHub()">Mở Flash Việt → Nhật</button>`;
    if(firstGrid)firstGrid.insertAdjacentElement('beforebegin',card);
    else root.prepend(card);
  }

  // Full N4 26-50 grid directly on Home.
  if(!document.getElementById('v26-home-n4-lessons')){
    const section=document.createElement('section');
    section.id='v26-home-n4-lessons';
    section.className='v26-home-n4-section';
    section.innerHTML=`<div class="section-title v26-n4-title">
      <div>
        <span class="v26-section-kicker">MINNA NO NIHONGO II • N4</span>
        <h2>Bài 26–50</h2>
        <p>25 bài N4 tiếp theo • ${N4_MINNA_SOURCE.total} mục từ / biểu đạt.</p>
      </div>
      <div class="v26-section-actions">
        <button class="secondary-btn" onclick="openViToJpFlashHub('n4')">🇻🇳 Flash Việt→Nhật N4</button>
        <button class="primary-btn" onclick="openN4MinnaHome()">Mở khu N4 →</button>
      </div>
    </div>
    <div class="lesson-grid n4m-grid v26-home-grid">
      ${N4_MINNA_LESSONS.map(l=>`
        <button class="lesson-card n4m-lesson-card v26-home-lesson" onclick="n4mOpenLesson(${l.id},'flash')">
          <span class="lesson-no">${l.id}</span>
          <span class="v26-level-chip">N4</span>
          <h3>Bài ${l.id}</h3>
          <p>${l.vocab.length} từ / biểu đạt</p>
          <div class="badges">
            <span class="badge">🇻🇳→🇯🇵</span>
            <span class="badge">Flashcard</span>
            <span class="badge">Quiz</span>
          </div>
        </button>`).join('')}
    </div>`;
    const n5grid=root.querySelector('.lesson-grid');
    if(n5grid)n5grid.insertAdjacentElement('afterend',section);
    else root.appendChild(section);
  }

  // Rename N5 title so 1-25 vs 26-50 is unambiguous.
  const headings=[...root.querySelectorAll('h1,h2')];
  const choose=headings.find(x=>/Chọn bài để học/i.test(x.textContent||''));
  if(choose && !choose.dataset.v26done){
    choose.textContent='N5 • Bài 1–25';
    choose.dataset.v26done='1';
  }
}

const _v26GoHome=goHome;
goHome=function(){
  const r=_v26GoHome();
  setTimeout(v26InjectHome,0);
  return r;
};

/* ------------ Dedicated Vietnamese -> Japanese flash hub ------------ */
function v26Checked(){
  return [...document.querySelectorAll('.v26-flash-check:checked')]
    .map(x=>+x.value).filter(Boolean);
}
function v26SetChecks(ids){
  const set=new Set(ids);
  document.querySelectorAll('.v26-flash-check').forEach(x=>x.checked=set.has(+x.value));
  v26UpdateSummary();
}
function v26Range(a,b){ return [...Array(b-a+1)].map((_,i)=>a+i); }

function v26UpdateSummary(){
  const ids=v26Checked();
  const count=ids.reduce((s,id)=>s+v26Lesson(id).vocab.length,0);
  const box=document.getElementById('v26-flash-summary');
  if(box)box.innerHTML=`Đã chọn <b>${ids.length}</b> bài • <b>${count}</b> từ / biểu đạt`;
}

function openViToJpFlashHub(preset='all'){
  setNav('viflash');
  const root=document.getElementById('app');
  if(!root)return;

  root.innerHTML=`<div class="breadcrumb">
    <button onclick="goHome()">Trang chủ</button> › Flash Việt → Nhật
  </div>

  <section class="v26-flash-hero">
    <div>
      <span class="v26-section-kicker">VIETNAMESE → JAPANESE • BÀI 1–50</span>
      <h1>🇻🇳 Tiếng Việt → nhớ Tiếng Nhật</h1>
      <p>Mặt trước <b>chỉ hiện nghĩa tiếng Việt</b>. Hãy tự nhớ tiếng Nhật rồi bấm lật để kiểm tra Kana.</p>
    </div>
    <div class="v26-flash-demo">
      <small>Mặt trước</small>
      <b>mượn, vay</b>
      <span>↓ lật thẻ</span>
      <strong>かります</strong>
    </div>
  </section>

  <section class="panel v26-flash-setup">
    <div class="section-title">
      <div><h2>Chọn Bài 1–50</h2><p>Chọn một hoặc nhiều bài rồi random Flashcard.</p></div>
      <div class="v26-quick-ranges">
        <button class="secondary-btn" onclick="v26SetChecks(v26Range(1,5))">1–5</button>
        <button class="secondary-btn" onclick="v26SetChecks(v26Range(1,10))">1–10</button>
        <button class="secondary-btn" onclick="v26SetChecks(v26Range(1,25))">N5 • 1–25</button>
        <button class="secondary-btn" onclick="v26SetChecks(v26Range(26,50))">N4 • 26–50</button>
        <button class="primary-btn" onclick="v26SetChecks(v26Range(1,50))">Tất cả 1–50</button>
        <button class="ghost-btn" onclick="v26SetChecks([])">Bỏ chọn</button>
      </div>
    </div>

    <div class="v26-lesson-groups">
      <div class="v26-lesson-group">
        <h3>N5 • Bài 1–25</h3>
        <div class="v26-lesson-selector">
          ${LESSONS.map(l=>`<label>
            <input class="v26-flash-check" type="checkbox" value="${l.id}" onchange="v26UpdateSummary()">
            <span><b>${l.id}</b><small>${l.vocab.length} từ</small></span>
          </label>`).join('')}
        </div>
      </div>

      <div class="v26-lesson-group">
        <h3>N4 • Bài 26–50</h3>
        <div class="v26-lesson-selector">
          ${N4_MINNA_LESSONS.map(l=>`<label>
            <input class="v26-flash-check" type="checkbox" value="${l.id}" onchange="v26UpdateSummary()">
            <span><b>${l.id}</b><small>${l.vocab.length} từ</small></span>
          </label>`).join('')}
        </div>
      </div>
    </div>

    <div id="v26-flash-summary" class="v26-flash-summary"></div>

    <div class="v26-options">
      <label><b>Số thẻ</b>
        <select id="v26-flash-count">
          <option value="10">10 thẻ</option>
          <option value="20" selected>20 thẻ</option>
          <option value="50">50 thẻ</option>
          <option value="100">100 thẻ</option>
          <option value="all">Tất cả từ đã chọn</option>
        </select>
      </label>
      <button class="primary-btn" onclick="v26StartViFlash()">Bắt đầu Flash Việt → Nhật →</button>
    </div>

    <div id="v26-flash-area"></div>
  </section>`;

  if(preset==='n4')v26SetChecks(v26Range(26,50));
  else if(preset==='n5')v26SetChecks(v26Range(1,25));
  else v26SetChecks(v26Range(1,5));
}

function v26BuildCards(ids,count){
  let pool=[];
  ids.forEach(id=>{
    const l=v26Lesson(id);
    l.vocab.forEach((v,index)=>{
      pool.push({
        lesson:id,
        level:l.level,
        index,
        vi:v.vi,
        kana:v26Kana(v),
        jp:v.jp||v.kana||'',
        reading:v.reading||''
      });
    });
  });
  pool=shuffle(pool);
  if(count!=='all')pool=pool.slice(0,Math.min(+count,pool.length));
  return pool;
}

function v26StartViFlash(){
  const ids=v26Checked();
  if(!ids.length){
    const b=document.getElementById('v26-flash-summary');
    if(b)b.innerHTML='<span class="danger">Hãy chọn ít nhất 1 bài.</span>';
    return;
  }

  const count=document.getElementById('v26-flash-count')?.value||'20';
  v26ViFlashState={
    ids,
    count,
    cards:v26BuildCards(ids,count),
    index:0,
    revealed:false,
    remembered:0,
    forgot:0,
    forgotten:[],
    cardStartedAt:Date.now()
  };
  v26RenderViFlash();
}

function v26RenderViFlash(){
  const s=v26ViFlashState;
  const area=document.getElementById('v26-flash-area');
  if(!s||!area)return;
  if(s.index>=s.cards.length){
    v26RenderViFlashResult();
    return;
  }

  const c=s.cards[s.index];
  const pct=Math.round(s.index/s.cards.length*100);
  const hasKanji=c.jp && c.jp!==c.kana;
  s.revealed=false;
  s.cardStartedAt=Date.now();

  area.innerHTML=`<div class="v26-study-session">
    <div class="v26-study-top">
      <div><span>${c.level} • BÀI ${c.lesson}</span><b>🇻🇳 VIỆT → 🇯🇵 NHẬT</b></div>
      <strong>${s.index+1}/${s.cards.length}</strong>
    </div>

    <div class="progressbar v26-study-progress"><span style="width:${pct}%"></span></div>

    <button class="v26-vi-card" onclick="v26RevealViFlash()">
      <small>MẶT TRƯỚC • TIẾNG VIỆT</small>
      <strong>${escapeHtml(c.vi)}</strong>
      <span id="v26-flip-hint">Tự nhớ tiếng Nhật • bấm để lật</span>
      <div id="v26-jp-answer"></div>
    </button>

    <div id="v26-rate-area"></div>
  </div>`;
}

function v26RevealViFlash(){
  const s=v26ViFlashState;
  if(!s||s.revealed)return;
  s.revealed=true;
  const c=s.cards[s.index];
  const hasKanji=c.jp && c.jp!==c.kana;

  const hint=document.getElementById('v26-flip-hint');
  if(hint)hint.textContent='ĐÁP ÁN TIẾNG NHẬT';

  const ans=document.getElementById('v26-jp-answer');
  if(ans)ans.innerHTML=`
    <b>${escapeHtml(c.kana)}</b>
    ${hasKanji?`<strong>${escapeHtml(c.jp)}</strong>`:''}
    ${c.reading?`<small>${escapeHtml(c.reading)}</small>`:''}`;

  document.getElementById('v26-rate-area').innerHTML=`
    <div class="v26-rate-row">
      <button class="memory-btn again" onclick="v26RateViFlash(false)">Quên</button>
      <button class="memory-btn good" onclick="v26RateViFlash(true)">Nhớ</button>
    </div>`;
}

function v26RateViFlash(ok){
  const s=v26ViFlashState;
  if(!s||!s.revealed)return;
  const c=s.cards[s.index];

  if(ok)s.remembered++;
  else{
    s.forgot++;
    s.forgotten.push(c);
  }

  recordRecallEvent({
    itemKey:recallKey(['v26-vi-jp',c.lesson,c.index]),
    domain:'vocab',
    skill:'flash-vi-jp',
    lesson:c.lesson,
    itemLabel:c.kana,
    target:c.kana,
    prompt:`${c.vi} → tiếng Nhật?`,
    selected:ok?'remembered':'forgot',
    correctAnswer:c.kana,
    correct:ok,
    rating:ok?'good':'again',
    responseMs:Date.now()-(s.cardStartedAt||Date.now()),
    source:`V26 • Việt → Nhật • ${c.level} Bài ${c.lesson}`,
    qType:'v26-vi-to-jp-flash',
    extra:{level:c.level,vocabIndex:c.index}
  });

  s.index++;
  v26RenderViFlash();
}

function v26RetryForgotten(){
  const s=v26ViFlashState;
  if(!s?.forgotten?.length)return;
  s.cards=shuffle([...s.forgotten]);
  s.index=0;
  s.remembered=0;
  s.forgot=0;
  s.forgotten=[];
  s.revealed=false;
  v26RenderViFlash();
}

function v26NewRandomSet(){
  const s=v26ViFlashState;
  if(!s)return;
  s.cards=v26BuildCards(s.ids,s.count);
  s.index=0;
  s.remembered=0;
  s.forgot=0;
  s.forgotten=[];
  s.revealed=false;
  v26RenderViFlash();
}

function v26RenderViFlashResult(){
  const s=v26ViFlashState;
  const area=document.getElementById('v26-flash-area');
  const total=s.cards.length;
  const pct=total?Math.round(s.remembered/total*100):0;

  area.innerHTML=`<div class="v26-flash-result">
    <span>VIỆT → NHẬT COMPLETE</span>
    <h2>${s.remembered}/${total}</h2>
    <p>Nhớ <b>${pct}%</b> • Quên ${s.forgot} thẻ.</p>
    <div>
      ${s.forgotten.length?`<button class="primary-btn" onclick="v26RetryForgotten()">Ôn lại ${s.forgotten.length} thẻ quên →</button>`:''}
      <button class="secondary-btn" onclick="v26NewRandomSet()">Random bộ mới ↻</button>
      <button class="ghost-btn" onclick="openViToJpFlashHub()">Chọn lại bài</button>
    </div>
  </div>`;
}

/* Initial injection, in case home was already rendered before V26 loaded. */
setTimeout(v26InjectHome,0);
