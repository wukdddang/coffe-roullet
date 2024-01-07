"use client";
// import UserList from "@/components/user-list/UserList";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useFetchUsers from "@/hooks/useFetchUserList";
import { useState } from "react";
import useFetchUser from "@/hooks/useFetchUser";

export default function Page() {
  const router = useRouter();
  const { user } = useFetchUser();
  const [selectAll, setSelectAll] = useState(false);

  // console.log(participants);

  return (
    <>
      {user.length === 0 ? (
        <div className="tw-flex tw-justify-center tw-items-center tw-relative tw-h-[400px] tw-text-[24px] tw-font-bold">
          유저를 불러오는 중입니다...
        </div>
      ) : (
        <motion.div
          key="users"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="tw-grid sm:tw-grid-cols-10 tw-px-4 sm:tw-px-2"
        >
          <div className="tw-col-span-2"></div>
          <div className="tw-mt-10 tw-col-span-6">
            <table className="table table-hover">
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>

              <thead>
                <tr className="tw-text-[12px] sm:tw-text-[16px] tw-text-center">
                  <th>참여</th>
                  <th>이름</th>
                  <th>가중치</th>
                  <th>비율 조절</th>
                </tr>
              </thead>
              <tbody>
                {user.map((user, index) => {
                  return (
                    <tr
                      key={index}
                      className="tw-text-[12px] sm:tw-text-[16px]"
                    >
                      <td className="tw-text-center">
                        <input
                          type="checkbox"
                          name="user"
                          value={user.name}
                          checked={selectAll ? true : false}
                          className="tw-mx-auto tw-w-4 tw-h-4 tw-rounded-sm tw-border tw-border-gray-300 tw-text-green-500 focus:tw-ring-green-500"
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.weight.toFixed(1)}</td>
                      <td>
                        <div className="tw-flex tw-items-center">
                          <span className="tw-ml-2 tw-text-[12px] sm:tw-text-[16px]">
                            <button
                              className="tw-px-2 tw-py-1 sm:tw-px-4 sm:tw-py-2 tw-ml-[1px] tw-bg-cyan-200 tw-rounded-lg sm:tw-ml-8 tw-shadow-lg"
                              onClick={() => {
                                console.log("plus");
                                fetch(
                                  `/api/user/increase/weight/${user.name}`,
                                  {
                                    method: "GET",
                                  }
                                ).then((res) => {
                                  if (res.ok) {
                                    window.location.reload();
                                  }
                                });
                              }}
                            >
                              +
                            </button>
                            <button
                              className="tw-px-2 tw-py-1 sm:tw-px-4 sm:tw-py-2 tw-bg-orange-200 tw-rounded-lg sm:tw-ml-2 tw-shadow-lg"
                              onClick={() => {
                                console.log("minus");
                                fetch(
                                  `/api/user/decrease/weight/${user.name}`,
                                  {
                                    method: "GET",
                                  }
                                ).then((res) => {
                                  if (res.ok) {
                                    window.location.reload();
                                  }
                                });
                              }}
                            >
                              -
                            </button>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="col-sm-12">
              <form method="post" target="/user">
                <div className="tw-flex justify-content-between tw-gap-2">
                  <div className="tw-flex-grow-0 tw-flex tw-justify-center tw-items-center">
                    <input
                      type="checkbox"
                      id="selectAll"
                      className="tw-w-4 tw-h-4"
                    />
                    <label
                      htmlFor="selectAll"
                      className="tw-m-0"
                      onClick={() => setSelectAll(!selectAll)}
                    >
                      모두 선택
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="name"
                      className="tw-border tw-py-2 tw-w-[160px]"
                      id="input_user_name"
                      aria-describedby="emailHelp"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        router.push("/");
                      }}
                      className="tw-text-[12px] sm:tw-text-[16px] tw-bg-green-500 hover:tw-bg-green-600 active:tw-bg-yellow-400 tw-text-white tw-py-2 tw-px-3 tw-rounded-lg tw-ml-2"
                    >
                      전체 선택
                    </button>
                    <button
                      type="submit"
                      className="tw-text-[12px] sm:tw-text-[16px] tw-bg-blue-500 hover:tw-bg-blue-600 active:tw-bg-blue-600 tw-text-white tw-py-2 tw-px-3 tw-rounded-lg"
                    >
                      확인
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="tw-col-span-2"></div>
        </motion.div>
      )}
    </>
  );
}
