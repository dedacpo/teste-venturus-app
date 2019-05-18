import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { Params, ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import {filter} from "rxjs/operators";


interface IBreadcrumb {
  label: string[];
  params: Params;
  url: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public breadcrumbs: IBreadcrumb[];
  
  constructor(
    private usersService:UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    this.breadcrumbs = [];
  }
   

  user: User;
  initials:string;

  

  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      //set breadcrumbs
      let root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
    });
  

    try {
      this.usersService.getMe().subscribe((user) => {
        this.user = user; 
        this.initials= this.usersService.getMyInitials(user.name);
      });

    } catch (error) {
      console.log('==== error ====');
      console.log(error);
    }
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //get the child routes
    let children: ActivatedRoute[] = route.children;

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      //append route URL to URL
      url += `/${routeURL}`;

      //add breadcrumb
      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };      
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
