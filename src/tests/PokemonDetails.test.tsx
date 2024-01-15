import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do Componente PokemonDetails', () => {
  // Teste para verificar se o usuário pode favoritar/desfavoritar um Pokémon através da página de detalhes
  test('deve permitir que o usuário favorite/desfavorite um Pokémon através da página de detalhes', async () => {
    // Renderiza o App com o router e obtém o objeto de usuário para interação
    const { user } = renderWithRouter(
      <App />,
      { route: '/pokemon/143' },
    );

    // Obtém o elemento de checkbox pelo seu papel
    const checkMark = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkMark).toBeInTheDocument();

    // Clica na checkbox para favoritar o Pokémon
    await user.click(checkMark);
    expect(screen.getByRole('img', { name: /snorlax is marked as favorite/i })).toBeInTheDocument();

    // Clica na checkbox novamente para desfavoritar o Pokémon
    await user.click(checkMark);
    const snorlaxImage = screen.queryByRole('img', { name: /snorlax is marked as favorite/i });
    expect(snorlaxImage).toBeNull();

    // Verifica se o texto indicando o status de favorito ainda está presente
    const favoritePokemonText = screen.getByText(/pokémon favoritado\?/i);
    expect(favoritePokemonText).toBeInTheDocument();
  });

  // Teste para verificar se a seção com mapas de localização do Pokémon é exibida
  test('deve exibir uma seção com mapas de localização do Pokémon', () => {
    // Renderiza o App com o router e define a rota para um Pokémon específico
    renderWithRouter(
      <App />,
      { route: '/pokemon/78' },
    );

    // Verifica se o elemento de título e as imagens relacionadas às localizações do Pokémon estão presentes
    const headingElement = screen.getByRole('heading', { name: /game locations of rapidash/i });
    expect(headingElement).toBeInTheDocument();
    const rapidashImages = screen.getAllByRole('img', { name: /rapidash location/i });
    expect(rapidashImages).toHaveLength(2);

    // Verifica se um texto específico relacionado às localizações está ausente ou presente
    const dragonDenText = screen.queryByText(/johto dragon's den/i);
    expect(dragonDenText).toBeNull();
    const route28Text = screen.getByText(/kanto route 28/i);
    expect(route28Text).toBeInTheDocument();
    const mountSilverText = screen.getByText(/johto mount silver/i);
    expect(mountSilverText).toBeInTheDocument();

    // Renderiza o App com o router para um Pokémon diferente e verifica os atributos da imagem
    renderWithRouter(
      <App />,
      { route: '/pokemon/65' },
    );
    const imageUrl = 'https://archives.bulbagarden.net/media/upload/4/44/Unova_Accumula_Town_Map.png';
    expect(screen.getByRole('img', { name: /alakazam location/i })).toHaveAttribute('src', imageUrl);
    expect(screen.getByRole('img', { name: /alakazam location/i })).toHaveAttribute('alt', 'Alakazam location');
  });

  // Teste para verificar se as informações detalhadas do Pokémon selecionado são exibidas
  test('deve exibir informações detalhadas do Pokémon selecionado', () => {
    // Renderiza o App com o router e define a rota para um Pokémon específico
    renderWithRouter(
      <App />,
      { route: '/pokemon/10' },
    );

    // Verifica se o texto específico, o título e os elementos de link estão presentes ou ausentes
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
