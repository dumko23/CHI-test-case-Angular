import { Component, Input, OnInit } from '@angular/core';
import { LoanService } from "../shared/services/loan.service";
import { ModalService } from "../shared/services/modal.service";

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {
  loanList: any = [];
  selectedLoan!: any;
  totalCash: number = 18000;
  @Input() invested: boolean;

  constructor(private loanService: LoanService,
              private modal: ModalService) {
    this.invested = false;
  }

  ngOnInit(): void {
    this.getLoanList();
  }

  getLoanList(): void {
    this.loanService.getLoanList()
      .subscribe(json => {
        this.loanList = JSON.parse(JSON.stringify(json.loans))
      });
  }

  openModal(selectLoan: any): void {
    this.modal.open();
    this.selectedLoan = selectLoan;
  }

}
