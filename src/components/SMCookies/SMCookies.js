import { CookieModal } from "hds-react";
import React from "react";
import { COOKIE_MODAL_ROOT_ID } from "../../utils/constants";

function SMCookies() {
  const cookieDomain = typeof window !== "undefined" ? window.location.hostname : undefined;

  function parseConsentsAndActOnThem(consents) {}

  const contentSource = {
    siteName: "siteName",
    currentLanguage: "fi",
    optionalCookies: {
      groups: [
        {
          commonGroup: "statistics",
          cookies: [
            {
              id: "matomo",
              name: "_pk*",
              hostName: "digia.fi",
              description: "cookies.matomo.description",
              expiration: "cookies.matomo.expiration",
            },
          ],
        },
      ],
    },
    focusTargetSelector: '[href="#view-title"]',
    onAllConsentsGiven: (consents) => parseConsentsAndActOnThem(consents),
    onConsentsParsed: (consents) => parseConsentsAndActOnThem(consents),
  };
  return <CookieModal cookieDomain={cookieDomain} contentSource={contentSource} rootId={COOKIE_MODAL_ROOT_ID} />;
}

export default SMCookies;
