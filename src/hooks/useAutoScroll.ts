import { useEffect } from "react";

export function useAutoScroll(
  containerId: string,
  active: boolean,
  threshold = 60,
  speed = 10
) {
  useEffect(() => {
    if (!active) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    let animationFrameId: number;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastY = e.clientY;
    };

    const scrollContainer = () => {
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const bottomThreshold = containerRect.bottom - threshold;
      const topThreshold = containerRect.top + threshold;

      if (lastY > bottomThreshold) {
        // Scrolling down
        const scrollAmount = Math.min(
          ((lastY - bottomThreshold) / threshold) * speed,
          speed
        );
        container.scrollTop += scrollAmount;
      } else if (lastY < topThreshold && container.scrollTop > 0) {
        // Scrolling up
        const scrollAmount = Math.min(
          ((topThreshold - lastY) / threshold) * speed,
          speed
        );
        container.scrollTop -= scrollAmount;
      }

      animationFrameId = requestAnimationFrame(scrollContainer);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(scrollContainer);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, containerId, threshold, speed]);
}
