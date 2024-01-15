import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokémon Card', () => {
  it('should display card with Pokémon information', async () => {
    renderWithRouter(
      <App />,
      { route: '/pokemon/25' },
    );
    const favoritePokemonCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    await userEvent.click(favoritePokemonCheckbox); await userEvent.click(screen.getByRole('link', { name: /home/i }));
    const pokemonTypeElement = screen.getByTestId('pokemon-type');
    expect(pokemonTypeElement.innerHTML).toBe('Electric'); expect(screen.getByText(/average weight: 6.0 kg/i)).toBeInTheDocument();
    const pikachuElement = screen.getByText(/pikachu/i);
    expect(pikachuElement).toBeInTheDocument(); expect(screen.getByRole('img', { name: /pikachu sprite/i })).toBeInTheDocument();
    const pikachuSpriteElement = screen.getByAltText(/pikachu sprite/i);
    expect(pikachuSpriteElement).toBeInTheDocument();
    const pikachuImageElement = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(pikachuImageElement).toBeInTheDocument();
    const img = screen.getByRole('img', { name: /pikachu sprite/i }) as HTMLImageElement;
    expect(img.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Navigation to Pokémon Details', async () => {
    renderWithRouter(
      <App />,
      { route: '/' },
    );
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    const url = screen.getByRole('link', { name: /more details/i });
    await userEvent.click(url);
    expect(window.location.pathname).toBe('/pokemon/25');
    expect(screen.getByText(/pikachu details/i)).toBeInTheDocument();
  });
});
