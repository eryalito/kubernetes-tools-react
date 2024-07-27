import React from 'react';
import Card from './Card';

interface CardListProps {
  tools: Array<{
    name: string;
    description: string;
    slug: string;
  }>;
}

const CardList: React.FC<CardListProps> = ({ tools }) => {
  return (
    <div className="card-list">
      {tools.map(tool => (
        <Card key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}

export default CardList;