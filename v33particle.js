/* ==========================================================
   V33 — 助詞 PARTICLE CLOZE PRACTICE
   ========================================================== */

let v33ParticleState=null;

const V33_PARTICLE_EXPLAIN={
  'は':'は: nêu chủ đề / đối chiếu.',
  'が':'が: đánh dấu chủ ngữ, đặc biệt với tồn tại, khả năng, sở thích, hiện tượng.',
  'を':'を: đánh dấu tân ngữ trực tiếp hoặc nơi đi qua/rời khỏi trong một số mẫu.',
  'に':'に: chỉ thời điểm, đích đến, vị trí tồn tại, đối tượng nhận/tác động.',
  'で':'で: chỉ nơi diễn ra hành động, phương tiện/cách thức, nguyên nhân.',
  'へ':'へ: chỉ hướng di chuyển.',
  'と':'と: “với”, trích dẫn, hoặc nối danh từ.',
  'の':'の: sở hữu, thuộc tính, bổ nghĩa danh từ.',
  'も':'も: “cũng”.',
  'から':'から: “từ”, điểm bắt đầu.',
  'まで':'まで: “đến”, giới hạn cuối.',
  'より':'より: mốc so sánh “hơn/so với”.',
  'だけ':'だけ: “chỉ”.',
  'しか':'しか: “chỉ…” và thường đi với phủ định.',
  'か':'か: nghi vấn / lựa chọn tùy ngữ cảnh.',
  'には':'には: に + は, nhấn/đối chiếu đích, thời điểm hoặc vị trí.',
  'では':'では: で + は, nhấn/đối chiếu nơi/phạm vi.',
  'とは':'とは: と + は, nêu/đối chiếu nội dung.',
  'へは':'へは: へ + は, nhấn hướng đi.',
  'にも':'にも: に + も, “cũng ở/đến/cho…”.',
  'でも':'でも: で + も, “cũng tại/bằng…” tùy ngữ cảnh.'
};

function v33ParticleSelectedLessons(){
  try{
    const ids=selectedLessons();
    if(ids?.length)return ids;
  }catch{}
  return [];
}

function v33InjectPracticeCard(){
  const grid=document.querySelector('.mode-grid');
  if(!grid || grid.querySelector('.v33-particle-card'))return;

  const card=document.createElement('button');
  card.className='mode-card v33-particle-card';
  card.onclick=openV33ParticlePractice;
  card.innerHTML=`<h3>助 Điền trợ từ</h3>
    <p>${V33_PARTICLE_BANK.length}+ câu lấy từ ví dụ ngữ pháp và đọc hiểu Bài 1–25.</p>
    <small>は・が・を・に・で・へ・と・の・も・から・まで…</small>`;

  grid.appendChild(card);
}

const _v33OpenPractice=openPractice;
openPractice=function(){
  const r=_v33OpenPractice();
  setTimeout(v33InjectPracticeCard,0);
  return r;
};

function openV33ParticlePractice(){
  try{setNav('practice')}catch{}
  const root=document.getElementById('app');
  if(!root)return;

  const selected=v33ParticleSelectedLessons();

  root.innerHTML=`<div class="breadcrumb">
    <button onclick="goHome()">Trang chủ</button> ›
    <button onclick="openPractice()">Luyện tập</button> › Điền trợ từ
  </div>

  <section class="v33-particle-hero">
    <div>
      <span class="v33-kicker">助詞 • PARTICLE CLOZE</span>
      <h1>Điền trợ từ</h1>
      <p>Chọn trợ từ đúng cho chỗ trống. Ngân hàng được tạo từ <b>ví dụ ngữ pháp + phần đọc hiểu Bài 1–25</b> đang có trong web.</p>
    </div>
    <div class="v33-stat">
      <b>${V33_PARTICLE_BANK.length}</b>
      <span>câu trong ngân hàng</span>
      <small>25 bài N5</small>
    </div>
  </section>

  <section class="panel v33-particle-setup">
    <div class="v33-particle-options">
      <label>
        <b>Phạm vi</b>
        <select id="v33-particle-scope" onchange="v33UpdateCount()">
          <option value="selected" ${selected.length?'selected':''}>Các bài đang chọn trong Luyện tập${selected.length?` (${selected.join(', ')})`:''}</option>
          <option value="all" ${!selected.length?'selected':''}>Tất cả Bài 1–25</option>
        </select>
      </label>

      <label>
        <b>Số câu</b>
        <select id="v33-particle-count">
          <option value="20">20 câu</option>
          <option value="50" selected>50 câu</option>
          <option value="100">100 câu</option>
          <option value="all">Tất cả câu trong phạm vi</option>
        </select>
      </label>

      <label class="v33-check">
        <input id="v33-particle-grammar-only" type="checkbox" onchange="v33UpdateCount()">
        <span><b>Chỉ câu ngữ pháp</b><small>Bỏ phần câu lấy từ đọc hiểu</small></span>
      </label>

      <button class="primary-btn" onclick="v33StartParticleQuiz()">Bắt đầu →</button>
    </div>

    <div id="v33-particle-count-info" class="v33-count-info"></div>
    <div id="v33-particle-area"></div>
  </section>`;

  v33UpdateCount();
}

