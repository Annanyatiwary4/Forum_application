import { OrbitingCircles } from "./ui/orbiting-circles";


export default function HeroSection() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-200 dark:from-black dark:to-gray-900">
      {/* Orbiting Circles */}
 
<OrbitingCircles iconSize={100} radius={300} speed={0.3}>
  <span role="img" aria-label="smile">😀</span>
  <span role="img" aria-label="laugh">😂</span>
  <span role="img" aria-label="sunglasses">😎</span>
  <span role="img" aria-label="wink">😉</span>
  <span role="img" aria-label="star-struck">🤩</span>
</OrbitingCircles>

<OrbitingCircles iconSize={70} radius={350} reverse speed={0.5}>
  <span role="img" aria-label="thinking">🤔</span>
  <span role="img" aria-label="blush">😊</span>
  <span role="img" aria-label="cool">😎</span>
  <span role="img" aria-label="heart-eyes">😍</span>
  <span role="img" aria-label="grinning">😁</span>
</OrbitingCircles>


      {/* Center Text */}
      <div className="absolute text-center">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
          Forumly
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
          A modern space to share ideas & build community 🚀
        </p>
      </div>
    </section>
  );
}
