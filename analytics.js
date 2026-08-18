/* =========================================================
   V9 — Recall Memory Engine
   Phân tích lỗi + mô hình trí nhớ + lịch ôn thích nghi.
   Toàn bộ dữ liệu chỉ lưu trong localStorage của trình duyệt.
   ========================================================= */
const RECALL_EVENTS_KEY = 'nihongoRecallEventsV9';
const RECALL_MODEL_KEY = 'nihongoRecallModelV9';
const RECALL_MAX_EVENTS = 6000;
const RECALL_INTERVALS_MS = [
  10*60*1000,         // stage 0: 10 phút
  24*60*60*1000,      // stage 1: 1 ngày
  3*24*60*60*1000,    // stage 2: 3 ngày
  7*24*60*60*1000,    // stage 3: 7 ngày
  14*24*60*60*1000,   // stage 4: 14 ngày
  30*24*60*60*1000,   // stage 5: 30 ngày
  60*24*60*60*1000,   // stage 6: 60 ngày
  120*24*60*60*1000   // stage 7: 120 ngày
];
let recallSessionState = null;
let flashRecallStartedAt = Date.now();

function recallClamp(n,min,max){return Math.max(min,Math.min(max,n));}
function recallSafeJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function getRecallEvents(){return recallSafeJSON(RECALL_EVENTS_KEY,[])}
function getRecallModel(){return recallSafeJSON(RECALL_MODEL_KEY,{})}
function saveRecallEvents(events){localStorage.setItem(RECALL_EVENTS_KEY,JSON.stringify(events.slice(-RECALL_MAX_EVENTS)))}
function saveRecallModel(model){localStorage.setItem(RECALL_MODEL_KEY,JSON.stringify(model))}
function recallNow(){return Date.now()}
function recallFmtDate(ts){if(!ts)return 'Chưa có';return new Intl.DateTimeFormat('vi-VN',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(ts))}
function recallFmtDay(ts){return new Intl.DateTimeFormat('vi-VN',{weekday:'short',day:'2-digit',month:'2-digit'}).format(new Date(ts))}
function recallFmtMs(ms){if(ms==null||!isFinite(ms))return '—';return ms<1000?`${Math.round(ms)} ms`:`${(ms/1000).toFixed(ms<10000?1:0)} giây`}
function recallEscape(s){return typeof escapeHtml==='function'?escapeHtml(s):String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function recallHash(str){let h=2166136261;for(const ch of String(str)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return (h>>>0).toString(36)}
function recallKey(parts){return parts.map(x=>String(x??'').replace(/\|/g,'/')).join('|')}
function recallSkillLabel(skill){return ({
  'vocab-meaning':'Từ vựng: Nhật → nghĩa',
  'vocab-reading':'Từ vựng: cách đọc',
  'grammar':'Ngữ pháp',
  'reading-comp':'Đọc hiểu',
  'kanji-shape':'Kanji: phân biệt mặt chữ',
  'kanji-meaning':'Kanji: nghĩa',
  'kanji-reading':'Kanji: cách đọc từ',
  'kanji-on':'Kanji: Onyomi',
  'kanji-kun':'Kanji: Kunyomi',
  'kanji-writing':'Kanji: viết từ Kana',
  'n4-reading':'N4: đọc Kanji',
  'n4-writing':'N4: viết Kanji',
  'n4-meaning':'N4: nghĩa',
  'flash-recall':'Flashcard: nhớ nghĩa',
  'kanjiword-recall':'Flashcard Kanji từ mới',
  'kanji218-recall':'218 Kanji: tự nhớ'
})[skill]||skill||'Khác'}
function recallDomainLabel(domain){return ({vocab:'Từ vựng',grammar:'Ngữ pháp',reading:'Đọc hiểu',kanji:'Kanji',n4:'N4',kanji218:'218 Kanji',flash:'Flashcard'})[domain]||domain||'Khác'}

function recallAutoRating(correct,responseMs,streak=0){
  if(!correct)return 'again';
  if(responseMs!=null && responseMs>12000)return 'hard';
  if(responseMs!=null && responseMs<3500 && streak>=2)return 'easy';
  return 'good';
}
function recallRatingLabel(r){return ({again:'Quên',hard:'Khó',good:'Nhớ',easy:'Rất chắc'})[r]||r}
function recallNextStage(stage,rating){
  stage=Number.isFinite(stage)?stage:0;
  if(rating==='again')return Math.max(0,stage-2);
  if(rating==='hard')return Math.max(0,stage);
  if(rating==='easy')return Math.min(7,stage+2);
  return Math.min(7,stage+1);
}
function recallDueDelay(stage,rating){
  const base=RECALL_INTERVALS_MS[recallClamp(stage,0,7)];
  if(rating==='hard')return Math.max(6*60*60*1000,Math.round(base*.55));
  return base;
}
function recallPredictedRetention(state,now=recallNow()){
  if(!state||!state.lastSeen)return 0;
  const interval=Math.max(10*60*1000,state.scheduledIntervalMs||RECALL_INTERVALS_MS[state.stage||0]);
  const elapsed=Math.max(0,now-state.lastSeen);
  const base=Math.exp(-elapsed/(interval*1.25));
  const quality=.45+(state.strength||0)/180;
  return recallClamp(base*quality*100,0,100);
}
function recallMemoryStrength(state){
  const acc=state.attempts?state.correct/state.attempts:0;
  const speedBonus=state.avgResponseMs?recallClamp((12000-state.avgResponseMs)/12000,0,1)*8:0;
  return Math.round(recallClamp((state.stage||0)*9+acc*42+(state.streak||0)*2.2+speedBonus-(state.lapses||0)*5,0,100));
}
function recallReviewSnapshot(meta){
  const answers=Array.isArray(meta.answers)?[...new Set(meta.answers.filter(Boolean).map(String))]:[];
  return {
    prompt:meta.prompt||'', target:meta.target||'', correctAnswer:String(meta.correctAnswer??''), answers,
    explanation:meta.explanation||'', domain:meta.domain||'', skill:meta.skill||'', source:meta.source||'',
    lesson:meta.lesson??null, itemLabel:meta.itemLabel||meta.target||meta.correctAnswer||'', extra:meta.extra||null
  };
}
function recordRecallEvent(meta){
  const now=meta.ts||recallNow();
  const model=getRecallModel();
  const key=meta.itemKey||recallKey([meta.domain,meta.skill,meta.lesson??'',meta.target||meta.prompt||meta.correctAnswer]);
  const old=model[key]||{
    itemKey:key,domain:meta.domain||'other',skill:meta.skill||'other',lesson:meta.lesson??null,
    itemLabel:meta.itemLabel||meta.target||meta.correctAnswer||key,attempts:0,correct:0,wrong:0,streak:0,lapses:0,
    stage:0,strength:0,totalResponseMs:0,responseCount:0,avgResponseMs:null,confusions:{},createdAt:now
  };
  const correct=!!meta.correct;
  const responseMs=Number.isFinite(meta.responseMs)?Math.max(0,meta.responseMs):null;
  const rating=meta.rating||recallAutoRating(correct,responseMs,old.streak||0);
  old.attempts++;
  if(correct){old.correct++;old.streak=(old.streak||0)+1}else{
    old.wrong++;if((old.stage||0)>0)old.lapses=(old.lapses||0)+1;old.streak=0;
    const selected=String(meta.selected??'');
    if(selected){old.confusions[selected]=(old.confusions[selected]||0)+1;}
  }
  if(responseMs!=null){old.totalResponseMs=(old.totalResponseMs||0)+responseMs;old.responseCount=(old.responseCount||0)+1;old.avgResponseMs=Math.round(old.totalResponseMs/old.responseCount)}
  old.stage=recallNextStage(old.stage||0,rating);
  old.scheduledIntervalMs=recallDueDelay(old.stage,rating);
  old.lastSeen=now;old.lastCorrect=correct;old.lastRating=rating;old.lastSelected=String(meta.selected??'');old.lastCorrectAnswer=String(meta.correctAnswer??'');
  old.dueAt=now+old.scheduledIntervalMs;
  old.domain=meta.domain||old.domain;old.skill=meta.skill||old.skill;old.lesson=meta.lesson??old.lesson;
  old.itemLabel=meta.itemLabel||old.itemLabel;old.source=meta.source||old.source;
  old.review=recallReviewSnapshot(meta);
  old.strength=recallMemoryStrength(old);
  model[key]=old;
  saveRecallModel(model);

  const events=getRecallEvents();
  events.push({
    id:`${now.toString(36)}-${Math.random().toString(36).slice(2,8)}`,ts:now,itemKey:key,domain:old.domain,skill:old.skill,lesson:old.lesson,
    itemLabel:old.itemLabel,prompt:meta.prompt||'',target:meta.target||'',selected:String(meta.selected??''),correctAnswer:String(meta.correctAnswer??''),
    correct,responseMs,rating,source:meta.source||'',qType:meta.qType||'',confidence:meta.confidence??null
  });
  saveRecallEvents(events);
  return old;
}

function rateVocabFlash(lesson,index,rating){
  const l=LESSONS[lesson-1],v=l.vocab[index];
  const all=l.vocab.map(x=>x.vi).filter(x=>x!==v.vi);
  recordRecallEvent({
    itemKey:recallKey(['vocab',lesson,index,'meaning']),domain:'vocab',skill:'flash-recall',lesson,
    itemLabel:v.jp||v.kana,target:v.jp||v.kana,prompt:`Nhớ nghĩa của 「${v.jp||v.kana}」`,selected:recallRatingLabel(rating),
    correctAnswer:v.vi,correct:rating!=='again',rating,responseMs:recallNow()-flashRecallStartedAt,source:'Flashcard Minna',
    answers:[v.vi,...(typeof shuffle==='function'?shuffle(all):all).slice(0,3)],explanation:`${v.kana||v.jp} • ${v.reading||''} • ${v.vi}`
  });
  if(typeof setFlashKnown==='function'){
    const s=getFlashKnown(),key=flashCardKey(lesson,index);if(rating==='good'||rating==='easy')s[key]=true;else if(rating==='again')delete s[key];localStorage.setItem(FLASH_STATE_KEY,JSON.stringify(s));
  }
  flashRecallStartedAt=recallNow();
  renderLessonContent();
}
function rateKanjiWordFlash(lesson,vocabIndex,rating){
  const l=LESSONS[lesson-1],v=l.vocab[vocabIndex];
  const peers=lessonKanjiWords(l).filter(x=>x._vocabIndex!==vocabIndex).map(x=>x.kana||x.jp);
  recordRecallEvent({
    itemKey:recallKey(['kanjiword',lesson,vocabIndex,'reading']),domain:'kanji',skill:'kanjiword-recall',lesson,
    itemLabel:v.jp,target:v.jp,prompt:`Đọc 「${v.jp}」`,selected:recallRatingLabel(rating),correctAnswer:v.kana||v.jp,
    correct:rating!=='again',rating,responseMs:recallNow()-flashRecallStartedAt,source:'Kanji từ mới Minna',
    answers:[v.kana||v.jp,...(typeof shuffle==='function'?shuffle(peers):peers).slice(0,3)],explanation:`${v.jp} • ${v.kana||v.jp} • ${v.vi}`
  });
  if(typeof setKanjiKnown==='function'){
    const s=getKanjiKnown(),key=kanjiWordKey(lesson,vocabIndex);if(rating==='good'||rating==='easy')s[key]=true;else if(rating==='again')delete s[key];localStorage.setItem(KANJI_STATE_KEY,JSON.stringify(s));
  }
  flashRecallStartedAt=recallNow();renderLessonContent();
}
function rateKanji218Flash(kanji,rating){
  const k=typeof getKanji218Item==='function'?getKanji218Item(kanji):KANJI218.find(x=>x.kanji===kanji);
  if(!k)return;
  const peers=KANJI218.filter(x=>x.kanji!==kanji).map(x=>x.meaning);
  recordRecallEvent({
    itemKey:recallKey(['k218',kanji,'meaning']),domain:'kanji218',skill:'kanji218-recall',itemLabel:kanji,target:kanji,
    prompt:`Nhớ nghĩa chính của ${kanji}`,selected:recallRatingLabel(rating),correctAnswer:k.meaning,correct:rating!=='again',rating,
    responseMs:recallNow()-flashRecallStartedAt,source:'218 Kanji',answers:[k.meaning,...(typeof shuffle==='function'?shuffle(peers):peers).slice(0,3)],
    explanation:`${kanji} • ${k.meaning} • On: ${k.on} • Kun: ${k.kun}`
  });
  if(typeof setKanji218Known==='function'){
    const s=getKanji218Known();if(rating==='good'||rating==='easy')s[kanji]=true;else if(rating==='again')delete s[kanji];localStorage.setItem(KANJI218_KNOWN_KEY,JSON.stringify(s));
  }
  flashRecallStartedAt=recallNow();renderKanji218Content();
}
function recallRatingButtons(kind,a,b){
  const fn=kind==='vocab'?`rateVocabFlash(${a},${b},`:kind==='kanjiword'?`rateKanjiWordFlash(${a},${b},`:`rateKanji218Flash('${a}',`;
  return `<div class="recall-rating-wrap"><div class="recall-rating-label">Sau khi tự trả lời rồi lật thẻ, hãy chấm mức nhớ:</div><div class="recall-rating-grid">
    <button class="recall-rate again" onclick="${fn}'again')"><b>1 • Quên</b><small>Ôn lại rất sớm</small></button>
    <button class="recall-rate hard" onclick="${fn}'hard')"><b>2 • Khó</b><small>Nhớ nhưng chậm</small></button>
    <button class="recall-rate good" onclick="${fn}'good')"><b>3 • Nhớ</b><small>Recall được</small></button>
    <button class="recall-rate easy" onclick="${fn}'easy')"><b>4 • Rất chắc</b><small>Tăng khoảng cách</small></button>
  </div></div>`;
}

function getRecallSummary(){
  const now=recallNow(),events=getRecallEvents(),model=getRecallModel(),states=Object.values(model);
  const last7=events.filter(e=>e.ts>=now-7*86400000),today=events.filter(e=>e.ts>=new Date().setHours(0,0,0,0));
  const attempts=last7.length,correct=last7.filter(e=>e.correct).length;
  const due=states.filter(s=>(s.dueAt||0)<=now),fragile=states.filter(s=>s.attempts>=2&&((s.correct/s.attempts)<.7||s.strength<45));
  const avgMs=attempts?Math.round(last7.reduce((a,e)=>a+(e.responseMs||0),0)/Math.max(1,last7.filter(e=>e.responseMs!=null).length)):null;
  const retention=states.length?Math.round(states.reduce((a,s)=>a+recallPredictedRetention(s,now),0)/states.length):0;
  return {now,events,model,states,last7,today,attempts,correct,accuracy:attempts?Math.round(correct/attempts*100):0,due,fragile,avgMs,retention};
}
function recallSkillStats(events,model){
  const by={};
  events.forEach(e=>{const k=e.skill||'other';const x=by[k]||(by[k]={skill:k,attempts:0,correct:0,totalMs:0,msN:0,wrong:0});x.attempts++;if(e.correct)x.correct++;else x.wrong++;if(e.responseMs!=null){x.totalMs+=e.responseMs;x.msN++}});
  Object.values(model).forEach(s=>{const k=s.skill||'other';const x=by[k]||(by[k]={skill:k,attempts:0,correct:0,totalMs:0,msN:0,wrong:0});x.due=(x.due||0)+((s.dueAt||0)<=recallNow()?1:0);x.fragile=(x.fragile||0)+((s.attempts>=2&&s.strength<50)?1:0)});
  return Object.values(by).map(x=>({...x,accuracy:x.attempts?Math.round(x.correct/x.attempts*100):0,avgMs:x.msN?Math.round(x.totalMs/x.msN):null,due:x.due||0,fragile:x.fragile||0})).sort((a,b)=>(a.accuracy-b.accuracy)||(b.attempts-a.attempts));
}
function recallConfusions(events){
  const map={};
  events.filter(e=>!e.correct&&e.selected&&e.correctAnswer&&e.qType!=='active-recall'&&!['flash-recall','kanjiword-recall','kanji218-recall'].includes(e.skill)).forEach(e=>{const k=`${e.selected}|||${e.correctAnswer}|||${e.skill}`;const x=map[k]||(map[k]={selected:e.selected,correct:e.correctAnswer,skill:e.skill,count:0,last:0});x.count++;x.last=Math.max(x.last,e.ts)});
  return Object.values(map).sort((a,b)=>b.count-a.count||b.last-a.last);
}
function recallWeakReason(s,now=recallNow()){
  const reasons=[];const acc=s.attempts?s.correct/s.attempts:0;
  if((s.dueAt||0)<=now)reasons.push('đến hạn');
  if(s.lastCorrect===false)reasons.push('vừa trả lời sai');
  if(s.lapses>=2)reasons.push(`${s.lapses} lần quên lại`);
  if(s.attempts>=2&&acc<.7)reasons.push(`độ chính xác ${Math.round(acc*100)}%`);
  if(s.avgResponseMs>12000)reasons.push('recall chậm');
  if(s.strength<35)reasons.push('memory strength thấp');
  return reasons.slice(0,3).join(' • ')||'cần củng cố';
}
function recallUrgencyScore(s,now=recallNow()){
  const overdue=Math.max(0,now-(s.dueAt||now))/86400000;
  const acc=s.attempts?s.correct/s.attempts:0;
  return (s.dueAt<=now?80:0)+Math.min(40,overdue*10)+(1-acc)*45+(s.lapses||0)*12+(100-(s.strength||0))*.35+(s.lastCorrect===false?30:0)+(s.avgResponseMs>12000?10:0);
}
function recallWeakStates(states,limit=20){return [...states].sort((a,b)=>recallUrgencyScore(b)-recallUrgencyScore(a)).slice(0,limit)}
function recallDueBuckets(states,now=recallNow()){
  const bounds=[
    ['Đến hạn ngay',now],['Trong 24 giờ',now+86400000],['2–3 ngày tới',now+3*86400000],['Trong 7 ngày',now+7*86400000],['Sau 7 ngày',Infinity]
  ];
  const out=[];let prev=-Infinity;
  for(const [label,max] of bounds){const items=states.filter(s=>(s.dueAt||0)>prev&&(s.dueAt||0)<=max);out.push({label,count:items.length,items});prev=max}
  return out;
}
function recallDailyStats(events,days=7){
  const out=[];for(let i=days-1;i>=0;i--){const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-i);const start=d.getTime(),end=start+86400000;const es=events.filter(e=>e.ts>=start&&e.ts<end);out.push({ts:start,label:new Intl.DateTimeFormat('vi-VN',{weekday:'short'}).format(d),attempts:es.length,accuracy:es.length?Math.round(es.filter(e=>e.correct).length/es.length*100):0})}return out;
}
function recallDiagnostic(summary,skills,confusions){
  if(!summary.events.length)return 'Chưa có đủ dữ liệu. Hãy làm trắc nghiệm hoặc chấm mức nhớ trên flashcard; hệ thống sẽ bắt đầu xây mô hình trí nhớ ngay từ câu đầu tiên.';
  const tested=skills.filter(x=>x.attempts>=3),weak=tested[0],strong=[...tested].sort((a,b)=>b.accuracy-a.accuracy)[0];
  const parts=[];
  if(weak)parts.push(`Điểm yếu hiện tại là <b>${recallEscape(recallSkillLabel(weak.skill))}</b> (${weak.accuracy}% đúng, ${weak.wrong} lỗi trong cửa sổ phân tích).`);
  if(strong&&strong!==weak)parts.push(`Kỹ năng ổn nhất là <b>${recallEscape(recallSkillLabel(strong.skill))}</b> (${strong.accuracy}% đúng).`);
  if(confusions[0])parts.push(`Cặp dễ nhầm nổi bật: <b>${recallEscape(confusions[0].selected)} → ${recallEscape(confusions[0].correct)}</b>, đã lặp ${confusions[0].count} lần.`);
  if(summary.fragile.length)parts.push(`${summary.fragile.length} mục đang ở trạng thái <b>fragile</b>: có thể nhận ra nhưng chưa recall ổn định.`);
  if(summary.due.length)parts.push(`Có <b>${summary.due.length}</b> mục đã đến hạn ôn; nên ưu tiên chúng trước khi học thêm nhiều mục mới.`);
  return parts.join(' ');
}
function recallStateStatus(s){
  const now=recallNow();if((s.dueAt||0)<=now)return ['Đến hạn','due'];if(s.strength<35)return ['Yếu','weak'];if(s.strength<65)return ['Đang học','learning'];return ['Ổn định','stable'];
}
function recallPlanText(summary){
  const due=summary.due.length,fragile=summary.fragile.length;
  const session=Math.min(30,Math.max(10,due||Math.min(20,fragile||10)));
  if(!summary.states.length)return {session:10,text:'Bắt đầu bằng 10–15 câu recall. Sau mỗi lần trả lời, hệ thống sẽ tự tạo lịch 10 phút → 1 ngày → 3 ngày → 7 ngày… theo độ chắc của trí nhớ.'};
  return {session,text:`Mỗi lần vào web, làm trước khoảng ${session} mục trong Recall Queue. Sai → quay lại sớm; đúng nhưng chậm → khoảng cách ngắn; đúng nhanh nhiều lần → tự giãn lịch. Sau đó mới học nội dung mới.`};
}

function openRecallLab(){
  if(typeof setNav==='function')setNav('recall');
  const s=getRecallSummary(),skills=recallSkillStats(s.last7,s.model),conf=recallConfusions(s.events),weak=recallWeakStates(s.states,15),buckets=recallDueBuckets(s.states),daily=recallDailyStats(s.events,7),plan=recallPlanText(s);
  const slowCorrect=s.last7.filter(e=>e.correct&&e.responseMs>12000).length;
  const recentWrong=s.last7.filter(e=>!e.correct).length;
  app.innerHTML=`<div class="recall-page">
    <section class="recall-hero"><div><span class="recall-eyebrow">RECALL MEMORY ENGINE V9</span><h1>Phân tích trí nhớ & kế hoạch ôn</h1><p>Không chỉ đếm điểm: hệ thống theo dõi <b>kiểu lỗi</b>, đáp án bạn hay nhầm, tốc độ recall, số lần quên lại, độ bền trí nhớ và thời điểm nên gặp lại từng mục.</p></div><div class="recall-local">🔒 Dữ liệu lưu cục bộ trên thiết bị này</div></section>
    <div class="recall-kpis">
      <article><span>Retention ước tính</span><b>${s.retention}%</b><small>trung bình các mục đã học</small></article>
      <article><span>Đến hạn ngay</span><b>${s.due.length}</b><small>nên ôn trước nội dung mới</small></article>
      <article><span>Accuracy 7 ngày</span><b>${s.accuracy}%</b><small>${s.attempts} lượt trả lời</small></article>
      <article><span>Lỗi 7 ngày</span><b>${recentWrong}</b><small>${slowCorrect} câu đúng nhưng recall chậm</small></article>
      <article><span>Thời gian recall</span><b>${recallFmtMs(s.avgMs)}</b><small>trung bình 7 ngày</small></article>
    </div>
    <section class="panel recall-diagnostic"><div class="section-title"><div><h2>Chẩn đoán hiện tại</h2><p>Hệ thống ưu tiên lỗi lặp lại và recall yếu, không chỉ điểm số cuối bài.</p></div></div><div class="recall-diagnostic-text">${recallDiagnostic(s,skills,conf)}</div></section>

    <section class="recall-grid-2">
      <article class="panel"><div class="section-title"><div><h2>Recall Queue</h2><p>Các mục có nguy cơ quên cao nhất.</p></div><button class="primary-btn" onclick="startRecommendedRecall()" ${weak.length?'':'disabled'}>Ôn theo kế hoạch →</button></div>
        ${weak.length?`<div class="recall-weak-list">${weak.map(x=>{const st=recallStateStatus(x);return `<div class="recall-weak-item"><div class="recall-weak-main"><b>${recallEscape(x.itemLabel||x.review?.itemLabel||x.itemKey)}</b><span>${recallEscape(recallSkillLabel(x.skill))}</span><small>${recallEscape(recallWeakReason(x))}</small></div><div class="recall-strength"><strong>${x.strength||0}</strong><span>strength</span></div><div class="recall-due"><span class="memory-status ${st[1]}">${st[0]}</span><small>${(x.dueAt||0)<=s.now?'Ôn ngay':recallFmtDate(x.dueAt)}</small><button class="recall-detail-btn" onclick="openRecallItem(decodeURIComponent('${encodeURIComponent(x.itemKey)}'))">Chi tiết</button></div></div>`}).join('')}</div>`:`<div class="empty"><p>Chưa có mục yếu. Làm vài bài trắc nghiệm hoặc chấm flashcard để hệ thống có dữ liệu.</p></div>`}
      </article>
      <article class="panel"><div class="section-title"><div><h2>Kế hoạch những lần sau</h2><p>Lịch được tạo từ trạng thái nhớ của từng mục.</p></div></div>
        <div class="recall-plan-lead"><b>Phiên tiếp theo: ~${plan.session} mục</b><p>${plan.text}</p></div>
        <div class="recall-timeline">${buckets.map((b,i)=>`<div><span>${i+1}</span><b>${b.label}</b><small>${b.count} mục</small></div>`).join('')}</div>
        <div class="recall-rule"><b>Quy tắc recall:</b> Quên → ~10 phút • Khó/đúng chậm → cùng ngày • Nhớ → 1–7 ngày • Rất chắc → giãn 14–120 ngày.</div>
      </article>
    </section>

    <section class="panel"><div class="section-title"><div><h2>Sai ở đâu?</h2><p>Ma trận kỹ năng trong 7 ngày gần nhất.</p></div></div>
      ${skills.length?`<div class="recall-skill-table"><div class="recall-skill-head"><b>Kỹ năng</b><b>Lượt</b><b>Đúng</b><b>Recall</b><b>Fragile</b><b>Đến hạn</b></div>${skills.map(x=>`<div class="recall-skill-row"><span>${recallEscape(recallSkillLabel(x.skill))}</span><span>${x.attempts}</span><span><b class="${x.accuracy<60?'bad-txt':x.accuracy>=85?'good-txt':''}">${x.accuracy}%</b><i><em style="width:${x.accuracy}%"></em></i></span><span>${recallFmtMs(x.avgMs)}</span><span>${x.fragile}</span><span>${x.due}</span></div>`).join('')}</div>`:`<div class="empty"><p>Chưa có dữ liệu kỹ năng.</p></div>`}
    </section>

    <section class="recall-grid-2">
      <article class="panel"><div class="section-title"><div><h2>Bản đồ nhầm lẫn</h2><p>Đáp án bạn chọn sai → đáp án đúng.</p></div></div>${conf.length?`<div class="confusion-list">${conf.slice(0,12).map((c,i)=>`<div><span class="conf-rank">${i+1}</span><b>${recallEscape(c.selected)}</b><span>→</span><strong>${recallEscape(c.correct)}</strong><small>${recallEscape(recallSkillLabel(c.skill))}</small><em>${c.count}×</em></div>`).join('')}</div>`:`<div class="empty"><p>Chưa có cặp nhầm lặp lại.</p></div>`}</article>
      <article class="panel"><div class="section-title"><div><h2>7 ngày gần nhất</h2><p>Khối lượng recall và độ chính xác.</p></div></div><div class="recall-week">${daily.map(d=>`<div><b>${d.label}</b><span class="week-bar"><i style="height:${Math.min(100,d.attempts*5)}%"></i></span><strong>${d.attempts}</strong><small>${d.attempts?d.accuracy+'%':'—'}</small></div>`).join('')}</div></article>
    </section>

    <section class="panel recall-method"><div class="section-title"><div><h2>Hệ thống xây recall memory như thế nào?</h2></div><div class="recall-actions"><button class="secondary-btn" onclick="exportRecallData()">Xuất dữ liệu JSON</button><button class="danger-btn" onclick="resetRecallData()">Xóa dữ liệu phân tích</button></div></div>
      <div class="recall-method-grid"><div><b>1. Ghi lỗi thật</b><p>Lưu câu hỏi, lựa chọn sai, đáp án đúng, dạng kỹ năng và thời gian phản hồi.</p></div><div><b>2. Phân biệt “đúng” và “nhớ chắc”</b><p>Đúng nhưng mất >12 giây vẫn được xem là memory fragile và sẽ gặp lại sớm hơn.</p></div><div><b>3. Theo dõi lapse</b><p>Một mục từng ổn mà sau đó sai lại sẽ bị giảm stage mạnh hơn lỗi lần đầu.</p></div><div><b>4. Spaced recall thích nghi</b><p>Khoảng cách tự tăng khi recall nhanh/ổn định và thu ngắn khi quên hoặc nhầm lặp.</p></div></div>
    </section>
  </div>`;
}

function openRecallItem(itemKey){
  if(typeof setNav==='function')setNav('recall');
  const state=getRecallModel()[itemKey];if(!state)return openRecallLab();
  const events=getRecallEvents().filter(e=>e.itemKey===itemKey).sort((a,b)=>b.ts-a.ts),acc=state.attempts?Math.round(state.correct/state.attempts*100):0;
  const conf=recallConfusions(events),st=recallStateStatus(state),ret=Math.round(recallPredictedRetention(state));
  const timeline=events.slice(0,30);
  app.innerHTML=`<div class="breadcrumb"><button onclick="openRecallLab()">Recall Lab</button> › ${recallEscape(state.itemLabel)}</div>
  <section class="recall-item-hero"><div><span class="recall-eyebrow">MEMORY TRACE</span><h1>${recallEscape(state.itemLabel)}</h1><p>${recallEscape(recallSkillLabel(state.skill))}${state.lesson?` • Bài ${state.lesson}`:''} • ${recallEscape(state.source||'')}</p></div><span class="memory-status ${st[1]}">${st[0]}</span></section>
  <div class="recall-item-kpis"><div><span>Accuracy</span><b>${acc}%</b></div><div><span>Strength</span><b>${state.strength||0}</b></div><div><span>Retention</span><b>${ret}%</b></div><div><span>Lapse</span><b>${state.lapses||0}</b></div><div><span>Recall TB</span><b>${recallFmtMs(state.avgResponseMs)}</b></div><div><span>Lần ôn tới</span><b class="small-value">${(state.dueAt||0)<=recallNow()?'Ngay bây giờ':recallFmtDate(state.dueAt)}</b></div></div>
  <section class="recall-grid-2">
    <article class="panel"><h2>Vì sao mục này yếu / mạnh?</h2><div class="recall-item-reason">${recallEscape(recallWeakReason(state))}</div><div class="memory-ladder">${RECALL_INTERVALS_MS.map((_,i)=>`<span class="${i<=state.stage?'passed':''} ${i===state.stage?'current':''}">${i===0?'10m':i===1?'1d':i===2?'3d':i===3?'7d':i===4?'14d':i===5?'30d':i===6?'60d':'120d'}</span>`).join('')}</div><p class="recall-small-note">Stage hiện tại: ${state.stage||0}. Khi trả lời sai, stage có thể lùi; đúng nhanh nhiều lần sẽ nhảy xa hơn.</p>${state.review?`<div class="recall-review-snapshot"><b>Câu recall gần nhất</b><p>${recallEscape(state.review.prompt)}</p><strong>${recallEscape(state.review.correctAnswer)}</strong></div>`:''}<button class="primary-btn" onclick="startRecallSingle(decodeURIComponent('${encodeURIComponent(itemKey)}'))">Ôn mục này ngay →</button></article>
    <article class="panel"><h2>Nhầm với gì?</h2>${conf.length?`<div class="confusion-list">${conf.slice(0,10).map((c,i)=>`<div><span class="conf-rank">${i+1}</span><b>${recallEscape(c.selected)}</b><span>→</span><strong>${recallEscape(c.correct)}</strong><small>${recallEscape(recallSkillLabel(c.skill))}</small><em>${c.count}×</em></div>`).join('')}</div>`:'<div class="empty"><p>Không có cặp đáp án sai cụ thể; nếu đây là flashcard, lỗi có thể đến từ tự đánh giá “Quên/Khó”.</p></div>'}</article>
  </section>
  <section class="panel"><div class="section-title"><div><h2>Lịch sử recall</h2><p>${events.length} lần tương tác được ghi cho mục này.</p></div></div><div class="recall-history"><div class="recall-history-head"><b>Thời gian</b><b>Kết quả</b><b>Đã chọn</b><b>Đúng</b><b>Tốc độ</b><b>Rating</b></div>${timeline.map(e=>`<div class="recall-history-row"><span>${recallFmtDate(e.ts)}</span><span class="${e.correct?'good-txt':'bad-txt'}">${e.correct?'Đúng':'Sai'}</span><span>${recallEscape(e.selected||'—')}</span><span>${recallEscape(e.correctAnswer||'—')}</span><span>${recallFmtMs(e.responseMs)}</span><span>${recallEscape(recallRatingLabel(e.rating))}</span></div>`).join('')}</div></section>`;
}

function recallReviewableStates(){return Object.values(getRecallModel()).filter(s=>s.review&&s.review.prompt&&s.review.correctAnswer&&Array.isArray(s.review.answers)&&s.review.answers.length>=2)}
function startRecommendedRecall(){
  const all=recallReviewableStates(),now=recallNow();
  const due=all.filter(s=>(s.dueAt||0)<=now).sort((a,b)=>recallUrgencyScore(b)-recallUrgencyScore(a));
  const rest=all.filter(s=>(s.dueAt||0)>now).sort((a,b)=>recallUrgencyScore(b)-recallUrgencyScore(a));
  const states=[...due,...rest].slice(0,Math.min(25,Math.max(10,due.length||15)));
  if(!states.length){openRecallLab();return;}
  recallSessionState={states,questions:states.map(s=>({state:s,review:s.review})),index:0,score:0,answered:false,startedAt:recallNow(),wrong:[]};
  renderRecallSession();
}
function startRecallSingle(itemKey){
  const s=getRecallModel()[itemKey];if(!s||!s.review){openRecallLab();return;}recallSessionState={states:[s],questions:[{state:s,review:s.review}],index:0,score:0,answered:false,startedAt:recallNow(),wrong:[]};renderRecallSession();
}
function renderRecallSession(){
  if(typeof setNav==='function')setNav('recall');const s=recallSessionState;if(!s)return openRecallLab();
  if(s.index>=s.questions.length)return renderRecallSessionResult();
  const q=s.questions[s.index],r=q.review,pct=Math.round(s.index/s.questions.length*100);s.questionStartedAt=recallNow();s.revealed=false;s.rated=false;
  app.innerHTML=`<div class="breadcrumb"><button onclick="openRecallLab()">Recall Lab</button> › Active Recall</div><section class="recall-session-card active-recall-card"><div class="recall-session-top"><div><span class="recall-eyebrow">ACTIVE RECALL • KHÔNG NHÌN ĐÁP ÁN</span><h2>${recallEscape(recallSkillLabel(r.skill))}</h2></div><b>${s.index+1}/${s.questions.length}</b></div><div class="progressbar"><span style="width:${pct}%"></span></div><div class="recall-session-meta">${r.lesson?`Bài ${r.lesson} • `:''}${recallEscape(r.source||'Recall Lab')}</div><div class="recall-session-question">${recallEscape(r.prompt)}</div><div class="free-recall-instruction"><span>① Tự nói/viết đáp án trong đầu trước. ② Chỉ sau đó mới hiện đáp án. Không có lựa chọn A/B/C để tránh học bằng nhận diện.</span><button class="primary-btn" onclick="revealRecallAnswer()">Tôi đã recall → Hiện đáp án</button></div><div id="recall-reveal-area"></div></section>`;
}
function revealRecallAnswer(){
  const s=recallSessionState;if(!s||s.revealed)return;s.revealed=true;s.recallMs=recallNow()-s.questionStartedAt;const q=s.questions[s.index],r=q.review,area=document.getElementById('recall-reveal-area');if(!area)return;
  area.innerHTML=`<div class="active-recall-answer"><span>ĐÁP ÁN</span><strong>${recallEscape(r.correctAnswer)}</strong>${r.explanation?`<p>${recallEscape(r.explanation)}</p>`:''}<small>Bạn mất ${recallFmtMs(s.recallMs)} trước khi mở đáp án.</small></div><div class="active-recall-rate-title">Bạn thực sự nhớ ở mức nào?</div><div class="recall-rating-grid active-session-rating"><button class="recall-rate again" onclick="rateRecallSession('again')"><b>1 • Quên</b><small>Không gọi ra được</small></button><button class="recall-rate hard" onclick="rateRecallSession('hard')"><b>2 • Khó</b><small>Nhớ mơ hồ/chậm</small></button><button class="recall-rate good" onclick="rateRecallSession('good')"><b>3 • Nhớ</b><small>Gọi ra đúng</small></button><button class="recall-rate easy" onclick="rateRecallSession('easy')"><b>4 • Rất chắc</b><small>Nhanh & tự tin</small></button></div><div id="active-recall-schedule"></div>`;
}
function rateRecallSession(rating){
  const s=recallSessionState;if(!s||!s.revealed||s.rated)return;s.rated=true;const q=s.questions[s.index],r=q.review,correct=rating!=='again';if(correct)s.score++;else s.wrong.push(q.state.itemKey);
  const state=recordRecallEvent({itemKey:q.state.itemKey,domain:r.domain,skill:r.skill,lesson:r.lesson,itemLabel:r.itemLabel,target:r.target,prompt:r.prompt,selected:recallRatingLabel(rating),correctAnswer:r.correctAnswer,correct,rating,responseMs:s.recallMs,source:'Recall Lab',answers:r.answers,explanation:r.explanation,qType:'active-recall'});
  document.querySelectorAll('.active-session-rating button').forEach(b=>b.disabled=true);
  const box=document.getElementById('active-recall-schedule');if(box)box.innerHTML=`<div class="active-recall-scheduled"><b>${correct?'✓ Đã ghi nhận recall':'↻ Đã ghi nhận quên'}</b><span>Memory strength: ${state.strength}/100 • Lần gặp tiếp: ${recallFmtDate(state.dueAt)}</span><button class="primary-btn" onclick="nextRecallSession()">Câu tiếp theo →</button></div>`;
}
function nextRecallSession(){recallSessionState.index++;recallSessionState.answered=false;renderRecallSession()}
function renderRecallSessionResult(){
  const s=recallSessionState,pct=s.questions.length?Math.round(s.score/s.questions.length*100):0;
  app.innerHTML=`<section class="recall-session-result"><span class="recall-eyebrow">SESSION COMPLETE</span><h1>${s.score}/${s.questions.length}</h1><p>${pct>=90?'Recall rất tốt. Các mục đúng nhanh sẽ được giãn lịch.':pct>=70?'Tốt, nhưng hệ thống đã đưa các mục sai/khó về lịch gần hơn.':'Nên làm lại Recall Queue sau một khoảng nghỉ ngắn; các mục quên đã được ưu tiên lại.'}</p><div><button class="primary-btn" onclick="openRecallLab()">Xem phân tích mới →</button>${s.wrong.length?`<button class="secondary-btn" onclick="startRecommendedRecall()">Ôn tiếp mục yếu</button>`:''}</div></section>`;
}
function exportRecallData(){
  const payload={exportedAt:new Date().toISOString(),events:getRecallEvents(),model:getRecallModel()};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`nihongo-recall-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),5000)
}
function resetRecallData(){if(confirm('Xóa toàn bộ lịch sử trả lời và mô hình recall trên thiết bị này?')){localStorage.removeItem(RECALL_EVENTS_KEY);localStorage.removeItem(RECALL_MODEL_KEY);openRecallLab()}}
