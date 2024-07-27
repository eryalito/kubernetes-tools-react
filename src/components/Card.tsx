import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  tool: {
    name: string;
    description: string;
    slug: string;
  };
}

const Card: React.FC<CardProps> = ({ tool }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tool/${tool.slug}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <h2 className="card-title">{tool.name}</h2>
      <p className="card-content">{tool.description}</p>
    </div>
  );
}

export default Card;