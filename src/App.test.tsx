import { render, screen } from '@testing-library/react';
import App from './App';
import http from './http-common';
import { act } from 'react-dom/test-utils';

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
      return Promise.resolve({ data: {data: []} });
    });
    act(() => {
      render(<App />);
    });
    const linkElements = screen.getAllByText(link_text);
    linkElements.forEach((linkElement) => {
      expect(linkElement).toBeInTheDocument();
    });
  });
});
