import {
  ArrowUpRight,
  Blocks,
  BrainCircuit,
  ChartNoAxesCombined,
  Cloud,
  Code2,
  Database,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  code: Code2,
  development: Code2,
  cloud: Cloud,
  data: Database,
  ai: BrainCircuit,
  intelligence: BrainCircuit,
  security: ShieldCheck,
  design: Layers3,
  architecture: Blocks,
  workflow: Workflow,
  network: Network,
  analytics: ChartNoAxesCombined,
  sparkles: Sparkles,
  globe: Globe2,
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  website: ArrowUpRight,
};

export function getIcon(name: string): LucideIcon {
  return icons[name.toLowerCase()] ?? Sparkles;
}

export function getServiceIcon(name: string): LucideIcon {
  return getIcon(name);
}
