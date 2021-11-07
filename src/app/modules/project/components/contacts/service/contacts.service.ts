import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginateDto } from '@shared/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddContactToListPostBody, AddContactToProjectPostBody, ContactDto, ContactsListDto, ContactsListPostBody, ContactsPostBody } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private _http: HttpClient,
  ) { }

  getListOfContacts(body: ContactsPostBody): Observable<PaginateDto<ContactDto>> {
    return this._http.post<PaginateDto<ContactDto>>(`${environment.apiBaseUrl}/v1/Project/Contacts/GetListOfContacts`, body)
  }

  getListOfContactLists(projectId: number): Observable<ContactsListDto[]> {
    return this._http.get<ContactsListDto[]>(`${environment.apiBaseUrl}/v1/Project/Contacts/GetListOfContactLists`, { params: { projectId } })
  }

  addContactList(body: ContactsListPostBody): Observable<{ id: number; name: string; }> {
    return this._http.post<{ id: number; name: string; }>(`${environment.apiBaseUrl}/v1/Project/Contacts/AddContactList`, body)
  }

  addContactToContactList(body: AddContactToListPostBody): Observable<number> {
    return this._http.post<number>(`${environment.apiBaseUrl}/v1/Project/Contacts/AddContactToContactList`, body)
  }

  addContactToProject(body: AddContactToProjectPostBody): Observable<number> {
    return this._http.post<number>(`${environment.apiBaseUrl}/v1/Project/Contacts/AddContactToProject`, body)
  }

  removeContactFromList(projectContactId: number, projectContactListId: number): Observable<number> {
    return this._http.post<number>(`${environment.apiBaseUrl}/v1/Project/Contacts/RemoveContactFromList`, {}, { params: { projectContactId, projectContactListId } })
  }

  removeContactFromProject(projectContactId: number): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/Contacts/RemoveContactFromProject`, {}, { params: { projectContactId } })
  }
}