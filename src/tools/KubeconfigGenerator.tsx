import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './KubeconfigGenerator.scss';

const KubeconfigGenerator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [serverUrl, setServerUrl] = useState('');
  const [caCertificate, setCaCertificate] = useState('');
  const [skipTlsVerification, setSkipTlsVerification] = useState(false);
  const [token, setToken] = useState('');

  const generateKubeconfig = () => {
    return `
apiVersion: v1
clusters:
- cluster:
    ${skipTlsVerification ? 'insecure-skip-tls-verify: true' : `certificate-authority-data: ${caCertificate}`}
    server: ${serverUrl}
  name: cluster-${id}
contexts:
- context:
    cluster: cluster-${id}
    user: user-${id}
  name: context-${id}
current-context: context-${id}
kind: Config
preferences: {}
users:
- name: user-${id}
  user:
    token: ${token}
    ${skipTlsVerification ? 'insecure-skip-tls-verify: true' : ''}
    `;
  };

  const handleCopy = () => {
    const textarea = document.querySelector('.generated-kubeconfig') as HTMLTextAreaElement;
    if (textarea) {
      textarea.select();
      document.execCommand('copy');
      alert('Kubeconfig copied to clipboard!');
    }
  };

  return (
    <div className="container">
      <form>
        <div>
          <label>Server URL:</label>
          <input
            type="text"
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
          />
        </div>
        <div>
          <label>CA Certificate:</label>
          <textarea
            value={caCertificate}
            onChange={(e) => setCaCertificate(e.target.value)}
          />
        </div>
        <div className="checkbox-container">
          <label>Skip TLS Verification</label>
          <input
            type="checkbox"
            checked={skipTlsVerification}
            onChange={(e) => setSkipTlsVerification(e.target.checked)}
          />
        </div>
        <div>
          <label>Token:</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
      </form>
      <div>
        <h3>Generated Kubeconfig:</h3>
        <textarea
          readOnly
          value={generateKubeconfig()}
          rows={20}
          className="generated-kubeconfig"
        />
        <button onClick={handleCopy}>Copy</button>
      </div>
    </div>
  );
};

export default KubeconfigGenerator;