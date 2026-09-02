/* ==========================================================
   V27 — RANDOM FLASHCARDS FOR "KANJI THEO BÀI"
   ========================================================== */

let v27KanjiRandomState=null;

function v27SelectedKanjiPool(){
  return getKanji218SelectedPool();
}

function v27EnsureRandomButton(){
  const modes=document.querySelector('.k218-modes');
  if(!modes || modes.querySelector('[data-kmode="random"]')) return;

  const btn=document.createElement('button');
  btn.className='v27-krandom-btn';
  btn.dataset.kmode='random';
  btn.innerHTML='🎲 Flashcard Random';
  btn.onclick=()=>v27OpenKanjiRandom(btn);

  const quizBtn=modes.querySelector('[data-kmode="quiz"]');
  if(quizBtn) modes.insertBefore(btn,quizBtn);
  else modes.appendChild(btn);
}

function v27OpenKanjiRandom(btn=null){
  kanji218Mode='random';
  kanji218Index=0;
  v27KanjiRandomState=null;

  document.querySelectorAll('[data-kmode]').forEach(x=>{
    x.classList.toggle('active', x===btn || x.dataset.kmode==='random');
  });

  v27RenderKanjiRandomSetup();
}

/* Add Random button whenever Kanji page opens. */
const _v27OpenKanji218=openKanji218;
openKanji218=function(){
  const r=_v27OpenKanji218();
  v27EnsureRandomButton();
  return r;
};

/* Support the random mode in the main renderer. */
const _v27RenderKanji218Content=renderKanji218Content;
renderKanji218Content=function(){
  if(kanji218Mode==='random'){
    v27EnsureRandomButton();
    return v27RenderKanjiRandomSetup();
  }
  return _v27RenderKanji218Content();
};

/* Reset random session when group selection changes. */
const _v27ToggleKanji218Group=toggleKanji218Group;
toggleKanji218Group=function(id){
  v27KanjiRandomState=null;
  return _v27ToggleKanji218Group(id);
};

const _v27SelectKanji218Groups=selectKanji218Groups;
selectKanji218Groups=function(mode){
  v27KanjiRandomState=null;
  return _v27SelectKanji218Groups(mode);
};

function v27KanjiRandomGroupsLabel(){
  return selectedKanji218Groups().map(g=>g.label).join(', ');
}

function v27RenderKanjiRandomSetup(){
  const box=document.getElementById('kanji218-content');
  if(!box)return;

  v27EnsureRandomButton();

  const pool=v27SelectedKanjiPool();
  const known=pool.filter(k=>isKanji218Known(k.kanji)).length;

  box.innerHTML=`<div class="v27-kr-setup">
    <section class="v27-kr-hero">
      <div>
        <span class="hard-badge v27-random-badge">🎲 RANDOM FLASHCARD</span>
        <h2>Ôn Kanji ngẫu nhiên theo bài đã chọn</h2>
        <p>Web sẽ xáo ngẫu nhiên các Kanji trong <b>${escapeHtml(v27KanjiRandomGroupsLabel())}</b>. Mỗi chữ chỉ xuất hiện một lần trong một lượt.</p>
      </div>
      <div class="v27-kr-stat">
        <b>${pool.length}</b>
        <span>Kanji trong phạm vi</span>
        <small>Đã đánh dấu nhớ: ${known}/${pool.length}</small>
      </div>
    </section>

    <div class="v27-kr-settings">
      <label>
        <b>Số thẻ</b>
        <select id="v27-kr-count">
          <option value="10">10 thẻ</option>
          <option value="20" selected>20 thẻ</option>
          <option value="50">50 thẻ</option>
          <option value="all">Tất cả ${pool.length} chữ</option>
        </select>
      </label>

      <label class="v27-kr-check">
        <input id="v27-kr-weak" type="checkbox">
        <span>
          <b>Ưu tiên chữ chưa nhớ</b>
          <small>Đưa chữ chưa đánh dấu nhớ lên trước rồi vẫn xáo random</small>
        </span>
      </label>

      <button class="primary-btn" onclick="v27StartKanjiRandom()">Bắt đầu Random →</button>
    </div>

    <div class="v27-kr-preview">
      <b>Phạm vi hiện tại:</b>
      <span>${escapeHtml(v27KanjiRandomGroupsLabel())}</span>
      <small>Muốn đổi bài/nhóm thì chọn ở phần phía trên.</small>
    </div>

    <div id="v27-kr-area"></div>
  </div>`;
}

