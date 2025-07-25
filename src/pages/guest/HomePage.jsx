import { MarginWrapper } from "../../components/core/MarginWrapper";
import { Filters } from "../../components/core/Filters";

export const HomePage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <MarginWrapper>
        <Filters />
      </MarginWrapper>
    </div>
  );
};
