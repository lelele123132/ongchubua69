/* ==========================================================
   V34 — ADD た-FORM + EXPLICIT 辞書形
   ========================================================== */
function v34ModeLabel(){
  const mode=v29VerbState?.mode;
  if(mode==='ta')return 'た-FORM';
  if(mode==='dictionary')return 'THỂ NGUYÊN DẠNG（辞書形）';
  if(mode==='nai-meaning')return 'ない-FORM → ĐOÁN NGHĨA';
  return 'て-FORM';
}

openV29VerbAppendix=function(){
  try{setNav('practice')}catch{}
  const root=document.getElementById('app'); if(!root)return;
  const counts=[1,2,3].map(g=>V29_VERB_APPENDIX.filter(v=>v.group===g).length);
  root.innerHTML=`<div class="breadcrumb"><button onclick="goHome()">Trang chủ</button> › <button onclick="openPractice()">Luyện tập</button> › Động từ cuối sách</div>
  <section class="v29-verb-hero"><div><span class="v29-verb-kicker">V. BIẾN ĐỔI ĐỘNG TỪ • CUỐI SÁCH N5</span><h1>動 Động từ cuối sách</h1><p>Flashcard random: luyện <b>て-form</b>, <b>た-form</b>, <b>thể nguyên dạng（辞書形）</b>, hoặc nhìn <b>ない-form</b> để đoán nghĩa.</p></div><div class="v29-verb-stats"><div><b>${V29_VERB_APPENDIX.length}</b><span>động từ</span></div><small>Nhóm I ${counts[0]} • II ${counts[1]} • III ${counts[2]}</small></div></section>
  <section class="panel v29-verb-setup"><div class="v29-verb-options">
    <label><b>Kiểu Flashcard</b><select id="v29-verb-mode"><option value="te" selected>ます → て-form</option><option value="ta">ます → た-form</option><option value="dictionary">ます → Thể nguyên dạng（辞書形）</option><option value="nai-meaning">ない-form → Đoán động từ + nghĩa</option></select></label>
    <label><b>Nhóm động từ</b><select id="v29-verb-group"><option value="all" selected>Tất cả Nhóm I + II + III</option><option value="1">Chỉ Nhóm I</option><option value="2">Chỉ Nhóm II</option><option value="3">Chỉ Nhóm III</option></select></label>
    <label><b>Số thẻ</b><select id="v29-verb-count"><option value="10">10 thẻ</option><option value="20" selected>20 thẻ</option><option value="50">50 thẻ</option><option value="all">Tất cả</option></select></label>
    <button class="primary-btn" onclick="v29StartVerbFlash()">Bắt đầu Random →</button>
  </div>
  <div class="v34-form-examples"><span><b>のみます</b> → のんで → のんだ → のむ</span><span><b>いきます</b> → いって → いった → いく</span><span><b>します</b> → して → した → する</span><span><b>来ます</b> → きて → きた → くる</span></div>
  <div id="v29-verb-area"></div></section>`;
};

v29VerbAnswer=function(v){
  const mode=v29VerbState?.mode;
  if(mode==='ta')return v.ta;
  if(mode==='dictionary')return v.dictionary;
  if(mode==='nai-meaning')return v.masu;
  return v.te;
};
v29ModeLabel=function(){return v34ModeLabel();};

v29RenderVerbCard=function(){
  const s=v29VerbState, area=document.getElementById('v29-verb-area'); if(!s||!area)return;
  if(s.index>=s.cards.length)return v29RenderVerbResult();
  const v=s.cards[s.index], pct=Math.round(s.index/s.cards.length*100), isNai=s.mode==='nai-meaning';
  s.revealed=false; s.cardStartedAt=Date.now();
  const frontMain=isNai?v.nai:(v.display||v.masu), frontSub=!isNai&&v.display!==v.masu?v.masu:'';
  area.innerHTML=`<div class="v29-verb-session"><div class="v29-verb-top"><div><span>NHÓM ${v.group}</span><b>${escapeHtml(v34ModeLabel())}</b></div><strong>${s.index+1}/${s.cards.length}</strong></div><div class="progressbar v29-verb-progress"><span style="width:${pct}%"></span></div>
  <button class="v29-verb-card v31-verb-card" onclick="v29RevealVerb()"><small>${isNai?'MẶT TRƯỚC • ない-FORM':'MẶT TRƯỚC • ます-FORM'}</small><strong>${escapeHtml(frontMain)}</strong>${frontSub?`<em>${escapeHtml(frontSub)}</em>`:''}<span id="v29-verb-hint">${isNai?'Đoán động từ gốc + nghĩa tiếng Việt • bấm để lật':`Tự nhớ nghĩa + chia sang ${v34ModeLabel()} • bấm để lật`}</span><div id="v29-verb-answer"></div></button><div id="v29-verb-rate"></div><div class="v29-verb-bottom"><button class="ghost-btn" onclick="v29ShuffleCurrentVerbSet()">↻ Xáo lại bộ này</button></div></div>`;
};

