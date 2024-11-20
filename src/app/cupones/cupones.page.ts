import { Component, OnInit } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';
@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.page.html',
  styleUrls: ['./cupones.page.scss'],
})
export class CuponesPage implements OnInit {
  private animation!:Animation;
  constructor(private aCtrl:AnimationController) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.animacionCard();
  }
  animacionCard(){
    const cards = document.querySelectorAll('ion-card');

    cards.forEach((card, index) => {
      this.animation = this.aCtrl.create()
        .addElement(card)
        .duration(500)
        .easing('ease-out')
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(50px)', 'translateY(0)')
        .delay(index * 300);
  
      this.animation.play();
    });
  }
}
