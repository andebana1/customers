import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { get, set, remove } from 'lodash';
import { v4 as uuid } from 'uuid';
import { Observable, of } from 'rxjs';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export abstract class RepositoryService<T> {

  protected readonly abstract modelStorageLabel: string;
  protected readonly abstract isSeededLabel: string;

  constructor(
    protected storageService: StorageService
  ) { }

  public abstract insertSeeds(): void;
  protected needSeed(): boolean {
    const isSeeded = this.storageService.getItem(this.isSeededLabel);
    return !isSeeded;
  }

  public findAll(): Array<T> {
    return this.storageService.getItem(this.modelStorageLabel) as Array<T>;
  }

  public findOneById(id: string): T | undefined {
    return (this.storageService.getItem(this.modelStorageLabel) as Array<T>).find((item: T) => (item as any).id === id);
  }

  public save(model: T) {
    let models: Array<T> = this.findAll();
    if (!get(model, 'id')) {
      set(model as any, 'id', uuid());
      models.unshift(model);
      this.storageService.saveItem({ key: this.modelStorageLabel, data: models });
      return;
    }

    for (let i = 0; i < models.length; i++) {
      if (get(models[i], 'id') === get(model, 'id')) {
        models[i] = model;
        break;
      }
    }

    this.storageService.saveItem({ key: this.modelStorageLabel, data: models });
  }

  public remove(id: string): void {
    const models: Array<T> = this.findAll();
    remove(models, (model: any) => model.id === id);
    this.storageService.saveItem({ key: this.modelStorageLabel, data: models });
  }

}
