import { useRef } from "react";

/** React Bits GlareHover — fluid sizing when width/height omitted (defaults to full width). */
export function GlareHover({
  width,
  height,
  background = "#fff",
  borderRadius = "16px",
  borderColor = "rgba(15, 76, 117, 0.18)",
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.42,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = "",
  style = {},
  cursorClassName = "",
}) {
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const overlayRef = useRef(null);

  const animateIn = () => {
    const overlayEl = overlayRef.current;
    if (!overlayEl) return;

    overlayEl.style.transition = "none";
    overlayEl.style.backgroundPosition = "-100% -100%, 0 0";
    overlayEl.style.transition = `${transitionDuration}ms ease`;
    overlayEl.style.backgroundPosition = "100% 100%, 0 0";
  };

  const animateOut = () => {
    const overlayEl = overlayRef.current;
    if (!overlayEl) return;

    if (playOnce) {
      overlayEl.style.transition = "none";
      overlayEl.style.backgroundPosition = "-100% -100%, 0 0";
    } else {
      overlayEl.style.transition = `${transitionDuration}ms ease`;
      overlayEl.style.backgroundPosition = "-100% -100%, 0 0";
    }
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(${glareAngle}deg,
        hsla(0,0%,0%,0) 60%,
        ${rgba} 70%,
        hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-100% -100%, 0 0",
    pointerEvents: "none",
  };

  const sizeStyle =
    width != null || height != null ? { width, height } : { width: "100%", minHeight: 0 };

  return (
    <div
      className={`relative block overflow-hidden border ${cursorClassName} ${className}`.trim()}
      style={{
        ...sizeStyle,
        background,
        borderRadius,
        borderColor,
        ...style,
      }}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <div ref={overlayRef} style={overlayStyle} />
      {children}
    </div>
  );
}
