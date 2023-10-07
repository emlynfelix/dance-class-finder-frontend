import http from '../http-common';

interface IStyle {
  id?: number,
  name: string,
};

class StyleService {
  getAll(): Promise<IStyle[]> {
    return http.get("/styles");
  }

  get(id: number): Promise<IStyle> {
    return http.get(`/styles/${id}`);
  }

  create(data: IStyle): Promise<IStyle> {
    return http.post("/styles", data);
  }

  update(id: number, data: IStyle): Promise<IStyle> {
    return http.put(`/styles/${id}`, data);
  }

  delete(id: number): Promise<any> {
    return http.delete(`/styles/${id}`);
  }
};

export default new StyleService();
