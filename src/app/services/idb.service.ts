import { TryCatchStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MyDB, Ratting } from '../interfaces';
import { LogService } from './log.service';

type MyDBKeys = keyof MyDB;

@Injectable({
  providedIn: 'root',
})
export class IdbService {
  version = 1;
  databaseName = 'OQCH-Store';

  dbConnection$!: Observable<IDBPDatabase<MyDB>>;

  connectTOIDB() {
    this.dbConnection$ = from(
      openDB<MyDB>(this.databaseName, this.version, {
        upgrade(db) {
          console.log("IndexedDB upgrade");
          db.createObjectStore("Status", { keyPath: "AppName"});
          db.createObjectStore("Ratting", { keyPath: "idMeal"});
          db.createObjectStore("Favoutire", { keyPath: "idMeal"})
        }
      })
    )
    return this.dbConnection$;
  }

  addItem<T>(target: MyDBKeys, value: Ratting): Observable<Ratting> {
    return this.dbConnection$.pipe(
      map(db => {
        const tx = db.transaction(target, "readwrite");
        tx.objectStore(target)
        .put({...value})
        .then(v => {
          console.log("add", v);
        })
        .catch(err => {
          console.log(err);
        });
        return value;
      })
    );
  }

  getItem<T>(target: MyDBKeys, value: number): Observable<Ratting> {
    return this.dbConnection$.pipe(
      switchMap(db => {
        const tx = db.transaction(target, "readwrite");
        const store = tx.objectStore(target);
        return from(store.get(value));
      }),
      map(data => {
        // if the data doesnt exist in the DB we have to return data to prevent error
        if (data === undefined) {
          return {
            idMeal: value,
            ratting: 0
          }
        } else {
          return data
        }
      })
    );
  }

  getAll<t>(target: MyDBKeys): Observable<Ratting[]> {
    return this.dbConnection$.pipe(
      switchMap(db => {
        const tx = db.transaction(target, "readonly");
        const store = tx.objectStore(target);
        return from(store.getAll())
      })
    )
  }

  constructor(private logService: LogService) {
    this.dbConnection$ = this.connectTOIDB();
  }

  private log(message: string): void {
    this.logService.add(`IDBService: ${message}`);
  }

}
