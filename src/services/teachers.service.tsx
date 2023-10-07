import http from '../http-common';

export interface ITeacher {
  id?: number,
  name: string,
  contact: string,
};

export class TeacherService {
  getAll(): Promise<any> {
    return http.get("/teachers");
  };

  get(id: number): Promise<any> {
    return http.get(`/teachers/${id}`);
  };

  create(data: ITeacher): Promise<any> {
    return http.post("/teachers", data);
  }

  update(id: number, data: ITeacher): Promise<any> {
    return http.put(`/teachers/${id}`, data);
  }

  delete(id: number): Promise<any> {
    return http.delete(`/teachers/${id}`);
  }
}

