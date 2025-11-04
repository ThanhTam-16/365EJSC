
// Game Levels Configuration
export const LEVELS = [
  {
    level: 1,
    name: 'Dễ',
    pairs: 6,
    gridCols: 4,
    timeLimit: null, // No time limit
    theme: 'ocean'
  },
  {
    level: 2,
    name: 'Trung bình',
    pairs: 8,
    gridCols: 4,
    timeLimit: 120, // 2 minutes
    theme: 'forest'
  },
  {
    level: 3,
    name: 'Khó',
    pairs: 10,
    gridCols: 5,
    timeLimit: 90, // 1.5 minutes
    theme: 'space'
  },
  {
    level: 4,
    name: 'Chuyên gia',
    pairs: 12,
    gridCols: 6,
    timeLimit: 60, // 1 minute
    theme: 'galaxy'
  }
];

// Card images - Placeholder paths
// Bạn sẽ thêm ảnh thật vào folder src/assets/images/cards/
export const CARD_IMAGES = [
  'card-1.png',
  'card-2.png',
  'card-3.png',
  'card-4.png',
  'card-5.png',
  'card-6.png',
  'card-7.png',
  'card-8.png',
  'card-9.png',
  'card-10.png',
  'card-11.png',
  'card-12.png',
];

// Game States
export const GAME_STATES = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  WON: 'WON',
  LOST: 'LOST'
};

// Animation Durations (ms)
export const ANIMATION = {
  CARD_FLIP: 600,
  MISMATCH_DELAY: 1000,
  WIN_DELAY: 500
};