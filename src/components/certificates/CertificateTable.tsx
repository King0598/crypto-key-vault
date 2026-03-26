import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Eye,
  Trash2,
  RefreshCcw,
  Ban,
  FileDown,
  ChevronDown,
  ArrowUpDown,
  Calendar,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { cn, formatDate, formatSerialNumber } from '@/lib/utils';

const mockCertificates = [
  {
    id: '1',
    subject: 'web.internal.corp',
    issuer: 'Internal Root CA',
    serial: '52A190FD34B',
    type: 'TLS Server',
    status: 'Valid',
    expiry: '2025-06-12T14:30:00Z',
    algorithm: 'RSA 4096 (SHA256)',
    usage: 'Digital Signature, Key Encipherment'
  },
  {
    id: '2',
    subject: 'api.example.com',
    issuer: 'Sectigo Intermediate',
    serial: '73B110EE12C',
    type: 'TLS Server',
    status: 'Expiring Soon',
    expiry: '2024-07-01T09:00:00Z',
    algorithm: 'ECC P-256 (SHA384)',
    usage: 'Digital Signature'
  },
  {
    id: '3',
    subject: 'auth-gateway-01',
    issuer: 'Internal Root CA',
    serial: '12F559AB67D',
    type: 'TLS Client',
    status: 'Revoked',
    expiry: '2025-01-15T00:00:00Z',
    algorithm: 'RSA 2048 (SHA256)',
    usage: 'Digital Signature'
  },
  {
    id: '4',
    subject: 'signing-service-prod',
    issuer: 'Offline Root CA',
    serial: '99E221BC44F',
    type: 'Code Signing',
    status: 'Valid',
    expiry: '2026-11-20T18:00:00Z',
    algorithm: 'Ed25519',
    usage: 'Content Commitment'
  },
  {
    id: '5',
    subject: '*.dev.local',
    issuer: 'Internal Root CA',
    serial: '33A009DE77A',
    type: 'TLS Server',
    status: 'Valid',
    expiry: '2025-03-22T12:00:00Z',
    algorithm: 'RSA 2048 (SHA256)',
    usage: 'Key Encipherment'
  }
];

export function CertificateTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredCerts = mockCertificates.filter(cert => {
    const matchesSearch = cert.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cert.serial.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || cert.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Certificates</h1>
          <p className="text-slate-500 mt-1">Manage and monitor all X.509 certificates across your infrastructure.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4 text-slate-500" />
            Export List
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
            <Globe className="w-4 h-4" />
            Issue Certificate
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by subject or serial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
              {['All', 'Valid', 'Expiring Soon', 'Revoked'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                    selectedStatus === status 
                      ? "bg-slate-900 text-white shadow-sm" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Serial Number</th>
                <th className="px-6 py-4">Type / Algorithm</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCerts.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center border",
                        cert.status === 'Revoked' ? "bg-red-50 border-red-100 text-red-600" :
                        cert.status === 'Expiring Soon' ? "bg-orange-50 border-orange-100 text-orange-600" :
                        "bg-blue-50 border-blue-100 text-blue-600"
                      )}>
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none">{cert.subject}</p>
                        <p className="text-xs text-slate-500 mt-1">Issuer: {cert.issuer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {formatSerialNumber(cert.serial)}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-700">{cert.type}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">{cert.algorithm}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border",
                      cert.status === 'Valid' ? "bg-green-50 text-green-700 border-green-100" :
                      cert.status === 'Expiring Soon' ? "bg-orange-50 text-orange-700 border-orange-100" :
                      "bg-red-50 text-red-700 border-red-100"
                    )}>
                      {cert.status === 'Valid' ? <CheckCircle2 className="w-3 h-3" /> :
                       cert.status === 'Expiring Soon' ? <Clock className="w-3 h-3" /> :
                       <AlertCircle className="w-3 h-3" />}
                      {cert.status.toUpperCase()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(cert.expiry)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="View Details" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button title="Download" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <FileDown className="w-4 h-4" />
                      </button>
                      <button title="Renew" className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                        <RefreshCcw className="w-4 h-4" />
                      </button>
                      <button title="Revoke" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
          <p>Showing 1-5 of 1,482 certificates</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}