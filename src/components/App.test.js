import { render, screen } from '@testing-library/react';
import App from './App';

describe('Note Tests', () => {
  it("Should render Hello World!", async () => {
    render(<App/>)
    expect(screen.getByText(`Hello World!`)).toBeInTheDocument()
  });
});
