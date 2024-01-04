"use client";
// import UserList from "@/components/user-list/UserList";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const router = useRouter();

  return (
    <AnimatePresence>
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
              <col style={{ width: "15%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>

            <thead>
              <tr className="tw-text-[12px] sm:tw-text-[16px]">
                <th>Rank</th>
                <th>이름</th>
                <th>걸린 횟수</th>
                <th>가중치</th>
                <th>상세 보기</th>
              </tr>
            </thead>
            <tbody>{/* <UserList users={users} /> */}</tbody>
          </table>
          <div className="col-sm-12">
            <form method="post" target="/user">
              <div className="tw-flex align-items-end justify-content-end tw-gap-2">
                <input
                  type="text"
                  name="name"
                  className="tw-border tw-py-2"
                  id="input_user_name"
                  aria-describedby="emailHelp"
                />
                <button
                  type="submit"
                  className="tw-text-[12px] sm:tw-text-[16px] tw-bg-blue-500 hover:tw-bg-blue-600 active:tw-bg-blue-600 tw-text-white tw-py-2 tw-px-3 tw-rounded-lg"
                >
                  추가
                </button>
                <button
                  type="button"
                  onClick={() => {
                    router.push("/");
                  }}
                  className="tw-text-[12px] sm:tw-text-[16px] tw-bg-yellow-300 hover:tw-bg-yellow-400 active:tw-bg-yellow-400 tw-text-white tw-py-2 tw-px-3 tw-rounded-lg tw-ml-2"
                >
                  뒤로가기
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="tw-col-span-2"></div>
      </motion.div>
    </AnimatePresence>
  );
}
