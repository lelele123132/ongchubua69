/* ==========================================================
   V25 — VIỆT → NHẬT FLASHCARDS
   Adds bidirectional per-lesson vocab flashcards to both N5 and N4.
   ========================================================== */

const V25_N5_FLASH_DIR_KEY='nihongoN5FlashDirectionV25';
const V25_N4_FLASH_DIR_KEY='nihongoN4FlashDirectionV25';

let n5FlashDirection=localStorage.getItem(V25_N5_FLASH_DIR_KEY)||'jp';
let n4mFlashDirection=localStorage.getItem(V25_N4_FLASH_DIR_KEY)||'jp';

function v25SetN5FlashDirection(dir){
  n5FlashDirection=dir;
  try{localStorage.setItem(V25_N5_FLASH_DIR_KEY,dir)}catch{}
  renderLessonContent();
}

function v25SetN4FlashDirection(dir){
  n4mFlashDirection=dir;
  try{localStorage.setItem(V25_N4_FLASH_DIR_KEY,dir)}catch{}
  n4mRenderLesson();
}

function v25ActualDir(mode,index){
  if(mode==='mixed')return index%2===0?'jp':'vi';
  return mode;
}

function v25DirectionButtons(scope,current){
  const fn=scope==='n5'?'v25SetN5FlashDirection':'v25SetN4FlashDirection';
  return `<div class="v25-flash-direction">
    <span>Mặt trước:</span>
    <button class="${current==='jp'?'active':''}" onclick="${fn}('jp')">🇯🇵 Nhật → Việt</button>
    <button class="${current==='vi'?'active vi':''}" onclick="${fn}('vi')">🇻🇳 Việt → Nhật</button>
    <button class="${current==='mixed'?'active mixed':''}" onclick="${fn}('mixed')">🔀 Trộn</button>
  </div>`;
}

/* ---------------- N5 per-lesson flashcard ---------------- */
renderFlash=function(box,l){
  flashRecallStartedAt=Date.now();

  const v=l.vocab[cardIndex];
  const pct=Math.round((cardIndex+1)/l.vocab.length*100);
  const hasKanji=v.jp&&v.kana&&v.jp!==v.kana;
  const dir=v25ActualDir(n5FlashDirection,cardIndex);
  const viFront=dir==='vi';

  const front=viFront
    ? `<span class="flash-side-label v25-vi-label">VIỆT → NHẬT</span>
       <span class="v25-vi-front">${escapeHtml(v.vi)}</span>
       <span class="v25-recall-cue">Tự nhớ cách nói bằng tiếng Nhật</span>
       <span class="flip-cue"><span>↻</span> Nhấn / Space để xem tiếng Nhật</span>`
    : `<span class="flash-side-label">NHẬT → VIỆT</span>
       <span class="flash-kana">${escapeHtml(v.kana||v.jp)}</span>
       ${hasKanji?`<span class="flash-kanji">${escapeHtml(v.jp)}</span>`:''}
       <span class="flash-romaji">${escapeHtml(v.reading||'')}</span>
       <span class="flip-cue"><span>↻</span> Nhấn / Space để xem nghĩa</span>`;

  const back=viFront
    ? `<span class="flash-side-label v25-jp-answer-label">ĐÁP ÁN TIẾNG NHẬT</span>
       <span class="v25-jp-answer">${escapeHtml(v.kana||v.jp)}</span>
       ${hasKanji?`<span class="v25-jp-kanji">${escapeHtml(v.jp)}</span>`:''}
       <span class="flash-romaji">${escapeHtml(v.reading||'')}</span>
       <span class="v25-back-meaning">${escapeHtml(v.vi)}</span>
       <span class="flip-cue"><span>↻</span> Nhấn / Space để quay lại</span>`
    : `<span class="flash-side-label">NGHĨA TIẾNG VIỆT</span>
       <span class="meaning">${escapeHtml(v.vi)}</span>
       <span class="back-word">${escapeHtml(v.kana||v.jp)}${hasKanji?` <i>•</i> ${escapeHtml(v.jp)}`:''}<br><small>${escapeHtml(v.reading||'')}</small></span>
       <span class="flip-cue"><span>↻</span> Nhấn / Space để quay lại</span>`;

  box.innerHTML=`<div class="flash-shell">
    <div class="flash-heading">
      <div><span class="flash-kicker">BÀI ${l.id} • TỪ VỰNG</span><h2>Flashcard</h2></div>
      <div class="flash-counter"><b>${cardIndex+1}</b><span>/ ${l.vocab.length}</span></div>
    </div>

    ${v25DirectionButtons('n5',n5FlashDirection)}

    <div class="flash-source-chip">📚 Theo PDF Minna no Nihongo bản 2${l.sourcePages?` • trang ${l.sourcePages[0]}–${l.sourcePages[l.sourcePages.length-1]}`:''}</div>

    <div class="flash-area">
      <button class="flashcard v25-vocab-flash" type="button"
        aria-label="Lật flashcard ${escapeHtml(v.kana||v.jp)}"
        aria-pressed="false"
        onclick="this.classList.toggle('flipped');this.setAttribute('aria-pressed',this.classList.contains('flipped'))">
        <span class="flash-inner">
          <span class="flash-face flash-front">${front}</span>
          <span class="flash-face flash-back">${back}</span>
        </span>
      </button>
    </div>

    <div class="flash-progress-meta"><span>Tiến độ bộ thẻ</span><b>${pct}%</b></div>
    <div class="progressbar"><span style="width:${pct}%"></span></div>
    ${recallRatingButtons('vocab',l.id,cardIndex)}

    <div class="flash-actions two-actions">
      <button class="secondary-btn flash-nav-btn" onclick="prevCard()">← Trước</button>
      <button class="primary-btn flash-nav-btn" onclick="nextCard()">Tiếp →</button>
    </div>

    <div class="flash-shortcuts">← → đổi thẻ • Space lật thẻ</div>
    <div class="flash-complete">${completeButton('flash')}</div>
  </div>`;
};

