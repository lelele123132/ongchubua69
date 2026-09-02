/* ==========================================================
   V23 — RANDOM VOCAB FLASHCARDS
   ========================================================== */
let vfState=null;

function vfKana(v){ return String(v.kana||v.jp||'').trim(); }

function vfSelectedLessonIds(){
  return [...document.querySelectorAll('.vf-lesson-check:checked')].map(x=>+x.value).filter(Boolean);
}
function vfSetLessons(ids){
  const set=new Set(ids);
  document.querySelectorAll('.vf-lesson-check').forEach(x=>x.checked=set.has(+x.value));
  vfUpdateSummary();
}
function vfSelectRange(a,b){ vfSetLessons([...Array(b-a+1)].map((_,i)=>a+i)); }
function vfToggleAll(on=true){ vfSetLessons(on?LESSONS.map(l=>l.id):[]); }

function vfUpdateSummary(){
  const box=document.getElementById('vf-summary'); if(!box)return;
  const ids=vfSelectedLessonIds();
  const total=ids.reduce((s,id)=>s+LESSONS[id-1].vocab.length,0);
  box.innerHTML=`Đã chọn <b>${ids.length}</b> bài • <b>${total}</b> từ trong phạm vi`;
}

function openVocabFlashcards(){
  try{setNav('vocab')}catch{}
  const appBox=document.getElementById('app'); if(!appBox)return;
  appBox.innerHTML=`<div class="breadcrumb"><button onclick="goHome()">Trang chủ</button> › Flashcard từ vựng</div>
  <section class="vf-hero">
    <div><span class="vf-kicker">VOCAB • RANDOM FLASHCARDS</span><h1>Ôn Flashcard từ vựng</h1>
      <p>Chọn một hoặc nhiều bài, sau đó web sẽ trộn từ ngẫu nhiên. Flashcard dùng <b>Kana ↔ nghĩa Việt</b>.</p></div>
    <div class="vf-hero-badge"><b>漢字 OFF</b><span>Random mỗi lượt</span></div>
  </section>
  <section class="panel vf-setup">
    <div class="section-title"><div><h2>Chọn bài</h2><p>Có thể chọn nhiều bài cùng lúc.</p></div>
      <div class="vf-quick">
        <button class="secondary-btn" onclick="vfSelectRange(1,5)">1–5</button>
        <button class="secondary-btn" onclick="vfSelectRange(1,10)">1–10</button>
        <button class="secondary-btn" onclick="vfSelectRange(11,20)">11–20</button>
        <button class="secondary-btn" onclick="vfToggleAll(true)">Tất cả</button>
        <button class="ghost-btn" onclick="vfToggleAll(false)">Bỏ chọn</button>
      </div>
    </div>
    <div class="vf-lessons">
      ${LESSONS.map(l=>`<label class="vf-lesson">
        <input class="vf-lesson-check" type="checkbox" value="${l.id}" onchange="vfUpdateSummary()">
        <span><b>Bài ${l.id}</b><small>${l.vocab.length} từ</small></span>
      </label>`).join('')}
    </div>
    <div id="vf-summary" class="vf-summary"></div>
    <div class="vf-options">
      <label><b>Mặt trước</b><select id="vf-direction">
        <option value="mixed" selected>Trộn Kana ↔ nghĩa</option>
        <option value="kana">Kana → nghĩa Việt</option>
        <option value="vi">Nghĩa Việt → Kana</option>
      </select></label>
      <label><b>Số thẻ</b><select id="vf-count">
        <option value="10">10 thẻ</option><option value="20" selected>20 thẻ</option>
        <option value="50">50 thẻ</option><option value="all">Tất cả</option>
      </select></label>
      <button class="primary-btn" onclick="startVocabFlashcards()">Bắt đầu Flashcard →</button>
    </div>
    <div id="vf-area"></div>
  </section>`;
  vfSelectRange(1,1);
}

function buildVocabFlashcards(ids,direction,count){
  let pool=[];
  ids.forEach(id=>{
    const l=LESSONS[id-1];
    l.vocab.forEach((v,i)=>pool.push({lesson:id,vocabIndex:i,kana:vfKana(v),vi:v.vi}));
  });
  pool=shuffle(pool);
  if(count!=='all')pool=pool.slice(0,Math.min(+count,pool.length));
  return pool.map((x,i)=>({...x,dir:direction==='mixed'?(i%2===0?'kana':'vi'):direction}));
}

function startVocabFlashcards(){
  const ids=vfSelectedLessonIds();
  if(!ids.length){
    const box=document.getElementById('vf-summary');
    if(box)box.innerHTML='<span class="danger">Hãy chọn ít nhất 1 bài.</span>';
    return;
  }
  const direction=document.getElementById('vf-direction')?.value||'mixed';
  const count=document.getElementById('vf-count')?.value||'20';
  vfState={ids,direction,requestedCount:count,cards:buildVocabFlashcards(ids,direction,count),
    index:0,revealed:false,remembered:0,forgot:0,forgottenCards:[],cardStartedAt:Date.now()};
  renderVocabFlashcard();
}

