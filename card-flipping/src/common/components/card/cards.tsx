'use client'

import React, {useEffect, useState} from 'react';
import Card from "@/common/components/card/card";
import {shuffleArray} from "@/utils/shuffle";

interface User {
  id: number;
  name: string;
}

const Cards = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [winners, setWinners] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});
  const [excludedUsers, setExcludedUsers] = useState<number[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data: User[] = await response.json();
      setUsers(data);
      // 초기 flipped 상태 설정
      const initialFlipped = data.reduce((acc, user) => ({ ...acc, [user.id]: false }), {});
      setFlipped(initialFlipped);
    };
    
    fetchUsers();
  }, []);
  
  const shuffleAndSelectWinner = () => {
    const filteredUsers = users.filter(user => !excludedUsers.includes(user.id));
    const shuffledUsers = shuffleArray(filteredUsers);
    if (shuffledUsers.length > 0) {
      const winnerIndex = Math.floor(Math.random() * shuffledUsers.length);
      setWinners([shuffledUsers[winnerIndex].id]);
    } else {
      setWinners([]);
    }
    // 카드 리셋
    const resetFlipped = filteredUsers.reduce((acc, user) => ({ ...acc, [user.id]: false }), {});
    setFlipped(resetFlipped);
    setDisplayedUsers(filteredUsers);
  };
  
  const handleCardClick = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  
  const handleExcludeChange = (id: number) => {
    setExcludedUsers((prev) =>
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
    );
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <h2 className="text-xl font-bold">제외할 사람 선택:</h2>
        {users.map((user) => (
          <label key={user.id} className="block">
            <input
              type="checkbox"
              checked={excludedUsers.includes(user.id)}
              onChange={() => handleExcludeChange(user.id)}
              className="mr-2"
            />
            {user.name}
          </label>
        ))}
      </div>
      <button
        onClick={shuffleAndSelectWinner}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        섞기 / 게임 시작
      </button>
      <div className="flex flex-wrap justify-center">
        {displayedUsers.map((user) => (
          <Card
            key={user.id}
            name={user.name}
            isWinner={winners.includes(user.id)}
            flipped={flipped[user.id]}
            onClick={() => handleCardClick(user.id)}
          />
        ))}
      </div>
    </div>
  );
};
export default Cards;
