// import * as THREE from 'three';
import makeTextSprite from './makeTextSprite';
import { annotationCallback, annotationStyle3D, annotations } from './config';

export default class Annotations {
  constructor(canvasContainerId) {
    this.canvasContainer = document.getElementById(canvasContainerId);
  }

  createTHREEAnnotations(scene) {
    annotations.forEach(annotation => {
      const sprite = makeTextSprite(annotation.number, annotationStyle3D);
      sprite.position.set(
        annotation.position.x,
        annotation.position.y,
        annotation.position.z
      );
      sprite.callback = () => {
        annotationCallback(annotation.number, annotation.link);
      };
      // sprite.renderOrder = 1000+i;
      scene.add(sprite);
    });
  }

  updatePosition(camera) {
    const self = this;
    annotations.forEach(function(annotation) {
      const vector = annotation.position.clone();
      vector.project(camera);
      const x = Math.round(
        (0.5 + vector.x / 2) *
          (self.canvasContainer.offsetWidth / window.devicePixelRatio)
      );
      const y = Math.round(
        (0.5 - vector.y / 2) *
          (self.canvasContainer.offsetHeight / window.devicePixelRatio)
      );
      const a = document.querySelector(
        `[data-annotation='${annotation.number}']`
      );
      a.style.transform = `translate(${x}px,${y}px)`;
      // a.style.left = `${x}px`;
    });
  }
}
