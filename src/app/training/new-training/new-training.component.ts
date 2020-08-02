import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../Exercise';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.shared';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exercisesSubscription: Subscription;
  isLoading = false;
  loadingSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnDestroy(): void {
    if (this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe();
    }

    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }

    // this.loadingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises) => {
        this.exercises = exercises;
        this.isLoading = false;
      }
    );

    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   (load) => {
    //     this.isLoading = load;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    this.trainingService.fetchAvailableExercises();
  }

  getExercises() {
    // this.exercises$ =
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
