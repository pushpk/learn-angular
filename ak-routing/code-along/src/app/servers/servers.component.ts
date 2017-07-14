import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Server } from '../shared/server.model';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  @ViewChild('serverName') serverNameInput: ElementRef;
  @ViewChild('serverStatus') serverStatusInput: ElementRef;
  servers: Server[];
  selectedServerIndex: number;
  serverStatusOptions: string[];

  constructor(private serverService: ServersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.servers = this.serverService.getServers();
    this.serverService.newServerSelected.subscribe(
      (index: number) => { this.selectedServerIndex = index }
    );
    this.serverService.refreshServerList.subscribe(
      () => { this.servers = this.serverService.getServers(); }
    );
    this.serverStatusOptions = this.serverService.getServerStatusOptions();
    this.selectedServerIndex = 0;
  }

  onServerClick(index: number) {
    this.serverService.setSelectedServerIndex(index);
  }

  onServerUpdate() {
    this.serverService.updateServer(this.selectedServerIndex,
      new Server(this.serverNameInput.nativeElement.value,
         this.serverStatusInput.nativeElement.value)
    );
  }

  onReloadClick() {
    // example on how to set a relative path
    this.router.navigate(['/servers'], {relativeTo: this.activatedRoute});
  }
}