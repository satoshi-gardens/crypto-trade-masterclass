
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ResourceScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x6A4CFF, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create torus (representing resources)
    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x6A4CFF,
      transparent: true,
      opacity: 0.9,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Create spheres (representing tools)
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xFF6B6B });
    
    const spheres = Array(3).fill(null).map((_, i) => {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(Math.cos(i * Math.PI * 2/3) * 2, Math.sin(i * Math.PI * 2/3) * 2, 0);
      scene.add(sphere);
      return sphere;
    });

    // Position camera
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      spheres.forEach((sphere, i) => {
        sphere.position.x = Math.cos(Date.now() * 0.001 + i * Math.PI * 2/3) * 2;
        sphere.position.y = Math.sin(Date.now() * 0.001 + i * Math.PI * 2/3) * 2;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.remove(torus);
      spheres.forEach(sphere => scene.remove(sphere));
      torusGeometry.dispose();
      torusMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[300px] absolute opacity-20" />;
};

export default ResourceScene;
