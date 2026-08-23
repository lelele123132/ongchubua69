/* =========================================================
   V15 — Grammar Practice
   Bài tập ngữ pháp đa dạng cho từng Bài 1–25.
   Sinh câu hỏi từ chính pattern / meaning / example / translation
   đang có trong data.js.
   ========================================================= */
let grammarStudyMode='theory';
let grammarPracticeState=null;

function gpShuffle(a){return shuffle([...a])}
function gpUnique(a){return [...new Set(a.filter(x=>x!==undefined&&x!==null&&String(x).trim()!==''))]}
function gpSentenceTokens(s){
  const clean=String(s||'').replace(/[。！？!?]$/,'').trim();
  let t=clean.split(/\s+/).filter(Boolean);
  if(t.length>=2)return t;
  t=clean.split(/(?<=[はがをにでへとのも])|(?=[はがをにでへとのも])/).filter(Boolean);
  return t.length>=2?t:[clean];
}
function gpFindParticle(example){
  const ps=['から','まで','より','へ','で','に','を','は','が','と','の','も'];
  for(const p of ps){
    const re=new RegExp(`${p}(?=[\\s、。！？!?]|$)`);
    const m=String(example||'').match(re);
    if(m)return {particle:p,index:m.index};
  }
  return null;
}
function gpReplaceAt(s,index,from,to){return s.slice(0,index)+to+s.slice(index+from.length)}
function gpParticleTraps(correct){return gpShuffle(['は','が','を','に','で','へ','と','の','も','から','まで'].filter(x=>x!==correct)).slice(0,3)}
function gpPatternParts(pattern){return String(pattern||'').split(/\s+/).filter(Boolean)}
function gpPatternCloze(l,g,gi){
  const parts=gpPatternParts(g.pattern);if(parts.length<2)return null;
  let hide=parts.length-1;
  for(let i=parts.length-1;i>=0;i--){
    if(/[ぁ-んァ-ヶ一-龯]/.test(parts[i])&&!/^N\d?$|^A$|^V$/.test(parts[i])){hide=i;break}
  }
  const correct=parts[hide],p=[...parts];p[hide]='＿＿';
  let traps=[];
  l.grammar.forEach((x,j)=>{if(j!==gi)gpPatternParts(x.pattern).forEach(v=>{if(v!==correct)traps.push(v)})});
  traps.push('です','ます','ません','ください','あります','なります','から','まで','に','で','を');
  let answers=gpShuffle(gpUnique([correct,...traps])).slice(0,4);
  if(!answers.includes(correct)){answers[answers.length-1]=correct;answers=gpShuffle(answers)}
  return {q:`Hoàn thành mẫu: ${p.join(' ')}`,correct,answers};
}
function gpWrongSourceSentences(g){
  const f=gpFindParticle(g.example);if(!f)return [];
  return gpParticleTraps(f.particle).map(p=>gpReplaceAt(g.example,f.index,f.particle,p));
}

