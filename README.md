# ConciliaLedger Enterprise

**ConciliaLedger Enterprise** es un prototipo profesional de tesis de grado y consola empresarial SaaS para la gestión de conciliación financiera automatizada, control de excepciones, trazabilidad criptográfica mediante tecnología Blockchain Permissionada (simulación Hyperledger Fabric) y alineación de cumplimiento fiscal basado en Datos Abiertos Oficiales de la Dirección Nacional de Ingresos Tributarios (DNIT) de Paraguay para los ejercicios cerrados 2024 y 2025.

---

## 🚀 Características Principales

1. **Centro de Control (Dashboard Executive)**
   - KPIs financieros críticos en tiempo real: Tasa de Conciliación, Exposición Financiera en Bandejas de Riesgo, Score Promedio de Confianza y Contexto Fiscal País.
   - Escenarios configurables dinámicos: *Operación Diaria*, *Cierre Mensual*, y *Monitoreo Antifraude*.
   - Gráficos comparativos interactivos de recaudación país y distribución geográfica de contribuyentes.

2. **Motor de Conciliación Paramétrico**
   - Configuración en vivo de reglas corporativas: tolerancia monetaria, ventanas de fechas (desfases en días), score mínimo de autoaprobación y filtros de cumplimiento (Exigencia estricta de RUC y cuentas bancarias).
   - Generación de reportes de conciliación con exportador a formato CSV.

3. **Worklist Priorizada de Excepciones**
   - Bandeja de resolución priorizada según exposición financiera, nivel de SLA (horas transcurridas) y confianza de concordancia.
   - Acciones de auditoría interactiva firmadas: *Aprobar*, *Investigar*, o *Forzar Reprocesamiento*.

4. **Auditoría e Integridad Blockchain (Permissioned Ledger)**
   - Simulación robusta y trazable de una red permissionada tipo *Hyperledger Fabric* con validadores descentralizados y binding de contratos inteligentes (*Chaincodes*).
   - Enlace criptográfico mediante encadenamiento SHA-256 (Hash actual y anterior por cada bloque de evidencia).
   - Vinculación directa con el hash único del dataset oficial de la DNIT.

5. **Portal de Datos Abiertos de la DNIT Paraguay**
   - Panel de control y auditoría con los valores oficiales de recaudación mensual 2024 vs 2025 (Periodo principal "2025-01/2025-12").
   - Total Recaudado 2025: Gs. 24,386,897 millones.
   - Total Recaudado 2024: Gs. 23,078,302 millones.
   - Registro geográfico y ranking referencial de grandes aportantes 2024 (ANDE, Banco Continental, Itaú, Sudameris, BNF, Paraguay Refrescos).
   - Generación y exportación de evidencia en JSON con su hash SHA-256 normalizado para validar su integridad on-chain.

6. **Cumplimiento y Gobierno de Datos (GRC)**
   - Catálogo de controles de seguridad de la información alineados con estándares internacionales ISO 27001, RBAC, criptografía híbrida (documentos off-chain / hashes on-chain) y continuidad operativa.

---

## 🛠️ Stack Tecnológico

- **Framework:** React + TypeScript (con empaquetador Vite).
- **Estilos:** Tailwind CSS v4 con PostCSS y Autoprefixer.
- **Componentes de Iconografía:** Lucide React.
- **Gráficos:** Recharts.
- **Criptografía:** CryptoJS (generador de firmas y hashes SHA-256).
- **Pruebas:** Vitest (Suite de testing unitario rápido).

---

## 📂 Estructura del Código

```text
├── src/
│   ├── components/            # Componentes visuales de alta densidad corporativa
│   │   ├── Dashboard.tsx      # Centro de control principal y análisis fiscal
│   │   ├── Reconciliation.tsx # Motor de reglas y tabla comparativa ERP vs Banco
│   │   ├── Exceptions.tsx     # Worklist priorizada para auditoría interna
│   │   ├── BlockchainLedger.tsx # Consola de bloques e integridad de Hyperledger
│   │   ├── DnitPortal.tsx     # Visualizador DnitDataView y evidencia JSON
│   │   ├── Integrations.tsx   # Conectores SaaS (SAP B1, Swift CAMT.053)
│   │   └── Governance.tsx     # Gobierno corporativo e ISO 27001
│   ├── data/
│   │   ├── dnitData.ts        # Valores oficiales DNIT 2024/2025 y normalizador
│   │   └── mockData.ts        # Simulación de transacciones ERP, Bancos y Blockchain
│   ├── tests/
│   │   └── dnit.test.ts       # Cobertura de pruebas unitarias con Vitest
│   ├── App.tsx                # Layout principal, enrutamiento de pestañas y escenarios
│   ├── App.css                # Estructura de estilos CSS y Tailwind
│   ├── main.tsx               # Punto de entrada de la aplicación
│   └── types.ts               # Tipos e interfaces estáticos de datos
├── index.html                 # Contenedor HTML principal
├── package.json               # Dependencias del proyecto
├── tsconfig.json              # Configuración de TypeScript
└── vite.config.ts             # Configuración de desarrollo Vite
```

---

## 📈 Origen de los Datos DNIT 2025

Los datos utilizados para brindar contexto fiscal nacional al sistema provienen de los portales de Datos Abiertos del Gobierno Paraguayo:

*   **Recaudación Mensual GGII DNIT (2010 al 2026)**
    *   *URL:* [Recaudación SET 2010_Jun_2026.pdf](https://www.dnit.gov.py/documents/20123/286831/5.Recaudaci%C3%B3n%2BMensual%2BSET%2B2010_Jun_2026.pdf/d34e96ba-e38c-6c99-bc06-5a89cb0e51ae?t=1783599062695)
    *   *Periodo de Análisis:* Enero a Diciembre 2025 (Crecimiento anual de +5.67% respecto a la base cerrada de 2024).

*   **Cantidad de Contribuyentes por Departamento (2010 al 2026)**
    *   *URL:* [Cantidad Contribuyentes por Dpto.pdf](https://www.dnit.gov.py/documents/20123/286840/1.Cantidad%2Bde%2BContribuyentes%2Bpor%2BDpto_%2BA%C3%B1o%2B2010_Jun_2026.pdf/c1e70d36-83fe-7a16-6ef8-b8036ca0bec7?t=1783599082137)
    *   *Métricas:* Padrón RUC nacional incrementado de 1,184,882 (2024) a 1,270,061 (2025).

---

## ⚙️ Instrucciones de Ejecución y Desarrollo

### 1. Clonar el repositorio e instalar dependencias
```bash
npm install
```

### 2. Ejecutar servidor de desarrollo local
```bash
npm run dev
```
*La aplicación iniciará de manera predeterminada en el puerto `http://localhost:3000` o alternativo.*

### 3. Compilar el proyecto para producción
```bash
npm run build
```
*Esto ejecutará las validaciones de TypeScript y creará los recursos minificados en la carpeta `/dist`.*

### 4. Ejecutar la suite de pruebas unitarias
```bash
npm run test
```
*Vitest validará el cumplimiento de todos los identificadores, variables obligatorias y algoritmos de normalización del sistema.*
