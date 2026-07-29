
'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// This component is responsible for initializing AOS on the client side.
// It's extracted to its own file to ensure it's treated as a Client Component.
function AOSInitializerClientComponent() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true, // Animate elements only once
      mirror: false, // Whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // Defines which position of the element regarding to window should trigger the animation
    });
  }, []); // Empty dependency array ensures this runs once on mount

  return null; // This component does not render anything itself
}

export default AOSInitializerClientComponent;
