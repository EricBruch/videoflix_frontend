import { Component, OnInit, inject } from '@angular/core';
import { UserFacade } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'videoflix';

  facade = inject(UserFacade);

  ngOnInit(): void {
    // NOTE: could there be some highjacking or error cases? even through session-storage is used
    this.facade.checkForAuthentication();
  }
}
