import { ERPTransaction, BankTransaction, ReconciliationMatch, BlockchainBlock, RuleConfig, ExceptionCase } from '../types';
import CryptoJS from 'crypto-js';
import { getDnitHash } from './dnitData';

export const initialRuleConfig: RuleConfig = {
  toleranciaMonetaria: 5000, // hasta 5,000 Guaraníes
  ventanaFechasDias: 3, // hasta 3 días
  scoreAutoaprobacion: 85,
  exigirRuc: true,
  exigirMismaCuenta: true
};

export const erpTransactions: ERPTransaction[] = [
  { id: "ERP-101", fecha: "2025-05-12", ruc: "80011223-4", cliente: "Importadora Central SA", monto: 15450000, moneda: "PYG", cuentaBancariaDestino: "CTA-ITAU-882", referencia: "REF-00101" },
  { id: "ERP-102", fecha: "2025-05-13", ruc: "80044556-9", cliente: "Comercial El Sol", monto: 4200000, moneda: "PYG", cuentaBancariaDestino: "CTA-ITAU-882", referencia: "REF-00102" },
  { id: "ERP-103", fecha: "2025-05-13", ruc: "80099887-2", cliente: "Distribuidora Alto Paraná", monto: 8900000, moneda: "PYG", cuentaBancariaDestino: "CTA-CONT-115", referencia: "REF-00103" },
  { id: "ERP-104", fecha: "2025-05-14", ruc: "80112233-1", cliente: "Constructora Chaco SRL", monto: 24500000, moneda: "PYG", cuentaBancariaDestino: "CTA-ITAU-882", referencia: "REF-00104" },
  { id: "ERP-105", fecha: "2025-05-15", ruc: "80033445-5", cliente: "Tecnología Avanzada S.A.", monto: 1250000, moneda: "PYG", cuentaBancariaDestino: "CTA-CONT-115", referencia: "REF-00105" },
  { id: "ERP-106", fecha: "2025-05-15", ruc: "80055667-0", cliente: "Supermercados El Barrio", monto: 3100000, moneda: "PYG", cuentaBancariaDestino: "CTA-ITAU-882", referencia: "REF-00106" },
  { id: "ERP-107", fecha: "2025-05-16", ruc: "80077889-1", cliente: "Farmacias del Sur", monto: 980000, moneda: "PYG", cuentaBancariaDestino: "CTA-CONT-115", referencia: "REF-00107" },
  { id: "ERP-108", fecha: "2025-05-17", ruc: "80088990-2", cliente: "Automotores Misiones", monto: 67000000, moneda: "PYG", cuentaBancariaDestino: "CTA-ITAU-882", referencia: "REF-00108" },
];

export const bankTransactions: BankTransaction[] = [
  // Perfect Match with ERP-101
  { id: "BNK-501", fecha: "2025-05-12", ruc: "80011223-4", descripcion: "DEP. IMPORTADORA CENTRAL SA", monto: 15450000, moneda: "PYG", cuentaBancaria: "CTA-ITAU-882", referencia: "REF-00101" },
  // Match with minor difference in amount (ERP-102 is 4,200,000, bank is 4,198,000 - under tolerance 5,000)
  { id: "BNK-502", fecha: "2025-05-13", ruc: "80044556-9", descripcion: "DEP. COMER. EL SOL TXR", monto: 4198000, moneda: "PYG", cuentaBancaria: "CTA-ITAU-882", referencia: "REF-00102" },
  // Match with major difference in amount (ERP-103 is 8,900,000, bank is 8,000,000 - exception)
  { id: "BNK-503", fecha: "2025-05-14", ruc: "80099887-2", descripcion: "DEP. DISTRIB. ALTO PARANA", monto: 8000000, moneda: "PYG", cuentaBancaria: "CTA-CONT-115", referencia: "REF-00103" },
  // Match with difference in dates (ERP-104 on 14th, Bank on 17th - 3 days)
  { id: "BNK-504", fecha: "2025-05-17", ruc: "80112233-1", descripcion: "CONSTRUCTORA CHACO S.R.L.", monto: 24500000, moneda: "PYG", cuentaBancaria: "CTA-ITAU-882", referencia: "REF-00104" },
  // Bank transaction without ERP (deposit from unrecognized customer)
  { id: "BNK-505", fecha: "2025-05-16", ruc: "80199911-0", descripcion: "CRED. TRANS. DIRECTA SIFEN", monto: 3500000, moneda: "PYG", cuentaBancaria: "CTA-CONT-115", referencia: "REF-99882" },
  // Perfect match with ERP-106
  { id: "BNK-506", fecha: "2025-05-15", ruc: "80055667-0", descripcion: "SUPERM. EL BARRIO TRANSF", monto: 3100000, moneda: "PYG", cuentaBancaria: "CTA-ITAU-882", referencia: "REF-00106" },
  // Bank transaction with same ref but different account destination
  { id: "BNK-507", fecha: "2025-05-16", ruc: "80077889-1", descripcion: "DEP. FARMACIAS DEL SUR", monto: 980000, moneda: "PYG", cuentaBancaria: "CTA-ITAU-882", referencia: "REF-00107" }, // ERP states CTA-CONT-115
];

