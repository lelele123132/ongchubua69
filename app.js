const app = document.getElementById('app');
const PROGRESS_KEY = 'nihongoN5ProgressV3';
const FLASH_STATE_KEY = 'nihongoN5FlashKnownV3';
const KANJI_STATE_KEY = 'nihongoN5KanjiKnownV4';
let currentLesson = 1, currentTab = 'flash', cardIndex = 0, quizState = null;
let kanjiStudyMode = 'flash', kanjiQuizState = null;
let practiceFlashItems = [], practiceFlashIndex = 0;
let practiceKanjiItems = [], practiceKanjiIndex = 0, practiceActiveMode = '';

const MINNA_SOURCE = {
  label: 'Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2',
  publisher: '3A Corporation'
};

const shuffle = arr => [...arr].sort(() => Math.random() - .5);
const escapeHtml = s => String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function getProgress(){ try{return JSON.parse(localStorage.getItem(PROGRESS_KEY))||{}}catch{return {}} }
function saveProgress(p){ localStorage.setItem(PROGRESS_KEY,JSON.stringify(p)); }
function lessonProgress(id){ const p=getProgress()[id]||{}; return ['flash','vocab','kanji','grammar','quiz','reading'].filter(x=>p[x]).length; }
function markDone(id,type){ const p=getProgress(); p[id]=p[id]||{}; p[id][type]=true; saveProgress(p); }
function getFlashKnown(){ try{return JSON.parse(localStorage.getItem(FLASH_STATE_KEY))||{}}catch{return {}} }
function flashCardKey(lesson,index){ return `${lesson}:${index}`; }
function isFlashKnown(lesson,index){ return !!getFlashKnown()[flashCardKey(lesson,index)]; }
function setFlashKnown(lesson,index,value){
  const s=getFlashKnown(), key=flashCardKey(lesson,index);
  if(value) s[key]=true; else delete s[key];
  localStorage.setItem(FLASH_STATE_KEY,JSON.stringify(s));
  renderLessonContent();
}
function containsKanji(text){ return /[\u3400-\u4DBF\u4E00-\u9FFF々〆ヶ]/.test(String(text||'')); }
function lessonKanjiWords(l){
  return l.vocab.map((v,i)=>({...v,_vocabIndex:i})).filter(v=>containsKanji(v.jp));
}
function getKanjiKnown(){ try{return JSON.parse(localStorage.getItem(KANJI_STATE_KEY))||{}}catch{return {}} }
function kanjiWordKey(lesson,vocabIndex){ return `${lesson}:${vocabIndex}`; }
function isKanjiKnown(lesson,vocabIndex){ return !!getKanjiKnown()[kanjiWordKey(lesson,vocabIndex)]; }
function setKanjiKnown(lesson,vocabIndex,value){
  const s=getKanjiKnown(), key=kanjiWordKey(lesson,vocabIndex);
  if(value) s[key]=true; else delete s[key];
  localStorage.setItem(KANJI_STATE_KEY,JSON.stringify(s));
  renderLessonContent();
}

/* ===== V6: Luyện Kanji khó =====
   - Bẫy hình dạng: thay 1–2 nét bằng Kanji có hình gần giống.
   - Bẫy nghĩa: ưu tiên nghĩa gần nhau trong chính bài.
   - Bẫy cách đọc: ưu tiên cách đọc có độ dài/âm gần nhau trong chính bài.
*/
const KANJI_CONFUSABLES = {
  '人':['入','八'], '入':['人'], '八':['人','入'],
  '大':['太','犬','天'], '太':['大','犬'], '犬':['大','太'],
  '日':['目','白','田'], '目':['日','自'], '白':['日','百'], '田':['日','由','甲'],
  '木':['本','末','未'], '本':['木','末'], '末':['未','本'], '未':['末','朱'],
  '土':['士'], '士':['土'], '千':['干'], '干':['千'],
  '午':['牛'], '牛':['午','生'], '生':['牛','先'],
  '王':['玉'], '玉':['王'], '口':['日','回'], '回':['口','田'],
  '右':['石'], '石':['右'], '左':['在'], '在':['左'],
  '休':['体'], '体':['休'], '待':['持','侍'], '持':['待'], '侍':['待'],
  '間':['問','聞'], '問':['間','聞'], '聞':['間','問'],
  '会':['合','全'], '合':['会','台'], '全':['会'],
  '今':['令'], '令':['今'], '先':['生','洗'], '洗':['先'],
  '学':['字'], '字':['学'], '校':['枚'], '枚':['校'],
  '時':['持'], '持':['時','待'], '行':['何'], '何':['行'],
  '来':['未','米'], '米':['来'], '車':['東'], '東':['車'],
  '電':['雷'], '雷':['電'], '語':['話'], '話':['語'],
  '読':['続'], '続':['読'], '書':['暑'], '暑':['書'],
  '買':['貝'], '貝':['買'], '員':['貝'], '円':['内'], '内':['円'],
  '名':['各'], '各':['名'], '外':['夕'], '夕':['外'],
  '前':['煎'], '後':['復'], '年':['午'], '月':['用'], '用':['月'],
  '男':['勇'], '女':['安'], '子':['了'], '了':['子'],
  '友':['反'], '反':['友'], '父':['文'], '文':['父'],
  '母':['毎'], '毎':['母'], '半':['牛'], '分':['公'], '公':['分'],
  '週':['道'], '道':['週'], '駅':['験'], '験':['駅'],
  '店':['庖'], '屋':['居'], '居':['屋'], '会社':['合社']
};

function getKanjiChars(text){
  return [...String(text||'')].filter(ch=>containsKanji(ch));
}
function uniqueArray(arr){ return [...new Set(arr.filter(x=>x!==undefined && x!==null && String(x).trim()!==''))]; }

