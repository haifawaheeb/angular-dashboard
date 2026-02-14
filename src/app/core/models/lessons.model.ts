export interface Lesson {
  id: string;
  course_id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  lesson_type: string;
  sign_media_id: string | null;
  order_index: number;
  is_published: boolean;
  created_at: string;
}
