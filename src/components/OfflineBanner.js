import useOnlineStatus from "../hooks/useOnlineStatus";

const OfflineBanner = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
<div className="fixed top-0 left-0 right-0 bg-red-600 text-white px-4 text-center z-50">      
  <p className="flex items-center justify-center gap-2">
        <span>📡</span>
        <span>
          You're offline - Showing cached content. Some features are unavailable.
        </span>
      </p>
    </div>
  );
};

export default OfflineBanner;