function levenshtein(a,b){
  a=String(a||''); b=String(b||'');
  const m=a.length,n=b.length,dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++)dp[i][0]=i;
  for(let j=0;j<=n;j++)dp[0][j]=j;
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){
    dp[i][j]=Math.min(
      dp[i-1][j]+1,
      dp[i][j-1]+1,
      dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1)
    );
  }
  return dp[m][n];
}
function normalizeVi(s){
  return String(s||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[()[\],.;:!?/]/g,' ')
    .replace(/\s+/g,' ').trim();
}
function meaningCategory(s){
  const t=normalizeVi(s);
  const groups=[
    ['nguoi','nhan vien','giao vien','hoc sinh','sinh vien','bac si','ky su','nghien cuu','ban','anh','chi','ong','ba'],
    ['cong ty','truong','benh vien','ngan hang','nha','phong','ga','cua hang','nha hang','van phong','lop'],
    ['gio','phut','ngay','thang','nam','sang','trua','chieu','toi','hom','tuan'],
    ['di','den','ve','an','uong','xem','doc','viet','lam','hoc','nghe','noi','mua','ban','cho','nhan','gui'],
    ['sach','tu dien','bao','tap chi','but','o','tui','xe','tau','dien thoai','may anh']
  ];
  return groups.findIndex(g=>g.some(k=>t.includes(k)));
}
function meaningSimilarity(a,b){
  const x=normalizeVi(a),y=normalizeVi(b);
  const ax=new Set(x.split(' ').filter(Boolean)), by=new Set(y.split(' ').filter(Boolean));
  let common=0; ax.forEach(w=>{if(by.has(w))common++});
  const catA=meaningCategory(x),catB=meaningCategory(y);
  const edit=levenshtein(x,y), maxLen=Math.max(x.length,y.length,1);
  return common*8 + (catA>=0 && catA===catB?6:0) + (1-edit/maxLen)*3 - Math.abs(x.length-y.length)*0.02;
}
function readingSimilarity(a,b){
  a=String(a||''); b=String(b||'');
  const dist=levenshtein(a,b), sameLen=a.length===b.length?4:0;
  const sameStart=a[0]&&a[0]===b[0]?2:0;
  const sameEnd=a[a.length-1]&&a[a.length-1]===b[b.length-1]?2:0;
  return sameLen+sameStart+sameEnd-dist;
}
function confusableChars(ch){ return KANJI_CONFUSABLES[ch]||[]; }

function mutateKanjiWord(word){
  const chars=[...String(word||'')], out=[];
  chars.forEach((ch,i)=>{
    if(!containsKanji(ch))return;
    confusableChars(ch).forEach(rep=>{
      const c=[...chars]; c[i]=rep; out.push(c.join(''));
    });
  });
  // Một số bẫy hai vị trí nếu từ có >= 2 Kanji.
  const positions=chars.map((ch,i)=>containsKanji(ch)?i:-1).filter(i=>i>=0);
  if(positions.length>=2){
    for(let a=0;a<positions.length;a++){
      for(let b=a+1;b<positions.length;b++){
        const i=positions[a],j=positions[b];
        const ri=confusableChars(chars[i])[0], rj=confusableChars(chars[j])[0];
        if(ri&&rj){
          const c=[...chars]; c[i]=ri;c[j]=rj;out.push(c.join(''));
        }
      }
    }
  }
  return uniqueArray(out).filter(x=>x!==word);
}
function visualWordScore(correct,candidate){
  const a=[...String(correct||'')],b=[...String(candidate||'')];
  let score=a.length===b.length?5:0;
  const len=Math.min(a.length,b.length);
  for(let i=0;i<len;i++){
    if(a[i]===b[i])score+=4;
    else if(confusableChars(a[i]).includes(b[i]))score+=5;
  }
  const ak=getKanjiChars(correct),bk=new Set(getKanjiChars(candidate));
  ak.forEach(ch=>{if(bk.has(ch))score+=2});
  score-=Math.abs(a.length-b.length)*2;
  return score;
}
function visualDistractors(v,l){
  const real=lessonKanjiWords(l)
    .filter(x=>x.jp!==v.jp)
    .map(x=>({text:x.jp,score:visualWordScore(v.jp,x.jp)}))
    .sort((a,b)=>b.score-a.score)
    .map(x=>x.text);
  // Ưu tiên 2 bẫy sửa nét + 1 từ thật gần hình dạng trong bài.
  const mutations=shuffle(mutateKanjiWord(v.jp));
  let out=[];
  out.push(...mutations.slice(0,2));
  if(real.length)out.push(real[0]);
  out.push(...mutations.slice(2),...real.slice(1));
  return uniqueArray(out).filter(x=>x!==v.jp).slice(0,3);
}
function hardMeaningDistractors(v,l){
  return uniqueArray(l.vocab.map(x=>x.vi))
    .filter(x=>x!==v.vi)
    .map(x=>({text:x,score:meaningSimilarity(v.vi,x)}))
    .sort((a,b)=>b.score-a.score)
    .slice(0,3).map(x=>x.text);
}
function hardReadingDistractors(v,l){
  const correct=v.kana||v.jp;
  return uniqueArray(l.vocab.map(x=>x.kana||x.jp))
    .filter(x=>x!==correct)
    .map(x=>({text:x,score:readingSimilarity(correct,x)}))
    .sort((a,b)=>b.score-a.score)
    .slice(0,3).map(x=>x.text);
}
function fillToFour(correct,distractors,fallbacks){
  const all=uniqueArray([correct,...distractors,...fallbacks]).filter(Boolean);
  return shuffle(all.slice(0,4));
}
function createKanjiQuestions(lessonIds,count=15){
  let pool=[];
  lessonIds.forEach(id=>{
    const l=LESSONS[id-1], items=lessonKanjiWords(l);
    items.forEach(v=>{
      const shape=visualDistractors(v,l);
      const meaning=hardMeaningDistractors(v,l);
      const reading=hardReadingDistractors(v,l);

      pool.push({
        lesson:id,type:'Nhìn mặt chữ • bẫy 1–2 nét',kind:'shape',
        q:`Từ 「${v.kana||v.jp}」 (${v.vi}) được viết Kanji đúng là?`,
        correct:v.jp,
        answers:fillToFour(v.jp,shape,lessonKanjiWords(l).map(x=>x.jp).filter(x=>x.jp!==v.jp)),
        explanation:`${v.jp} • ${v.kana||v.jp}${v.reading?` • ${v.reading}`:''} • ${v.vi}`
      });

      pool.push({
        lesson:id,type:'Nghĩa gần • dễ nhầm',kind:'meaning',
        q:`「${v.jp}」 có nghĩa đúng là gì?`,
        correct:v.vi,
        answers:fillToFour(v.vi,meaning,l.vocab.map(x=>x.vi).filter(x=>x.vi!==v.vi)),
        explanation:`${v.jp} • ${v.kana||v.jp}${v.reading?` • ${v.reading}`:''}`
      });

      pool.push({
        lesson:id,type:'Cách đọc • âm gần',kind:'reading',
        q:`Cách đọc đúng của 「${v.jp}」 là?`,
        correct:v.kana||v.jp,
        answers:fillToFour(v.kana||v.jp,reading,l.vocab.map(x=>x.kana||x.jp).filter(x=>(x!==(v.kana||v.jp)))),
        explanation:`${v.jp} = ${v.kana||v.jp}${v.reading?` (${v.reading})`:''} • ${v.vi}`
      });
    });
  });
  return shuffle(pool).slice(0,Math.min(count,pool.length));
}

function setNav(name){ document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.nav===name)); }
function vocabSourceNote(l=LESSONS[currentLesson-1]){
  const pages=l && l.sourcePages ? l.sourcePages : [];
  const pageText=pages.length ? ` • trang PDF ${pages[0]}–${pages[pages.length-1]}` : '';
  return `<div class="source-note"><span class="source-icon">本</span><div><b>Nguồn từ vựng:</b> ${MINNA_SOURCE.label}.<small>Đối chiếu từ PDF bạn cung cấp${pageText}. Kanji/Kana được chuẩn hoá để hiển thị rõ trên web; mục Kanji tạo flashcard trực tiếp từ các từ mới có chữ Hán trong bài. Ngữ pháp và bài đọc là nội dung luyện tập của website.</small></div></div>`;
}

