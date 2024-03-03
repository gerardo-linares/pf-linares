import { Component, OnInit } from '@angular/core';
import { BuyersService } from './buyers.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogAddComponent } from './components/dialog-add/dialog-add.component'; 
import { AlertsService } from '../../../../core/services/alerts.service';
import { throwError, Subject } from 'rxjs';
import { Buyer } from './model';
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.scss']
})
export class BuyersComponent implements OnInit {
  buyers: Buyer[] = [];
  buyerForm: FormGroup;
  displayedColumns: string[] = ['id', 'fullName', 'password', 'country', 'email', 'rol', 'comision', 'actions'];
  loading = false;
  isFormInvalid = false;
  private buyerSavedSubject: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private buyersService: BuyersService,
    private dialog: MatDialog,
    private alertsService: AlertsService
  ) {
    this.buyerForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]), 
      lastName: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]),
      password: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]), 
      country: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]),
      email: this.fb.control('', [ Validators.required, Validators.email, Validators.maxLength(25), Validators.minLength(4)]),
      rol: this.fb.control('', [Validators.required]),
      comision:  this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadBuyers();
  }

  loadBuyers(): void {
    this.buyersService.getBuyers().subscribe({
      next: (buyers: Buyer[]) => {
        this.buyers = buyers;
      },
      error: (error: any) => {
        console.error('Error cargando alumnos:', error);
        this.alertsService.showError('Error', 'Ocurrio un error al intentar cargar alumnos.');
      }
    });
  }
  
  onSubmit(): void {
    if (this.buyerForm.invalid) {
      this.isFormInvalid = true;
      this.buyerForm.markAllAsTouched();
    } else {
      this.isFormInvalid = false;
      this.buyerForm.reset();
    }
  }
  
  deleteBuyer(buyer: Buyer): void {
    this.alertsService.showAlert({
      title: '¿Estás seguro?',
      text: 'No podras revertirlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.buyersService.deleteBuyerById(buyer.id).subscribe({
          next: () => {
            this.loadBuyers();
            this.alertsService.showSuccess('Exitoso', 'Alumno borrado correctamente.');
          },
          error: (error: any) => {
            console.error('Error deleting user:', error);
            this.alertsService.showError('Error', 'Ocurrio un error al intentar borrarlo.');
          }
        });
      }
    });
  }

  onModify(buyer: Buyer): void {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      data: buyer,
    });
  
    dialogRef.afterClosed().subscribe((result: Buyer | undefined) => {
      if (result) {
        result.id = buyer.id;
        
        this.buyersService.updateBuyerById(result).subscribe({
          next: () => {
            this.loadBuyers(); 
            this.alertsService.showSuccess('Exitoso', 'Alumno editado correctamente.');
            this.buyers = this.buyers.filter(u => u.id !== buyer.id);
            this.buyers.push(result);
          },
          error: (error: any) => {
            this.alertsService.showError('Error', 'Ocurrio un error al editar a el alumno.');
          }
        });
        dialogRef.componentInstance.onSave();
      }
    });
  }

  onBuyerSubmitted(buyer: Buyer): void {
    this.buyersService.createBuyer(buyer).subscribe({
      next: () => {
        this.loadBuyers();
        this.alertsService.showSuccess('Exitoso', 'Alumno agregado correctamente.'); 
      },
      error: (error: any) => {
        console.error('Error creating buyer:', error);
        this.alertsService.showError('Error', 'Ocurrio un error al crear el alumno.');
      }
    });
  }

  openAddBuyerDialog(): void {
    const dialogRef = this.dialog.open(DialogAddComponent);
  
    dialogRef.componentInstance.buyerAdded.subscribe(() => {
      this.loadBuyers();
    });
  }
  
}
