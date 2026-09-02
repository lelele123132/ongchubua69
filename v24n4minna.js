/* ==========================================================
   V24 — MINNA NO NIHONGO II • N4 VOCAB (Lessons 26–50)
   Parallel vocabulary learning track, intentionally separate
   from N5 LESSONS so existing N5 logic remains stable.
   ========================================================== */

const N4M_DONE_KEY='nihongoN4MinnaDoneV24';
const N4M_KANA_KEY='nihongoN4MinnaKanaV24';
let n4mCurrentLesson=26;
let n4mTab='flash';
let n4mVocabMode='kana';
let n4mCardOrder=[];
let n4mCardPos=0;
let n4mFlashStartedAt=Date.now();
let n4mKanaState=null;
let n4mQuizState=null;
let n4mMultiState=null;
let n4mRandomFlashState=null;

function n4mLesson(id){ return N4_MINNA_LESSONS.find(l=>l.id===+id) || N4_MINNA_LESSONS[0]; }
function n4mKana(v){ return String(v.kana||v.jp||'').trim(); }
function n4mSafeJson(key,fallback={}){ try{return JSON.parse(localStorage.getItem(key))||fallback}catch{return fallback} }
function n4mSaveJson(key,value){ try{localStorage.setItem(key,JSON.stringify(value))}catch{} }

function n4mDoneDb(){ return n4mSafeJson(N4M_DONE_KEY,{}); }
function n4mProgress(id){
  const a=n4mDoneDb()[id]||[];
  return new Set(a).size;
}
function n4mMarkDone(id,type){
  const db=n4mDoneDb();
  const set=new Set(db[id]||[]);set.add(type);db[id]=[...set];n4mSaveJson(N4M_DONE_KEY,db);
  const btn=document.getElementById(`n4m-done-${type}`);if(btn){btn.textContent='✓ Đã hoàn thành';btn.disabled=true}
}
function n4mCompleteButton(type){
  const done=(n4mDoneDb()[n4mCurrentLesson]||[]).includes(type);
  return `<button id="n4m-done-${type}" class="secondary-btn" onclick="n4mMarkDone(${n4mCurrentLesson},'${type}')" ${done?'disabled':''}>${done?'✓ Đã hoàn thành':'Đánh dấu đã học'}</button>`;
}

function n4mInstallNav(){
  const nav=document.querySelector('.topbar nav');if(!nav||document.querySelector('.n4minna-nav'))return;
  const btn=document.createElement('button');
  btn.className='nav-btn n4minna-nav';btn.dataset.nav='n4minna';btn.textContent='N4 Từ vựng';btn.onclick=openN4MinnaHome;
  const n4=document.querySelector('.n4-nav');
  nav.insertBefore(btn,n4||document.querySelector('.recall-nav'));
}

function n4mInjectHomeCard(){
  const root=document.getElementById('app');if(!root||document.getElementById('n4m-home-card'))return;
  const n4old=root.querySelector('.n4-home-card');
  const card=document.createElement('section');
  card.id='n4m-home-card';card.className='n4m-home-card';
  card.innerHTML=`<div class="n4m-home-icon">語</div><div class="n4m-home-copy">
    <span class="n4m-eyebrow">MINNA NO NIHONGO II • BÀI 26–50</span>
    <h2>N4 Từ vựng theo bài</h2>
    <p><b>${N4_MINNA_SOURCE.total}</b> mục từ/biểu đạt • flashcard • Kana-first • trắc nghiệm toàn bài • quiz nhiều bài • flashcard random.</p>
  </div><button class="primary-btn" onclick="openN4MinnaHome()">Học N4 Minna →</button>`;
  if(n4old)n4old.insertAdjacentElement('afterend',card);
  else root.querySelector('.recall-home-card')?.insertAdjacentElement('beforebegin',card);
}

const _v24GoHome=goHome;
goHome=function(){
  const r=_v24GoHome();
  setTimeout(()=>{n4mInstallNav();n4mInjectHomeCard()},0);
  return r;
};

function openN4MinnaHome(){
  setNav('n4minna');
  const total=N4_MINNA_SOURCE.total;
  const done=N4_MINNA_LESSONS.reduce((s,l)=>s+n4mProgress(l.id),0);
  app.innerHTML=`<div class="breadcrumb"><button onclick="goHome()">Trang chủ</button> › N4 Minna 26–50</div>
  <section class="n4m-hero"><div><span class="n4m-eyebrow">みんなの日本語 初級II • N4</span>
    <h1>Từ vựng Bài 26–50</h1>
    <p>Track N4 song song với N5. Học theo từng bài, ưu tiên <b>Kana ↔ nghĩa Việt</b>; Kanji vẫn có trong danh sách để tra cứu.</p>
    <div class="n4m-hero-actions"><button class="primary-btn" onclick="n4mOpenLesson(26)">Bắt đầu Bài 26 →</button>
      <button class="secondary-btn" onclick="openN4MinnaMultiQuiz()">🎯 Quiz nhiều bài</button>
      <button class="secondary-btn" onclick="openN4MinnaRandomFlash()">🃏 Flashcard random</button></div></div>
    <div class="n4m-stats"><div><b>25</b><span>Bài 26–50</span></div><div><b>${total}</b><span>Từ / biểu đạt</span></div><div><b>${done}</b><span>Mục đã đánh dấu</span></div></div>
  </section>
  <div class="n4m-source-note"><b>Nguồn học:</b> nghĩa Việt lấy chủ yếu từ PDF N4 bạn đã gửi; cấu trúc Bài 26–50 được đối chiếu lại với danh mục Minna no Nihongo II. Một số mục cốt lõi thiếu trong bản tổng hợp được bổ sung khi đối chiếu.</div>
  <div class="section-title"><div><h2>Chọn bài N4</h2><p>Mỗi bài có Flashcard, Kana-first, danh sách và trắc nghiệm đủ toàn bài.</p></div></div>
  <section class="lesson-grid n4m-grid">${N4_MINNA_LESSONS.map(l=>{
    const p=n4mProgress(l.id);
    return `<button class="lesson-card n4m-lesson-card" onclick="n4mOpenLesson(${l.id})"><span class="lesson-no">${l.id}</span>${p>=3?'<span class="lesson-done">✓</span>':''}
      <h3>Bài ${l.id}</h3><p>${l.vocab.length} từ / biểu đạt</p><div class="badges"><span class="badge">Kana</span><span class="badge">Flashcard</span><span class="badge">Quiz</span>${p?`<span class="badge">${p}/3 xong</span>`:''}</div></button>`;
  }).join('')}</section>`;
}

