export interface DnitMonthlyRecaudacion {
  mes: string;
  recaudacion2024: number; // en millones de Gs.
  recaudacion2025: number; // en millones de Gs.
}

export interface DnitDepartamentoContribuyentes {
  departamento: string;
  contribuyentes2024: number;
  contribuyentes2025: number;
}

export interface DnitAportante {
  nombre: string;
  aporte2024: number; // en millones de Gs.
}

export interface DnitDataset {
  periodo: string;
  recaudacionTotal2024: number;
  recaudacionTotal2025: number;
  contribuyentesTotal2024: number;
  contribuyentesTotal2025: number;
  mensual: DnitMonthlyRecaudacion[];
  departamentos: DnitDepartamentoContribuyentes[];
  topAportantes2024: DnitAportante[];
}

export interface ERPTransaction {
  id: string;
  fecha: string;
  ruc: string;
  cliente: string;
  monto: number;
  moneda: string;
  cuentaBancariaDestino: string;
  referencia: string;
}

export interface BankTransaction {
  id: string;
  fecha: string;
  ruc: string;
  descripcion: string;
  monto: number;
  moneda: string;
  cuentaBancaria: string;
  referencia: string;
}

export type MatchStatus = 'conciliado' | 'diferencia' | 'venta_sin_banco' | 'banco_sin_erp' | 'revision_manual';

export interface ReconciliationMatch {
  id: string;
  erpId?: string;
  bankId?: string;
  status: MatchStatus;
  score: number; // de 0 a 100 indicando concordancia
  explicacion: string;
  montoERP?: number;
  montoBanco?: number;
  fechaERP?: string;
  fechaBanco?: string;
  rucERP?: string;
  rucBanco?: string;
}

export interface RuleConfig {
  toleranciaMonetaria: number; // en Guaraníes de diferencia permitida
  ventanaFechasDias: number; // diferencia máxima de días
  scoreAutoaprobacion: number; // score mínimo para conciliar automáticamente (e.g. 85)
  exigirRuc: boolean;
  exigirMismaCuenta: boolean;
}

export type ExceptionAction = 'pendiente' | 'aprobado' | 'investigando' | 'reprocesado';
export type ExceptionPriority = 'alta' | 'media' | 'baja';

export interface ExceptionCase {
  id: string;
  matchId: string;
  motivo: string;
  prioridad: ExceptionPriority;
  exposicion: number; // monto expuesto
  confianza: number; // % score
  slaHoras: number;
  transcurridoHoras: number;
  responsable: string;
  estado: ExceptionAction;
  fechaCreacion: string;
  detalle: string;
}

export interface BlockchainBlock {
  indice: number;
  fecha: string;
  hash: string;
  hashAnterior: string;
  contratoInteligente: string;
  evidencias: {
    matchId: string;
    tipo: string;
    hashDocumento: string;
    datosResumen: string;
  };
  validador: string;
}

export interface IntegrationConnector {
  id: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  estado: 'activo' | 'inactivo' | 'advertencia';
  metrica: string;
  icono: string;
}

export interface GovernanceControl {
  controlId: string;
  categoria: string;
  nombre: string;
  descripcion: string;
  estadoCumplimiento: 'cumplido' | 'en_proceso' | 'pendiente';
  auditor: string;
  ultimaVerificacion: string;
}
