import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('test to chekck weather the video camera capture button is present', () => {
  render(<App />);

  const element = screen.getByRole("button", {
      name: /capture/i
    });
    expect(element).toBeInTheDocument();
});


test('test to chekck weather the place holders are getting rendered correctly', () => {
  render(<App />);

  const element = screen.getByPlaceholderText('Enter number of ski runs...')

    expect(element).toBeInTheDocument();
});