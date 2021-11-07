export interface AddContactToProjectPostBody {
    projectId: number;
    producerOrganizationContactId: number;
    contactRoleId: number | null;
}