function goHome(){
  setNav('home');
  app.innerHTML=`
  <section class="hero">
    <div><h1>日本語を勉強しましょう！</h1>
      <p>Học N5 theo lộ trình 25 bài: flashcard → từ vựng → kanji → ngữ pháp → trắc nghiệm → đọc hiểu. Phần đọc cho phép rê chuột hoặc chạm vào từ Nhật để xem nghĩa tiếng Việt.</p>
      <div class="hero-actions"><button class="primary-btn" onclick="openLesson(1)">Bắt đầu bài 1</button><button class="secondary-btn" onclick="openPractice()">Luyện nhiều bài</button></div>
    </div>
    <div class="stats"><div class="stat"><b>25</b><span>Bài học</span></div><div class="stat"><b>6</b><span>Chế độ / bài</span></div><div class="stat"><b>N5</b><span>Trình độ</span></div><div class="stat"><b>✓</b><span>Lưu tiến độ</span></div></div>
  </section>
  <div class="section-title"><div><h2>Chọn bài để học</h2><p>Bấm vào bất kỳ bài nào để bắt đầu.</p></div></div>
  <section class="lesson-grid">${LESSONS.map(l=>{
    const done=lessonProgress(l.id);
    return `<button class="lesson-card" onclick="openLesson(${l.id})"><span class="lesson-no">${l.id}</span>${done===6?'<span class="lesson-done">✓</span>':''}<h3>${l.title}</h3><p>${l.theme}</p><div class="badges"><span class="badge">Flashcard</span><span class="badge">Kanji</span><span class="badge">Đọc hiểu</span>${done?`<span class="badge">${done}/6 xong</span>`:''}</div></button>`}).join('')}</section>`;
}

function openLesson(id,tab='flash'){
  currentLesson=id; currentTab=tab; cardIndex=0; setNav('');
  const l=LESSONS[id-1];
  app.innerHTML=`<div class="breadcrumb"><button onclick="goHome()">Trang chủ</button> › ${l.title}</div>
  <section class="lesson-head"><small>NIHONGO N5 • BÀI ${l.id}/25</small><h1>${l.title}: ${l.theme}</h1><p>Hoàn thành từng mục để lưu tiến độ trên trình duyệt.</p></section>
  <div class="study-tabs">${tabButton('flash','🃏 Flashcard')}${tabButton('vocab','📘 Từ vựng')}${tabButton('kanji','字 Kanji')}${tabButton('grammar','文 Ngữ pháp')}${tabButton('quiz','✓ Trắc nghiệm')}${tabButton('reading','読 Đọc hiểu')}</div>
  <section class="panel" id="lesson-content"></section>`;
  renderLessonContent();
}
function tabButton(key,label){ return `<button class="study-tab ${currentTab===key?'active':''}" onclick="changeTab('${key}')">${label}</button>`; }
function changeTab(tab){ currentTab=tab; cardIndex=0; if(tab==='kanji')kanjiStudyMode='flash'; openLesson(currentLesson,tab); }
function completeButton(type){ return `<button class="secondary-btn" onclick="markDone(${currentLesson},'${type}');this.textContent='✓ Đã hoàn thành';this.disabled=true">Đánh dấu đã học</button>`; }
function renderLessonContent(){ const box=document.getElementById('lesson-content'),l=LESSONS[currentLesson-1]; ({flash:renderFlash,vocab:renderVocab,kanji:renderKanji,grammar:renderGrammar,quiz:startLessonQuiz,reading:renderReading})[currentTab](box,l); }

