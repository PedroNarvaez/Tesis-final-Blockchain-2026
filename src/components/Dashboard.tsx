import React from 'react';
import {
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  AlertCircle,
  Activity,
  Coins,
  Award,
  DollarSign
} from 'lucide-react';
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
  Legend
} from 'recharts';
import { dnitOpenData } from '../data/dnitData';
import { ReconciliationMatch, ExceptionCase } from '../types';

interface DashboardProps {
  matches: ReconciliationMatch[];
  exceptions: ExceptionCase[];
  setScenario: (scenario: 'diario' | 'mensual' | 'fraude') => void;
  currentScenario: string;
  formatMoney: (value: number) => string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  matches,
  exceptions,
  setScenario,
  currentScenario,
  formatMoney
}) => {
  // KPIs Calculations
  const totalERPTransactions = matches.length;
  const reconciledCount = matches.filter(m => m.status === 'conciliado').length;
  const reconciliationRate = totalERPTransactions > 0 ? (reconciledCount / totalERPTransactions) * 100 : 0;

  const totalExposure = exceptions
    .filter(e => e.estado === 'pendiente')
    .reduce((sum, e) => sum + e.exposicion, 0);

  const averageConfidence = matches.length > 0
    ? matches.reduce((sum, m) => sum + m.score, 0) / matches.length
    : 0;

  // DNIT KPI Highlights
  const crecimientoDnit = ((dnitOpenData.recaudacionTotal2025 - dnitOpenData.recaudacionTotal2024) / dnitOpenData.recaudacionTotal2024) * 100;

  // Scenario descriptions
  const getScenarioClass = (sc: string) => {
    return currentScenario === sc
      ? 'bg-blue-600/30 border-blue-500 text-blue-200'
      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700';
  };

  // Preparation for recharts
  const chartData = dnitOpenData.mensual.map(m => ({
    mes: m.mes,
    'Recaudación 2024 (M)': m.recaudacion2024 / 1000,
    'Recaudación 2025 (M)': m.recaudacion2025 / 1000,
  }));

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Centro de Control Financiero</h1>
          <p className="text-sm text-slate-400">Panel de visualización ejecutiva en tiempo real de ConciliaLedger Enterprise</p>
        </div>

        {/* Scenarios triggers */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 border border-slate-800 rounded-lg">
          <span className="text-xs font-semibold px-2 text-slate-400 uppercase tracking-wider">Escenarios:</span>
          <button
            onClick={() => setScenario('diario')}
            className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all ${getScenarioClass('diario')}`}
          >
            Operación Diaria
          </button>
          <button
            onClick={() => setScenario('mensual')}
            className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all ${getScenarioClass('mensual')}`}
          >
            Cierre Mensual
          </button>
          <button
            onClick={() => setScenario('fraude')}
            className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all ${getScenarioClass('fraude')}`}
          >
            Monitoreo Antifraude
          </button>
        </div>
      </div>

      {/* Scenario Context Alert banner */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex gap-3 items-start">
        <Activity className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
            Escenario Activo: {currentScenario === 'diario' ? 'Operación Corporativa Diaria' : currentScenario === 'mensual' ? 'Cierre de Ejercicio Mensual' : 'Monitoreo Preventivo de Fraudes'}
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            {currentScenario === 'diario' && 'Enfocado en las conciliaciones continuas de caja diaria, validando lotes de ventas locales del ERP contra extractos bancarios del día.'}
            {currentScenario === 'mensual' && 'Enfocado en asegurar la integridad total de saldos contables de fin de mes, conciliando discrepancias grandes y validando consistencia contra datasets oficiales de la DNIT.'}
            {currentScenario === 'fraude' && 'Detección automática de anomalías: depósitos sin factura emisora (bancos huérfanos), discrepancias de RUCs, transacciones en cuentas erróneas o desvíos de SLA en resolución.'}
          </p>
        </div>
      </div>

      {/* Main KPIs Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Tasa de Conciliación</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold tracking-tight text-white">{reconciliationRate.toFixed(1)}%</h3>
            <p className="text-xs text-slate-400 mt-1">
              <span className="text-emerald-400 font-medium">{reconciledCount} de {totalERPTransactions}</span> transacciones automatizadas
            </p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Exposición Financiera</span>
            <AlertCircle className="h-4 w-4 text-rose-500" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold tracking-tight text-white">{formatMoney(totalExposure)}</h3>
            <p className="text-xs text-slate-400 mt-1">
              Monto en bandeja de excepciones pendientes
            </p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Riesgo / Confianza Promedio</span>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold tracking-tight text-white">{averageConfidence.toFixed(1)}%</h3>
            <p className="text-xs text-slate-400 mt-1">
              Score promedio del motor de reglas
            </p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Recaudación DNIT 2025</span>
            <Award className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold tracking-tight text-white">Gs. {(dnitOpenData.recaudacionTotal2025 / 1000).toFixed(0)}K M</h3>
            <p className="text-xs text-slate-400 mt-1">
              Crecimiento país vs 2024: <span className="text-emerald-400">+{crecimientoDnit.toFixed(2)}%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Middle Layout: Charts and Operation summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Column (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-bold text-white">Desempeño Fiscal País (Contexto DNIT Paraguay)</h3>
              <p className="text-xs text-slate-400">Recaudación mensual 2024 vs 2025 (Valores en miles de millones de Gs.)</p>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="color2025" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="color2024" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="mes" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" dataKey="Recaudación 2025 (M)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#color2025)" />
                <Area type="monotone" dataKey="Recaudación 2024 (M)" stroke="#64748b" strokeWidth={2} fillOpacity={1} fill="url(#color2024)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Summary Column (1 col) */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold text-white mb-4">Resumen Operacional de Conciliaciones</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <span className="text-xs text-slate-300">Conciliadas (Automático)</span>
                </div>
                <span className="text-xs font-bold text-emerald-400">
                  {matches.filter(m => m.status === 'conciliado').length}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                  <span className="text-xs text-slate-300">Discrepancias de Monto</span>
                </div>
                <span className="text-xs font-bold text-amber-400">
                  {matches.filter(m => m.status === 'diferencia').length}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                  <span className="text-xs text-slate-300">Ventas ERP sin Banco</span>
                </div>
                <span className="text-xs font-bold text-rose-400">
                  {matches.filter(m => m.status === 'venta_sin_banco').length}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0"></span>
                  <span className="text-xs text-slate-300">Banco sin ERP</span>
                </div>
                <span className="text-xs font-bold text-indigo-400">
                  {matches.filter(m => m.status === 'banco_sin_erp').length}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0"></span>
                  <span className="text-xs text-slate-300">Revisión Manual por Filtros</span>
                </div>
                <span className="text-xs font-bold text-orange-400">
                  {matches.filter(m => m.status === 'revision_manual').length}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Tecnología de Validación</span>
            <p className="text-xs text-slate-300 font-medium">Validado contra Base RUC y Registro de Aportantes DNIT</p>
          </div>
        </div>
      </div>
    </div>
  );
};
