import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import { pokemonInstance } from './api/axios';
import { findPokemonByNumber, findPokemonSpice } from './api/pokemonService';
import pokemonSpices from './mock/pokemon-spices-1.json';
import pokemonData from './mock/pokemon-1.json';

test('App 컴포넌트가 불러와지면, 네비게이션바가 출력된다.', () => {
  // Arrange

  // Act
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // Assert
  const nav = screen.getByTestId('test-nav');
  expect(nav).toBeInTheDocument();
});

test('App 컴포넌트가 불러와지면, 레이아웃이 출력된다.', () => {
  // Arrange

  // Act
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // Assert
  const layout = screen.getByTestId('test-layout');
  expect(layout).toBeInTheDocument();
});

test('네비게이션 바 안에는 홈 버튼이 있다.', () => {
  // Arrange
  // Act
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // Assert
  const homeButton = screen.getByRole('img', { name: /포켓몬 로고/i });
  expect(homeButton).toBeInTheDocument();
});

test('네비게이션 바 안에는 로그인 하지 않았을 시 로그인 버튼이 있다.', () => {
  // Arrange
  // Act
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // Assert
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});

test('네비게이션 바의 로그인 버튼을 클릭하면 handleLoginButton 함수가 실행된다.', () => {
  // Arrange
  // Act
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // Assert
  const loginButton = screen.getByRole('button', { name: /Login/i });
  expect(loginButton).toBeInTheDocument();
  fireEvent.click(loginButton);
});

test('네비게이션 바 안에는 로그인 했을 시 로그인 버튼 대신 로그인한 유저의 아바타가 있다.', () => {
  // Arrange
  localStorage.setItem('loginInfo', JSON.stringify({ email: 'test@test.test' }));
  // Act
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // Assert
  const avatar = screen.getByRole('img', { name: /avatar/i });
  expect(avatar).toBeInTheDocument();
});

test('axios 인스턴스 pokemonService findPokemonSpice Test', async () => {
  // Arrange
  const spyGet = jest.spyOn(pokemonInstance, 'get').mockImplementation(() => Promise.resolve({ data: pokemonSpices }));
  const pokemonNumber = 1;
  // Act
  await findPokemonSpice(pokemonNumber);
  // Assert
  expect(spyGet).toHaveBeenCalledTimes(1);
  expect(spyGet).toHaveBeenCalledWith(`/pokemon-species/${pokemonNumber}`);
  spyGet.mockClear();
});

test('axios 인스턴스 pokemonService findPokemonByNumber Test', async () => {
  // Arrange
  const spyGet = jest.spyOn(pokemonInstance, 'get').mockImplementation(() => Promise.resolve({
    data: pokemonData,
  }));
  const pokemonNumber = 1;
  // Act
  await findPokemonByNumber(pokemonNumber);
  // Assert
  expect(spyGet).toHaveBeenCalledTimes(1);
  expect(spyGet).toHaveBeenCalledWith(`/pokemon/${pokemonNumber}`);
  spyGet.mockClear();
});