function n4mOpenLesson(id,tab='flash'){
  n4mCurrentLesson=+id;n4mTab=tab;n4mCardPos=0;n4mKanaState=null;n4mQuizState=null;setNav('n4minna');
  const l=n4mLesson(id);
  if(!n4mCardOrder.length||n4mCardOrder.length!==l.vocab.length)n4mCardOrder=[...Array(l.vocab.length).keys()];
  app.innerHTML=`<div class="breadcrumb"><button onclick="goHome()">Trang chủ</button> › <button onclick="openN4MinnaHome()">N4 Minna</button> › Bài ${l.id}</div>
  <section class="lesson-head n4m-lesson-head"><small>NIHONGO N4 • MINNA II • BÀI ${l.id}/50</small><h1>Bài ${l.id}</h1><p>${l.vocab.length} mục từ/biểu đạt • Kana-first mặc định khi học từ mới.</p></section>
  <div class="study-tabs"><button class="study-tab ${tab==='flash'?'active':''}" onclick="n4mChangeTab('flash')">🃏 Flashcard</button><button class="study-tab ${tab==='vocab'?'active':''}" onclick="n4mChangeTab('vocab')">📘 Từ vựng</button></div>
  <section class="panel" id="n4m-content"></section>`;
  n4mRenderLesson();
}
function n4mChangeTab(tab){n4mTab=tab;if(tab==='vocab')n4mVocabMode='kana';n4mOpenLesson(n4mCurrentLesson,tab)}
function n4mRenderLesson(){const box=document.getElementById('n4m-content'),l=n4mLesson(n4mCurrentLesson);if(!box)return;(n4mTab==='flash'?n4mRenderFlash:n4mRenderVocab)(box,l)}

/* ---------------- Flashcards per lesson ---------------- */
function n4mResetCardOrder(random=false){
  const l=n4mLesson(n4mCurrentLesson);n4mCardOrder=[...Array(l.vocab.length).keys()];if(random)n4mCardOrder=shuffle(n4mCardOrder);n4mCardPos=0;n4mRenderLesson();
}
function n4mRenderFlash(box,l){
  if(n4mCardOrder.length!==l.vocab.length)n4mCardOrder=[...Array(l.vocab.length).keys()];
  const idx=n4mCardOrder[n4mCardPos]??0,v=l.vocab[idx],pct=Math.round((n4mCardPos+1)/l.vocab.length*100),hasKanji=v.jp!==v.kana;
  n4mFlashStartedAt=Date.now();
  box.innerHTML=`<div class="flash-shell"><div class="flash-heading"><div><span class="flash-kicker">N4 • BÀI ${l.id} • TỪ VỰNG</span><h2>Flashcard</h2></div><div class="flash-counter"><b>${n4mCardPos+1}</b><span>/ ${l.vocab.length}</span></div></div>
    <div class="n4m-flash-toolbar"><span>Kana-first • bấm thẻ để lật</span><button class="ghost-btn" onclick="n4mResetCardOrder(true)">↻ Xáo ngẫu nhiên</button></div>
    <div class="flash-area"><button class="flashcard n4m-flashcard" onclick="this.classList.toggle('flipped')"><span class="flash-inner">
      <span class="flash-face flash-front"><span class="flash-side-label">KANA → VIỆT</span><span class="flash-kana">${escapeHtml(v.kana)}</span><span class="flash-romaji">${escapeHtml(v.reading||'')}</span><span class="flip-cue">↻ Nhấn để xem nghĩa</span></span>
      <span class="flash-face flash-back"><span class="flash-side-label">NGHĨA</span><span class="meaning">${escapeHtml(v.vi)}</span><span class="back-word">${escapeHtml(v.kana)}${hasKanji?` <i>•</i> ${escapeHtml(v.jp)}`:''}<br><small>${escapeHtml(v.reading||'')}</small></span><span class="flip-cue">↻ Nhấn để quay lại</span></span>
    </span></button></div>
    <div class="progressbar"><span style="width:${pct}%"></span></div>
    <div class="n4m-memory-row"><button class="memory-btn again" onclick="n4mRateFlash('again')">1 • Quên</button><button class="memory-btn hard" onclick="n4mRateFlash('hard')">2 • Khó</button><button class="memory-btn good" onclick="n4mRateFlash('good')">3 • Nhớ</button><button class="memory-btn easy" onclick="n4mRateFlash('easy')">4 • Rất chắc</button></div>
    <div class="flash-actions two-actions"><button class="secondary-btn" onclick="n4mPrevCard()">← Trước</button><button class="primary-btn" onclick="n4mNextCard()">Tiếp →</button></div>
    <div class="flash-complete">${n4mCompleteButton('flash')}</div></div>`;
}
function n4mPrevCard(){const l=n4mLesson(n4mCurrentLesson);n4mCardPos=(n4mCardPos-1+l.vocab.length)%l.vocab.length;n4mRenderLesson()}
function n4mNextCard(){const l=n4mLesson(n4mCurrentLesson);n4mCardPos=(n4mCardPos+1)%l.vocab.length;n4mRenderLesson()}
function n4mRateFlash(rating){
  const l=n4mLesson(n4mCurrentLesson),idx=n4mCardOrder[n4mCardPos],v=l.vocab[idx],ok=rating==='good'||rating==='easy';
  recordRecallEvent({itemKey:recallKey(['n4-minna-vocab',l.id,idx,'flash']),domain:'vocab',skill:'n4m-flash',lesson:l.id,itemLabel:v.kana,target:v.kana,prompt:`${v.kana} → nghĩa?`,selected:rating,correctAnswer:v.vi,correct:ok,responseMs:Date.now()-n4mFlashStartedAt,rating,source:`V24 • Minna N4 Bài ${l.id}`,qType:'n4m-flash',extra:{vocabIndex:idx}});
  n4mNextCard();
}

