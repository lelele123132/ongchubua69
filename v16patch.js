/* ==========================================================
   V16 — N4 Kanji bổ sung + Performance Patch
   ========================================================== */

/* 8 mục từ/Kanji lấy từ trang bài tập người dùng vừa gửi. */
const N4_ADDED_KANJI_WORDS = [
  {kanji:'貸す', reading:'かす', meaning:'cho mượn', char:'貸', on:'タイ', kun:'かす', example:'本を貸す。', exampleReading:'ほんを かす。', exampleVi:'Cho mượn sách.'},
  {kanji:'借りる', reading:'かりる', meaning:'mượn, vay', char:'借', on:'シャク', kun:'かりる', example:'お金を借りる。', exampleReading:'おかねを かりる。', exampleVi:'Mượn tiền.'},
  {kanji:'送る', reading:'おくる', meaning:'gửi, tiễn', char:'送', on:'ソウ', kun:'おくる', example:'レポートを送る。', exampleReading:'レポートを おくる。', exampleVi:'Gửi báo cáo.'},
  {kanji:'強い', reading:'つよい', meaning:'mạnh, khỏe', char:'強', on:'キョウ・ゴウ', kun:'つよい', example:'強い体', exampleReading:'つよい からだ', exampleVi:'Cơ thể khỏe, mạnh.'},
  {kanji:'勉強する', reading:'べんきょうする', meaning:'học', char:'勉', on:'ベン', kun:'—', example:'勉強する。', exampleReading:'べんきょうする。', exampleVi:'Học.'},
  {kanji:'旅行する', reading:'りょこうする', meaning:'đi du lịch', char:'旅', on:'リョ', kun:'たび', example:'旅行する。', exampleReading:'りょこうする。', exampleVi:'Đi du lịch.'},
  {kanji:'教室', reading:'きょうしつ', meaning:'lớp học, phòng học', char:'室', on:'シツ', kun:'むろ', example:'教室', exampleReading:'きょうしつ', exampleVi:'Lớp học / phòng học.'},
  {kanji:'登る', reading:'のぼる', meaning:'leo, trèo lên', char:'登', on:'トウ・ト', kun:'のぼる', example:'山に登る。', exampleReading:'やまに のぼる。', exampleVi:'Leo núi.'}
];

const N4_COMBINED_WORDS_V16 = (()=>{
  const map=new Map();
  DUNGMORI_N4_WORDS.forEach(w=>map.set(`${w.kanji}|${w.reading}`,w));
  N4_ADDED_KANJI_WORDS.forEach(w=>map.set(`${w.kanji}|${w.reading}`,w));
  return [...map.values()];
})();

/* ---------- Performance: cache Recall model while building large vocab sets ---------- */
let _v16RecallCache=null;
let _v16RecallCacheAt=0;
function v16RecallModelCached(maxAge=2500){
  const now=Date.now();
  if(!_v16RecallCache || now-_v16RecallCacheAt>maxAge){
    _v16RecallCache=getRecallModel();
    _v16RecallCacheAt=now;
  }
  return _v16RecallCache;
}
function v16InvalidateRecallCache(){
  _v16RecallCache=null;_v16RecallCacheAt=0;
}

/* Override hot path: V13 cũ parse localStorage cho MỖI candidate distractor. */
vocabHistoricalConfusionBonus=function(itemKey,candidate){
  try{
    const state=v16RecallModelCached()[itemKey];
    return state?.confusions?.[String(candidate)]||0;
  }catch{return 0}
};

