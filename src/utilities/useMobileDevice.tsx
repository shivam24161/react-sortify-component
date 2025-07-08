import { useEffect, useState } from "react";

const mobileDevicePatterns = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i,
  /Kindle/i,
  /Silk/i,
  /Opera Mini/i,
  /Mobile/i,
];

const useMobileDevice = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile =
        window.innerWidth < 991 &&
        mobileDevicePatterns.some((device) =>
          navigator.userAgent.match(device)
        );
      setIsMobile(isMobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return isMobile;
};
export default useMobileDevice;

export const isMobileDevice = () => {
  return mobileDevicePatterns.some((device) => {
    return navigator.userAgent.match(device);
  });
};
