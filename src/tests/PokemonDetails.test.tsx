import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('PokemonDetails Component Test', () => {
  test('should allow the user to favorite/unfavorite a Pokémon through the details page', async () => {
    const { user } = renderWithRouter(
      <App />,
      { route: '/pokemon/143' },
    );
    const checkMark = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkMark).toBeInTheDocument();
    await user.click(checkMark);
    expect(screen.getByRole('img', { name: /snorlax is marked as favorite/i })).toBeInTheDocument();
    await user.click(checkMark);
    const snorlaxImage = screen.queryByRole('img', { name: /snorlax is marked as favorite/i });
    expect(snorlaxImage).toBeNull();
    const favoritePokemonText = screen.getByText(/pokémon favoritado\?/i);
    expect(favoritePokemonText).toBeInTheDocument();
  });

  test('should display a section with Pokémon locations maps', () => {
    renderWithRouter(
      <App />,
      { route: '/pokemon/78' },
    );
    const headingElement = screen.getByRole('heading', { name: /game locations of rapidash/i });
    expect(headingElement).toBeInTheDocument();
    const rapidashImages = screen.getAllByRole('img', { name: /rapidash location/i });
    expect(rapidashImages).toHaveLength(2);
    const dragonDenText = screen.queryByText(/johto dragon's den/i);
    expect(dragonDenText).toBeNull();
    const route28Text = screen.getByText(/kanto route 28/i);
    expect(route28Text).toBeInTheDocument();
    const mountSilverText = screen.getByText(/johto mount silver/i);
    expect(mountSilverText).toBeInTheDocument();
    renderWithRouter(
      <App />,
      { route: '/pokemon/65' },
    );
    const imageUrl = 'https://archives.bulbagarden.net/media/upload/4/44/Unova_Accumula_Town_Map.png';
    expect(screen.getByRole('img', { name: /alakazam location/i })).toHaveAttribute('src', imageUrl);
    expect(screen.getByRole('img', { name: /alakazam location/i })).toHaveAttribute('alt', 'Alakazam location');
  });

  test('should display detailed information of the selected Pokémon', () => {
    renderWithRouter(
      <App />,
      { route: '/pokemon/10' },
    );
    const textElement = screen.getByText(/for protection, it releases a horrible stench from the antennae on its head to drive away enemies\./i);
    expect(textElement).toBeInTheDocument();
    const headingElement = screen.getByRole('heading', { name: /summary/i });
    expect(headingElement).toBeInTheDocument();
    const linkElement = screen.queryByRole('link', { name: /more details/i });
    expect(linkElement).toBeNull();
    const headingElement2 = screen.getByRole('heading', { name: /caterpie details/i });
    expect(headingElement2).toBeInTheDocument();
  });
});
