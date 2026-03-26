import React from 'react';
import { 
  History, 
  Search, 
  Download, 
  User, 
  ShieldAlert, 
  Settings, 
  Key, 
  ShieldCheck,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';

const auditLogs = [
  { id: 1, user: 'j.doe@corp.com', action: 'CERT_ISSUED', resource: 'web.internal.corp', time: '2024-06-15T14:30:00Z', status: 'Success', severity: 'Info' },
  { id: 2, user: 'admin_sys', action: 'KEY_ROTATED', resource: 'root-ca-master', time: '2024-06-15T12:05:00Z', status: 'Success', severity: 'Warning' },
  { id: 3, user: 'j.smith@corp.com', action: 'LOGIN_FAILED', resource: 'Auth Module', time: '2024-06-15T11:45:00Z', status: 'Failure', severity: 'Critical' },
  { id: 4, user: 's.white@corp.com', action: 'CERT_REVOKED', resource: 'api-gateway-01', time: '2024-06-15T09:12:00Z', status: 'Success', severity: 'Warning' },
  { id: 5, user: 'j.doe@corp.com', action: 'KEY_EXPORTED', resource: 'dev-signing-key', time: '2024-06-14T17:55:00Z', status: 'Success', severity: 'Info' },
];

export function AuditLogs() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Audit Logs</h1>
          <p className="text-slate-500 mt-1">Full compliance trail for every cryptographic operation.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm bg-white">
            <Download className="w-4 h-4 text-slate-500" />
            Export Compliance Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search logs by user, action or resource..."
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors bg-white">
            <Filter className="w-4 h-4 text-slate-500" />
            More Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Resource</th>
                <th className="px-6 py-4 text-center">Severity</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">
                    {formatDate(log.time)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {log.user.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600 uppercase">
                      {log.action}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">
                    {log.resource}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold",
                      log.severity === 'Critical' ? "bg-red-50 text-red-700" :
                      log.severity === 'Warning' ? "bg-orange-50 text-orange-700" :
                      "bg-blue-50 text-blue-700"
                    )}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      {log.status === 'Success' ? (
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}