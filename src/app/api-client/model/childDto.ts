/**
 * OpenAPI definition
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HoraireDto } from './horaireDto';


export interface ChildDto { 
    lastName?: string;
    firstName?: string;
    observation?: string;
    genre?: string;
    date_birth_child?: string;
    entryDate?: string;
    daysOfCare?: Array<string>;
    formula?: string;
    horaires?: Array<HoraireDto>;
}