function createGrammarPracticeQuestions(l,mode='all',indices=null){
  const selected=Array.isArray(indices)?indices:[...Array(l.grammar.length).keys()];
  let bank=[];
  selected.forEach(gi=>{
    const g=l.grammar[gi];
    const meanings=gpUnique(l.grammar.filter((_,i)=>i!==gi).map(x=>x.meaning));
    const patterns=gpUnique(l.grammar.filter((_,i)=>i!==gi).map(x=>x.pattern));
    const examples=gpUnique(l.grammar.filter((_,i)=>i!==gi).map(x=>x.example));
    const translations=gpUnique(l.grammar.filter((_,i)=>i!==gi).map(x=>x.translation));

    bank.push({grammarIndex:gi,kind:'mcq',skill:'grammar-meaning',type:'Mẫu → nghĩa',difficulty:'basic',
      q:`Mẫu 「${g.pattern}」 diễn đạt ý nào?`,correct:g.meaning,answers:gpShuffle(gpUnique([g.meaning,...meanings])).slice(0,4)});

    bank.push({grammarIndex:gi,kind:'mcq',skill:'grammar-pattern',type:'Nghĩa → mẫu',difficulty:'basic',
      q:`Mẫu nào dùng để diễn đạt: “${g.meaning}”`,correct:g.pattern,answers:gpShuffle(gpUnique([g.pattern,...patterns])).slice(0,4)});

    bank.push({grammarIndex:gi,kind:'mcq',skill:'grammar-example',type:'Nhận dạng câu',difficulty:'basic',
      q:`Câu 「${g.example}」 đang dùng mẫu nào?`,correct:g.pattern,answers:gpShuffle(gpUnique([g.pattern,...patterns])).slice(0,4)});

    bank.push({grammarIndex:gi,kind:'mcq',skill:'grammar-translation',type:'Nhật → Việt',difficulty:'basic',
      q:`Nghĩa đúng của 「${g.example}」 là?`,correct:g.translation,answers:gpShuffle(gpUnique([g.translation,...translations])).slice(0,4)});

    bank.push({grammarIndex:gi,kind:'mcq',skill:'grammar-recall',type:'Việt → Nhật',difficulty:'mixed',
      q:`Chọn câu Nhật đúng với: “${g.translation}”`,correct:g.example,answers:gpShuffle(gpUnique([g.example,...examples])).slice(0,4)});

    const pf=gpFindParticle(g.example);
    if(pf){
      const hidden=gpReplaceAt(g.example,pf.index,pf.particle,'＿＿');
      bank.push({grammarIndex:gi,kind:'mcq',skill:'grammar-particle',type:'Điền trợ từ',difficulty:'hard',
        q:`Điền trợ từ còn thiếu: ${hidden}`,correct:pf.particle,answers:gpShuffle([pf.particle,...gpParticleTraps(pf.particle)])});

      const wrong=gpWrongSourceSentences(g);
      if(wrong.length)bank.push({grammarIndex:gi,kind:'mcq',skill:'grammar-form',type:'Bẫy trợ từ',difficulty:'hard',
        q:`Câu nào đúng chính xác như ví dụ của Bài ${l.id}?`,correct:g.example,answers:gpShuffle([g.example,...wrong]).slice(0,4)});
    }

    const pc=gpPatternCloze(l,g,gi);
    if(pc)bank.push({grammarIndex:gi,kind:'mcq',skill:'grammar-form',type:'Hoàn thành cấu trúc',difficulty:'hard',
      q:pc.q,correct:pc.correct,answers:pc.answers});

    const tokens=gpSentenceTokens(g.example);
    if(tokens.length>=2&&tokens.length<=9)bank.push({grammarIndex:gi,kind:'order',skill:'grammar-order',type:'Sắp xếp câu',difficulty:'hard',
      q:`Sắp xếp thành câu đúng: “${g.translation}”`,correct:g.example,tokens});
  });

  if(mode==='basic')bank=bank.filter(q=>q.difficulty==='basic'||q.difficulty==='mixed');
  if(mode==='hard')bank=bank.filter(q=>q.difficulty==='hard');
  return gpShuffle(bank);
}

function gpQuestionCount(l,mode='all',indices=null){return createGrammarPracticeQuestions(l,mode,indices).length}

/* Override renderer cũ của app.js */
renderGrammar=function(box,l){
  box.innerHTML=`<div class="grammar-mode-head">
    <div><span class="flash-kicker">BÀI ${l.id} • ${l.grammar.length} MẪU NGỮ PHÁP</span><h2>Ngữ pháp ${l.title}</h2>
      <p>Lý thuyết + bài tập đa dạng + Recall Memory.</p></div>
    <div class="grammar-mode-switch"><button class="${grammarStudyMode==='theory'?'active':''}" onclick="setGrammarStudyMode('theory')">文 Lý thuyết</button>
      <button class="${grammarStudyMode==='practice'?'active hard':''}" onclick="setGrammarStudyMode('practice')">🎯 Bài tập ngữ pháp</button></div></div>
    <div class="grammar-practice-note"><b>9 dạng bài:</b> mẫu → nghĩa, nghĩa → mẫu, nhận dạng câu, dịch 2 chiều, điền trợ từ, bẫy trợ từ, hoàn thành cấu trúc và sắp xếp câu.</div>
    <div id="grammar-study-content"></div>`;
  const c=document.getElementById('grammar-study-content');
  grammarStudyMode==='practice'?renderGrammarPracticeSetup(c,l):renderGrammarTheoryV15(c,l);
};