function renderFlash(box,l){
  const v=l.vocab[cardIndex];
  const pct=Math.round((cardIndex+1)/l.vocab.length*100);
  const known=isFlashKnown(l.id,cardIndex);
  const hasKanji=v.jp && v.kana && v.jp!==v.kana;
  box.innerHTML=`<div class="flash-shell">
    <div class="flash-heading">
      <div><span class="flash-kicker">BÀI ${l.id} • TỪ VỰNG</span><h2>Flashcard</h2></div>
      <div class="flash-counter"><b>${cardIndex+1}</b><span>/ ${l.vocab.length}</span></div>
    </div>
    <div class="flash-source-chip">📚 Theo PDF Minna no Nihongo bản 2${l.sourcePages?` • trang ${l.sourcePages[0]}–${l.sourcePages[l.sourcePages.length-1]}`:''}</div>
    <div class="flash-area">
      <button class="flashcard" type="button" aria-label="Lật flashcard ${escapeHtml(v.kana||v.jp)}" aria-pressed="false" onclick="this.classList.toggle('flipped');this.setAttribute('aria-pressed',this.classList.contains('flipped'))">
        <span class="flash-inner">
          <span class="flash-face flash-front">
            <span class="flash-side-label">NHẬT → VIỆT</span>
            <span class="flash-kana">${escapeHtml(v.kana||v.jp)}</span>
            ${hasKanji?`<span class="flash-kanji">${escapeHtml(v.jp)}</span>`:''}
            <span class="flash-romaji">${escapeHtml(v.reading||'')}</span>
            <span class="flip-cue"><span>↻</span> Nhấn / Space để xem nghĩa</span>
          </span>
          <span class="flash-face flash-back">
            <span class="flash-side-label">NGHĨA TIẾNG VIỆT</span>
            <span class="meaning">${escapeHtml(v.vi)}</span>
            <span class="back-word">${escapeHtml(v.kana||v.jp)}${hasKanji?` <i>•</i> ${escapeHtml(v.jp)}`:''}<br><small>${escapeHtml(v.reading||'')}</small></span>
            <span class="flip-cue"><span>↻</span> Nhấn / Space để quay lại</span>
          </span>
        </span>
      </button>
    </div>
    <div class="flash-progress-meta"><span>Tiến độ bộ thẻ</span><b>${pct}%</b></div>
    <div class="progressbar"><span style="width:${pct}%"></span></div>
    <div class="flash-actions">
      <button class="secondary-btn flash-nav-btn" onclick="prevCard()">← Trước</button>
      <button class="memory-btn ${known?'known':''}" onclick="setFlashKnown(${l.id},${cardIndex},${!known})">${known?'✓ Đã nhớ':'☆ Đánh dấu đã nhớ'}</button>
      <button class="primary-btn flash-nav-btn" onclick="nextCard()">Tiếp →</button>
    </div>
    <div class="flash-shortcuts">← → đổi thẻ • Space lật thẻ</div>
    <div class="flash-complete">${completeButton('flash')}</div>
  </div>`;
}
function prevCard(){ const l=LESSONS[currentLesson-1]; cardIndex=(cardIndex-1+l.vocab.length)%l.vocab.length; renderLessonContent(); }
function nextCard(){ const l=LESSONS[currentLesson-1]; cardIndex=(cardIndex+1)%l.vocab.length; renderLessonContent(); }
function vocabRow(v,lesson=''){
  return `<div class="vocab-row" data-search="${escapeHtml(`${v.jp} ${v.kana||''} ${v.reading||''} ${v.vi}`.toLowerCase())}">
    <strong>${escapeHtml(v.jp)}</strong>
    <span class="vocab-kana">${escapeHtml(v.kana||v.jp)}</span>
    <small>${escapeHtml(v.reading||'')}</small>
    <span>${escapeHtml(v.vi)}${lesson?` <em>• Bài ${lesson}</em>`:''}</span>
  </div>`;
}
function filterVocab(input){
  const q=input.value.trim().toLowerCase();
  input.closest('.vocab-wrap').querySelectorAll('.vocab-row').forEach(row=>row.hidden=q&&!row.dataset.search.includes(q));
}
function renderVocab(box,l){
  box.innerHTML=`<div class="section-title"><div><h2>Từ vựng ${l.title}</h2><p>${l.vocab.length} mục từ/biểu đạt được đưa vào bộ học.</p></div>${completeButton('vocab')}</div>
  ${vocabSourceNote(l)}
  <div class="vocab-wrap"><div class="vocab-toolbar"><input class="vocab-search" type="search" placeholder="Tìm Kanji, Kana, romaji hoặc nghĩa Việt…" oninput="filterVocab(this)" aria-label="Tìm từ vựng"></div>
  <div class="vocab-table"><div class="vocab-head"><b>Kanji / từ Nhật</b><b>Kana</b><b>Romaji</b><b>Nghĩa Việt</b></div>${l.vocab.map(v=>vocabRow(v)).join('')}</div></div>`;
}
function renderKanji(box,l){
  const items=lessonKanjiWords(l);
  box.innerHTML=`<div class="kanji-mode-bar">
    <div>
      <span class="flash-kicker">BÀI ${l.id} • KANJI TỪ MỚI</span>
      <h2>Học & luyện Kanji</h2>
      <p>Kanji chỉ lấy từ những từ mới có chữ Hán trong chính bài này.</p>
    </div>
    <div class="kanji-mode-switch" role="tablist">
      <button class="${kanjiStudyMode==='flash'?'active':''}" onclick="setKanjiStudyMode('flash')">🃏 Flashcard</button>
      <button class="${kanjiStudyMode==='quiz'?'active hard':''}" onclick="setKanjiStudyMode('quiz')">⚔ Luyện Kanji khó</button>
    </div>
  </div>
  <div class="hard-kanji-note"><b>Chế độ khó:</b> bẫy mặt chữ thay 1–2 nét, nghĩa gần nhau và cách đọc gần giống. Với câu “mặt chữ”, một số phương án sai là chữ ghép bẫy để luyện phân biệt nét và không được xem là từ mới của bài.</div>
  <div id="kanji-study-content"></div>`;
  const content=document.getElementById('kanji-study-content');
  if(!items.length){
    content.innerHTML=`<div class="empty"><p>Bài này chưa có từ mới chứa Kanji trong dữ liệu hiện tại.</p>${completeButton('kanji')}</div>`;
    return;
  }
  if(kanjiStudyMode==='quiz') beginKanjiQuiz(content,[l.id],Math.min(15,items.length*3),'lesson');
  else renderKanjiFlash(content,l);
}
function setKanjiStudyMode(mode){
  kanjiStudyMode=mode; cardIndex=0; kanjiQuizState=null; renderLessonContent();
}
function renderKanjiFlash(box,l){
  const items=lessonKanjiWords(l);
  cardIndex=(cardIndex+items.length)%items.length;
  const v=items[cardIndex], pct=Math.round((cardIndex+1)/items.length*100);
  const known=isKanjiKnown(l.id,v._vocabIndex);
  const cls=String(v.jp).length>=7?'kanji-word-compact':String(v.jp).length>=4?'kanji-word-medium':'';
  box.innerHTML=`<div class="flash-shell kanji-flash-shell">
    <div class="flash-heading">
      <div><span class="flash-kicker">BÀI ${l.id} • KANJI TỪ MỚI</span><h2>Kanji Flashcard</h2><p class="kanji-flash-sub">Nhìn mặt chữ trước, lật thẻ để xem cách đọc và nghĩa.</p></div>
      <div class="flash-counter"><b>${cardIndex+1}</b><span>/ ${items.length}</span></div>
    </div>
    <div class="flash-source-chip">📚 Lọc từ ${l.vocab.length} mục từ của Bài ${l.id} • ${items.length} từ có Kanji${l.sourcePages?` • PDF trang ${l.sourcePages[0]}–${l.sourcePages[l.sourcePages.length-1]}`:''}</div>
    <div class="flash-area">
      <button class="flashcard kanji-flashcard" type="button" aria-label="Lật thẻ Kanji ${escapeHtml(v.jp)}" aria-pressed="false" onclick="this.classList.toggle('flipped');this.setAttribute('aria-pressed',this.classList.contains('flipped'))">
        <span class="flash-inner">
          <span class="flash-face flash-front kanji-flash-front">
            <span class="flash-side-label">KANJI → CÁCH ĐỌC</span>
            <span class="kanji-word-front ${cls}">${escapeHtml(v.jp)}</span>
            <span class="kanji-front-hint">Bạn đọc từ này như thế nào?</span>
            <span class="flip-cue"><span>↻</span> Nhấn / Space để xem đáp án</span>
          </span>
          <span class="flash-face flash-back kanji-flash-back">
            <span class="flash-side-label">CÁCH ĐỌC & NGHĨA</span>
            <span class="kanji-answer-kana">${escapeHtml(v.kana||v.jp)}</span>
            <span class="kanji-answer-romaji">${escapeHtml(v.reading||'')}</span>
            <span class="kanji-answer-meaning">${escapeHtml(v.vi)}</span>
            <span class="kanji-answer-word">${escapeHtml(v.jp)}</span>
            <span class="flip-cue"><span>↻</span> Nhấn / Space để quay lại</span>
          </span>
        </span>
      </button>
    </div>
    <div class="flash-progress-meta"><span>Tiến độ bộ Kanji của bài</span><b>${pct}%</b></div>
    <div class="progressbar"><span style="width:${pct}%"></span></div>
    <div class="flash-actions">
      <button class="secondary-btn flash-nav-btn" onclick="prevKanjiCard()">← Trước</button>
      <button class="memory-btn ${known?'known':''}" onclick="setKanjiKnown(${l.id},${v._vocabIndex},${!known})">${known?'✓ Đã nhớ':'☆ Đánh dấu đã nhớ'}</button>
      <button class="primary-btn flash-nav-btn" onclick="nextKanjiCard()">Tiếp →</button>
    </div>
    <div class="flash-shortcuts">← → đổi thẻ • Space lật thẻ</div>
    <div class="flash-complete">${completeButton('kanji')}</div>
  </div>`;
}
function prevKanjiCard(){ const items=lessonKanjiWords(LESSONS[currentLesson-1]); if(!items.length)return; cardIndex=(cardIndex-1+items.length)%items.length; renderLessonContent(); }
function nextKanjiCard(){ const items=lessonKanjiWords(LESSONS[currentLesson-1]); if(!items.length)return; cardIndex=(cardIndex+1)%items.length; renderLessonContent(); }

