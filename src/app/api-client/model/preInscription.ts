/**
 * OpenAPI definition
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { FrereSoeur } from './frereSoeur';
import { Horaire } from './horaire';
import { ParentPreinscription } from './parentPreinscription';
import { Structure } from './structure';


export interface PreInscription { 
    id?: number;
    enfantNee?: boolean;
    firstName?: string;
    lastName?: string;
    sexe?: PreInscription.SexeEnum;
    dateNaissance?: string;
    dateNaissancePrevue?: string;
    datePrevueEntreeCreche?: string;
    situationFamille?: PreInscription.SituationFamilleEnum;
    gardeEnfant?: PreInscription.GardeEnfantEnum;
    informationsComplementaires?: string;
    freresSoeurs?: Array<FrereSoeur>;
    parents?: Array<ParentPreinscription>;
    joursChoisis?: Set<PreInscription.JoursChoisisEnum>;
    nombreHeuresParSemaine?: PreInscription.NombreHeuresParSemaineEnum;
    horaires?: Set<Horaire>;
    structure?: Structure;
}
export namespace PreInscription {
    export type SexeEnum = 'MASCULIN' | 'FEMININ';
    export const SexeEnum = {
        Masculin: 'MASCULIN' as SexeEnum,
        Feminin: 'FEMININ' as SexeEnum
    };
    export type SituationFamilleEnum = 'MARIE' | 'UNION_LIBRE' | 'PACSE' | 'SEPARE' | 'CELIBATAIRE' | 'VEUF' | 'DIVORCE';
    export const SituationFamilleEnum = {
        Marie: 'MARIE' as SituationFamilleEnum,
        UnionLibre: 'UNION_LIBRE' as SituationFamilleEnum,
        Pacse: 'PACSE' as SituationFamilleEnum,
        Separe: 'SEPARE' as SituationFamilleEnum,
        Celibataire: 'CELIBATAIRE' as SituationFamilleEnum,
        Veuf: 'VEUF' as SituationFamilleEnum,
        Divorce: 'DIVORCE' as SituationFamilleEnum
    };
    export type GardeEnfantEnum = 'MONSIEUR' | 'MADAME' | 'ALTERNEE';
    export const GardeEnfantEnum = {
        Monsieur: 'MONSIEUR' as GardeEnfantEnum,
        Madame: 'MADAME' as GardeEnfantEnum,
        Alternee: 'ALTERNEE' as GardeEnfantEnum
    };
    export type JoursChoisisEnum = 'LUNDI' | 'MARDI' | 'MERCREDI' | 'JEUDI' | 'VENDREDI';
    export const JoursChoisisEnum = {
        Lundi: 'LUNDI' as JoursChoisisEnum,
        Mardi: 'MARDI' as JoursChoisisEnum,
        Mercredi: 'MERCREDI' as JoursChoisisEnum,
        Jeudi: 'JEUDI' as JoursChoisisEnum,
        Vendredi: 'VENDREDI' as JoursChoisisEnum
    };
    export type NombreHeuresParSemaineEnum = 'ZERO_A_DIX_NEUF' | 'VINGT_A_TRENTE' | 'TRENTE_A_QUARANTE' | 'QUARANTE_A_CINQUANTE' | 'CINQUANTE_PLUS';
    export const NombreHeuresParSemaineEnum = {
        ZeroADixNeuf: 'ZERO_A_DIX_NEUF' as NombreHeuresParSemaineEnum,
        VingtATrente: 'VINGT_A_TRENTE' as NombreHeuresParSemaineEnum,
        TrenteAQuarante: 'TRENTE_A_QUARANTE' as NombreHeuresParSemaineEnum,
        QuaranteACinquante: 'QUARANTE_A_CINQUANTE' as NombreHeuresParSemaineEnum,
        CinquantePlus: 'CINQUANTE_PLUS' as NombreHeuresParSemaineEnum
    };
}


