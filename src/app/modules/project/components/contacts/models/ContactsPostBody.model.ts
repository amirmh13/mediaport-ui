export class ContactsPostBody {
    projectId ? : number;
    listId: number | null = null;
    searchKeyword: string = '';
    pageSize: number = 10;
    page: number = 1;
}