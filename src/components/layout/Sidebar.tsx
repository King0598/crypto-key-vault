import React from 'react';
import { 
  Shield, 
  Key, 
  FileCheck, 
  LayoutDashboard, 
  Lock, 
  History, 
  Settings, 
  AlertTriangle,
  ChevronRight,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'certificates', label: 'Certificates', icon: FileCheck },
  { id: 'keys', label: 'Key Management', icon: Key },
  { id: 'ca', label: 'CA Management', icon: Shield },
  { id: 'keystores', label: 'Keystores', icon: Database },
  { id: 'revocation', label: 'Revocation (CRL)', icon: AlertTriangle },
  { id: 'audit', label: 'Audit Logs', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-[#0F172A] text-slate-300 flex flex-col h-screen border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-xl text-white tracking-tight">OpenPKI</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
              )} />
              {item.label}
              {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">HSM Status</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            SoftHSM Connected via PKCS#11
          </p>
        </div>
      </div>
    </div>
  );
}