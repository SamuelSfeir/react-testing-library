import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe(`Se é exibido o próximo pokémon da lista quando o botão Próximo pokémon
  é clicado`, () => {
  it('É possível clicar no botão de filtragem All', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });

    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});
describe('Teste os botões', () => {
  it('Se tem a quantidade correta de botões', () => {
    const qtdButons = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(qtdButons);
  });
});