v29RevealVerb=function(){
  const s=v29VerbState; if(!s||s.revealed)return; s.revealed=true;
  const v=s.cards[s.index], isNai=s.mode==='nai-meaning';
  const hint=document.getElementById('v29-verb-hint'); if(hint)hint.textContent='ĐÁP ÁN';
  const ans=document.getElementById('v29-verb-answer');
  if(ans){
    if(isNai){
      ans.innerHTML=`<div class="v31-meaning-answer"><small>NGHĨA</small><strong>${escapeHtml(v.meaning||'—')}</strong></div><div class="v31-form-answer"><small>ます-FORM</small><b>${escapeHtml(v.display||v.masu)}</b></div><div class="v34-all-forms"><span><small>辞書形</small><b>${escapeHtml(v.dictionary)}</b></span><span><small>て</small><b>${escapeHtml(v.te)}</b></span><span><small>た</small><b>${escapeHtml(v.ta)}</b></span><span><small>ない</small><b>${escapeHtml(v.nai)}</b></span></div>`;
    } else {
      const answer=v29VerbAnswer(v);
      ans.innerHTML=`<div class="v31-meaning-answer"><small>NGHĨA</small><strong>${escapeHtml(v.meaning||'—')}</strong></div><div class="v31-form-answer"><small>${escapeHtml(v34ModeLabel())}</small><b>${escapeHtml(answer)}</b></div><span class="v31-answer-meta">${escapeHtml(v.masu)} → ${escapeHtml(answer)} • Nhóm ${v.group}</span>`;
    }
  }
  document.getElementById('v29-verb-rate').innerHTML=`<div class="v29-verb-rate-row"><button class="memory-btn again" onclick="v29RateVerb(false)">Quên</button><button class="memory-btn good" onclick="v29RateVerb(true)">Nhớ</button></div>`;
};

v29RateVerb=function(ok){
  const s=v29VerbState; if(!s||!s.revealed)return; const v=s.cards[s.index];
  let answer,skill,prompt;
  if(s.mode==='nai-meaning'){answer=`${v.masu} • ${v.meaning}`;skill='verb-appendix-nai-meaning';prompt=`${v.nai} → động từ gì / nghĩa gì?`;}
  else if(s.mode==='dictionary'){answer=v.dictionary;skill='verb-appendix-dictionary';prompt=`${v.masu} → 辞書形?`;}
  else if(s.mode==='ta'){answer=v.ta;skill='verb-appendix-ta';prompt=`${v.masu} → た-form?`;}
  else {answer=v.te;skill='verb-appendix-te';prompt=`${v.masu} → て-form?`;}
  if(ok)s.remembered++; else{s.forgot++;s.forgotten.push(v);}
  recordRecallEvent({itemKey:recallKey(['verb-appendix',v.group,v.masu,s.mode]),domain:'grammar',skill,itemLabel:s.mode==='nai-meaning'?v.nai:v.masu,target:answer,prompt,selected:ok?'remembered':'forgot',correctAnswer:answer,correct:ok,rating:ok?'good':'again',responseMs:Date.now()-(s.cardStartedAt||Date.now()),source:'V34 • Động từ cuối sách',explanation:`${v.masu} • ${v.meaning} • て:${v.te} • た:${v.ta} • 辞書形:${v.dictionary} • ない:${v.nai}`,qType:'verb-appendix-flash',extra:{group:v.group,mode:s.mode,meaning:v.meaning||'',te:v.te,ta:v.ta,dictionary:v.dictionary,nai:v.nai}});
  s.index++; v29RenderVerbCard();
};

const _v34RecallSkillLabel=recallSkillLabel;
recallSkillLabel=function(skill){if(skill==='verb-appendix-ta')return 'Động từ: ます → た'; return _v34RecallSkillLabel(skill);};
