import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule, FormBuilder, ReactiveFormsModule
} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { FireBaseConfig } from '../../environments/firebaseConfig';
import { ToastyModule } from 'ng2-toasty';
import { ProductService } from './services/product.service';



@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFireDatabaseModule,
    ToastyModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule
  ],
  providers: [
    AuthService,
    ProductService,
    FormBuilder
  ]

})

export class SharedModule { }
