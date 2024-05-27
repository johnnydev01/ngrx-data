import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CourseEntityService } from "./courses-entity.service";
import { filter, first, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";


@Injectable()
export class CourseResolver implements Resolve<boolean> {

  constructor(private coursesService: CourseEntityService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.coursesService.loaded$
     .pipe(
        tap(loaded => {
          if (!loaded) {
            this.coursesService.getAll();
          }
          return loaded;
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
