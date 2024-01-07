import { User } from "@/context/GlobalProvider";
import FetchClass from "@/service/fetch";
import { useEffect, useState } from "react";

export default function useFetchUser() {
  const [user, setUser] = useState<User[]>([]); // 응답 데이터 상태
  const fetchInstance = FetchClass.getInstance();

  const handleFetchUser = async () => {
    try {
      const url = "http://localhost:3000/api/user";
      const options = { method: "GET" }; // 요청 메서드와 필요한 옵션
      const responseData = await fetchInstance.runFetch(url, options);
      setUser(responseData.users); // 응답 데이터 상태에 저장
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (user.length === 0) {
      handleFetchUser();
    }
  }, [user]);

  return { user };
}
