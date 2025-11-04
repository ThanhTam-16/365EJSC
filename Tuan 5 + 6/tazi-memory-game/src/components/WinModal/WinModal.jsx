import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FaTrophy, FaClock, FaStar, FaArrowRight } from 'react-icons/fa';
import { formatTime } from '@utils/gameLogic';
import './WinModal.scss';

const WinModal = ({ 
  isOpen, 
  onClose, 
  level, 
  moves, 
  timeElapsed, 
  score,
  onNextLevel,
  hasNextLevel
}) => {
  const stars = score >= 800 ? 3 : score >= 600 ? 2 : 1;

  return (
    <Modal isOpen={isOpen} toggle={onClose} className="win-modal" centered>
      <ModalHeader toggle={onClose} className="modal-header-custom">
        <FaTrophy className="trophy-icon" />
        Chúc mừng!
      </ModalHeader>
      
      <ModalBody className="modal-body-custom">
        <div className="stars-container">
          {[...Array(3)].map((_, index) => (
            <FaStar 
              key={index} 
              className={`star ${index < stars ? 'active' : ''}`}
            />
          ))}
        </div>

        <h4 className="congrats-text">Bạn đã hoàn thành Level {level}!</h4>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FaClock className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-label">Thời gian</span>
              <span className="stat-value">{formatTime(timeElapsed)}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FaTrophy className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-label">Số nước</span>
              <span className="stat-value">{moves}</span>
            </div>
          </div>

          <div className="stat-card highlight">
            <div className="stat-icon-wrapper">
              <FaStar className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-label">Điểm số</span>
              <span className="stat-value">{score}</span>
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter className="modal-footer-custom">
        <Button color="secondary" onClick={onClose}>
          Chơi lại Level này
        </Button>
        {hasNextLevel && (
          <Button color="primary" onClick={onNextLevel}>
            Level tiếp theo <FaArrowRight />
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default WinModal;