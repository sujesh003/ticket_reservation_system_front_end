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
    console.log('pay ticket', payTicket);
    payTicket.payment = true;
    payTicket.reserved = true;
    console.log('paid', payTicket);
    this.httpClientService.saveTicketInformation(payTicket).subscribe(res => {
      console.log('saving ticket info', res);
    });
  }

  addReserveTicket(reserveTicket: Ticket) {
    console.log('reserve', reserveTicket);
    reserveTicket.reserved = true;
    console.log('reserved', reserveTicket);
    this.httpClientService.saveTicketInformation(reserveTicket).subscribe(res => {
      console.log('saving ticket info', res);
    });
  }
}
