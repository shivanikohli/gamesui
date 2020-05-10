import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "@core/interceptors/token.interceptor";
import { AuthGuard } from "@core/guards/auth.guard";
import { BeforeloginComponent } from "@layouts/beforelogin/beforelogin.component";
import { AfterloginComponent } from "@layouts/afterlogin/afterlogin.component";
import { HeaderComponent } from "@layouts/header/header.component";
import { FooterComponent } from "@layouts/footer/footer.component";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@material/material.module";
import { MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  imports: [HttpClientModule, RouterModule, FlexLayoutModule, MaterialModule],
  declarations: [
    BeforeloginComponent,
    AfterloginComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' }
    }
  ]
})
export class CoreModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl("assets/mdi.svg")
    );
  }
}