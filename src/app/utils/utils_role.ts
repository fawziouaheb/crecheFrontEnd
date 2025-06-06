import { RoleDto } from '../api-client';

/**
 * Vérifie si le rôle OpenAPI correspond à un rôle court (ex: 'ADMIN')
 * @param roleEnum le rôle reçu de l'API (ex: currentUser.role.roleName)
 * @param shortName le rôle court à tester (ex: ROLES.ADMIN)
 */
export function isRole(roleEnum?: string, shortName?: string): boolean {
  if (!roleEnum || !shortName) return false;
  return roleEnum === shortName;
}
