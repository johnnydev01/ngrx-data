import { allCoursesLoaded } from '../courses.actions';
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CoursesActions } from "../actions-types";


export const coursesFeatureKey = 'courses';


export interface CoursesState extends EntityState<Course>{
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const initialCousesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialCousesState,
  on(CoursesActions.allCoursesLoaded,
    (state, action) => adapter.setAll(
      action.courses,
      {...state, allCoursesLoaded: true}
    )
  ),
  on(CoursesActions.courseUpdated, (state, action) => adapter.updateOne(action.update, state))
);

export const {selectAll} = adapter.getSelectors();