/* Direction-aware Recall logging for N5 */
rateVocabFlash=function(lesson,index,rating){
  const l=LESSONS[lesson-1],v=l.vocab[index];
  const dir=v25ActualDir(n5FlashDirection,index);
  const ok=rating!=='again';

  if(dir==='vi'){
    const peers=l.vocab.map(x=>x.kana||x.jp).filter(x=>x!==(v.kana||v.jp));
    recordRecallEvent({
      itemKey:recallKey(['vocab',lesson,index,'vi-to-jp']),
      domain:'vocab',skill:'flash-vi-jp',lesson,
      itemLabel:v.kana||v.jp,target:v.kana||v.jp,
      prompt:`${v.vi} → tiếng Nhật?`,
      selected:recallRatingLabel(rating),
      correctAnswer:v.kana||v.jp,correct:ok,rating,
      responseMs:recallNow()-flashRecallStartedAt,
      source:'V25 • Flashcard Việt → Nhật',
      answers:[v.kana||v.jp,...(typeof shuffle==='function'?shuffle(peers):peers).slice(0,3)],
      explanation:`${v.vi} → ${v.kana||v.jp}${v.jp&&v.jp!==v.kana?' • '+v.jp:''}`
    });
  }else{
    const peers=l.vocab.map(x=>x.vi).filter(x=>x!==v.vi);
    recordRecallEvent({
      itemKey:recallKey(['vocab',lesson,index,'meaning']),
      domain:'vocab',skill:'flash-recall',lesson,
      itemLabel:v.jp||v.kana,target:v.jp||v.kana,
      prompt:`Nhớ nghĩa của 「${v.kana||v.jp}」`,
      selected:recallRatingLabel(rating),
      correctAnswer:v.vi,correct:ok,rating,
      responseMs:recallNow()-flashRecallStartedAt,
      source:'V25 • Flashcard Nhật → Việt',
      answers:[v.vi,...(typeof shuffle==='function'?shuffle(peers):peers).slice(0,3)],
      explanation:`${v.kana||v.jp} • ${v.reading||''} • ${v.vi}`
    });
  }

  if(typeof setFlashKnown==='function'){
    const s=getFlashKnown(),key=flashCardKey(lesson,index);
    if(rating==='good'||rating==='easy')s[key]=true;
    else if(rating==='again')delete s[key];
    localStorage.setItem(FLASH_STATE_KEY,JSON.stringify(s));
  }

  flashRecallStartedAt=recallNow();
  renderLessonContent();
};

