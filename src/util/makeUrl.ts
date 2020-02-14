export type UrlParams =
  | string[][]
  | Record<string, string>
  | string
  | URLSearchParams;

export interface UrlComponents {
  authority?: string;
  fragment?: UrlParams;
  query?: UrlParams;
  params?: { [key: string]: string };
  path?: string | string[];
  scheme?: string;
}

export function makeUrl(
  { authority, fragment, params, path, query, scheme }: UrlComponents,
  base?: string,
): string {
  let url = '';
  if (scheme && authority) {
    url += scheme + ':';
  }
  if (authority) {
    url += '//' + authority;
  }
  if (path) {
    url += replace(normalisePath(!!authority, path), params);
  }
  if (query) {
    if (typeof query !== 'string') {
      query = new URLSearchParams(query).toString();
    }
    url += '?' + query;
  }
  if (fragment) {
    if (typeof fragment !== 'string') {
      fragment = new URLSearchParams(fragment).toString();
    }
    url += '#' + fragment;
  }
  if (base) {
    return new URL(url, base).toString();
  }
  return url;
}

function normalisePath(
  absolute: boolean,
  ...path: (string | string[])[]
): string {
  const parts = path
    .reduce((a: string[], x) => a.concat(x), [])
    .join('/')
    .split('/');
  const result: string[] = [];

  for (const part of parts) {
    if (part && part !== '.') {
      if (part === '..') {
        if (result.length && result[result.length - 1] !== '..') {
          result.pop();
        } else if (!absolute) {
          result.push('..');
        }
      } else {
        result.push(part);
      }
    }
  }

  const norm = result.join('/');
  return absolute ? '/' + norm : norm;
}

function replace(
  base: string,
  replacements: { [key: string]: string } | undefined,
): string {
  if (!replacements) {
    return base;
  }
  return Object.keys(replacements).reduce(
    (a, x) => a.replace(new RegExp(`${x}(?=\\/|$)`, 'g'), replacements[x]),
    base,
  );
}
