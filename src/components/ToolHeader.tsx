import React from 'react';
import {Tool} from '../data/tools';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  tool: Tool;
}

const ToolHeader: React.FC<HeaderProps> = ({tool}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <header>
      <div>
        <h1><span onClick={handleBackClick} className="fas fa-home"></span>{tool.name}</h1>
      </div>
    </header>
  );
}

export default ToolHeader;