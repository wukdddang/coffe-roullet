import { useRouter } from "next/navigation";
import React from "react";

export default function Modal() {
  const router = useRouter();

  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="tech-7-member-selection-label">
              <span className="font-weight-bold">참여자 선택</span>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div id="participant-container">
              <div className="">
                <table className="table table-hover tw-px-2">
                  <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "30%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col text-sm">참여</th>
                      <th scope="col">이름</th>
                      <th scope="col">가중치</th>
                      <th scope="col">비율 조절</th>
                    </tr>
                  </thead>
                  <tbody className="tech7-users"></tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="tw-flex tw-justify-end tw-gap-2 tw-pb-2 tw-px-2">
            <button
              id="select-all"
              type="button"
              className="tw-bg-green-500 hover:tw-bg-green-600 active:tw-bg-green-600 tw-text-white tw-py-2 tw-px-3 tw-rounded-lg"
            >
              전체 선택
            </button>
            <button
              type="button"
              className="tw-bg-blue-500 hover:tw-bg-blue-600 active:tw-bg-blue-600 tw-text-white tw-py-2 tw-px-3 tw-rounded-lg"
              data-bs-dismiss="modal"
              onClick={() => router.push("/")}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
