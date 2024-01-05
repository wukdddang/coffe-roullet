"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaRotateRight } from "react-icons/fa6";
import { VscTriangleLeft } from "react-icons/vsc";
import { IoPeopleSharp } from "react-icons/io5";
import { FaRunning } from "react-icons/fa";

// import FetchClass from "@/service/fetch";
import { getPastelColors, pastelColors } from "@/constants/colors";
import { useGlobalState } from "@/context/GlobalProvider";
// import NormalButton from "../buttons/NormalButton";
import IconButton from "../buttons/IconButton";

type User = {
  id: number;
  name: string;
  weight: number;
};

export default function Roulette() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { participants } = useGlobalState();
  const [colors, setColors] = useState<pastelColors[]>([]);

  let roulettes = [];
  let isStopping = false;
  let isSpinning = false;
  let spinSpeed = 0.4; // 초기 회전 속도
  let angle = 0; // 초기 각도

  const spinRoulette = () => {
    if (!canvasRef.current) {
      return;
    }

    angle += spinSpeed;

    if (isStopping) {
      // 멈추기 시작했을 때
      spinSpeed *= Math.random() * (0.995 - 0.99) + 0.99;
      if (spinSpeed <= 0.001) {
        const stopButton = document.querySelector("#spin");
        // 멈춘 경우
        isStopping = false;
        isSpinning = false;
        spinSpeed = 0.4;
        if (stopButton) {
          stopButton.disabled = false;
          stopButton.textContent = "룰렛 돌리기";
        }

        return; // 회전 중단
      }
    }

    updateRoulette(); // 룰렛 업데이트
    requestAnimationFrame(spinRoulette); // 계속해서 자기 자신을 호출
  };

  const toggleSpin = () => {
    const stopButton = document.querySelector("#spin");
    if (isSpinning && !isStopping) {
      isStopping = true;
      if (stopButton) {
        stopButton.disabled = true;
        stopButton.textContent = "룰렛 돌리기";
      }
    } else if (!isSpinning) {
      if (stopButton) {
        stopButton.textContent = "룰렛 멈추기";
      }
      isSpinning = true;
      spinRoulette();
    }
  };

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // 요소 교환
    }
    return array;
  };

  const drawRoulette = (
    userData: User[],
    // name: string,
    canvas: HTMLCanvasElement
  ) => {
    if (userData.length === 0) {
      return;
    }

    const totalWeight = userData.reduce((acc, p) => acc + p.weight, 0);
    let startAngle = 0;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      userData.forEach((participant, index) => {
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
        ctx.font = "Bold 14px Pretendard"; // 텍스트 폰트
        ctx.fillText(participant.name, canvas.width / 2 - 10, 0); // 텍스트 위치 조정
        ctx.imageSmoothingEnabled = false; // 안티엘리어싱 해제
        ctx.restore();

        startAngle = endAngle;
      });
      roulettes.push({ ctx, name });

      return ctx;
    }
  };

  const updateRoulette = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    drawRoulette(participants, canvas); // 룰렛 다시 그리기
    ctx.restore();
  };

  useEffect(() => {
    if (participants.length > 0) {
      const availableColors = shuffleArray(getPastelColors());
      setColors(availableColors);
    }
  }, [participants]);

  useEffect(() => {
    if (participants.length > 0 && colors.length > 0) {
      drawRoulette(participants, canvasRef.current!);
    }
  }, [participants, colors]);

  return (
    <motion.div
      // TODO: motion.div 애니메이션 분리 필요
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {participants.length === 0 ? (
        <div className="tw-flex tw-justify-center tw-items-center tw-relative tw-h-[400px] tw-text-[24px] tw-font-bold">
          룰렛을 렌더링 중입니다...
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            id="roulette-container"
          >
            <canvas
              ref={canvasRef}
              id="roulette"
              width="300"
              height="300"
              className="tw-shadow-xl"
            ></canvas>
            <div className="tw-flex tw-justify-center tw-items-center tw-pb-[9px]">
              <VscTriangleLeft size={36} />
            </div>
          </motion.div>
          <div className="tw-flex tw-justify-center tw-flex-col tw-gap-2 tw-items-center">
            <IconButton
              id="spin"
              icon={<FaRotateRight />}
              text={isStopping ? "룰렛 멈추기" : "룰렛 돌리기"}
              type="button"
              className="tw-w-[240px] tw-text-[12px] sm:tw-text-[16px] tw-bg-green-500 hover:tw-bg-green-600 active:tw-bg-green-600 tw-text-white tw-py-2 tw-px-3 tw-rounded-lg tw-flex tw-justify-center tw-items-center tw-gap-2 disabled:tw-opacity-50"
              action="spin"
              onClick={toggleSpin}
            />

            <IconButton
              icon={<FaRunning />}
              text="연습 모드"
              type="button"
              className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-w-[240px] tw-text-[12px] sm:tw-text-[16px] tw-bg-blue-500 hover:tw-bg-blue-600 active:tw-bg-blue-600 tw-text-white tw-py-2 tw-px-3 tw-rounded-lg"
              action="practice"
            />
            <IconButton
              icon={<IoPeopleSharp />}
              text="참여자 선택"
              type="button"
              className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-w-[240px] tw-text-[12px] sm:tw-text-[16px] tw-bg-gray-800 hover:tw-bg-gray-900 active:tw-bg-gray-900 tw-text-white tw-py-2 tw-px-3 tw-rounded-lg"
              action="choose"
            />
          </div>
        </>
      )}
    </motion.div>
  );
}
