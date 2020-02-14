import 'jest';
import { HttpClientRequest } from './HttpClientRequest';
import { HttpClientResponse } from './HttpClientResponse';
import { makeHttpClient } from './makeHttpClient';
import { jsonClient } from './jsonClient';

describe('jsonClient', () => {
  it('adds content-type headers where not specified', async () => {
    const clientMock = jest.fn(
      async (req: HttpClientRequest): Promise<HttpClientResponse> => {
        return {
          status: 200,
          body: JSON.stringify({ hello: 'world' }) as any,
          headers: { 'content-type': 'application/json' },
        };
      },
    );

    const client = makeHttpClient(clientMock as any, [jsonClient()]);

    const response = await client({
      url: 'http://example.com/',
      body: { answer: 42 },
    });

    expect(response).toEqual({
      status: 200,
      body: { hello: 'world' },
      headers: { 'content-type': 'application/json' },
    });
    expect(clientMock).toHaveBeenCalledTimes(1);

    expect(clientMock.mock.calls[0][0]).toEqual({
      url: 'http://example.com/',
      body: JSON.stringify({ answer: 42 }),
      headers: { 'content-type': 'application/json' },
    });
  });
});
