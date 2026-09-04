/* ==========================================================
   V32 — ない-FORM RECOGNITION FLASHCARDS
   ========================================================== */

function v32ModeLabel(){
  const mode=v29VerbState?.mode;
  if(mode==='nai-meaning')return 'ない-FORM → ĐOÁN NGHĨA';
  if(mode==='dictionary')return 'THỂ THƯỜNG / NGUYÊN DẠNG（辞書形）';
  return 'て-FORM';
}

openV29VerbAppendix=function(){
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
      <p>Flashcard random từ bảng động từ cuối sách. Có thể luyện chia từ <b>ます</b> hoặc nhìn <b>ない-form</b> để đoán lại động từ và nghĩa.</p>
    </div>

    <div class="v29-verb-stats">
      <div><b>${V29_VERB_APPENDIX.length}</b><span>động từ</span></div>
      <small>Nhóm I ${counts[0]} • II ${counts[1]} • III ${counts[2]}</small>
    </div>
  </section>

  <div class="v29-source-note">
    <b>Nguồn:</b> mục “V. Biến đổi động từ” ở cuối PDF • Nhóm I / II / III.
  </div>

  <section class="panel v29-verb-setup">
    <div class="v29-verb-options">
      <label>
        <b>Kiểu Flashcard</b>
        <select id="v29-verb-mode">
          <option value="te" selected>ます → て-form</option>
          <option value="dictionary">ます → Thể thường / nguyên dạng（辞書形）</option>
          <option value="nai-meaning">ない-form → Đoán động từ + nghĩa</option>
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
      <span><b>行く</b> → いかない</span>
      <span><b>着る</b> → きない</span>
      <span><b>来る</b> → こない</span>
      <span><b>する</b> → しない</span>
      <span><b>ある</b> → ない</span>
    </div>

    <div id="v29-verb-area"></div>
  </section>`;
};

v29StartVerbFlash=function(){
  const mode=document.getElementById('v29-verb-mode')?.value||'te';
  const group=document.getElementById('v29-verb-group')?.value||'all';
  const count=document.getElementById('v29-verb-count')?.value||'20';

  let pool=[...V29_VERB_APPENDIX];
  if(group!=='all')pool=pool.filter(v=>String(v.group)===group);
  pool=shuffle(pool);

  if(count!=='all'){
    pool=pool.slice(0,Math.min(+count,pool.length));
  }

  v29VerbState={
    mode,group,count,cards:pool,index:0,revealed:false,
    remembered:0,forgot:0,forgotten:[],cardStartedAt:Date.now()
  };

  v29RenderVerbCard();
};

v29VerbAnswer=function(v){
  if(v29VerbState?.mode==='dictionary')return v.dictionary;
  if(v29VerbState?.mode==='nai-meaning')return v.masu;
  return v.te;
};

v29ModeLabel=function(){ return v32ModeLabel(); };

v29RenderVerbCard=function(){
  const s=v29VerbState;
  const area=document.getElementById('v29-verb-area');
  if(!s||!area)return;

  if(s.index>=s.cards.length)return v29RenderVerbResult();

  const v=s.cards[s.index];
  const pct=Math.round(s.index/s.cards.length*100);
  const isNai=s.mode==='nai-meaning';

  s.revealed=false;
  s.cardStartedAt=Date.now();

  const frontMain=isNai?v.nai:(v.display||v.masu);
  const frontSub=!isNai&&v.display!==v.masu?v.masu:'';

  area.innerHTML=`<div class="v29-verb-session">
    <div class="v29-verb-top">
      <div><span>NHÓM ${v.group}</span><b>${escapeHtml(v32ModeLabel())}</b></div>
      <strong>${s.index+1}/${s.cards.length}</strong>
    </div>

    <div class="progressbar v29-verb-progress"><span style="width:${pct}%"></span></div>

    <button class="v29-verb-card v31-verb-card v32-nai-card" onclick="v29RevealVerb()">
      <small>${isNai?'MẶT TRƯỚC • ない-FORM':'MẶT TRƯỚC • ます-FORM'}</small>
      <strong>${escapeHtml(frontMain)}</strong>
      ${frontSub?`<em>${escapeHtml(frontSub)}</em>`:''}

      <span id="v29-verb-hint">
        ${isNai
          ? 'Đoán động từ gốc + nghĩa tiếng Việt • bấm để lật'
          : `Tự nhớ nghĩa + chia sang ${v32ModeLabel()} • bấm để lật`}
      </span>

      <div id="v29-verb-answer"></div>
    </button>

    <div id="v29-verb-rate"></div>

    <div class="v29-verb-bottom">
      <button class="ghost-btn" onclick="v29ShuffleCurrentVerbSet()">↻ Xáo lại bộ này</button>
    </div>
  </div>`;
};

v29RevealVerb=function(){
  const s=v29VerbState;
  if(!s||s.revealed)return;

  s.revealed=true;
  const v=s.cards[s.index];
  const isNai=s.mode==='nai-meaning';

  const hint=document.getElementById('v29-verb-hint');
  if(hint)hint.textContent='ĐÁP ÁN';

  const ans=document.getElementById('v29-verb-answer');
  if(ans){
    if(isNai){
      ans.innerHTML=`
        <div class="v31-meaning-answer">
          <small>NGHĨA</small>
          <strong>${escapeHtml(v.meaning||'—')}</strong>
        </div>

        <div class="v31-form-answer v32-masu-answer">
          <small>ます-FORM</small>
          <b>${escapeHtml(v.display||v.masu)}</b>
          ${v.display!==v.masu?`<em>${escapeHtml(v.masu)}</em>`:''}
        </div>

        <div class="v32-base-info">
          <span><small>辞書形</small><b>${escapeHtml(v.dictionary)}</b></span>
          <span><small>ない-FORM</small><b>${escapeHtml(v.nai)}</b></span>
        </div>`;
    }else{
      const answer=s.mode==='dictionary'?v.dictionary:v.te;
      ans.innerHTML=`
        <div class="v31-meaning-answer">
          <small>NGHĨA</small>
          <strong>${escapeHtml(v.meaning||'—')}</strong>
        </div>

        <div class="v31-form-answer">
          <small>${escapeHtml(v32ModeLabel())}</small>
          <b>${escapeHtml(answer)}</b>
        </div>

        <span class="v31-answer-meta">${escapeHtml(v.masu)} → ${escapeHtml(answer)} • Nhóm ${v.group}</span>`;
    }
  }

  document.getElementById('v29-verb-rate').innerHTML=`
    <div class="v29-verb-rate-row">
      <button class="memory-btn again" onclick="v29RateVerb(false)">Quên</button>
      <button class="memory-btn good" onclick="v29RateVerb(true)">Nhớ</button>
    </div>`;
};

v29RateVerb=function(ok){
  const s=v29VerbState;
  if(!s||!s.revealed)return;

  const v=s.cards[s.index];
  const isNai=s.mode==='nai-meaning';

  let answer,skill,prompt;
  if(isNai){
    answer=`${v.masu} • ${v.meaning}`;
    skill='verb-appendix-nai-meaning';
    prompt=`${v.nai} → động từ gì / nghĩa gì?`;
  }else if(s.mode==='dictionary'){
    answer=v.dictionary;
    skill='verb-appendix-dictionary';
    prompt=`${v.masu} → 辞書形?`;
  }else{
    answer=v.te;
    skill='verb-appendix-te';
    prompt=`${v.masu} → て-form?`;
  }

  if(ok)s.remembered++;
  else{s.forgot++;s.forgotten.push(v);}

  recordRecallEvent({
    itemKey:recallKey(['verb-appendix',v.group,v.masu,s.mode]),
    domain:'grammar',skill,itemLabel:isNai?v.nai:v.masu,target:answer,prompt,
    selected:ok?'remembered':'forgot',correctAnswer:answer,correct:ok,
    rating:ok?'good':'again',
    responseMs:Date.now()-(s.cardStartedAt||Date.now()),
    source:'V32 • Động từ cuối sách',
    explanation:`${v.nai} • ${v.masu} • ${v.dictionary} • ${v.meaning}`,
    qType:'verb-appendix-flash',
    extra:{group:v.group,sourcePage:v.sourcePage,mode:s.mode,meaning:v.meaning||'',nai:v.nai}
  });

  s.index++;
  v29RenderVerbCard();
};

const _v32RecallSkillLabel=recallSkillLabel;
recallSkillLabel=function(skill){
  if(skill==='verb-appendix-nai-meaning')return 'Động từ: ない形 → nghĩa';
  return _v32RecallSkillLabel(skill);
};
