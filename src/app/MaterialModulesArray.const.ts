import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorIntl } from '@angular/material/paginator';

export const MATERIAL_COMMON_MODULES = [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
];

export function getPersianPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'نمایش در هر صفحه :';
    paginatorIntl.nextPageLabel = 'صفحه بعد';
    paginatorIntl.previousPageLabel = 'صفحه قبل';
    paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length == 0 || pageSize == 0) { return `0 از ${length}`; }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1} - ${endIndex} از ${length}`;
    };

    return paginatorIntl;
}