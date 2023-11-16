import { enableOverlays } from "@sanity/overlays";
import { useEffect } from "react";

import { useLiveMode } from "~/sanity/loader";
import { client } from "~/sanity/client";
import { studioUrl } from "~/sanity/projectDetails";

export default function VisualEditing() {
  useEffect(() => {
    // When displayed inside an iframe
    if (window.parent !== window.self) {
      // Enable visual editing overlay
      const disable = enableOverlays({
        allowStudioOrigin: studioUrl,
      });

      // And disable when unmounted
      return () => disable();
    }
  }, []);

  // Enable live queries from the specified studio origin URL
  useLiveMode({ allowStudioOrigin: studioUrl, client });

  return null;
}
