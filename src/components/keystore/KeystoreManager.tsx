import React, { useState } from 'react';
import { 
  Shield, 
  Database, 
  FolderLock, 
  FileCode, 
  FileJson, 
  Plus, 
  ArrowRight,
  MoreVertical,
  Key as KeyIcon,
  Unlock,
  Settings,
  HardDrive
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const mockKeystores = [
  { id: '1', name: 'app-server-secrets.jks', type: 'JKS', entries: 12, size: '48 KB', lastModified: '2024-05-12' },
  { id: '2', name: 'cloud-gateway.p12', type: 'PKCS#12', entries: 3, size: '22 KB', lastModified: '2024-06-10' },
  { id: '3', name: 'client-truststore.jks', type: 'JKS', entries: 45, size: '156 KB', lastModified: '2024-01-05' },
  { id: '4', name: 'api-signer.pfx', type: 'PKCS#12', entries: 1, size: '12 KB', lastModified: '2024-06-15' },
];

export function KeystoreManager() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Keystores</h1>
          <p className="text-slate-500 mt-1">Secure storage and management for Java KeyStores and PKCS#12 files.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
          <Plus className="w-4 h-4" />
          Create Keystore
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="md:col-span-2 xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-500" />
              Active Keystores
            </h3>
            <div className="flex gap-2">
              <button className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg border border-slate-200">Import File</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4">Filename</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Entries</th>
                  <th className="px-6 py-4">Modified</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockKeystores.map((ks) => (
                  <tr key={ks.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm",
                          ks.type === 'JKS' ? "bg-orange-50 border-orange-100 text-orange-600" : "bg-purple-50 border-purple-100 text-purple-600"
                        )}>
                          <FolderLock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{ks.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter mt-0.5">{ks.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold border",
                        ks.type === 'JKS' ? "bg-orange-50 text-orange-700 border-orange-100" : "bg-purple-50 text-purple-700 border-purple-100"
                      )}>
                        {ks.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <KeyIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm font-semibold text-slate-700">{ks.entries} items</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-500 font-medium">{ks.lastModified}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 bg-blue-500/20 rounded-full blur-3xl" />
            <Unlock className="w-8 h-8 mb-4 text-blue-400" />
            <h3 className="text-lg font-bold mb-2">Convert Keystore</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Easily convert between JKS, PKCS#12, and BKS formats with secure password preservation.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group">
              Start Conversion
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Security Policy</h3>
              <Settings className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">FIPS 140-2 Mode</p>
                  <p className="text-[10px] text-slate-500">Strict cryptographic validation</p>
                </div>
                <div className="ml-auto w-8 h-4 bg-green-500 rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <HardDrive className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Automatic Backup</p>
                  <p className="text-[10px] text-slate-500">Every 24 hours to S3</p>
                </div>
                <div className="ml-auto w-8 h-4 bg-slate-300 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}