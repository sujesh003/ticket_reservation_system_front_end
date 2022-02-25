import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PieChartStats} from "../modal/pieChartStats";
import {Ticket} from "../modal/ticket";

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {
  }

  getTickets() {
    return this.httpClient.get<Ticket[]>("http://localhost:8080/tickets");
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
