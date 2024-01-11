import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

// Executa a função beforeEach para renderizar o componente 'About' antes de cada teste.
beforeEach(() => {
  renderWithRouter(<About />);
});
describe('Teste se a página contém as informações sobre a Pokédex;', () => {
  // Testa se a página contém o título 'About Pokédex'.
  it('Se contém o Título About Pokédex', () => {
    const title = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(title).toBeInTheDocument();
  });

  // Testa se a página contém o primeiro texto de descrição.
  it('Se contém texto de descrição 1', () => {
    const description = screen.getByText('This application', { exact: false });
    expect(description).toBeInTheDocument();
  });

  // Testa se a página contém o segundo texto de descrição.
  it('Se contém texto de descrição 2', () => {
    const description = screen.getByText('One can filter', { exact: false });
    expect(description).toBeInTheDocument();
  });

  // Testa se a página contém uma imagem específica da Pokédex com o atributo 'src' e 'alt' corretos.
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const link = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', link);
    expect(img).toHaveAttribute('alt', 'Pokédex');
  });
});
