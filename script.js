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
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 이미지 로드
    const heartImg = new Image();
    heartImg.src = "heart.jpeg";

    const basketImg = new Image();
    basketImg.src = "basket.png";

    // 플레이어 바 (캐쳐)
    const catcher = {
      width: 100,
      height: 60,
      x: canvas.width / 2 - 50,
      y: canvas.height - 80
    };

    const hearts = [];
    const heartSize = 30;
    let score = 0;

    function createHeart() {
      const x = Math.random() * (canvas.width - heartSize);
      hearts.push({ x: x, y: -heartSize });
    }

    function drawCatcher() {
      ctx.drawImage(basketImg, catcher.x, catcher.y, catcher.width, catcher.height);
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

        // 바닥에 떨어졌을 때
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

    // 하트 생성 주기
    setInterval(createHeart, 1000);

    // 이미지가 다 로드된 후에 게임 시작
    basketImg.onload = () => {
      heartImg.onload = () => {
        gameLoop();
      };
    };
  </script>
</body>
</html>
