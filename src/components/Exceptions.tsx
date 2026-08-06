import React, { useState } from 'react';
import { ExceptionCase } from '../types';
import {
  ShieldAlert,
  Clock,
  User,
  Search,
  TrendingUp,
  AlertTriangle,
  Play,
  RotateCw,
  CheckCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface ExceptionsProps {
  exceptions: ExceptionCase[];
  onAction: (excId: string, action: 'aprobado' | 'investigando' | 'reprocesado') => void;
}

export const Exceptions: React.FC<ExceptionsProps> = ({
  exceptions,
  onAction
}) => {
  const [selectedCase, setSelectedCase] = useState<ExceptionCase | null>(null);
  const [activeFilter, setActiveFilter] = useState<'todos' | 'pendiente' | 'procesados'>('todos');

  const filteredExceptions = exceptions.filter(e => {
    if (activeFilter === 'todos') return true;
    if (activeFilter === 'pendiente') return e.estado === 'pendiente';
    return e.estado !== 'pendiente';
  });

  const getPriorityBadge = (p: ExceptionCase['prioridad']) => {
    switch(p) {
      case 'alta':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">ALTA</span>;
      case 'media':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">MEDIA</span>;
      case 'baja':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">BAJA</span>;
    }
  };

  const getStatusActionBadge = (s: ExceptionCase['estado']) => {
    switch(s) {
      case 'pendiente':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">Pendiente</span>;
      case 'aprobado':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Aprobado Manual</span>;
      case 'investigando':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">Investigando</span>;
      case 'reprocesado':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Reprocesado</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Worklist de Excepciones</h1>
          <p className="text-sm text-slate-400">Bandeja priorizada de desviaciones contables y operacionales pendientes de auditoría</p>
        </div>

        {/* Status filters */}
        <div className="flex gap-2 bg-slate-950 p-1 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveFilter('todos')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeFilter === 'todos' ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20' : 'text-slate-400'}`}
          >
            Todos ({exceptions.length})
          </button>
          <button
            onClick={() => setActiveFilter('pendiente')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeFilter === 'pendiente' ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20' : 'text-slate-400'}`}
          >
            Pendientes ({exceptions.filter(e => e.estado === 'pendiente').length})
          </button>
          <button
            onClick={() => setActiveFilter('procesados')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeFilter === 'procesados' ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20' : 'text-slate-400'}`}
          >
            Procesados ({exceptions.filter(e => e.estado !== 'pendiente').length})
          </button>
        </div>
      </div>

      {/* Main Grid: Cases List on Left, Detail Viewer on Right */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Cases List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-950/20 flex justify-between items-center">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Casos Abiertos de Riesgo</span>
              <span className="text-xs text-slate-400 font-semibold">Resolución conforme a SLA corporativo</span>
            </div>

            <div className="divide-y divide-slate-800/60">
              {filteredExceptions.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  No existen excepciones que requieran intervención en esta categoría.
                </div>
              ) : (
                filteredExceptions.map(exc => {
                  const isSelected = selectedCase?.id === exc.id;
                  const handleKeyDown = (e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCase(exc);
                    }
                  };
                  return (
                    <div
                      key={exc.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedCase(exc)}
                      onKeyDown={handleKeyDown}
                      aria-selected={isSelected}
                      aria-label={`Caso ${exc.id}: ${exc.motivo}. Prioridad: ${exc.prioridad}, Estado: ${exc.estado}, Exposición: Gs. ${exc.exposicion.toLocaleString()}`}
                      className={`p-4 hover:bg-slate-950/20 cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${isSelected ? 'bg-blue-600/5 border-l-4 border-l-blue-500 pl-3' : 'pl-4'}`}
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 font-mono">{exc.id}</span>
                          {getPriorityBadge(exc.prioridad)}
                          {getStatusActionBadge(exc.estado)}
                        </div>

                        <h4 className="text-sm font-semibold text-white">{exc.motivo}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 max-w-[480px]">{exc.detalle}</p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> SLA: {exc.slaHoras}h (Transcurrido: {exc.transcurridoHoras}h)</span>
                          <span className="flex items-center gap-1"><User className="h-3 w-3" /> Responsable: {exc.responsable}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Exposición Financiera</span>
                        <span className="text-sm font-bold text-rose-400 font-mono">Gs. {exc.exposicion.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Confianza Score: {exc.confianza}%</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Case Detail and Actioner */}
        <div className="xl:col-span-1">
          {selectedCase ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6 h-fit sticky top-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-slate-400 font-mono block">{selectedCase.id}</span>
                <h3 className="text-md font-bold text-white mt-1">{selectedCase.motivo}</h3>
                <div className="flex gap-2 mt-2">
                  {getPriorityBadge(selectedCase.prioridad)}
                  {getStatusActionBadge(selectedCase.estado)}
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Evidencia / Detalle del Desvío:</span>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-sans text-slate-300 leading-relaxed">
                    {selectedCase.detalle}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Exposición</span>
                    <p className="text-xs font-bold text-white font-mono mt-0.5">Gs. {selectedCase.exposicion.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Confianza</span>
                    <p className="text-xs font-bold text-white font-mono mt-0.5">{selectedCase.confianza}%</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Fecha Caso</span>
                    <p className="text-xs font-bold text-white mt-0.5">{selectedCase.fechaCreacion}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Responsable</span>
                    <p className="text-xs font-bold text-white mt-0.5">{selectedCase.responsable}</p>
                  </div>
                </div>

                {/* Case Actions */}
                {selectedCase.estado === 'pendiente' ? (
                  <div className="space-y-2 pt-2">
                    <span className="text-slate-400 font-semibold block mb-2">Acción de Auditoría:</span>

                    <button
                      onClick={() => {
                        onAction(selectedCase.id, 'aprobado');
                        setSelectedCase(prev => prev ? { ...prev, estado: 'aprobado' } : null);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all cursor-pointer"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Aprobar Transacción
                    </button>

                    <button
                      onClick={() => {
                        onAction(selectedCase.id, 'investigando');
                        setSelectedCase(prev => prev ? { ...prev, estado: 'investigando' } : null);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all cursor-pointer"
                    >
                      <Play className="h-4 w-4" />
                      Investigar / Solicitar Documentación
                    </button>

                    <button
                      onClick={() => {
                        onAction(selectedCase.id, 'reprocesado');
                        setSelectedCase(prev => prev ? { ...prev, estado: 'reprocesado' } : null);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all cursor-pointer"
                    >
                      <RotateCw className="h-4 w-4" />
                      Forzar Reprocesamiento
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-950 p-4 rounded-lg border border-emerald-500/10 text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <div>
                      <p className="font-bold">Acción Registrada</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">El caso fue resuelto y la firma digital corporativa ha sido registrada off-chain.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-8 text-center text-slate-500 text-xs flex flex-col items-center justify-center h-64">
              <Sparkles className="h-8 w-8 text-slate-600 mb-3" />
              <p className="font-semibold text-slate-400">Seleccione un Caso para Resolver</p>
              <p className="max-w-[180px] mt-1 mx-auto text-[11px] text-slate-500">Visualice la evidencia de desvío de reglas y ejecute la resolución autorizada.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
