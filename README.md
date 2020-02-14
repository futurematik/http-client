# http-client

A collection of types and utility functions to enhance the fetch API.

## Documentation

### Basic interface

```typescript
interface HttpClient {
  (request: HttpClientRequest): Promise<HttpClientResponse>;
}

interface HttpClientRequest {
  url: string;
  method?: string;
  headers?: HttpValueCollection;
  body?: unknown;
}

interface HttpClientResponse {
  status: number;
  headers: HttpValueCollection;
  body?: unknown;
}
```

### Client composition

Compose a client with middleware to create a new, enhanced client.

```typescript
const client = makeHttpClient(makeFetchClient(fetch), [
  jsonClient(),
  traceClient(console.log),
]);
```

The middleware interface is as follows:

```typescript
interface HttpClientMiddleware {
  (client: HttpClient): HttpClient;
}
```
