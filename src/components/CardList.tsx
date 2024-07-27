import React from 'react';
import Card from './Card';

interface CardListProps {
  tools: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}

const CardList: React.FC<CardListProps> = ({ tools }) => {
  return (
    <div className="card-list">
      {tools.map(tool => (
        <Card key={tool.id} tool={tool} />
      ))}
    </div>
  );
}

export default CardList;