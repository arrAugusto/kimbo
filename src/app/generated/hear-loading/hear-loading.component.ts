import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three'; // Importando Three.js

@Component({
  selector: 'app-hear-loading',
  templateUrl: './hear-loading.component.html',
  styleUrls: ['./hear-loading.component.css']
})
export class HearLoadingComponent implements OnInit {

  @ViewChild('canvas', {static: true}) canvasRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.initializeThreeJS();
  }

  initializeThreeJS() {
    const canvas = this.canvasRef.nativeElement;
    const $wrap = document.getElementById('wrap');

    const areawidth = window.innerWidth;
    const areaheight = window.innerHeight;

    const canvassize = 500;

    const length = 30;
    const radius = 5.6;

    const rotatevalue = 0.035;
    let acceleration = 0;
    let animatestep = 0;
    let toend = false;

    const pi2 = Math.PI * 2;

    const group = new THREE.Group();
    let mesh: THREE.Mesh;

    let camera, scene, renderer;

    camera = new THREE.PerspectiveCamera(65, 1, 1, 10000);
    camera.position.z = 150;

    scene = new THREE.Scene();
    scene.add(group);

    mesh = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CurvePath(), 200, 1.1, 2, true),
      new THREE.MeshBasicMaterial({
        color: 0xffffff
      })
    );
    group.add(mesh);

    // Resto del código...
  }
}
