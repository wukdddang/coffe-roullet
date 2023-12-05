document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("roulette");
  const ctx = canvas.getContext("2d");
  const spinButton = document.getElementById("spin");
  const participantInput = document.getElementById("participant-name");
  const participantWeightInput = document.getElementById("participant-weight");
  const addParticipantButton = document.getElementById("add-participant");

  let participants = [];
  let colors = [];
  let angle = 0;
  let isSpinning = false;
  let animationFrameId;

  const addParticipant = (name, weight) => {
    if (
      name.trim() === "" ||
      weight <= 0 ||
      participants.some((p) => p.name === name)
    )
      return;
    participants.push({ name, weight });
    colors.push("#" + Math.floor(Math.random() * 16777215).toString(16)); // Random color
    drawRoulette();
  };

  addParticipantButton.addEventListener("click", () => {
    addParticipant(
      participantInput.value,
      parseFloat(participantWeightInput.value)
    );
    participantInput.value = "";
    participantWeightInput.value = "";
  });

  const drawRoulette = () => {
    if (participants.length === 0) return;

    const totalWeight = participants.reduce((acc, p) => acc + p.weight, 0);
    let startAngle = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    participants.forEach((participant, index) => {
      const sliceAngle = (participant.weight / totalWeight) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      const textAngle = startAngle + sliceAngle / 2; // 참여자 이름을 그릴 각도

      // 섹션 그리기
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        startAngle,
        endAngle
      );
      ctx.fillStyle = colors[index];
      ctx.fill();

      // 참여자 이름 그리기
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(textAngle);
      ctx.textAlign = "right";
      ctx.fillStyle = "#000000"; // 텍스트 색상
      ctx.font = "14px Arial"; // 텍스트 폰트
      ctx.fillText(participant.name, canvas.width / 2 - 10, 0); // 텍스트 위치 조정
      ctx.restore();

      startAngle = endAngle;
    });
  };

  const updateRoulette = () => {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    drawRoulette();
    ctx.restore();
  };

  let spinSpeed = 50; // 회전 속도 변수
  let isStopping = false; // 스핀 멈추기 시작했는지 표시하는 변수

  const spinRoulette = () => {
    if (isStopping && spinSpeed <= 0) {
      spinSpeed = 0;
      isStopping = false;
      isSpinning = false; // 스핀을 다시 시작할 수 있도록 상태 변경
      spinButton.textContent = "Spin";
      return;
    }

    angle += spinSpeed; // 현재 속도로 회전

    // 멈추기 시작했을 때만 속도 감소
    if (isStopping) {
      spinSpeed *= 0.99; // 스핀 속도 감소
    }

    updateRoulette();
    animationFrameId = requestAnimationFrame(spinRoulette);
  };

  spinButton.addEventListener("click", () => {
    if (!isSpinning) {
      spinSpeed = 0.1; // 초기 스핀 속도 설정
      isSpinning = true;
      spinButton.textContent = "Stop";
      requestAnimationFrame(spinRoulette);
    } else {
      isStopping = true; // 스핀 멈추기 시작
      spinButton.textContent = "Spin";
    }
  });
  // 엔터키 이벤트 추가
  participantInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addParticipant(
        participantInput.value,
        parseFloat(participantWeightInput.value)
      );
      participantInput.value = "";
      participantWeightInput.value = "";
    }
  });

  participantWeightInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addParticipant(
        participantInput.value,
        parseFloat(participantWeightInput.value)
      );
      participantInput.value = "";
      participantWeightInput.value = "";
    }
  });
  drawRoulette();
});
