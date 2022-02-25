import {Component, OnInit} from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import {StatsPieChart} from "../modal/data";
import {HttpClientService} from "../service/httpclient.service";
import {PieChartStats} from "../modal/pieChartStats";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'D3 Pie Chart in Angular 10';

  pieChartStats: Array<PieChartStats> = [];

  public response: any;
  public message: string = "Uninitialized";


  margin = {top: 20, right: 20, bottom: 30, left: 50};
  width: number;
  height: number;
  radius: number;

  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  color: any;
  svg: any;

  constructor(private httpClientService: HttpClientService) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
    this.getCountOfReserveAndPayment();
  }

  ngOnInit() {
    console.log('stats pie char', StatsPieChart);
    this.initSvg();
    // this.drawPie();
  }

  getCountOfReserveAndPayment() {
    // this.message = "Fetching..";
    // this.response = "";
    // this.response = await this.httpClient
    //   .get<any>(this.apiURL)
    //   .pipe(delay(1))
    //   .toPromise();
    // this.message = "Fetched";
    // console.log('response', this.response);

    // this.pieChartStats = [{category: 'RESERVED', count: this.response.detail.RESERVED},
    //   {category: 'PAID', count: this.response.detail.PAID}];
    // this.drawPie();

    this.httpClientService.getStatusCount().subscribe((res: any) => {
      console.log('status count res', res);
      this.pieChartStats = [{category: 'RESERVED', count: res.detail.RESERVED},
        {category: 'PAID', count: res.detail.PAID}];
      this.drawPie();
      console.log('here we go .. pie chart status', this.pieChartStats);
    });
  }

  initSvg() {
    this.color = d3Scale.scaleOrdinal()
      .range(['#FFA500', '#00FF00']);
    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);
    this.labelArc = d3Shape.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);

    this.labelPer = d3Shape.arc()
      .outerRadius(this.radius - 80)
      .innerRadius(this.radius - 80);

    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.count);

    this.svg = d3.select('#pieChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + Math.min(this.width, this.height) + ' ' + Math.min(this.width, this.height))
      .append('g')
      .attr('transform', 'translate(' + Math.min(this.width, this.height) / 2 + ',' + Math.min(this.width, this.height) / 2 + ')');
  }

  drawPie() {
    console.log('drawinggg', this.pieChartStats);
    const g = this.svg.selectAll('.arc')
      .data(this.pie(this.pieChartStats))
      .enter().append('g')
      .attr('class', 'arc');
    g.append('path').attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.category));
    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.category);

    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelPer.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.count);
  }
}
