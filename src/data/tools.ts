import KubeconfigGenerator from "../tools/KubeconfigGenerator";

interface Tool {
  name: string;
  description: string;
  component: React.FC;
  slug: string;
}

const tools: Tool[] = [
  { slug: 'kubeconfig-generator', component: KubeconfigGenerator , name: 'Kubeconfig Generator', description: 'Create a kubeconfig from parameters' },
  // { id: 2, name: 'Helm', description: 'Package manager for Kubernetes.' },
  // { id: 3, name: 'Kustomize', description: 'Customization of Kubernetes YAML configurations.' }
  // Add more tools as needed
];

export default tools;
export type { Tool };