/* Cache số từ yếu/sai cho 25 bài, tránh quét toàn bộ model mỗi lần tick checkbox. */
let _v16WeakCounts=null,_v16WeakCountsAt=0;
function v16WeakCounts(){
  const now=Date.now();
  if(_v16WeakCounts && now-_v16WeakCountsAt<3500)return _v16WeakCounts;
  const model=v16RecallModelCached(),out={};
  LESSONS.forEach(l=>{
    let count=0;
    l.vocab.forEach((v,i)=>{
      let bad=false;
      ['vocab-meaning','vocab-reading','vocab-word'].forEach(skill=>{
        const st=model[recallKey(['vocab',l.id,i,skill])];
        if(st&&(st.wrong>0||st.lapses>0||(st.memoryStrength??100)<55))bad=true;
      });
      if(bad)count++;
    });
    out[l.id]=count;
  });
  _v16WeakCounts=out;_v16WeakCountsAt=now;return out;
}
vqWrongIndicesForLesson=function(l){
  const model=v16RecallModelCached(),bad=[];
  l.vocab.forEach((v,i)=>{
    let weak=false;
    ['vocab-meaning','vocab-reading','vocab-word'].forEach(skill=>{
      const st=model[recallKey(['vocab',l.id,i,skill])];
      if(st&&(st.wrong>0||st.lapses>0||(st.memoryStrength??100)<55))weak=true;
    });
    if(weak)bad.push(i);
  });
  return bad;
};
updateVocabQuizSummary=function(){
  const box=document.getElementById('vq-selection-summary');if(!box)return;
  const ids=vqCheckedLessonIds(),coverage=document.getElementById('vq-coverage')?.value||'full';
  const total=ids.reduce((s,id)=>s+LESSONS[id-1].vocab.length,0);
  const wc=v16WeakCounts(),wrong=ids.reduce((s,id)=>s+(wc[id]||0),0);
  const count=coverage==='full'?total:coverage==='wrong'?wrong:Math.min(+coverage,total);
  box.innerHTML=`<div class="vq-summary">
    <span><b>${ids.length}</b><small>bài đã chọn</small></span>
    <span><b>${total}</b><small>từ trong phạm vi</small></span>
    <span><b>${count}</b><small>câu dự kiến</small></span>
    <span><b>${wrong}</b><small>từ Recall đang yếu/sai</small></span>
  </div>`;
};

/* ---------- Performance: virtual/paged vocabulary list for many lessons ---------- */
let practiceVocabVirtualAll=[];
let practiceVocabVirtualFiltered=[];
let practiceVocabVirtualPage=0;
const PRACTICE_VOCAB_PAGE_SIZE=80;

function renderPracticeVocabVirtual(){
  const r=document.getElementById('practice-result');if(!r)return;
  const total=practiceVocabVirtualFiltered.length;
  const pages=Math.max(1,Math.ceil(total/PRACTICE_VOCAB_PAGE_SIZE));
  practiceVocabVirtualPage=Math.max(0,Math.min(practiceVocabVirtualPage,pages-1));
  const start=practiceVocabVirtualPage*PRACTICE_VOCAB_PAGE_SIZE;
  const rows=practiceVocabVirtualFiltered.slice(start,start+PRACTICE_VOCAB_PAGE_SIZE);
  r.innerHTML=`<hr class="divider"><div class="vocab-wrap fast-vocab-wrap">
    <div class="section-title"><div><h2>Từ vựng đã chọn</h2>
      <p>${total} mục • chỉ dựng tối đa ${PRACTICE_VOCAB_PAGE_SIZE} dòng/lần để không lag.</p></div>
      <div class="fast-vocab-count">${start+1}-${Math.min(start+rows.length,total)} / ${total}</div></div>
    <div class="vocab-toolbar fast-vocab-toolbar">
      <input class="vocab-search" id="fast-vocab-search" type="search" placeholder="Tìm Kanji, Kana, romaji hoặc nghĩa Việt…" oninput="filterPracticeVocabVirtual(this.value)">
      <select id="fast-vocab-page-size" onchange="void(0)" disabled><option>${PRACTICE_VOCAB_PAGE_SIZE} dòng / trang</option></select>
    </div>
    <div class="vocab-table"><div class="vocab-head"><b>Kanji / từ Nhật</b><b>Kana</b><b>Romaji</b><b>Nghĩa Việt</b></div>
      ${rows.map(v=>vocabRow(v,v.lesson)).join('')}
    </div>
    <div class="fast-vocab-pages">
      <button class="secondary-btn" onclick="practiceVocabVirtualPage=0;renderPracticeVocabVirtual()" ${practiceVocabVirtualPage===0?'disabled':''}>« Đầu</button>
      <button class="secondary-btn" onclick="practiceVocabVirtualPage--;renderPracticeVocabVirtual()" ${practiceVocabVirtualPage===0?'disabled':''}>← Trước</button>
      <span>Trang <b>${practiceVocabVirtualPage+1}</b> / ${pages}</span>
      <button class="secondary-btn" onclick="practiceVocabVirtualPage++;renderPracticeVocabVirtual()" ${practiceVocabVirtualPage>=pages-1?'disabled':''}>Sau →</button>
      <button class="secondary-btn" onclick="practiceVocabVirtualPage=${pages-1};renderPracticeVocabVirtual()" ${practiceVocabVirtualPage>=pages-1?'disabled':''}>Cuối »</button>
    </div>
  </div>`;
}
function filterPracticeVocabVirtual(q){
  const x=String(q||'').trim().toLowerCase();
  practiceVocabVirtualFiltered=!x?practiceVocabVirtualAll:practiceVocabVirtualAll.filter(v=>
    `${v.jp} ${v.kana||''} ${v.reading||''} ${v.vi||''} ${v.lesson}`.toLowerCase().includes(x)
  );
  practiceVocabVirtualPage=0;renderPracticeVocabVirtual();
  const inp=document.getElementById('fast-vocab-search');if(inp){inp.value=q;inp.focus();inp.setSelectionRange(q.length,q.length)}
}

