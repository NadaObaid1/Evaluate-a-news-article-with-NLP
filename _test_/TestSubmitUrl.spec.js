import { submitArticle } from '../src/client/js/submitUrl';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('catches and logs errors', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'));
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  await expect(submitArticle('http://example.com', 'http://server.url')).rejects.toThrow('Network error');
  expect(consoleError).toHaveBeenCalledWith('Error:', new Error('Network error'));

  consoleError.mockRestore();
});