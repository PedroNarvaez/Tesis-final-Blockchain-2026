import React from 'react';
import { GovernanceControl } from '../types';
import {
  ShieldCheck,
  Eye,
  Lock,
  FileCheck,
  UserSquare,
  CheckCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export const Governance: React.FC = () => {
  const controls: GovernanceControl[] = [
    {
      controlId: "ISO-27001-A12",
      categoria: "Seguridad de las Operaciones",
      nombre: "Registro y Monitoreo de Transacciones",
      descripcion: "Generación de trazas de auditoría inmutables blockchain para cada emparejamiento o resolución de excepción contable.",
      estadoCumplimiento: "cumplido",
      auditor: "Auditoría Interna KPMG",
      ultimaVerificacion: "2025-06-14"
    },
    {
      controlId: "RBAC-SEC-01",
      categoria: "Control de Acceso",
      nombre: "Control de Acceso Basado en Roles (RBAC)",
      descripcion: "Permisos granulares estructurados para personal auxiliar, contadores y gerentes de finanzas con firmas de consentimiento digital.",
      estadoCumplimiento: "cumplido",
      auditor: "ISO 27001 Auditor",
      ultimaVerificacion: "2025-05-10"
    },
    {
      controlId: "TLS-AES-256",
      categoria: "Criptografía de Datos",
      nombre: "Cifrado en Tránsito y Reposo (TLS/AES)",
      descripcion: "Canales seguros de comunicación con los bancos (CAMT.053) y cifrado local de bases de datos mediante llaves corporativas.",
      estadoCumplimiento: "cumplido",
      auditor: "CISO Corporativo",
      ultimaVerificacion: "2025-06-01"
    },
    {
      controlId: "OFF-CHAIN-DOCS",
      categoria: "Arquitectura Híbrida",
      nombre: "Documentación Original Off-Chain / Hashes On-Chain",
      descripcion: "Almacenamiento de documentos pesados en servidores locales seguros, mientras que los identificadores y hashes de validación se registran on-chain.",
      estadoCumplimiento: "cumplido",
      auditor: "Lead Architect Blockchain",
      ultimaVerificacion: "2025-05-18"
    },
    {
      controlId: "BCP-DR-05",
      categoria: "Continuidad del Negocio",
      nombre: "Plan de Recuperación y Alta Disponibilidad",
      descripcion: "Sincronización multi-región y nodos replicados del ledger permissionado para mantener la resiliencia contable.",
      estadoCumplimiento: "en_proceso",
      auditor: "SRE Team Lead",
      ultimaVerificacion: "2025-06-11"
    }
  ];

  const getCumplimientoIndicator = (estado: GovernanceControl['estadoCumplimiento']) => {
    switch(estado) {
      case 'cumplido':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">Acreditado</span>;
      case 'en_proceso':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">En Proceso</span>;
      case 'pendiente':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20 uppercase">Pendiente</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-white">Gobierno, Riesgo y Cumplimiento (GRC)</h1>
        <p className="text-sm text-slate-400">Controles de seguridad, estándares internacionales y políticas de adopción de la consola ConciliaLedger</p>
      </div>

      {/* Intro info card */}
      <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex gap-3.5 items-start">
        <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Marco Normativo y Prácticas de Ciberseguridad</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            ConciliaLedger opera bajo un modelo de gobierno híbrido diseñado específicamente para auditorías corporativas.
            Todas las acciones críticas ejecutadas en el panel de control se respaldan mediante hashes integrados de extremo a extremo, facilitando la auditoría de cumplimiento fiscal y controles SOX / ISO 27001.
          </p>
        </div>
      </div>

      {/* Table of Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-950/20 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Catálogo de Controles de Seguridad y Adopción</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase bg-slate-950/40">
                <th className="py-3 px-4">Código / Categoría</th>
                <th className="py-3 px-4">Nombre del Control</th>
                <th className="py-3 px-4">Descripción de Implementación</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4">Auditor Responsable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {controls.map((ctrl) => (
                <tr key={ctrl.controlId} className="hover:bg-slate-950/10">
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-400 font-bold block">{ctrl.controlId}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">{ctrl.categoria}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">{ctrl.nombre}</td>
                  <td className="py-3 px-4 text-slate-300 max-w-xs">{ctrl.descripcion}</td>
                  <td className="py-3 px-4">{getCumplimientoIndicator(ctrl.estadoCumplimiento)}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-300 block">{ctrl.auditor}</span>
                    <span className="text-[10px] text-slate-500 block">Verificado: {ctrl.ultimaVerificacion}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
