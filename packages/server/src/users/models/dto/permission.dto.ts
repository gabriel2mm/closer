import { Permission } from "../entity/permission.entity";

export type PermissionDto = Permission & {
    _id?: string | null | undefined;
};