import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState, coursesFeatureKey } from "./reducers/course.reducer";

import * as fromCourses from './reducers/course.reducer';
import { Course } from "./model/course";


export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

export const selectBeginerCourses = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.allCoursesLoaded
);
