import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RootComponent } from './root/root.component';
import { NewComponent } from './users/new/new.component';
import { HomeComponent } from 'src/app/home/home.component';

const routes: Routes = [
  { path: "",
  component: HomeComponent },
  {
    path: "",
    component: RootComponent,
    children: [
      {
        path: "users",
        component: UsersComponent,
        data: {
          breadcrumb: "Users"
        },
        
      },
      {
        path: "users",
        data: {
          breadcrumb: "Users"
        },
        children:[
          {
            path: "new",
            component: NewComponent,
            data: {
              breadcrumb: "New"
            }
          }
        ]
      }
    ]
  },
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
