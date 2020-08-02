import { TrainingRouteModule } from './training-route.module';
import { SharedModule } from './../shared/shared.module';
import { PastTrainingComponent } from './past-training/PastTrainingComponent';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    TrainingRouteModule
  ],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
