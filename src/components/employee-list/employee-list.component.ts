
import { Component, ChangeDetectionStrategy, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  // --- Señales de Estado ---
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  
  private employees = signal<Employee[]>([]);
  searchTerm = signal<string>('');
  selectedDepartment = signal<string>('all');
  
  // --- Señales Computadas (Derivadas) ---
  departments = computed<string[]>(() => 
    ['all', ...new Set(this.employees().map(e => e.department))]
  );

  filteredEmployees = computed<Employee[]>(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const department = this.selectedDepartment();
    
    return this.employees().filter(employee => {
      const matchesSearchTerm = 
        employee.name.toLowerCase().includes(term) || 
        employee.lastName.toLowerCase().includes(term);
        
      const matchesDepartment = 
        department === 'all' || employee.department === department;
        
      return matchesSearchTerm && matchesDepartment;
    });
  });

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.employeeService.getEmployees().pipe(
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (data) => this.employees.set(data),
      error: (err) => this.error.set(err.message || 'Ocurrió un error desconocido.'),
    });
  }
  
  formatSalary(salary: number): string {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(salary);
  }
}
