import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] = []
  currentColor : Color | null | undefined
  filterText: string = ""
  constructor(private colorService : ColorService) { }

  ngOnInit(): void {
    this.getColors()
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }
  setCurrentColor(color:Color) {
    this.currentColor = color
  }

  getCurrentColorClass(color:Color) {
    if(color == this.currentColor) {
      return "active"
    }
    return ""
  }

}
