import React from 'react';
import { 
  Shield, 
  ChevronRight, 
  ArrowDown, 
  Plus, 
  ShieldCheck, 
  Clock, 
  UserPlus, 
  CheckCircle2, 
  Settings,
  MoreVertical,
  Activity,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const caHierarchy = [
  {
    id: 'root-01',
    name: 'Internal Root CA v1',
    status: 'Active',
    type: 'Root',
    issued: '2020-01-01',
    expiry: '2040-01-01',
    algorithm: 'RSA 8192',
    children: [
      {
        id: 'sub-01',
        name: 'Web Intermediate CA',
        status: 'Active',
        type: 'Subordinate',
        issued: '2023-01-01',
        expiry: '2033-01-01',
        algorithm: 'RSA 4096'
      },
      {
        id: 'sub-02',
        name: 'User Intermediate CA',
        status: 'Active',
        type: 'Subordinate',
        issued: '2023-05-15',
        expiry: '2033-05-15',
        algorithm: 'ECC P-384'
      }
    ]
  },
  {
    id: 'root-02',
    name: 'Offline Hardware Root',
    status: 'Inactive',
    type: 'Root',
    issued: '2024-06-01',
    expiry: '2044-06-01',
    algorithm: 'Ed25519',
    children: []
  }
];

export function CAManager() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">CA Management</h1>
          <p className="text-slate-500 mt-1">Configure and monitor your Internal Certificate Authority hierarchy.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <Settings className="w-4 h-4 text-slate-500" />
            CA Profiles
          </button>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-slate-900/10 transition-all">
            <Shield className="w-4 h-4" />
            New Root CA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">CA Hierarchy</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visual Tree</span>
          </div>
          
          <div className="p-8 space-y-8">
            {caHierarchy.map((root) => (
              <div key={root.id} className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg ring-4 ring-offset-2 transition-all",
                    root.status === 'Active' ? "bg-blue-600 border-blue-700 text-white ring-blue-50 shadow-blue-500/10" : "bg-slate-100 border-slate-200 text-slate-400 ring-transparent shadow-none"
                  )}>
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-lg leading-none">{root.name}</h4>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                        root.status === 'Active' ? "bg-green-50 text-green-700" : "bg-slate-50 text-slate-500"
                      )}>{root.status}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-medium flex items-center gap-4">
                      <span>Type: <span className="text-slate-900">{root.type}</span></span>
                      <span>Alg: <span className="text-slate-900">{root.algorithm}</span></span>
                      <span>Expiry: <span className="text-slate-900">{root.expiry}</span></span>
                    </p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {root.children.length > 0 && (
                  <div className="ml-6 pl-10 border-l-2 border-slate-100 space-y-6 relative">
                    {root.children.map((child, idx) => (
                      <div key={child.id} className="relative group">
                        <div className="absolute -left-[42px] top-6 w-10 h-0.5 bg-slate-100" />
                        <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                            <Shield className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-bold text-slate-800 text-sm leading-none">{child.name}</h5>
                            <p className="text-[10px] text-slate-500 mt-1.5 font-bold uppercase tracking-wider">
                              Issued: {child.issued} • Exp: {child.expiry}
                            </p>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 p-1.5 bg-white border border-slate-200 rounded-lg text-blue-600 shadow-sm transition-opacity">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="ml-4 mt-2 flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all">
                      <Plus className="w-3.5 h-3.5" />
                      Add Intermediate CA
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-500" />
              CA Health Monitoring
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                  <span className="text-slate-500">Root CA Trust</span>
                  <span className="text-slate-900">99.9%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '99.9%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                  <span className="text-slate-500">CSR Wait Time</span>
                  <span className="text-slate-900">12s Avg</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Next CRL Update</p>
                    <p className="text-[10px] text-slate-500">In 4 hours, 22 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20">
            <UserPlus className="w-8 h-8 mb-4 text-blue-100" />
            <h3 className="font-bold text-lg mb-2">Internal Registration</h3>
            <p className="text-xs text-blue-100 leading-relaxed mb-6">
              Automatically provision certificates for internal employees using AD/LDAP synchronization.
            </p>
            <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl text-xs hover:bg-blue-50 transition-colors shadow-lg">
              Configure Directory Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}