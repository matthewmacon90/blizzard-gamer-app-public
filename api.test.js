import axios from 'axios';
import Api from './api';

jest.mock('axios');

describe('Api', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('makes a GET request with the correct parameters', async () => {
    const endpoint = 'test';
    const data = { test: 'data' };
    const method = 'get';
    const token = 'test-token';
    Api.token = token;

    const response = { data: { test: 'response' } };
    axios.mockResolvedValue(response);

    const result = await Api.request(endpoint, data, method);

    expect(axios).toHaveBeenCalledWith({
      url: `http://localhost:3001/${endpoint}`,
      method,
      data: {},
      params: data,
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(result).toEqual(response.data);
  });

  // Add similar tests for other methods (POST, PUT, DELETE, etc.)

  it('throws an error when the request fails', async () => {
    const endpoint = 'test';
    const data = { test: 'data' };
    const method = 'get';
    const token = 'test-token';
    Api.token = token;

    const error = { response: { data: { error: 'Test error' } } };
    axios.mockRejectedValue(error);

    await expect(Api.request(endpoint, data, method)).rejects.toThrow('Test error');
  });

  // Add tests for verifyToken and other methods as needed
});