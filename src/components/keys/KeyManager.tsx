import React, { useState } from 'react';
import { 
  Key, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRightLeft, 
  Plus, 
  Download, 
  Lock,
  LockOpen,
  Cpu,
  Trash2,
  Copy,
  CheckCircle2,
  RefreshCw,
  Eye,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const mockKeys = [
  { id: '1', name: 'api-server-prod-rsa', type: 'RSA 4096', usage: 'Signing, Encryption', source: 'HSM', created: '2024-01-10', status: 'In Use' },
  { id: '2', name: 'auth-gateway-ecc', type: 'ECC P-384', usage: 'Signing', source: 'Software', created: '2024-03-22', status: 'Active' },
  { id: '3', name: 'root-ca-master', type: 'RSA 8192', usage: 'Certificate Signing', source: 'HSM', created: '2023-12-01', status: 'Protected' },
  { id: '4', name: 'temp-signing-key', type: 'Ed25519', usage: 'Content Commitment', source: 'Software', created: '2024-06-14', status: 'Active' },
];

export function KeyManager() {
  const [activeSource, setActiveSource] = useState('All');

  const filteredKeys = mockKeys.filter(k => 
    activeSource === 'All' || k.source === activeSource
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Key Management</h1>
          <p className="text-slate-500 mt-1">Lifecycle management for RSA, ECC, and EdDSA keys.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => toast.success('HSM initialization sequence started')}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Cpu className="w-4 h-4 text-slate-500" />
            PKCS#11 Config
          </button>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-slate-900/10 transition-all">
            <Plus className="w-4 h-4" />
            Generate New Key
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-600 rounded-2xl p-6 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 bg-white opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500" />
          <Lock className="w-8 h-8 mb-4 opacity-80" />
          <h3 className="text-sm font-medium opacity-80">HSM-Protected Keys</h3>
          <p className="text-3xl font-bold mt-1">12</p>
          <p className="text-xs mt-4 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Hardware Backed
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <LockOpen className="w-8 h-8 mb-4 text-slate-400" />
          <h3 className="text-sm font-medium text-slate-500">Software Keys</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">248</p>
          <p className="text-xs mt-4 font-medium text-slate-400 flex items-center gap-1">
            <Settings className="w-3 h-3" /> Managed in Database
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <RefreshCw className="w-8 h-8 mb-4 text-orange-400" />
          <h3 className="text-sm font-medium text-slate-500">Rotations Due</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">3</p>
          <p className="text-xs mt-4 font-medium text-orange-600 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> Review Required
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <Download className="w-8 h-8 mb-4 text-indigo-400" />
          <h3 className="text-sm font-medium text-slate-500">Exports (24h)</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">14</p>
          <p className="text-xs mt-4 font-medium text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-green-500" /> All Authorized
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex gap-2">
            {['All', 'HSM', 'Software'].map(s => (
              <button
                key={s}
                onClick={() => setActiveSource(s)}
                className={cn(
                  "px-4 py-1.5 text-xs font-bold rounded-full transition-all border",
                  activeSource === s 
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="relative">
            <ArrowRightLeft className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter keys..."
              className="bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-6">
          {filteredKeys.map((key) => (
            <div key={key.id} className="border border-slate-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all group relative">
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "p-2.5 rounded-xl",
                  key.source === 'HSM' ? "bg-indigo-50 text-indigo-600" : "bg-blue-50 text-blue-600"
                )}>
                  {key.source === 'HSM' ? <Cpu className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                </div>
                <div className="flex items-center gap-1">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                    key.status === 'Protected' ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                    key.status === 'In Use' ? "bg-green-50 text-green-700 border-green-100" :
                    "bg-blue-50 text-blue-700 border-blue-100"
                  )}>
                    {key.status}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate" title={key.name}>
                  {key.name}
                </h4>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Type</span>
                    <span className="font-semibold text-slate-700">{key.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Created</span>
                    <span className="font-semibold text-slate-700">{key.created}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex gap-1">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}