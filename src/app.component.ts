
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmployeeListComponent]
})
export class AppComponent {}
