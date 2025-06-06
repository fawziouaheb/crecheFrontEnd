import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreinscriptionStateService } from '../admin-preinscription-service/admin-preinscription-state';
import { ROUTES_ADMIN } from '../../../../constant/router-constant/router-constant';
import { HoraireDto } from '../../../../api-client/model/horaireDto';
import { PreinscriptionDto } from '../../../../api-client/model/preinscriptionDto';

@Component({
  selector: 'app-admin-preinscription-visualisation',
  templateUrl: './admin-preinscription-visualisation.component.html',
  styleUrl: './admin-preinscription-visualisation.component.css',
})
export class AdminPreinscriptionVisualisationComponent implements OnInit {
  preinscription!: PreinscriptionDto;
  joursChoisisArray: string[] = [];
  horairesArray: HoraireDto[] = [];
  public formulesHeures = [
    {
      label: '50 heures et plus',
      value: PreinscriptionDto.NombreHeuresParSemaineEnum.CinquantePlus,
    },
    {
      label: '40 à 49 heures',
      value: PreinscriptionDto.NombreHeuresParSemaineEnum.QuaranteACinquante,
    },
    {
      label: '30 à 39 heures',
      value: PreinscriptionDto.NombreHeuresParSemaineEnum.TrenteAQuarante,
    },
    {
      label: '20 à 29 heures',
      value: PreinscriptionDto.NombreHeuresParSemaineEnum.VingtATrente,
    },
    {
      label: '0 à 19 heures',
      value: PreinscriptionDto.NombreHeuresParSemaineEnum.ZeroADixNeuf,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stateService: PreinscriptionStateService
  ) {}

  ngOnInit(): void {
    this.preinscription = this.stateService.getPreinscription()!;
    if (!this.preinscription) {
      this.router.navigate(['../', ROUTES_ADMIN.PREINSCRITION_LIST], {
        relativeTo: this.route,
      });
    }

    this.joursChoisisArray = this.preinscription.joursChoisis
      ? [...this.preinscription.joursChoisis]
      : [];
    this.horairesArray = this.preinscription.horaires
      ? [...this.preinscription.horaires]
      : [];
  }

  getNombreHeuresLabel(
    value: PreinscriptionDto.NombreHeuresParSemaineEnum | undefined
  ): string {
    if (!value) return 'Non renseigné';

    const formule = this.formulesHeures.find((f) => f.value === value);
    return formule ? formule.label : 'Non renseigné';
  }

  returnToList(): void {
    this.router.navigate(['../', ROUTES_ADMIN.PREINSCRITION_LIST], {
      relativeTo: this.route,
    });
  }
}
