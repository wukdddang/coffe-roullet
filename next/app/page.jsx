// import UserList from "@/components/user-list/UserList";

import Roulette from "@/components/roullet/Roulette";

export default function Home() {
  return (
    <>
      <div className="container px-3">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 p-2 mt-1" id="main-column">
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-center align-items-center">
                <div id="roulette-container">
                  <canvas id="roulette" width="300" height="300"></canvas>
                </div>
              </div>
            </div>

            <div className="row d-flex align-items-stretch">
              {/* <!-- Button trigger modal --> */}
              <div className="col-sm-12">
                <button
                  id="spin"
                  className="d-flex justify-content-center align-items-center btn btn-primary w-100 align-self-stretch mb-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="white"
                  >
                    <path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z" />
                  </svg>
                  <span>Spin</span>
                </button>
              </div>
              <div className="col-sm-12">
                <button
                  type="button"
                  className="btn btn-primary w-100 align-self-stretch mb-2"
                  id="practiceModeButton"
                >
                  <span className="font-weight-bold" id="buttonText">
                    연습 모드
                  </span>
                </button>
              </div>

              <div className="col-sm-12">
                <div className="col-sm-12">
                  <button
                    type="button"
                    className="btn btn-dark w-100 mb-2"
                    data-bs-toggle="modal"
                    data-bs-target="#tech-7-member-selection"
                  >
                    <span className="font-weight-bold">참여자 선택</span>
                  </button>
                </div>
                <div className="col-sm-12">
                  <button
                    type="button"
                    className="btn btn-warning w-100"
                    // onClick="location.href='/user'"
                  >
                    <span className="font-weight-bold">명예의 전당</span>
                  </button>
                </div>
              </div>

              {/* <!-- <button id="reset" className="btn btn-danger mt-3">Reset</button> --> */}

              {/* <!-- <button
              id="reset"
              className="btn btn-danger"
              style="display: none; justify-content: center; align-items: center"
            >
              리셋하기
            </button> --> */}

              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="tech-7-member-selection"
                tabIndex="-1"
                aria-labelledby="tech-7-member-selection-label"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title"
                        id="tech-7-member-selection-label"
                      >
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
                        <div className="row">
                          <table className="table table-hover">
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
                        {/* <!-- <input type="checkbox" id="select-all" />
                      <label for="select-all">전체 선택</label> --> */}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        id="select-all"
                        type="button"
                        className="btn btn-success"
                      >
                        전체 선택
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
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
      {/* <!-- Button trigger modal --> */}
      <button
        id="target-modal"
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{ display: "none" }}
      ></button>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
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
      <Roulette />
    </>
  );
}