function beginKanjiQuiz(box,lessonIds,count=15,context='lesson'){
  kanjiQuizState={
    questions:createKanjiQuestions(lessonIds,count),
    index:0,score:0,answered:false,
    container:box.id,
    context,
    lessonIds:[...lessonIds]
  };
  renderKanjiQuiz(box);
}
function renderKanjiQuiz(box){
  const s=kanjiQuizState;
  if(!s || !box)return;
  if(s.index>=s.questions.length){
    if(s.context==='lesson')markDone(currentLesson,'kanji');
    const pct=s.questions.length?Math.round(s.score/s.questions.length*100):0;
    box.innerHTML=`<div class="kanji-quiz-finish">
      <div class="hard-badge">⚔ KANJI HARD</div>
      <h2>Hoàn thành luyện Kanji</h2>
      <div class="kanji-score">${s.score}<small>/${s.questions.length}</small></div>
      <p>${pct>=85?'Khả năng phân biệt Kanji rất tốt.':pct>=65?'Khá tốt. Hãy làm lại để giảm nhầm nét và nhầm nghĩa.':'Nên xem lại Kanji Flashcard rồi thử lại chế độ khó.'}</p>
      <button class="primary-btn" onclick="restartKanjiQuiz()">Làm lại bộ khó ↻</button>
    </div>`;
    return;
  }
  const q=s.questions[s.index];
  box.innerHTML=`<div class="quiz-box kanji-hard-quiz">
    <div class="hard-quiz-header"><span class="hard-badge">⚔ KANJI HARD</span><span>Câu ${s.index+1}/${s.questions.length}</span></div>
    <div class="question-meta">Bài ${q.lesson} • ${escapeHtml(q.type)}</div>
    <div class="question kanji-question">${escapeHtml(q.q)}</div>
    <div class="answers kanji-hard-answers">${q.answers.map((a,i)=>`<button class="answer kanji-hard-answer" data-answer="${escapeHtml(a)}" onclick="answerKanjiQuiz(this,${i})"><span class="choice-letter">${String.fromCharCode(65+i)}</span><span>${escapeHtml(a)}</span></button>`).join('')}</div>
    <div id="kanji-quiz-feedback"></div>
  </div>`;
}
function answerKanjiQuiz(btn,i){
  const s=kanjiQuizState;
  if(!s || s.answered)return;
  s.answered=true;
  const q=s.questions[s.index], selected=q.answers[i];
  document.querySelectorAll('.kanji-hard-answer').forEach(b=>{if(b.dataset.answer===q.correct)b.classList.add('correct')});
  if(selected===q.correct)s.score++; else btn.classList.add('wrong');
  const note=q.kind==='shape'
    ? '<small>💡 Bẫy hình dạng được tạo bằng cách đổi một vài nét/chữ gần hình để buộc bạn nhìn kỹ mặt Kanji.</small>'
    : q.kind==='meaning'
      ? '<small>💡 Các nghĩa sai được ưu tiên chọn từ những nghĩa gần nhau trong chính bài.</small>'
      : '<small>💡 Các cách đọc sai được ưu tiên chọn từ những từ có âm/độ dài gần nhau trong chính bài.</small>';
  document.getElementById('kanji-quiz-feedback').innerHTML=`<div class="feedback hard-feedback">
    <b>${selected===q.correct?'✓ Chính xác':'✗ Đáp án đúng: '+escapeHtml(q.correct)}</b>
    <span>${escapeHtml(q.explanation||'')}</span>${note}
  </div><div style="text-align:right;margin-top:12px"><button class="primary-btn" onclick="nextKanjiQuizQuestion()">Câu tiếp theo →</button></div>`;
}
function nextKanjiQuizQuestion(){
  if(!kanjiQuizState)return;
  kanjiQuizState.index++;kanjiQuizState.answered=false;
  renderKanjiQuiz(document.getElementById(kanjiQuizState.container));
}
function restartKanjiQuiz(){
  if(!kanjiQuizState)return;
  const ids=[...kanjiQuizState.lessonIds], context=kanjiQuizState.context;
  const count=context==='lesson'?Math.min(15,lessonKanjiWords(LESSONS[currentLesson-1]).length*3):20;
  beginKanjiQuiz(document.getElementById(kanjiQuizState.container),ids,count,context);
}

function renderGrammar(box,l){ box.innerHTML=`<div class="section-title"><div><h2>Ngữ pháp ${l.title}</h2><p>Mẫu câu, giải thích và ví dụ.</p></div>${completeButton('grammar')}</div>${l.grammar.map(g=>`<article class="grammar-card"><h3>${g.pattern}</h3><p>${g.meaning}</p><div class="example"><b>Ví dụ:</b> ${g.example}<br><small>${g.translation}</small></div></article>`).join('')}`; }

