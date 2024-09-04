import KubeconfigGenerator from "../tools/KubeconfigGenerator";
import SACreationTool from "../tools/SACreationTool";
import SecretExplorer from "../tools/SecretExplorer";

interface Tool {
  name: string;
  description: string;
  component: React.FC;
  slug: string;
}

const tools: Tool[] = [
  { slug: 'kubeconfig-generator', component: KubeconfigGenerator , name: 'Kubeconfig Generator', description: 'Create a kubeconfig from parameters' },
  { slug: 'secret-explorer', component: SecretExplorer , name: 'Secret Explorer', description: 'Explore secrets data values' },
  { slug: 'sa-creation-tool', component: SACreationTool , name: 'Service Account Creation Tool', description: 'Create a Service Account from parameters' },
  // { id: 2, name: 'Helm', description: 'Package manager for Kubernetes.' },
  // { id: 3, name: 'Kustomize', description: 'Customization of Kubernetes YAML configurations.' }
  // Add more tools as needed
];

export default tools;
export type { Tool };