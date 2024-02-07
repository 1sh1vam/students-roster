export type Student = {
  id: number;
  name: string;
  email: string;
  subjects: string;
};

export type StudentResponseT = {
  page: number;
  total: number;
  pageSize: number;
  data: Student[];
}