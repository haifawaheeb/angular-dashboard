import { EducationStage } from './education-stage.model';


export interface Grade {
  id: string;
  name_ar: string;
  name_en?: string;
  level_order: number;
  stage?: EducationStage;
  stage_id?: string;
}
