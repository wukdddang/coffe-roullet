"use client";

// import UserList from "@/components/user-list/UserList";

import Roulette from "@/components/roulette/Roulette";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalState } from "@/context/GlobalProvider";
import FetchClass from "@/service/fetch";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const fetchInstance = new FetchClass();
  const { participants, setParticipants } = useGlobalState();

  const handleFetch = async () => {
    try {
      const url = "http://localhost:3000/api/user/list";
      const options = { method: "GET" }; // 요청 메서드와 필요한 옵션
      const responseData = await fetchInstance.runFetch(url, options);
      setParticipants(responseData.users); // 응답 데이터 상태에 저장
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (participants.length === 0) {
      handleFetch();
    }
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="home"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transitionTimingFunction: "ease-in",
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="container px-3">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 p-2 mt-1" id="main-column">
              <div className="row">
                <div className="col-sm-12 d-flex justify-content-center align-items-center tw-mb-2">
                  <Roulette />
                </div>
              </div>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
        <button
          id="target-modal"
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ display: "none" }}
        ></button>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content container-fluid">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  🎉🎊축하드립니다!🎉🎊
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="target-modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  닫기
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <Modal /> */}
      </motion.div>
    </AnimatePresence>
  );
}
