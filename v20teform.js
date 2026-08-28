/* ==========================================================
   V20 — て-FORM PRACTICE từ Bài 14
   ========================================================== */
let teFormState=null;

const TEFORM_GROUP2_KANA = new Set([
  'つけます','あけます','しめます','とめます','みせます','おしえます','でます',
  'おります','のりかえます','あびます','いれます','はじめます',
  'おぼえます','わすれます','でかけます','できます','あつめます','すてます','かえます',
  'しらべます','まけます','やめます','きをつけます','きます','かけます','うまれます',
  'くれます','かんがえます','たります'
]);

const TEFORM_GROUP3_JP = new Set([
  'コピーします','研究します','見学します','電話します','心配します','残業します','出張します',
  '運転します','予約します','掃除します','洗濯します','修理します','留学します','します',
  '紹介します','案内します','説明します'
]);

function tfClean(s){
  return String(s||'').replace(/[［\[\(（].*$/,'').replace(/[。！？!?]$/,'').trim();
}
function tfIsVerb(v){
  const kana=tfClean(v.kana),jp=tfClean(v.jp);
  if(!kana.endsWith('ます'))return false;
  if(/お願いします|ございます|おめでとう/.test(jp))return false;
  return true;
}
function tfGroup(jp,kana){
  jp=tfClean(jp);kana=tfClean(kana);
  if(jp.includes('来ます'))return 3;
  if(TEFORM_GROUP3_JP.has(jp))return 3;
  if(TEFORM_GROUP2_KANA.has(kana))return 2;
  return 1;
}
function tfConjugate(jp,kana){
  jp=tfClean(jp);kana=tfClean(kana);
  const group=tfGroup(jp,kana);

  if(jp.includes('来ます')){
    return {te:kana.replace(/きます$/,'きて'),group:3,rule:'来ます → 来て'};
  }
  if(group===3){
    return {te:kana.replace(/します$/,'して'),group:3,rule:'します → して'};
  }
  if(group===2){
    return {te:kana.replace(/ます$/,'て'),group:2,rule:'Nhóm II: bỏ ます + て'};
  }
  if(jp.includes('行きます') && /いきます$/.test(kana)){
    return {te:kana.replace(/いきます$/,'いって'),group:1,rule:'Ngoại lệ: 行きます → 行って'};
  }

  const stem=kana.replace(/ます$/,'');
  const last=stem.slice(-1);
  const base=stem.slice(0,-1);

  if(['い','ち','り'].includes(last)){
    return {te:base+'って',group:1,rule:'Nhóm I: い・ち・り + ます → って'};
  }
  if(['み','び','に'].includes(last)){
    return {te:base+'んで',group:1,rule:'Nhóm I: み・び・に + ます → んで'};
  }
  if(last==='き'){
    return {te:base+'いて',group:1,rule:'Nhóm I: き + ます → いて'};
  }
  if(last==='ぎ'){
    return {te:base+'いで',group:1,rule:'Nhóm I: ぎ + ます → いで'};
  }
  if(last==='し'){
    return {te:base+'して',group:1,rule:'Nhóm I: し + ます → して'};
  }
  return {te:stem+'て',group:1,rule:'Nhóm I'};
}

function tfVerbsForLessons(ids){
  const out=[];
  ids.forEach(id=>{
    const l=LESSONS[id-1];
    l.vocab.forEach((v,i)=>{
      if(!tfIsVerb(v))return;
      const jp=tfClean(v.jp),kana=tfClean(v.kana);
      const c=tfConjugate(jp,kana);
      out.push({lesson:id,vocabIndex:i,jp,kana,vi:v.vi,te:c.te,group:c.group,rule:c.rule});
    });
  });
  return out;
}

function tfScopeLessons(current,scope){
  if(scope==='current')return [current];
  if(scope==='all')return [...Array(12)].map((_,i)=>i+14);
  return [...Array(Math.max(1,current-13))].map((_,i)=>i+14);
}

function tfRuleOptions(){
  return [
    'Nhóm I: い・ち・り + ます → って',
    'Nhóm I: み・び・に + ます → んで',
    'Nhóm I: き + ます → いて',
    'Nhóm I: ぎ + ます → いで',
    'Nhóm I: し + ます → して',
    'Nhóm II: bỏ ます + て',
    'します → して',
    '来ます → 来て',
    'Ngoại lệ: 行きます → 行って'
  ];
}

function tfNormalize(s){
  return String(s||'').trim().replace(/\s+/g,'').replace(/[。！？!?]/g,'').replace(/～/g,'');
}

function tfTraps(v,pool){
  const forms=[
    v.kana.replace(/ます$/,'って'),
    v.kana.replace(/ます$/,'んで'),
    v.kana.replace(/ます$/,'いて'),
    v.kana.replace(/ます$/,'いで'),
    v.kana.replace(/ます$/,'して'),
    v.kana.replace(/ます$/,'て')
  ];
  pool.forEach(x=>forms.push(x.te));
  return [...new Set(forms.filter(x=>x&&x!==v.te))].slice(0,6);
}

function tfCreateQuestions(pool,mode='mixed'){
  const types=mode==='mixed'?['type','mcq','reverse','rule']:[mode];
  let out=[];

  pool.forEach(v=>{
    types.forEach(type=>{
      if(type==='type'){
        out.push({...v,type,skill:'te-form-produce',label:'Gõ て-form',
          prompt:`${v.kana} → て-form`,correct:v.te});
      }else if(type==='mcq'){
        const answers=shuffle([v.te,...tfTraps(v,pool).slice(0,3)]);
        out.push({...v,type,skill:'te-form-choice',label:'Chọn て-form',
          prompt:`「${v.kana}」の て-form は？`,correct:v.te,answers});
      }else if(type==='reverse'){
        const distract=[...new Set(pool.filter(x=>x.kana!==v.kana).map(x=>x.kana))];
        const answers=shuffle([v.kana,...shuffle(distract).slice(0,3)]);
        out.push({...v,type,skill:'te-form-reverse',label:'て → ます',
          prompt:`「${v.te}」の ます-form は？`,correct:v.kana,answers});
      }else{
        const answers=shuffle([v.rule,...shuffle(tfRuleOptions().filter(x=>x!==v.rule)).slice(0,3)]);
        out.push({...v,type:'rule',skill:'te-form-rule',label:'Chọn quy tắc',
          prompt:`${v.kana} → ${v.te} dùng quy tắc nào?`,correct:v.rule,answers});
      }
    });
  });

  return shuffle(out);
}

/* Override Grammar renderer to expose て-form from lesson 14 onward. */
renderGrammar=function(box,l){
  const hasTe=l.id>=14;
  box.innerHTML=`<div class="grammar-mode-head">
    <div><span class="flash-kicker">BÀI ${l.id} • ${l.grammar.length} MẪU NGỮ PHÁP</span>
      <h2>Ngữ pháp ${l.title}</h2>
      <p>${hasTe?'Từ Bài 14 có thêm bài tập chia động từ sang thể て.':'Lý thuyết + bài tập đa dạng + Recall Memory.'}</p></div>
    <div class="grammar-mode-switch">
      <button class="${grammarStudyMode==='theory'?'active':''}" onclick="setGrammarStudyMode('theory')">文 Lý thuyết</button>
      <button class="${grammarStudyMode==='practice'?'active hard':''}" onclick="setGrammarStudyMode('practice')">🎯 Bài tập ngữ pháp</button>
      ${hasTe?`<button class="${grammarStudyMode==='teform'?'active te':''}" onclick="setGrammarStudyMode('teform')">て Chia thể て</button>`:''}
    </div></div>
    <div class="grammar-practice-note">${hasTe?'<b>て-form:</b> luyện động từ thật trong từ vựng Bài 14 trở đi; có gõ đáp án, trắc nghiệm, đảo ngược và chọn quy tắc.':'<b>Grammar Practice:</b> luyện nhiều hướng để tăng recall.'}</div>
    <div id="grammar-study-content"></div>`;

  const c=document.getElementById('grammar-study-content');
  if(grammarStudyMode==='teform'&&hasTe)renderTeFormSetup(c,l);
  else if(grammarStudyMode==='practice')renderGrammarPracticeSetup(c,l);
  else renderGrammarTheoryV15(c,l);
};

function renderTeFormSetup(box,l){
  const current=tfVerbsForLessons([l.id]).length;
  const cumulative=tfVerbsForLessons(tfScopeLessons(l.id,'cumulative')).length;
  const all=tfVerbsForLessons(tfScopeLessons(l.id,'all')).length;

  box.innerHTML=`<section class="tf-hero">
    <div><span class="tf-kicker">て-FORM • BÀI 14+</span><h3>Luyện chia động từ sang thể て</h3>
      <p>Mặc định hiển thị <b>Hiragana/Katakana</b> để tập chia thể. Kanji chỉ hiện sau khi trả lời.</p></div>
    <div class="tf-rule-mini"><b>Nhóm I</b><span>って / んで / いて / いで / して</span><b>Nhóm II</b><span>ます → て</span><b>Nhóm III</b><span>します→して • 来ます→来て</span></div>
  </section>

  <div class="tf-special-note"><b>Ngoại lệ quan trọng:</b> 行きます → <strong>いって</strong>. Web phân biệt 降ります（おります）→ <strong>おりて</strong> và 降ります（ふります）→ <strong>ふって</strong>.</div>

  <div class="tf-settings">
    <label><b>Phạm vi</b><select id="tf-scope" onchange="updateTeFormCount(${l.id})">
      <option value="current">Chỉ Bài ${l.id} (${current} động từ)</option>
      <option value="cumulative" selected>Bài 14 → ${l.id} (${cumulative} động từ)</option>
      <option value="all">Toàn bộ Bài 14–25 (${all} động từ)</option>
    </select></label>
    <label><b>Dạng bài</b><select id="tf-mode" onchange="updateTeFormCount(${l.id})">
      <option value="mixed" selected>Trộn 4 dạng</option>
      <option value="type">Gõ て-form</option>
      <option value="mcq">Chọn て-form</option>
      <option value="reverse">て-form → ます-form</option>
      <option value="rule">Chọn quy tắc</option>
    </select></label>
    <label><b>Số câu</b><select id="tf-count">
      <option value="10">10 câu</option>
      <option value="20" selected>20 câu</option>
      <option value="40">40 câu</option>
      <option value="all">Toàn bộ ngân hàng</option>
    </select></label>
    <button class="primary-btn" onclick="startTeFormPractice(${l.id})">Bắt đầu →</button>
  </div>

  <div id="tf-count-info" class="tf-count-info"></div>

  <div class="tf-rule-grid">
    <div><b>い・ち・り</b><span>→ って</span><small>かいます→かって • まちます→まって • とります→とって</small></div>
    <div><b>み・び・に</b><span>→ んで</span><small>のみます→のんで • よびます→よんで</small></div>
    <div><b>き / ぎ</b><span>→ いて / いで</span><small>おきます→おいて • いそぎます→いそいで</small></div>
    <div><b>し</b><span>→ して</span><small>はなします→はなして</small></div>
    <div><b>Nhóm II</b><span>ます → て</span><small>あけます→あけて • みせます→みせて</small></div>
    <div><b>Nhóm III</b><span>する→して • くる→きて</span><small>べんきょうします→べんきょうして</small></div>
  </div>

  <div id="teform-area"></div>`;

  updateTeFormCount(l.id);
}

function updateTeFormCount(lessonId){
  const box=document.getElementById('tf-count-info');if(!box)return;
  const scope=document.getElementById('tf-scope')?.value||'cumulative';
  const mode=document.getElementById('tf-mode')?.value||'mixed';
  const verbs=tfVerbsForLessons(tfScopeLessons(lessonId,scope));
  const mult=mode==='mixed'?4:1;
  box.innerHTML=`<b>${verbs.length}</b> động từ • khoảng <b>${verbs.length*mult}</b> câu trong ngân hàng hiện tại.`;
}

function startTeFormPractice(lessonId){
  const scope=document.getElementById('tf-scope')?.value||'cumulative';
  const mode=document.getElementById('tf-mode')?.value||'mixed';
  const count=document.getElementById('tf-count')?.value||'20';
  const lessonIds=tfScopeLessons(lessonId,scope);
  const pool=tfVerbsForLessons(lessonIds);
  let questions=tfCreateQuestions(pool,mode);
  if(count!=='all')questions=questions.slice(0,Math.min(+count,questions.length));

  teFormState={
    lessonId,scope,mode,pool,questions,index:0,score:0,answered:false,wrong:[],
    requestedCount:count,questionStartedAt:Date.now()
  };
  renderTeFormQuestion();
}

function tfArea(){return document.getElementById('teform-area')}

function renderTeFormQuestion(){
  const s=teFormState,area=tfArea();if(!s||!area)return;
  if(s.index>=s.questions.length)return renderTeFormResult();

  const q=s.questions[s.index],pct=Math.round(s.index/s.questions.length*100);
  s.answered=false;s.questionStartedAt=Date.now();

  const header=`<div class="tf-qtop"><div><span>て-FORM</span><b>Bài ${q.lesson} • ${escapeHtml(q.label)}</b></div><strong>${s.index+1}/${s.questions.length}</strong></div>
    <div class="progressbar tf-progress"><span style="width:${pct}%"></span></div>
    <div class="tf-meaning-hint">${escapeHtml(q.vi)}</div>
    <div class="tf-question">${escapeHtml(q.prompt)}</div>`;

  if(q.type==='type'){
    area.innerHTML=`<div class="tf-question-card">${header}
      <div class="tf-input-wrap">
        <input id="tf-answer-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ví dụ: まって" onkeydown="if(event.key==='Enter')checkTeFormTyped()">
        <button class="primary-btn" onclick="checkTeFormTyped()">Kiểm tra</button>
      </div>
      <div class="tf-input-help">Gõ bằng Kana; không cần nhập Kanji.</div>
      <div id="tf-feedback"></div></div>`;
    setTimeout(()=>document.getElementById('tf-answer-input')?.focus(),50);
  }else{
    area.innerHTML=`<div class="tf-question-card">${header}
      <div class="tf-answers">${q.answers.map((a,i)=>`<button data-answer="${escapeHtml(a)}" onclick="answerTeFormChoice(this,${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHtml(a)}</b></button>`).join('')}</div>
      <div id="tf-feedback"></div></div>`;
  }
}

function tfRecord(q,selected,ok){
  recordRecallEvent({
    itemKey:recallKey(['teform',q.lesson,q.vocabIndex,q.skill]),
    domain:'grammar',skill:q.skill,lesson:q.lesson,itemLabel:q.kana,target:q.te,prompt:q.prompt,
    selected,correctAnswer:q.correct,correct:ok,
    responseMs:Date.now()-(teFormState.questionStartedAt||Date.now()),
    source:`V20 • て-form Bài ${q.lesson}`,answers:q.answers||[],
    explanation:`${q.kana} → ${q.te} • ${q.rule}`,
    qType:'te-form-practice',
    extra:{vocabIndex:q.vocabIndex,group:q.group,rule:q.rule}
  });
}

function tfFeedback(q,selected,ok){
  return `<div class="feedback tf-feedback">
    <b>${ok?'✓ Chính xác':'✗ '+escapeHtml(selected||'—')+' → '+escapeHtml(q.correct)}</b>
    <div class="tf-answer-line"><strong>${escapeHtml(q.kana)}</strong><span>→</span><strong>${escapeHtml(q.te)}</strong></div>
    <p>${escapeHtml(q.jp)} • ${escapeHtml(q.vi)}</p>
    <small>Nhóm ${q.group} • ${escapeHtml(q.rule)}</small>
  </div>
  <div class="tf-next"><button class="primary-btn" onclick="nextTeFormQuestion()">Câu tiếp theo →</button></div>`;
}

function checkTeFormTyped(){
  const s=teFormState;if(!s||s.answered)return;
  const q=s.questions[s.index],input=document.getElementById('tf-answer-input');
  const selected=input?.value||'',ok=tfNormalize(selected)===tfNormalize(q.correct);
  s.answered=true;
  if(ok)s.score++;else s.wrong.push(q);
  if(input){input.disabled=true;input.classList.add(ok?'correct':'wrong')}
  tfRecord(q,selected,ok);
  document.getElementById('tf-feedback').innerHTML=tfFeedback(q,selected,ok);
}

function answerTeFormChoice(btn,i){
  const s=teFormState;if(!s||s.answered)return;
  const q=s.questions[s.index],selected=q.answers[i],ok=selected===q.correct;
  s.answered=true;
  document.querySelectorAll('.tf-answers button').forEach(b=>{if(b.dataset.answer===q.correct)b.classList.add('correct')});
  if(ok)s.score++;else{btn.classList.add('wrong');s.wrong.push(q)}
  tfRecord(q,selected,ok);
  document.getElementById('tf-feedback').innerHTML=tfFeedback(q,selected,ok);
}

function nextTeFormQuestion(){
  teFormState.index++;
  renderTeFormQuestion();
}

function renderTeFormResult(){
  const s=teFormState,area=tfArea();
  const pct=s.questions.length?Math.round(s.score/s.questions.length*100):0;
  const groups=[1,2,3].map(g=>{
    const qs=s.questions.filter(q=>q.group===g);
    const wr=s.wrong.filter(q=>q.group===g);
    return {g,total:qs.length,correct:qs.length-wr.length,wrong:wr.length};
  }).filter(x=>x.total);

  area.innerHTML=`<div class="tf-result"><span>て-FORM COMPLETE</span><h2>${s.score}/${s.questions.length}</h2>
    <p><b>${pct}% chính xác.</b> ${pct>=90?'Khá chắc. Hãy thử chế độ gõ đáp án hoặc toàn bộ Bài 14–25.':pct>=70?'Ổn, nhưng nên làm lại riêng các động từ sai.':'Nên xem lại bảng quy tắc rồi luyện lại câu sai.'}</p>
    <div class="tf-group-result">${groups.map(x=>`<div class="${x.wrong?'has-wrong':''}"><b>Nhóm ${x.g}</b><strong>${x.correct}/${x.total}</strong><small>${x.wrong} sai</small></div>`).join('')}</div>
    <div class="tf-result-actions">
      ${s.wrong.length?`<button class="primary-btn" onclick="retryTeFormWrong()">Luyện lại ${s.wrong.length} câu sai →</button>`:''}
      <button class="secondary-btn" onclick="restartTeFormPractice()">Bộ mới ↻</button>
      <button class="ghost-btn" onclick="openRecallLab()">Recall Lab</button>
    </div></div>`;
}

function retryTeFormWrong(){
  const s=teFormState;
  teFormState={...s,questions:shuffle([...s.wrong]),index:0,score:0,answered:false,wrong:[],questionStartedAt:Date.now()};
  renderTeFormQuestion();
}

function restartTeFormPractice(){
  const s=teFormState;
  let qs=tfCreateQuestions(s.pool,s.mode);
  if(s.requestedCount!=='all')qs=qs.slice(0,Math.min(+s.requestedCount,qs.length));
  teFormState={...s,questions:qs,index:0,score:0,answered:false,wrong:[],questionStartedAt:Date.now()};
  renderTeFormQuestion();
}

/* Recall labels */
const _v20RecallSkillLabel=recallSkillLabel;
recallSkillLabel=function(skill){
  const m={
    'te-form-produce':'て-form: tự chia',
    'te-form-choice':'て-form: chọn đáp án',
    'te-form-reverse':'て-form: đảo về ます',
    'te-form-rule':'て-form: quy tắc'
  };
  return m[skill]||_v20RecallSkillLabel(skill);
};
