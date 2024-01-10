import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  // Testa se o primeiro link possui o texto 'Home'.
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toBeInTheDocument();
  });

  // Testa se o segundo link possui o texto 'About'.
  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toBeInTheDocument();
  });

  // Testa se o terceiro link possui o texto 'Favorite Pokémon'.
  it('O terceiro link deve possuir o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(link).toBeInTheDocument();
  });
});
