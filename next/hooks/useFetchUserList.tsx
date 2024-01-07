import { useGlobalState } from "@/context/GlobalProvider";
import FetchClass from "@/service/fetch";
import { useEffect } from "react";

export default function useFetchUserList() {
  const { participants, setParticipants } = useGlobalState();
  const fetchInstance = FetchClass.getInstance();

  const handleFetchUserList = async () => {
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
      handleFetchUserList();
    }
  }, [participants]);

  return { participants, setParticipants };
}
