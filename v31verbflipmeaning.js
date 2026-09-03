/* ==========================================================
   V31 — VERB FLASHCARD: MEANING ONLY AFTER FLIP
   Front: ます-form only
   Back: meaning + selected conjugation
   ========================================================== */

v29RenderVerbCard=function(){
  const s=v29VerbState;
  const area=document.getElementById('v29-verb-area');
  if(!s||!area)return;

  if(s.index>=s.cards.length){
    return v29RenderVerbResult();
  }

  const v=s.cards[s.index];
  const pct=Math.round(s.index/s.cards.length*100);

  s.revealed=false;
  s.cardStartedAt=Date.now();

  area.innerHTML=`<div class="v29-verb-session">
    <div class="v29-verb-top">
      <div>
        <span>NHÓM ${v.group}</span>
        <b>ます → ${v29ModeLabel()}</b>
      </div>
      <strong>${s.index+1}/${s.cards.length}</strong>
    </div>

    <div class="progressbar v29-verb-progress">
      <span style="width:${pct}%"></span>
    </div>

    <button class="v29-verb-card v31-verb-card" onclick="v29RevealVerb()">
      <small>MẶT TRƯỚC • ます-FORM</small>
      <strong>${escapeHtml(v.display||v.masu)}</strong>
      ${v.display!==v.masu?`<em>${escapeHtml(v.masu)}</em>`:''}

      <span id="v29-verb-hint">
        Tự nhớ nghĩa + chia sang ${v29ModeLabel()} • bấm để lật
      </span>

      <div id="v29-verb-answer"></div>
    </button>

    <div id="v29-verb-rate"></div>

    <div class="v29-verb-bottom">
      <button class="ghost-btn" onclick="v29ShuffleCurrentVerbSet()">↻ Xáo lại bộ này</button>
    </div>
  </div>`;
};

v29RevealVerb=function(){
  const s=v29VerbState;
  if(!s||s.revealed)return;

  s.revealed=true;

  const v=s.cards[s.index];
  const answer=v29VerbAnswer(v);

  const hint=document.getElementById('v29-verb-hint');
  if(hint)hint.textContent='ĐÁP ÁN';

  const ans=document.getElementById('v29-verb-answer');
  if(ans){
    ans.innerHTML=`
      <div class="v31-meaning-answer">
        <small>NGHĨA</small>
        <strong>${escapeHtml(v.meaning||'—')}</strong>
      </div>

      <div class="v31-form-answer">
        <small>${escapeHtml(v29ModeLabel())}</small>
        <b>${escapeHtml(answer)}</b>
      </div>

      <span class="v31-answer-meta">
        ${escapeHtml(v.masu)} → ${escapeHtml(answer)} • Nhóm ${v.group}
      </span>`;
  }

  document.getElementById('v29-verb-rate').innerHTML=`
    <div class="v29-verb-rate-row">
      <button class="memory-btn again" onclick="v29RateVerb(false)">Quên</button>
      <button class="memory-btn good" onclick="v29RateVerb(true)">Nhớ</button>
    </div>`;
};

/* Keep Recall logging with meaning included. */
v29RateVerb=function(ok){
  const s=v29VerbState;
  if(!s||!s.revealed)return;

  const v=s.cards[s.index];
  const answer=v29VerbAnswer(v);
  const skill=s.mode==='dictionary'
    ? 'verb-appendix-dictionary'
    : 'verb-appendix-te';

  if(ok)s.remembered++;
  else{
    s.forgot++;
    s.forgotten.push(v);
  }

  recordRecallEvent({
    itemKey:recallKey(['verb-appendix',v.group,v.masu,s.mode]),
    domain:'grammar',
    skill,
    itemLabel:v.masu,
    target:answer,
    prompt:`${v.masu} → nhớ nghĩa + ${v29ModeLabel()}?`,
    selected:ok?'remembered':'forgot',
    correctAnswer:`${v.meaning||'—'} • ${answer}`,
    correct:ok,
    rating:ok?'good':'again',
    responseMs:Date.now()-(s.cardStartedAt||Date.now()),
    source:'V31 • Động từ cuối sách • nghĩa chỉ hiện khi lật',
    explanation:`${v.masu} = ${v.meaning||'—'} → ${answer}`,
    qType:'verb-appendix-flash',
    extra:{group:v.group,sourcePage:v.sourcePage,mode:s.mode,meaning:v.meaning||''}
  });

  s.index++;
  v29RenderVerbCard();
};
