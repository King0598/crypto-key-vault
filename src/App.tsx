import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Overview';
import { CertificateTable } from './components/certificates/CertificateTable';
import { KeyManager } from './components/keys/KeyManager';
import { KeystoreManager } from './components/keystore/KeystoreManager';
import { CAManager } from './components/ca/CAManager';
import { AuditLogs } from './components/audit/AuditLogs';
import { Toaster } from 'sonner';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'certificates':
        return <CertificateTable />;
      case 'keys':
        return <KeyManager />;
      case 'ca':
        return <CAManager />;
      case 'keystores':
        return <KeystoreManager />;
      case 'audit':
        return <AuditLogs />;
      case 'revocation':
        return (
          <div className="p-8 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Revocation Management (CRL)</h1>
              <p className="text-slate-500 mt-1">Generate and publish Certificate Revocation Lists.</p>
            </div>
            <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <p className="text-slate-600 font-medium">CRL publishing module is ready for HSM integration.</p>
              <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold">Publish New CRL</button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Settings</h1>
            <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
              <div className="p-6">
                <h3 className="font-bold text-slate-900">PKCS#11 HSM Provider</h3>
                <p className="text-sm text-slate-500 mt-1">Configure your hardware security module connection.</p>
                <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-700 uppercase">Library Path</p>
                    <code className="text-[10px] text-slate-500">/usr/lib/softhsm/libsofthsm2.so</code>
                  </div>
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded">CONNECTED</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900">LDAP/AD Sync</h3>
                <p className="text-sm text-slate-500 mt-1">Manage user authentication and directory services.</p>
                <button className="mt-4 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Configure LDAP Connection →</button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚧</span>
            </div>
            <p className="text-sm font-medium">This module ({activeTab}) is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>
      </main>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;