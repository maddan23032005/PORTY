import { lazy, Suspense } from "react";
import "./App.css";
import { useThemeToggle } from "./hooks/useThemeToggle";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  useThemeToggle();          // 🎨 type T-U-R-N to toggle blue ↔ red theme

  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;

