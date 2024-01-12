import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokedex ', () => {
  it('Deve mostrar próximo pokemon e resetar', async () => {
    const { user } = renderWithRouter(<App />);

    // Obtém o elemento do Pokemon pelo atributo de teste
    let nomeDoPokemon2 = screen.getByTestId(nomeDoPokemon);

    // Verifica se o nome do Pokemon inicial é 'Pikachu'
    expect(nomeDoPokemon2.innerHTML).toBe('Pikachu');

    // Obtém o botão "Próximo Pokémon" e simula um clique do usuário
    const button = screen.getByText('Próximo Pokémon');
    await user.click(button);

    // Obtém novamente o elemento do Pokemon e verifica se agora é 'Charmander'
    nomeDoPokemon2 = screen.getByTestId(nomeDoPokemon);
    expect(nomeDoPokemon2.innerHTML).toBe('Charmander');
  });

  it('Testa se tem o filtro de todos os tipos', async () => {
    const { user } = renderWithRouter(<App />);

    // Array contendo os tipos esperados obtidos pelo data.ts
    const tiposDePokemon = ['Dragon', 'Normal', 'Bug', 'Electric', 'Poison', 'Fire', 'Psychic'];

    // Obtém todos os botões de tipo
    const botaoTipos = screen.getAllByTestId('pokemon-type-button');

    // Verifica se cada botão de tipo possui um texto que corresponde aos tipos esperados
    botaoTipos.forEach((btn) => {
      expect(tiposDePokemon).toContain(btn.innerHTML);
    });

    // Obtém o botão "All"
    const todosBtn = screen.getByText('All');

    // Simula um clique no terceiro botão de tipo e verifica se o Pokemon exibido é 'Caterpie'
    await user.click(botaoTipos[2]);
    let nomeDoPokemon2 = screen.getByTestId(nomeDoPokemon);
    expect(nomeDoPokemon2.innerHTML).toBe('Caterpie');

    // Simula um clique no botão "All" e verifica se o Pokemon exibido volta a ser 'Pikachu'
    await user.click(todosBtn);
    nomeDoPokemon2 = screen.getByTestId(nomeDoPokemon);
    expect(nomeDoPokemon2.innerHTML).toBe('Pikachu');
  });

  // Constante para o atributo de teste do nome do Pokemon
  const nomeDoPokemon = 'pokemon-name';

  it('Testar h2 com Encountered Pokémon', () => {
    // Renderiza o componente App
    renderWithRouter(<App />);

    // Verifica se o elemento H2 contendo 'Encountered Pokémon' está presente no documento
    const textoH2 = screen.getByText('Encountered Pokémon');
    expect(textoH2).toBeInTheDocument();
  });
});
