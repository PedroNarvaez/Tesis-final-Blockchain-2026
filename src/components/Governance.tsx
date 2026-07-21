import React, { useState } from 'react';
import { GovernanceControl } from '../types';
import {
  ShieldCheck,
  Eye,
  Lock,
  FileCheck,
  UserSquare,
  CheckCircle,
  HelpCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Milestone
} from 'lucide-react';

interface RoadmapVersion {
  version: string;
  title: string;
  status: 'completado' | 'en_progreso' | 'planificado';
  date: string;
  details: string;
  highlights: string[];
}

const roadmapData: RoadmapVersion[] = [
  {
    version: "v1.0",
    title: "Consola de Conciliación Local",
    status: "completado",
    date: "Q1 2025 (Liberado)",
    details: "Establecimiento del motor de reglas paramétricas básicas, cruce de datos ERP vs Bancos, control de excepciones inicial y simulación inmutable con tecnología Hyperledger Fabric.",
    highlights: ["Motor de conciliación paramétrico", "Trazabilidad Criptográfica SHA-256", "Evidencia de contexto fiscal Paraguay"]
  },
  {
    version: "v2.0",
    title: "Multi-moneda Dinámica y Localización",
    status: "completado",
    date: "Q2 2025 (Actual)",
    details: "Soporte nativo para alternar entre Guaraníes (PYG) y Dólares (USD) con un tipo de cambio en tiempo real. Integración de formateo desacoplado y optimización de accesibilidad WCAG.",
    highlights: ["Múltiples divisas (Gs. / USD)", "Accesibilidad Mejorada (ARIA Mappings)", "Mejora de UX en sidebar y controles interactivos"]
  },
  {
    version: "v3.0",
    title: "Scoring Predictivo por Machine Learning",
    status: "en_progreso",
    date: "Q3 2025",
    details: "Integración de modelos predictivos locales para sugerir concordancias en transacciones con discrepancias de centavos o ventanas de desfases de fechas amplias.",
    highlights: ["Sugerencias automáticas de auto-resolución", "Clasificador inteligente de bandejas de riesgo", "Reducción de un 40% en auditorías manuales"]
  },
  {
    version: "v4.0",
    title: "Integración en Vivo con SIFEN (e-Kuatia)",
    status: "planificado",
    date: "Q4 2025",
    details: "Conexión directa vía webhooks seguros con el Sistema Integrado de Facturación Electrónica Nacional de Paraguay para validar de forma automática los KUDE/XML on-the-fly.",
    highlights: ["Autenticación por certificado digital corporativo", "Validación automática de RUC emisor/receptor", "Cotejo XML contra asientos del ERP"]
  },
  {
    version: "v5.0",
    title: "Smart Contracts en Hyperledger Fabric de Producción",
    status: "planificado",
    date: "Q1 2026",
    details: "Migración de la red permissionada simulada a canales corporativos dedicados de producción con nodos validadores distribuidos para auditorías públicas inmutables.",
    highlights: ["Binding de Chaincodes de gobernanza contable", "Consenso distribuido (Raft consensus)", "Trazabilidad certificada internacionalmente"]
  },
  {
    version: "v6.0",
    title: "Workflow Predictivo de Excepciones",
    status: "planificado",
    date: "Q2 2026",
    details: "Optimización de la bandeja de excepciones prioritarias. Alertas basadas en el tiempo de resolución SLA mediante bots de mensajería integrados (Slack y Teams).",
    highlights: ["Notificaciones push en tiempo real", "Asignación automática de analistas por carga", "Firma digital multi-firma contable"]
  },
  {
    version: "v7.0",
    title: "Open Banking e Integración APIs SWIFT",
    status: "planificado",
    date: "Q3 2026",
    details: "Conectores directos en tiempo real con las APIs de los principales bancos de plaza paraguaya (Sudameris, Itaú, Continental, BNF) eliminando la ingesta manual de extractos.",
    highlights: ["Soporte de estándares de mensajería ISO 20022", "Ingesta automatizada CAMT.053", "Monitoreo continuo 24/7"]
  },
  {
    version: "v8.0",
    title: "Gobernanza ISO 27001 Automatizada",
    status: "planificado",
    date: "Q4 2026",
    details: "Módulo integrado de cumplimiento y auditoría de ciberseguridad con generación automática de evidencias y reportes para ISO 27001 y cumplimiento de regulaciones SOX.",
    highlights: ["Bitácoras automáticas inmutables", "Autodiagnóstico continuo de controles RBAC", "Cifrado granular off-chain/on-chain"]
  },
  {
    version: "v9.0",
    title: "Interoperabilidad Contable Multilateral Global",
    status: "planificado",
    date: "Q1 2027",
    details: "Visión final de ConciliaLedger como un puente interoperable internacional que sincroniza múltiples legislaciones tributarias (DNIT de Paraguay, AFIP de Argentina, RFB de Brasil).",
    highlights: ["Conciliación contable transfronteriza", "Normalización impositiva multilateral", "Consola SaaS global multi-tenant"]
  }
];

export const Governance: React.FC = () => {
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
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

      {/* Roadmap section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mt-8">
        <div className="p-4 border-b border-slate-800 bg-slate-950/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Milestone className="h-5 w-5 text-indigo-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Plan de Innovación Tecnológica (SaaS Roadmap v1.0 - v9.0)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">Consola Interoperable & Escalabilidad Futura</span>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Haga clic en cada una de las versiones de la hoja de ruta para examinar la documentación técnica completa, las mejoras planificadas y la arquitectura de cumplimiento contable-fiscal para las versiones de v1.0 a la v9.0.
          </p>

          <div className="space-y-2.5">
            {roadmapData.map((item) => {
              const isExpanded = expandedVersion === item.version;
              return (
                <div
                  key={item.version}
                  className={`border rounded-lg transition-all ${
                    isExpanded
                      ? 'bg-indigo-950/10 border-indigo-500/40'
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700/80'
                  }`}
                >
                  <button
                    onClick={() => setExpandedVersion(isExpanded ? null : item.version)}
                    className="w-full flex items-center justify-between p-4 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'completado'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : item.status === 'en_progreso'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {item.version}
                      </span>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <span className="text-[10px] text-slate-500 hidden sm:inline">— {item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 sm:hidden">{item.date}</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-slate-800/40 text-xs text-slate-300 space-y-3 animate-fadeIn">
                      <p className="leading-relaxed">{item.details}</p>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1.5">Hitos Clave & Entregables:</span>
                        <div className="flex flex-wrap gap-2">
                          {item.highlights.map((hl, idx) => (
                            <span key={idx} className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-md text-[10px] text-slate-300 font-medium">
                              ✓ {hl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
