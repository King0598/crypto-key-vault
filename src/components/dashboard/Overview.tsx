import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Key, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Lock,
  ArrowRight,
  ShieldOff,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

const mockData = {
  stats: [
    { label: 'Total Certificates', value: '1,482', change: '+12%', trend: 'up', icon: ShieldCheck, color: 'blue' },
    { label: 'Active Keys', value: '842', change: '+5%', trend: 'up', icon: Key, color: 'indigo' },
    { label: 'Expiring (30 days)', value: '14', change: '-2%', trend: 'down', icon: Clock, color: 'orange' },
    { label: 'Revoked', value: '42', change: '+3%', trend: 'up', icon: ShieldOff, color: 'red' },
  ],
  expiryTrend: [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 38 },
    { month: 'Apr', count: 65 },
    { month: 'May', count: 48 },
    { month: 'Jun', count: 59 },
    { month: 'Jul', count: 72 },
  ],
  recentActivity: [
    { id: 1, type: 'issue', title: 'New Certificate Issued', details: 'Subject: *.example.com (RSA 2048)', time: '2 mins ago', status: 'success' },
    { id: 2, type: 'revoke', title: 'Certificate Revoked', details: 'Serial: 0x4B3A (Compromise)', time: '45 mins ago', status: 'warning' },
    { id: 3, type: 'key', title: 'New ECC Key Generated', details: 'Curve: secp256r1', time: '2 hours ago', status: 'success' },
    { id: 4, type: 'renew', title: 'Certificate Renewed', details: 'Subject: mail-server-01', time: '5 hours ago', status: 'info' },
  ]
};

export function Dashboard() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/de97912f-338b-4ba5-88ee-6acd3b6769b4/dashboard-background-8a778171-1774522163715.webp" 
            alt="Dashboard Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Zap className="w-3 h-3" /> System Operational
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Enterprise PKI Infrastructure</h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Managing 1,482 certificates across 4 regions with 
              <span className="text-white font-bold mx-1">SoftHSM</span> hardware acceleration.
            </p>
            <div className="flex gap-4 pt-2">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
                Generate CSR
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl font-bold border border-slate-700 transition-all">
                Audit Status
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50 text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Health Score</p>
              <p className="text-2xl font-bold text-green-400 tracking-tighter">99.98%</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50 text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Risk Level</p>
              <p className="text-2xl font-bold text-blue-400 tracking-tighter">Low</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockData.stats.map((stat, i) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
              <div className="flex items-start justify-between relative">
                <div className={cn(
                  "p-3 rounded-xl shadow-sm border",
                  stat.color === 'blue' ? "bg-blue-50 text-blue-600 border-blue-100" :
                  stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                  stat.color === 'orange' ? "bg-orange-50 text-orange-600 border-orange-100" :
                  "bg-red-50 text-red-600 border-red-100"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full",
                  isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</h3>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Certificate Expiry Trend</h3>
              <p className="text-sm text-slate-500">Upcoming renewals projected per month.</p>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.expiryTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                >
                  {mockData.expiryTrend.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 6 ? '#3b82f6' : '#94a3b8'} fillOpacity={index === 6 ? 1 : 0.4} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {mockData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4 group">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105",
                  activity.status === 'success' ? "bg-green-50 border-green-100 text-green-600" :
                  activity.status === 'warning' ? "bg-orange-50 border-orange-100 text-orange-600" :
                  "bg-blue-50 border-blue-100 text-blue-600"
                )}>
                  {activity.type === 'issue' ? <ShieldCheck className="w-5 h-5" /> :
                   activity.type === 'revoke' ? <ShieldOff className="w-5 h-5" /> :
                   activity.type === 'key' ? <Key className="w-5 h-5" /> :
                   <Clock className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-800 leading-none">{activity.title}</p>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{activity.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{activity.details}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-2xl border border-blue-100">
              <div className="bg-blue-600 p-2 rounded-lg shadow-sm shadow-blue-500/20">
                <Lock className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-blue-600 tracking-widest leading-none mb-1">HSM Protection</p>
                <p className="text-xs font-bold text-slate-900">FIPS 140-2 Level 3 Active</p>
              </div>
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}