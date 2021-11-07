export interface PaginateDto < T > {
    page: number;
    pageSize: number;
    pageCount: number;
    recordCount: number;
    currentPageRecordCount: number;
    data: T[];
}