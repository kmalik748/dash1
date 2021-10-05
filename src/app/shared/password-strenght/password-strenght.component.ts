import {Component, Input, OnInit, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-password-strenght',
  templateUrl: './password-strenght.component.html',
  styleUrls: ['./password-strenght.component.css']
})
export class PasswordStrenghtComponent implements OnInit {

  bar0: string | any;
  bar1: string | any;
  bar2: string | any;
  bar3: string | any;

  @Input() public passwordToCheck: string | any;
  private colors = ['darkred', 'orangered', 'orange', 'yellowgreen'];

  constructor() {
    this.bar1 = this.bar0 = this.bar2 = this.bar3 = "";
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    this.setBarColors(4, '#DDD');
    if (password) {
      const c = this.getColor(this.checkStrength(password));
      this.setBarColors(c.index, c.color);
    }
  }

  private getColor(s: any) {
    let index = 0;
    if (s === 10) {
      index = 0;
    } else if (s === 20) {
      index = 1;
    } else if (s === 30) {
      index = 2;
    } else if (s === 40) {
      index = 3;
    } else {
      index = 4;
    }
    return {
      index: index + 1,
      color: this.colors[index]
    };
  }

  private setBarColors(count: any, col: any) {
    for (let n = 0; n < count; n++) {
      // this.bar[n] = col;
      if(n==0) this.bar0 = col;
      if(n==1) this.bar1 = col;
      if(n==2) this.bar2 = col;
      if(n==3) this.bar3 = col;
    }
  }

  checkStrength(p: any) {
    // 1
    let force = 0;

    // 2
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);

    // 3
    const flags = [lowerLetters, upperLetters, numbers, symbols];

    // 4
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    // 5
    force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    force += passedMatches * 10;

    // 6
    force = (p.length <= 6) ? Math.min(force, 10) : force;

    // 7
    force = (passedMatches === 1) ? Math.min(force, 10) : force;
    force = (passedMatches === 2) ? Math.min(force, 20) : force;
    force = (passedMatches === 3) ? Math.min(force, 30) : force;
    force = (passedMatches === 4) ? Math.min(force, 40) : force;

    return force;
  }
}
