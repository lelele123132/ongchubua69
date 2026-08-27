/* ==========================================================
   V19 — Vocabulary Quiz: Kana only, no Kanji
   ========================================================== */
function v19Kana(v){ return String(v.kana || v.jp || '').trim(); }

function v19PeerScore(l,v,candidate,kind,itemKey){
  const hist=vocabHistoricalConfusionBonus(itemKey,kind==='meaning'?candidate.vi:v19Kana(candidate))*30;
  if(kind==='meaning'){
    return meaningSimilarity(v.vi,candidate.vi)*4
      + readingSimilarity(v19Kana(v),v19Kana(candidate))*2 + hist;
  }
  return meaningSimilarity(v.vi,candidate.vi)*3
    + readingSimilarity(v19Kana(v),v19Kana(candidate))*3 + hist;
}

function v19Peers(l,v,index,kind,hard=true){
  const skill=kind==='meaning'?'kana-meaning':'kana-form';
  const key=recallKey(['vocab',l.id,index,skill]);
  const peers=l.vocab.map((x,i)=>({...x,_i:i})).filter(x=>x._i!==index);
  if(!hard) return shuffle(peers).slice(0,3);
  return peers.map(x=>({x,score:v19PeerScore(l,v,x,kind,key)}))
    .sort((a,b)=>b.score-a.score).slice(0,3).map(o=>o.x);
}

/* Used by both single-lesson full quiz and multi-lesson vocab quiz. */
createFullLessonVocabQuestions=function(l,requested='smart',hard=true,onlyIndices=null){
  const indices=Array.isArray(onlyIndices)?onlyIndices:[...Array(l.vocab.length).keys()];
  return shuffle(indices.map((vi,order)=>{
    const v=l.vocab[vi];
    let kind = requested==='meaning' ? 'meaning'
             : (requested==='word' || requested==='reading') ? 'kana'
             : (order%2===0 ? 'meaning' : 'kana');

    const peers=v19Peers(l,v,vi,kind,hard);
    let q,correct,answers,skill,type;

    if(kind==='meaning'){
      q=`「${v19Kana(v)}」 nghĩa là gì?`;
      correct=v.vi;
      answers=shuffle([...new Set([correct,...peers.map(x=>x.vi)])]).slice(0,4);
      skill='kana-meaning'; type='Kana → Việt';
    }else{
      q=`Từ Kana nào có nghĩa 「${v.vi}」?`;
      correct=v19Kana(v);
      answers=shuffle([...new Set([correct,...peers.map(x=>v19Kana(x))])]).slice(0,4);
      skill='kana-form'; type='Việt → Kana';
    }

    if(answers.length<4){
      const fallback=l.vocab.filter((x,i)=>i!==vi)
        .map(x=>kind==='meaning'?x.vi:v19Kana(x));
      answers=shuffle([...new Set([correct,...answers,...fallback])]).slice(0,4);
    }

    return {
      lesson:l.id,vocabIndex:vi,kind,skill,type,q,correct,answers,
      target:v19Kana(v),itemLabel:v19Kana(v),
      detail:`${v19Kana(v)} = ${v.vi}`,noKanji:true
    };
  }));
};

renderVocabQuizSetup=function(box,l){
  box.innerHTML=`<div class="vocab-quiz-intro v19-kana-quiz-intro">
    <div class="vocab-coverage-ring"><b>100%</b><span>từ trong bài</span></div>
    <div><span class="v19-kana-badge">KANA ONLY • NO KANJI</span>
      <h3>Trắc nghiệm từ vựng toàn Bài ${l.id}</h3>
      <p>Kiểm tra đủ từ nhưng chỉ dùng <b>Kana ↔ nghĩa Việt</b>. Không hỏi Kanji.</p>
      <div class="vocab-quiz-facts"><span><b>${l.vocab.length}</b> từ</span><span>Kanji OFF</span><span>Bẫy cùng bài</span></div>
    </div>
  </div>
  <div class="vocab-quiz-settings">
    <label><b>Kiểu kiểm tra</b><select id="vocab-quiz-kind">
      <option value="smart" selected>Trộn Kana ↔ nghĩa</option>
      <option value="meaning">Kana → nghĩa Việt</option>
      <option value="word">Nghĩa Việt → Kana</option>
    </select></label>
    <label class="vocab-check-label"><input id="vocab-hard-toggle" type="checkbox" checked>
      <span><b>Bẫy dễ nhầm</b><small>nghĩa gần + âm gần + lịch sử từng nhầm</small></span></label>
    <button class="primary-btn" onclick="startFullLessonVocabQuiz(${l.id})">Bắt đầu đủ ${l.vocab.length} từ →</button>
  </div>
  <div class="v19-no-kanji-note"><b>Ví dụ:</b> 学生 sẽ được hỏi bằng <b>がくせい</b>. Từ Katakana như テレビ vẫn giữ cách viết chuẩn.</div>`;
};