function renderVocabFlashcard(){
  const s=vfState,area=document.getElementById('vf-area'); if(!s||!area)return;
  if(s.index>=s.cards.length){renderVocabFlashResult();return}
  const c=s.cards[s.index],front=c.dir==='kana'?c.kana:c.vi,back=c.dir==='kana'?c.vi:c.kana;
  const pct=Math.round(s.index/s.cards.length*100);
  s.revealed=false;s.cardStartedAt=Date.now();
  area.innerHTML=`<div class="vf-session">
    <div class="vf-top"><div><span>BÀI ${c.lesson}</span><b>${c.dir==='kana'?'KANA → NGHĨA':'NGHĨA → KANA'}</b></div><strong>${s.index+1}/${s.cards.length}</strong></div>
    <div class="progressbar vf-progress"><span style="width:${pct}%"></span></div>
    <button class="vf-card" onclick="vfRevealCard()">
      <small>${c.dir==='kana'?'Đọc và nhớ nghĩa':'Nhớ cách đọc Kana'}</small>
      <strong>${escapeHtml(front)}</strong>
      <span id="vf-flip-hint">Bấm để lật thẻ</span>
      <div id="vf-card-back"></div>
    </button>
    <div id="vf-rate-area"></div>
    <div class="vf-session-actions"><button class="ghost-btn" onclick="vfShuffleAgain()">↻ Xáo lại bộ này</button></div>
  </div>`;
}

function vfRevealCard(){
  const s=vfState;if(!s||s.revealed)return;s.revealed=true;
  const c=s.cards[s.index],back=c.dir==='kana'?c.vi:c.kana;
  document.getElementById('vf-flip-hint').textContent='Đáp án';
  document.getElementById('vf-card-back').innerHTML=`<b>${escapeHtml(back)}</b><small>${escapeHtml(c.kana)} = ${escapeHtml(c.vi)}</small>`;
  document.getElementById('vf-rate-area').innerHTML=`<div class="vf-rate">
    <button class="memory-btn again" onclick="vfRate(false)">Quên</button>
    <button class="memory-btn good" onclick="vfRate(true)">Nhớ</button>
  </div>`;
}

function vfRate(remembered){
  const s=vfState;if(!s||!s.revealed)return;
  const c=s.cards[s.index];
  if(remembered)s.remembered++;else{s.forgot++;s.forgottenCards.push(c)}
  recordRecallEvent({
    itemKey:recallKey(['vocab-flash',c.lesson,c.vocabIndex,c.dir]),
    domain:'vocab',skill:c.dir==='kana'?'flash-kana-meaning':'flash-vi-kana',lesson:c.lesson,
    itemLabel:c.kana,target:c.kana,prompt:c.dir==='kana'?`${c.kana} → nghĩa?`:`${c.vi} → Kana?`,
    selected:remembered?'remembered':'forgot',correctAnswer:c.dir==='kana'?c.vi:c.kana,correct:remembered,
    responseMs:Date.now()-(s.cardStartedAt||Date.now()),rating:remembered?'good':'again',
    source:'V23 • Random Vocab Flashcards',qType:'vocab-flashcard',extra:{vocabIndex:c.vocabIndex,noKanji:true}
  });
  s.index++;renderVocabFlashcard();
}

function vfShuffleAgain(){
  const s=vfState;if(!s)return;
  s.cards=shuffle([...s.cards]);s.index=0;s.revealed=false;s.remembered=0;s.forgot=0;s.forgottenCards=[];
  renderVocabFlashcard();
}
function vfRetryForgotten(){
  const s=vfState;if(!s?.forgottenCards?.length)return;
  s.cards=shuffle([...s.forgottenCards]);s.index=0;s.revealed=false;s.remembered=0;s.forgot=0;s.forgottenCards=[];
  renderVocabFlashcard();
}
function renderVocabFlashResult(){
  const s=vfState,area=document.getElementById('vf-area');if(!area)return;
  const total=s.cards.length,pct=total?Math.round(s.remembered/total*100):0;
  area.innerHTML=`<div class="vf-result"><span>FLASHCARD COMPLETE</span><h2>${s.remembered}/${total}</h2>
    <p>Nhớ <b>${pct}%</b> • Quên ${s.forgot} thẻ.</p>
    <div class="vf-result-actions">
      ${s.forgottenCards.length?`<button class="primary-btn" onclick="vfRetryForgotten()">Ôn lại ${s.forgottenCards.length} thẻ quên →</button>`:''}
      <button class="secondary-btn" onclick="startVocabFlashcards()">Random bộ mới ↻</button>
      <button class="ghost-btn" onclick="openRecallLab()">Recall Lab</button>
    </div></div>`;
}

/* Shortcut in lesson vocab */
const _v23RenderVocab=renderVocab;
renderVocab=function(box,l){
  _v23RenderVocab(box,l);
  const head=box.querySelector('.vocab-mode-head');
  if(head&&!box.querySelector('.v23-flash-shortcut')){
    const btn=document.createElement('button');
    btn.className='secondary-btn v23-flash-shortcut';
    btn.innerHTML='🃏 Flashcard nhiều bài';
    btn.onclick=openVocabFlashcards;
    head.appendChild(btn);
  }
};
