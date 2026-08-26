/* ==========================================================
   V17 — HỌC TỪ MỚI KANA-FIRST / KHÔNG KANJI
   ========================================================== */
const KANA_NEW_KEY='nihongoKanaNewV17';
let kanaNewState=null;

function kanaNewStore(){
  try{return JSON.parse(localStorage.getItem(KANA_NEW_KEY))||{}}catch{return {}}
}
function saveKanaNewStore(x){try{localStorage.setItem(KANA_NEW_KEY,JSON.stringify(x))}catch{}}
function kanaNewItemKey(lesson,index){return `L${lesson}|V${index}`}
function kanaNewStatus(lesson,index){
  const row=kanaNewStore()[kanaNewItemKey(lesson,index)];
  return row?.status||'new';
}
function markKanaNewStatus(lesson,index,status){
  const db=kanaNewStore(),key=kanaNewItemKey(lesson,index),old=db[key]||{};
  db[key]={...old,status,updatedAt:Date.now(),seen:(old.seen||0)+1};
  saveKanaNewStore(db);
}
function kanaOnlyText(v){
  return String(v.kana||v.jp||'').trim();
}
function kanaNewStats(l){
  const states=l.vocab.map((v,i)=>kanaNewStatus(l.id,i));
  return {
    total:states.length,
    fresh:states.filter(x=>x==='new').length,
    learning:states.filter(x=>x==='learning').length,
    mastered:states.filter(x=>x==='mastered').length
  };
}
function kanaNewPool(l,scope){
  let rows=l.vocab.map((v,i)=>({v,i,status:kanaNewStatus(l.id,i)}));
  if(scope==='new')rows=rows.filter(x=>x.status!=='mastered');
  const rank={new:0,learning:1,mastered:2};
  return rows.map(x=>({...x,_rank:rank[x.status]??1,_r:Math.random()}))
    .sort((a,b)=>a._rank-b._rank||a._r-b._r);
}
function kanaSpeak(text){
  try{
    if(!('speechSynthesis' in window))return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(String(text||''));
    u.lang='ja-JP';u.rate=.82;speechSynthesis.speak(u);
  }catch{}
}

/* Vocab page V17 */
renderVocab=function(box,l){
  box.innerHTML=`<div class="vocab-mode-head">
    <div>
      <span class="flash-kicker">BÀI ${l.id} • ${l.vocab.length} TỪ / BIỂU ĐẠT</span>
      <h2>Từ vựng ${l.title}</h2>
      <p>Học Kana trước nếu chưa muốn học Kanji; sau đó mới chuyển sang danh sách và quiz đầy đủ.</p>
    </div>
    <div class="vocab-mode-switch v17-vocab-switch">
      <button class="${vocabStudyMode==='kana-new'?'active kana':''}" onclick="setVocabStudyMode('kana-new')">🌱 Học từ mới • Kana</button>
      <button class="${vocabStudyMode==='list'?'active':''}" onclick="setVocabStudyMode('list')">📘 Danh sách</button>
      <button class="${vocabStudyMode==='quiz'?'active hard':''}" onclick="setVocabStudyMode('quiz')">🎯 Trắc nghiệm toàn bài</button>
    </div>
  </div>
  <div class="vocab-smart-note v17-note"><b>Kana-first:</b> trong chế độ “Học từ mới”, web không hiện Kanji. Từ có Kanji chỉ hiện cách đọc Kana; từ vay mượn vẫn giữ Katakana chuẩn như コーヒー・テレビ.</div>
  <div id="vocab-study-content"></div>`;
  const content=document.getElementById('vocab-study-content');
  if(vocabStudyMode==='kana-new')renderKanaNewSetup(content,l);
  else if(vocabStudyMode==='quiz')renderVocabQuizSetup(content,l);
  else renderVocabList(content,l);
};

const _v17ChangeTab=changeTab;
changeTab=function(tab){
  const result=_v17ChangeTab(tab);
  if(tab==='vocab'){
    vocabStudyMode='kana-new';
    renderLessonContent();
  }
  return result;
};

