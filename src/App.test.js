import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import { getPokemonDataList } from './api/pokemonService';
import pokemonList from './mock/pokemon-list.json';

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

test('App 렌더링 시 메인 페이지가 먼저 렌더링 된다.', async () => {
  // Arrange
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  waitFor(() => {
    const mainPage = screen.getByRole('main');
    expect(mainPage).toBeInTheDocument();
  });
  // Act

  // Assert
}, 100000);

test('axios 인스턴스 getPokemonDataList Test', async () => {
  // Arrange
  // Act
  const result = await getPokemonDataList(1, 20);
  // Assert
  expect(result).toEqual(pokemonList);
}, 100000);
