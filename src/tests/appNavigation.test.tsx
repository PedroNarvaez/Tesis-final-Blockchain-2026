// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Pruebas de Accesibilidad de Navegación', () => {
  it('Debe marcar la pestaña activa con aria-current="page"', () => {
    render(<App />);
    const activeNavButtons = screen.getAllByRole('button', { name: /Centro de Control/i });
    const desktopActiveBtn = activeNavButtons[0];
    expect(desktopActiveBtn.getAttribute('aria-current')).toBe('page');
  });

  it('Debe tener aria-label y aria-expanded en el botón del menú móvil', () => {
    render(<App />);
    const mobileToggles = screen.getAllByRole('button', { name: /Abrir menú principal/i });
    const mobileToggle = mobileToggles[0];
    expect(mobileToggle).toBeDefined();
    expect(mobileToggle.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(mobileToggle);
    const closeButtons = screen.getAllByRole('button', { name: /Cerrar menú principal/i });
    expect(closeButtons.length).toBeGreaterThan(0);
  });
});
