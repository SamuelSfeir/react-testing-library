import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

// Dados de exemplo para a lista de pokémons
const listaDePokemons = [
  {
    id: 1,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: { measurementUnit: 'kg', value: '8.5' },
    foundAt: [{ location: 'Mountain', map: 'Route 3' }],
    image: 'charmander-image-url',
    moreInfo: 'charmander-more-info-url',
    summary: 'Lizard Pokémon',
  },
  {
    id: 2,
    name: 'Squirtle',
    type: 'Water',
    averageWeight: { measurementUnit: 'kg', value: '9.0' },
    foundAt: [{ location: 'Pond', map: 'Route 4' }],
    image: 'squirtle-image-url',
    moreInfo: 'squirtle-more-info-url',
    summary: 'Tiny Turtle Pokémon',
  },
];

// Testa o componente FavoritePokemon
describe('Teste o componente <FavoritePokemons.js />', () => {
  renderWithRouter(<FavoritePokemon />);

  // Testa se o título 'Favorite Pokémon' está na tela
  it('Teste se aparece o título Favorite pokémons', () => {
    const title = screen.getByRole('heading', { name: 'Favorite Pokémon', level: 2 });
    expect(title).toBeInTheDocument();
  });

  // Testa se a mensagem 'No favorite Pokémon found' é exibida quando não há pokémons favoritos
  it(`Teste se é exibida na tela a mensagem No favorite Pokémon found, caso o usuário
      não tenha pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemon />);
    const text = screen.getByText('No favorite Pokémon found');
    expect(text).toBeInTheDocument();
  });
});

// Testa se apenas os pokémons favoritos são exibidos
test('Confere se é exibido apenas os pokémons favoritos', () => {
  const { getByText, queryByText } = render(
    <BrowserRouter>
      <FavoritePokemon pokemonList={ listaDePokemons } />
    </BrowserRouter>,
  );

  // Verifica se a mensagem 'No favorite Pokémon found' não está na tela
  expect(queryByText('No favorite Pokémon found')).toBeNull();

  // Verifica se cada pokémon da lista é exibido na tela
  listaDePokemons.forEach((pokemon) => {
    expect(getByText(pokemon.name)).toBeInTheDocument();
    expect(getByText(pokemon.type)).toBeInTheDocument();
  });
});
