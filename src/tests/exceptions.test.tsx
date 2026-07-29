// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Exceptions } from '../components/Exceptions';
import { ExceptionCase } from '../types';

const mockExceptions: ExceptionCase[] = [
  {
    id: "EXC-001",
    matchId: "CRU-001",
    motivo: "Discrepancia de Monto",
    detalle: "Diferencia de Gs. 5,000 en transacción de prueba.",
    prioridad: "alta",
    estado: "pendiente",
    exposicion: 5000,
    confianza: 85,
    slaHoras: 24,
    transcurridoHoras: 2,
    responsable: "Juan Pérez",
    fechaCreacion: "2025-06-21"
  }
];

describe('Exceptions Component UX & Accessibility Tests', () => {
  it('renders exceptions list items as semantic accessible buttons', () => {
    const handleAction = vi.fn();
    render(<Exceptions exceptions={mockExceptions} onAction={handleAction} />);

    // Query elements with the button role
    const buttons = screen.getAllByRole('button');

    // There are three filter buttons + the exception list item button
    // Let's filter the ones that are exception cards
    const exceptionButton = buttons.find(button =>
      button.getAttribute('aria-label')?.includes("Caso EXC-001")
    );

    expect(exceptionButton).toBeDefined();
    expect(exceptionButton?.tagName).toBe('BUTTON');
    expect(exceptionButton?.getAttribute('aria-label')).toContain('Caso EXC-001: Discrepancia de Monto');
  });

  it('selects an exception and shows focus states', () => {
    const handleAction = vi.fn();
    render(<Exceptions exceptions={mockExceptions} onAction={handleAction} />);

    const buttons = screen.getAllByRole('button');
    const exceptionButton = buttons.find(button =>
      button.getAttribute('aria-label')?.includes("Caso EXC-001")
    );

    expect(exceptionButton).toBeDefined();

    // Check click interaction
    fireEvent.click(exceptionButton!);

    // After clicking, the details section should show the detailed view
    expect(screen.getByText('Evidencia / Detalle del Desvío:')).toBeDefined();
    const detailMatches = screen.getAllByText('Diferencia de Gs. 5,000 en transacción de prueba.');
    expect(detailMatches.length).toBeGreaterThanOrEqual(1);
  });
});
