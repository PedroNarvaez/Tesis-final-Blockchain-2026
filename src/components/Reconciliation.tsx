import React, { useState } from 'react';
import { RuleConfig, ReconciliationMatch } from '../types';
import { erpTransactions, bankTransactions } from '../data/mockData';
import {
  Settings2,
  ArrowRightLeft,
  Download,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileSpreadsheet,
  PlusCircle,
  TrendingDown
} from 'lucide-react';

interface ReconciliationProps {
  matches: ReconciliationMatch[];
  rules: RuleConfig;
  onUpdateRules: (newRules: RuleConfig) => void;
}

export const Reconciliation: React.FC<ReconciliationProps> = ({
  matches,
  rules,
  onUpdateRules
}) => {
  const [localRules, setLocalRules] = useState<RuleConfig>(rules);
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  const handleRuleChange = (key: keyof RuleConfig, value: any) => {
    const updated = { ...localRules, [key]: value };
    setLocalRules(updated);
    onUpdateRules(updated);
  };

  // Filtrado de matches en la tabla
  const filteredMatches = matches.filter(m => {
    if (filterStatus === 'todos') return true;
    return m.status === filterStatus;
  });

  // Exportar reporte de Conciliación a CSV
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID Conciliacion,ID ERP,ID Banco,Estado,Confianza Score,Detalle Explicativo,Monto ERP,Monto Banco,RUC ERP,RUC Banco\n";

    matches.forEach(m => {
      const row = [
        m.id,
        m.erpId || "N/A",
        m.bankId || "N/A",
        m.status.toUpperCase(),
        `${m.score}%`,
        `"${m.explicacion.replace(/"/g, '""')}"`,
        m.montoERP || 0,
        m.montoBanco || 0,
        m.rucERP || "N/A",
        m.rucBanco || "N/A"
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Reporte_ConciliaLedger_2025.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: ReconciliationMatch['status']) => {
    switch(status) {
      case 'conciliado':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Conciliado</span>;
      case 'diferencia':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Diferencia Monto</span>;
      case 'venta_sin_banco':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">Venta sin Banco</span>;
      case 'banco_sin_erp':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Banco sin ERP</span>;
      case 'revision_manual':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">Revisión Manual</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Motor de Conciliación</h1>
          <p className="text-sm text-slate-400">Configure las reglas corporativas y valide la correspondencia entre ERP y extractos bancarios</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow transition-all cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </button>
      </div>

      {/* Main Grid: Left Rules Panel, Right Transactions Matcher */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Rules Config Panel */}
        <div className="xl:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-6 h-fit">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Settings2 className="h-5 w-5 text-blue-500" />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">Motor de Reglas Configurable</h3>
          </div>

          <div className="space-y-4">
            {/* Rule 1: Tolerancia Monetaria */}
            <div>
              <label htmlFor="tolerancia-monetaria-input" className="text-xs font-semibold text-slate-400 block mb-1 cursor-pointer">
                Tolerancia Monetaria (Gs.)
              </label>
              <input
                id="tolerancia-monetaria-input"
                type="number"
                value={localRules.toleranciaMonetaria}
                onChange={(e) => handleRuleChange('toleranciaMonetaria', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                min="0"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Diferencia permitida sin forzar auditoría.</span>
            </div>

            {/* Rule 2: Ventana de Fechas */}
            <div>
              <label htmlFor="ventana-fechas-input" className="text-xs font-semibold text-slate-400 block mb-1 cursor-pointer">
                Ventana de Fechas (Días)
              </label>
              <input
                id="ventana-fechas-input"
                type="number"
                value={localRules.ventanaFechasDias}
                onChange={(e) => handleRuleChange('ventanaFechasDias', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                min="0"
                max="30"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Rango de días permitidos entre transacciones.</span>
            </div>

            {/* Rule 3: Autoaprobación Score */}
            <div>
              <label htmlFor="autoaprobacion-score-input" className="text-xs font-semibold text-slate-400 block mb-1 cursor-pointer">
                Score de Autoaprobación (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="autoaprobacion-score-input"
                  type="range"
                  min="50"
                  max="100"
                  value={localRules.scoreAutoaprobacion}
                  onChange={(e) => handleRuleChange('scoreAutoaprobacion', parseInt(e.target.value))}
                  className="flex-1 accent-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  aria-label="Score de Autoaprobación"
                />
                <span className="text-sm font-bold text-white w-8 shrink-0">{localRules.scoreAutoaprobacion}%</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Límite mínimo para aprobar de forma directa.</span>
            </div>

            {/* Toggle 4: Exigir RUC */}
            <label htmlFor="exigir-ruc-checkbox" className="flex items-center justify-between py-2 border-t border-b border-slate-800/60 hover:bg-slate-800/10 px-1 rounded transition-colors cursor-pointer select-none">
              <div className="flex-1">
                <span className="text-xs font-semibold text-slate-300 block">Exigir Validación de RUC</span>
                <span className="text-[10px] text-slate-500 block">Comprobar contra padrón DNIT</span>
              </div>
              <input
                id="exigir-ruc-checkbox"
                type="checkbox"
                checked={localRules.exigirRuc}
                onChange={(e) => handleRuleChange('exigirRuc', e.target.checked)}
                className="h-4 w-4 accent-blue-500 rounded cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </label>

            {/* Toggle 5: Exigir Misma Cuenta */}
            <label htmlFor="exigir-misma-cuenta-checkbox" className="flex items-center justify-between py-2 hover:bg-slate-800/10 px-1 rounded transition-colors cursor-pointer select-none">
              <div className="flex-1">
                <span className="text-xs font-semibold text-slate-300 block">Exigir Cuenta Destino</span>
                <span className="text-[10px] text-slate-500 block">Coincidir cuenta del ERP y extracto</span>
              </div>
              <input
                id="exigir-misma-cuenta-checkbox"
                type="checkbox"
                checked={localRules.exigirMismaCuenta}
                onChange={(e) => handleRuleChange('exigirMismaCuenta', e.target.checked)}
                className="h-4 w-4 accent-blue-500 rounded cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Matches and ERP/Bancos listings */}
        <div className="xl:col-span-3 space-y-6">

          {/* Matches results table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">Reporte de Cruces y Resultados</h3>
              </div>

              {/* Status filtering */}
              <div className="flex flex-wrap gap-2">
                {['todos', 'conciliado', 'diferencia', 'venta_sin_banco', 'banco_sin_erp', 'revision_manual'].map(st => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all border ${
                      filterStatus === st
                        ? 'bg-blue-600/15 border-blue-500 text-blue-400 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {st === 'todos' ? 'Todos' : st === 'venta_sin_banco' ? 'Sin Banco' : st === 'banco_sin_erp' ? 'Sin ERP' : st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/40">
                    <th className="py-3 px-4">Cruce ID / Score</th>
                    <th className="py-3 px-4">Origen ERP (Venta)</th>
                    <th className="py-3 px-4">Extracto Bancario</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4">Reglas de Control / Alertas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredMatches.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-slate-500 text-xs">
                        No se encontraron registros de conciliación que coincidan con el filtro seleccionado.
                      </td>
                    </tr>
                  ) : (
                    filteredMatches.map(m => (
                      <tr key={m.id} className="hover:bg-slate-950/20 text-xs transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono text-slate-400 font-semibold block">{m.id}</span>
                          <span className={`text-[10px] font-bold ${m.score >= rules.scoreAutoaprobacion ? 'text-emerald-400' : 'text-amber-400'}`}>
                            Confianza: {m.score}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {m.erpId ? (
                            <div>
                              <span className="font-semibold text-white block">{m.erpId}</span>
                              <span className="text-slate-400 font-mono text-[10px] block">RUC: {m.rucERP}</span>
                              <span className="text-slate-500 text-[10px]">{m.fechaERP} | Gs. {(m.montoERP || 0).toLocaleString()}</span>
                            </div>
                          ) : (
                            <span className="text-slate-500 italic">No requiere</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {m.bankId ? (
                            <div>
                              <span className="font-semibold text-white block">{m.bankId}</span>
                              <span className="text-slate-400 font-mono text-[10px] block">RUC: {m.rucBanco}</span>
                              <span className="text-slate-500 text-[10px]">{m.fechaBanco} | Gs. {(m.montoBanco || 0).toLocaleString()}</span>
                            </div>
                          ) : (
                            <span className="text-slate-500 italic">No requiere</span>
                          )}
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(m.status)}</td>
                        <td className="py-3 px-4 text-slate-300 font-medium">
                          <p className="max-w-[280px] line-clamp-2 text-[11px] text-slate-400">{m.explicacion}</p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sources Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ERP Column */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-slate-800 pb-2">ERP SAP Business One (Ventas Pendientes)</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {erpTransactions.map(e => (
                  <div key={e.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-semibold text-slate-200 font-mono">{e.id}</span>
                      <p className="text-slate-400 font-medium mt-0.5">{e.cliente}</p>
                      <span className="text-[10px] text-slate-500">{e.fecha} | RUC: {e.ruc}</span>
                    </div>
                    <span className="font-bold text-white shrink-0">Gs. {e.monto.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Banco Column */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-slate-800 pb-2">Extractos Bancarios (CAMT.053 / MT940)</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {bankTransactions.map(b => (
                  <div key={b.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-semibold text-slate-200 font-mono">{b.id}</span>
                      <p className="text-slate-400 font-medium mt-0.5 truncate max-w-[160px]">{b.descripcion}</p>
                      <span className="text-[10px] text-slate-500">{b.fecha} | RUC: {b.ruc}</span>
                    </div>
                    <span className="font-bold text-white shrink-0">Gs. {b.monto.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
