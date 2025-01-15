import { createPortal } from "react-dom";

const Loading = () => {
  const portalContainer = document.getElementById("portal-root"); // Pastikan elemen ini ada di HTML Anda.

  if (!portalContainer) return null;

  return createPortal(
    <div className="flex top-0 left-0 h-screen w-full bg-black/30 absolute justify-center items-center">
      <div className="custom-loader"></div>
    </div>,
    portalContainer
  );
};

export default Loading;
