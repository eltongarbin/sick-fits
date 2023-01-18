import '@testing-library/jest-dom';

jest.mock('next/router', () => require('next-router-mock'));

window.alert = console.log;
