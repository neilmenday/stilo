import { SystemSyncAdapter } from '../types';
import { StiloAdapter } from './stilo';

const adapters: Record<string, SystemSyncAdapter> = {
  stilo: StiloAdapter,
};

export function getAdapter(name: string): SystemSyncAdapter {
  const adapter = adapters[name];
  if (!adapter) {
    const available = Object.keys(adapters).join(', ');
    throw new Error(
      `Unknown source adapter "${name}". Available adapters: ${available}`
    );
  }
  return adapter;
}

export function listAdapters(): SystemSyncAdapter[] {
  return Object.values(adapters);
}
