/* ==========================================================
   V22 — SAME-VERB て-FORM DISTRACTORS
   Câu hỏi: ます-form
   4 đáp án: đều được tạo từ CHÍNH động từ đó.
   ========================================================== */

function tfSameVerbVariants(v){
  const kana=String(v.kana||'').trim();
  const stem=kana.replace(/ます$/,'');

  let candidates=[
    stem+'て',
    stem+'って',
    stem+'んで',
    stem+'いて',
    stem+'いで',
    stem+'して'
  ];

  /* Với các động từ có stem kết thúc bằng kana đặc trưng,
     thêm cả biến thể "có vẻ hợp lý" nhưng sai để tạo bẫy. */
  const last=stem.slice(-1);
  const base=stem.slice(0,-1);

  if(last){
    candidates.push(
      base+'って',
      base+'んで',
      base+'いて',
      base+'いで',
      base+'して',
      base+'て'
    );
  }

  /* Riêng する / 来る / 行く: thêm bẫy đúng hình thức cùng chính động từ. */
  if(/します$/.test(kana)){
    const b=kana.replace(/します$/,'');
    candidates.push(b+'して',b+'しって',b+'しんで',b+'しいて');
  }

  if(/きます$/.test(kana)){
    const b=kana.replace(/きます$/,'');
    candidates.push(b+'きて',b+'いて',b+'って',b+'きって');
  }

  if(/いきます$/.test(kana)){
    const b=kana.replace(/いきます$/,'');
    candidates.push(b+'いって',b+'いて',b+'いきて',b+'いんで');
  }

  candidates=[...new Set(candidates.filter(x=>x&&x!==v.te))];

  /* Ưu tiên biến thể ngắn, giống từ gốc, không lấy form của động từ khác. */
  candidates.sort((a,b)=>{
    const da=Math.abs(a.length-v.te.length);
    const db=Math.abs(b.length-v.te.length);
    return da-db || a.localeCompare(b,'ja');
  });

  return candidates;
}

tfSimpleQuestions=function(pool){
  return shuffle(pool.map(v=>{
    let traps=tfSameVerbVariants(v).slice(0,3);

    /* Nếu vì dữ liệu đặc biệt chưa đủ 3, bổ sung thêm bằng cùng stem. */
    const stem=v.kana.replace(/ます$/,'');
    const fallback=[
      stem+'て',stem+'って',stem+'んで',stem+'いて',stem+'いで',stem+'して'
    ];
    for(const x of fallback){
      if(traps.length>=3)break;
      if(x!==v.te&&!traps.includes(x))traps.push(x);
    }

    const answers=shuffle([v.te,...traps.slice(0,3)]);

    return {
      ...v,
      type:'mcq',
      skill:'te-form-choice',
      label:'Chọn て-form đúng',
      prompt:v.kana,
      correct:v.te,
      answers
    };
  }));
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
      <b>Chọn cách chia thể て đúng của chính động từ này</b>
    </div>

    <div class="tf-answers tf-simple-answers">
      ${q.answers.map((a,i)=>`
        <button data-answer="${escapeHtml(a)}" onclick="answerTeFormChoice(this,${i})">
          <span>${String.fromCharCode(65+i)}</span>
          <b>${escapeHtml(a)}</b>
        </button>`).join('')}
    </div>

    <div class="tf-sameverb-note">Cả 4 đáp án đều được tạo từ <b>${escapeHtml(q.kana)}</b>, không lấy động từ khác.</div>
    <div id="tf-feedback"></div>
  </div>`;
};
