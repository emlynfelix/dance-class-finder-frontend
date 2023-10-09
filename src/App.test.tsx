import { render, screen } from '@testing-library/react';
import App from './App';
import http from './http-common';

jest.mock('./http-common');
const mockedHttp = jest.mocked(http, true);

describe('Testing App links', () => {
  test.each([
    ['Dance Classes'],
    ['Locations'],
    ['Teachers'],
    ['Styles'],
  ])('link exists in the document', (link_text: string) => {
    mockedHttp.get.mockImplementation(() => {
      return Promise.resolve({ data: [] });
    });
    render(<App />);
    const linkElement = screen.getByText(link_text);
    expect(linkElement).toBeInTheDocument();
  });
});