/* ---------------- N4 Minna per-lesson flashcard ---------------- */
n4mRenderFlash=function(box,l){
  if(n4mCardOrder.length!==l.vocab.length){
    n4mCardOrder=[...Array(l.vocab.length).keys()];
  }

  const idx=n4mCardOrder[n4mCardPos]??0;
  const v=l.vocab[idx];
  const pct=Math.round((n4mCardPos+1)/l.vocab.length*100);
  const hasKanji=v.jp!==v.kana;
  const dir=v25ActualDir(n4mFlashDirection,n4mCardPos);
  const viFront=dir==='vi';

  n4mFlashStartedAt=Date.now();

  const front=viFront
    ? `<span class="flash-side-label v25-vi-label">VIỆT → NHẬT</span>
       <span class="v25-vi-front">${escapeHtml(v.vi)}</span>
       <span class="v25-recall-cue">Tự nhớ Kana tiếng Nhật</span>
       <span class="flip-cue">↻ Nhấn để xem tiếng Nhật</span>`
    : `<span class="flash-side-label">KANA → VIỆT</span>
       <span class="flash-kana">${escapeHtml(v.kana)}</span>
       <span class="flash-romaji">${escapeHtml(v.reading||'')}</span>
       <span class="flip-cue">↻ Nhấn để xem nghĩa</span>`;

  const back=viFront
    ? `<span class="flash-side-label v25-jp-answer-label">ĐÁP ÁN TIẾNG NHẬT</span>
       <span class="v25-jp-answer">${escapeHtml(v.kana)}</span>
       ${hasKanji?`<span class="v25-jp-kanji">${escapeHtml(v.jp)}</span>`:''}
       <span class="flash-romaji">${escapeHtml(v.reading||'')}</span>
       <span class="v25-back-meaning">${escapeHtml(v.vi)}</span>
       <span class="flip-cue">↻ Nhấn để quay lại</span>`
    : `<span class="flash-side-label">NGHĨA</span>
       <span class="meaning">${escapeHtml(v.vi)}</span>
       <span class="back-word">${escapeHtml(v.kana)}${hasKanji?` <i>•</i> ${escapeHtml(v.jp)}`:''}<br><small>${escapeHtml(v.reading||'')}</small></span>
       <span class="flip-cue">↻ Nhấn để quay lại</span>`;

  box.innerHTML=`<div class="flash-shell">
    <div class="flash-heading">
      <div><span class="flash-kicker">N4 • BÀI ${l.id} • TỪ VỰNG</span><h2>Flashcard</h2></div>
      <div class="flash-counter"><b>${n4mCardPos+1}</b><span>/ ${l.vocab.length}</span></div>
    </div>

    ${v25DirectionButtons('n4',n4mFlashDirection)}

    <div class="n4m-flash-toolbar">
      <span>${viFront?'Việt → nhớ tiếng Nhật':'Kana → nhớ nghĩa'} • bấm thẻ để lật</span>
      <button class="ghost-btn" onclick="n4mResetCardOrder(true)">↻ Xáo ngẫu nhiên</button>
    </div>

    <div class="flash-area">
      <button class="flashcard n4m-flashcard v25-vocab-flash"
        onclick="this.classList.toggle('flipped')">
        <span class="flash-inner">
          <span class="flash-face flash-front">${front}</span>
          <span class="flash-face flash-back">${back}</span>
        </span>
      </button>
    </div>

    <div class="progressbar"><span style="width:${pct}%"></span></div>

    <div class="n4m-memory-row">
      <button class="memory-btn again" onclick="n4mRateFlash('again')">1 • Quên</button>
      <button class="memory-btn hard" onclick="n4mRateFlash('hard')">2 • Khó</button>
      <button class="memory-btn good" onclick="n4mRateFlash('good')">3 • Nhớ</button>
      <button class="memory-btn easy" onclick="n4mRateFlash('easy')">4 • Rất chắc</button>
    </div>

    <div class="flash-actions two-actions">
      <button class="secondary-btn" onclick="n4mPrevCard()">← Trước</button>
      <button class="primary-btn" onclick="n4mNextCard()">Tiếp →</button>
    </div>

    <div class="flash-complete">${n4mCompleteButton('flash')}</div>
  </div>`;
};

