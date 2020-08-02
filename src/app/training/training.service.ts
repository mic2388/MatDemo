import { Subject, Observable, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Exercise } from './Exercise';
import { state } from '@angular/animations';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.shared';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  availableExercises: Exercise[] = [];
  finishedExercises: Exercise[] = [];
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  fbSubs: Subscription[] = [];
  private runningExercise: Exercise;

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  fetchAvailableExercises() {
    // this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            // throw new Error();
            return docArray.map((doc) => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.get('name'),
                duration: doc.payload.doc.get('duration'),
                calories: doc.payload.doc.get('calories'),
              };
            });
          })
        )
        .subscribe(
          (t) => {
            //  this.uiService.loadingStateChanged.next(false);
            this.availableExercises = t;
            console.log(this.availableExercises, 'here');
            this.exercisesChanged.next(this.availableExercises.slice());
          },
          (error) => {
            this.uiService.showSnackBar('Fetch exercise, failed ', null, 3000);
          }
        )
    );
  }

  getAvailableExercises() {
    // creates a new array
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (tag) => tag.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToFireDb({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToFireDb({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .pipe(
          map((exArray: Exercise[]) => {
            return exArray.map((exArrayItem: Exercise) => {
              return {
                id: '2',
                date: exArrayItem.date,
                name: exArrayItem.name,
                duration: exArrayItem.duration,
                calories: exArrayItem.calories,
                state: exArrayItem.state,
              };
            });
          })
        )
        .subscribe((response) => {
          console.log(response);
          this.finishedExercises = response;
          this.finishedExercisesChanged.next(response);
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((t) => t.unsubscribe());
  }

  private addDataToFireDb(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