/* Wrap V15 mixed-practice override, intercept only the heavy vocabulary-list mode. */
const _v16StartMixedPractice=startMixedPractice;
startMixedPractice=function(mode){
  if(mode!=='vocab')return _v16StartMixedPractice(mode);
  const ids=ensureSelection();if(!ids)return;
  practiceActiveMode=mode;
  practiceVocabVirtualAll=ids.flatMap(id=>LESSONS[id-1].vocab.map(v=>({...v,lesson:id})));
  practiceVocabVirtualFiltered=practiceVocabVirtualAll;
  practiceVocabVirtualPage=0;
  renderPracticeVocabVirtual();
};

/* ---------- N4: add the 8 just-studied Kanji/words as a dedicated source ---------- */
openN4Quiz=function(){
  setNav('n4');n4QuizState=null;
  app.innerHTML=`<div class="breadcrumb"><button onclick="goHome()">Trang chủ</button> › N4 Quiz</div>
  <section class="n4-hero"><div><span class="n4-eyebrow">KANJI N4 • 3 BỘ LUYỆN</span>
    <h1>N4 Kanji & từ ghép</h1>
    <p>Gokaku: câu hỏi PDF • Dũng Mori: bảng tổng hợp • Bộ mới: 8 Kanji/từ vừa học từ trang bài tập của bạn.</p></div>
    <div class="n4-source-stats"><div><b>${GOKAKU_N4_QUESTIONS.length}</b><span>Gokaku</span></div>
      <div><b>${DUNGMORI_N4_WORDS.length}</b><span>Dũng Mori</span></div>
      <div><b>${N4_ADDED_KANJI_WORDS.length}</b><span>Kanji vừa thêm</span></div></div>
  </section>
  <section class="panel n4-setup"><div class="n4-source-grid n4-source-grid-v16">
    <button class="n4-source-card active" id="n4-source-gokaku" onclick="chooseN4Source('gokaku')"><span class="n4-source-tag">PDF 1</span><h3>Gokaku – câu hỏi gốc</h3><p>問題1 đọc Kanji • 問題2 viết Kanji</p><b>${GOKAKU_N4_QUESTIONS.length} câu</b></button>
    <button class="n4-source-card" id="n4-source-dungmori" onclick="chooseN4Source('dungmori')"><span class="n4-source-tag green">PDF 2</span><h3>Dũng Mori – ôn tổng hợp</h3><p>Đọc, nghĩa và viết Kanji từ bảng tổng hợp.</p><b>${DUNGMORI_N4_WORDS.length} mục</b></button>
    <button class="n4-source-card n4-added-card" id="n4-source-added" onclick="chooseN4Source('added')"><span class="n4-source-tag purple">MỚI</span><h3>8 Kanji vừa học</h3><p>貸・借・送・強・勉・旅・室・登</p><b>8 mục</b></button>
  </div><div id="n4-options"></div><div id="n4-quiz-area"></div></section>`;
  chooseN4Source('gokaku');
};

