/* ==========================================================
   V28
   1) Add Việt -> Nhật Flashcard into Luyện tập.
   2) Clean Kanji flashcards: no examples / compound / online word panels.
   ========================================================== */

/* ==========================================================
   A. LUYỆN TẬP — VIỆT -> NHẬT
   ========================================================== */

let v28PracticeViItems=[];
let v28PracticeViIndex=0;
let v28PracticeViRevealed=false;
let v28PracticeViRemembered=0;
let v28PracticeViForgot=0;
let v28PracticeViForgotten=[];
let v28PracticeViStartedAt=Date.now();

function v28InjectPracticeViFlash(){
  const grid=document.querySelector('.mode-grid');
  if(!grid || grid.querySelector('.v28-practice-vi-card'))return;

  const card=document.createElement('button');
  card.className='mode-card v28-practice-vi-card';
  card.onclick=startV28PracticeViFlash;
  card.innerHTML=`<h3>🇻🇳 Flash Việt → Nhật</h3>
    <p>Dùng các bài N5 đang chọn: nhìn nghĩa tiếng Việt, tự nhớ Kana tiếng Nhật rồi lật thẻ.</p>
    <small>Bài 26–50: mở bộ 1–50 bên trong.</small>`;

  const normalFlash=[...grid.querySelectorAll('.mode-card')]
    .find(x=>/Flashcard/.test(x.textContent||'') && !/Kanji/.test(x.textContent||''));

  if(normalFlash)normalFlash.insertAdjacentElement('afterend',card);
  else grid.appendChild(card);

  if(!grid.querySelector('.v28-practice-all50-card')){
    const all=document.createElement('button');
    all.className='mode-card v28-practice-all50-card';
    all.onclick=()=>openViToJpFlashHub('all');
    all.innerHTML=`<h3>🇻🇳 Flash Việt → Nhật • Bài 1–50</h3>
      <p>Mở bộ chọn riêng đầy đủ N5 1–25 + N4 26–50, chọn nhiều bài và random.</p>`;
    card.insertAdjacentElement('afterend',all);
  }
}

const _v28OpenPractice=openPractice;
openPractice=function(){
  const r=_v28OpenPractice();
  setTimeout(v28InjectPracticeViFlash,0);
  return r;
};

function startV28PracticeViFlash(){
  const ids=selectedLessons();
  const result=document.getElementById('practice-result');
  if(!result)return;

  if(!ids.length){
    result.innerHTML='<p style="color:var(--bad);font-weight:700">Hãy chọn ít nhất một bài N5 phía trên trước.</p>';
    return;
  }

  practiceActiveMode='v28ViFlash';

  v28PracticeViItems=shuffle(
    ids.flatMap(id=>
      LESSONS[id-1].vocab.map((v,index)=>({
        ...v,
        lesson:id,
        vocabIndex:index
      }))
    )
  );

  v28PracticeViIndex=0;
  v28PracticeViRemembered=0;
  v28PracticeViForgot=0;
  v28PracticeViForgotten=[];
  v28RenderPracticeViFlash();
}

function v28RenderPracticeViFlash(){
  const result=document.getElementById('practice-result');
  if(!result)return;

  if(!v28PracticeViItems.length){
    result.innerHTML='<div class="empty"><p>Không có từ vựng trong các bài đã chọn.</p></div>';
    return;
  }

  if(v28PracticeViIndex>=v28PracticeViItems.length){
    return v28RenderPracticeViResult();
  }

  const v=v28PracticeViItems[v28PracticeViIndex];
  const kana=v.kana||v.jp;
  const hasKanji=v.jp && v.jp!==kana;
  const pct=Math.round(v28PracticeViIndex/v28PracticeViItems.length*100);

  v28PracticeViRevealed=false;
  v28PracticeViStartedAt=Date.now();

  result.innerHTML=`<hr class="divider">
    <div class="v28-pv-session">
      <div class="v28-pv-top">
        <div><span>🇻🇳 VIỆT → 🇯🇵 NHẬT</span><b>Bài ${v.lesson}</b></div>
        <strong>${v28PracticeViIndex+1}/${v28PracticeViItems.length}</strong>
      </div>

      <div class="progressbar v28-pv-progress">
        <span style="width:${pct}%"></span>
      </div>

      <button class="v28-pv-card" onclick="v28RevealPracticeVi()">
        <small>MẶT TRƯỚC • TIẾNG VIỆT</small>
        <strong>${escapeHtml(v.vi)}</strong>
        <span id="v28-pv-hint">Tự nhớ tiếng Nhật • bấm để lật</span>

        <div id="v28-pv-answer"></div>
      </button>

      <div id="v28-pv-rate"></div>

      <div class="v28-pv-bottom">
        <button class="ghost-btn" onclick="v28ShufflePracticeVi()">↻ Xáo lại</button>
        <button class="secondary-btn" onclick="openViToJpFlashHub('all')">Chọn Bài 1–50 →</button>
      </div>
    </div>`;
}

