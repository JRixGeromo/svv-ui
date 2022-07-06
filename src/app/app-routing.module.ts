import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { DetailComponent as ProductDetailComponent } from './product/detail/detail.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './profile/help/help.component';
import { StatsComponent } from './stats/stats.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CreateComponent } from './create/create.component';
import { CollectionComponent } from './collection/collection.component';
import { SettingComponent } from './setting/setting.component';
import { NotificationComponent } from './setting/notification/notification.component';
import { ConstructionComponent } from './construction/construction.component';
import { LoginComponent } from './auth/login/login.component';
import { CommunityComponent } from './community/community.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './faq/privacy-policy/privacy-policy.component';
import { TermsComponent } from './faq/terms/terms.component';
import { MysteryboxComponent } from './mysterybox/mysterybox.component';
import { DetailComponent as MysteryboxDetailComponent } from './mysterybox/detail/detail.component';
import { Detail2Component } from './product/detail2/detail2.component';
import { Detail3Component } from './product/detail3/detail3.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'product', component: ProductComponent },
    { path: 'product/detail/:key', component: ProductDetailComponent },
    { path: 'product/detail2', component: Detail2Component },
    { path: 'product/detail3', component: Detail3Component },
    { path: 'profile', component: ProfileComponent },
    { path: 'profile/HELP-university', component: HelpComponent },
    { path: 'stats', component: StatsComponent },
    { path: 'transaction', component: TransactionComponent },
    { path: 'create', component: CreateComponent },
    { path: 'collection/:name', component: CollectionComponent },
    { path: 'support', component: SettingComponent },
    { path: 'notification', component: NotificationComponent },
    { path: 'construction', component: ConstructionComponent },
    { path: 'login', component: LoginComponent },
    { path: 'community', component: CommunityComponent },
    { path: 'contact-us', component: ContactComponent },
    { path: 'faq/privacy-policy', component: PrivacyPolicyComponent },
    { path: 'faq/terms-of-use', component: TermsComponent },
    { path: 'mystery-box', component: MysteryboxComponent },
    { path: 'mystery-box/detail', component: MysteryboxDetailComponent },
    { path: '**', redirectTo: 'home' },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
