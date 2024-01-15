import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokémon Card', () => {
  // Testa se o card exibe as informações corretas do Pokémon
  it('should display card with Pokémon information', async () => {
    // Renderiza o componente App com uma rota específica ("/pokemon/25")
    renderWithRouter(
      <App />,
      { route: '/pokemon/25' },
    );

    // Obtém a checkbox de Pokémon favorito e clica nela
    const favoritePokemonCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    await userEvent.click(favoritePokemonCheckbox);

    // Clica no link "Home"
    await userEvent.click(screen.getByRole('link', { name: /home/i }));

    // Obtém elementos e verifica se as informações do Pokémon estão corretas
    const pokemonTypeElement = screen.getByTestId('pokemon-type');
    expect(pokemonTypeElement.innerHTML).toBe('Electric');
    expect(screen.getByText(/average weight: 6.0 kg/i)).toBeInTheDocument();
    const pikachuElement = screen.getByText(/pikachu/i);
    expect(pikachuElement).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pikachu sprite/i })).toBeInTheDocument();
    const pikachuSpriteElement = screen.getByAltText(/pikachu sprite/i);
    expect(pikachuSpriteElement).toBeInTheDocument();
    const pikachuImageElement = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(pikachuImageElement).toBeInTheDocument();

    // Obtém a imagem do Pokémon e verifica se a URL da imagem é a esperada
    const img = screen.getByRole('img', { name: /pikachu sprite/i }) as HTMLImageElement;
    expect(img.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  // Testa a navegação para os detalhes do Pokémon a partir da página inicial
  it('Navigation to Pokémon Details', async () => {
    // Renderiza o componente App na página inicial ("/")
    renderWithRouter(
      <App />,
      { route: '/' },
    );

    // Obtém o link "More Details" e verifica se está presente
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    // Clica no link "More Details"
    await userEvent.click(moreDetailsLink);

    // Verifica se a URL da página foi alterada para "/pokemon/25" após a navegação
    expect(window.location.pathname).toBe('/pokemon/25');
    expect(screen.getByText(/pikachu details/i)).toBeInTheDocument();
  });
});
