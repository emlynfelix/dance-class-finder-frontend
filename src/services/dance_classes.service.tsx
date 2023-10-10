import http from '../http-common';
import { ITeacher } from './teachers.service';
import { ILocation } from './locations.service';

export interface IDanceClassView {
  id: number,
  name: string,
  start: string,
  end: string,
  teacher: ITeacher,
  location: ILocation,
};

export interface IDanceClass {
  id?: number,
  name: string,
  start: string,
  end: string,
  teacher_id: number,
  location_id: number,
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
