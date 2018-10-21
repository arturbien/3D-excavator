import * as THREE from 'three'; 

// function below triggers when an annotation is clicked
export const annotationCallback = (number, link) => {
  console.log('You clicked annotation number ', number);
  window.open( link, '_blank' );
  return false;
};

// setting style of annotations
export const annotationStyle3D = { 
  fontSize: 32, 
  fontFace: 'sans-serif', 
  textColor: {r:255, g:255, b:255, a:1.0},
  borderColor: {r:0, g:255, b:20, a:1.0},
  backgroundColor: {r:0, g:0, b:0, a:0.5},
};

// setting the number and link for each annotation
export const annotations = [ 
  {
    number: 1,
    position: new THREE.Vector3(5.878, 5, -32.4),
    link: 'http://www.expensive.toys'
  },
  {
    number: 1,
    position: new THREE.Vector3(-3, 5, -32.4),
    link: 'http://www.expensive.toys'
  },
  {
    number: 2,
    position: new THREE.Vector3(5.99, 4.2, -27.5),
    link: 'http://www.expensive.toys/mandala/'
  },
  {
    number: 2,
    position: new THREE.Vector3(-3.0, 4.2, -27.5),
    link: 'http://www.expensive.toys/mandala/'
  },
  {
    number: 3,
    position: new THREE.Vector3(-3.0, 8.18, -27.87),
    link: 'http://www.expensive.toys/mandala/'
  },
  {
    number: 3,
    position: new THREE.Vector3(6.04, 8.18, -27.87),
    link: 'http://www.expensive.toys/mandala/'
  },
  {
    number: 4,
    position: new THREE.Vector3(5.96, 11.47, -30.69),
    link: 'http://arturbien.github.io/weather/'
  },
  {
    number: 4,
    position: new THREE.Vector3(-2.84, 11.47, -30.69),
    link: 'http://arturbien.github.io/weather/'
  },
  {
    number: 5,
    position: new THREE.Vector3(4.46, 25.49, -51.11),
    link: 'http://arturbien.github.io/sound/'
  },
  {
    number: 5,
    position: new THREE.Vector3(-1.41, 25.49, -51.11),
    link: 'http://arturbien.github.io/sound/'
  },
  {
    number: 6,
    position: new THREE.Vector3(6.35, 34.78, -47.05),
    link: 'http://www.expensive.toys'
  },
  {
    number: 6,
    position: new THREE.Vector3(-3.45, 34.78, -47.05),
    link: 'http://www.expensive.toys'
  },
  {
    number: 7,
    position: new THREE.Vector3(4.46, 40.79, -55.3),
    link: 'http://www.expensive.toys'
  },
  {
    number: 7,
    position: new THREE.Vector3(-1.43, 40.79, -55.3),
    link: 'http://www.expensive.toys'
  },
  {
    number: 8,
    position: new THREE.Vector3(4.5, 43.84, -14.5),
    link: 'http://www.expensive.toys'
  },
  {
    number: 8,
    position: new THREE.Vector3(-1.41, 43.84, -14.5),
    link: 'http://www.expensive.toys'
  },
  {
    number: 9,
    position: new THREE.Vector3(7.87, 38.5, -5.3),
    link: 'http://www.expensive.toys'
  },
  {
    number: 9,
    position: new THREE.Vector3(-4.76, 38.5, -5.3),
    link: 'http://www.expensive.toys'
  },
  {
    number: 10,
    position: new THREE.Vector3(5.5, 14.1, 9.3),
    link: 'http://www.expensive.toys'
  },
  {
    number: 10,
    position: new THREE.Vector3(-2.2, 14.1, 9.3),
    link: 'http://www.expensive.toys'
  },
  {
    number: 11,
    position: new THREE.Vector3(7.8, 23, 17.6),
    link: 'http://www.expensive.toys'
  },
  {
    number: 11,
    position: new THREE.Vector3(-5.2, 23.3, 17.99),
    link: 'http://www.expensive.toys'
  }
];
