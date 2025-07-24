import { MarginWrapper } from "../../components/MarginWrapper";
import { Filters } from "../../components/Filters";

export const HomePage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <MarginWrapper>
        <Filters />
      </MarginWrapper>
    </div>
  );
};
