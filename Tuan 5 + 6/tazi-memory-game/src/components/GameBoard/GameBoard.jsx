import React from 'react';
import classnames from 'classnames';
import Card from '@components/Card/Card';
import './GameBoard.scss';

const GameBoard = ({ cards, onCardClick, isDisabled, gridCols }) => {
  const boardClasses = classnames('game-board', `grid-cols-${gridCols}`);

  return (
    <div className={boardClasses}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
          isDisabled={isDisabled}
        />
      ))}
    </div>
  );
};

export default GameBoard;