chooseN4Source=function(source){
  document.querySelectorAll('.n4-source-card').forEach(x=>x.classList.remove('active'));
  document.getElementById(`n4-source-${source}`)?.classList.add('active');
  const opt=document.getElementById('n4-options'),area=document.getElementById('n4-quiz-area');if(!opt||!area)return;
  area.innerHTML='';
  if(source==='gokaku'){
    opt.innerHTML=`<div class="n4-option-row"><label><b>Phần</b><select id="n4-mondai"><option value="all">Cả 2 Mondai</option><option value="1">問題1 – Đọc Kanji (86 câu)</option><option value="2">問題2 – Viết Kanji (65 câu)</option></select></label>
      <label><b>Số câu</b><select id="n4-count"><option value="10">10 câu</option><option value="20" selected>20 câu</option><option value="50">50 câu</option><option value="all">Tất cả</option></select></label>
      <button class="primary-btn n4-start-btn" onclick="startGokakuQuiz()">Bắt đầu Gokaku →</button></div>
      <div class="n4-source-note"><b>Nguồn câu:</b> ${N4_GOKAKU_SOURCE}.</div>`;
  }else if(source==='dungmori'){
    opt.innerHTML=`<div class="n4-option-row"><label><b>Dạng</b><select id="n4-dung-kind"><option value="mixed">Trộn 3 dạng</option><option value="reading">Kanji → cách đọc</option><option value="meaning">Kanji → nghĩa Việt</option><option value="writing">Kana → Kanji</option></select></label>
      <label><b>Số câu</b><select id="n4-dung-count"><option value="10">10 câu</option><option value="20" selected>20 câu</option><option value="40">40 câu</option></select></label>
      <button class="primary-btn n4-start-btn" onclick="startDungMoriQuiz()">Bắt đầu Dũng Mori →</button></div>
      <div class="n4-source-note"><b>Nguồn dữ liệu:</b> ${N4_DUNGMORI_SOURCE}.</div>`;
  }else{
    opt.innerHTML=`<div class="n4-added-study">
      <div class="n4-added-kanji-row">${N4_ADDED_KANJI_WORDS.map(w=>`<button onclick="showN4AddedDetail('${w.char}')"><b>${w.char}</b><span>${w.reading}</span></button>`).join('')}</div>
      <div id="n4-added-detail" class="n4-added-detail"><b>Chọn một chữ để xem ví dụ.</b></div></div>
      <div class="n4-option-row"><label><b>Dạng</b><select id="n4-added-kind"><option value="mixed">Trộn: đọc + nghĩa + viết</option><option value="reading">Kanji/từ → cách đọc</option><option value="meaning">Kanji/từ → nghĩa</option><option value="writing">Kana → Kanji/từ</option></select></label>
      <label><b>Số câu</b><select id="n4-added-count"><option value="8">8 câu</option><option value="16">16 câu</option><option value="24" selected>24 câu (đủ 3 dạng)</option></select></label>
      <button class="primary-btn n4-start-btn" onclick="startN4AddedQuiz()">Luyện 8 Kanji →</button></div>
      <div class="n4-source-note"><b>8 mục thêm:</b> 貸す・借りる・送る・強い・勉強する・旅行する・教室・登る. Đây là bộ bổ sung từ trang bài tập bạn gửi, tách riêng khỏi hai PDF N4.</div>`;
    showN4AddedDetail('貸');
  }
};

