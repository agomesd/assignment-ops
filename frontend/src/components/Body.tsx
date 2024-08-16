import { useState } from "react";
import { Data } from "./Data";
import { RegionList } from "./RegionList";

export default function Body() {
  const [region, setRegion] = useState<string>("");

  return (
    <div className="flex flex-col w-full h-full gap-2 md:flex-row">
      <RegionList region={region} setRegion={setRegion} />
      <div className="flex-1 h-full p-4">
        <Data region={region} />
      </div>
    </div>
  );
}
