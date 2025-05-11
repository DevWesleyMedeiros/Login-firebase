import React, { useEffect, useState } from "react";

const COOKIE_KEY = "cookieConsent";

export const BannerCookies = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setTimeout(() => setVisible(true), 2000);
    }
  }, []);

  const handleConsent = (value) => {
    if (value) localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section className="banner-cookies-consent fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="w-4/5 max-w-md rounded-2xl bg-amber-100 shadow-xl p-6 cookies">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-zinc-700 mb-2">
            Sua privacidade é importante
          </h2>
          <p className="text-sm text-zinc-700 mb-4">
            Usamos cookies para melhorar sua experiência no site.
            <a href="#" className="underline hover:text-[#634647]">
              {" "}
              política de privacidade{" "}
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
          <button onClick={() => handleConsent("rejected")}>Rejeitar</button>
          <button onClick={() => handleConsent(null)}>Fechar</button>
          <button
            className="btn-accept-cookies"
            onClick={() => handleConsent("accepted")}
          >
            Aceitar
          </button>
        </div>
      </div>
    </section>
  );
};
