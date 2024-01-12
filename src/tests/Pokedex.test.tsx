import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokedex ', () => {
  it('Deve mostrar proximo pokemon e resetar', async () => {
    const { user } = renderWithRouter(<App />);
    let nomeDoPokemon2 = screen.getByTestId(nomeDoPokemon);
    expect(nomeDoPokemon2.innerHTML).toBe('Pikachu');
    const button = screen.getByText('Próximo Pokémon');
    await user.click(button);
    nomeDoPokemon2 = screen.getByTestId(nomeDoPokemon);
    expect(nomeDoPokemon2.innerHTML).toBe('Charmander');
    await user.click(button);
    nomeDoPokemon2 = screen.getByTestId(nomeDoPokemon);
    expect(nomeDoPokemon2.innerHTML).toBe('Caterpie');
  });

  it('Testa se tem o filtro de todos os tipos', async () => {
    const { user } = renderWithRouter(<App />);
    const tiposDePokemon = ['Dragon', 'Normal', 'Bug', 'Electric', 'Poison', 'Fire', 'Psychic'];
    const botaoTipos = screen.getAllByTestId('pokemon-type-button');
    expect(botaoTipos.length).toBe(7);
    botaoTipos.forEach((btn) => {
      expect(tiposDePokemon).toContain(btn.innerHTML);
    });
    const todosBtn = screen.getByText('All');
    await user.click(botaoTipos[2]);
    let nomeDoPokemon2 = screen.getByTestId(nomeDoPokemon);
    expect(nomeDoPokemon2.innerHTML).toBe('Caterpie');
    await user.click(todosBtn);
    nomeDoPokemon2 = screen.getByTestId(nomeDoPokemon);
    expect(nomeDoPokemon2.innerHTML).toBe('Pikachu');
  });

  const nomeDoPokemon = 'pokemon-name';
  it('Testar h2 com Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const textoH2 = screen.getByText('Encountered Pokémon');
    expect(textoH2).toBeInTheDocument();
  });
});