function setGrammarStudyMode(mode){grammarStudyMode=mode;grammarPracticeState=null;renderLessonContent()}
function openGrammarPracticeForLesson(id){grammarStudyMode='practice';currentLesson=id;currentTab='grammar';openLesson(id,'grammar')}

function renderGrammarTheoryV15(box,l){
  box.innerHTML=`<div class="section-title"><div><h3>Lý thuyết ${l.title}</h3><p>${l.grammar.length} mẫu trọng tâm.</p></div>${completeButton('grammar')}</div>
    <div class="grammar-theory-grid">${l.grammar.map((g,gi)=>`<article class="grammar-card grammar-source-card">
      <div class="grammar-card-no">${gi+1}</div><h3>${escapeHtml(g.pattern)}</h3><p>${escapeHtml(g.meaning)}</p>
      <div class="example"><b>Ví dụ:</b> ${escapeHtml(g.example)}<br><small>${escapeHtml(g.translation)}</small></div>
      <button class="grammar-one-pattern-btn" onclick="startGrammarPractice(${l.id},'all','full',[${gi}])">Luyện riêng mẫu này →</button></article>`).join('')}</div>
    <div class="grammar-theory-cta"><button class="primary-btn" onclick="setGrammarStudyMode('practice')">Làm bài tập Bài ${l.id} →</button></div>`;
}

function renderGrammarPracticeSetup(box,l){
  const total=gpQuestionCount(l,'all'),basic=gpQuestionCount(l,'basic'),hard=gpQuestionCount(l,'hard');
  box.innerHTML=`<div class="grammar-practice-hero">
    <div class="grammar-practice-count"><b>${total}</b><span>câu có thể tạo</span></div>
    <div><h3>Bài tập ngữ pháp Bài ${l.id}</h3><p>Cùng một mẫu được hỏi theo nhiều hướng để tránh kiểu “nhìn đáp án thì biết nhưng tự recall lại không nhớ”.</p>
      <div class="grammar-practice-tags"><span>${l.grammar.length} mẫu</span><span>${basic} cơ bản</span><span>${hard} nâng cao</span><span>Recall ON</span></div></div></div>
    <div class="grammar-practice-settings">
      <label><b>Loại bài</b><select id="grammar-practice-mode"><option value="all" selected>Trộn tất cả dạng</option><option value="basic">Cơ bản: nghĩa / mẫu / dịch</option><option value="hard">Nâng cao: trợ từ / cấu trúc / sắp xếp</option></select></label>
      <label><b>Số câu</b><select id="grammar-practice-count"><option value="12">12 câu nhanh</option><option value="24">24 câu</option><option value="full" selected>Toàn bộ (${total} câu)</option></select></label>
      <button class="primary-btn" onclick="startGrammarPractice(${l.id})">Bắt đầu luyện →</button></div>
    <div class="grammar-type-preview"><span>① Mẫu → nghĩa</span><span>② Nghĩa → mẫu</span><span>③ Nhận dạng</span><span>④ Nhật → Việt</span><span>⑤ Việt → Nhật</span><span>⑥ Điền trợ từ</span><span>⑦ Bẫy trợ từ</span><span>⑧ Điền cấu trúc</span><span>⑨ Sắp xếp câu</span></div>
    <div id="grammar-practice-area"></div>`;
}

