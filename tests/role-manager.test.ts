import { describe, it, expect } from 'vitest';
import { roleManager, UserRole } from '../src/services/role-manager';

describe('Role Manager Module', () => {

    it('does NOT contain the doctor role anymore', () => {
        // We check that the type/role list does not allow 'doctor'
        // At runtime, if we query doctor permissions, it should return false
        // Since 'doctor' is removed from the type, casting it to any to verify function behavior
        expect(roleManager.hasPermission('doctor' as any, 'view_medical_records')).toBe(false);
    });

    it('nutritionist can view and edit user assessments', () => {
        expect(roleManager.hasPermission('nutritionist', 'canViewPatients')).toBe(true);
        expect(roleManager.hasPermission('nutritionist', 'canCreateMealPlans')).toBe(true);
        expect(roleManager.hasPermission('nutritionist', 'canManageUsers')).toBe(false);
    });

    it('admin has higher or equal role to nutritionist and user', () => {
        expect(roleManager.hasHigherOrEqualRole('admin', 'nutritionist')).toBe(true);
        expect(roleManager.hasHigherOrEqualRole('admin', 'user')).toBe(true);
    });

    it('user does NOT have higher or equal role to nutritionist', () => {
        expect(roleManager.hasHigherOrEqualRole('user', 'nutritionist')).toBe(false);
        expect(roleManager.hasHigherOrEqualRole('user', 'admin')).toBe(false);
    });

    it('nutritionist has higher or equal role to user', () => {
        expect(roleManager.hasHigherOrEqualRole('nutritionist', 'user')).toBe(true);
    });
});