function showN4AddedDetail(ch){
  const w=N4_ADDED_KANJI_WORDS.find(x=>x.char===ch),box=document.getElementById('n4-added-detail');if(!w||!box)return;
  box.innerHTML=`<strong class="n4-added-big">${w.char}</strong><div><b>${escapeHtml(w.kanji)}（${escapeHtml(w.reading)}）</b>
    <span>${escapeHtml(w.meaning)}</span><small>音: ${escapeHtml(w.on)} • 訓: ${escapeHtml(w.kun)}</small>
    <em>${escapeHtml(w.example)} • ${escapeHtml(w.exampleReading)} = ${escapeHtml(w.exampleVi)}</em></div>`;
}
function n4V16Distractors(field,correct,count=3){
  let vals=[...new Set(N4_COMBINED_WORDS_V16.map(w=>w[field]).filter(x=>x&&x!==correct))];
  if(field==='reading')vals.sort((a,b)=>readingSimilarity(correct,b)-readingSimilarity(correct,a));
  else if(field==='meaning')vals.sort((a,b)=>meaningSimilarity(correct,b)-meaningSimilarity(correct,a));
  else vals.sort((a,b)=>visualWordScore(correct,b)-visualWordScore(correct,a));
  return vals.slice(0,count);
}
function buildN4AddedQuestions(kind,count){
  let out=[];
  const kindsAll=['reading','meaning','writing'];
  N4_ADDED_KANJI_WORDS.forEach(w=>{
    const kinds=kind==='mixed'?kindsAll:[kind];
    kinds.forEach(k=>{
      if(k==='reading'){
        const opts=shuffle([w.reading,...n4V16Distractors('reading',w.reading)]);
        out.push({source:'added',kind:k,prompt:`「${w.kanji}」の読み方は？`,target:w.kanji,options:opts,answer:opts.indexOf(w.reading),word:w});
      }else if(k==='meaning'){
        const opts=shuffle([w.meaning,...n4V16Distractors('meaning',w.meaning)]);
        out.push({source:'added',kind:k,prompt:`「${w.kanji}」の意味は？`,target:w.kanji,options:opts,answer:opts.indexOf(w.meaning),word:w});
      }else{
        const opts=shuffle([w.kanji,...n4V16Distractors('kanji',w.kanji)]);
        out.push({source:'added',kind:k,prompt:`「${w.reading}」の正しい漢字・語は？`,target:w.reading,options:opts,answer:opts.indexOf(w.kanji),word:w});
      }
    });
  });
  return shuffle(out).slice(0,Math.min(count,out.length));
}
function startN4AddedQuiz(){
  const kind=document.getElementById('n4-added-kind')?.value||'mixed';
  const count=+(document.getElementById('n4-added-count')?.value||24);
  n4QuizState={source:'added',questions:buildN4AddedQuestions(kind,count),index:0,score:0,answered:false,wrong:[]};
  renderN4Question();
}