/* ---------------- Vocab tab ---------------- */
function n4mRenderVocab(box,l){
  box.innerHTML=`<div class="vocab-mode-head"><div><span class="flash-kicker">N4 • BÀI ${l.id} • ${l.vocab.length} TỪ</span><h2>Từ vựng Bài ${l.id}</h2><p>Kana-first để học từ; danh sách vẫn giữ Kanji để tra cứu.</p></div>
    <div class="vocab-mode-switch n4m-mode-switch"><button class="${n4mVocabMode==='kana'?'active kana':''}" onclick="n4mSetVocabMode('kana')">🌱 Học từ mới • Kana</button><button class="${n4mVocabMode==='list'?'active':''}" onclick="n4mSetVocabMode('list')">📘 Danh sách</button><button class="${n4mVocabMode==='quiz'?'active hard':''}" onclick="n4mSetVocabMode('quiz')">🎯 Trắc nghiệm toàn bài</button></div></div>
    <div class="vocab-smart-note"><b>N4 Kana-first:</b> học và quiz chỉ dùng Kana ↔ nghĩa Việt. Kanji không xuất hiện trong câu hỏi từ vựng.</div><div id="n4m-vocab-area"></div>`;
  n4mRenderVocabMode();
}
function n4mSetVocabMode(mode){n4mVocabMode=mode;n4mKanaState=null;n4mQuizState=null;n4mRenderVocabMode()}
function n4mRenderVocabMode(){const area=document.getElementById('n4m-vocab-area'),l=n4mLesson(n4mCurrentLesson);if(!area)return;if(n4mVocabMode==='list')n4mRenderList(area,l);else if(n4mVocabMode==='quiz')n4mRenderQuizSetup(area,l);else n4mRenderKanaSetup(area,l)}
function n4mRenderList(area,l){
  const pages=l.sourcePages||[];
  area.innerHTML=`<div class="section-title"><div><h3>Danh sách từ vựng</h3><p>${l.vocab.length} mục • tìm theo Kanji, Kana, romaji hoặc nghĩa Việt.</p></div>${n4mCompleteButton('vocab')}</div>
    <div class="n4m-source-note"><b>Đã soát:</b> PDF N4 bạn cung cấp${pages.length?` • vùng trang PDF ${Math.min(...pages)}–${Math.max(...pages)}`:''}; bổ sung các mục cốt lõi thiếu khi đối chiếu Minna II.</div>
    <div class="vocab-wrap"><div class="vocab-toolbar"><input class="vocab-search" type="search" placeholder="Tìm Kanji, Kana, romaji hoặc nghĩa Việt…" oninput="filterVocab(this)"></div><div class="vocab-table"><div class="vocab-head"><b>Kanji / từ Nhật</b><b>Kana</b><b>Romaji</b><b>Nghĩa Việt</b></div>${l.vocab.map(v=>vocabRow(v)).join('')}</div></div>`;
}

