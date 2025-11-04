import React from 'react';
import classnames from 'classnames';
import { FaQuestion } from 'react-icons/fa';
import './Card.scss';

const Card = ({ card, onClick, isDisabled }) => {
  const cardClasses = classnames('memory-card', {
    'is-flipped': card.isFlipped,
    'is-matched': card.isMatched,
    'is-disabled': isDisabled
  });

  const handleClick = () => {
    if (!isDisabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div className={cardClasses} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front">
          <FaQuestion className="question-icon" />
        </div>
        <div className="card-back">
          {card.image ? (
            <img 
              src={require(`@assets/images/cards/${card.image}`)} 
              alt="Card" 
              className="card-image"
            />
          ) : (
            <div className="card-placeholder">{card.pairId + 1}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;