function v27BuildRandomCards(){
  let pool=[...v27SelectedKanjiPool()];
  const weak=document.getElementById('v27-kr-weak')?.checked||false;
  const count=document.getElementById('v27-kr-count')?.value||'20';

  if(weak){
    const unknown=shuffle(pool.filter(k=>!isKanji218Known(k.kanji)));
    const known=shuffle(pool.filter(k=>isKanji218Known(k.kanji)));
    pool=[...unknown,...known];
  }else{
    pool=shuffle(pool);
  }

  if(count!=='all'){
    pool=pool.slice(0,Math.min(+count,pool.length));
  }

  return {cards:pool,count,weak};
}

function v27StartKanjiRandom(){
  const built=v27BuildRandomCards();

  if(!built.cards.length){
    const area=document.getElementById('v27-kr-area');
    if(area)area.innerHTML='<div class="empty"><p>Không có Kanji trong phạm vi đã chọn.</p></div>';
    return;
  }

  v27KanjiRandomState={
    cards:built.cards,
    count:built.count,
    weak:built.weak,
    index:0,
    revealed:false,
    remembered:0,
    forgot:0,
    forgotten:[],
    cardStartedAt:Date.now()
  };

  v27RenderKanjiRandomCard();
}

function v27RenderKanjiRandomCard(){
  const s=v27KanjiRandomState;
  const area=document.getElementById('v27-kr-area');
  if(!s||!area)return;

  if(s.index>=s.cards.length){
    return v27RenderKanjiRandomResult();
  }

  const k=s.cards[s.index];
  const g=getKanji218GroupForItem(k);
  const ex=collectKanji218Examples(k).slice(0,3);
  const pct=Math.round(s.index/s.cards.length*100);

  s.revealed=false;
  s.cardStartedAt=Date.now();

  area.innerHTML=`<div class="v27-kr-session">
    <div class="v27-kr-top">
      <div>
        <span>🎲 RANDOM</span>
        <b>${escapeHtml(g?.label||'')} • #${k.id}</b>
      </div>
      <strong>${s.index+1}/${s.cards.length}</strong>
    </div>

    <div class="progressbar v27-kr-progress">
      <span style="width:${pct}%"></span>
    </div>

    <button class="v27-kr-card" onclick="v27RevealKanjiRandom()">
      <small>MẶT TRƯỚC • TỰ NHỚ NGHĨA + CÁCH ĐỌC</small>
      <strong>${k.kanji}</strong>
      <span id="v27-kr-flip">Bấm để lật thẻ</span>
      <div id="v27-kr-answer"></div>
    </button>

    <div id="v27-kr-rate"></div>

    <div class="v27-kr-actions">
      <button class="ghost-btn" onclick="v27ShuffleCurrentKanjiSet()">↻ Xáo lại bộ này</button>
    </div>
  </div>`;
}

function v27RevealKanjiRandom(){
  const s=v27KanjiRandomState;
  if(!s||s.revealed)return;

  s.revealed=true;

  const k=s.cards[s.index];
  const g=getKanji218GroupForItem(k);
  const ex=collectKanji218Examples(k).slice(0,3);

  const flip=document.getElementById('v27-kr-flip');
  if(flip)flip.textContent='ĐÁP ÁN';

  const ans=document.getElementById('v27-kr-answer');
  if(ans){
    ans.innerHTML=`<div class="v27-kr-answer-main">
        <b>${escapeHtml(k.meaning)}</b>
        <small>${escapeHtml(g?.imageLabel||'')} • ${escapeHtml(k.jlpt||'')}</small>
      </div>

      <div class="v27-kr-readings">
        <span><small>ONYOMI</small><b>${escapeHtml(k.on||'—')}</b></span>
        <span><small>KUNYOMI</small><b>${escapeHtml(k.kun||'—')}</b></span>
      </div>

      ${ex.length?`<div class="v27-kr-examples">
        ${ex.map(x=>`<span>
          <b>${escapeHtml(x.word)}</b>
          <small>${escapeHtml(x.reading)} • ${escapeHtml(x.meaning)}</small>
        </span>`).join('')}
      </div>`:''}`;
  }

  const rate=document.getElementById('v27-kr-rate');
  if(rate){
    rate.innerHTML=`<div class="v27-kr-rate-row">
      <button class="memory-btn again" onclick="v27RateKanjiRandom(false)">Quên</button>
      <button class="memory-btn good" onclick="v27RateKanjiRandom(true)">Nhớ</button>
    </div>`;
  }
}

