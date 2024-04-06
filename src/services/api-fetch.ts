import axios, { AxiosRequestConfig } from "axios";

type QueryParams = Record<string, string | number | boolean>;

const api = axios.create({
  // baseURL: "https://localhost:44357/api",
  baseURL: "https://ukfs.azurewebsites.net/api",

  headers: {
    "Access-Control-Allow-Origins": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Content-Type": "application/json",
  },
});

const apiFormData = axios.create({
  // baseURL: "https://localhost:44357/api",
  baseURL: "https://ukfs.azurewebsites.net/api",

  headers: {
    "Access-Control-Allow-Origins": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Content-Type": "multipart/form-data",
  },
});

class Api<TRequest> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    api.defaults.headers.common["Authorization"] = `Bearer ${this.getToken()}`;
  }

  getToken = (): string | null => {
    return localStorage.getItem("token");
  };

  removeToken = (): void => {
    // localStorage.removeItem("token");
  };

  getAll = (isActive?: boolean, companyId?: number): Promise<ResponseData> => {
    const queryParams = new URLSearchParams();

    if (isActive !== undefined) {
      queryParams.set("isActive", isActive.toString());
    }

    if (companyId !== undefined) {
      queryParams.set("companyId", companyId.toString());
    }

    const queryString = queryParams.toString();

    return api
      .get<ResponseData>(`${this.endpoint}?${queryString}`)
      .then((res) => res.data);
  };

  get = (params?: QueryParams): Promise<ResponseData> => {
    return api
      .get<ResponseData>(this.endpoint, { params })
      .then((res) => res.data);
  };

  post = (data: TRequest): Promise<ResponseData> => {
    return api.post<ResponseData>(this.endpoint, data).then((res) => res.data);
  };
  postWithBodyAndParams = (
    text: string,
    companyId: number,
    userId: number
  ): Promise<ResponseData> => {
    const queryParams = new URLSearchParams();
    queryParams.set("companyId", companyId.toString());
    queryParams.set("userId", userId.toString());

    const queryString = queryParams.toString();

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return api
      .post<ResponseData>(`${this.endpoint}?${queryString}`, { text }, config)
      .then((res) => res.data);
  };

  postMultiForm = (
    data: TRequest,
    config?: AxiosRequestConfig
  ): Promise<ResponseData> => {
    return apiFormData
      .post<ResponseData>(this.endpoint, data, config)
      .then((res) => res.data);
  };

  postQuery = (): Promise<ResponseData> => {
    return api.post<ResponseData>(this.endpoint).then((res) => res.data);
  };

  update = (id: number | null, data: TRequest): Promise<ResponseData> => {
    // Construct the URL based on whether id is provided or not
    const url = id ? `${this.endpoint}/${id}` : this.endpoint;

    return api.put<ResponseData>(url, data).then((res) => res.data);
  };

  updateMultiForm = (
    id: number | null,
    data: TRequest
  ): Promise<ResponseData> => {
    const url = id ? `${this.endpoint}/${id}` : this.endpoint;

    return apiFormData.put<ResponseData>(url, data).then((res) => res.data);
  };

  restore = (id: number): Promise<ResponseData> => {
    return api
      .post<ResponseData>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
  delete = (id: number): Promise<ResponseData> => {
    return api
      .delete<ResponseData>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };

  //clientPortal
  getClientPortalAll = (
    jobStatusId?: number,
    clientId?: number
  ): Promise<ResponseData> => {
    const queryParams = new URLSearchParams();
    if (clientId !== undefined) {
      queryParams.set("clientId", clientId.toString());
    }
    if (jobStatusId !== undefined) {
      queryParams.set("jobStatusId", jobStatusId.toString());
    }

    const queryString = queryParams.toString();

    return api
      .get<ResponseData>(`${this.endpoint}?${queryString}`)
      .then((res) => res.data);
  };
}

export default Api;
