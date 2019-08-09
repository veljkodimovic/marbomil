import { Component, OnInit } from '@angular/core';
import { SearchResultsService } from './search-results.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchParam: string;
  isLoading: boolean;

  constructor(private searchResultsService: SearchResultsService, private route: ActivatedRoute) {
    this.searchResultsService.searchEvent.subscribe(() => {
      this.doSearch(this.searchResultsService.param);
    });
  }

  ngOnInit() {
    this.isLoading = true;
    if (!this.searchResultsService.param) {
      this.doSearch(this.route.snapshot.paramMap.get('param'));
    } else {
      this.doSearch(this.searchResultsService.param);
    }
  }

  doSearch(param: string) {
    this.isLoading = true;
    this.searchParam = param;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

}
