import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, ButtonGroup } from 'reactstrap';
import classnames from 'classnames';
import Header from '@components/Header/Header';
import GameBoard from '@components/GameBoard/GameBoard';
import WinModal from '@components/WinModal/WinModal';
import { LEVELS, GAME_STATES, ANIMATION } from '@utils/constants';
import { 
  generateCards, 
  checkMatch, 
  calculateScore, 
  getPerfectMoves 
} from '@utils/gameLogic';
import './App.scss';

function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameState, setGameState] = useState(GAME_STATES.IDLE);
  const [showWinModal, setShowWinModal] = useState(false);
  const [score, setScore] = useState(0);

  const currentLevel = LEVELS[currentLevelIndex];

  // Initialize game
  const initializeGame = useCallback(() => {
    const newCards = generateCards(currentLevel.pairs);
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setTimeElapsed(0);
    setGameState(GAME_STATES.PLAYING);
    setShowWinModal(false);
  }, [currentLevel]);

  // Start game on mount and level change
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer
  useEffect(() => {
    let interval;
    if (gameState === GAME_STATES.PLAYING) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          
          // Check time limit
          if (currentLevel.timeLimit && newTime >= currentLevel.timeLimit) {
            setGameState(GAME_STATES.LOST);
            alert('Hết giờ! Hãy thử lại.');
            initializeGame();
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, currentLevel.timeLimit, initializeGame]);

  // Handle card click
  const handleCardClick = (clickedCard) => {
    if (
      gameState !== GAME_STATES.PLAYING ||
      flippedCards.length >= 2 ||
      flippedCards.some(card => card.id === clickedCard.id)
    ) {
      return;
    }

    // Flip the card
    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    // Check for match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCard, secondCard] = newFlippedCards;
      const isMatch = checkMatch(firstCard, secondCard);

      if (isMatch) {
        // Match found
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.pairId === firstCard.pairId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);
          
          // Check if game is won
          const allMatched = newCards.every(
            card => card.isMatched || card.pairId === firstCard.pairId
          );
          
          if (allMatched) {
            setTimeout(() => {
              const finalScore = calculateScore(
                moves + 1,
                timeElapsed,
                getPerfectMoves(currentLevel.pairs)
              );
              setScore(finalScore);
              setGameState(GAME_STATES.WON);
              setShowWinModal(true);
            }, ANIMATION.WIN_DELAY);
          }
        }, ANIMATION.CARD_FLIP);
      } else {
        // No match
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, ANIMATION.MISMATCH_DELAY);
      }
    }
  };

  // Handle next level
  const handleNextLevel = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
      setShowWinModal(false);
    }
  };

  // Handle level selection
  const handleLevelSelect = (index) => {
    setCurrentLevelIndex(index);
  };

  const appClasses = classnames('app', `theme-${currentLevel.theme}`);

  return (
    <div className={appClasses}>
      <Header
        level={currentLevel.level}
        moves={moves}
        timeElapsed={timeElapsed}
        timeLimit={currentLevel.timeLimit}
        onRestart={initializeGame}
      />

      <Container fluid className="app-container">
        <div className="level-selector">
          <h6>Chọn độ khó:</h6>
          <ButtonGroup>
            {LEVELS.map((level, index) => (
              <Button
                key={level.level}
                color={currentLevelIndex === index ? 'primary' : 'light'}
                onClick={() => handleLevelSelect(index)}
                size="sm"
              >
                {level.name}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <GameBoard
          cards={cards}
          onCardClick={handleCardClick}
          isDisabled={flippedCards.length >= 2}
          gridCols={currentLevel.gridCols}
        />
      </Container>

      <WinModal
        isOpen={showWinModal}
        onClose={initializeGame}
        level={currentLevel.level}
        moves={moves}
        timeElapsed={timeElapsed}
        score={score}
        onNextLevel={handleNextLevel}
        hasNextLevel={currentLevelIndex < LEVELS.length - 1}
      />
    </div>
  );
}

export default App;