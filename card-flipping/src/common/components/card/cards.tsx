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
  
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data: User[] = await response.json();
      const shuffledUsers = shuffleArray(data);
      setUsers(shuffledUsers);
      // 초기 flipped 상태 설정
      const initialFlipped = shuffledUsers.reduce((acc, user) => ({ ...acc, [user.id]: false }), {});
      setFlipped(initialFlipped);
      
      // 당첨자 설정
      if (shuffledUsers.length > 0) {
        const winnerIndex = Math.floor(Math.random() * shuffledUsers.length);
        setWinners([shuffledUsers[winnerIndex].id]);
      }
    };
    
    fetchUsers();
  }, []);
  
  const handleCardClick = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  
  const handleRestart = () => {
    window.location.reload();
  };
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleRestart}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        섞기 / 게임 시작
      </button>
      <div className="flex flex-wrap justify-center">
        {users.map((user) => (
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
