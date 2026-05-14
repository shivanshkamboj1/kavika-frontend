import React, { useEffect, useRef } from "react";

const ResponsiveVideoPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch((e) => console.log("Autoplay failed:", e));
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    const currentVideo = videoRef.current;
    if (currentVideo) observer.observe(currentVideo);

    return () => {
      if (currentVideo) observer.unobserve(currentVideo);
    };
  }, []);

  return (
    <section className="px-6 md:px-8 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Experience</p>
        <h2 className="font-display text-4xl md:text-5xl">See It in Motion</h2>
      </div>
      <div className="max-w-full mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          <video
            ref={videoRef}
            src="https://www.image2url.com/r2/default/videos/1778526024444-54e34b49-17e5-4fe6-9ddd-55e75256d9aa.mp4"
            muted
            playsInline
            preload="none"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ResponsiveVideoPlayer;
