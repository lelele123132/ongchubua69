const app = document.getElementById('app');
const PROGRESS_KEY = 'nihongoN5ProgressV3';
const FLASH_STATE_KEY = 'nihongoN5FlashKnownV3';
const KANJI_STATE_KEY = 'nihongoN5KanjiKnownV4';
let currentLesson = 1, currentTab = 'flash', cardIndex = 0, quizState = null;
let kanjiStudyMode = 'flash', kanjiQuizState = null;
let practiceFlashItems = [], practiceFlashIndex = 0;
let practiceKanjiItems = [], practiceKanjiIndex = 0, practiceActiveMode = '';
let n4QuizState = null;
let kanji218Mode='flash', kanji218Index=0, kanji218Filter='all', kanji218Query='', kanji218QuizState=null;

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
        target:v.jp,itemLabel:v.jp,
        correct:v.jp,
        answers:fillToFour(v.jp,shape,lessonKanjiWords(l).map(x=>x.jp).filter(x=>x.jp!==v.jp)),
        explanation:`${v.jp} • ${v.kana||v.jp}${v.reading?` • ${v.reading}`:''} • ${v.vi}`
      });

      pool.push({
        lesson:id,type:'Nghĩa gần • dễ nhầm',kind:'meaning',
        q:`「${v.jp}」 có nghĩa đúng là gì?`,
        target:v.jp,itemLabel:v.jp,
        correct:v.vi,
        answers:fillToFour(v.vi,meaning,l.vocab.map(x=>x.vi).filter(x=>x.vi!==v.vi)),
        explanation:`${v.jp} • ${v.kana||v.jp}${v.reading?` • ${v.reading}`:''}`
      });

      pool.push({
        lesson:id,type:'Cách đọc • âm gần',kind:'reading',
        q:`Cách đọc đúng của 「${v.jp}」 là?`,
        target:v.jp,itemLabel:v.jp,
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
  <section class="k218-home-card">
    <div class="k218-home-icon">字</div>
    <div class="k218-home-copy">
      <span class="k218-eyebrow">提出漢字一覧 • ẢNH BẠN GỬI</span>
      <h2>218 Kanji N5–N4</h2>
      <p>Flashcard nghĩa + Onyomi/Kunyomi + ví dụ từ N5/N4, kèm trắc nghiệm siêu khó bẫy nét, âm đọc và nghĩa gần nhau.</p>
    </div>
    <button class="primary-btn k218-home-btn" onclick="openKanji218()">Học 218 Kanji →</button>
  </section>
  <section class="n4-home-card">
    <div class="n4-home-icon">N4</div>
    <div class="n4-home-copy">
      <span class="n4-eyebrow">TÀI LIỆU N4 BẠN ĐÃ GỬI</span>
      <h2>Trắc nghiệm Kanji N4</h2>
      <p>151 câu Gokaku: đọc Kanji + chọn cách viết, kèm bộ ôn sinh từ bảng tổng hợp Dũng Mori N4.</p>
    </div>
    <button class="primary-btn n4-home-btn" onclick="openN4Quiz()">Vào N4 Quiz →</button>
  </section>
  <section class="recall-home-card"><div class="recall-home-mark">R</div><div><span>RECALL MEMORY</span><h2>Ôn theo đúng những gì bạn hay quên</h2><p>Phân tích đáp án sai, tốc độ nhớ, cặp Kanji dễ nhầm và tự lập lịch ôn 10 phút → 1 ngày → 3 ngày → 7 ngày…</p></div><button class="primary-btn" onclick="openRecallLab()">Mở Recall Lab →</button></section>
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
  flashRecallStartedAt=Date.now();
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
    ${recallRatingButtons('vocab',l.id,cardIndex)}
    <div class="flash-actions two-actions">
      <button class="secondary-btn flash-nav-btn" onclick="prevCard()">← Trước</button>
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
  flashRecallStartedAt=Date.now();
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
    ${recallRatingButtons('kanjiword',l.id,v._vocabIndex)}
    <div class="flash-actions two-actions">
      <button class="secondary-btn flash-nav-btn" onclick="prevKanjiCard()">← Trước</button>
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
  s.questionStartedAt=Date.now();
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
  const skill=q.kind==='shape'?'kanji-shape':q.kind==='meaning'?'kanji-meaning':'kanji-reading';
  recordRecallEvent({itemKey:recallKey(['kanjiword',q.lesson,q.target||q.correct,q.kind]),domain:'kanji',skill,lesson:q.lesson,itemLabel:q.itemLabel||q.target||q.correct,target:q.target||'',prompt:q.q,selected,correctAnswer:q.correct,correct:selected===q.correct,responseMs:Date.now()-(s.questionStartedAt||Date.now()),source:'Kanji Hard Minna',answers:q.answers,explanation:q.explanation||''});
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
    l.vocab.forEach((v,vi)=>{
      const distractors=shuffle(lessonMeanings.filter(m=>m!==v.vi)).slice(0,3);
      pool.push({
        lesson:id,
        type:'Từ vựng',
        q:`「${v.jp}」 nghĩa là gì?`,
        target:v.jp, vocabIndex:vi, skill:'vocab-meaning', domain:'vocab',
        correct:v.vi,
        answers:shuffle([v.vi,...distractors])
      });
    });

    // Ngữ pháp: các lựa chọn sai cũng chỉ lấy trong phần ngữ pháp của chính bài.
    const lessonGrammarMeanings=[...new Set(l.grammar.map(x=>x.meaning).filter(Boolean))];
    l.grammar.forEach((g,gi)=>{
      const distractors=shuffle(lessonGrammarMeanings.filter(m=>m!==g.meaning)).slice(0,3);
      pool.push({
        lesson:id,
        type:'Ngữ pháp',
        q:`Mẫu 「${g.pattern}」 dùng để diễn đạt ý nào?`,
        target:g.pattern, grammarIndex:gi, skill:'grammar', domain:'grammar',
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
  quizState.questionStartedAt=Date.now();
  box.innerHTML=`<div class="quiz-box"><div class="question-meta">Câu ${quizState.index+1}/${quizState.questions.length} • Bài ${q.lesson} • ${q.type}</div><div class="question">${q.q}</div><div class="answers">${q.answers.map((a,i)=>`<button class="answer" data-answer="${escapeHtml(a)}" onclick="answerQuiz(this,${i})">${String.fromCharCode(65+i)}. ${escapeHtml(a)}</button>`).join('')}</div><div id="quiz-feedback"></div></div>`;
}
function answerQuiz(btn,i){
  if(quizState.answered)return; quizState.answered=true; const q=quizState.questions[quizState.index],selected=q.answers[i];
  document.querySelectorAll('.answer').forEach(b=>{ if(b.dataset.answer===q.correct)b.classList.add('correct'); });
  if(selected===q.correct)quizState.score++; else btn.classList.add('wrong');
  recordRecallEvent({
    itemKey:recallKey(['lesson',q.lesson,q.type,q.vocabIndex??q.grammarIndex??recallHash(q.q)]),domain:q.domain||'vocab',skill:q.skill||(q.type==='Ngữ pháp'?'grammar':'vocab-meaning'),lesson:q.lesson,
    itemLabel:q.target||q.q,target:q.target||'',prompt:q.q,selected,correctAnswer:q.correct,correct:selected===q.correct,responseMs:Date.now()-(quizState.questionStartedAt||Date.now()),
    source:quizState.lessonQuiz?'Trắc nghiệm bài':'Luyện tập tổng hợp',answers:q.answers,explanation:q.type==='Ngữ pháp'?q.correct:`${q.target||''} = ${q.correct}`
  });
  document.getElementById('quiz-feedback').innerHTML=`<div class="feedback">${selected===q.correct?'✓ Chính xác':'✗ Đáp án đúng: '+escapeHtml(q.correct)}</div><div style="text-align:right;margin-top:12px"><button class="primary-btn" onclick="nextQuizQuestion()">Câu tiếp theo →</button></div>`;
}
function nextQuizQuestion(){ quizState.index++; quizState.answered=false; renderQuiz(document.getElementById(quizState.container)); }

function renderReadingTokens(tokens){ return tokens.map(t=> typeof t==='string'?escapeHtml(t):`<span class="word" tabindex="0" data-vi="${escapeHtml(t.vi)}" onclick="toggleTip(this)">${escapeHtml(t.jp)}</span>`).join(''); }
function toggleTip(el){ document.querySelectorAll('.word.show-tip').forEach(x=>{if(x!==el)x.classList.remove('show-tip')}); el.classList.toggle('show-tip'); }
function renderReading(box,l){
  box.innerHTML=`<div class="reading-wrap"><div class="section-title"><div><h2>Đọc hiểu ${l.title}</h2><p>Đọc đoạn văn rồi trả lời câu hỏi.</p></div>${completeButton('reading')}</div><div class="reading-note">💡 Rê chuột vào từ có gạch chấm để xem nghĩa tiếng Việt. Trên điện thoại, chạm vào từ để bật/tắt nghĩa.</div><div class="reading-text">${renderReadingTokens(l.reading.tokens)}</div><div class="reading-questions"><h3>Câu hỏi đọc hiểu</h3>${l.reading.questions.map((q,qi)=>`<div class="reading-q" data-qindex="${qi}" data-lesson="${l.id}" data-started="${Date.now()}"><h4>${qi+1}. ${q.q}</h4>${shuffle(q.answers).map(a=>`<button class="mini-answer" data-answer="${escapeHtml(a)}" data-correct="${a===q.correct}" onclick="answerReading(this)">${a}</button>`).join('')}<div class="reading-feedback"></div></div>`).join('')}</div></div>`;
}
function answerReading(btn){ const wrap=btn.closest('.reading-q'); if(wrap.dataset.done)return; wrap.dataset.done='1'; wrap.querySelectorAll('.mini-answer').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct')}); if(btn.dataset.correct!=='true')btn.classList.add('wrong');
  const lesson=+(wrap.dataset.lesson||currentLesson),qi=+(wrap.dataset.qindex||0),l=LESSONS[lesson-1],q=l?.reading?.questions?.[qi];
  if(q)recordRecallEvent({itemKey:recallKey(['reading',lesson,qi]),domain:'reading',skill:'reading-comp',lesson,itemLabel:`Đọc hiểu Bài ${lesson} câu ${qi+1}`,target:q.q,prompt:q.q,selected:btn.dataset.answer||btn.textContent.trim(),correctAnswer:q.correct,correct:btn.dataset.correct==='true',responseMs:Date.now()-+(wrap.dataset.started||Date.now()),source:'Đọc hiểu Minna',answers:q.answers,explanation:q.correct});
  wrap.querySelector('.reading-feedback').innerHTML=`<small style="color:var(--muted)">${btn.dataset.correct==='true'?'✓ Đúng':'✗ Xem đáp án được đánh dấu màu xanh.'}</small>`; }

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
  if(mode==='reading'){ const lesson=LESSONS[shuffle(ids)[0]-1]; r.innerHTML+=`<div class="reading-wrap"><h2>Đọc hiểu ngẫu nhiên • Bài ${lesson.id}</h2><div class="reading-note">Rê chuột/chạm vào từ có gạch chấm để xem nghĩa Việt.</div><div class="reading-text">${renderReadingTokens(lesson.reading.tokens)}</div><div class="reading-questions">${lesson.reading.questions.map((q,qi)=>`<div class="reading-q" data-qindex="${qi}" data-lesson="${lesson.id}" data-started="${Date.now()}"><h4>${qi+1}. ${q.q}</h4>${shuffle(q.answers).map(a=>`<button class="mini-answer" data-answer="${escapeHtml(a)}" data-correct="${a===q.correct}" onclick="answerReading(this)">${a}</button>`).join('')}<div class="reading-feedback"></div></div>`).join('')}</div><div class="card-controls"><button class="primary-btn" onclick="startMixedPractice('reading')">Đổi bài đọc ↻</button></div></div>`; }
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
    if(document.getElementById('kanji218-root')) { prevKanji218Card(); }
    else if(document.getElementById('practice-result') && practiceActiveMode==='kanji' && practiceKanjiItems.length) { practiceKanjiIndex=(practiceKanjiIndex-1+practiceKanjiItems.length)%practiceKanjiItems.length; renderPracticeKanjiFlash(); }
    else if(document.getElementById('practice-result') && practiceActiveMode==='flash' && practiceFlashItems.length) { practiceFlashIndex=(practiceFlashIndex-1+practiceFlashItems.length)%practiceFlashItems.length; renderPracticeFlash(); }
    else if(currentTab==='kanji') prevKanjiCard();
    else if(currentTab==='flash') prevCard();
  }
  if(e.key==='ArrowRight'){
    e.preventDefault();
    if(document.getElementById('kanji218-root')) { nextKanji218Card(); }
    else if(document.getElementById('practice-result') && practiceActiveMode==='kanji' && practiceKanjiItems.length) { practiceKanjiIndex=(practiceKanjiIndex+1)%practiceKanjiItems.length; renderPracticeKanjiFlash(); }
    else if(document.getElementById('practice-result') && practiceActiveMode==='flash' && practiceFlashItems.length) { practiceFlashIndex=(practiceFlashIndex+1)%practiceFlashItems.length; renderPracticeFlash(); }
    else if(currentTab==='kanji') nextKanjiCard();
    else if(currentTab==='flash') nextCard();
  }
});
goHome();


/* ============================
   V7 — N4 quiz từ 2 PDF người dùng cung cấp
   ============================ */
const N4_GOKAKU_SOURCE = 'TRẮC NGHIỆM KANJI N4 GOKAKU (2 MONDAI)';
const N4_DUNGMORI_SOURCE = 'DUNGMORI – Tổng hợp N4';

function n4WordLookup(q){
  const correct=q.options[q.answer];
  if(q.kind==='reading'){
    return DUNGMORI_N4_WORDS.find(w=>w.kanji===q.target || (w.kanji.replace(/する$/,'')===q.target));
  }
  return DUNGMORI_N4_WORDS.find(w=>w.kanji===correct || w.reading===q.target || w.reading.replace(/する$/,'')===q.target);
}
function openN4Quiz(){
  setNav('n4');
  n4QuizState=null;
  app.innerHTML=`<div class="breadcrumb"><button onclick="goHome()">Trang chủ</button> › N4 Quiz</div>
  <section class="n4-hero">
    <div>
      <span class="n4-eyebrow">KANJI N4 • 2 TÀI LIỆU</span>
      <h1>Trắc nghiệm N4 từ tài liệu của bạn</h1>
      <p>Gokaku dùng câu hỏi gốc trong PDF. Dũng Mori được dùng làm bảng đối chiếu Kanji – cách đọc – nghĩa và tạo thêm câu luyện tập.</p>
    </div>
    <div class="n4-source-stats">
      <div><b>${GOKAKU_N4_QUESTIONS.length}</b><span>câu Gokaku</span></div>
      <div><b>${DUNGMORI_N4_WORDS.length}</b><span>mục Dũng Mori</span></div>
    </div>
  </section>
  <section class="panel n4-setup">
    <div class="n4-source-grid">
      <button class="n4-source-card active" id="n4-source-gokaku" onclick="chooseN4Source('gokaku')">
        <span class="n4-source-tag">PDF 1</span><h3>Gokaku – câu hỏi gốc</h3>
        <p>問題1: 漢字の読み方 • 問題2: 文字の書き方</p>
        <b>${GOKAKU_N4_QUESTIONS.length} câu</b>
      </button>
      <button class="n4-source-card" id="n4-source-dungmori" onclick="chooseN4Source('dungmori')">
        <span class="n4-source-tag green">PDF 2</span><h3>Dũng Mori – ôn tổng hợp</h3>
        <p>Tạo câu hỏi đọc, nghĩa và Kanji từ bảng tổng hợp N4.</p>
        <b>${DUNGMORI_N4_WORDS.length} mục</b>
      </button>
    </div>
    <div id="n4-options"></div>
    <div id="n4-quiz-area"></div>
  </section>`;
  chooseN4Source('gokaku');
}
function chooseN4Source(source){
  document.querySelectorAll('.n4-source-card').forEach(x=>x.classList.remove('active'));
  const card=document.getElementById(`n4-source-${source}`); if(card)card.classList.add('active');
  const opt=document.getElementById('n4-options'), area=document.getElementById('n4-quiz-area');
  area.innerHTML='';
  if(source==='gokaku'){
    opt.innerHTML=`<div class="n4-option-row">
      <label><b>Phần</b><select id="n4-mondai"><option value="all">Cả 2 Mondai</option><option value="1">問題1 – Đọc Kanji (86 câu)</option><option value="2">問題2 – Viết Kanji (65 câu)</option></select></label>
      <label><b>Số câu</b><select id="n4-count"><option value="10">10 câu</option><option value="20" selected>20 câu</option><option value="50">50 câu</option><option value="all">Tất cả</option></select></label>
      <button class="primary-btn n4-start-btn" onclick="startGokakuQuiz()">Bắt đầu Gokaku →</button>
    </div>
    <div class="n4-source-note"><b>Nguồn câu:</b> ${N4_GOKAKU_SOURCE}. Khi có mục tương ứng, phần giải thích sẽ đối chiếu thêm với ${N4_DUNGMORI_SOURCE}.</div>`;
  }else{
    opt.innerHTML=`<div class="n4-option-row">
      <label><b>Dạng</b><select id="n4-dung-kind"><option value="mixed">Trộn 3 dạng</option><option value="reading">Kanji → cách đọc</option><option value="meaning">Kanji → nghĩa Việt</option><option value="writing">Kana → Kanji</option></select></label>
      <label><b>Số câu</b><select id="n4-dung-count"><option value="10">10 câu</option><option value="20" selected>20 câu</option><option value="40">40 câu</option></select></label>
      <button class="primary-btn n4-start-btn" onclick="startDungMoriQuiz()">Bắt đầu Dũng Mori →</button>
    </div>
    <div class="n4-source-note"><b>Nguồn dữ liệu:</b> ${N4_DUNGMORI_SOURCE}. Câu hỏi được website tạo từ bảng Kanji/cách đọc/nghĩa, không phải câu hỏi nguyên văn của tài liệu.</div>`;
  }
}
function startGokakuQuiz(){
  const mondai=document.getElementById('n4-mondai').value;
  const countValue=document.getElementById('n4-count').value;
  let qs=GOKAKU_N4_QUESTIONS.filter(q=>mondai==='all'||String(q.mondai)===mondai);
  qs=shuffle(qs);
  const count=countValue==='all'?qs.length:+countValue;
  qs=qs.slice(0,count);
  n4QuizState={source:'gokaku',questions:qs,index:0,score:0,answered:false,wrong:[]};
  renderN4Question();
}
function n4HardDistractors(field,correct,word,count=3){
  const vals=[...new Set(DUNGMORI_N4_WORDS.map(w=>w[field]).filter(x=>x&&x!==correct))];
  if(field==='reading') vals.sort((a,b)=>readingSimilarity(correct,a)-readingSimilarity(correct,b)).reverse();
  else if(field==='meaning') vals.sort((a,b)=>meaningSimilarity(correct,a)-meaningSimilarity(correct,b)).reverse();
  else vals.sort((a,b)=>visualWordScore(correct,a)-visualWordScore(correct,b)).reverse();
  return vals.slice(0,count);
}
function buildDungMoriQuestions(kind,count){
  let out=[];
  shuffle(DUNGMORI_N4_WORDS).forEach(w=>{
    const kinds=kind==='mixed'?shuffle(['reading','meaning','writing']):[kind];
    kinds.forEach(k=>{
      if(k==='reading'){
        const opts=shuffle([w.reading,...n4HardDistractors('reading',w.reading,w)]);
        out.push({source:'dungmori',kind:k,prompt:`「${w.kanji}」の読み方は？`,target:w.kanji,options:opts,answer:opts.indexOf(w.reading),word:w});
      }else if(k==='meaning'){
        const opts=shuffle([w.meaning,...n4HardDistractors('meaning',w.meaning,w)]);
        out.push({source:'dungmori',kind:k,prompt:`「${w.kanji}」の意味は？`,target:w.kanji,options:opts,answer:opts.indexOf(w.meaning),word:w});
      }else{
        const opts=shuffle([w.kanji,...n4HardDistractors('kanji',w.kanji,w)]);
        out.push({source:'dungmori',kind:k,prompt:`「${w.reading}」の正しい漢字は？`,target:w.reading,options:opts,answer:opts.indexOf(w.kanji),word:w});
      }
    });
  });
  return shuffle(out).slice(0,count);
}
function startDungMoriQuiz(){
  const kind=document.getElementById('n4-dung-kind').value;
  const count=+document.getElementById('n4-dung-count').value;
  n4QuizState={source:'dungmori',questions:buildDungMoriQuestions(kind,count),index:0,score:0,answered:false,wrong:[]};
  renderN4Question();
}
function renderN4Question(){
  const area=document.getElementById('n4-quiz-area'), s=n4QuizState;
  if(!area||!s)return;
  if(s.index>=s.questions.length){renderN4Result(area);return;}
  const q=s.questions[s.index];
  const sourceLabel=s.source==='gokaku'
    ? `GOKAKU • 問題${q.mondai} • câu ${q.number} • PDF trang ${q.page}`
    : `DŨNG MORI • ${q.kind==='reading'?'Cách đọc':q.kind==='writing'?'Viết Kanji':'Nghĩa'}`;
  const pct=Math.round((s.index/s.questions.length)*100);
  s.questionStartedAt=Date.now();
  area.innerHTML=`<div class="n4-quiz-card">
    <div class="n4-quiz-top"><span>${sourceLabel}</span><b>${s.index+1}/${s.questions.length}</b></div>
    <div class="progressbar n4-progress"><span style="width:${pct}%"></span></div>
    <div class="n4-question">${escapeHtml(q.prompt)}</div>
    ${q.sentence?`<div class="n4-original-sentence">${escapeHtml(q.sentence)}</div>`:''}
    <div class="n4-answer-grid">${q.options.map((a,i)=>`<button class="n4-answer" data-index="${i}" onclick="answerN4Question(this,${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHtml(a)}</b></button>`).join('')}</div>
    <div id="n4-feedback"></div>
  </div>`;
}
function answerN4Question(btn,i){
  const s=n4QuizState,q=s.questions[s.index]; if(s.answered)return;
  s.answered=true;
  const correct=q.answer;
  document.querySelectorAll('.n4-answer').forEach((b,idx)=>{if(idx===correct)b.classList.add('correct')});
  if(i===correct)s.score++;else{btn.classList.add('wrong');s.wrong.push(q)}
  const correctText=q.options[correct];
  const n4skill=q.kind==='writing'?'n4-writing':q.kind==='meaning'?'n4-meaning':'n4-reading';
  const n4key=s.source==='gokaku'?recallKey(['n4','gokaku',q.id]):recallKey(['n4','dungmori',q.kind,(q.word&&q.word.kanji)||q.target]);
  recordRecallEvent({itemKey:n4key,domain:'n4',skill:n4skill,itemLabel:(q.word&&q.word.kanji)||q.target||q.id,target:q.target||'',prompt:q.prompt,selected:q.options[i],correctAnswer:correctText,correct:i===correct,responseMs:Date.now()-(s.questionStartedAt||Date.now()),source:s.source==='gokaku'?'Gokaku N4':'Dũng Mori N4',answers:q.options,explanation:q.word?`${q.word.kanji} • ${q.word.reading} • ${q.word.meaning}`:''});
  const word=q.word||n4WordLookup(q);
  let explain=`<b>${i===correct?'✓ Chính xác':'✗ Đáp án đúng: '+escapeHtml(correctText)}</b>`;
  if(word) explain+=`<div class="n4-word-explain"><strong>${escapeHtml(word.kanji)}</strong><span>${escapeHtml(word.reading)}</span><em>${escapeHtml(word.meaning)}</em></div>`;
  else explain+=`<small>${q.kind==='reading'?escapeHtml(q.target)+' → '+escapeHtml(correctText):escapeHtml(q.target)+' → '+escapeHtml(correctText)}</small>`;
  document.getElementById('n4-feedback').innerHTML=`<div class="feedback n4-feedback">${explain}</div><div class="n4-next"><button class="primary-btn" onclick="nextN4Question()">Câu tiếp theo →</button></div>`;
}
function nextN4Question(){n4QuizState.index++;n4QuizState.answered=false;renderN4Question();}
function renderN4Result(area){
  const s=n4QuizState,pct=s.questions.length?Math.round(s.score/s.questions.length*100):0;
  area.innerHTML=`<div class="n4-result">
    <span class="n4-eyebrow">HOÀN THÀNH</span><h2>Kết quả N4</h2>
    <div class="n4-result-score">${s.score}<small>/${s.questions.length}</small></div>
    <p>${pct>=90?'Rất chắc Kanji.':pct>=75?'Khá tốt, xem lại các câu sai để tránh bẫy nét.':pct>=55?'Đã có nền, nhưng nên làm lại các câu sai.':'Nên ôn bảng Dũng Mori rồi thử lại.'}</p>
    <div class="n4-result-actions"><button class="primary-btn" onclick="${s.source==='gokaku'?'startGokakuQuiz()':'startDungMoriQuiz()'}">Làm bộ mới ↻</button>${s.wrong.length?`<button class="secondary-btn" onclick="reviewN4Wrong()">Luyện lại ${s.wrong.length} câu sai</button>`:''}</div>
  </div>`;
}
function reviewN4Wrong(){
  const wrong=[...n4QuizState.wrong];
  n4QuizState={source:n4QuizState.source,questions:shuffle(wrong),index:0,score:0,answered:false,wrong:[]};
  renderN4Question();
}


/* ============================
   V8 — 218 Kanji từ ảnh 提出漢字一覧
   ============================ */
const KANJI218_KNOWN_KEY='nihongoKanji218KnownV8';
function getKanji218Known(){try{return JSON.parse(localStorage.getItem(KANJI218_KNOWN_KEY))||{}}catch{return {}}}
function isKanji218Known(ch){return !!getKanji218Known()[ch]}
function setKanji218Known(ch,value){const x=getKanji218Known();if(value)x[ch]=1;else delete x[ch];localStorage.setItem(KANJI218_KNOWN_KEY,JSON.stringify(x));renderKanji218Content()}
function kanji218GradeLabel(g){return g===4?'N5':g===3?'N4':'N3 tương đương'}
function primaryReading(s){return String(s||'').split('・')[0].trim()}
function getKanji218Item(ch){return KANJI218.find(x=>x.kanji===ch)}
function getKanji218Filtered(){
  const q=kanji218Query.trim().toLowerCase();
  return KANJI218.filter(k=>{
    const levelOk=kanji218Filter==='all'||k.jlpt===kanji218Filter;
    const searchOk=!q||`${k.kanji} ${k.meaning} ${k.on} ${k.kun} ${k.id}`.toLowerCase().includes(q);
    return levelOk&&searchOk;
  });
}
function collectKanji218Examples(item){
  let out=[];
  const basic=KANJI218_BASIC_EXAMPLES[item.kanji];
  if(basic) out.push({...basic,source:'Ví dụ cơ bản'});
  LESSONS.forEach(l=>l.vocab.forEach(v=>{
    const kana=v.kana||v.jp||'';
    const clean=v.jp&&v.jp.includes(item.kanji)&&v.jp.length<=14&&!/[～—()（）\[\]]/.test(v.jp)&&!/[～—ー()（）\[\]]/.test(kana);
    if(clean) out.push({word:v.jp,reading:kana,meaning:v.vi,level:'N5',source:`Minna Bài ${l.id}`});
  }));
  DUNGMORI_N4_WORDS.forEach(v=>{
    if(v.kanji&&v.kanji.includes(item.kanji)&&v.kanji.length<=14) out.push({word:v.kanji,reading:v.reading,meaning:v.meaning,level:'N4',source:'Dũng Mori N4'});
  });
  (KANJI218_FALLBACK_EXAMPLES[item.kanji]||[]).forEach(v=>out.push({...v,source:'Ví dụ bổ sung'}));
  const seen=new Set();out=out.filter(x=>{const key=x.word+'|'+x.reading;if(seen.has(key))return false;seen.add(key);return true});
  // Luôn giữ ví dụ cơ bản đã soát ở vị trí đầu, sau đó bổ sung N5/N4 từ dữ liệu web.
  const chosen=[];
  if(basic){const bx=out.find(x=>x.source==='Ví dụ cơ bản');if(bx)chosen.push(bx)}
  const n5=out.find(x=>x.level==='N5'&&!chosen.some(y=>y.word===x.word));
  const n4=out.find(x=>x.level==='N4'&&!chosen.some(y=>y.word===x.word));
  if(n5)chosen.push(n5); if(n4)chosen.push(n4);
  out.forEach(x=>{if(chosen.length<4&&!chosen.some(y=>y.word===x.word))chosen.push(x)});
  return chosen.slice(0,4);
}
function kanji218ConfusableItems(item){return (KANJI218_CONFUSABLES[item.kanji]||[]).slice(0,4).map(ch=>({ch,item:getKanji218Item(ch)}))}
function openKanji218(){
  setNav('kanji218');kanji218Mode='flash';kanji218Index=0;kanji218Filter='all';kanji218Query='';kanji218QuizState=null;
  const c5=KANJI218.filter(x=>x.grade===4).length,c4=KANJI218.filter(x=>x.grade===3).length,c3=KANJI218.filter(x=>x.grade===2).length;
  app.innerHTML=`<div id="kanji218-root">
    <div class="breadcrumb"><button onclick="goHome()">Trang chủ</button> › 218 Kanji</div>
    <section class="k218-hero"><div><span class="k218-eyebrow">提出漢字一覧 • DANH SÁCH TRONG ẢNH</span><h1>218 Kanji N5–N4</h1><p>Học mặt chữ → nghĩa → Onyomi/Kunyomi → từ ví dụ cơ bản. Chế độ Siêu khó tập trung vào những chữ rất dễ nhìn nhầm hoặc đọc nhầm.</p></div>
      <div class="k218-stats"><div><b>218</b><span>Tổng Kanji</span></div><div><b>${c5}</b><span>N5 (số 4)</span></div><div><b>${c4}</b><span>N4 (số 3)</span></div><div><b>${c3}</b><span>N3≈ (số 2)</span></div></div></section>
    <div class="k218-source-note"><b>Đọc bảng trong ảnh:</b> số nhỏ 4 = N5 hiện tại, 3 = N4 hiện tại, 2 = nhóm tương đương N3 theo chú thích dưới ảnh. Các cách đọc bên dưới là <b>cách đọc chính</b>, không phải toàn bộ cách đọc hiếm.</div>
    <section class="panel k218-panel"><div class="k218-toolbar">
      <div class="k218-filters"><button data-kfilter="all" class="active" onclick="setKanji218Filter('all',this)">Tất cả 218</button><button data-kfilter="N5" onclick="setKanji218Filter('N5',this)">N5</button><button data-kfilter="N4" onclick="setKanji218Filter('N4',this)">N4</button><button data-kfilter="N3 tương đương" onclick="setKanji218Filter('N3 tương đương',this)">N3≈</button></div>
      <input class="k218-search" type="search" placeholder="Tìm Kanji, nghĩa, On/Kun hoặc số thứ tự…" oninput="kanji218Query=this.value;kanji218Index=0;renderKanji218Content()">
      <div class="k218-modes"><button class="active" data-kmode="flash" onclick="setKanji218Mode('flash',this)">🃏 Flashcard</button><button data-kmode="list" onclick="setKanji218Mode('list',this)">▦ Danh sách</button><button class="hard" data-kmode="hard" onclick="setKanji218Mode('hard',this)">⚔ Siêu khó</button></div>
    </div><div id="kanji218-content"></div></section>
  </div>`;
  renderKanji218Content();
}
function setKanji218Filter(v,btn){kanji218Filter=v;kanji218Index=0;document.querySelectorAll('[data-kfilter]').forEach(x=>x.classList.toggle('active',x===btn));renderKanji218Content()}
function setKanji218Mode(v,btn){kanji218Mode=v;kanji218Index=0;kanji218QuizState=null;document.querySelectorAll('[data-kmode]').forEach(x=>x.classList.toggle('active',x===btn));renderKanji218Content()}
function renderKanji218Content(){
  const box=document.getElementById('kanji218-content');if(!box)return;
  if(kanji218Mode==='list')return renderKanji218List(box);
  if(kanji218Mode==='hard')return renderKanji218HardSetup(box);
  return renderKanji218Flash(box);
}
function renderKanji218Flash(box){
  flashRecallStartedAt=Date.now();
  const items=getKanji218Filtered();
  if(!items.length){box.innerHTML='<div class="empty"><p>Không tìm thấy Kanji phù hợp.</p></div>';return}
  kanji218Index=(kanji218Index+items.length)%items.length; const k=items[kanji218Index], ex=collectKanji218Examples(k), conf=kanji218ConfusableItems(k), known=isKanji218Known(k.kanji);
  const pct=Math.round((kanji218Index+1)/items.length*100);
  box.innerHTML=`<div class="k218-flash-wrap">
    <div class="flash-heading"><div><span class="flash-kicker">KANJI #${k.id} • ${k.jlpt}</span><h2>Flashcard 218 Kanji</h2></div><div class="flash-counter"><b>${kanji218Index+1}</b><span>/ ${items.length}</span></div></div>
    <div class="flash-area"><button class="flashcard k218-flashcard" type="button" aria-pressed="false" onclick="this.classList.toggle('flipped');this.setAttribute('aria-pressed',this.classList.contains('flipped'))"><span class="flash-inner">
      <span class="flash-face flash-front k218-front"><span class="flash-side-label">KANJI → PHÂN TÍCH</span><span class="k218-char">${k.kanji}</span><span class="k218-front-meaning">Bạn nhớ nghĩa và cách đọc không?</span><span class="flip-cue"><span>↻</span> Nhấn / Space để lật</span></span>
      <span class="flash-face flash-back k218-back"><span class="flash-side-label">NGHĨA • CÁCH ĐỌC • VÍ DỤ</span><span class="k218-back-char">${k.kanji}</span><span class="k218-meaning">${escapeHtml(k.meaning)}</span><span class="k218-level-chip">#${k.id} • ${k.jlpt}</span>
        <span class="k218-reading-grid"><span><small>ONYOMI</small><b>${escapeHtml(k.on)}</b></span><span><small>KUNYOMI</small><b>${escapeHtml(k.kun)}</b></span></span>
        <span class="flip-cue"><span>↻</span> Nhấn / Space để quay lại</span></span>
    </span></button></div>
    <div class="k218-details"><div class="k218-example-block"><h3>Ví dụ cơ bản N5 / N4</h3>${ex.length?ex.map(x=>`<div class="k218-example"><span class="k218-example-level ${x.level==='N5'?'n5':'n4'}">${x.level}</span><strong>${escapeHtml(x.word)}</strong><span>${escapeHtml(x.reading)}</span><em>${escapeHtml(x.meaning)}</em></div>`).join(''):'<p>Chưa có ví dụ trong dữ liệu hiện tại.</p>'}</div>
      <div class="k218-confuse-block"><h3>Dễ nhầm mặt chữ</h3>${conf.length?`<div class="k218-confuse-chips">${conf.map(c=>`<button onclick="jumpKanji218('${c.ch}')"><b>${c.ch}</b><span>${c.item?escapeHtml(c.item.meaning):'chữ gần hình'}</span></button>`).join('')}</div>`:'<p>Không có nhóm bẫy nét nổi bật trong bộ hiện tại.</p>'}</div></div>
    <div class="flash-progress-meta"><span>Tiến độ phạm vi đang lọc</span><b>${pct}%</b></div><div class="progressbar"><span style="width:${pct}%"></span></div>
    ${recallRatingButtons('kanji218',k.kanji)}
    <div class="flash-actions two-actions"><button class="secondary-btn" onclick="prevKanji218Card()">← Trước</button><button class="primary-btn" onclick="nextKanji218Card()">Tiếp →</button></div>
    <div class="flash-shortcuts">← → đổi thẻ • Space lật thẻ</div></div>`;
}
function prevKanji218Card(){if(kanji218Mode!=='flash')return;const a=getKanji218Filtered();if(!a.length)return;kanji218Index=(kanji218Index-1+a.length)%a.length;renderKanji218Content()}
function nextKanji218Card(){if(kanji218Mode!=='flash')return;const a=getKanji218Filtered();if(!a.length)return;kanji218Index=(kanji218Index+1)%a.length;renderKanji218Content()}
function jumpKanji218(ch){kanji218Mode='flash';kanji218Filter='all';kanji218Query='';document.querySelectorAll('[data-kmode]').forEach(x=>x.classList.toggle('active',x.dataset.kmode==='flash'));document.querySelectorAll('[data-kfilter]').forEach(x=>x.classList.toggle('active',x.dataset.kfilter==='all'));const inp=document.querySelector('.k218-search');if(inp)inp.value='';kanji218Index=KANJI218.findIndex(x=>x.kanji===ch);renderKanji218Content()}
function renderKanji218List(box){
  const items=getKanji218Filtered();
  box.innerHTML=`<div class="section-title"><div><h2>Danh sách Kanji</h2><p>${items.length} chữ trong phạm vi hiện tại. Bấm một chữ để mở flashcard.</p></div><div class="k218-known-stat">✓ Đã nhớ ${items.filter(x=>isKanji218Known(x.kanji)).length}/${items.length}</div></div><div class="k218-grid">${items.map(k=>`<button class="k218-mini ${isKanji218Known(k.kanji)?'known':''}" onclick="jumpKanji218('${k.kanji}')"><span>${k.kanji}</span><b>${escapeHtml(k.meaning)}</b><small>#${k.id} • ${k.jlpt}</small><em>${escapeHtml(primaryReading(k.on))}${k.kun!=='—'?` / ${escapeHtml(primaryReading(k.kun))}`:''}</em></button>`).join('')}</div>`;
}
function k218MeaningCandidates(item){
  const group=KANJI218_MEANING_GROUPS.find(g=>g.includes(item.kanji))||[];
  let arr=group.map(getKanji218Item).filter(x=>x&&x.kanji!==item.kanji);
  if(arr.length<3)arr=arr.concat(KANJI218.filter(x=>x.kanji!==item.kanji).sort((a,b)=>meaningSimilarity(item.meaning,a.meaning)-meaningSimilarity(item.meaning,b.meaning)).reverse());
  return uniqueArray(arr.map(x=>x.meaning)).filter(x=>x!==item.meaning);
}
function k218ReadingCandidates(item,field){
  const correct=primaryReading(item[field]);
  return KANJI218.filter(x=>x.kanji!==item.kanji&&x[field]!=='—').map(x=>primaryReading(x[field])).filter((x,i,a)=>x&&x!==correct&&a.indexOf(x)===i)
    .sort((a,b)=>{const sa=(a.length===correct.length?4:0)+(a[0]===correct[0]?3:0)-levenshtein(correct,a);const sb=(b.length===correct.length?4:0)+(b[0]===correct[0]?3:0)-levenshtein(correct,b);return sb-sa});
}
function k218ShapeCandidates(item){
  let arr=[...(KANJI218_CONFUSABLES[item.kanji]||[])];
  const group=KANJI218_MEANING_GROUPS.find(g=>g.includes(item.kanji))||[]; arr.push(...group.filter(x=>x!==item.kanji));
  arr.push(...KANJI218.filter(x=>x.grade===item.grade&&x.kanji!==item.kanji).map(x=>x.kanji));
  return uniqueArray(arr).filter(x=>x!==item.kanji);
}
function k218ClosestExampleReadings(correct,item){
  let vals=[];KANJI218.forEach(k=>collectKanji218Examples(k).forEach(e=>{if(e.reading&&e.reading!==correct)vals.push(e.reading)}));
  vals=uniqueArray(vals);vals.sort((a,b)=>{const sa=(a.length===correct.length?4:0)-levenshtein(correct,a),sb=(b.length===correct.length?4:0)-levenshtein(correct,b);return sb-sa});return vals;
}
function createKanji218HardQuestions(count=20,kind='mixed'){
  const pool=getKanji218Filtered(); if(!pool.length)return [];
  let qs=[]; const shuffled=shuffle(pool);
  shuffled.forEach(item=>{
    let types=kind==='mixed'?shuffle(['shape','meaning','on','kun','example']):[kind];
    types.forEach(type=>{
      if(type==='kun'&&item.kun==='—')return;
      if(type==='on'&&item.on==='—')return;
      if(type==='shape'){
        const ex=collectKanji218Examples(item).find(x=>x.word.includes(item.kanji)&&x.word.length>1);
        const opts=shuffle([item.kanji,...k218ShapeCandidates(item).slice(0,3)]);
        if(opts.length<4)return;
        const blank=ex?ex.word.replace(item.kanji,'□'):'□';
        qs.push({item,type,label:'Bẫy mặt chữ 1–2 nét',q:ex?`Điền Kanji đúng: ${blank}（${ex.reading} • ${ex.meaning}）`:`Chọn Kanji có nghĩa “${item.meaning}”`,correct:item.kanji,answers:opts});
      }else if(type==='meaning'){
        const opts=shuffle([item.meaning,...k218MeaningCandidates(item).slice(0,3)]); if(opts.length<4)return;
        qs.push({item,type,label:'Nghĩa cùng nhóm',q:`${item.kanji} có nghĩa chính nào?`,correct:item.meaning,answers:opts});
      }else if(type==='on'){
        const correct=primaryReading(item.on),opts=shuffle([correct,...k218ReadingCandidates(item,'on').slice(0,3)]);if(opts.length<4)return;
        qs.push({item,type,label:'Onyomi gần âm',q:`Onyomi chính của ${item.kanji} là?`,correct,answers:opts});
      }else if(type==='kun'){
        const correct=primaryReading(item.kun),opts=shuffle([correct,...k218ReadingCandidates(item,'kun').slice(0,3)]);if(opts.length<4)return;
        qs.push({item,type,label:'Kunyomi gần âm',q:`Kunyomi chính của ${item.kanji} là?`,correct,answers:opts});
      }else if(type==='example'){
        const ex=collectKanji218Examples(item)[0];if(!ex)return;const opts=shuffle([ex.reading,...k218ClosestExampleReadings(ex.reading,item).slice(0,3)]);if(opts.length<4)return;
        qs.push({item,type,label:'Đọc từ ví dụ',q:`「${ex.word}」 đọc thế nào?`,correct:ex.reading,answers:opts,example:ex});
      }
    });
  });
  return shuffle(qs).slice(0,Math.min(count,qs.length));
}
function renderKanji218HardSetup(box){
  box.innerHTML=`<div class="k218-hard-intro"><div><span class="hard-badge">⚔ SUPER HARD</span><h2>Trắc nghiệm Kanji siêu khó</h2><p>Không dùng đáp án ngẫu nhiên đơn giản: hệ thống ưu tiên chữ gần hình, âm đọc gần nhau và nghĩa cùng nhóm để tạo bẫy.</p></div><div class="k218-hard-controls"><label>Dạng<select id="k218-hard-kind"><option value="mixed">Trộn tất cả</option><option value="shape">Bẫy mặt chữ</option><option value="meaning">Nghĩa dễ nhầm</option><option value="on">Onyomi</option><option value="kun">Kunyomi</option><option value="example">Đọc từ ví dụ</option></select></label><label>Số câu<select id="k218-hard-count"><option>10</option><option selected>20</option><option>40</option><option>80</option></select></label><button class="primary-btn" onclick="startKanji218HardQuiz()">Bắt đầu →</button></div></div><div class="k218-trap-preview"><b>Ví dụ bẫy:</b> 日 / 目 / 白 / 田 • 人 / 入 / 八 • 聞 / 間 / 問 • 本 / 木 / 末 / 未 • 持 / 待 / 時 • 駅 / 験</div><div id="k218-hard-area"></div>`;
}
function startKanji218HardQuiz(){const count=+(document.getElementById('k218-hard-count')?.value||20),kind=document.getElementById('k218-hard-kind')?.value||'mixed';kanji218QuizState={questions:createKanji218HardQuestions(count,kind),index:0,score:0,answered:false,wrong:[],kind,count};renderKanji218HardQuestion()}
function renderKanji218HardQuestion(){
  const area=document.getElementById('k218-hard-area'),s=kanji218QuizState;if(!area||!s)return;
  if(s.index>=s.questions.length)return renderKanji218HardResult(area);
  const q=s.questions[s.index],pct=Math.round(s.index/s.questions.length*100);
  s.questionStartedAt=Date.now();
  area.innerHTML=`<div class="k218-hard-card"><div class="hard-quiz-header"><span class="hard-badge">⚔ ${q.label}</span><span>Câu ${s.index+1}/${s.questions.length}</span></div><div class="progressbar"><span style="width:${pct}%"></span></div><div class="k218-hard-question">${escapeHtml(q.q)}</div><div class="k218-hard-answers">${q.answers.map((a,i)=>`<button class="k218-hard-answer" data-answer="${escapeHtml(a)}" onclick="answerKanji218Hard(this,${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHtml(a)}</b></button>`).join('')}</div><div id="k218-hard-feedback"></div></div>`;
}
function answerKanji218Hard(btn,i){
  const s=kanji218QuizState;if(!s||s.answered)return;s.answered=true;const q=s.questions[s.index],sel=q.answers[i];
  document.querySelectorAll('.k218-hard-answer').forEach(x=>{if(x.dataset.answer===q.correct)x.classList.add('correct')});if(sel===q.correct)s.score++;else{btn.classList.add('wrong');s.wrong.push(q)}
  const k=q.item,ex=collectKanji218Examples(k).slice(0,2);
  const skill=q.type==='shape'?'kanji-shape':q.type==='meaning'?'kanji-meaning':q.type==='on'?'kanji-on':q.type==='kun'?'kanji-kun':'kanji-reading';
  recordRecallEvent({itemKey:recallKey(['k218',k.kanji,q.type]),domain:'kanji218',skill,itemLabel:k.kanji,target:k.kanji,prompt:q.q,selected:sel,correctAnswer:q.correct,correct:sel===q.correct,responseMs:Date.now()-(s.questionStartedAt||Date.now()),source:'218 Kanji SUPER HARD',answers:q.answers,explanation:`${k.kanji} • ${k.meaning} • On: ${k.on} • Kun: ${k.kun}`});
  document.getElementById('k218-hard-feedback').innerHTML=`<div class="feedback k218-hard-feedback"><b>${sel===q.correct?'✓ Chính xác':'✗ Đáp án đúng: '+escapeHtml(q.correct)}</b><div class="k218-feedback-kanji"><strong>${k.kanji}</strong><span>${escapeHtml(k.meaning)}</span><small>On: ${escapeHtml(k.on)} • Kun: ${escapeHtml(k.kun)}</small></div>${ex.length?`<div class="k218-feedback-ex">${ex.map(x=>`${escapeHtml(x.word)}（${escapeHtml(x.reading)}）= ${escapeHtml(x.meaning)}`).join(' • ')}</div>`:''}</div><div class="n4-next"><button class="primary-btn" onclick="nextKanji218Hard()">Câu tiếp theo →</button></div>`;
}
function nextKanji218Hard(){kanji218QuizState.index++;kanji218QuizState.answered=false;renderKanji218HardQuestion()}
function renderKanji218HardResult(area){const s=kanji218QuizState,pct=s.questions.length?Math.round(s.score/s.questions.length*100):0;area.innerHTML=`<div class="k218-hard-result"><span class="hard-badge">⚔ SUPER HARD COMPLETE</span><h2>${s.score}/${s.questions.length}</h2><p>${pct>=90?'Rất chắc mặt chữ và cách đọc.':pct>=75?'Khá tốt. Các bẫy nét gần vẫn cần xem lại.':pct>=55?'Đang tiến bộ — nên luyện lại riêng câu sai.':'Hãy quay về flashcard, tập nhóm dễ nhầm rồi thử lại.'}</p><div class="n4-result-actions"><button class="primary-btn" onclick="startKanji218HardQuiz()">Bộ mới ↻</button>${s.wrong.length?`<button class="secondary-btn" onclick="reviewKanji218Wrong()">Luyện lại ${s.wrong.length} câu sai</button>`:''}</div></div>`}
function reviewKanji218Wrong(){const wrong=[...kanji218QuizState.wrong];kanji218QuizState={...kanji218QuizState,questions:shuffle(wrong),index:0,score:0,answered:false,wrong:[]};renderKanji218HardQuestion()}
