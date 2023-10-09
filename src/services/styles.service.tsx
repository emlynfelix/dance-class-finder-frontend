import http, { wiki_http } from '../http-common';

export interface IStyle {
  id?: number,
  name: string,
};

export class StyleService {
  getAll(): Promise<any> {
    return http.get("/styles");
  }

  get(id: number): Promise<any> {
    return http.get(`/styles/${id}`);
  }

  create(data: IStyle): Promise<any> {
    return http.post("/styles", data);
  }

  update(id: number, data: IStyle): Promise<any> {
    return http.put(`/styles/${id}`, data);
  }

  delete(id: number): Promise<any> {
    return http.delete(`/styles/${id}`);
  }

  get_wiki(name: string): Promise<any> {
    return wiki_http.get(`/${name}`);
  }
};

