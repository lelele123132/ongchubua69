/* V36 — て / ない / た -> GUESS MEANING FLASHCARDS */
let v36FormMeaningState=null;

function v36InjectPracticeCard(){
  const grid=document.querySelector('.mode-grid');
  if(!grid || grid.querySelector('.v36-form-meaning-card'))return;
  const card=document.createElement('button');
  card.className='mode-card v36-form-meaning-card';
  card.onclick=openV36FormMeaningFlash;
  card.innerHTML=`<h3>変 て・ない・た → Nghĩa</h3><p>Nhìn một dạng đã chia rồi đoán nghĩa động từ.</p><small>て-form • ない-form • た-form • trộn cả 3</small>`;
  grid.appendChild(card);
}

const _v36OpenPractice=openPractice;
openPractice=function(){const r=_v36OpenPractice();setTimeout(v36InjectPracticeCard,0);return r;};

function v36ModeLabel(mode){
  if(mode==='te')return 'て-FORM';
  if(mode==='nai')return 'ない-FORM';
  if(mode==='ta')return 'た-FORM';
  return 'MIX • て / ない / た';
}
function v36FrontValue(v,mode){
  if(mode==='te')return v.te;
  if(mode==='nai')return v.nai;
  if(mode==='ta')return v.ta;
  return v.te;
}
function v36PrepareCards(pool,mode){
  return pool.map(v=>{
    let picked=mode;
    if(mode==='mixed'){
      const choices=['te','nai','ta'];
      picked=choices[Math.floor(Math.random()*choices.length)];
    }
    return {...v,flashMode:picked,front:v36FrontValue(v,picked)};
  });
}

function openV36FormMeaningFlash(){
  try{setNav('practice')}catch{}
  const root=document.getElementById('app'); if(!root)return;
  const counts=[1,2,3].map(g=>V29_VERB_APPENDIX.filter(v=>v.group===g).length);
  root.innerHTML=`<div class="breadcrumb"><button onclick="goHome()">Trang chủ</button> › <button onclick="openPractice()">Luyện tập</button> › て・ない・た → Nghĩa</div>
  <section class="v36-hero"><div><span class="v36-kicker">変形 → 意味 • VERB RECOGNITION</span><h1>て・ない・た → Đoán nghĩa</h1><p>Mặt trước chỉ hiện <b>dạng động từ đã chia</b>. Tự đoán nghĩa rồi bấm lật để xem đáp án.</p></div><div class="v36-stat"><b>${V29_VERB_APPENDIX.length}</b><span>động từ</span><small>Nhóm I ${counts[0]} • II ${counts[1]} • III ${counts[2]}</small></div></section>
  <section class="panel v36-setup"><div class="v36-options">
    <label><b>Dạng ở mặt trước</b><select id="v36-mode"><option value="mixed" selected>Trộn て / ない / た</option><option value="te">Chỉ て-form</option><option value="nai">Chỉ ない-form</option><option value="ta">Chỉ た-form</option></select></label>
    <label><b>Nhóm động từ</b><select id="v36-group"><option value="all" selected>Tất cả Nhóm I + II + III</option><option value="1">Chỉ Nhóm I</option><option value="2">Chỉ Nhóm II</option><option value="3">Chỉ Nhóm III</option></select></label>
    <label><b>Số thẻ</b><select id="v36-count"><option value="10">10 thẻ</option><option value="20" selected>20 thẻ</option><option value="50">50 thẻ</option><option value="all">Tất cả 136 động từ</option></select></label>
    <button class="primary-btn" onclick="v36Start()">Bắt đầu Random →</button>
  </div>
  <div class="v36-examples"><span><b>のんで</b> → ?</span><span><b>のまない</b> → ?</span><span><b>のんだ</b> → ?</span></div>
  <div id="v36-area"></div></section>`;
}

function v36Start(){
  const mode=document.getElementById('v36-mode')?.value||'mixed';
  const group=document.getElementById('v36-group')?.value||'all';
  const count=document.getElementById('v36-count')?.value||'20';
  let pool=[...V29_VERB_APPENDIX];
  if(group!=='all')pool=pool.filter(v=>String(v.group)===group);
  pool=shuffle(pool);
  if(count!=='all')pool=pool.slice(0,Math.min(+count,pool.length));
  v36FormMeaningState={mode,group,count,cards:v36PrepareCards(pool,mode),index:0,revealed:false,remembered:0,forgot:0,forgotten:[],cardStartedAt:Date.now()};
  v36Render();
}

