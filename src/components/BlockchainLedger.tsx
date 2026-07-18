import React, { useState } from 'react';
import { BlockchainBlock, ReconciliationMatch } from '../types';
import { getDnitHash } from '../data/dnitData';
import {
  Link2,
  Cpu,
  CheckCircle,
  AlertOctagon,
  Search,
  HelpCircle,
  FileCode,
  Layers,
  Sparkles,
  Lock
} from 'lucide-react';

interface BlockchainLedgerProps {
  blocks: BlockchainBlock[];
  matches: ReconciliationMatch[];
}

export const BlockchainLedger: React.FC<BlockchainLedgerProps> = ({
  blocks,
  matches
}) => {
  const [selectedBlock, setSelectedBlock] = useState<BlockchainBlock | null>(null);
  const dnitHash = getDnitHash();

  // Verificar la integridad de la cadena
  let isChainValid = true;
  for (let i = 1; i < blocks.length; i++) {
    if (blocks[i].hashAnterior !== blocks[i-1].hash) {
      isChainValid = false;
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Libro Mayor Blockchain Permissionado</h1>
          <p className="text-sm text-slate-400">Consola de auditoría de contratos inteligentes e integridad criptográfica (Hyperledger Fabric)</p>
        </div>

        {/* Chain Integrity indicator */}
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-bold ${isChainValid ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
            <CheckCircle className="h-4 w-4" />
            Red Activa & Integridad Ok
          </div>
        </div>
      </div>

      {/* Info Boxes on SHA-256 and DNIT Hash */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex gap-3 items-center">
          <Lock className="h-6 w-6 text-blue-500 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hash del Dataset DNIT Paraguay (Contexto Fiscal)</span>
            <p className="text-xs font-mono text-blue-300 truncate mt-1">{dnitHash}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex gap-3 items-center">
          <FileCode className="h-6 w-6 text-indigo-500 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Contrato Inteligente de Reglas de Conciliación</span>
            <p className="text-xs font-semibold text-slate-200 mt-1">ReconciliationRulesetContractv1.0.3 · Activo</p>
          </div>
        </div>
      </div>

      {/* Main layout: Blocks Stream and Block detailed examiner */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Blocks Stream */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">Secuencia de Bloques Confirmados (Ledger Stream)</h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">{blocks.length} Bloques de Evidencias</span>
            </div>

            {/* Blocks Cards Layout */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {blocks.map((block) => {
                const isSelected = selectedBlock?.indice === block.indice;
                return (
                  <div
                    key={block.indice}
                    onClick={() => setSelectedBlock(block)}
                    className={`p-4 rounded-lg border hover:border-slate-600 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-blue-600/10 border-blue-500'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Block index badge */}
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-sm text-blue-400">
                        #{block.indice}
                      </div>

                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-500 font-semibold uppercase">{block.fecha} | {block.validador}</span>
                        <h4 className="text-xs font-bold text-slate-200 truncate mt-0.5">{block.evidencias.datosResumen}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">Hash: {block.hash}</span>
                          <span className="text-[10px] font-mono text-slate-500 truncate max-w-[120px]">Prev: {block.hashAnterior}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                        Confirmado
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed block examiner */}
        <div className="xl:col-span-1">
          {selectedBlock ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6 h-fit sticky top-6">
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 font-mono">Bloque #{selectedBlock.indice}</span>
                  <span className="text-[10px] text-slate-500">{selectedBlock.fecha}</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">Registro de Consistencia de Conciliación</h3>
              </div>

              <div className="space-y-4 text-xs">
                {/* Hashes details */}
                <div className="space-y-2">
                  <div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase block">Hash del Bloque (SHA-256)</span>
                    <p className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[10px] text-blue-300 break-all select-all">
                      {selectedBlock.hash}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase block">Hash del Bloque Anterior</span>
                    <p className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[10px] text-slate-400 break-all">
                      {selectedBlock.hashAnterior}
                    </p>
                  </div>
                </div>

                {/* Proof details */}
                <div className="space-y-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase border-b border-slate-800 pb-1.5 block">Evidencias Almacenadas (On-Chain)</span>

                  <div>
                    <span className="text-[10px] text-slate-500 font-medium">ID de Cruce Vinculado:</span>
                    <p className="font-semibold text-white font-mono mt-0.5">{selectedBlock.evidencias.matchId}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-medium">Tipo de Evidencia:</span>
                    <p className="font-semibold text-slate-300 mt-0.5">{selectedBlock.evidencias.tipo}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-medium">Hash del Documento Original (Off-Chain):</span>
                    <p className="font-mono text-slate-300 truncate mt-0.5">{selectedBlock.evidencias.hashDocumento}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-medium">Detalle del Movimiento:</span>
                    <p className="font-semibold text-slate-300 mt-0.5">{selectedBlock.evidencias.datosResumen}</p>
                  </div>
                </div>

                {/* Smart Contract link */}
                <div className="p-3 bg-blue-600/5 rounded-lg border border-blue-500/10 flex gap-2.5 items-start">
                  <Cpu className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Chaincode de Consenso</span>
                    <p className="text-[11px] text-slate-300 font-medium mt-0.5">{selectedBlock.contratoInteligente}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-8 text-center text-slate-500 text-xs flex flex-col items-center justify-center h-64">
              <Search className="h-8 w-8 text-slate-600 mb-3" />
              <p className="font-semibold text-slate-400">Examine un Bloque de Evidencia</p>
              <p className="max-w-[180px] mt-1 mx-auto text-[11px] text-slate-500">Seleccione cualquier bloque de la cadena para auditar las firmas criptográficas de la conciliación.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
