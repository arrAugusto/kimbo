import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three'; // Importando Three.js

@Component({
  selector: 'app-hear-loading',
  templateUrl: './hear-loading.component.html',
  styleUrls: ['./hear-loading.component.css']
})
export class HearLoadingComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    console.log("Component initialized");
    this.initializeThreeJS();
  }

  initializeThreeJS() {
    const canvas = this.canvasRef.nativeElement;
    const canvassize = 500;
 
  
    const group = new THREE.Group();
    let mesh: THREE.Mesh;
  
    // Declarar tipos explícitos
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
  
    camera = new THREE.PerspectiveCamera(65, 1, 1, 10000);
    camera.position.z = 150;
  
    scene = new THREE.Scene();
    scene.add(group);
  
    // Crear una curva simple y agregarla al CurvePath
    const curvePath = new THREE.CurvePath();
    curvePath.add(new THREE.LineCurve3(
      new THREE.Vector3(-10, 0, 0),
      new THREE.Vector3(10, 0, 0)
    ));
  
    mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curvePath as any, 200, 1.1, 2, true),
      new THREE.MeshBasicMaterial({
      })
    );
    group.add(mesh);
  
    // Configurar el renderer y el canvas
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(canvassize, canvassize);
    renderer.setClearColor(0x000000, 0); // Hacer el fondo transparente
  
    // Renderizar la escena
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }
}