function renderKanaNewSetup(box,l){
  if(!box)return;
  const st=kanaNewStats(l);
  box.innerHTML=`<section class="kana-new-hero">
    <div><span class="kana-new-kicker">KANA FIRST • NO KANJI</span>
      <h3>Học từ mới Bài ${l.id}</h3>
      <p>Giai đoạn này chỉ học <b>cách đọc ↔ nghĩa</b>. Không bắt bạn nhớ mặt Kanji.</p></div>
    <div class="kana-new-stats">
      <span><b>${st.fresh}</b><small>chưa học</small></span>
      <span><b>${st.learning}</b><small>đang học</small></span>
      <span><b>${st.mastered}</b><small>đã chắc</small></span>
    </div></section>
    <div class="kana-new-plan">
      <div><b>1</b><span><strong>Nhìn</strong><small>Kana + nghĩa</small></span></div><i>→</i>
      <div><b>2</b><span><strong>Recall</strong><small>Kana → tự nhớ nghĩa</small></span></div><i>→</i>
      <div><b>3</b><span><strong>Kiểm tra</strong><small>Kana ↔ nghĩa</small></span></div>
    </div>
    <div class="kana-new-settings">
      <label><b>Số từ/lượt</b><select id="kana-new-size">
        <option value="5">5 từ</option><option value="8">8 từ</option><option value="10" selected>10 từ</option><option value="15">15 từ</option>
      </select></label>
      <label><b>Phạm vi</b><select id="kana-new-scope">
        <option value="new" selected>Ưu tiên từ chưa chắc</option><option value="all">Tất cả từ trong bài</option>
      </select></label>
      <label class="kana-audio-toggle"><input type="checkbox" id="kana-auto-audio"><span><b>Tự đọc tiếng Nhật</b><small>Dùng giọng TTS của trình duyệt nếu có</small></span></label>
      <button class="primary-btn" onclick="startKanaNewSession(${l.id})">Bắt đầu học →</button>
    </div>
    <div class="kana-no-kanji-rule"><b>Luật của mode này:</b> mặt học, đáp án và quiz đều không dùng Kanji. Katakana được giữ nguyên vì đó là cách viết chuẩn của từ vay mượn.</div>
    <div id="kana-new-area"></div>`;
}

function startKanaNewSession(lessonId){
  const l=LESSONS[lessonId-1];
  const size=+(document.getElementById('kana-new-size')?.value||10);
  const scope=document.getElementById('kana-new-scope')?.value||'new';
  let pool=kanaNewPool(l,scope);
  if(!pool.length)pool=kanaNewPool(l,'all');
  pool=pool.slice(0,Math.min(size,pool.length));
  kanaNewState={
    lessonId,items:pool,phase:'learn',index:0,score:0,wrong:[],
    autoAudio:!!document.getElementById('kana-auto-audio')?.checked,
    revealed:false,answered:false,questionStartedAt:Date.now()
  };
  pool.forEach(x=>{if(x.status==='new')markKanaNewStatus(lessonId,x.i,'learning')});
  renderKanaNewSession();
}
function kanaSessionHeader(title){
  const s=kanaNewState;
  return `<div class="kana-session-top"><div><span>KANA ONLY</span><b>${title}</b></div><strong>${Math.min(s.index+1,s.items.length)}/${s.items.length}</strong></div>
    <div class="progressbar kana-progress"><span style="width:${Math.round(s.index/s.items.length*100)}%"></span></div>`;
}
function renderKanaNewSession(){
  const s=kanaNewState,area=document.getElementById('kana-new-area');if(!s||!area)return;
  if(s.phase==='learn')return renderKanaLearn(area);
  if(s.phase==='recall')return renderKanaRecall(area);
  if(s.phase==='check')return renderKanaCheck(area);
  return renderKanaNewResult(area);
}

/* 1. Learn */
function renderKanaLearn(area){
  const s=kanaNewState,x=s.items[s.index];
  if(!x){s.phase='recall';s.index=0;s.revealed=false;renderKanaNewSession();return}
  const kana=kanaOnlyText(x.v);
  area.innerHTML=`<div class="kana-study-card learn">${kanaSessionHeader('1 • NHÌN / LÀM QUEN')}
    <div class="kana-big">${escapeHtml(kana)}</div>
    <div class="kana-meaning">${escapeHtml(x.v.vi)}</div>
    ${x.v.reading&&x.v.reading!==kana?`<div class="kana-romaji">${escapeHtml(x.v.reading)}</div>`:''}
    <div class="kana-learn-actions"><button class="secondary-btn" onclick="kanaSpeak('${escapeHtml(kana)}')">🔊 Nghe</button><button class="primary-btn" onclick="nextKanaLearn()">Đã xem →</button></div>
    <div class="kana-phase-hint">Đọc Kana thành tiếng, liên kết âm với nghĩa. Không cần nghĩ tới Kanji.</div></div>`;
  if(s.autoAudio)setTimeout(()=>kanaSpeak(kana),120);
}
function nextKanaLearn(){kanaNewState.index++;renderKanaNewSession()}