function v28RevealPracticeVi(){
  if(v28PracticeViRevealed)return;
  v28PracticeViRevealed=true;

  const v=v28PracticeViItems[v28PracticeViIndex];
  const kana=v.kana||v.jp;
  const hasKanji=v.jp && v.jp!==kana;

  const hint=document.getElementById('v28-pv-hint');
  if(hint)hint.textContent='ĐÁP ÁN TIẾNG NHẬT';

  const ans=document.getElementById('v28-pv-answer');
  if(ans){
    ans.innerHTML=`<b>${escapeHtml(kana)}</b>
      ${hasKanji?`<strong>${escapeHtml(v.jp)}</strong>`:''}
      ${v.reading?`<small>${escapeHtml(v.reading)}</small>`:''}`;
  }

  const rate=document.getElementById('v28-pv-rate');
  if(rate){
    rate.innerHTML=`<div class="v28-pv-rate-row">
      <button class="memory-btn again" onclick="v28RatePracticeVi(false)">Quên</button>
      <button class="memory-btn good" onclick="v28RatePracticeVi(true)">Nhớ</button>
    </div>`;
  }
}

function v28RatePracticeVi(ok){
  if(!v28PracticeViRevealed)return;

  const v=v28PracticeViItems[v28PracticeViIndex];
  const kana=v.kana||v.jp;

  if(ok){
    v28PracticeViRemembered++;
  }else{
    v28PracticeViForgot++;
    v28PracticeViForgotten.push(v);
  }

  recordRecallEvent({
    itemKey:recallKey(['practice-vi-jp',v.lesson,v.vocabIndex]),
    domain:'vocab',
    skill:'practice-flash-vi-jp',
    lesson:v.lesson,
    itemLabel:kana,
    target:kana,
    prompt:`${v.vi} → tiếng Nhật?`,
    selected:ok?'remembered':'forgot',
    correctAnswer:kana,
    correct:ok,
    rating:ok?'good':'again',
    responseMs:Date.now()-v28PracticeViStartedAt,
    source:`V28 • Luyện tập Việt → Nhật • Bài ${v.lesson}`,
    qType:'practice-vi-to-jp-flash',
    extra:{vocabIndex:v.vocabIndex}
  });

  v28PracticeViIndex++;
  v28RenderPracticeViFlash();
}

function v28ShufflePracticeVi(){
  if(!v28PracticeViItems.length)return;
  v28PracticeViItems=shuffle([...v28PracticeViItems]);
  v28PracticeViIndex=0;
  v28PracticeViRemembered=0;
  v28PracticeViForgot=0;
  v28PracticeViForgotten=[];
  v28RenderPracticeViFlash();
}

function v28RetryPracticeViForgotten(){
  if(!v28PracticeViForgotten.length)return;

  v28PracticeViItems=shuffle([...v28PracticeViForgotten]);
  v28PracticeViIndex=0;
  v28PracticeViRemembered=0;
  v28PracticeViForgot=0;
  v28PracticeViForgotten=[];
  v28RenderPracticeViFlash();
}

function v28RenderPracticeViResult(){
  const result=document.getElementById('practice-result');
  if(!result)return;

  const total=v28PracticeViItems.length;
  const pct=total?Math.round(v28PracticeViRemembered/total*100):0;

  result.innerHTML=`<hr class="divider">
    <div class="v28-pv-result">
      <span>VIỆT → NHẬT COMPLETE</span>
      <h2>${v28PracticeViRemembered}/${total}</h2>
      <p>Nhớ <b>${pct}%</b> • Quên ${v28PracticeViForgot} thẻ.</p>

      <div>
        ${v28PracticeViForgotten.length
          ? `<button class="primary-btn" onclick="v28RetryPracticeViForgotten()">Ôn lại ${v28PracticeViForgotten.length} thẻ quên →</button>`
          : ''}
        <button class="secondary-btn" onclick="startV28PracticeViFlash()">Random lại bộ đã chọn ↻</button>
        <button class="ghost-btn" onclick="openViToJpFlashHub('all')">Bộ Bài 1–50</button>
      </div>
    </div>`;
}

