import { setServers } from 'node:dns';

import { env } from './env';

/**
 * Alguns resolvedores DNS locais recusam consultas SRV usadas pelo
 * `mongodb+srv://`. Quando DNS_SERVERS está definido, o Node passa a
 * usar esses servidores para resolver o cluster.
 */
export function configureDns(): void {
  if (env.dnsServers.length > 0) {
    setServers(env.dnsServers);
  }
}
