import axios, { AxiosInstance } from "axios";

export class BaseService {

  protected baseURL : string;
  protected http: AxiosInstance;

  constructor(baseURL : string) {
    this.baseURL = baseURL;
    this.http = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

}