/* 2. Active recall */
function renderKanaRecall(area){
  const s=kanaNewState,x=s.items[s.index];
  if(!x){s.phase='check';s.index=0;s.revealed=false;s.answered=false;renderKanaNewSession();return}
  const kana=kanaOnlyText(x.v);
  s.questionStartedAt=Date.now();s.revealed=false;
  area.innerHTML=`<div class="kana-study-card recall">${kanaSessionHeader('2 • ACTIVE RECALL')}
    <div class="kana-recall-label">Nhìn cách đọc và tự nhớ nghĩa trước</div>
    <div class="kana-big">${escapeHtml(kana)}</div>
    <button class="kana-reveal-btn" onclick="revealKanaRecall()">Tôi đã nghĩ xong → Hiện nghĩa</button>
    <div id="kana-recall-answer"></div></div>`;
  if(s.autoAudio)setTimeout(()=>kanaSpeak(kana),100);
}
function revealKanaRecall(){
  const s=kanaNewState,x=s.items[s.index],box=document.getElementById('kana-recall-answer');
  if(!box||s.revealed)return;s.revealed=true;
  box.innerHTML=`<div class="kana-revealed"><b>${escapeHtml(x.v.vi)}</b><span>Bạn nhớ được đến mức nào?</span>
    <div><button class="memory-btn again" onclick="rateKanaRecall('again')">1 • Quên</button>
    <button class="memory-btn hard" onclick="rateKanaRecall('hard')">2 • Khó</button>
    <button class="memory-btn good" onclick="rateKanaRecall('good')">3 • Nhớ</button>
    <button class="memory-btn easy" onclick="rateKanaRecall('easy')">4 • Rất chắc</button></div></div>`;
}
function rateKanaRecall(rating){
  const s=kanaNewState,x=s.items[s.index],kana=kanaOnlyText(x.v);
  if(rating==='again'||rating==='hard')markKanaNewStatus(s.lessonId,x.i,'learning');
  if(rating==='easy')markKanaNewStatus(s.lessonId,x.i,'mastered');
  recordRecallEvent({
    itemKey:recallKey(['kana-new',s.lessonId,x.i,'recall']),domain:'vocab',skill:'kana-recall',
    lesson:s.lessonId,itemLabel:kana,target:kana,prompt:`${kana} → nghĩa?`,
    selected:rating,correctAnswer:x.v.vi,correct:rating==='good'||rating==='easy',
    responseMs:Date.now()-(s.questionStartedAt||Date.now()),rating,
    source:`V17 • Kana New Bài ${s.lessonId}`,qType:'active-recall-kana',
    extra:{vocabIndex:x.i,noKanji:true}
  });
  s.index++;renderKanaNewSession();
}

