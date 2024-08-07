import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Report } from '../models/report';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {ApiResponse} from "../models/apiresponse";
const baseUrl = `${environment.vivoUrl}/rest/1/report_generator`;

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ApiResponse>(`${baseUrl}`);
  }

  getById(id: string) {
    return this.http.get<Report>(`${baseUrl}/resource:${id}`);
  }

  create(params: any) {
    let body = {
      template: params.template,
      select_queries: params.select_queries,
      construct_queries: params.construct_queries,
      report_generator_description: params.report_generator_description,
      report_generator_name: params.report_generator_name
    };

    console.log('Body with vivoweb ontology: ' + JSON.stringify(body));
    return this.http.post(
      `${baseUrl}`,
      body,
    );
  }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    console.log('Delete from report service\n');
    return this.http.delete(`${baseUrl}/resource:${id}`);
  }

  download(id: string) {
    let body = {
      id: id
    };

    return this.http.post(
      `${baseUrl}`,
      body,
    );
  }

  import(settings: string) {
    let body = {
      report_generator_configuration_graph: settings,
    };

    return this.http.post(
      `${baseUrl}/import_report_generator`,
      body,
    );
  }

  export(id: string) {
    let body = {
      resource_id: id,
    };

    return this.http.post<{report_generator_configuration_graph: string}>(
      `${baseUrl}/export_report_generator`,
      body,
    );
  }

  execute(id: string) {
    let body = {
      resource_id: id,
    };

    return this.http.post<{report: string}>(
      `${baseUrl}/execute_report_generator`,
      body,
    );
  }
}