/* Override display/record so the new source is labelled correctly. */
renderN4Question=function(){
  const area=document.getElementById('n4-quiz-area'),s=n4QuizState;if(!area||!s)return;
  if(s.index>=s.questions.length){renderN4Result(area);return}
  const q=s.questions[s.index];
  const sourceLabel=s.source==='gokaku'
    ?`GOKAKU • 問題${q.mondai} • câu ${q.number} • PDF trang ${q.page}`
    :s.source==='added'
      ?`KANJI VỪA THÊM • ${q.kind==='reading'?'Cách đọc':q.kind==='writing'?'Viết Kanji/từ':'Nghĩa'}`
      :`DŨNG MORI • ${q.kind==='reading'?'Cách đọc':q.kind==='writing'?'Viết Kanji':'Nghĩa'}`;
  const pct=Math.round(s.index/s.questions.length*100);s.questionStartedAt=Date.now();
  area.innerHTML=`<div class="n4-quiz-card"><div class="n4-quiz-top"><span>${sourceLabel}</span><b>${s.index+1}/${s.questions.length}</b></div>
    <div class="progressbar n4-progress"><span style="width:${pct}%"></span></div><div class="n4-question">${escapeHtml(q.prompt)}</div>
    ${q.sentence?`<div class="n4-original-sentence">${escapeHtml(q.sentence)}</div>`:''}
    <div class="n4-answer-grid">${q.options.map((a,i)=>`<button class="n4-answer" data-index="${i}" onclick="answerN4Question(this,${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHtml(a)}</b></button>`).join('')}</div><div id="n4-feedback"></div></div>`;
};
answerN4Question=function(btn,i){
  const s=n4QuizState,q=s.questions[s.index];if(s.answered)return;s.answered=true;
  const correct=q.answer;
  document.querySelectorAll('.n4-answer').forEach((b,idx)=>{if(idx===correct)b.classList.add('correct')});
  if(i===correct)s.score++;else{btn.classList.add('wrong');s.wrong.push(q)}
  const correctText=q.options[correct];
  const skill=q.kind==='writing'?'n4-writing':q.kind==='meaning'?'n4-meaning':'n4-reading';
  const key=s.source==='gokaku'
    ?recallKey(['n4','gokaku',q.id])
    :recallKey(['n4',s.source,q.kind,(q.word&&q.word.kanji)||q.target]);
  const src=s.source==='gokaku'?'Gokaku N4':s.source==='added'?'N4 • 8 Kanji bổ sung':'Dũng Mori N4';
  recordRecallEvent({itemKey:key,domain:'n4',skill,itemLabel:(q.word&&q.word.kanji)||q.target||q.id,target:q.target||'',prompt:q.prompt,selected:q.options[i],correctAnswer:correctText,correct:i===correct,responseMs:Date.now()-(s.questionStartedAt||Date.now()),source:src,answers:q.options,explanation:q.word?`${q.word.kanji} • ${q.word.reading} • ${q.word.meaning}`:''});
  const word=q.word||n4WordLookup(q);
  let explain=`<b>${i===correct?'✓ Chính xác':'✗ Đáp án đúng: '+escapeHtml(correctText)}</b>`;
  if(word){
    explain+=`<div class="n4-word-explain"><strong>${escapeHtml(word.kanji)}</strong><span>${escapeHtml(word.reading)}</span><em>${escapeHtml(word.meaning)}</em></div>`;
    if(s.source==='added'&&word.example)explain+=`<div class="n4-added-example">${escapeHtml(word.example)} <small>${escapeHtml(word.exampleReading)} = ${escapeHtml(word.exampleVi)}</small></div>`;
  }
  document.getElementById('n4-feedback').innerHTML=`<div class="feedback n4-feedback">${explain}</div><div class="n4-next"><button class="primary-btn" onclick="nextN4Question()">Câu tiếp theo →</button></div>`;
  v16InvalidateRecallCache();_v16WeakCounts=null;
};
renderN4Result=function(area){
  const s=n4QuizState,pct=s.questions.length?Math.round(s.score/s.questions.length*100):0;
  const restart=s.source==='gokaku'?'startGokakuQuiz()':s.source==='added'?'startN4AddedQuiz()':'startDungMoriQuiz()';
  area.innerHTML=`<div class="n4-result"><span class="n4-eyebrow">HOÀN THÀNH</span><h2>Kết quả N4</h2>
    <div class="n4-result-score">${s.score}<small>/${s.questions.length}</small></div>
    <p>${pct>=90?'Rất chắc.':pct>=75?'Khá tốt, luyện lại câu sai để tránh bẫy.':pct>=55?'Đã có nền nhưng vẫn còn cặp dễ nhầm.':'Nên xem lại thẻ Kanji rồi thử lại.'}</p>
    <div class="n4-result-actions"><button class="primary-btn" onclick="${restart}">Làm bộ mới ↻</button>${s.wrong.length?`<button class="secondary-btn" onclick="reviewN4Wrong()">Luyện lại ${s.wrong.length} câu sai</button>`:''}</div></div>`;
};
