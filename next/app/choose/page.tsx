"use client";
// import UserList from "@/components/user-list/UserList";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Page() {
  const router = useRouter();

  return (
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
            <col style={{ width: "20%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "30%" }} />
          </colgroup>

          <thead>
            <tr className="tw-text-[12px] sm:tw-text-[16px] tw-text-center">
              <th>참여</th>
              <th>이름</th>
              <th>가중치</th>
              <th>비율 조절</th>
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
          </form>
        </div>
      </div>
      <div className="tw-col-span-2"></div>
    </motion.div>
  );
}
