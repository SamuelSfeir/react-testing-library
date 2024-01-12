import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

beforeEach(() => {
  renderWithRouter(<NotFound />);
});

describe('Teste o componente <NotFound />', () => {
  // Testa se a página contém um heading h2 com o texto "Page requested not found".
  it('Se a página contém um heading h2 com o texto Page requested not found', () => {
    // Obtém o elemento do título usando o atributo `role` e `name`.
    const title = screen.getByRole('heading', {
      name: 'Page requested not found',
      level: 2,
    });
    // Verifica se o título está presente no documento.
    expect(title).toBeInTheDocument();
  });
});
