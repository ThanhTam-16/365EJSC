import React, { memo } from 'react';
import { Navbar, NavbarBrand, Badge, Button } from 'reactstrap';
import { FaTrophy, FaClock, FaGamepad, FaRedo } from 'react-icons/fa';
import { formatTime } from '@utils/gameLogic';
import './Header.scss';
import logo from '../../../public/logo.png';

const Header = memo(({ level, moves, timeElapsed, timeLimit, onRestart }) => {
  const timeRemaining = timeLimit ? timeLimit - timeElapsed : null;
  const isTimeWarning = timeRemaining && timeRemaining <= 30;

  return (
    <Navbar className="game-header" light expand="md">
      <div className="header-container">
        <NavbarBrand className="header-brand">
          <img src={logo} alt="Game Logo" className='brand-logo' />
          <span className="brand-text">TaZi Memory Game</span>
        </NavbarBrand>

        <div className="header-stats">
          <div className="stat-item">
            <FaTrophy className="stat-icon level-icon" />
            <span className="stat-label">Level:</span>
            <Badge color="primary" pill>{level}</Badge>
          </div>

          <div className="stat-item">
            <span className="stat-label">Nước:</span>
            <Badge color="info" pill>{moves}</Badge>
          </div>

          {timeLimit && (
            <div className={`stat-item ${isTimeWarning ? 'time-warning' : ''}`}>
              <FaClock className="stat-icon" />
              <Badge color={isTimeWarning ? 'danger' : 'success'} pill>
                {formatTime(timeRemaining)}
              </Badge>
            </div>
          )}

          <Button 
            color="secondary" 
            size="sm" 
            className="restart-btn"
            onClick={onRestart}
          >
            <FaRedo /> Chơi lại
          </Button>
        </div>
      </div>
    </Navbar>
  );
});

Header.displayName = 'Header';

export default Header;