import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.useFakeTimers();
jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockClient = {
      get: jest.fn().mockResolvedValueOnce({ data: 'test' }),
    };
    (axios.create as jest.Mock).mockReturnValueOnce(mockClient);
    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockClient = {
      get: jest.fn().mockResolvedValueOnce({ data: 'test' }),
    };
    (axios.create as jest.Mock).mockReturnValueOnce(mockClient);
    await throttledGetDataFromApi('/posts');
    await jest.advanceTimersByTimeAsync(5500);

    expect(mockClient.get).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const mockClient = {
      get: jest.fn().mockResolvedValueOnce({ data: 'test' }),
    };
    (axios.create as jest.Mock).mockReturnValueOnce(mockClient);
    const result = await throttledGetDataFromApi('/posts');

    expect(result).toEqual('test');
  });
});