n4mRateFlash=function(rating){
  const l=n4mLesson(n4mCurrentLesson);
  const idx=n4mCardOrder[n4mCardPos];
  const v=l.vocab[idx];
  const dir=v25ActualDir(n4mFlashDirection,n4mCardPos);
  const ok=rating==='good'||rating==='easy';

  if(dir==='vi'){
    recordRecallEvent({
      itemKey:recallKey(['n4-minna-vocab',l.id,idx,'vi-to-jp']),
      domain:'vocab',skill:'n4m-flash-vi-jp',lesson:l.id,
      itemLabel:v.kana,target:v.kana,
      prompt:`${v.vi} → tiếng Nhật?`,
      selected:rating,correctAnswer:v.kana,correct:ok,
      responseMs:Date.now()-n4mFlashStartedAt,rating,
      source:`V25 • Minna N4 Việt → Nhật • Bài ${l.id}`,
      qType:'n4m-flash-vi-jp',
      extra:{vocabIndex:idx,direction:'vi-jp'}
    });
  }else{
    recordRecallEvent({
      itemKey:recallKey(['n4-minna-vocab',l.id,idx,'flash']),
      domain:'vocab',skill:'n4m-flash',lesson:l.id,
      itemLabel:v.kana,target:v.kana,
      prompt:`${v.kana} → nghĩa?`,
      selected:rating,correctAnswer:v.vi,correct:ok,
      responseMs:Date.now()-n4mFlashStartedAt,rating,
      source:`V25 • Minna N4 Nhật → Việt • Bài ${l.id}`,
      qType:'n4m-flash',
      extra:{vocabIndex:idx,direction:'jp-vi'}
    });
  }

  n4mNextCard();
};

/* Make Việt → Nhật more obvious/default in the existing multi-lesson random flash tools. */
const _v25OpenVocabFlashcards=openVocabFlashcards;
openVocabFlashcards=function(){
  const r=_v25OpenVocabFlashcards();
  const sel=document.getElementById('vf-direction');
  if(sel){
    const vi=sel.querySelector('option[value="vi"]');
    if(vi)vi.textContent='🇻🇳 Tiếng Việt → nhớ tiếng Nhật';
    const jp=sel.querySelector('option[value="kana"]');
    if(jp)jp.textContent='🇯🇵 Tiếng Nhật → nhớ nghĩa Việt';
    const mixed=sel.querySelector('option[value="mixed"]');
    if(mixed)mixed.textContent='🔀 Trộn hai chiều';
    sel.value='vi';
  }
  return r;
};

const _v25OpenN4MinnaRandomFlash=openN4MinnaRandomFlash;
openN4MinnaRandomFlash=function(){
  const r=_v25OpenN4MinnaRandomFlash();
  const sel=document.getElementById('n4m-random-dir');
  if(sel){
    const vi=sel.querySelector('option[value="vi"]');
    if(vi)vi.textContent='🇻🇳 Tiếng Việt → nhớ tiếng Nhật';
    const jp=sel.querySelector('option[value="kana"]');
    if(jp)jp.textContent='🇯🇵 Tiếng Nhật → nhớ nghĩa Việt';
    const mixed=sel.querySelector('option[value="mixed"]');
    if(mixed)mixed.textContent='🔀 Trộn hai chiều';
    sel.value='vi';
  }
  return r;
};

/* Recall labels */
const _v25RecallSkillLabel=recallSkillLabel;
recallSkillLabel=function(skill){
  const labels={
    'flash-vi-jp':'Flashcard: Việt → Nhật',
    'n4m-flash-vi-jp':'N4 Minna: Việt → Nhật'
  };
  return labels[skill]||_v25RecallSkillLabel(skill);
};
