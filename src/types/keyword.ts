import { Student } from "./student";

export interface KeywordWithStudents {
  id: string;
  name: string;
  students: Pick<Student, "id" | "name" | "birthday" | "caricature">[];
}
