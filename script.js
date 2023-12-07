document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("roulette");
  const ctx = canvas.getContext("2d");
  const spinButton = document.getElementById("spin");
  // const participantInput = document.getElementById("participant-name");
  // const participantWeightInput = document.getElementById("participant-weight");
  // const addParticipantButton = document.getElementById("add-participant");
  const resetButton = document.querySelector("#reset");

  let roulettes = [];
  let participants = [];
  let colors = [];
  let angle = 0;
  let isSpinning = false;
  let animationFrameId;

  const tech_7_member = [
    "공영균",
    "김일진",
    "김인경",
    "김상훈",
    "김종식",
    "김동환",
    "우창욱",
  ];

  const addParticipant = (name, weight) => {
    if (
      name.trim() === "" ||
      weight <= 0 ||
      participants.some((p) => p.name === name)
    ) {
      return;
    }

    const existingParticipant = participants.find((p) => p.name === name);

    if (existingParticipant) {
      // If the participant already exists, use their existing color
      colors.push(existingParticipant.color);
    } else {
      // If it's a new participant, assign a random color
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(randomColor);
    }

    participants.push({ name, weight, color: colors[colors.length - 1] });

    drawRoulette(name);
  };

  // addParticipantButton.addEventListener("click", () => {
  //   addParticipant(
  //     participantInput.value,
  //     parseFloat(participantWeightInput.value)
  //   );
  //   participantInput.value = "";
  //   participantWeightInput.value = "";
  // });

  removeParticipant = (name) => {
    const index = participants.findIndex((p) => p.name === name);

    if (index !== -1) {
      const removedParticipant = participants.splice(index, 1)[0];
      const removedColor = removedParticipant.color;

      const res = roulettes.find((roulette) => roulette.name === name);
      if (res) {
        const ctxIndex = roulettes.indexOf(res);
        roulettes.splice(ctxIndex, 1);
        res.ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Redraw the roulette without the removed participant
        drawRoulette();
      }

      // Reuse the removed color for future participants
      colors.push(removedColor);
    }
  };

  const drawRoulette = (name) => {
    if (participants.length === 0) return;

    const totalWeight = participants.reduce((acc, p) => acc + p.weight, 0);
    let startAngle = 0;
    const ctx = canvas.getContext("2d");
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
    roulettes.push({ ctx, name });

    return ctx;
  };

  const updateRoulette = () => {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    drawRoulette();
    ctx.restore();
  };

  let spinSpeed = 1; // 회전 속도 변수
  let isStopping = false; // 스핀 멈추기 시작했는지 표시하는 변수

  const spinRoulette = () => {
    if (isStopping && spinSpeed <= 0.001) {
      spinSpeed = 0;
      isStopping = false;
      isSpinning = false;
      spinButton.textContent = "Spin";
      const winner = getWinner(); // 당첨자 결정
      displayWinner(winner); // 당첨자 표시
    }

    angle += spinSpeed; // 회전 각도 증가
    if (isStopping) {
      spinSpeed *= 0.95; // 스핀 속도 감소
    }
    updateRoulette();
    requestAnimationFrame(spinRoulette);
  };

  spinButton.addEventListener("click", () => {
    if (!isSpinning) {
      spinSpeed = 0.5; // 초기 스핀 속도 설정
      isSpinning = true;
      spinButton.textContent = "Stop";
      requestAnimationFrame(spinRoulette);
    } else {
      isStopping = true; // 스핀 멈추기 시작
      isSpinning = false;
      spinButton.textContent = "Spin";
    }
  });
  // 엔터키 이벤트 추가
  // participantInput.addEventListener("keypress", (e) => {
  //   if (e.key === "Enter") {
  //     addParticipant(
  //       participantInput.value,
  //       parseFloat(participantWeightInput.value)
  //     );
  //     participantInput.value = "";
  //     participantWeightInput.value = "";
  //   }
  // });

  // participantWeightInput.addEventListener("keypress", (e) => {
  //   if (e.key === "Enter") {
  //     addParticipant(
  //       participantInput.value,
  //       parseFloat(participantWeightInput.value)
  //     );
  //     participantInput.value = "";
  //     participantWeightInput.value = "";
  //   }
  // });
  drawRoulette();

  document.querySelector("#reset").addEventListener("click", () => {
    // location.reload();
  });

  const tech_7_member_DOM = document.querySelector(".tech7-users");

  tech_7_member.forEach((name) => {
    const userBtn = `
        <div>
        <input type="checkbox" id="${name}" />
        <label for="${name}">
          <span>${name}</span>
          <span class="${name} ratio">1</span>
          <button class="plus btn-sm">+</button>
          <button class="minus btn-sm">-</button>
        </label>
      </div>
    `;
    tech_7_member_DOM.innerHTML += userBtn;
  });

  document.querySelectorAll(".plus").forEach((element) => {
    element.addEventListener("click", (e) => {
      const label = e.target.closest("label");
      const inputElement = label.previousElementSibling;
      const ratioElement = label.querySelector(".ratio");

      let currentRatio = parseFloat(ratioElement.innerText, 10);
      currentRatio = Math.min(currentRatio + 0.1, 10); // 최소값은 1으로 설정
      ratioElement.innerText = currentRatio.toString();

      removeParticipant(label.htmlFor);
      inputElement.checked = false;
    });
  });

  document.querySelectorAll(".minus").forEach((element) => {
    element.addEventListener("click", (e) => {
      const label = e.target.closest("label");
      const inputElement = label.previousElementSibling;

      const ratioElement = label.querySelector(".ratio");

      let currentRatio = parseFloat(ratioElement.innerText, 10);
      currentRatio = Math.max(currentRatio - 0.1, 1); // 최소값은 1으로 설정
      ratioElement.innerText = currentRatio.toString();

      removeParticipant(label.htmlFor);
      inputElement.checked = false;
    });
  });

  tech_7_member.forEach((member) => {
    const memberDOM = document.querySelector(`#${member}`);

    memberDOM.addEventListener("click", (e) => {
      const memberRatioDOM = document.querySelector(`.${member}.ratio`);

      if (e.target.checked) {
        addParticipant(e.target.id, parseFloat(memberRatioDOM.innerText));
      } else {
        removeParticipant(e.target.id);
      }
    });
  });

  const getWinner = () => {
    const adjustedAngle =
      (2 * Math.PI - (angle % (2 * Math.PI))) % (2 * Math.PI); // 각도를 0에서 2π 사이 값으로 조정
    let cumulativeAngle = 0;
    const totalWeight = participants.reduce((acc, p) => acc + p.weight, 0);

    // 각 참여자에 대해
    for (const participant of participants) {
      const sliceAngle = (participant.weight / totalWeight) * 2 * Math.PI;
      cumulativeAngle += sliceAngle;
      if (adjustedAngle <= cumulativeAngle) {
        return participant.name; // 당첨된 참여자 반환
      }
    }
  };

  const displayWinner = (winnerName) => {
    // 당첨된 유저를 표시하는 코드 (예: 알림, DOM 요소 변경 등)
    window.alert(`당첨자: ${winnerName}`);
  };
});
