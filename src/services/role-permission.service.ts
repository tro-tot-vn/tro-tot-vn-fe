class RolePermissionService {
  private rolePermissions: Record<string, string[]>;
  constructor() {
    this.rolePermissions = {};
  }
  async getRolePermissions() {
    // get all role permissions from server
  }
  getRolePermission(permissionName: string) {
    if (this.rolePermissions[permissionName]) {
      return true;
    }
    return false;
  }
}
export default new RolePermissionService();
