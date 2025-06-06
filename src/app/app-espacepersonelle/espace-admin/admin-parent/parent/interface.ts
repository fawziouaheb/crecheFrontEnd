export interface ChildDto {
  lastName: string;
  firstName: string;
  date_birth_child: string;
  genre: string;
  formula: string;
  daysOfCare: [];
  observation?: string;
  entryDate: string;
}

export interface FileDto {
  fileName: string;
  filePath: string;
}

export interface ParentDto {
  id?: number;
  lastName: string;
  firstName: string;
  email: string;
  dateBirth: string;
  mobile: string;
  address: string;
  profession: string;
  familySituation: string;

  secondParentLastName: string;
  secondParentFamilySituation: string;
  secondParentProfession: string;
  secondParentFirstName: string;
  secondParentEmail: string;
  secondParentMobile: string;

  structureId: number;
  repositoryId?: number;
  children: ChildDto[];
}