function v36Render(){
  const s=v36FormMeaningState, area=document.getElementById('v36-area');
  if(!s||!area)return; if(s.index>=s.cards.length)return v36Result();
  const v=s.cards[s.index], pct=Math.round(s.index/s.cards.length*100);
  s.revealed=false; s.cardStartedAt=Date.now();
  area.innerHTML=`<div class="v36-session"><div class="v36-top"><div><span>NHÓM ${v.group}</span><b>${escapeHtml(v36ModeLabel(v.flashMode))}</b></div><strong>${s.index+1}/${s.cards.length}</strong></div>
    <div class="progressbar v36-progress"><span style="width:${pct}%"></span></div>
    <button class="v36-flash" onclick="v36Reveal()"><small>MẶT TRƯỚC • ${escapeHtml(v36ModeLabel(v.flashMode))}</small><strong>${escapeHtml(v.front)}</strong><span id="v36-hint">Đoán nghĩa tiếng Việt • bấm để lật</span><div id="v36-answer"></div></button>
    <div id="v36-rate"></div><div class="v36-bottom"><button class="ghost-btn" onclick="v36ShuffleCurrent()">↻ Xáo lại bộ này</button></div></div>`;
}

function v36Reveal(){
  const s=v36FormMeaningState; if(!s||s.revealed)return; s.revealed=true;
  const v=s.cards[s.index];
  const hint=document.getElementById('v36-hint'); if(hint)hint.textContent='ĐÁP ÁN';
  const ans=document.getElementById('v36-answer');
  if(ans)ans.innerHTML=`<div class="v36-meaning"><small>NGHĨA TIẾNG VIỆT</small><b>${escapeHtml(v.meaning||'—')}</b></div>
    <div class="v36-masu"><small>ます-FORM</small><strong>${escapeHtml(v.display||v.masu)}</strong>${v.display!==v.masu?`<em>${escapeHtml(v.masu)}</em>`:''}</div>
    <div class="v36-allforms"><span><small>辞書形</small><b>${escapeHtml(v.dictionary)}</b></span><span><small>て</small><b>${escapeHtml(v.te)}</b></span><span><small>ない</small><b>${escapeHtml(v.nai)}</b></span><span><small>た</small><b>${escapeHtml(v.ta)}</b></span></div>`;
  document.getElementById('v36-rate').innerHTML=`<div class="v36-rate-row"><button class="memory-btn again" onclick="v36Rate(false)">Quên</button><button class="memory-btn good" onclick="v36Rate(true)">Nhớ</button></div>`;
}

function v36Rate(ok){
  const s=v36FormMeaningState; if(!s||!s.revealed)return; const v=s.cards[s.index];
  if(ok)s.remembered++; else{s.forgot++;s.forgotten.push(v);}
  recordRecallEvent({itemKey:recallKey(['v36-form-meaning',v.group,v.masu,v.flashMode]),domain:'vocab',skill:'verb-form-to-meaning',itemLabel:v.front,target:v.meaning,prompt:`${v.front} → nghĩa tiếng Việt?`,selected:ok?'remembered':'forgot',correctAnswer:v.meaning,correct:ok,rating:ok?'good':'again',responseMs:Date.now()-(s.cardStartedAt||Date.now()),source:`V36 • ${v36ModeLabel(v.flashMode)} → nghĩa`,qType:'verb-form-to-meaning-flash',extra:{group:v.group,mode:v.flashMode,masu:v.masu,dictionary:v.dictionary,te:v.te,nai:v.nai,ta:v.ta}});
  s.index++; v36Render();
}
function v36RetryForgotten(){const s=v36FormMeaningState;if(!s?.forgotten?.length)return;s.cards=shuffle([...s.forgotten]);s.index=0;s.revealed=false;s.remembered=0;s.forgot=0;s.forgotten=[];v36Render();}
function v36NewSet(){const s=v36FormMeaningState;if(!s)return;let pool=[...V29_VERB_APPENDIX];if(s.group!=='all')pool=pool.filter(v=>String(v.group)===s.group);pool=shuffle(pool);if(s.count!=='all')pool=pool.slice(0,Math.min(+s.count,pool.length));s.cards=v36PrepareCards(pool,s.mode);s.index=0;s.revealed=false;s.remembered=0;s.forgot=0;s.forgotten=[];v36Render();}
function v36ShuffleCurrent(){const s=v36FormMeaningState;if(!s)return;s.cards=shuffle([...s.cards]);s.index=0;s.revealed=false;s.remembered=0;s.forgot=0;s.forgotten=[];v36Render();}
function v36Result(){const s=v36FormMeaningState,area=document.getElementById('v36-area');if(!s||!area)return;const total=s.cards.length,pct=total?Math.round(s.remembered/total*100):0;area.innerHTML=`<div class="v36-result"><span>変形 → 意味 COMPLETE</span><h2>${s.remembered}/${total}</h2><p>Nhớ <b>${pct}%</b> • Quên ${s.forgot} thẻ.</p><div class="v36-result-actions">${s.forgotten.length?`<button class="primary-btn" onclick="v36RetryForgotten()">Ôn lại ${s.forgotten.length} thẻ quên →</button>`:''}<button class="secondary-btn" onclick="v36NewSet()">Random bộ mới ↻</button><button class="ghost-btn" onclick="openV36FormMeaningFlash()">Đổi chế độ</button></div></div>`;}
const _v36RecallSkillLabel=recallSkillLabel;
recallSkillLabel=function(skill){if(skill==='verb-form-to-meaning')return 'Động từ: て/ない/た → nghĩa';return _v36RecallSkillLabel(skill);};
setTimeout(v36InjectPracticeCard,0);
