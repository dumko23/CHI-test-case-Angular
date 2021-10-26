import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from "../shared/services/modal.service";
import { Observable } from "rxjs";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { LoanListComponent } from "../loan-list/loan-list.component";

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss']
})
export class ModalPageComponent implements OnInit {
  display$!: Observable<'open' | 'close'>;
  faTimesCircle = faTimesCircle;
  investValue: number;
  availableValue!: number;
  @Input() currentLoan?: any;
  warning1: boolean;
  warning2: boolean;

  constructor(
    private modalService: ModalService,
    private forCashChange: LoanListComponent
  ) {
    this.investValue = NaN;
    this.warning1 = false;
    this.warning2 = false;

  }

  ngOnInit(): void {
    this.display$ = this.modalService.watch();
  }

  close() {
    this.modalService.close();
    this.warning1 = false;
    this.warning2 = false;
    this.investValue = NaN;
  }

  onInvest() {
    this.warning1 = false;
    this.warning2 = false;
    if (this.investValue > 0) {
      this.availableValue = parseInt(this.currentLoan.available
        .replace(/,/g, ''));
      if (this.availableValue >= this.investValue && this.forCashChange.totalCash >= this.investValue) {
        this.availableValue -= this.investValue;
        this.currentLoan.available = this.availableValue.toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        this.forCashChange.totalCash -= this.investValue;
        this.investValue = NaN;
        this.warning1 = false;
        this.warning2 = false;
        this.currentLoan.invested = true;
        this.modalService.close();
      } else {
        this.warning1 = true;
      }
    } else {
      this.warning2 = true;
    }
  }
}
