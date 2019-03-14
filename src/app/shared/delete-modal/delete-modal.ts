import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'delete-modal',
  templateUrl: './delete-modal.html',
  styleUrls: ['./delete-modal.scss']
})
export class DeleteModalComponent implements OnInit {
  @ViewChild('content') con: ElementRef;
  @ViewChild('c') close: ElementRef;
  @Output() deleteConfirmed: EventEmitter<any> = new EventEmitter();
  @Input() text: any = '';
  @Input() open = false;
  modalRef: any;

  constructor(private modalService: NgbModal) {

  }

  ngOnInit() {

  }

  openModal() {
    this.modalRef = this.modalService.open(this.con);

  }

  confirmDelete() {
    this.deleteConfirmed.emit();
    this.modalRef.close();

  }

}
