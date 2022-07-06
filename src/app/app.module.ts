import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { DetailComponent as ProductDetailComponent } from './product/detail/detail.component';
import { ProfileComponent } from './profile/profile.component';
import { FilterComponent } from './shared/filter/filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/highcharts-more.src';
import exporting from 'highcharts/modules/exporting.src';
import { SwiperModule } from 'swiper/angular';
import { HelpComponent } from './profile/help/help.component';
import { StatsComponent } from './stats/stats.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CreateComponent } from './create/create.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionComponent } from './collection/collection.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SettingComponent } from './setting/setting.component';
import { NotificationComponent } from './setting/notification/notification.component';
import { ConstructionComponent } from './construction/construction.component';

import { UsersService } from './services/users.service';
import { NftService } from './services/nft.service';
import { LoginComponent } from './auth/login/login.component';
import { OfferComponent } from './offer/offer.component';
import { CommunityComponent } from './community/community.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './faq/privacy-policy/privacy-policy.component';
import { TermsComponent } from './faq/terms/terms.component';
import { MysteryboxComponent } from './mysterybox/mysterybox.component';
import { DetailComponent as MysteryboxDetailComponent } from './mysterybox/detail/detail.component';
import { Detail2Component } from './product/detail2/detail2.component';
import { Detail3Component } from './product/detail3/detail3.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
    ProfileComponent,
    FilterComponent,
    HelpComponent,
    StatsComponent,
    TransactionComponent,
    CreateComponent,
    CollectionComponent,
    SettingComponent,
    NotificationComponent,
    ConstructionComponent,
    LoginComponent,
    OfferComponent,
    CommunityComponent,
    ContactComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    MysteryboxComponent,
    MysteryboxDetailComponent,
    Detail2Component,
    Detail3Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxSliderModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    SwiperModule,
    AngularMultiSelectModule,
    NgbModule,
    AngularFireModule.initializeApp({
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
    }),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] },
    /// Sentry Logger
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        /// If true, prompt default Sentry crash report form
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    UsersService,
    NftService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
