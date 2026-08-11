import React from 'react';
import { dnitOpenData, periodo, value2024, Recaudacion2025, normalizeDnitForHash, getDnitHash } from '../data/dnitData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainerProps
} from 'recharts';
import {
  Award,
  TrendingUp,
  UserCheck,
  CalendarDays,
  Download,
  FileCheck,
  Building,
  Hash,
  Coins
} from 'lucide-react';

export const DnitPortal: React.FC = () => {
  // KPIs
  const total2025 = Recaudacion2025; // Millones Gs
  const total2024 = value2024; // Millones Gs
  const crecimiento = ((total2025 - total2024) / total2024) * 100;

  // Encontrar el pico de recaudación mensual 2025
  const peakMonth = dnitOpenData.mensual.reduce((prev, current) =>
    (prev.recaudacion2025 > current.recaudacion2025) ? prev : current
  );

  // Obtener el Hash del dataset
  const dnitHash = getDnitHash();

  // Exportar el JSON serializado de dnitOpenData
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dnitOpenData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dnit_datos_abiertos_2025.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.removeChild(downloadAnchor);
  };

  // Datos para gráfico mensual
  const chartMensualData = dnitOpenData.mensual.map(item => ({
    mes: item.mes,
    'Recaudación 2024': item.recaudacion2024 / 1000, // en miles de millones de Gs
    'Recaudación 2025': item.recaudacion2025 / 1000,
  }));

  // Datos para gráfico por departamentos 2025
  const chartDeptoData = dnitOpenData.departamentos.map(item => ({
    departamento: item.departamento,
    'Contribuyentes 2025': item.contribuyentes2025,
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Módulo Datos Abiertos Oficiales (DNIT)</h1>
          <p className="text-sm text-slate-400">Contexto fiscal y evidencias públicas obtenidas del portal oficial de la Dirección Nacional de Ingresos Tributarios de Paraguay</p>
        </div>

        <button
          onClick={handleExportJSON}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow transition-all cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
        >
          <Download className="h-4 w-4" />
          Exportar Evidencia JSON
        </button>
      </div>

      {/* Strict DNIT Disclaimers */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex gap-3.5 items-start">
        <Building className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Aviso Legal de Gobierno y Cumplimiento Financiero</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Los datos de la DNIT son de carácter de <strong>contexto fiscal general país y evidencia verificable</strong> del padrón nacional.
            No sustituyen de ningún modo las facturas, comprobantes electrónicos (SIFEN) o extractos privados correspondientes a las transacciones de ventas reales y operaciones de sucursales particulares de la empresa.
          </p>
        </div>
      </div>

      {/* Main KPIs Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Recaudación 2025 */}
        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recaudación 2025</span>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">Gs. {total2025.toLocaleString()} M</h3>
            <span className="text-[10px] text-slate-500 mt-1 block">Acumulado total de Ingresos Tributarios del ejercicio</span>
          </div>
        </div>

        {/* KPI 2: Crecimiento vs 2024 */}
        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Crecimiento vs 2024</span>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-emerald-400 tracking-tight">+{crecimiento.toFixed(2)}%</h3>
            <span className="text-[10px] text-slate-500 mt-1 block">Comparativo de recaudación total {total2024.toLocaleString()} M (2024)</span>
          </div>
        </div>

        {/* KPI 3: Base RUC 2025 */}
        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Base RUC 2025</span>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">{dnitOpenData.contribuyentesTotal2025.toLocaleString()}</h3>
            <span className="text-[10px] text-slate-500 mt-1 block">Contribuyentes país activos (+{(dnitOpenData.contribuyentesTotal2025 - dnitOpenData.contribuyentesTotal2024).toLocaleString()} vs 2024)</span>
          </div>
        </div>

        {/* KPI 4: Pico Mensual 2025 */}
        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pico Mensual 2025</span>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">{peakMonth.mes}</h3>
            <span className="text-[10px] text-slate-500 mt-1 block">Recaudación pico de Gs. {peakMonth.recaudacion2025.toLocaleString()} M</span>
          </div>
        </div>
      </div>

      {/* Dataset SHA-256 Info */}
      <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2.5 items-center">
          <Hash className="h-5 w-5 text-indigo-400 shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SHA-256 Dataset Normalizado</span>
            <p className="text-xs font-mono text-indigo-300 break-all">{dnitHash}</p>
          </div>
        </div>
        <div className="text-[11px] text-slate-500 font-semibold uppercase text-right shrink-0">
          Periodo Normalizado: <span className="text-white font-bold">{periodo}</span>
        </div>
      </div>

      {/* Charts Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recaudación Mensual comparison chart */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Comparativo Recaudación de Impuestos</h3>
            <p className="text-xs text-slate-400">Valores mensuales expresados en miles de millones de Gs.</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartMensualData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="dnit2025" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="dnit2024" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="mes" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Legend verticalAlign="top" height={36} />
                <Area type="monotone" dataKey="Recaudación 2025" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#dnit2025)" />
                <Area type="monotone" dataKey="Recaudación 2024" stroke="#475569" strokeWidth={2} fillOpacity={1} fill="url(#dnit2024)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contribuyentes por departamento chart */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contribuyentes por Departamento Principal (2025)</h3>
            <p className="text-xs text-slate-400">Distribución territorial de contribuyentes activos en el Paraguay</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartDeptoData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="departamento" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="Contribuyentes 2025" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top 2024 Contributors Reference Table */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Ranking de Grandes Aportantes DNIT (Periodo 2024 Referencial)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase bg-slate-950/40">
                <th className="py-2.5 px-4">Posición</th>
                <th className="py-2.5 px-4">Contribuyente / Empresa</th>
                <th className="py-2.5 px-4 text-right">Aporte Total en Millones de Guaraníes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {dnitOpenData.topAportantes2024.map((aportante, index) => (
                <tr key={aportante.nombre} className="hover:bg-slate-950/10">
                  <td className="py-2.5 px-4 font-mono text-slate-400">#0{index + 1}</td>
                  <td className="py-2.5 px-4 font-semibold text-white">{aportante.nombre}</td>
                  <td className="py-2.5 px-4 text-right text-indigo-400 font-mono font-bold">Gs. {aportante.aporte2024.toLocaleString()} M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Se expone un export de alias para el cumplimiento de las pruebas que buscan "DnitDataView"
export const DnitDataView = DnitPortal;
export default DnitPortal;