/* Keyboard navigation for the new practice mode. */
document.addEventListener('keydown',e=>{
  if(practiceActiveMode!=='v28ViFlash' || !document.getElementById('practice-result'))return;

  if(e.key==='ArrowRight' && v28PracticeViItems.length){
    e.preventDefault();
    v28PracticeViIndex=(v28PracticeViIndex+1)%v28PracticeViItems.length;
    v28RenderPracticeViFlash();
  }

  if(e.key==='ArrowLeft' && v28PracticeViItems.length){
    e.preventDefault();
    v28PracticeViIndex=(v28PracticeViIndex-1+v28PracticeViItems.length)%v28PracticeViItems.length;
    v28RenderPracticeViFlash();
  }

  if(e.code==='Space'){
    const card=document.querySelector('.v28-pv-card');
    if(card){
      e.preventDefault();
      v28RevealPracticeVi();
    }
  }
});

/* Recall label. */
const _v28RecallSkillLabel=recallSkillLabel;
recallSkillLabel=function(skill){
  if(skill==='practice-flash-vi-jp')return 'Luyện tập: Việt → Nhật';
  return _v28RecallSkillLabel(skill);
};

/* ==========================================================
   B. KANJI FLASHCARD — REMOVE EXAMPLES
   ========================================================== */

/* Normal 218 Kanji flash:
   keep only Kanji -> meaning + On/Kun + progress/rating/navigation. */
renderKanji218Flash=function(box){
  flashRecallStartedAt=Date.now();

  const items=getKanji218Filtered();
  if(!items.length){
    box.innerHTML='<div class="empty"><p>Không tìm thấy Kanji phù hợp trong các bài đã chọn.</p></div>';
    return;
  }

  kanji218Index=(kanji218Index+items.length)%items.length;

  const k=items[kanji218Index];
  const g=getKanji218GroupForItem(k);
  const pct=Math.round((kanji218Index+1)/items.length*100);

  box.innerHTML=`<div class="k218-flash-wrap v28-clean-kanji">
    <div class="flash-heading">
      <div>
        <span class="flash-kicker">${escapeHtml(g?.imageLabel||'')} • KANJI #${k.id} • ${k.jlpt}</span>
        <h2>${escapeHtml(g?.label||'')} • Flashcard</h2>
      </div>
      <div class="flash-counter"><b>${kanji218Index+1}</b><span>/ ${items.length}</span></div>
    </div>

    <div class="flash-area">
      <button class="flashcard k218-flashcard v28-clean-k-card" type="button"
        aria-pressed="false"
        onclick="this.classList.toggle('flipped');this.setAttribute('aria-pressed',this.classList.contains('flipped'))">

        <span class="flash-inner">
          <span class="flash-face flash-front k218-front">
            <span class="flash-side-label">KANJI → TỰ RECALL</span>
            <span class="k218-char">${k.kanji}</span>
            <span class="k218-front-meaning">Nhớ nghĩa + Onyomi + Kunyomi.</span>
            <span class="flip-cue"><span>↻</span> Nhấn / Space để lật</span>
          </span>

          <span class="flash-face flash-back k218-back">
            <span class="flash-side-label">NGHĨA • ON/KUN</span>
            <span class="k218-back-char">${k.kanji}</span>
            <span class="k218-meaning">${escapeHtml(k.meaning)}</span>

            <span class="k218-reading-grid">
              <span><small>ONYOMI</small><b>${escapeHtml(k.on||'—')}</b></span>
              <span><small>KUNYOMI</small><b>${escapeHtml(k.kun||'—')}</b></span>
            </span>

            <span class="flip-cue"><span>↻</span> Nhấn / Space để quay lại</span>
          </span>
        </span>
      </button>
    </div>

    <div class="flash-progress-meta">
      <span>Tiến độ các bài đang chọn</span>
      <b>${pct}%</b>
    </div>
    <div class="progressbar"><span style="width:${pct}%"></span></div>

    ${recallRatingButtons('kanji218',k.kanji)}

    <div class="flash-actions two-actions">
      <button class="secondary-btn" onclick="prevKanji218Card()">← Trước</button>
      <button class="primary-btn" onclick="nextKanji218Card()">Tiếp →</button>
    </div>

    <div class="flash-shortcuts">← → đổi thẻ • Space lật thẻ</div>
  </div>`;
};

/* Random Kanji flash:
   remove the example list on the revealed side too. */
v27RevealKanjiRandom=function(){
  const s=v27KanjiRandomState;
  if(!s||s.revealed)return;

  s.revealed=true;
  const k=s.cards[s.index];
  const g=getKanji218GroupForItem(k);

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
      </div>`;
  }

  const rate=document.getElementById('v27-kr-rate');
  if(rate){
    rate.innerHTML=`<div class="v27-kr-rate-row">
      <button class="memory-btn again" onclick="v27RateKanjiRandom(false)">Quên</button>
      <button class="memory-btn good" onclick="v27RateKanjiRandom(true)">Nhớ</button>
    </div>`;
  }
};

setTimeout(()=>{
  v28InjectPracticeViFlash();
},0);