function v27RateKanjiRandom(ok){
  const s=v27KanjiRandomState;
  if(!s||!s.revealed)return;

  const k=s.cards[s.index];
  const g=getKanji218GroupForItem(k);

  if(ok){
    s.remembered++;
    setKanji218Known(k.kanji,true);
  }else{
    s.forgot++;
    s.forgotten.push(k);
    setKanji218Known(k.kanji,false);
  }

  recordRecallEvent({
    itemKey:recallKey(['k218-random',k.kanji]),
    domain:'kanji218',
    skill:'kanji218-random-flash',
    itemLabel:k.kanji,
    target:k.kanji,
    prompt:`${k.kanji} → nhớ nghĩa / On / Kun`,
    selected:ok?'remembered':'forgot',
    correctAnswer:`${k.meaning} • On: ${k.on} • Kun: ${k.kun}`,
    correct:ok,
    rating:ok?'good':'again',
    responseMs:Date.now()-(s.cardStartedAt||Date.now()),
    source:`V27 • Kanji Random • ${g?.label||''}`,
    qType:'kanji218-random-flash',
    extra:{kanjiId:k.id,group:k.imageGroup}
  });

  s.index++;
  v27RenderKanjiRandomCard();
}

function v27ShuffleCurrentKanjiSet(){
  const s=v27KanjiRandomState;
  if(!s)return;

  s.cards=shuffle([...s.cards]);
  s.index=0;
  s.revealed=false;
  s.remembered=0;
  s.forgot=0;
  s.forgotten=[];
  v27RenderKanjiRandomCard();
}

function v27RetryForgottenKanji(){
  const s=v27KanjiRandomState;
  if(!s?.forgotten?.length)return;

  s.cards=shuffle([...s.forgotten]);
  s.index=0;
  s.revealed=false;
  s.remembered=0;
  s.forgot=0;
  s.forgotten=[];
  v27RenderKanjiRandomCard();
}

function v27NewRandomKanjiSet(){
  const s=v27KanjiRandomState;
  if(!s)return;

  let pool=[...v27SelectedKanjiPool()];

  if(s.weak){
    const unknown=shuffle(pool.filter(k=>!isKanji218Known(k.kanji)));
    const known=shuffle(pool.filter(k=>isKanji218Known(k.kanji)));
    pool=[...unknown,...known];
  }else{
    pool=shuffle(pool);
  }

  if(s.count!=='all'){
    pool=pool.slice(0,Math.min(+s.count,pool.length));
  }

  s.cards=pool;
  s.index=0;
  s.revealed=false;
  s.remembered=0;
  s.forgot=0;
  s.forgotten=[];
  v27RenderKanjiRandomCard();
}

function v27RenderKanjiRandomResult(){
  const s=v27KanjiRandomState;
  const area=document.getElementById('v27-kr-area');
  if(!area)return;

  const total=s.cards.length;
  const pct=total?Math.round(s.remembered/total*100):0;

  area.innerHTML=`<div class="v27-kr-result">
    <span>🎲 RANDOM FLASH COMPLETE</span>
    <h2>${s.remembered}/${total}</h2>
    <p>Nhớ <b>${pct}%</b> • Quên ${s.forgot} chữ.</p>

    <div class="v27-kr-result-actions">
      ${s.forgotten.length
        ? `<button class="primary-btn" onclick="v27RetryForgottenKanji()">Ôn lại ${s.forgotten.length} chữ quên →</button>`
        : ''}
      <button class="secondary-btn" onclick="v27NewRandomKanjiSet()">Random bộ mới ↻</button>
      <button class="ghost-btn" onclick="v27RenderKanjiRandomSetup()">Chọn lại số thẻ</button>
    </div>
  </div>`;
}

/* Recall label */
const _v27RecallSkillLabel=recallSkillLabel;
recallSkillLabel=function(skill){
  if(skill==='kanji218-random-flash')return '218 Kanji: Flash random';
  return _v27RecallSkillLabel(skill);
};

/* If user is already on Kanji page when V27 loads. */
setTimeout(v27EnsureRandomButton,0);
