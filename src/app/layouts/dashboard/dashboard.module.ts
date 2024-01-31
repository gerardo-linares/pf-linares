import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { UsersModule } from './pages/users/users.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent
  ],
  
  imports: [
    CommonModule ,MatSidenavModule,MatButtonModule,MatToolbarModule,MatIconModule, UsersModule,SharedModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
