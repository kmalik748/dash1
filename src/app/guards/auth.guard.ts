import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable, of} from "rxjs";
import {AuthService} from "../auth/auth-service.service";
import {catchError, map} from "rxjs/operators";
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild{
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log("Guard");
    return this.authService.decodeToken().pipe(
      map(e => {
        console.log("Data: "+e.data.id);
        this.authService.userName = e.data.first_name;
        if (e) {
          console.log("yes");
          return true;
        } else {
          return false;
        }
      }),
      catchError((err: any) => {
        this.router.navigate(['/auth']);
        return of(false);
      })
    );
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   console.log("guard was called");
  //   // return true;
  //
  //   return this.authService.decodeToken().pipe(
  //     map(e => {
  //       console.log("Data: "+e.data.id);
  //       if (e) {
  //         console.log("yes");
  //         return true;
  //       } else {
  //       return false;
  //       }
  //     }),
  //     catchError((err: any) => {
  //       this.router.navigate(['/auth']);
  //       return of(false);
  //     })
  //   );
  //
  //   // return this.authService.decodeToken().map((data: any)=>{
  //   //   console.log(data);
  //   //   if(data==null || data.data==null || data.data.id==null || !data.data.id){
  //   //     $(document).Toasts('create', {
  //   //       class: 'bg-danger',
  //   //       title: 'Access Error!',
  //   //       subtitle: 'Just Now',
  //   //       body: 'Session Expired. Please login again to continue.'
  //   //     });
  //   //     // this.router.navigate(['/']);
  //   //     console.log("Session Expired");
  //   //     return false;
  //   //   }else{
  //   //     console.log("You can proceed..");
  //   //     return true;
  //   //   }
  //   // });
  //   // return true;
  // }




}
