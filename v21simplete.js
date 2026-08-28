/* ==========================================================
   V21 — SIMPLE て-FORM QUIZ
   Chỉ: động từ ます-form -> chọn て-form đúng.
   ========================================================== */

function tfSimpleQuestions(pool){
  return shuffle(pool.map(v=>{
    let traps=tfTraps(v,pool);

    // Ưu tiên các biến thể sai có vẻ hợp lý của chính động từ.
    const stem=v.kana.replace(/ます$/,'');
    const selfTraps=[
      stem+'て',
      stem+'って',
      stem+'んで',
      stem+'いて',
      stem+'いで',
      stem+'して'
    ].filter(x=>x!==v.te);

    traps=[...new Set([...selfTraps,...traps])].filter(x=>x!==v.te);

    const answers=shuffle([v.te,...traps.slice(0,3)]);
    return {
      ...v,
      type:'mcq',
      skill:'te-form-choice',
      label:'Chọn て-form',
      prompt:v.kana,
      correct:v.te,
      answers
    };
  }));
}

/* Giao diện chỉ còn chọn phạm vi + số câu. */
renderTeFormSetup=function(box,l){
  const current=tfVerbsForLessons([l.id]).length;
  const cumulative=tfVerbsForLessons(tfScopeLessons(l.id,'cumulative')).length;
  const all=tfVerbsForLessons(tfScopeLessons(l.id,'all')).length;

  box.innerHTML=`<section class="tf-hero tf-simple-hero">
    <div>
      <span class="tf-kicker">て-FORM • BÀI 14+</span>
      <h3>Chọn thể て đúng</h3>
      <p>Nhìn động từ dạng <b>ます</b> → chọn một trong 4 đáp án thể <b>て</b>.</p>
    </div>
    <div class="tf-simple-example">
      <small>Ví dụ</small>
      <b>のみます</b>
      <span>→ のんで</span>
    </div>
  </section>

  <div class="tf-settings tf-simple-settings">
    <label><b>Phạm vi</b>
      <select id="tf-scope" onchange="updateTeFormCount(${l.id})">
        <option value="current">Chỉ Bài ${l.id} (${current} động từ)</option>
        <option value="cumulative" selected>Bài 14 → ${l.id} (${cumulative} động từ)</option>
        <option value="all">Toàn bộ Bài 14–25 (${all} động từ)</option>
      </select>
    </label>

    <label><b>Số câu</b>
      <select id="tf-count">
        <option value="10">10 câu</option>
        <option value="20" selected>20 câu</option>
        <option value="40">40 câu</option>
        <option value="all">Tất cả động từ</option>
      </select>
    </label>

    <button class="primary-btn" onclick="startTeFormPractice(${l.id})">Bắt đầu →</button>
  </div>

  <div id="tf-count-info" class="tf-count-info"></div>
  <div id="teform-area"></div>`;

  updateTeFormCount(l.id);
};

updateTeFormCount=function(lessonId){
  const box=document.getElementById('tf-count-info');
  if(!box)return;

  const scope=document.getElementById('tf-scope')?.value||'cumulative';
  const verbs=tfVerbsForLessons(tfScopeLessons(lessonId,scope));

  box.innerHTML=`Có <b>${verbs.length}</b> động từ trong phạm vi này.`;
};

startTeFormPractice=function(lessonId){
  const scope=document.getElementById('tf-scope')?.value||'cumulative';
  const count=document.getElementById('tf-count')?.value||'20';
  const lessonIds=tfScopeLessons(lessonId,scope);
  const pool=tfVerbsForLessons(lessonIds);

  let questions=tfSimpleQuestions(pool);
  if(count!=='all')questions=questions.slice(0,Math.min(+count,questions.length));

  teFormState={
    lessonId,
    scope,
    mode:'mcq',
    pool,
    questions,
    index:0,
    score:0,
    answered:false,
    wrong:[],
    requestedCount:count,
    questionStartedAt:Date.now()
  };

  renderTeFormQuestion();
};

renderTeFormQuestion=function(){
  const s=teFormState;
  const area=document.getElementById('teform-area');
  if(!s||!area)return;

  if(s.index>=s.questions.length){
    renderTeFormResult();
    return;
  }

  const q=s.questions[s.index];
  const pct=Math.round(s.index/s.questions.length*100);
  s.answered=false;
  s.questionStartedAt=Date.now();

  area.innerHTML=`<div class="tf-question-card tf-simple-card">
    <div class="tf-qtop">
      <div><span>て-FORM</span><b>Bài ${q.lesson}</b></div>
      <strong>${s.index+1}/${s.questions.length}</strong>
    </div>

    <div class="progressbar tf-progress">
      <span style="width:${pct}%"></span>
    </div>

    <div class="tf-simple-prompt">
      <small>${escapeHtml(q.vi)}</small>
      <strong>${escapeHtml(q.kana)}</strong>
      <span>↓</span>
      <b>Chọn て-form đúng</b>
    </div>

    <div class="tf-answers tf-simple-answers">
      ${q.answers.map((a,i)=>`
        <button data-answer="${escapeHtml(a)}" onclick="answerTeFormChoice(this,${i})">
          <span>${String.fromCharCode(65+i)}</span>
          <b>${escapeHtml(a)}</b>
        </button>`).join('')}
    </div>

    <div id="tf-feedback"></div>
  </div>`;
};

answerTeFormChoice=function(btn,i){
  const s=teFormState;
  if(!s||s.answered)return;

  const q=s.questions[s.index];
  const selected=q.answers[i];
  const ok=selected===q.correct;
  s.answered=true;

  document.querySelectorAll('.tf-answers button').forEach(b=>{
    b.disabled=true;
    if(b.dataset.answer===q.correct)b.classList.add('correct');
  });

  if(ok){
    s.score++;
  }else{
    btn.classList.add('wrong');
    s.wrong.push(q);
  }

  tfRecord(q,selected,ok);

  document.getElementById('tf-feedback').innerHTML=`
    <div class="feedback tf-feedback tf-simple-feedback">
      <b>${ok?'✓ Đúng':'✗ Sai • Đáp án đúng: '+escapeHtml(q.correct)}</b>
      <div class="tf-answer-line">
        <strong>${escapeHtml(q.kana)}</strong>
        <span>→</span>
        <strong>${escapeHtml(q.te)}</strong>
      </div>
      <small>${escapeHtml(q.jp)} • ${escapeHtml(q.vi)}</small>
    </div>
    <div class="tf-next">
      <button class="primary-btn" onclick="nextTeFormQuestion()">Tiếp →</button>
    </div>`;
};

restartTeFormPractice=function(){
  const s=teFormState;
  let qs=tfSimpleQuestions(s.pool);

  if(s.requestedCount!=='all'){
    qs=qs.slice(0,Math.min(+s.requestedCount,qs.length));
  }

  teFormState={
    ...s,
    questions:qs,
    index:0,
    score:0,
    answered:false,
    wrong:[],
    questionStartedAt:Date.now()
  };

  renderTeFormQuestion();
};
