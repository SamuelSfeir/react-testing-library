import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Teste o componente <FavoritePokemons.js />', () => {
  renderWithRouter(<FavoritePokemon />);
  it('Teste se aparece o título Favorite pokémons', () => {
    const title = screen.getByRole('heading', { name: 'Favorite Pokémon', level: 2 });
    expect(title).toBeInTheDocument();
  });

  it(`Teste se é exibida na tela a mensagem No favorite Pokémon found, caso o usuário
      não tenha pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemon />);
    const text = screen.getByText('No favorite Pokémon found');
    expect(text).toBeInTheDocument();
  });
});
