import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { NewsletterService } from './_services/newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'angular12-pwa-starter';
  readonly VAPID_PUBLIC_KEY = "BBctD4DNpi8gBJBAN7OORGf7gt_rjCvVWNZ-mB2oymRCx3VHUVBMvL1NheeA2To0SooW8kMeVIk1NPWlh52Uph4"
  constructor (
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    private newsletterService: NewsletterService
  ) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if (confirm("New version available. Load New Version?")) {
              window.location.reload();
          }

      });

  }
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      this.newsletterService.addPushSubscriber(sub).subscribe((res => alert('subscribed!')))
    })
    .catch(err => {
      alert('err');
      console.error("Could not subscribe to notifications", err)
    });
  }
  
  sendNewsletter() {
    console.log("Sending Newsletter to all Subscribers ...");
    this.newsletterService.send().subscribe();
  }

}