function startGrammarPractice(lessonId,forcedMode=null,forcedCount=null,onlyIndices=null){
  const l=LESSONS[lessonId-1],mode=forcedMode||document.getElementById('grammar-practice-mode')?.value||'all';
  const countVal=forcedCount||document.getElementById('grammar-practice-count')?.value||'full';
  let qs=createGrammarPracticeQuestions(l,mode,onlyIndices);
  if(countVal!=='full')qs=qs.slice(0,Math.min(+countVal,qs.length));
  grammarPracticeState={lessonId,mode,countVal,onlyIndices:Array.isArray(onlyIndices)?[...onlyIndices]:null,questions:qs,index:0,score:0,answered:false,wrong:[],questionStartedAt:Date.now(),orderSelected:[]};
  if(!document.getElementById('grammar-practice-area')){grammarStudyMode='practice';renderLessonContent()}
  renderGrammarPracticeQuestion();
}
function gpArea(){return document.getElementById('grammar-practice-area')||document.getElementById('grammar-study-content')}
function gpHeader(q,l,pct,s){
  let hist=null;try{hist=getRecallModel()[recallKey(['grammar',l.id,q.grammarIndex,q.skill])]||null}catch{}
  return `<div class="grammar-qtop"><div><span class="grammar-q-badge">BÀI ${l.id}</span><b>${escapeHtml(q.type)}</b></div><span>${s.index+1}/${s.questions.length}</span></div>
    <div class="progressbar grammar-q-progress"><span style="width:${pct}%"></span></div>
    <div class="grammar-memory-flags">${hist?.wrong?`<span class="danger">↻ Đã sai ${hist.wrong} lần</span>`:''}${hist?.lapses?`<span class="danger">Lapse ${hist.lapses}</span>`:''}<span>Mẫu ${q.grammarIndex+1}/${l.grammar.length}</span><span>${q.difficulty==='hard'?'Nâng cao':'Cơ bản'}</span></div>`;
}
function renderGrammarPracticeQuestion(){
  const s=grammarPracticeState,area=gpArea();if(!s||!area)return;
  if(s.index>=s.questions.length){renderGrammarPracticeResult();return}
  const q=s.questions[s.index],l=LESSONS[s.lessonId-1],pct=Math.round(s.index/s.questions.length*100);
  s.questionStartedAt=Date.now();s.orderSelected=[];
  if(q.kind==='order'){
    q._tiles=gpShuffle(q.tokens.map((t,i)=>({id:`${i}:${t}`,text:t})));
    area.innerHTML=`<div class="grammar-quiz-card">${gpHeader(q,l,pct,s)}<div class="grammar-question">${escapeHtml(q.q)}</div>
      <div id="grammar-order-slots" class="grammar-order-slots">${q.tokens.map(()=>'<span>＿</span>').join('')}</div>
      <div id="grammar-order-tiles" class="grammar-order-tiles">${q._tiles.map(t=>`<button data-id="${escapeHtml(t.id)}" onclick="chooseGrammarOrderTile('${escapeHtml(t.id)}')">${escapeHtml(t.text)}</button>`).join('')}</div>
      <div class="grammar-order-actions"><button class="secondary-btn" onclick="undoGrammarOrder()">← Bỏ từ cuối</button><button class="secondary-btn" onclick="resetGrammarOrder()">Xóa hết</button><button class="primary-btn" onclick="checkGrammarOrder()">Kiểm tra</button></div>
      <div id="grammar-practice-feedback"></div></div>`;return;
  }
  area.innerHTML=`<div class="grammar-quiz-card">${gpHeader(q,l,pct,s)}<div class="grammar-question">${escapeHtml(q.q)}</div>
    <div class="grammar-answers">${q.answers.map((a,i)=>`<button class="grammar-answer" data-answer="${escapeHtml(a)}" onclick="answerGrammarPractice(this,${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHtml(a)}</b></button>`).join('')}</div>
    <div id="grammar-practice-feedback"></div></div>`;
}
function gpRecord(q,selected,ok){
  const s=grammarPracticeState,l=LESSONS[s.lessonId-1],g=l.grammar[q.grammarIndex];
  recordRecallEvent({itemKey:recallKey(['grammar',l.id,q.grammarIndex,q.skill]),domain:'grammar',skill:q.skill,lesson:l.id,itemLabel:g.pattern,target:g.pattern,prompt:q.q,selected,correctAnswer:q.correct,correct:ok,responseMs:Date.now()-(s.questionStartedAt||Date.now()),source:`V15 • Grammar Practice Bài ${l.id}`,answers:q.answers||q.tokens,explanation:`${g.pattern} • ${g.meaning} • ${g.example} = ${g.translation}`,qType:'grammar-practice',extra:{grammarIndex:q.grammarIndex,type:q.type,difficulty:q.difficulty}});
}
function gpFeedback(q,g,selected,ok){
  return `<div class="feedback grammar-feedback"><b>${ok?'✓ Chính xác':'✗ '+escapeHtml(selected)+' → '+escapeHtml(q.correct)}</b>
    <div class="grammar-feedback-pattern"><strong>${escapeHtml(g.pattern)}</strong><span>${escapeHtml(g.meaning)}</span></div>
    <div class="grammar-feedback-example">${escapeHtml(g.example)}<small>${escapeHtml(g.translation)}</small></div>
    <em>${ok?'Recall đúng đã được ghi lại.':'Lỗi này đã được đưa vào Recall Memory để ưu tiên gặp lại.'}</em></div>
    <div class="grammar-next"><button class="primary-btn" onclick="nextGrammarPractice()">Câu tiếp theo →</button></div>`;
}
function answerGrammarPractice(btn,i){
  const s=grammarPracticeState;if(!s||s.answered)return;s.answered=true;
  const q=s.questions[s.index],l=LESSONS[s.lessonId-1],g=l.grammar[q.grammarIndex],selected=q.answers[i],ok=selected===q.correct;
  document.querySelectorAll('.grammar-answer').forEach(x=>{if(x.dataset.answer===q.correct)x.classList.add('correct')});
  if(ok)s.score++;else{btn.classList.add('wrong');s.wrong.push(q)}
  gpRecord(q,selected,ok);document.getElementById('grammar-practice-feedback').innerHTML=gpFeedback(q,g,selected,ok);
}
function chooseGrammarOrderTile(id){
  const s=grammarPracticeState;if(!s||s.answered)return;const q=s.questions[s.index],tile=q._tiles.find(x=>x.id===id);
  if(!tile||s.orderSelected.some(x=>x.id===id)||s.orderSelected.length>=q.tokens.length)return;s.orderSelected.push(tile);refreshGrammarOrderUi();
}
function refreshGrammarOrderUi(){
  const s=grammarPracticeState,q=s.questions[s.index],slots=document.getElementById('grammar-order-slots');
  if(slots)slots.innerHTML=q.tokens.map((_,i)=>`<span class="${s.orderSelected[i]?'filled':''}">${escapeHtml(s.orderSelected[i]?.text||'＿')}</span>`).join('');
  document.querySelectorAll('#grammar-order-tiles button').forEach(b=>b.disabled=s.orderSelected.some(x=>x.id===b.dataset.id));
}
function undoGrammarOrder(){if(grammarPracticeState&&!grammarPracticeState.answered){grammarPracticeState.orderSelected.pop();refreshGrammarOrderUi()}}
function resetGrammarOrder(){if(grammarPracticeState&&!grammarPracticeState.answered){grammarPracticeState.orderSelected=[];refreshGrammarOrderUi()}}
function checkGrammarOrder(){
  const s=grammarPracticeState;if(!s||s.answered)return;const q=s.questions[s.index],l=LESSONS[s.lessonId-1],g=l.grammar[q.grammarIndex];
  if(s.orderSelected.length!==q.tokens.length){document.getElementById('grammar-practice-feedback').innerHTML='<div class="feedback">Hãy xếp đủ các mảnh trước khi kiểm tra.</div>';return}
  s.answered=true;const chosen=s.orderSelected.map(x=>x.text).join(' '),correct=q.tokens.join(' '),ok=chosen===correct;
  if(ok)s.score++;else s.wrong.push(q);gpRecord(q,chosen,ok);document.getElementById('grammar-practice-feedback').innerHTML=gpFeedback(q,g,chosen,ok);
}
function nextGrammarPractice(){grammarPracticeState.index++;grammarPracticeState.answered=false;renderGrammarPracticeQuestion()}
function renderGrammarPracticeResult(){
  const s=grammarPracticeState,area=gpArea(),l=LESSONS[s.lessonId-1],pct=Math.round(s.score/s.questions.length*100);
  markDone(l.id,'grammar');
  const per=l.grammar.map((g,gi)=>{const qs=s.questions.filter(q=>q.grammarIndex===gi),w=s.wrong.filter(q=>q.grammarIndex===gi);return {g,gi,total:qs.length,wrong:w.length,correct:qs.length-w.length}}).filter(x=>x.total);
  area.innerHTML=`<div class="grammar-result"><span class="grammar-result-kicker">GRAMMAR PRACTICE COMPLETE</span><h2>${s.score}/${s.questions.length}</h2>
    <p><b>${pct}% chính xác.</b> ${pct>=90?'Khá chắc. Hãy để Recall Lab gọi lại sau để kiểm tra trí nhớ dài hạn.':pct>=70?'Khá ổn; nên luyện lại các câu sai.':'Nên xem lại ví dụ và luyện riêng từng mẫu còn yếu.'}</p>
    <div class="grammar-pattern-results">${per.map(x=>`<div class="${x.wrong?'has-wrong':''}"><b>Mẫu ${x.gi+1}</b><strong>${x.correct}/${x.total}</strong><span>${escapeHtml(x.g.pattern)}</span><small>${x.wrong} sai</small></div>`).join('')}</div>
    <div class="grammar-result-actions">${s.wrong.length?`<button class="primary-btn" onclick="retryWrongGrammarPractice()">Luyện lại ${s.wrong.length} câu sai →</button>`:''}<button class="secondary-btn" onclick="restartGrammarPractice()">Bộ mới ↻</button><button class="secondary-btn" onclick="setGrammarStudyMode('theory')">Xem lý thuyết</button><button class="ghost-btn" onclick="openRecallLab()">Recall Lab</button></div></div>`;
}
function retryWrongGrammarPractice(){const s=grammarPracticeState;grammarPracticeState={...s,questions:gpShuffle([...s.wrong]),index:0,score:0,answered:false,wrong:[],questionStartedAt:Date.now(),orderSelected:[]};renderGrammarPracticeQuestion()}
function restartGrammarPractice(){
  const s=grammarPracticeState,l=LESSONS[s.lessonId-1];let qs=createGrammarPracticeQuestions(l,s.mode,s.onlyIndices);
  if(s.countVal!=='full')qs=qs.slice(0,Math.min(+s.countVal,qs.length));
  grammarPracticeState={...s,questions:qs,index:0,score:0,answered:false,wrong:[],questionStartedAt:Date.now(),orderSelected:[]};renderGrammarPracticeQuestion();
}

/* Reset về lý thuyết khi người dùng bấm tab Ngữ pháp bình thường. */
const _v15ChangeTab=changeTab;
changeTab=function(tab){
  if(tab==='grammar')grammarStudyMode='theory';
  return _v15ChangeTab(tab);
};

/* Nâng phần Luyện tập tổng hợp -> Ngữ pháp thành launcher bài tập. */
const _v15StartMixedPractice=startMixedPractice;
startMixedPractice=function(mode){
  if(mode!=='grammar')return _v15StartMixedPractice(mode);
  const ids=ensureSelection();if(!ids)return;
  practiceActiveMode=mode;
  const r=document.getElementById('practice-result');
  const items=ids.flatMap(id=>LESSONS[id-1].grammar.map(g=>({...g,lesson:id})));
  r.innerHTML=`<hr class="divider"><div class="practice-grammar-launch"><div><h2>Bài tập ngữ pháp</h2><p>Chọn bài để luyện riêng; mỗi bài có nhiều dạng câu.</p></div>
    <div class="practice-grammar-buttons">${ids.map(id=>`<button onclick="openGrammarPracticeForLesson(${id})">🎯 Bài ${id}</button>`).join('')}</div></div>
    ${items.map(g=>`<article class="grammar-card"><small>Bài ${g.lesson}</small><h3>${escapeHtml(g.pattern)}</h3><p>${escapeHtml(g.meaning)}</p><div class="example">${escapeHtml(g.example)}<br><small>${escapeHtml(g.translation)}</small></div></article>`).join('')}`;
};

/* Nhãn riêng trong Recall Lab. */
const _v15RecallSkillLabel=recallSkillLabel;
recallSkillLabel=function(skill){
  const labels={
    'grammar-meaning':'Ngữ pháp: mẫu → nghĩa',
    'grammar-pattern':'Ngữ pháp: nghĩa → mẫu',
    'grammar-example':'Ngữ pháp: nhận dạng câu',
    'grammar-translation':'Ngữ pháp: Nhật → Việt',
    'grammar-recall':'Ngữ pháp: Việt → Nhật',
    'grammar-particle':'Ngữ pháp: trợ từ',
    'grammar-form':'Ngữ pháp: cấu trúc / bẫy',
    'grammar-order':'Ngữ pháp: sắp xếp câu'
  };
  return labels[skill]||_v15RecallSkillLabel(skill);
};
