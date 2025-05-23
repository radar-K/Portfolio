import * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      primitive: any;
      directionalLight: any;
      pointLight: any; // Lägg till andra ljus som du använder
      ambientLight: any;
      spotLight: any;
      // ... lägg till fler Three.js element efter behov
    }
  }
}
