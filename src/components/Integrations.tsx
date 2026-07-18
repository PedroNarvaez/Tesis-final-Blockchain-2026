import React from 'react';
import { IntegrationConnector } from '../types';
import {
  Building,
  Database,
  Coins,
  Cpu,
  Activity,
  Wifi,
  Share2,
  Layers,
  FileCheck
} from 'lucide-react';

export const Integrations: React.FC = () => {
  const connectors: IntegrationConnector[] = [
    {
      id: "CON-001",
      nombre: "SAP Business One Connector",
      tipo: "ERP Corporativo",
      descripcion: "Sincronización automatizada bidireccional de asientos de diario, órdenes de venta y cuentas por cobrar.",
      estado: "activo",
      metrica: "Latencia < 120ms (Frecuencia: Cada 5 min)",
      icono: "Building"
    },
    {
      id: "CON-002",
      nombre: "Bancos API / CAMT.053 & MT940",
      tipo: "Entidades Financieras",
      descripcion: "Ingesta automatizada de extractos bancarios diarios e información de caja vía mensajería estandarizada SWIFT/ISO 20022.",
      estado: "activo",
      metrica: "Sincronizado (Última carga: Hace 10 min)",
      icono: "Coins"
    },
    {
      id: "CON-003",
      nombre: "DNIT Paraguay Datos Abiertos",
      tipo: "Entidad de Control Fiscal",
      descripcion: "Conector REST API para validar el padrón RUC, grandes aportantes y recaudaciones de referencia país.",
      estado: "activo",
      metrica: "Conectado (Versión API v2.4)",
      icono: "Database"
    },
    {
      id: "CON-004",
      nombre: "SIFEN / e-Kuatia (DNIT)",
      tipo: "Facturación Electrónica",
      descripcion: "Validación y cruce automático de Documentos Tributarios Electrónicos (KUDE/XML) autorizados.",
      estado: "activo",
      metrica: "Firma Digital Ok (100% de lotes procesados)",
      icono: "FileCheck"
    },
    {
      id: "CON-005",
      nombre: "Notificaciones Corporativas (Slack / Teams)",
      tipo: "Alertas y Colaboración",
      descripcion: "Suscripción a canales corporativos para informar desviaciones contables críticas de forma instantánea.",
      estado: "activo",
      metrica: "Activo (Webhooks seguros habilitados)",
      icono: "Share2"
    },
    {
      id: "CON-006",
      nombre: "SIEM Corporativo Integration",
      tipo: "Seguridad y Auditoría",
      descripcion: "Envío seguro de registros de auditoría blockchain e intentos de manipulación directamente al centro SOC.",
      estado: "activo",
      metrica: "Logs encriptados TLS 1.3",
      icono: "Cpu"
    }
  ];

  const getStatusIndicator = (status: IntegrationConnector['estado']) => {
    switch(status) {
      case 'activo':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">Conectado</span>;
      case 'advertencia':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">Demora</span>;
      case 'inactivo':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20 uppercase">Desconectado</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-white">Integraciones y Conectores</h1>
        <p className="text-sm text-slate-400">Administre las conexiones activas con sistemas legados, pasarelas bancarias y entidades de control fiscal</p>
      </div>

      {/* Main connectors grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {connectors.map((conn) => (
          <div key={conn.id} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono font-semibold">{conn.id} | {conn.tipo}</span>
                {getStatusIndicator(conn.estado)}
              </div>

              <h3 className="text-md font-bold text-white leading-tight">{conn.nombre}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{conn.descripcion}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <Activity className="h-3 w-3 text-blue-500" />
                Métrica Operativa
              </span>
              <span className="text-xs font-bold text-slate-300 font-mono">{conn.metrica}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
