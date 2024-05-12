import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import pokemonOneResult from './mock/pokemon-1-result.json';
import { getPokemonNameList, getPokemonDataList, findPokemonByNumber, findPokemonSpice } from './api/pokemonService';
import MainPage from './pages/MainPage';

jest.mock('axios');
jest.mock('./api/axios');
jest.mock('./api/pokemonService');
jest.mock('./pages/MainPage');

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

test('App 렌더링 시 메인 페이지가 먼저 렌더링 된다.', () => {
  // Arrange
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  waitFor(() => {
    MainPage.getPokemonNameListInit();
    MainPage.getPokemonDataListInit();
    const mainPage = screen.getByRole('main');
    expect(mainPage).toBeInTheDocument();
  });
  // Act

  // Assert
});

test('메인 페이지가 처음 로딩 시 1~20번의 포켓몬 아이콘이 배치되어 있다.', async () => {
  // Act
  render(<MainPage />);
  waitFor(() => {
    MainPage.getPokemonNameListInit();
    MainPage.getPokemonDataListInit();
    const pokemonIcons = screen.getAllByTitle(/pokemon-icon/i);
    expect(pokemonIcons).toHaveLength(20);
  });
  // Assert
});

test('메인 페이지가 처음 로딩 시 1~20번의 포켓몬 아이콘에 이름이 표시된다.', async () => {
  // Act
  render(<MainPage />);
  waitFor(() => {
    MainPage.getPokemonNameListInit();
    MainPage.getPokemonDataListInit();
    const pokemonNames = screen.getAllByRole('heading');
    expect(pokemonNames).toHaveLength(20);
  });
  // Assert
});

test('카드 형태의 아이콘 1번은 이상해씨라는 이름을 가지고 있고 풀 포켓몬이다', async () => {
  // Act
  render(<MainPage />);
  waitFor(() => {
    MainPage.getPokemonNameListInit();
    MainPage.getPokemonDataListInit();
    const pokemonCard = screen.getByTitle(/pokemon-icon-1/i);
    const pokemonName = screen.getByText(/이상해씨/i);
    const pokemonType = screen.getByText(/풀 포켓몬/i);
    expect(pokemonCard).toBeInTheDocument();
    expect(pokemonCard).toHaveStyle('background-color: #78C850');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
  });
  // Assert
});

test('1번 포켓몬 아이콘을 클릭하면 1번 포켓몬 상세 페이지로 이동한다.', async () => {
  // Act
  render(<MainPage />);
  waitFor(() => {
    MainPage.getPokemonNameListInit();
    MainPage.getPokemonDataListInit();
    const pokemonIcon = screen.getByTitle(/pokemon-icon-1/i);
    fireEvent.click(pokemonIcon);
  });
  // Assert
  const pokemonDetail = screen.getByTestId('pokemon-detail');
  expect(pokemonDetail).toBeInTheDocument();
});

test('axios 인스턴스 pokemonService findPokemonSpice Test', async () => {
  // Arrange
  waitFor(() => {
    const result = findPokemonSpice(1);

    expect(result).toEqual({
      id: 1,
      name: 'bulbasaur',
      koreanName: '이상해씨',
      koreanFlavorText: '태어나서부터 얼마 동안은 등의 씨앗으로부터 영양을 공급받아 크게 성장한다.',
    });
  });
});

test('axios 인스턴스 pokemonService findPokemonByNumber Test', async () => {
  // Arrange
  // Act
  waitFor(() => {
    const result = findPokemonByNumber(1);
    // Assert
    expect(result).toEqual(pokemonOneResult);
  });
});

test('axios 인스턴스 getPokemonNameList Test', async () => {
  // Arrange
  // Act
  waitFor(() => {
    const result = getPokemonNameList(1, 20);
    // Assert
    expect(result).toEqual(pokemonNameList);
  });
});

test('axios 인스턴스 getPokemonDataList Test', async () => {
  // Arrange
  // Act
  waitFor(() => {
    const result = getPokemonDataList(1, 20);
    // Assert
    expect(result).toEqual(pokemonDataList);
  });
});
