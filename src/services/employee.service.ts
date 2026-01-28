
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private mockEmployees: Employee[] = [
    { id: 1, name: 'Juan', lastName: 'Pérez', salary: 75000, department: 'Ingeniería' },
    { id: 2, name: 'Ana', lastName: 'García', salary: 65000, department: 'Marketing' },
    { id: 3, name: 'Pedro', lastName: 'Martínez', salary: 110000, department: 'Ventas' },
    { id: 4, name: 'María', lastName: 'Rodríguez', salary: 95000, department: 'TI' },
    { id: 5, name: 'David', lastName: 'López', salary: 82000, department: 'Ingeniería' },
    { id: 6, name: 'Susana', lastName: 'Hernández', salary: 58000, department: 'Recursos Humanos' },
    { id: 7, name: 'Miguel', lastName: 'González', salary: 120000, department: 'TI' },
    { id: 8, name: 'Linda', lastName: 'Sánchez', salary: 72000, department: 'Marketing' },
    { id: 9, name: 'Roberto', lastName: 'Ramírez', salary: 130000, department: 'Ventas' },
    { id: 10, name: 'Patricia', lastName: 'Torres', salary: 98000, department: 'Ingeniería' },
  ];

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    // Simular un retraso de red
    const callDelay = 1500;

    // Simular una posibilidad de error
    if (Math.random() > 0.9) {
      return throwError(() => new Error('Error al cargar los empleados debido a un problema de red.')).pipe(delay(callDelay));
    }

    return of(this.mockEmployees).pipe(delay(callDelay));
  }
}
