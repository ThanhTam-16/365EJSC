import { CARD_IMAGES } from './constants';

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generate card deck for a specific level
 */
export const generateCards = (numberOfPairs) => {
  // Select random images from available cards
  const selectedImages = CARD_IMAGES.slice(0, numberOfPairs);
  
  // Create pairs
  const cards = selectedImages.flatMap((image, index) => [
    {
      id: `card-${index}-a`,
      image,
      pairId: index,
      isFlipped: false,
      isMatched: false
    },
    {
      id: `card-${index}-b`,
      image,
      pairId: index,
      isFlipped: false,
      isMatched: false
    }
  ]);

  return shuffleArray(cards);
};

/**
 * Check if two cards match
 */
export const checkMatch = (card1, card2) => {
  return card1.pairId === card2.pairId;
};

/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculate score based on time and moves
 */
export const calculateScore = (moves, timeElapsed, perfectMoves) => {
  const movesPenalty = Math.max(0, moves - perfectMoves) * 10;
  const timePenalty = Math.floor(timeElapsed / 10) * 5;
  const baseScore = 1000;
  
  return Math.max(0, baseScore - movesPenalty - timePenalty);
};

/**
 * Get perfect moves for a level (minimum moves to complete)
 */
export const getPerfectMoves = (numberOfPairs) => {
  return numberOfPairs; // One move per pair
};