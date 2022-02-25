import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PieChartStats} from "../modal/pieChartStats";
import {Ticket} from "../modal/ticket";

export class Employee {
  constructor(
    public empId: string,
    public name: string,
    public designation: string,
    public salary: string
  ) {
  }
}

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {
  }

  getTickets() {
    return this.httpClient.get<Employee[]>("http://localhost:8080/tickets");
  }

  getStatusCount() {
    return this.httpClient.get<PieChartStats>("http://localhost:8080/statusCount");
  }

  saveTicketInformation(ticket: Ticket) {
    return this.httpClient.post<Ticket>(
      'http://localhost:8080/save/ticket',
      ticket);
  }
}
