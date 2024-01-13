import { Feature } from './feature';
// Sidebar route metadata
export interface Module {
  moduleId: number;
  title: string;
  moduleName: string;
  iconName: string;
  icon: string;
  class: string;
  groupTitle: string;
  status: number;
  menuPosition: number;
  isActive: boolean,
  role: string[];
  features: Feature[];
}
