// src/app/components/Card.tsx
import classNames from 'classnames';

interface CardProps {
  name: string;
  isWinner: boolean;
  flipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ name, isWinner, flipped, onClick }) => {
  return (
    <div
      className={classNames(
        'w-32 h-48 m-2 perspective-1000',
        { 'cursor-pointer': !flipped }
      )}
      onClick={onClick}
    >
      <div className={classNames(
        'relative w-full h-full text-center transition-transform duration-500 transform-style-preserve-3d',
        { 'rotate-y-180': flipped }
      )}>
        <div className="absolute w-full h-full backface-hidden bg-blue-500 text-white flex items-center justify-center">
          {name}
        </div>
        <div className={classNames(
          'absolute w-full h-full backface-hidden text-white flex items-center justify-center rotate-y-180',
          { 'bg-green-500': isWinner, 'bg-red-500': !isWinner }
        )}>
          {isWinner ? '당첨!' : '꽝!'}
        </div>
      </div>
    </div>
  );
};

export default Card;
