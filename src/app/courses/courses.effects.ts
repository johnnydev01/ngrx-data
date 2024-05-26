import { CoursesHttpService } from './services/courses-http.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoursesActions } from "./actions-types";
import { concatMap, map } from 'rxjs/operators';
import { allCoursesLoaded } from './courses.actions';
import { areCoursesLoaded } from './courses.selectors';
import { select } from '@ngrx/store';

@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CoursesActions.loadAllCourses),
        concatMap(action =>
          this.coursesHttpService.findAllCourses()
        ),
        map(courses => allCoursesLoaded({courses}))
      )
);

  saveCourse$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CoursesActions.courseUpdated),
        concatMap(action =>
          this.coursesHttpService.saveCourse(action.update.id, action.update.changes)
        )
      ),
      { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService,
  ) {}

}