function v33CurrentPool(){
  const scope=document.getElementById('v33-particle-scope')?.value||'all';
  const grammarOnly=document.getElementById('v33-particle-grammar-only')?.checked||false;

  let pool=[...V33_PARTICLE_BANK];

  if(scope==='selected'){
    const ids=v33ParticleSelectedLessons();
    if(ids.length){
      const set=new Set(ids);
      pool=pool.filter(q=>set.has(q.lesson));
    }
  }

  if(grammarOnly)pool=pool.filter(q=>q.source==='Ngữ pháp');

  return pool;
}

function v33UpdateCount(){
  const box=document.getElementById('v33-particle-count-info');
  if(!box)return;
  const pool=v33CurrentPool();
  const lessons=[...new Set(pool.map(q=>q.lesson))];
  box.innerHTML=`Phạm vi hiện tại: <b>${pool.length}</b> câu • <b>${lessons.length}</b> bài.`;
}

function v33ShuffleOptions(q){
  return shuffle([...q.options]);
}

function v33StartParticleQuiz(){
  const count=document.getElementById('v33-particle-count')?.value||'50';
  let pool=shuffle(v33CurrentPool());

  if(!pool.length){
    const area=document.getElementById('v33-particle-area');
    if(area)area.innerHTML='<div class="empty"><p>Phạm vi này chưa có câu hỏi.</p></div>';
    return;
  }

  if(count!=='all')pool=pool.slice(0,Math.min(+count,pool.length));

  const questions=pool.map(q=>({...q,shownOptions:v33ShuffleOptions(q)}));

  v33ParticleState={
    questions,
    requestedCount:count,
    index:0,
    score:0,
    answered:false,
    wrong:[],
    questionStartedAt:Date.now()
  };

  v33RenderParticleQuestion();
}

function v33RenderParticleQuestion(){
  const s=v33ParticleState;
  const area=document.getElementById('v33-particle-area');
  if(!s||!area)return;

  if(s.index>=s.questions.length){
    return v33RenderParticleResult();
  }

  const q=s.questions[s.index];
  const pct=Math.round(s.index/s.questions.length*100);

  s.answered=false;
  s.questionStartedAt=Date.now();

  area.innerHTML=`<div class="v33-question-card">
    <div class="v33-qtop">
      <div>
        <span>BÀI ${q.lesson}</span>
        <b>${escapeHtml(q.source)}</b>
      </div>
      <strong>${s.index+1}/${s.questions.length}</strong>
    </div>

    <div class="progressbar v33-progress">
      <span style="width:${pct}%"></span>
    </div>

    ${q.pattern?`<div class="v33-pattern">${escapeHtml(q.pattern)}</div>`:''}

    <div class="v33-question">${escapeHtml(q.question)}</div>

    ${q.translation?`<div class="v33-translation">${escapeHtml(q.translation)}</div>`:''}

    <div class="v33-answers">
      ${q.shownOptions.map((a,i)=>`
        <button data-answer="${escapeHtml(a)}" onclick="v33AnswerParticle(this,${i})">
          <span>${String.fromCharCode(65+i)}</span>
          <b>${escapeHtml(a)}</b>
        </button>`).join('')}
    </div>

    <div id="v33-feedback"></div>
  </div>`;
}

