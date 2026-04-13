const express = require("express");
const app = express();
const PORT = 3000;

const fortunes = [
  { emoji: "🎰", text: "오늘은 대박 나는 날! 로또를 사보세요" },
  { emoji: "📚", text: "조용히 공부하면 좋은 성적이 올 것입니다" },
  { emoji: "🍗", text: "오늘 점심은 치킨이 정답입니다" },
  { emoji: "✨", text: "당신의 숨은 재능이 빛날 때입니다" },
  { emoji: "💌", text: "오늘 친구에게 먼저 연락하면 좋은 일이 생겨요" },
  { emoji: "☕", text: "커피 한 잔의 여유가 행운을 부릅니다" },
  { emoji: "🌙", text: "오늘은 일찍 자면 내일이 빛납니다" },
  { emoji: "🌸", text: "뜻밖의 만남이 기다리고 있습니다" },
  { emoji: "💪", text: "지금 하고 있는 일, 잘하고 있어요!" },
  { emoji: "🎲", text: "오늘의 행운 숫자는 " + Math.floor(Math.random() * 45 + 1) + "입니다" },
];

// 서버 메모리에 저장 — 모든 사용자가 공유하는 상태
let totalDraws = 0;

// API: 운세 뽑기 (카운터 +1 후 운세 반환)
app.get("/api/fortune", (req, res) => {
  totalDraws++;
  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.json({
    emoji: fortune.emoji,
    text: fortune.text,
    totalDraws,
    serverTime: new Date().toLocaleTimeString("ko-KR", { timeZone: "Asia/Seoul" }),
  });
});

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>오늘의 운세 (동적)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; }
    body {
      font-family: 'Noto Sans KR', sans-serif;
      background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%);
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      position: relative; overflow: hidden;
    }
    body::before, body::after {
      content: ''; position: absolute; border-radius: 50%;
      background: rgba(255,255,255,0.3); filter: blur(40px);
    }
    body::before { width: 300px; height: 300px; top: -100px; right: -100px; }
    body::after { width: 400px; height: 400px; bottom: -150px; left: -150px; }
    .card {
      position: relative; z-index: 1;
      width: 100%; max-width: 480px;
      background: rgba(255,255,255,0.85);
      backdrop-filter: blur(20px);
      border-radius: 32px;
      padding: 48px 40px;
      box-shadow: 0 20px 60px rgba(244,143,177,0.3);
      text-align: center;
      animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .badge {
      display: inline-block;
      background: #c2185b; color: #fff;
      font-size: 0.75rem; font-weight: 700;
      letter-spacing: 2px;
      padding: 6px 16px; border-radius: 20px;
      margin-bottom: 24px;
    }
    h1 {
      font-family: 'Gaegu', cursive;
      font-size: 2.5rem; color: #880e4f;
      margin-bottom: 24px;
      letter-spacing: 2px;
    }
    .counter {
      display: inline-flex; align-items: center; gap: 8px;
      background: #fce4ec; color: #ad1457;
      font-size: 0.9rem; font-weight: 700;
      padding: 8px 18px; border-radius: 20px;
      margin-bottom: 24px;
      border: 2px solid #f8bbd0;
    }
    .counter-num {
      font-family: 'Gaegu', cursive;
      font-size: 1.3rem;
    }
    .emoji {
      font-size: 4rem; margin-bottom: 16px;
      transition: transform 0.3s ease;
    }
    .emoji.animate {
      animation: bounce 0.6s ease-in-out;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-12px) scale(1.15); }
    }
    .fortune-text {
      font-size: 1.4rem; font-weight: 700; color: #4a148c;
      line-height: 1.6; margin-bottom: 24px;
      min-height: 90px;
      display: flex; align-items: center; justify-content: center;
      padding: 0 8px;
    }
    .btn {
      background: #c2185b; color: #fff;
      border: none; cursor: pointer;
      font-family: inherit;
      font-size: 1rem; font-weight: 700;
      padding: 14px 28px; border-radius: 16px;
      display: inline-flex; align-items: center; gap: 8px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(194,24,91,0.3);
    }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(194,24,91,0.4); }
    .btn:active { transform: translateY(0); }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .divider {
      height: 1px; background: linear-gradient(to right, transparent, #f48fb1, transparent);
      margin: 24px 0;
    }
    .meta {
      display: flex; justify-content: space-between; align-items: center;
      font-size: 0.85rem; color: #8e24aa;
    }
    .note {
      font-weight: 500;
    }
    .tag-dynamic {
      display: inline-block;
      background: #f06292; color: #fff;
      font-size: 0.7rem; font-weight: 700;
      padding: 3px 10px; border-radius: 10px;
    }
    .server-time {
      font-size: 0.75rem; color: #ad1457;
      margin-top: 14px;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">TODAY'S FORTUNE</div>
    <h1>오늘의 운세</h1>
    <div class="counter">👁 누적 <span class="counter-num" id="counter">${totalDraws}</span>번 뽑혔어요</div>
    <div class="emoji" id="emoji">🎲</div>
    <div class="fortune-text" id="fortune">버튼을 눌러 운세를 뽑아보세요</div>
    <button class="btn" id="btn" onclick="drawFortune()">🔄 운세 뽑기</button>
    <div class="divider"></div>
    <div class="meta">
      <span class="note">서버가 기억하고 있어요</span>
      <span class="tag-dynamic">DYNAMIC</span>
    </div>
    <p class="server-time" id="time">접속 시간: ${new Date().toLocaleTimeString("ko-KR", { timeZone: "Asia/Seoul" })}</p>
  </div>

  <script>
    async function drawFortune() {
      const btn = document.getElementById('btn');
      btn.disabled = true;

      // 서버에 요청 — 서버가 카운터 +1 하고 운세 생성해서 돌려줌
      const res = await fetch('/api/fortune');
      const data = await res.json();

      const emoji = document.getElementById('emoji');
      emoji.classList.remove('animate');
      void emoji.offsetWidth; // reflow
      emoji.classList.add('animate');
      emoji.textContent = data.emoji;
      document.getElementById('fortune').textContent = data.text;
      document.getElementById('counter').textContent = data.totalDraws;
      document.getElementById('time').textContent = '서버 시간: ' + data.serverTime;

      btn.disabled = false;
    }
  </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