function createQuestions(lessonIds,count=15){
  let pool=[];
  lessonIds.forEach(id=>{
    const l=LESSONS[id-1];

    // Từ vựng: 3 đáp án nhiễu chỉ lấy từ chính bài đang hỏi.
    const lessonMeanings=[...new Set(l.vocab.map(x=>x.vi).filter(Boolean))];
    l.vocab.forEach(v=>{
      const distractors=shuffle(lessonMeanings.filter(m=>m!==v.vi)).slice(0,3);
      pool.push({
        lesson:id,
        type:'Từ vựng',
        q:`「${v.jp}」 nghĩa là gì?`,
        correct:v.vi,
        answers:shuffle([v.vi,...distractors])
      });
    });

    // Ngữ pháp: các lựa chọn sai cũng chỉ lấy trong phần ngữ pháp của chính bài.
    const lessonGrammarMeanings=[...new Set(l.grammar.map(x=>x.meaning).filter(Boolean))];
    l.grammar.forEach(g=>{
      const distractors=shuffle(lessonGrammarMeanings.filter(m=>m!==g.meaning)).slice(0,3);
      pool.push({
        lesson:id,
        type:'Ngữ pháp',
        q:`Mẫu 「${g.pattern}」 dùng để diễn đạt ý nào?`,
        correct:g.meaning,
        answers:shuffle([g.meaning,...distractors])
      });
    });
  });
  return shuffle(pool).slice(0,Math.min(count,pool.length));
}
function startLessonQuiz(box,l){ quizState={questions:createQuestions([l.id],12),index:0,score:0,answered:false,container:'lesson-content',lessonQuiz:true}; renderQuiz(box); }
function renderQuiz(box){
  if(quizState.index>=quizState.questions.length){ if(quizState.lessonQuiz) markDone(currentLesson,'quiz'); box.innerHTML=`<div class="quiz-box" style="text-align:center"><h2>Hoàn thành 🎉</h2><p style="font-size:30px"><b>${quizState.score}/${quizState.questions.length}</b></p><p>${quizState.score>=quizState.questions.length*.8?'Rất tốt! Hãy chuyển sang đọc hiểu hoặc bài tiếp theo.':'Hãy xem lại flashcard và thử lại nhé.'}</p><button class="primary-btn" onclick="${quizState.lessonQuiz?"renderLessonContent()":"startMixedPractice('quiz')"}">Làm lại</button></div>`; return; }
  const q=quizState.questions[quizState.index];
  box.innerHTML=`<div class="quiz-box"><div class="question-meta">Câu ${quizState.index+1}/${quizState.questions.length} • Bài ${q.lesson} • ${q.type}</div><div class="question">${q.q}</div><div class="answers">${q.answers.map((a,i)=>`<button class="answer" data-answer="${escapeHtml(a)}" onclick="answerQuiz(this,${i})">${String.fromCharCode(65+i)}. ${escapeHtml(a)}</button>`).join('')}</div><div id="quiz-feedback"></div></div>`;
}
function answerQuiz(btn,i){
  if(quizState.answered)return; quizState.answered=true; const q=quizState.questions[quizState.index],selected=q.answers[i];
  document.querySelectorAll('.answer').forEach(b=>{ if(b.dataset.answer===q.correct)b.classList.add('correct'); });
  if(selected===q.correct)quizState.score++; else btn.classList.add('wrong');
  document.getElementById('quiz-feedback').innerHTML=`<div class="feedback">${selected===q.correct?'✓ Chính xác':'✗ Đáp án đúng: '+escapeHtml(q.correct)}</div><div style="text-align:right;margin-top:12px"><button class="primary-btn" onclick="nextQuizQuestion()">Câu tiếp theo →</button></div>`;
}
function nextQuizQuestion(){ quizState.index++; quizState.answered=false; renderQuiz(document.getElementById(quizState.container)); }

