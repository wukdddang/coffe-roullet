"use client";

import FetchClass from "@/service/fetch";
import { useState } from "react";

export default function Roulette() {
  const [data, setData] = useState(null);
  const fetchInstance = new FetchClass();

  const handleFetch = async () => {
    try {
      const url = "http://localhost:3000/api/user/list";
      const options = { method: "GET" }; // 요청 메서드와 필요한 옵션
      const responseData = await fetchInstance.runFetch(url, options);
      setData(responseData); // 응답 데이터 상태에 저장
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleFetch}>Fetch Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
