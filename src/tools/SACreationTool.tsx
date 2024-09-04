import React, { useState, useEffect } from 'react';
import './SACreationTool.scss';
import './CommonStyles.scss';

const SACreationTool: React.FC = () => {
    const [namespace, setNamespace] = useState('');
    const [serviceAccountName, setServiceAccountName] = useState('');
    const [bindToName, setBindToName] = useState('');
    const [createToken, setCreateToken] = useState(false);
    const [bindingType, setBindingType] = useState('ClusterRoleBinding');
    const [roleType, setRoleType] = useState('ClusterRole');
    const [manifests, setManifests] = useState('');
    const [tokenCode, setTokenCode] = useState('');

    const generateServiceAccountManifest = () => {
        return `---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ${serviceAccountName}
  namespace: ${namespace}
`;
    };

    const generateSecretManifest = () => {
        if (!createToken) return '';
        const token = `kubectl get secret ${serviceAccountName}-token -n ${namespace}  -ojsonpath={.data.token} | base64 -d`;
        setTokenCode(token);
        return `---
apiVersion: v1
kind: Secret
metadata:
  name: ${serviceAccountName}-token
  namespace: ${namespace}
  annotations:
    kubernetes.io/service-account.name: ${serviceAccountName}
type: kubernetes.io/service-account-token
`;
    };

    const generateBindingManifest = () => {
        return `---
apiVersion: rbac.authorization.k8s.io/v1
kind: ${bindingType}
metadata:
  name: ${serviceAccountName}-${bindingType.toLowerCase()}
subjects:
- kind: ServiceAccount
  name: ${serviceAccountName}
  namespace: ${namespace}
roleRef:
  kind: ${roleType}
  name: ${bindToName}
  apiGroup: rbac.authorization.k8s.io
`;
    };

    useEffect(() => {
        if (bindingType === 'ClusterRoleBinding') {
            setRoleType('ClusterRole');
        }
        const saManifest = generateServiceAccountManifest();
        const secretManifest = generateSecretManifest();
        const bindingManifest = generateBindingManifest();
        setManifests(saManifest + secretManifest + bindingManifest);
    }, [namespace, serviceAccountName, bindToName, createToken, bindingType, roleType]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="container">
            <h2>Service Account Creation Tool</h2>
            <form>
                <div>
                    <label>Service Account Name:</label>
                    <input
                        type="text"
                        value={serviceAccountName}
                        onChange={(e) => setServiceAccountName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Namespace:</label>
                    <input
                        type="text"
                        value={namespace}
                        onChange={(e) => setNamespace(e.target.value)}
                    />
                </div>
                <div className="checkbox-container">
                    <label>Create Token:</label>
                    <input
                        type="checkbox"
                        checked={createToken}
                        onChange={(e) => setCreateToken(e.target.checked)}
                    />
                </div>
                <div className="bind-to-container">
                    <label>Binding Type:</label>
                    <div className="toggle-container">
                        <label>
                            <input
                                type="checkbox"
                                checked={bindingType === 'ClusterRoleBinding'}
                                onChange={(e) => setBindingType(e.target.checked ? 'ClusterRoleBinding' : 'RoleBinding')}
                            />
                            <span></span>
                            {bindingType}
                        </label>
                    </div>
                    <label>Role Type:</label>
                    <div className="toggle-container">
                        <label>
                            <input
                                type="checkbox"
                                checked={roleType === 'ClusterRole'}
                                onChange={(e) => setRoleType(e.target.checked ? 'ClusterRole' : 'Role')}
                                disabled={bindingType === 'ClusterRoleBinding'}
                            />
                            <span></span>
                            {roleType}
                        </label>
                    </div>
                    <div>
                        <label>Role Name:</label>
                        <input
                            type="text"
                            value={bindToName}
                            onChange={(e) => setBindToName(e.target.value)}
                        />
                    </div>
                </div>
            </form>
            <div>
                <h3>Generated Manifests:</h3>
                <textarea readOnly value={manifests} style={{ minHeight: '300px' }} />
            </div>
            <button onClick={() => copyToClipboard(manifests)}>Copy to Clipboard</button>
            {createToken && (
                <div className="token-code-container">
                    <h3>Generated Token Command:</h3>
                    <pre className="token-code">
                        {tokenCode}
                    </pre>
                    <button onClick={() => copyToClipboard(tokenCode)}>Copy Token Command</button>
                </div>
            )}
        </div>
    );
};

export default SACreationTool;