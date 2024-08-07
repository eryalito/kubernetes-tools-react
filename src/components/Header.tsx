import React from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <header>
      <div>
        <h1>Kubernetes Tools</h1>
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <a href="https://github.com/eryalito/kubernetes-tools-react" target="_blank" rel="noopener noreferrer" className="github-link">
        <span className="fab fa-github fa-2x"></span>
      </a>
    </header>
  );
}

export default Header;