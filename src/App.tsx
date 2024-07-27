import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ToolHeader from './components/ToolHeader';
import CardList from './components/CardList';
import './App.scss'
import tools from './data/tools';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {filteredTools.length > 0 ? (
              <CardList tools={filteredTools} />
            ) : (
              <p>No results have been found.</p>
            )}
          </>
        } />
        {tools.map(tool => (
          <Route key={tool.id} path={`/tool/${tool.id}`} element={
            <>
            <ToolHeader tool={tool} />
            <tool.component />
            </>
          } />
        ))}
      </Routes>
    </Router>
  );
}

export default App;