/* ---------------- Kana-first new words ---------------- */
function n4mKanaDb(){return n4mSafeJson(N4M_KANA_KEY,{})}
function n4mKanaStatus(lesson,index){return n4mKanaDb()[`${lesson}:${index}`]?.status||'new'}
function n4mSetKanaStatus(lesson,index,status){const db=n4mKanaDb(),k=`${lesson}:${index}`,old=db[k]||{};db[k]={...old,status,updatedAt:Date.now(),seen:(old.seen||0)+1};n4mSaveJson(N4M_KANA_KEY,db)}
function n4mKanaStats(l){const a=l.vocab.map((_,i)=>n4mKanaStatus(l.id,i));return {fresh:a.filter(x=>x==='new').length,learning:a.filter(x=>x==='learning').length,mastered:a.filter(x=>x==='mastered').length}}
function n4mRenderKanaSetup(area,l){
  const st=n4mKanaStats(l);
  area.innerHTML=`<section class="kana-new-hero n4m-kana-hero"><div><span class="kana-new-kicker">N4 • KANA FIRST</span><h3>Học từ mới Bài ${l.id}</h3><p>Nhìn → tự nhớ → kiểm tra. Không cần Kanji ở bước học từ.</p></div><div class="kana-new-stats"><span><b>${st.fresh}</b><small>chưa học</small></span><span><b>${st.learning}</b><small>đang học</small></span><span><b>${st.mastered}</b><small>đã chắc</small></span></div></section>
    <div class="kana-new-plan"><div><b>1</b><span><strong>Nhìn</strong><small>Kana + nghĩa</small></span></div><i>→</i><div><b>2</b><span><strong>Recall</strong><small>Kana → nhớ nghĩa</small></span></div><i>→</i><div><b>3</b><span><strong>Check</strong><small>Kana ↔ Việt</small></span></div></div>
    <div class="kana-new-settings"><label><b>Số từ/lượt</b><select id="n4m-kana-size"><option>5</option><option selected>10</option><option>15</option><option>20</option></select></label><label><b>Phạm vi</b><select id="n4m-kana-scope"><option value="new" selected>Ưu tiên từ chưa chắc</option><option value="all">Tất cả từ</option></select></label><button class="primary-btn" onclick="n4mStartKana()">Bắt đầu →</button></div><div id="n4m-kana-session"></div>`;
}
function n4mStartKana(){
  const l=n4mLesson(n4mCurrentLesson),size=+(document.getElementById('n4m-kana-size')?.value||10),scope=document.getElementById('n4m-kana-scope')?.value||'new';
  let pool=l.vocab.map((v,i)=>({v,i,status:n4mKanaStatus(l.id,i)}));if(scope==='new')pool=pool.filter(x=>x.status!=='mastered');if(!pool.length)pool=l.vocab.map((v,i)=>({v,i,status:n4mKanaStatus(l.id,i)}));
  const rank={new:0,learning:1,mastered:2};pool=pool.map(x=>({...x,r:rank[x.status]??1,t:Math.random()})).sort((a,b)=>a.r-b.r||a.t-b.t).slice(0,size);
  pool.forEach(x=>{if(x.status==='new')n4mSetKanaStatus(l.id,x.i,'learning')});
  n4mKanaState={lessonId:l.id,items:pool,phase:'learn',index:0,score:0,wrong:[],revealed:false,answered:false,startedAt:Date.now()};n4mRenderKanaSession();
}
function n4mKanaArea(){return document.getElementById('n4m-kana-session')}
function n4mKanaHeader(title){const s=n4mKanaState;return `<div class="kana-session-top"><div><span>N4 • KANA ONLY</span><b>${title}</b></div><strong>${Math.min(s.index+1,s.items.length)}/${s.items.length}</strong></div><div class="progressbar kana-progress"><span style="width:${Math.round(s.index/s.items.length*100)}%"></span></div>`}
function n4mRenderKanaSession(){const s=n4mKanaState,area=n4mKanaArea();if(!s||!area)return;if(s.phase==='learn')return n4mKanaLearn(area);if(s.phase==='recall')return n4mKanaRecall(area);if(s.phase==='check')return n4mKanaCheck(area);return n4mKanaResult(area)}
function n4mKanaLearn(area){const s=n4mKanaState,x=s.items[s.index];if(!x){s.phase='recall';s.index=0;n4mRenderKanaSession();return}area.innerHTML=`<div class="kana-study-card">${n4mKanaHeader('1 • NHÌN')}<div class="kana-big">${escapeHtml(x.v.kana)}</div><div class="kana-meaning">${escapeHtml(x.v.vi)}</div><div class="kana-romaji">${escapeHtml(x.v.reading||'')}</div><div class="kana-learn-actions"><button class="secondary-btn" onclick="kanaSpeak('${escapeHtml(x.v.kana)}')">🔊 Nghe</button><button class="primary-btn" onclick="n4mKanaState.index++;n4mRenderKanaSession()">Đã xem →</button></div></div>`}
function n4mKanaRecall(area){const s=n4mKanaState,x=s.items[s.index];if(!x){s.phase='check';s.index=0;s.answered=false;n4mRenderKanaSession();return}s.startedAt=Date.now();s.revealed=false;area.innerHTML=`<div class="kana-study-card">${n4mKanaHeader('2 • ACTIVE RECALL')}<div class="kana-recall-label">Tự nhớ nghĩa trước khi mở</div><div class="kana-big">${escapeHtml(x.v.kana)}</div><button class="kana-reveal-btn" onclick="n4mRevealRecall()">Hiện nghĩa</button><div id="n4m-recall-answer"></div></div>`}
function n4mRevealRecall(){const s=n4mKanaState,x=s.items[s.index],box=document.getElementById('n4m-recall-answer');if(!box||s.revealed)return;s.revealed=true;box.innerHTML=`<div class="kana-revealed"><b>${escapeHtml(x.v.vi)}</b><span>Bạn nhớ được không?</span><div><button class="memory-btn again" onclick="n4mRateRecall('again')">1 • Quên</button><button class="memory-btn hard" onclick="n4mRateRecall('hard')">2 • Khó</button><button class="memory-btn good" onclick="n4mRateRecall('good')">3 • Nhớ</button><button class="memory-btn easy" onclick="n4mRateRecall('easy')">4 • Rất chắc</button></div></div>`}
function n4mRateRecall(rating){const s=n4mKanaState,x=s.items[s.index],ok=rating==='good'||rating==='easy';if(rating==='again'||rating==='hard')n4mSetKanaStatus(s.lessonId,x.i,'learning');if(rating==='easy')n4mSetKanaStatus(s.lessonId,x.i,'mastered');recordRecallEvent({itemKey:recallKey(['n4-minna-vocab',s.lessonId,x.i,'kana-recall']),domain:'vocab',skill:'n4m-kana-recall',lesson:s.lessonId,itemLabel:x.v.kana,target:x.v.kana,prompt:`${x.v.kana} → nghĩa?`,selected:rating,correctAnswer:x.v.vi,correct:ok,responseMs:Date.now()-s.startedAt,rating,source:`V24 • Minna N4 Bài ${s.lessonId}`});s.index++;n4mRenderKanaSession()}
function n4mDistractors(l,x,field){const rows=l.vocab.map((v,i)=>({v,i})).filter(p=>p.i!==x.i);rows.sort((a,b)=>{const sa=meaningSimilarity(x.v.vi,a.v.vi)+readingSimilarity(x.v.kana,a.v.kana),sb=meaningSimilarity(x.v.vi,b.v.vi)+readingSimilarity(x.v.kana,b.v.kana);return sb-sa});if(field==='vi')return [...new Set(rows.map(p=>p.v.vi))].filter(v=>v!==x.v.vi).slice(0,3);return [...new Set(rows.map(p=>p.v.kana))].filter(v=>v!==x.v.kana).slice(0,3)}
function n4mKanaCheck(area){const s=n4mKanaState,x=s.items[s.index];if(!x){s.phase='done';n4mRenderKanaSession();return}const l=n4mLesson(s.lessonId),forward=s.index%2===0,correct=forward?x.v.vi:x.v.kana,answers=shuffle([correct,...n4mDistractors(l,x,forward?'vi':'kana')]);s.q={forward,correct,answers,x};s.startedAt=Date.now();s.answered=false;area.innerHTML=`<div class="kana-study-card">${n4mKanaHeader('3 • KIỂM TRA')}<div class="kana-check-dir">${forward?'Kana → nghĩa Việt':'Nghĩa Việt → Kana'}</div><div class="${forward?'kana-big':'kana-check-meaning'}">${escapeHtml(forward?x.v.kana:x.v.vi)}</div><div class="kana-check-answers">${answers.map((a,i)=>`<button data-answer="${escapeHtml(a)}" onclick="n4mAnswerKanaCheck(this,${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHtml(a)}</b></button>`).join('')}</div><div id="n4m-check-feedback"></div></div>`}
function n4mAnswerKanaCheck(btn,i){const s=n4mKanaState;if(s.answered)return;s.answered=true;const q=s.q,selected=q.answers[i],ok=selected===q.correct;document.querySelectorAll('.kana-check-answers button').forEach(b=>{if(b.dataset.answer===q.correct)b.classList.add('correct')});if(ok)s.score++;else{btn.classList.add('wrong');s.wrong.push(q.x);n4mSetKanaStatus(s.lessonId,q.x.i,'learning')}recordRecallEvent({itemKey:recallKey(['n4-minna-vocab',s.lessonId,q.x.i,q.forward?'meaning':'form']),domain:'vocab',skill:q.forward?'n4m-kana-meaning':'n4m-kana-form',lesson:s.lessonId,itemLabel:q.x.v.kana,target:q.x.v.kana,prompt:q.forward?q.x.v.kana:q.x.v.vi,selected,correctAnswer:q.correct,correct:ok,responseMs:Date.now()-s.startedAt,source:`V24 • Minna N4 Bài ${s.lessonId}`});document.getElementById('n4m-check-feedback').innerHTML=`<div class="feedback"><b>${ok?'✓ Đúng':'✗ '+escapeHtml(selected)+' → '+escapeHtml(q.correct)}</b><span>${escapeHtml(q.x.v.kana)} = ${escapeHtml(q.x.v.vi)}</span></div><div class="kana-next"><button class="primary-btn" onclick="n4mKanaState.index++;n4mRenderKanaSession()">Tiếp →</button></div>`}
function n4mKanaResult(area){const s=n4mKanaState,l=n4mLesson(s.lessonId),wrong=new Set(s.wrong.map(x=>x.i));s.items.forEach(x=>{if(!wrong.has(x.i)&&s.score>=Math.ceil(s.items.length*.8))n4mSetKanaStatus(s.lessonId,x.i,'mastered')});const st=n4mKanaStats(l),pct=Math.round(s.score/s.items.length*100);area.innerHTML=`<div class="kana-result"><span>N4 KANA SESSION COMPLETE</span><h2>${s.score}/${s.items.length}</h2><p>${pct}% ở bước kiểm tra • ${st.mastered}/${l.vocab.length} từ đang được đánh dấu chắc.</p><div class="kana-result-actions"><button class="secondary-btn" onclick="n4mRenderKanaSetup(document.getElementById('n4m-vocab-area'),n4mLesson(${s.lessonId}))">Phiên mới</button><button class="ghost-btn" onclick="openRecallLab()">Recall Lab</button></div></div>`}

/* ---------------- Full lesson quiz: Kana <-> Vietnamese ---------------- */
function n4mBuildLessonQuestions(l,indices=null,direction='mixed'){
  const ids=indices||[...Array(l.vocab.length).keys()];
  return shuffle(ids.map((idx,n)=>{const v=l.vocab[idx],forward=direction==='kana'||(direction==='mixed'&&n%2===0);const correct=forward?v.vi:v.kana;const peers=n4mDistractors(l,{v,i:idx},forward?'vi':'kana');return {lesson:l.id,idx,v,forward,correct,answers:shuffle([correct,...peers]),prompt:forward?v.kana:v.vi,type:forward?'Kana → Việt':'Việt → Kana'}}));
}
function n4mRenderQuizSetup(area,l){area.innerHTML=`<div class="vocab-quiz-intro n4m-quiz-intro"><div class="vocab-coverage-ring"><b>100%</b><span>từ trong bài</span></div><div><span class="n4m-kana-badge">KANA ONLY</span><h3>Trắc nghiệm toàn Bài ${l.id}</h3><p>Đi qua đủ <b>${l.vocab.length}</b> mục. Không hỏi Kanji.</p><div class="vocab-quiz-facts"><span>Kana → Việt</span><span>Việt → Kana</span><span>Bẫy cùng bài</span></div></div></div><div class="vocab-quiz-settings"><label><b>Kiểu kiểm tra</b><select id="n4m-quiz-dir"><option value="mixed">Trộn 2 chiều</option><option value="kana">Kana → nghĩa Việt</option><option value="vi">Nghĩa Việt → Kana</option></select></label><button class="primary-btn" onclick="n4mStartQuiz()">Bắt đầu đủ ${l.vocab.length} từ →</button></div><div id="n4m-quiz-area"></div>`}
function n4mStartQuiz(){const l=n4mLesson(n4mCurrentLesson),dir=document.getElementById('n4m-quiz-dir')?.value||'mixed';n4mQuizState={questions:n4mBuildLessonQuestions(l,null,dir),index:0,score:0,wrong:[],answered:false,startedAt:Date.now()};n4mRenderQuizQuestion()}
function n4mRenderQuizQuestion(){const s=n4mQuizState,area=document.getElementById('n4m-quiz-area');if(!s||!area)return;if(s.index>=s.questions.length)return n4mRenderQuizResult();const q=s.questions[s.index],pct=Math.round(s.index/s.questions.length*100);s.answered=false;s.startedAt=Date.now();area.innerHTML=`<div class="vocab-full-quiz n4m-full-quiz"><div class="vocab-full-top"><div><span class="vocab-full-badge n4m-kana-badge">BÀI ${q.lesson} • KANA</span><h3>${q.type}</h3></div><div class="vocab-full-counter"><b>${s.index+1}</b><span>/ ${s.questions.length}</span></div></div><div class="progressbar vocab-full-progress"><span style="width:${pct}%"></span></div><div class="vocab-full-question">${escapeHtml(q.prompt)}</div><div class="vocab-full-answers">${q.answers.map((a,i)=>`<button class="vocab-full-answer" data-answer="${escapeHtml(a)}" onclick="n4mAnswerQuiz(this,${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHtml(a)}</b></button>`).join('')}</div><div id="n4m-quiz-feedback"></div></div>`}
function n4mAnswerQuiz(btn,i){const s=n4mQuizState;if(s.answered)return;s.answered=true;const q=s.questions[s.index],sel=q.answers[i],ok=sel===q.correct;document.querySelectorAll('.vocab-full-answer').forEach(b=>{if(b.dataset.answer===q.correct)b.classList.add('correct')});if(ok)s.score++;else{btn.classList.add('wrong');s.wrong.push(q)}recordRecallEvent({itemKey:recallKey(['n4-minna-vocab',q.lesson,q.idx,q.forward?'meaning':'form']),domain:'vocab',skill:q.forward?'n4m-kana-meaning':'n4m-kana-form',lesson:q.lesson,itemLabel:q.v.kana,target:q.v.kana,prompt:q.prompt,selected:sel,correctAnswer:q.correct,correct:ok,responseMs:Date.now()-s.startedAt,source:`V24 • Minna N4 Bài ${q.lesson}`,answers:q.answers});document.getElementById('n4m-quiz-feedback').innerHTML=`<div class="feedback"><b>${ok?'✓ Chính xác':'✗ '+escapeHtml(sel)+' → '+escapeHtml(q.correct)}</b><span>${escapeHtml(q.v.kana)} = ${escapeHtml(q.v.vi)}</span></div><div class="vocab-full-next"><button class="primary-btn" onclick="n4mQuizState.index++;n4mRenderQuizQuestion()">Câu tiếp theo →</button></div>`}
function n4mRenderQuizResult(){const s=n4mQuizState,area=document.getElementById('n4m-quiz-area'),pct=Math.round(s.score/s.questions.length*100);if(pct>=80)n4mMarkDone(n4mCurrentLesson,'quiz');area.innerHTML=`<div class="n4m-result"><span>FULL LESSON COMPLETE</span><h2>${s.score}/${s.questions.length}</h2><p>${pct}% chính xác • ${s.wrong.length} câu sai.</p><div class="n4m-result-actions">${s.wrong.length?`<button class="primary-btn" onclick="n4mRetryQuizWrong()">Luyện lại ${s.wrong.length} câu sai →</button>`:''}<button class="secondary-btn" onclick="n4mStartQuiz()">Bộ mới ↻</button><button class="ghost-btn" onclick="openRecallLab()">Recall Lab</button></div></div>`}
function n4mRetryQuizWrong(){const s=n4mQuizState;n4mQuizState={...s,questions:shuffle([...s.wrong]),index:0,score:0,wrong:[],answered:false};n4mRenderQuizQuestion()}

/* ---------------- Multi-lesson quiz ---------------- */
function n4mChecked(prefix){return [...document.querySelectorAll(`.${prefix}:checked`)].map(x=>+x.value)}
function n4mSetChecks(cls,ids){const set=new Set(ids);document.querySelectorAll(`.${cls}`).forEach(x=>x.checked=set.has(+x.value));if(cls==='n4m-multi-check')n4mUpdateMultiSummary();else n4mUpdateRandomSummary()}
function n4mRange(a,b){return [...Array(b-a+1)].map((_,i)=>a+i)}
function openN4MinnaMultiQuiz(){setNav('n4minna');app.innerHTML=`<div class="breadcrumb"><button onclick="goHome()">Trang chủ</button> › <button onclick="openN4MinnaHome()">N4 Minna</button> › Quiz nhiều bài</div><section class="n4m-tool-hero"><div><span class="n4m-eyebrow">N4 • MULTI-LESSON QUIZ</span><h1>Trắc nghiệm từ vựng nhiều bài</h1><p>Chọn Bài 26–50, rồi random Kana ↔ nghĩa Việt.</p></div></section>${n4mSelectorHtml('multi')}<div id="n4m-multi-area"></div>`;n4mSetChecks('n4m-multi-check',n4mRange(26,30))}
function n4mSelectorHtml(kind){const multi=kind==='multi',cls=multi?'n4m-multi-check':'n4m-random-check';return `<section class="panel n4m-selector"><div class="n4m-quick"><button class="secondary-btn" onclick="n4mSetChecks('${cls}',n4mRange(26,30))">26–30</button><button class="secondary-btn" onclick="n4mSetChecks('${cls}',n4mRange(26,40))">26–40</button><button class="secondary-btn" onclick="n4mSetChecks('${cls}',n4mRange(41,50))">41–50</button><button class="secondary-btn" onclick="n4mSetChecks('${cls}',n4mRange(26,50))">Tất cả</button></div><div class="n4m-lesson-select">${N4_MINNA_LESSONS.map(l=>`<label><input class="${cls}" type="checkbox" value="${l.id}" onchange="${multi?'n4mUpdateMultiSummary()':'n4mUpdateRandomSummary()'}"><span><b>${l.id}</b><small>${l.vocab.length} từ</small></span></label>`).join('')}</div><div id="${multi?'n4m-multi-summary':'n4m-random-summary'}" class="n4m-selection-summary"></div><div class="n4m-tool-options"><label><b>Hướng</b><select id="${multi?'n4m-multi-dir':'n4m-random-dir'}"><option value="mixed">Trộn Kana ↔ Việt</option><option value="kana">Kana → Việt</option><option value="vi">Việt → Kana</option></select></label><label><b>${multi?'Số câu':'Số thẻ'}</b><select id="${multi?'n4m-multi-count':'n4m-random-count'}"><option value="20">20</option><option value="50" selected>50</option><option value="100">100</option><option value="all">Tất cả</option></select></label><button class="primary-btn" onclick="${multi?'n4mStartMulti()':'n4mStartRandomFlash()'}">Bắt đầu →</button></div></section>`}
function n4mUpdateMultiSummary(){const ids=n4mChecked('n4m-multi-check'),n=ids.reduce((s,id)=>s+n4mLesson(id).vocab.length,0),b=document.getElementById('n4m-multi-summary');if(b)b.innerHTML=`Đã chọn <b>${ids.length}</b> bài • <b>${n}</b> từ trong phạm vi`}
function n4mBuildMulti(ids,dir,count){let all=[];ids.forEach(id=>{const l=n4mLesson(id);l.vocab.forEach((v,idx)=>all.push({lesson:id,idx,v}))});all=shuffle(all);if(count!=='all')all=all.slice(0,+count);return all.map((x,n)=>{const l=n4mLesson(x.lesson),forward=dir==='kana'||(dir==='mixed'&&n%2===0),correct=forward?x.v.vi:x.v.kana,peers=n4mDistractors(l,{v:x.v,i:x.idx},forward?'vi':'kana');return {...x,forward,correct,prompt:forward?x.v.kana:x.v.vi,answers:shuffle([correct,...peers]),type:forward?'Kana → Việt':'Việt → Kana'}})}
function n4mStartMulti(){const ids=n4mChecked('n4m-multi-check');if(!ids.length)return;const dir=document.getElementById('n4m-multi-dir')?.value||'mixed',count=document.getElementById('n4m-multi-count')?.value||'50';n4mMultiState={questions:n4mBuildMulti(ids,dir,count),index:0,score:0,wrong:[],answered:false,startedAt:Date.now()};n4mRenderMultiQuestion()}
function n4mRenderMultiQuestion(){const s=n4mMultiState,area=document.getElementById('n4m-multi-area');if(!s||!area)return;if(s.index>=s.questions.length)return n4mRenderMultiResult();const q=s.questions[s.index],pct=Math.round(s.index/s.questions.length*100);s.answered=false;s.startedAt=Date.now();area.innerHTML=`<div class="vq-question-card n4m-multi-card"><div class="vq-qtop"><div><span class="vq-badge">BÀI ${q.lesson} • KANA</span><b>${q.type}</b></div><span>${s.index+1}/${s.questions.length}</span></div><div class="progressbar vq-progress"><span style="width:${pct}%"></span></div><div class="vq-question">${escapeHtml(q.prompt)}</div><div class="vq-answers">${q.answers.map((a,i)=>`<button class="vq-answer" data-answer="${escapeHtml(a)}" onclick="n4mAnswerMulti(this,${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHtml(a)}</b></button>`).join('')}</div><div id="n4m-multi-feedback"></div></div>`}
function n4mAnswerMulti(btn,i){const s=n4mMultiState;if(s.answered)return;s.answered=true;const q=s.questions[s.index],sel=q.answers[i],ok=sel===q.correct;document.querySelectorAll('.vq-answer').forEach(b=>{if(b.dataset.answer===q.correct)b.classList.add('correct')});if(ok)s.score++;else{btn.classList.add('wrong');s.wrong.push(q)}recordRecallEvent({itemKey:recallKey(['n4-minna-vocab',q.lesson,q.idx,q.forward?'meaning':'form']),domain:'vocab',skill:q.forward?'n4m-kana-meaning':'n4m-kana-form',lesson:q.lesson,itemLabel:q.v.kana,target:q.v.kana,prompt:q.prompt,selected:sel,correctAnswer:q.correct,correct:ok,responseMs:Date.now()-s.startedAt,source:'V24 • Minna N4 Multi Quiz'});document.getElementById('n4m-multi-feedback').innerHTML=`<div class="feedback"><b>${ok?'✓ Đúng':'✗ '+escapeHtml(sel)+' → '+escapeHtml(q.correct)}</b><span>${escapeHtml(q.v.kana)} = ${escapeHtml(q.v.vi)}</span></div><div class="vq-next"><button class="primary-btn" onclick="n4mMultiState.index++;n4mRenderMultiQuestion()">Tiếp →</button></div>`}
function n4mRenderMultiResult(){const s=n4mMultiState,area=document.getElementById('n4m-multi-area'),pct=Math.round(s.score/s.questions.length*100);area.innerHTML=`<div class="n4m-result"><span>MULTI QUIZ COMPLETE</span><h2>${s.score}/${s.questions.length}</h2><p>${pct}% • ${s.wrong.length} câu sai.</p><div class="n4m-result-actions">${s.wrong.length?`<button class="primary-btn" onclick="n4mMultiState={...n4mMultiState,questions:shuffle([...n4mMultiState.wrong]),index:0,score:0,wrong:[],answered:false};n4mRenderMultiQuestion()">Luyện lại câu sai →</button>`:''}<button class="secondary-btn" onclick="n4mStartMulti()">Random bộ mới ↻</button></div></div>`}

/* ---------------- Random multi-lesson flashcards ---------------- */
function openN4MinnaRandomFlash(){setNav('n4minna');app.innerHTML=`<div class="breadcrumb"><button onclick="goHome()">Trang chủ</button> › <button onclick="openN4MinnaHome()">N4 Minna</button> › Flashcard random</div><section class="n4m-tool-hero"><div><span class="n4m-eyebrow">N4 • RANDOM FLASHCARDS</span><h1>Flashcard từ vựng random</h1><p>Chọn nhiều bài rồi xáo thẻ ngẫu nhiên, giống chế độ Flashcard nhiều bài của N5.</p></div></section>${n4mSelectorHtml('random')}<div id="n4m-random-area"></div>`;n4mSetChecks('n4m-random-check',n4mRange(26,30))}
function n4mUpdateRandomSummary(){const ids=n4mChecked('n4m-random-check'),n=ids.reduce((s,id)=>s+n4mLesson(id).vocab.length,0),b=document.getElementById('n4m-random-summary');if(b)b.innerHTML=`Đã chọn <b>${ids.length}</b> bài • <b>${n}</b> từ trong phạm vi`}
function n4mBuildRandomCards(ids,dir,count){let pool=[];ids.forEach(id=>n4mLesson(id).vocab.forEach((v,idx)=>pool.push({lesson:id,idx,v})));pool=shuffle(pool);if(count!=='all')pool=pool.slice(0,+count);return pool.map((x,n)=>({...x,dir:dir==='mixed'?(n%2===0?'kana':'vi'):dir}))}
function n4mStartRandomFlash(){const ids=n4mChecked('n4m-random-check');if(!ids.length)return;const dir=document.getElementById('n4m-random-dir')?.value||'mixed',count=document.getElementById('n4m-random-count')?.value||'50';n4mRandomFlashState={cards:n4mBuildRandomCards(ids,dir,count),index:0,remembered:0,forgot:0,forgotten:[],revealed:false,startedAt:Date.now()};n4mRenderRandomFlash()}
function n4mRenderRandomFlash(){const s=n4mRandomFlashState,area=document.getElementById('n4m-random-area');if(!s||!area)return;if(s.index>=s.cards.length)return n4mRenderRandomResult();const c=s.cards[s.index],front=c.dir==='kana'?c.v.kana:c.v.vi,back=c.dir==='kana'?c.v.vi:c.v.kana,pct=Math.round(s.index/s.cards.length*100);s.revealed=false;s.startedAt=Date.now();area.innerHTML=`<div class="vf-session n4m-random-session"><div class="vf-top"><div><span>BÀI ${c.lesson}</span><b>${c.dir==='kana'?'KANA → NGHĨA':'NGHĨA → KANA'}</b></div><strong>${s.index+1}/${s.cards.length}</strong></div><div class="progressbar vf-progress"><span style="width:${pct}%"></span></div><button class="vf-card" onclick="n4mRevealRandom()"><small>${c.dir==='kana'?'Đọc và nhớ nghĩa':'Nhớ cách đọc Kana'}</small><strong>${escapeHtml(front)}</strong><span id="n4m-random-hint">Bấm để lật thẻ</span><div id="n4m-random-back"></div></button><div id="n4m-random-rate"></div></div>`}
function n4mRevealRandom(){const s=n4mRandomFlashState;if(s.revealed)return;s.revealed=true;const c=s.cards[s.index],back=c.dir==='kana'?c.v.vi:c.v.kana;document.getElementById('n4m-random-hint').textContent='Đáp án';document.getElementById('n4m-random-back').innerHTML=`<b>${escapeHtml(back)}</b><small>${escapeHtml(c.v.kana)} = ${escapeHtml(c.v.vi)}</small>`;document.getElementById('n4m-random-rate').innerHTML=`<div class="vf-rate"><button class="memory-btn again" onclick="n4mRateRandom(false)">Quên</button><button class="memory-btn good" onclick="n4mRateRandom(true)">Nhớ</button></div>`}
function n4mRateRandom(ok){const s=n4mRandomFlashState,c=s.cards[s.index];if(ok)s.remembered++;else{s.forgot++;s.forgotten.push(c)}recordRecallEvent({itemKey:recallKey(['n4-minna-vocab',c.lesson,c.idx,'random-flash']),domain:'vocab',skill:'n4m-random-flash',lesson:c.lesson,itemLabel:c.v.kana,target:c.v.kana,prompt:c.dir==='kana'?c.v.kana:c.v.vi,selected:ok?'remembered':'forgot',correctAnswer:c.dir==='kana'?c.v.vi:c.v.kana,correct:ok,responseMs:Date.now()-s.startedAt,rating:ok?'good':'again',source:'V24 • Minna N4 Random Flash'});s.index++;n4mRenderRandomFlash()}
function n4mRenderRandomResult(){const s=n4mRandomFlashState,area=document.getElementById('n4m-random-area'),pct=Math.round(s.remembered/s.cards.length*100);area.innerHTML=`<div class="n4m-result"><span>RANDOM FLASH COMPLETE</span><h2>${s.remembered}/${s.cards.length}</h2><p>Nhớ ${pct}% • Quên ${s.forgot} thẻ.</p><div class="n4m-result-actions">${s.forgotten.length?`<button class="primary-btn" onclick="n4mRandomFlashState={...n4mRandomFlashState,cards:shuffle([...n4mRandomFlashState.forgotten]),index:0,remembered:0,forgot:0,forgotten:[],revealed:false};n4mRenderRandomFlash()">Ôn lại ${s.forgotten.length} thẻ quên →</button>`:''}<button class="secondary-btn" onclick="n4mStartRandomFlash()">Random bộ mới ↻</button></div></div>`}

/* Recall skill labels */
const _v24RecallSkillLabel=recallSkillLabel;
recallSkillLabel=function(skill){const m={'n4m-flash':'N4 Minna: flashcard','n4m-kana-recall':'N4 Minna: recall Kana','n4m-kana-meaning':'N4 Minna: Kana → nghĩa','n4m-kana-form':'N4 Minna: nghĩa → Kana','n4m-random-flash':'N4 Minna: random flash'};return m[skill]||_v24RecallSkillLabel(skill)};

/* Initial install after earlier scripts already rendered home. */
setTimeout(()=>{n4mInstallNav();n4mInjectHomeCard()},0);