renderFullLessonVocabQuestion=function(){
  const s=vocabQuizState,l=LESSONS[s.lessonId-1],box=document.getElementById('vocab-study-content');
  if(!s||!box)return;
  if(s.index>=s.questions.length){renderFullLessonVocabResult(box,l);return}
  const q=s.questions[s.index],pct=Math.round(s.index/s.questions.length*100);
  s.questionStartedAt=Date.now();
  box.innerHTML=`<div class="vocab-full-quiz">
    <div class="vocab-full-top"><div><span class="vocab-full-badge v19-kana-badge">BÀI ${l.id} • KANA ONLY</span><h3>${escapeHtml(q.type)}</h3></div>
      <div class="vocab-full-counter"><b>${s.index+1}</b><span>/ ${s.questions.length}</span></div></div>
    <div class="vocab-full-meta"><span>Đã kiểm tra ${s.index}/${s.questions.length} từ</span><span>漢字 OFF</span></div>
    <div class="progressbar vocab-full-progress"><span style="width:${pct}%"></span></div>
    <div class="vocab-full-question">${escapeHtml(q.q)}</div>
    <div class="vocab-full-answers">${q.answers.map((a,i)=>`<button class="vocab-full-answer" data-answer="${escapeHtml(a)}" onclick="answerFullLessonVocab(this,${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHtml(a)}</b></button>`).join('')}</div>
    <div id="vocab-full-feedback"></div>
  </div>`;
};

answerFullLessonVocab=function(btn,i){
  const s=vocabQuizState;if(!s||s.answered)return;
  s.answered=true;
  const q=s.questions[s.index],l=LESSONS[s.lessonId-1],v=l.vocab[q.vocabIndex];
  const selected=q.answers[i],ok=selected===q.correct;
  document.querySelectorAll('.vocab-full-answer').forEach(b=>{if(b.dataset.answer===q.correct)b.classList.add('correct')});
  if(ok)s.score++;else{btn.classList.add('wrong');if(!s.wrongIndices.includes(q.vocabIndex))s.wrongIndices.push(q.vocabIndex)}

  recordRecallEvent({
    itemKey:recallKey(['vocab',l.id,q.vocabIndex,q.skill]),
    domain:'vocab',skill:q.skill,lesson:l.id,itemLabel:v19Kana(v),target:v19Kana(v),prompt:q.q,
    selected,correctAnswer:q.correct,correct:ok,responseMs:Date.now()-(s.questionStartedAt||Date.now()),
    source:`V19 • Kana-only vocab Bài ${l.id}`,answers:q.answers,
    explanation:`${v19Kana(v)} = ${v.vi}`,qType:'vocab-kana-only',
    extra:{vocabIndex:q.vocabIndex,noKanji:true}
  });

  document.getElementById('vocab-full-feedback').innerHTML=`<div class="feedback vocab-full-feedback">
    <b>${ok?'✓ Chính xác':'✗ '+escapeHtml(selected)+' → '+escapeHtml(q.correct)}</b>
    <span>${escapeHtml(v19Kana(v))} = ${escapeHtml(v.vi)}</span>
    <small>${!ok?'Đã ghi cặp nhầm vào Recall Memory.':''}</small>
  </div><div class="vocab-full-next"><button class="primary-btn" onclick="nextFullLessonVocabQuestion()">Câu tiếp theo →</button></div>`;
};

/* Multi-lesson vocab quiz: same Kana-only rule. */
const _v19OpenVocabQuizHub=openVocabQuizHub;
openVocabQuizHub=function(preselected=null){
  const r=_v19OpenVocabQuizHub(preselected);
  setTimeout(()=>{
    const kind=document.getElementById('vq-kind');
    if(kind)kind.innerHTML=`<option value="smart" selected>Trộn Kana ↔ nghĩa</option>
      <option value="meaning">Kana → nghĩa Việt</option>
      <option value="word">Nghĩa Việt → Kana</option>`;
    const hero=document.querySelector('.vq-hero p');
    if(hero)hero.innerHTML='Chọn một hoặc nhiều bài. Quiz chỉ dùng <b>Kana ↔ nghĩa Việt</b>, không hỏi Kanji.';
    const rule=document.querySelector('.vq-rule-note');
    if(rule)rule.innerHTML='<b>Kana-only:</b> không dùng Kanji trong câu hỏi/đáp án. Bẫy vẫn ưu tiên từ cùng bài, âm gần, nghĩa gần và lịch sử từng nhầm.';
  },0);
  return r;
};

renderVocabQuizHubQuestion=function(){
  const s=vocabLessonHubState,area=document.getElementById('vq-area');if(!s||!area)return;
  if(s.index>=s.questions.length){renderVocabQuizHubResult();return}
  const q=s.questions[s.index],pct=Math.round(s.index/s.questions.length*100);
  s.questionStartedAt=Date.now();
  area.innerHTML=`<div class="vq-question-card">
    <div class="vq-qtop"><div><span class="vq-badge">BÀI ${q.lesson} • KANA</span><b>${escapeHtml(q.type)}</b></div><span>${s.index+1}/${s.questions.length}</span></div>
    <div class="progressbar vq-progress"><span style="width:${pct}%"></span></div>
    <div class="vq-memory-flags"><span>漢字 OFF</span></div>
    <div class="vq-question">${escapeHtml(q.q)}</div>
    <div class="vq-answers">${q.answers.map((a,i)=>`<button class="vq-answer" data-answer="${escapeHtml(a)}" onclick="answerVocabQuizHub(this,${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHtml(a)}</b></button>`).join('')}</div>
    <div id="vq-feedback"></div>
  </div>`;
};

answerVocabQuizHub=function(btn,i){
  const s=vocabLessonHubState;if(!s||s.answered)return;s.answered=true;
  const q=s.questions[s.index],l=LESSONS[q.lesson-1],v=l.vocab[q.vocabIndex];
  const selected=q.answers[i],ok=selected===q.correct;
  document.querySelectorAll('.vq-answer').forEach(x=>{if(x.dataset.answer===q.correct)x.classList.add('correct')});
  if(ok)s.score++;else{btn.classList.add('wrong');s.wrong.push(q);s.wrongKeys.add(`${q.lesson}:${q.vocabIndex}`)}
  recordRecallEvent({
    itemKey:recallKey(['vocab',q.lesson,q.vocabIndex,q.skill]),
    domain:'vocab',skill:q.skill,lesson:q.lesson,itemLabel:v19Kana(v),target:v19Kana(v),prompt:q.q,
    selected,correctAnswer:q.correct,correct:ok,responseMs:Date.now()-(s.questionStartedAt||Date.now()),
    source:'V19 • Kana-only nhiều bài',answers:q.answers,
    explanation:`${v19Kana(v)} = ${v.vi}`,qType:'vocab-kana-only-multi',
    extra:{vocabIndex:q.vocabIndex,noKanji:true}
  });
  document.getElementById('vq-feedback').innerHTML=`<div class="feedback vq-feedback">
    <b>${ok?'✓ Chính xác':'✗ '+escapeHtml(selected)+' → '+escapeHtml(q.correct)}</b>
    <div class="vq-word-line"><strong>${escapeHtml(v19Kana(v))}</strong></div>
    <p>${escapeHtml(v.vi)}</p>
  </div><div class="vq-next"><button class="primary-btn" onclick="nextVocabQuizHub()">Câu tiếp theo →</button></div>`;
};
