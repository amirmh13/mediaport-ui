export interface ContactsListDto {
    id: number;
    name: string;
    contactCounts: number;
    children: ContactsListDto[];
}