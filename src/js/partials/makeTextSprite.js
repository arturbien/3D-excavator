import * as THREE from 'three';

export default function makeTextSprite( message, parameters ) {
  if ( parameters === undefined ) parameters = {};
  const fontface = parameters.hasOwnProperty('fontFace') ? parameters['fontFace'] : 'Arial';
  const fontsize = parameters.hasOwnProperty('fontSize') ? parameters['fontSize'] : 18;
  const borderThickness = parameters.hasOwnProperty('borderThickness') ? parameters['borderThickness'] : 4;
  const borderColor = parameters.hasOwnProperty('borderColor') ?parameters['borderColor'] : { r:0, g:0, b:0, a:1.0 };
  const backgroundColor = parameters.hasOwnProperty('backgroundColor') ?parameters['backgroundColor'] : { r:255, g:255, b:255, a:1.0 };
  const textColor = parameters.hasOwnProperty('textColor') ?parameters['textColor'] : { r:0, g:0, b:0, a:1.0 };

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const offset = 32;
  canvas.height = offset*2;
  canvas.width = offset*2;
  const radius = 24;

  context.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ',' + backgroundColor.b + ',' + backgroundColor.a + ')';
  context.beginPath();
  context.arc(offset, offset, radius, 0, 2*Math.PI);
  context.fill();

  context.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ',' + borderColor.b + ',' + borderColor.a + ')';
  context.lineWidth = borderThickness;
  context.beginPath();
  context.arc(offset, offset, radius, 0, 2*Math.PI);
  context.stroke();

  context.fillStyle = 'rgba(' + textColor.r + ',' + textColor.g + ',' + textColor.b + ',' + textColor.a + ')';
  context.font = fontsize + 'px ' + fontface;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(message, offset, offset);

  const texture = new THREE.Texture(canvas); 
  texture.needsUpdate = true;

  const spriteMaterial = new THREE.SpriteMaterial( { map: texture, depthTest: true } );
  const sprite = new THREE.Sprite( spriteMaterial );
  // sprite.center = new THREE.Vector2(0.5, 0.5 );
  sprite.scale.set(4, 4, 4);
  return sprite;  
}