function renderReadingTokens(tokens){ return tokens.map(t=> typeof t==='string'?escapeHtml(t):`<span class="word" tabindex="0" data-vi="${escapeHtml(t.vi)}" onclick="toggleTip(this)">${escapeHtml(t.jp)}</span>`).join(''); }
function toggleTip(el){ document.querySelectorAll('.word.show-tip').forEach(x=>{if(x!==el)x.classList.remove('show-tip')}); el.classList.toggle('show-tip'); }
function renderReading(box,l){
  box.innerHTML=`<div class="reading-wrap"><div class="section-title"><div><h2>Đọc hiểu ${l.title}</h2><p>Đọc đoạn văn rồi trả lời câu hỏi.</p></div>${completeButton('reading')}</div><div class="reading-note">💡 Rê chuột vào từ có gạch chấm để xem nghĩa tiếng Việt. Trên điện thoại, chạm vào từ để bật/tắt nghĩa.</div><div class="reading-text">${renderReadingTokens(l.reading.tokens)}</div><div class="reading-questions"><h3>Câu hỏi đọc hiểu</h3>${l.reading.questions.map((q,qi)=>`<div class="reading-q"><h4>${qi+1}. ${q.q}</h4>${shuffle(q.answers).map(a=>`<button class="mini-answer" data-correct="${a===q.correct}" onclick="answerReading(this)">${a}</button>`).join('')}<div class="reading-feedback"></div></div>`).join('')}</div></div>`;
}
function answerReading(btn){ const wrap=btn.closest('.reading-q'); if(wrap.dataset.done)return; wrap.dataset.done='1'; wrap.querySelectorAll('.mini-answer').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct')}); if(btn.dataset.correct!=='true')btn.classList.add('wrong'); wrap.querySelector('.reading-feedback').innerHTML=`<small style="color:var(--muted)">${btn.dataset.correct==='true'?'✓ Đúng':'✗ Xem đáp án được đánh dấu màu xanh.'}</small>`; }

function openPractice(){
  setNav('practice');
  app.innerHTML=`<div class="section-title"><div><h2>Luyện tập tổng hợp</h2><p>Chọn bài 1, 2, 3… tùy ý hoặc chọn tất cả 25 bài.</p></div></div><section class="panel">
  <h3>1. Chọn phạm vi bài</h3><div class="toolbar"><button class="secondary-btn" onclick="selectAllLessons(true)">✓ Chọn tất cả</button><button class="ghost-btn" onclick="selectAllLessons(false)">Bỏ chọn</button><button class="ghost-btn" onclick="selectFirstLessons(3)">Chọn bài 1–3</button><button class="ghost-btn" onclick="selectFirstLessons(5)">Chọn bài 1–5</button></div>
  <div class="practice-options">${LESSONS.map(l=>`<span class="lesson-check"><input type="checkbox" id="p${l.id}" value="${l.id}"><label for="p${l.id}">Bài ${l.id}</label></span>`).join('')}</div>
  <hr class="divider"><h3>2. Chọn dạng luyện tập</h3><div class="mode-grid">
    <button class="mode-card" onclick="startMixedPractice('quiz')"><h3>✓ Trắc nghiệm</h3><p>Trộn từ vựng và ngữ pháp của các bài đã chọn.</p></button>
    <button class="mode-card" onclick="startMixedPractice('flash')"><h3>🃏 Flashcard</h3><p>Ôn từ vựng nhiều bài liên tục.</p></button>
    <button class="mode-card" onclick="startMixedPractice('vocab')"><h3>📘 Từ vựng</h3><p>Danh sách từ của toàn bộ phạm vi.</p></button>
    <button class="mode-card" onclick="startMixedPractice('kanji')"><h3>字 Kanji Flashcard</h3><p>Ôn các từ mới có Kanji của những bài đã chọn.</p></button>
    <button class="mode-card hard-mode-card" onclick="startMixedPractice('kanjiQuiz')"><h3>⚔ Luyện Kanji khó</h3><p>Bẫy 1–2 nét, nghĩa gần và cách đọc gần giống.</p></button>
    <button class="mode-card" onclick="startMixedPractice('grammar')"><h3>文 Ngữ pháp</h3><p>Ôn nhanh mẫu ngữ pháp.</p></button>
    <button class="mode-card" onclick="startMixedPractice('reading')"><h3>読 Đọc hiểu</h3><p>Đọc ngẫu nhiên bài đã chọn và trả lời câu hỏi.</p></button>
  </div><div id="practice-result"></div></section>`;
}
function selectedLessons(){ return [...document.querySelectorAll('.lesson-check input:checked')].map(x=>+x.value); }
function selectAllLessons(v){ document.querySelectorAll('.lesson-check input').forEach(x=>x.checked=v); }
function selectFirstLessons(n){ document.querySelectorAll('.lesson-check input').forEach(x=>x.checked=+x.value<=n); }
function ensureSelection(){ const ids=selectedLessons(),r=document.getElementById('practice-result'); if(!ids.length){r.innerHTML='<p style="color:var(--bad);font-weight:700">Hãy chọn ít nhất một bài trước.</p>';return null} return ids; }
function startMixedPractice(mode){
  const ids=ensureSelection(); if(!ids)return; practiceActiveMode=mode; const r=document.getElementById('practice-result'); r.innerHTML='<hr class="divider">';
  if(mode==='quiz'){ r.innerHTML+='<div id="practice-quiz"></div>'; quizState={questions:createQuestions(ids,20),index:0,score:0,answered:false,container:'practice-quiz',lessonQuiz:false}; renderQuiz(document.getElementById('practice-quiz')); }
  if(mode==='vocab'){ const items=ids.flatMap(id=>LESSONS[id-1].vocab.map(v=>({...v,lesson:id}))); r.innerHTML+=`<div class="vocab-wrap"><div class="section-title"><div><h2>Từ vựng đã chọn</h2><p>${items.length} mục từ từ ${ids.length} bài.</p></div></div><div class="vocab-toolbar"><input class="vocab-search" type="search" placeholder="Tìm Kanji, Kana, romaji hoặc nghĩa Việt…" oninput="filterVocab(this)"></div><div class="vocab-table"><div class="vocab-head"><b>Kanji / từ Nhật</b><b>Kana</b><b>Romaji</b><b>Nghĩa Việt</b></div>${items.map(v=>vocabRow(v,v.lesson)).join('')}</div></div>`; }
  if(mode==='kanji'){ practiceKanjiItems=shuffle(ids.flatMap(id=>lessonKanjiWords(LESSONS[id-1]).map(v=>({...v,lesson:id})))); practiceKanjiIndex=0; renderPracticeKanjiFlash(); }
  if(mode==='kanjiQuiz'){
    r.innerHTML+='<div id="practice-kanji-quiz"></div>';
    beginKanjiQuiz(document.getElementById('practice-kanji-quiz'),ids,20,'practice');
  }
  if(mode==='grammar'){ const items=ids.flatMap(id=>LESSONS[id-1].grammar.map(g=>({...g,lesson:id}))); r.innerHTML+=`<h2>Ngữ pháp đã chọn</h2>${items.map(g=>`<article class="grammar-card"><small>Bài ${g.lesson}</small><h3>${g.pattern}</h3><p>${g.meaning}</p><div class="example">${g.example}<br><small>${g.translation}</small></div></article>`).join('')}`; }
  if(mode==='flash'){ practiceFlashItems=shuffle(ids.flatMap(id=>LESSONS[id-1].vocab.map(v=>({...v,lesson:id}))));practiceFlashIndex=0;renderPracticeFlash(); }
  if(mode==='reading'){ const lesson=LESSONS[shuffle(ids)[0]-1]; r.innerHTML+=`<div class="reading-wrap"><h2>Đọc hiểu ngẫu nhiên • Bài ${lesson.id}</h2><div class="reading-note">Rê chuột/chạm vào từ có gạch chấm để xem nghĩa Việt.</div><div class="reading-text">${renderReadingTokens(lesson.reading.tokens)}</div><div class="reading-questions">${lesson.reading.questions.map((q,qi)=>`<div class="reading-q"><h4>${qi+1}. ${q.q}</h4>${shuffle(q.answers).map(a=>`<button class="mini-answer" data-correct="${a===q.correct}" onclick="answerReading(this)">${a}</button>`).join('')}<div class="reading-feedback"></div></div>`).join('')}</div><div class="card-controls"><button class="primary-btn" onclick="startMixedPractice('reading')">Đổi bài đọc ↻</button></div></div>`; }
}
function renderPracticeFlash(){
  const r=document.getElementById('practice-result'),v=practiceFlashItems[practiceFlashIndex];
  const pct=Math.round((practiceFlashIndex+1)/practiceFlashItems.length*100);
  const hasKanji=v.jp && v.kana && v.jp!==v.kana;
  const sourceLesson=LESSONS[v.lesson-1];
  r.innerHTML=`<hr class="divider"><div class="flash-shell"><div class="flash-heading"><div><span class="flash-kicker">BÀI ${v.lesson} • LUYỆN TỔNG HỢP</span><h2>Flashcard</h2></div><div class="flash-counter"><b>${practiceFlashIndex+1}</b><span>/ ${practiceFlashItems.length}</span></div></div>
  <div class="flash-source-chip">📚 Theo PDF Minna no Nihongo bản 2${sourceLesson.sourcePages?` • bài ${v.lesson}, trang ${sourceLesson.sourcePages[0]}–${sourceLesson.sourcePages[sourceLesson.sourcePages.length-1]}`:''}</div>
  <div class="flash-area"><button class="flashcard" type="button" aria-label="Lật flashcard ${escapeHtml(v.kana||v.jp)}" aria-pressed="false" onclick="this.classList.toggle('flipped');this.setAttribute('aria-pressed',this.classList.contains('flipped'))"><span class="flash-inner"><span class="flash-face flash-front"><span class="flash-side-label">NHẬT → VIỆT</span><span class="flash-kana">${escapeHtml(v.kana||v.jp)}</span>${hasKanji?`<span class="flash-kanji">${escapeHtml(v.jp)}</span>`:''}<span class="flash-romaji">${escapeHtml(v.reading||'')}</span><span class="flip-cue"><span>↻</span> Nhấn / Space để xem nghĩa</span></span><span class="flash-face flash-back"><span class="flash-side-label">NGHĨA TIẾNG VIỆT</span><span class="meaning">${escapeHtml(v.vi)}</span><span class="back-word">${escapeHtml(v.kana||v.jp)}${hasKanji?` <i>•</i> ${escapeHtml(v.jp)}`:''}<br><small>${escapeHtml(v.reading||'')}</small></span><span class="flip-cue"><span>↻</span> Nhấn / Space để quay lại</span></span></span></button></div>
  <div class="flash-progress-meta"><span>Tiến độ bộ thẻ</span><b>${pct}%</b></div><div class="progressbar"><span style="width:${pct}%"></span></div>
  <div class="flash-actions"><button class="secondary-btn flash-nav-btn" onclick="practiceFlashIndex=(practiceFlashIndex-1+practiceFlashItems.length)%practiceFlashItems.length;renderPracticeFlash()">← Trước</button><button class="primary-btn flash-nav-btn" onclick="practiceFlashIndex=(practiceFlashIndex+1)%practiceFlashItems.length;renderPracticeFlash()">Tiếp →</button></div><div class="flash-shortcuts">← → đổi thẻ • Space lật thẻ</div></div>`;
}

function renderPracticeKanjiFlash(){
  const r=document.getElementById('practice-result');
  if(!practiceKanjiItems.length){ r.innerHTML='<hr class="divider"><div class="empty"><p>Không có từ mới chứa Kanji trong các bài đã chọn.</p></div>'; return; }
  const v=practiceKanjiItems[practiceKanjiIndex], pct=Math.round((practiceKanjiIndex+1)/practiceKanjiItems.length*100);
  const cls=String(v.jp).length>=7?'kanji-word-compact':String(v.jp).length>=4?'kanji-word-medium':'';
  r.innerHTML=`<hr class="divider"><div class="flash-shell kanji-flash-shell"><div class="flash-heading"><div><span class="flash-kicker">BÀI ${v.lesson} • KANJI TỔNG HỢP</span><h2>Kanji Flashcard</h2><p class="kanji-flash-sub">Từ mới có Kanji trong phạm vi bài bạn đã chọn.</p></div><div class="flash-counter"><b>${practiceKanjiIndex+1}</b><span>/ ${practiceKanjiItems.length}</span></div></div>
  <div class="flash-area"><button class="flashcard kanji-flashcard" type="button" aria-label="Lật thẻ Kanji ${escapeHtml(v.jp)}" aria-pressed="false" onclick="this.classList.toggle('flipped');this.setAttribute('aria-pressed',this.classList.contains('flipped'))"><span class="flash-inner"><span class="flash-face flash-front kanji-flash-front"><span class="flash-side-label">KANJI → CÁCH ĐỌC</span><span class="kanji-word-front ${cls}">${escapeHtml(v.jp)}</span><span class="kanji-front-hint">Bài ${v.lesson} • Bạn đọc từ này như thế nào?</span><span class="flip-cue"><span>↻</span> Nhấn / Space để xem đáp án</span></span><span class="flash-face flash-back kanji-flash-back"><span class="flash-side-label">CÁCH ĐỌC & NGHĨA</span><span class="kanji-answer-kana">${escapeHtml(v.kana||v.jp)}</span><span class="kanji-answer-romaji">${escapeHtml(v.reading||'')}</span><span class="kanji-answer-meaning">${escapeHtml(v.vi)}</span><span class="kanji-answer-word">${escapeHtml(v.jp)} • Bài ${v.lesson}</span><span class="flip-cue"><span>↻</span> Nhấn / Space để quay lại</span></span></span></button></div>
  <div class="flash-progress-meta"><span>Tiến độ bộ Kanji tổng hợp</span><b>${pct}%</b></div><div class="progressbar"><span style="width:${pct}%"></span></div>
  <div class="flash-actions two-actions"><button class="secondary-btn flash-nav-btn" onclick="practiceKanjiIndex=(practiceKanjiIndex-1+practiceKanjiItems.length)%practiceKanjiItems.length;renderPracticeKanjiFlash()">← Trước</button><button class="primary-btn flash-nav-btn" onclick="practiceKanjiIndex=(practiceKanjiIndex+1)%practiceKanjiItems.length;renderPracticeKanjiFlash()">Tiếp →</button></div><div class="flash-shortcuts">← → đổi thẻ • Space lật thẻ</div></div>`;
}


function openProgress(){
  setNav('progress'); const p=getProgress(); const total=LESSONS.reduce((s,l)=>s+lessonProgress(l.id),0), max=25*6, completed=LESSONS.filter(l=>lessonProgress(l.id)===6).length;
  app.innerHTML=`<div class="section-title"><div><h2>Tiến độ học</h2><p>Dữ liệu được lưu cục bộ trên trình duyệt này.</p></div><button class="danger-btn" onclick="resetProgress()">Xóa tiến độ</button></div><div class="progress-grid"><div class="progress-card"><b>${completed}/25</b><p>Bài hoàn thành toàn bộ</p></div><div class="progress-card"><b>${total}/${max}</b><p>Mục học đã hoàn thành</p></div><div class="progress-card"><b>${Math.round(total/max*100)}%</b><p>Tiến độ tổng</p></div></div><section class="panel" style="margin-top:14px"><h3>Chi tiết theo bài</h3><div class="lesson-progress-list">${LESSONS.map(l=>{const n=lessonProgress(l.id);return `<div class="lesson-progress-item"><b>Bài ${l.id}</b><div class="mini-progress"><span style="width:${n/6*100}%"></span></div><small>${n}/6</small></div>`}).join('')}</div></section>`;
}
function resetProgress(){ if(confirm('Xóa toàn bộ tiến độ đã lưu?')){localStorage.removeItem(PROGRESS_KEY);localStorage.removeItem(FLASH_STATE_KEY);localStorage.removeItem(KANJI_STATE_KEY);openProgress()} }

document.addEventListener('click',e=>{ if(!e.target.classList.contains('word'))document.querySelectorAll('.word.show-tip').forEach(x=>x.classList.remove('show-tip')); });
document.addEventListener('keydown',e=>{
  const tag=(document.activeElement&&document.activeElement.tagName)||'';
  if(['INPUT','TEXTAREA','SELECT'].includes(tag)) return;
  const card=document.querySelector('.flashcard');
  if(!card) return;
  if(e.code==='Space'){
    e.preventDefault();
    card.classList.toggle('flipped');
    card.setAttribute('aria-pressed',card.classList.contains('flipped'));
  }
  if(e.key==='ArrowLeft'){
    e.preventDefault();
    if(document.getElementById('practice-result') && practiceActiveMode==='kanji' && practiceKanjiItems.length) { practiceKanjiIndex=(practiceKanjiIndex-1+practiceKanjiItems.length)%practiceKanjiItems.length; renderPracticeKanjiFlash(); }
    else if(document.getElementById('practice-result') && practiceActiveMode==='flash' && practiceFlashItems.length) { practiceFlashIndex=(practiceFlashIndex-1+practiceFlashItems.length)%practiceFlashItems.length; renderPracticeFlash(); }
    else if(currentTab==='kanji') prevKanjiCard();
    else if(currentTab==='flash') prevCard();
  }
  if(e.key==='ArrowRight'){
    e.preventDefault();
    if(document.getElementById('practice-result') && practiceActiveMode==='kanji' && practiceKanjiItems.length) { practiceKanjiIndex=(practiceKanjiIndex+1)%practiceKanjiItems.length; renderPracticeKanjiFlash(); }
    else if(document.getElementById('practice-result') && practiceActiveMode==='flash' && practiceFlashItems.length) { practiceFlashIndex=(practiceFlashIndex+1)%practiceFlashItems.length; renderPracticeFlash(); }
    else if(currentTab==='kanji') nextKanjiCard();
    else if(currentTab==='flash') nextCard();
  }
});
goHome();