function v33AnswerParticle(btn,i){
  const s=v33ParticleState;
  if(!s||s.answered)return;

  const q=s.questions[s.index];
  const selected=q.shownOptions[i];
  const ok=selected===q.answer;

  s.answered=true;

  document.querySelectorAll('.v33-answers button').forEach(b=>{
    b.disabled=true;
    if(b.dataset.answer===q.answer)b.classList.add('correct');
  });

  if(ok)s.score++;
  else{
    btn.classList.add('wrong');
    s.wrong.push(q);
  }

  recordRecallEvent({
    itemKey:recallKey(['particle-cloze',q.lesson,q.id]),
    domain:'grammar',
    skill:'particle-cloze',
    lesson:q.lesson,
    itemLabel:q.answer,
    target:q.answer,
    prompt:q.question,
    selected,
    correctAnswer:q.answer,
    correct:ok,
    responseMs:Date.now()-(s.questionStartedAt||Date.now()),
    source:`V33 • Điền trợ từ • ${q.source} • Bài ${q.lesson}`,
    answers:q.shownOptions,
    explanation:V33_PARTICLE_EXPLAIN[q.answer]||'',
    qType:'particle-cloze',
    extra:{questionId:q.id,source:q.source,pattern:q.pattern||''}
  });

  document.getElementById('v33-feedback').innerHTML=`
    <div class="feedback v33-feedback">
      <b>${ok?'✓ Chính xác':'✗ '+escapeHtml(selected)+' → '+escapeHtml(q.answer)}</b>
      <div class="v33-full-sentence">${escapeHtml(q.sentence)}</div>
      <p>${escapeHtml(V33_PARTICLE_EXPLAIN[q.answer]||'')}</p>
      ${q.translation?`<small>${escapeHtml(q.translation)}</small>`:''}
    </div>

    <div class="v33-next">
      <button class="primary-btn" onclick="v33NextParticle()">Câu tiếp theo →</button>
    </div>`;
}

function v33NextParticle(){
  v33ParticleState.index++;
  v33RenderParticleQuestion();
}

function v33RetryParticleWrong(){
  const s=v33ParticleState;
  if(!s?.wrong?.length)return;

  const qs=shuffle(s.wrong.map(q=>({...q,shownOptions:v33ShuffleOptions(q)})));
  v33ParticleState={
    ...s,
    questions:qs,
    index:0,
    score:0,
    answered:false,
    wrong:[],
    questionStartedAt:Date.now()
  };
  v33RenderParticleQuestion();
}

function v33NewParticleSet(){
  const s=v33ParticleState;
  if(!s)return;

  let pool=shuffle(v33CurrentPool());
  if(s.requestedCount!=='all'){
    pool=pool.slice(0,Math.min(+s.requestedCount,pool.length));
  }

  v33ParticleState={
    ...s,
    questions:pool.map(q=>({...q,shownOptions:v33ShuffleOptions(q)})),
    index:0,
    score:0,
    answered:false,
    wrong:[],
    questionStartedAt:Date.now()
  };
  v33RenderParticleQuestion();
}

function v33RenderParticleResult(){
  const s=v33ParticleState;
  const area=document.getElementById('v33-particle-area');
  if(!s||!area)return;

  const total=s.questions.length;
  const pct=total?Math.round(s.score/total*100):0;

  const byParticle={};
  s.wrong.forEach(q=>byParticle[q.answer]=(byParticle[q.answer]||0)+1);
  const weak=Object.entries(byParticle).sort((a,b)=>b[1]-a[1]).slice(0,5);

  area.innerHTML=`<div class="v33-result">
    <span>助詞 PRACTICE COMPLETE</span>
    <h2>${s.score}/${total}</h2>
    <p>Chính xác <b>${pct}%</b> • Sai ${s.wrong.length} câu.</p>

    ${weak.length?`<div class="v33-weak">
      <b>Trợ từ sai nhiều:</b>
      ${weak.map(([p,n])=>`<span>${escapeHtml(p)} • ${n}</span>`).join('')}
    </div>`:''}

    <div class="v33-result-actions">
      ${s.wrong.length
        ? `<button class="primary-btn" onclick="v33RetryParticleWrong()">Làm lại ${s.wrong.length} câu sai →</button>`
        : ''}
      <button class="secondary-btn" onclick="v33NewParticleSet()">Random bộ mới ↻</button>
      <button class="ghost-btn" onclick="openV33ParticlePractice()">Đổi phạm vi</button>
    </div>
  </div>`;
}

const _v33RecallSkillLabel=recallSkillLabel;
recallSkillLabel=function(skill){
  if(skill==='particle-cloze')return 'Ngữ pháp: Điền trợ từ';
  return _v33RecallSkillLabel(skill);
};

setTimeout(v33InjectPracticeCard,0);
