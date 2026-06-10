const BASE = 'https://api.figma.com/v1';

function getToken(): string {
  const token = process.env.FIGMA_TOKEN;
  if (!token) throw new Error('FIGMA_TOKEN environment variable is not set.');
  return token;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const { default: fetch } = await import('node-fetch');
  const url = `${BASE}${path}`;
  const headers: Record<string, string> = {
    'X-Figma-Token': getToken(),
    'Content-Type': 'application/json',
  };
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Figma API ${method} ${path} failed ${res.status}: ${text}`);
  return JSON.parse(text) as T;
}

export const figma = {
  get:  <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body: unknown) => request<T>('POST', path, body),

  getFile: (fileKey: string) =>
    figma.get<{ document: { children: unknown[] }, name: string }>(`/files/${fileKey}`),

  getFileNodes: (fileKey: string, nodeIds: string[]) =>
    figma.get<{ nodes: Record<string, { document: unknown }> }>(
      `/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeIds.join(','))}`
    ),

  postVariables: (fileKey: string, body: unknown) =>
    figma.post(`/files/${fileKey}/variables`, body),

  createFile: (name: string) =>
    figma.post<{ key: string; name: string }>('/files', { name }),
};

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
