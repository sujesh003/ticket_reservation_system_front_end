import {Component, OnInit} from "@angular/core";
import {HttpClientService} from "../service/httpclient.service";
import {Ticket} from "../modal/ticket";

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.css']
})

export class TicketManagementComponent implements OnInit {
  displayedColumns: string[] = ['description', 'price', 'reserved', 'payment'];
  tickets: Array<Ticket> = [];

  constructor(private httpClientService: HttpClientService) {
  }

  ngOnInit() {
    this.httpClientService
      .getTickets()
      .subscribe(response => {
        console.log('response', response);
        this.handleSuccessfulResponse(response);
      });
  }

  handleSuccessfulResponse(response: any) {
    this.tickets = response;
  }

  addPayTicket(payTicket: Ticket) {
    payTicket.payment = true;
    payTicket.reserved = true;
    this.httpClientService.saveTicketInformation(payTicket).subscribe(res => {
      console.log(res);
    });
  }

  addReserveTicket(reserveTicket: Ticket) {
    reserveTicket.reserved = true;
    this.httpClientService.saveTicketInformation(reserveTicket).subscribe(res => {
      console.log(res);
    });
  }
}
