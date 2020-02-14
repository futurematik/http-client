import { LogFn } from '../util/LogFn';
import { HttpClientMiddleware } from './HttpClientMiddleware';
import { HttpClient } from './HttpClient';
import { HttpClientRequest } from './HttpClientRequest';
import { HttpClientResponse } from './HttpClientResponse';

export interface TraceClientOptions {
  trace?: LogFn;
  traceData?: object;
}

export function traceClient(
  options: LogFn | TraceClientOptions | undefined,
): HttpClientMiddleware {
  if (typeof options === 'function') {
    options = { trace: options };
  }
  const { trace, traceData } = options || {};

  return (client): HttpClient => {
    if (!trace) {
      return client;
    }
    return async (request: HttpClientRequest): Promise<HttpClientResponse> => {
      trace({ msg: `client request`, ...traceData, request });
      try {
        const response = (await client(request)) as HttpClientResponse;
        trace({ msg: `client response`, ...traceData, response });
        return response;
      } catch (err) {
        trace({ msg: `client unhandled error`, ...traceData, err });
        throw err;
      }
    };
  };
}
