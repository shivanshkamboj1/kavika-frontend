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
      { threshold: 0.5 } // video must be at least 50% in view
    );

    const currentVideo = videoRef.current;
    if (currentVideo) observer.observe(currentVideo);

    return () => {
      if (currentVideo) observer.unobserve(currentVideo);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dreirplqv/video/upload/v1746800597/sample_kcjlr6.mp4"
        muted
        playsInline
        className="w-full h-auto rounded-2xl shadow-lg"
      />
    </div>
  );
};

export default ResponsiveVideoPlayer;
