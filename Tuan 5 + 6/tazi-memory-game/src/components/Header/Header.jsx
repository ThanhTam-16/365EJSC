import React from 'react';
import { Navbar, NavbarBrand, Badge, Button } from 'reactstrap';
import { FaTrophy, FaClock, FaGamepad, FaRedo } from 'react-icons/fa';
import { formatTime } from '@utils/gameLogic';
import './Header.scss';

const Header = ({ level, moves, timeElapsed, timeLimit, onRestart }) => {
  const timeRemaining = timeLimit ? timeLimit - timeElapsed : null;
  const isTimeWarning = timeRemaining && timeRemaining <= 30;

  return (
    <Navbar className="game-header" color="light" light expand="md">
      <div className="container-fluid">
        <NavbarBrand className="header-brand">
          <FaGamepad className="brand-icon" />
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
              <span className="stat-label">Thời gian:</span>
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
};

export default Header;