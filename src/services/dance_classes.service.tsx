import http from '../http-common';

export interface IDanceClass {
  id?: number,
  name: string,
  start: string,
  end: string,
  teacher: number,
  location: number,
};

export class DanceClassService {
  getAll(): Promise<any> {
    return http.get("/dance_classes");
  }

  get(id: number): Promise<any> {
    return http.get(`/dance_classes/${id}`);
  }

  create(data: IDanceClass): Promise<any> {
    return http.post("/dance_classes", data);
  }

  update(id: number, data: IDanceClass): Promise<any> {
    return http.put(`/dance_classes/${id}`, data);
  }

  delete(id: number): Promise<any> {
    return http.delete(`/dance_classes/${id}`);
  }
}
