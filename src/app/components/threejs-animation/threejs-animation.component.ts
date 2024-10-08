import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-js-animation',
  templateUrl: './threejs-animation.component.html',
  styleUrls: ['./threejs-animation.component.css']
})
export class ThreeJsAnimationComponent implements OnInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private group!: THREE.Group;
  private mesh!: THREE.Mesh;
  private ringcover!: THREE.Mesh;
  private ring!: THREE.Mesh;

  private canvassize = 250; // Tamaño del canvas

  private rotatevalue = 0.035;
  private acceleration = 0;
  private animatestep = 0;
  private toend = false;
  private animationActive = false; // Nueva variable booleana

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.initThree();
    this.animate();
  }

  private initThree(): void {
    this.camera = new THREE.PerspectiveCamera(25, 1, 1, 10000);
    this.camera.position.z = 150;

    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Define una clase extendida de THREE.Curve para la geometría del tubo
    class CustomCurve extends THREE.Curve<THREE.Vector3> {
      public length: number;
      public radius: number;
      public pi2: number;

      constructor() {
        super();
        this.length = 30;
        this.radius = 5.6;
        this.pi2 = Math.PI * 2;
      }

      override getPoint(t: number): THREE.Vector3 {
        const x = this.length * Math.sin(this.pi2 * t);
        const y = this.radius * Math.cos(this.pi2 * 3 * t);

        let z, temp;
        temp = t % 0.25 / 0.25;
        temp = t % 0.25 - (2 * (1 - temp) * temp * -0.0185 + temp * temp * 0.25);
        if (Math.floor(t / 0.25) === 0 || Math.floor(t / 0.25) === 2) {
          temp *= -1;
        }
        z = this.radius * Math.sin(this.pi2 * 2 * (t - temp));

        return new THREE.Vector3(x, y, z);
      }
    }

    const customCurve = new CustomCurve();
    this.mesh = new THREE.Mesh(
      new THREE.TubeGeometry(customCurve, 200, 1.1, 2, true),
      new THREE.MeshBasicMaterial({
        color: 0xc39bd3 // Color cambiado aquí
      })
    );
    this.group.add(this.mesh);

    this.ringcover = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 15, 1),
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        opacity: 0,
        transparent: true
      })
    );
    

    this.ringcover.position.x = customCurve.length + 1;
    this.ringcover.rotation.y = Math.PI / 2;
    this.group.add(this.ringcover);

    this.ring = new THREE.Mesh(new THREE.RingGeometry(4.3, 5.55, 32), new THREE.MeshBasicMaterial({ color: 0x9B59B6, opacity: 0, transparent: true }));
    this.ring.position.x = customCurve.length + 1.1;
    this.ring.rotation.y = Math.PI / 2;
    this.group.add(this.ring);

    // Fake shadow
    for (let i = 0; i < 10; i++) {
      const plain = new THREE.Mesh(new THREE.PlaneGeometry(customCurve.length * 2 + 1, customCurve.radius * 3, 1), new THREE.MeshBasicMaterial({ color: 0x884ea0, transparent: true, opacity: 0 }));
      plain.position.z = -2.5 + i * 0.5;
      this.group.add(plain);
    }

    // Configuración del renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true // Habilita el fondo transparente
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.canvassize, this.canvassize);
    // No se establece el color de fondo para mantener la transparencia

    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  private start(): void {
    this.animationActive = true; // Activar la animación
  }

  private back(): void {
    this.animationActive = false; // Desactivar la animación
  }

  private tilt(percent: number): void {
    this.group.rotation.y = percent * 0.5;
  }

  private render(): void {
    let progress;

    this.animatestep = Math.max(0, Math.min(240, this.animationActive ? this.animatestep + 1 : this.animatestep - 4));
    this.acceleration = this.easing(this.animatestep, 0, 1, 240);

    if (this.acceleration > 0.35) {
      progress = (this.acceleration - 0.35) / 0.65;
      this.group.rotation.y = -Math.PI / 2 * progress;
      this.group.position.z = 50 * progress;
      progress = Math.max(0, (this.acceleration - 0.97) / 0.03);

      if (this.mesh.material instanceof THREE.MeshBasicMaterial) {
        this.mesh.material.opacity = 1 - progress;
      }
      if (this.ringcover.material instanceof THREE.MeshBasicMaterial) {
        this.ringcover.material.opacity = progress;
      }
      if (this.ring.material instanceof THREE.MeshBasicMaterial) {
        this.ring.material.opacity = progress;
      }

      this.ring.scale.x = this.ring.scale.y = 0.9 + 0.1 * progress;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const animateFn = () => {
        this.mesh.rotation.x += this.rotatevalue + this.acceleration;
        this.render();
        requestAnimationFrame(animateFn);
      };
      requestAnimationFrame(animateFn);
    });
  }

  private easing(t: number, b: number, c: number, d: number): number {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  }

  // Agrega métodos para activar y desactivar la animación desde fuera del componente
  public triggerAnimation(active: boolean): void {
    this.animationActive = active;
  }
}