export function runReconciliationEngine(rules: RuleConfig): { matches: ReconciliationMatch[]; exceptions: ExceptionCase[] } {
  const matches: ReconciliationMatch[] = [];
  const exceptions: ExceptionCase[] = [];

  const matchedErpIds = new Set<string>();
  const matchedBankIds = new Set<string>();

  // Intentar emparejar ERP con Bancos
  for (const erp of erpTransactions) {
    let bestBank: BankTransaction | null = null;
    let bestScore = 0;
    let reason = "";

    for (const bnk of bankTransactions) {
      if (matchedBankIds.has(bnk.id)) continue;

      let score = 100;
      const reasons: string[] = [];

      // Evaluar RUC
      if (erp.ruc === bnk.ruc) {
        score += 10;
      } else {
        score -= 40;
        reasons.push("RUCs no coinciden");
      }

      // Evaluar Referencia
      if (erp.referencia === bnk.referencia) {
        score += 20;
      } else {
        score -= 30;
        reasons.push("Referencias distintas");
      }

      // Evaluar Cuenta bancaria
      if (erp.cuentaBancariaDestino === bnk.cuentaBancaria) {
        score += 10;
      } else {
        score -= 20;
        reasons.push("Cuentas destino distintas");
      }

      // Evaluar Monto
      const diffMonto = Math.abs(erp.monto - bnk.monto);
      if (diffMonto === 0) {
        score += 20;
      } else if (diffMonto <= rules.toleranciaMonetaria) {
        score += 5;
        reasons.push(`Diferencia menor de Gs. ${diffMonto.toLocaleString()}`);
      } else {
        score -= 50;
        reasons.push(`Diferencia mayor de Gs. ${diffMonto.toLocaleString()}`);
      }

      // Evaluar Fechas
      const date1 = new Date(erp.fecha);
      const date2 = new Date(bnk.fecha);
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        score += 10;
      } else if (diffDays <= rules.ventanaFechasDias) {
        score += 0;
        reasons.push(`Desfase de ${diffDays} día(s)`);
      } else {
        score -= 40;
        reasons.push(`Desfase de ${diffDays} días excede ventana`);
      }

      const finalScore = Math.max(0, Math.min(100, score));
      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestBank = bnk;
        reason = reasons.join(", ") || "Concordancia exacta";
      }
    }

    if (bestBank && bestScore >= 40) {
      matchedErpIds.add(erp.id);
      matchedBankIds.add(bestBank.id);

      const diffMonto = Math.abs(erp.monto - bestBank.monto);
      const dateErp = new Date(erp.fecha);
      const dateBank = new Date(bestBank.fecha);
      const diffDays = Math.ceil(Math.abs(dateBank.getTime() - dateErp.getTime()) / (1000 * 60 * 60 * 24));

      let status: ReconciliationMatch['status'] = 'conciliado';
      let finalExplanation = reason;

      if (rules.exigirRuc && erp.ruc !== bestBank.ruc) {
        status = 'revision_manual';
        finalExplanation = "Revisión manual requerida: RUCs no coinciden.";
      } else if (rules.exigirMismaCuenta && erp.cuentaBancariaDestino !== bestBank.cuentaBancaria) {
        status = 'revision_manual';
        finalExplanation = "Revisión manual requerida: Cuentas bancarias no coinciden.";
      } else if (diffMonto > rules.toleranciaMonetaria) {
        status = 'diferencia';
        finalExplanation = `Diferencia de monto excede tolerancia de Gs. ${rules.toleranciaMonetaria.toLocaleString()}. (${reason})`;
      } else if (diffDays > rules.ventanaFechasDias) {
        status = 'revision_manual';
        finalExplanation = `Ventana de fecha de ${diffDays} días excede el límite configurado de ${rules.ventanaFechasDias} días.`;
      } else if (bestScore < rules.scoreAutoaprobacion) {
        status = 'revision_manual';
        finalExplanation = `Score de confianza (${bestScore}%) menor al umbral de autoaprobación (${rules.scoreAutoaprobacion}%).`;
      }

      const matchId = `MCH-${erp.id}-${bestBank.id}`;
      matches.push({
        id: matchId,
        erpId: erp.id,
        bankId: bestBank.id,
        status,
        score: bestScore,
        explicacion: finalExplanation,
        montoERP: erp.monto,
        montoBanco: bestBank.monto,
        fechaERP: erp.fecha,
        fechaBanco: bestBank.fecha,
        rucERP: erp.ruc,
        rucBanco: bestBank.ruc
      });

      // Si no está conciliado, enviar a excepciones
      if (status !== 'conciliado') {
        const priority: 'alta' | 'media' | 'baja' = diffMonto > 500000 ? 'alta' : (diffMonto > 100000 ? 'media' : 'baja');
        exceptions.push({
          id: `EXC-${matchId}`,
          matchId,
          motivo: status === 'diferencia' ? "Discrepancia en Monto" : "Revisión por Filtros de Cumplimiento",
          prioridad: priority,
          exposicion: diffMonto || erp.monto,
          confianza: bestScore,
          slaHoras: priority === 'alta' ? 12 : (priority === 'media' ? 24 : 48),
          transcurridoHoras: Math.floor(Math.random() * 8),
          responsable: priority === 'alta' ? "Gerente Financiero" : "Contador Senior",
          estado: 'pendiente',
          fechaCreacion: erp.fecha,
          detalle: finalExplanation
        });
      }

    } else {
      // Venta ERP sin correlato bancario
      const matchId = `MCH-${erp.id}-ORPHAN`;
      matches.push({
        id: matchId,
        erpId: erp.id,
        status: 'venta_sin_banco',
        score: 0,
        explicacion: "No se encontró ningún movimiento bancario similar.",
        montoERP: erp.monto,
        fechaERP: erp.fecha,
        rucERP: erp.ruc
      });

      exceptions.push({
        id: `EXC-${matchId}`,
        matchId,
        motivo: "Venta ERP sin cobro bancario",
        prioridad: 'alta',
        exposicion: erp.monto,
        confianza: 0,
        slaHoras: 24,
        transcurridoHoras: Math.floor(Math.random() * 12),
        responsable: "Auditor Interno",
        estado: 'pendiente',
        fechaCreacion: erp.fecha,
        detalle: "Se emitió factura de venta en ERP pero no se registra ingreso en ninguna de las cuentas bancarias configuradas."
      });
    }
  }

  // Bancos sin ERP
  for (const bnk of bankTransactions) {
    if (matchedBankIds.has(bnk.id)) continue;

    const matchId = `MCH-ORPHAN-${bnk.id}`;
    matches.push({
      id: matchId,
      bankId: bnk.id,
      status: 'banco_sin_erp',
      score: 0,
      explicacion: "Depósito bancario sin factura o venta cargada en el ERP.",
      montoBanco: bnk.monto,
      fechaBanco: bnk.fecha,
      rucBanco: bnk.ruc
    });

    exceptions.push({
      id: `EXC-${matchId}`,
      matchId,
      motivo: "Ingreso Bancario No Reconocido",
      prioridad: 'media',
      exposicion: bnk.monto,
      confianza: 0,
      slaHoras: 36,
      transcurridoHoras: Math.floor(Math.random() * 4),
      responsable: "Contador Auxiliar",
      estado: 'pendiente',
      fechaCreacion: bnk.fecha,
      detalle: `Ingreso de fondos por Gs. ${bnk.monto.toLocaleString()} en la cuenta bancaria sin referencia de factura activa en el ERP.`
    });
  }

  return { matches, exceptions };
}

