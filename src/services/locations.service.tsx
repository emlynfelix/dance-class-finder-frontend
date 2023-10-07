import http from '../http-common';

export interface ILocation {
  id?: number,
  name: string,
  latitude: number,
  longitude: number,
};

export class LocationService {
  getAll(): Promise<any> {
    return http.get("/locations");
  }

  get(id: number): Promise<any> {
    return http.get(`/locations/${id}`);
  }

  create(data: ILocation): Promise<any> {
    return http.post("/locations", data);
  }

  update(id: number, data: ILocation): Promise<any> {
    return http.put(`/locations/${id}`, data);
  }

  delete(id: number): Promise<any> {
    return http.delete(`/locations/${id}`);
  }
};

