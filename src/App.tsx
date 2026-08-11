import React, { useState } from 'react';
import {
  Dashboard
} from './components/Dashboard';
import {
  Reconciliation
} from './components/Reconciliation';
import {
  Exceptions
} from './components/Exceptions';
import {
  BlockchainLedger
} from './components/BlockchainLedger';
import {
  DnitPortal
} from './components/DnitPortal';
import {
  Integrations
} from './components/Integrations';
import {
  Governance
} from './components/Governance';

import {
  runReconciliationEngine,
  generateBlockchainLedger,
  initialRuleConfig
} from './data/mockData';
import {
  RuleConfig,
  ReconciliationMatch,
  ExceptionCase,
  BlockchainBlock
} from './types';
import {
  LayoutDashboard,
  RefreshCw,
  ShieldAlert,
  Link2,
  Coins,
  Database,
  FileCheck,
  Building,
  Menu,
  X
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentScenario, setCurrentScenario] = useState<'diario' | 'mensual' | 'fraude'>('diario');
  const [ruleConfig, setRuleConfig] = useState<RuleConfig>(initialRuleConfig);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ejecución del motor con reglas actuales
  const { matches, exceptions: engineExceptions } = runReconciliationEngine(ruleConfig);
  const [activeExceptions, setActiveExceptions] = useState<ExceptionCase[]>(engineExceptions);

  // Cuando se actualizan las reglas, se recalcula
  const handleUpdateRules = (newRules: RuleConfig) => {
    setRuleConfig(newRules);
    const result = runReconciliationEngine(newRules);
    setActiveExceptions(result.exceptions);
  };

  // Manejar acciones sobre excepciones en la UI para mantener el dinamismo
  const handleExceptionAction = (excId: string, action: 'aprobado' | 'investigando' | 'reprocesado') => {
    setActiveExceptions(prev =>
      prev.map(item => item.id === excId ? { ...item, estado: action } : item)
    );
  };

  // Generar Blockchain a partir del dataset actual de conciliaciones
  const blocks = generateBlockchainLedger(matches);

  const navigation = [
    { id: 'dashboard', name: 'Centro de Control', icon: LayoutDashboard },
    { id: 'reconciliation', name: 'Conciliación', icon: RefreshCw },
    { id: 'exceptions', name: 'Excepciones', icon: ShieldAlert },
    { id: 'blockchain', name: 'Blockchain Ledger', icon: Link2 },
    { id: 'dnit', name: 'Datos DNIT Abiertos', icon: Database },
    { id: 'integrations', name: 'Integración SaaS', icon: Coins },
    { id: 'governance', name: 'Cumplimiento y Gobierno', icon: FileCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <Building className="h-6 w-6 text-blue-500 shrink-0" />
          <div>
            <h2 className="font-bold text-sm tracking-tight text-white leading-none">ConciliaLedger</h2>
            <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-widest mt-0.5 block">Enterprise SaaS</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 text-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Licencia Corporativa</span>
          <p className="text-xs text-slate-300 font-semibold mt-1">SME-PARAGUAY-2025</p>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-blue-500" />
          <h2 className="font-bold text-sm text-white">ConciliaLedger</h2>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-400 hover:text-white p-1 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded"
          aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/90 flex flex-col p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg text-white">Menú Corporativo</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-400 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded"
              aria-label="Cerrar menú de navegación"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-md transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/20'
                      : 'text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content Pane */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {activeTab === 'dashboard' && (
          <Dashboard
            matches={matches}
            exceptions={activeExceptions}
            setScenario={(sc) => {
              setCurrentScenario(sc);
              if (sc === 'fraude') {
                handleUpdateRules({
                  ...ruleConfig,
                  exigirRuc: true,
                  exigirMismaCuenta: true,
                  scoreAutoaprobacion: 95
                });
              } else if (sc === 'diario') {
                handleUpdateRules({
                  ...ruleConfig,
                  toleranciaMonetaria: 5000,
                  ventanaFechasDias: 3
                });
              } else if (sc === 'mensual') {
                handleUpdateRules({
                  ...ruleConfig,
                  toleranciaMonetaria: 1000,
                  ventanaFechasDias: 1
                });
              }
            }}
            currentScenario={currentScenario}
          />
        )}

        {activeTab === 'reconciliation' && (
          <Reconciliation
            matches={matches}
            rules={ruleConfig}
            onUpdateRules={handleUpdateRules}
          />
        )}

        {activeTab === 'exceptions' && (
          <Exceptions
            exceptions={activeExceptions}
            onAction={handleExceptionAction}
          />
        )}

        {activeTab === 'blockchain' && (
          <BlockchainLedger
            blocks={blocks}
            matches={matches}
          />
        )}

        {activeTab === 'dnit' && (
          <DnitPortal />
        )}

        {activeTab === 'integrations' && (
          <Integrations />
        )}

        {activeTab === 'governance' && (
          <Governance />
        )}
      </main>
    </div>
  );
}

export default App;