// Generador de Blockchain Ledger
export function generateBlockchainLedger(matches: ReconciliationMatch[]): BlockchainBlock[] {
  const blocks: BlockchainBlock[] = [];
  let previousHash = "0000000000000000000000000000000000000000000000000000000000000000";
  const dnitHash = getDnitHash();

  matches.forEach((match, index) => {
    const blockIndex = index + 1;
    const date = match.fechaERP || match.fechaBanco || "2025-05-12";
    const smartContract = "ReconciliationRulesetContractv1.0.3";

    const blockDataStr = `${blockIndex}-${previousHash}-${smartContract}-${match.id}-${match.status}-${match.score}-${dnitHash}`;
    const blockHash = CryptoJS.SHA256(blockDataStr).toString(CryptoJS.enc.Hex);

    blocks.push({
      indice: blockIndex,
      fecha: date,
      hash: blockHash,
      hashAnterior: previousHash,
      contratoInteligente: smartContract,
      evidencias: {
        matchId: match.id,
        tipo: match.status === 'conciliado' ? "AUTO_RECONCILED_LEDGER" : "MANUAL_INVESTIGATION_CASE",
        hashDocumento: CryptoJS.SHA256(JSON.stringify(match)).toString(CryptoJS.enc.Hex).substring(0, 32),
        datosResumen: `ERP: ${match.erpId || 'N/A'} (Gs. ${(match.montoERP || 0).toLocaleString()}) <-> Banco: ${match.bankId || 'N/A'} (Gs. ${(match.montoBanco || 0).toLocaleString()})`
      },
      validador: `Nodo-Permissionado-Peer${(index % 3) + 1}-Sudamerica`
    });

    previousHash = blockHash;
  });

  return blocks;
}
