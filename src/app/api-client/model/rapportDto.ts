/**
 * OpenAPI definition
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Structure } from './structure';


export interface RapportDto { 
    id?: number;
    rapportBody?: string;
    rapportDate?: string;
    rapportDateUpdate?: string;
    structureId?: number;
    structure?: Structure;
    nameEmployes?: Set<string>;
}

