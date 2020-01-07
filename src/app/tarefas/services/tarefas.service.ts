import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Tarefa } from '../models/tarefas.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TarefasService extends Firestore<Tarefa> {

  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
   }

   private init(): void {
     this.authService.authState$.subscribe(user => {
       if (user) {
         this.setCollection(`/users/${user.uid}/tarefas`, ref =>
          ref.orderBy('done', 'asc').orderBy('title', 'asc')
          );
         return;
       }
       this.setCollection(null);
     });
   }

}
