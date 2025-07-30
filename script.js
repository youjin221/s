<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>하트 받기 게임</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #f0f0f0;
    }
    canvas {
      display: block;
      margin: 0 auto;
      background: white;
      border: 2px solid hotpink;
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas"></canvas>

  <script>
    const heartImg = new Image();
    heartImg.src = "heart.jpeg";
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // 캔버스 크기 설정
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 플레이어 바
    const catcher = {
      width: 80,
      height: 20,
      x: canvas.width / 2 - 40,
      y: canvas.height - 40,
      color: "hotpink"
    };

    // 하트들
    const hearts = [];
    const heartSize = 30;
    let score = 0;

    function createHeart() {
      const x = Math.random() * (canvas.width - heartSize);
      hearts.push({ x: x, y: -heartSize });
    }

    function drawCatcher() {
      ctx.fillStyle = catcher.color;
      ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);
    }

    function drawHearts() {
  hearts.forEach((heart) => {
    ctx.drawImage(heartImg, heart.x, heart.y, heartSize, heartSize);
  });
}


    function moveHearts() {
      hearts.forEach((heart, index) => {
        heart.y += 5;

        // 충돌 체크
        if (
          heart.y + heartSize >= catcher.y &&
          heart.x + heartSize >= catcher.x &&
          heart.x <= catcher.x + catcher.width
        ) {
          hearts.splice(index, 1);
          score++;
        }

        // 화면 밖으로 나간 하트 제거
        if (heart.y > canvas.height) {
          hearts.splice(index, 1);
        }
      });
    }

    function drawScore() {
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText("Score: " + score, 10, 30);
    }

    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCatcher();
      drawHearts();
      moveHearts();
      drawScore();
      requestAnimationFrame(gameLoop);
    }

    // 터치 조작
    document.addEventListener("touchmove", function (e) {
      const touchX = e.touches[0].clientX;
      catcher.x = touchX - catcher.width / 2;
    });

    // 일정 시간마다 하트 생성
    setInterval(createHeart, 1000);

    gameLoop();
  </script>
</body>
</html>
