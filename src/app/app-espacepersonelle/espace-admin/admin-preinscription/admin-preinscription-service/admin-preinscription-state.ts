import { Injectable } from '@angular/core';
import { PreinscriptionDto } from '../../../../api-client/model/preinscriptionDto';

@Injectable({
  providedIn: 'root',
})
export class PreinscriptionStateService {
  private preinscription?: PreinscriptionDto;

  setPreinscription(preinscription: PreinscriptionDto) {
    this.preinscription = preinscription;
  }

  getPreinscription(): PreinscriptionDto | undefined {
    return this.preinscription;
  }

  clear() {
    this.preinscription = undefined;
  }
}
