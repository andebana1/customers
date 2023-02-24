import { Injectable } from '@angular/core';

interface ISaveItems {
  key: string,
  value: any,
}

export interface ISaveItem {
  key?: string,
  data?: any,
  items?: Array<ISaveItems>
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveItem({ key = '', data = {}, items = [] }: ISaveItem): void {
    if (!items.length) {
      localStorage.setItem(key, JSON.stringify(data));
      return;
    }

    items.forEach(item => {
      localStorage.setItem(item.key, JSON.stringify(item.value));
    });
  }

  public getItem(key: string): any {
    const items = localStorage.getItem(key);
    if (!items) return null;

    return JSON.parse(items);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
