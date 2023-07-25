import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import { kcContext as kcLoginThemeContext } from "./keycloak-theme/login/kcContext";
import { kcContext as kcAccountThemeContext } from "./keycloak-theme/account/kcContext";

const KcLoginThemeApp = lazy(() => import("./keycloak-theme/login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./keycloak-theme/account/KcApp"));

const rootEl = window.document.createElement('div');
window.document.body.appendChild(rootEl);

const root = createRoot(rootEl);

root.render(
    <StrictMode>
        <Suspense>
            {(()=>{
                if( kcLoginThemeContext !== undefined ){
                    return <KcLoginThemeApp kcContext={kcLoginThemeContext} />;
                }

                if( kcAccountThemeContext !== undefined ){
                    return <KcAccountThemeApp kcContext={kcAccountThemeContext} />;
                }

                throw new Error('no context')
            })()}
        </Suspense>
    </StrictMode>
);
