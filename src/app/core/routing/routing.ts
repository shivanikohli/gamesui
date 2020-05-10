import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "@core/guards/auth.guard";
import { AfterloginComponent } from "@layouts/afterlogin/afterlogin.component";

const routes: Routes = [
  {
    path: "",
    component: AfterloginComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("@modules/dashboard/dashboard.module").then(
            m => m.DashboardModule
          )
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("@modules/dashboard/dashboard.module").then(
            m => m.DashboardModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