/* 3. Check */
function kanaDistractors(l,x,field){
  const rows=l.vocab.map((v,i)=>({v,i})).filter(p=>p.i!==x.i);
  rows.sort((a,b)=>{
    const sa=meaningSimilarity(x.v.vi,a.v.vi)+readingSimilarity(kanaOnlyText(x.v),kanaOnlyText(a.v));
    const sb=meaningSimilarity(x.v.vi,b.v.vi)+readingSimilarity(kanaOnlyText(x.v),kanaOnlyText(b.v));
    return sb-sa;
  });
  if(field==='meaning')return [...new Set(rows.map(p=>p.v.vi))].filter(v=>v!==x.v.vi).slice(0,3);
  const correct=kanaOnlyText(x.v);
  return [...new Set(rows.map(p=>kanaOnlyText(p.v)))].filter(v=>v!==correct).slice(0,3);
}
function kanaCheckQuestion(l,x,index){
  const forward=index%2===0;
  if(forward){
    const correct=x.v.vi,answers=shuffle([correct,...kanaDistractors(l,x,'meaning')]);
    return {direction:'kana→vi',prompt:kanaOnlyText(x.v),correct,answers};
  }
  const correct=kanaOnlyText(x.v),answers=shuffle([correct,...kanaDistractors(l,x,'kana')]);
  return {direction:'vi→kana',prompt:x.v.vi,correct,answers};
}
function renderKanaCheck(area){
  const s=kanaNewState,x=s.items[s.index];
  if(!x){s.phase='done';renderKanaNewSession();return}
  const l=LESSONS[s.lessonId-1],q=kanaCheckQuestion(l,x,s.index);
  s.currentQ=q;s.questionStartedAt=Date.now();s.answered=false;
  area.innerHTML=`<div class="kana-study-card check">${kanaSessionHeader('3 • KIỂM TRA')}
    <div class="kana-check-dir">${q.direction==='kana→vi'?'Kana → nghĩa Việt':'Nghĩa Việt → Kana'}</div>
    <div class="${q.direction==='kana→vi'?'kana-big':'kana-check-meaning'}">${escapeHtml(q.prompt)}</div>
    <div class="kana-check-answers">${q.answers.map((a,i)=>`<button data-answer="${escapeHtml(a)}" onclick="answerKanaCheck(this,${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHtml(a)}</b></button>`).join('')}</div>
    <div id="kana-check-feedback"></div></div>`;
}
function answerKanaCheck(btn,i){
  const s=kanaNewState;if(!s||s.answered)return;s.answered=true;
  const q=s.currentQ,x=s.items[s.index],selected=q.answers[i],ok=selected===q.correct;
  document.querySelectorAll('.kana-check-answers button').forEach(b=>{if(b.dataset.answer===q.correct)b.classList.add('correct')});
  if(ok)s.score++;else{btn.classList.add('wrong');s.wrong.push(x);markKanaNewStatus(s.lessonId,x.i,'learning')}
  recordRecallEvent({
    itemKey:recallKey(['kana-new',s.lessonId,x.i,q.direction]),domain:'vocab',
    skill:q.direction==='kana→vi'?'kana-meaning':'kana-form',lesson:s.lessonId,
    itemLabel:kanaOnlyText(x.v),target:kanaOnlyText(x.v),prompt:q.prompt,
    selected,correctAnswer:q.correct,correct:ok,responseMs:Date.now()-(s.questionStartedAt||Date.now()),
    source:`V17 • Kana Check Bài ${s.lessonId}`,answers:q.answers,qType:'kana-new-check',
    extra:{vocabIndex:x.i,noKanji:true}
  });
  document.getElementById('kana-check-feedback').innerHTML=`<div class="feedback ${ok?'':'hard-feedback'}"><b>${ok?'✓ Đúng':'✗ '+escapeHtml(selected)+' → '+escapeHtml(q.correct)}</b><span>${escapeHtml(kanaOnlyText(x.v))} = ${escapeHtml(x.v.vi)}</span></div>
    <div class="kana-next"><button class="primary-btn" onclick="nextKanaCheck()">Tiếp →</button></div>`;
}
function nextKanaCheck(){kanaNewState.index++;kanaNewState.answered=false;renderKanaNewSession()}

function renderKanaNewResult(area){
  const s=kanaNewState,l=LESSONS[s.lessonId-1],pct=s.items.length?Math.round(s.score/s.items.length*100):0;
  const wrongSet=new Set(s.wrong.map(x=>x.i));
  s.items.forEach(x=>{if(!wrongSet.has(x.i)&&pct>=80)markKanaNewStatus(s.lessonId,x.i,'mastered')});
  const st=kanaNewStats(l);
  area.innerHTML=`<div class="kana-result"><span>KANA SESSION COMPLETE</span><h2>${s.score}/${s.items.length}</h2>
    <p><b>${pct}%</b> ở bước kiểm tra. Bài ${l.id}: ${st.mastered}/${st.total} từ đang được đánh dấu chắc.</p>
    <div class="kana-result-actions">${s.wrong.length?`<button class="primary-btn" onclick="retryKanaWrong()">Ôn lại ${s.wrong.length} từ sai →</button>`:''}
      <button class="secondary-btn" onclick="setVocabStudyMode('kana-new')">Phiên mới</button>
      <button class="ghost-btn" onclick="openRecallLab()">Recall Lab</button></div>
    <div class="kana-no-kanji-confirm">✓ Phiên vừa rồi không dùng Kanji để hỏi hoặc trả lời.</div></div>`;
}
function retryKanaWrong(){
  const s=kanaNewState;if(!s?.wrong?.length)return;
  const seen=new Set(),items=[];
  s.wrong.forEach(x=>{if(!seen.has(x.i)){seen.add(x.i);items.push(x)}});
  kanaNewState={...s,items,phase:'learn',index:0,score:0,wrong:[],revealed:false,answered:false,questionStartedAt:Date.now()};
  renderKanaNewSession();
}

document.addEventListener('keydown',e=>{
  if(currentTab==='vocab'&&vocabStudyMode==='kana-new'&&kanaNewState&&e.key.toLowerCase()==='r'){
    const x=kanaNewState.items[kanaNewState.index];
    if(x)kanaSpeak(kanaOnlyText(x.v));
  }
});
