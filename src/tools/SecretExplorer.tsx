import React, { useState } from 'react';
import yaml from 'js-yaml';
import './SecretExplorer.scss';
import { ToastContainer, toast } from 'react-toastify';
import './CommonStyles.scss';
import 'react-toastify/dist/ReactToastify.css';

const SecretExplorer: React.FC = () => {
  const [yamlContent, setYamlContent] = useState<string>('');
  const [secrets, setSecrets] = useState<{ [key: string]: string }>({});
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({});
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleYamlChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setYamlContent(event.target.value);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleParseYaml = () => {
    try {
      const parsedYaml = yaml.load(yamlContent) as { data: { [key: string]: string } };
      const decodedSecrets: { [key: string]: string } = {};
      const initialShowSecrets: { [key: string]: boolean } = {};

      for (const key in parsedYaml.data) {
        decodedSecrets[key] = atob(parsedYaml.data[key]);
        initialShowSecrets[key] = showAll;
      }

      setSecrets(decodedSecrets);
      setShowSecrets(initialShowSecrets);
    } catch (error) {
      console.error('Failed to parse YAML:', error);
    }
  };

  const toggleSecretVisibility = (key: string) => {
    setShowSecrets((prevShowSecrets) => ({
      ...prevShowSecrets,
      [key]: !prevShowSecrets[key],
    }));
  };

  const toggleShowAll = () => {
    const newShowAll = !showAll;
    setShowAll(newShowAll);
    const updatedShowSecrets = Object.keys(secrets).reduce((acc, key) => {
      acc[key] = newShowAll;
      return acc;
    }, {} as { [key: string]: boolean });
    setShowSecrets(updatedShowSecrets);
  };

  return (
    <div className="container">
      <h2>Secret yaml:</h2>
      <textarea
        placeholder="Paste your Kubernetes secret YAML here..."
        value={yamlContent}
        onChange={handleYamlChange}
        rows={10}
      />
      <button className='button' onClick={handleParseYaml}>Parse YAML</button>
      <ToastContainer />
      <div className="header-row">
        <h2>Data:</h2>
        <button onClick={toggleShowAll}>
          {showAll ? 'Hide All' : 'Show All'}
        </button>
      </div>
      {Object.keys(secrets).length === 0 ? (
        <p>No data elements found.</p>
      ) : (
        <>
          {Object.keys(secrets).map((key) => (
            <div key={key} className="secret-item">
              <label>{key}</label>
              <textarea
                value={showSecrets[key] ? secrets[key] : '********'}
                readOnly
              />
              <div className="header-row">
              <button className="primary-button" onClick={() => handleCopy(secrets[key])}>
                Copy
              </button>
              <button className='secondary-button' onClick={() => toggleSecretVisibility(key)}>
                {showSecrets[key] ? 'Hide' : 'Show'}
              </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SecretExplorer;