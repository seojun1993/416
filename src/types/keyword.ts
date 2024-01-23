import { Student } from "./student";

export interface KeywordWithStudents {
  name: string;
  students: Pick<Student, "id" | "name" | "birthday" | "caricature">[];
}
