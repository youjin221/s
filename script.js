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
    // 이미지 로드
    const basketImg = new Image();
    basketImg.src = "basket.jpeg"; // 바구니 이미지 파일이 이 이름이어야 함 (같은 폴더에 있어야 함)

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 플레이어 바 (이미지로 바뀜)
    const catcher = {
      width: 100,
      height: 60,
      x: canvas.width / 2 - 50,
      y: canvas.height - 80
    };

    // 떨어지는 공들
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
      ctx.fillStyle = "red";
      hearts.forEach((heart) => {
        ctx.beginPath();
        ctx.arc(
          heart.x + heartSize / 2,
          heart.y + heartSize / 2,
          heartSize / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
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

        // 바닥까지 떨어진 경우 제거
        if (heart.y > canvas.height) {
          hearts.splice(index, 1);
          score--; // 점수 감소
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

    gameLoop();
  </script>
</body>
</html>
