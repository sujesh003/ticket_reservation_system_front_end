import {Component, OnInit} from "@angular/core";
import {HttpClientService} from "../service/httpclient.service";
import {Ticket} from "../modal/ticket";

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.css']
})

export class TicketManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'price', 'reserved', 'payment'];

  tickets: Array<Ticket> = [{id: 1, description: 'Movie Ticket', price: 250, reserved: true, payment: true},
    {id: 2, description: 'Flight Ticket', price: 375000, reserved: true, payment: true},
    {id: 3, description: 'Heli Ticket', price: 125000, reserved: true, payment: true}];

  constructor(private httpClientService: HttpClientService) {
  }

  ngOnInit() {
  }
}