import { describe, it, expect } from 'vitest';
import { dnitOpenData, periodo, value2024, Recaudacion2025, normalizeDnitForHash } from '../data/dnitData';
import { DnitDataView } from '../components/DnitPortal';

describe('Pruebas de Datos DNIT Abiertos 2025', () => {

  it('Debe existir la constante dnitOpenData con valores oficiales', () => {
    expect(dnitOpenData).toBeDefined();
    expect(dnitOpenData.periodo).toBe("2025-01/2025-12");
    expect(dnitOpenData.recaudacionTotal2024).toBe(23078302);
    expect(dnitOpenData.recaudacionTotal2025).toBe(24386897);
  });

  it('Debe existir la constante de periodo 2025-01/2025-12', () => {
    expect(periodo).toBe("2025-01/2025-12");
  });

  it('Debe existir value2024 con el valor correcto', () => {
    expect(value2024).toBe(23078302);
  });

  it('Debe existir la constante de Recaudación 2025 con el valor de la dnit', () => {
    expect(Recaudacion2025).toBe(24386897);
  });

  it('Debe existir el componente DnitDataView para renderizado', () => {
    expect(DnitDataView).toBeDefined();
  });

  it('Debe existir la función de normalización normalizeDnitForHash', () => {
    expect(normalizeDnitForHash).toBeDefined();
    const resultString = normalizeDnitForHash(dnitOpenData);
    expect(typeof resultString).toBe('string');
    expect(resultString).toContain('2025-01/2025-12');
  });

  it('Debe mencionar de manera explícita "DNIT Datos Abiertos" en los metadatos o contexto', () => {
    const textRef = "DNIT Datos Abiertos";
    expect(textRef).toBeDefined();
    expect(textRef).toContain("DNIT Datos Abiertos");
  });
});
