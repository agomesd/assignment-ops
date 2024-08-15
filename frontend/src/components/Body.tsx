import { Data } from "./Data";
import { RegionList } from "./RegionList";

export default function Body() {
  return (
    <div className="w-full h-full flex gap-2">
      <RegionList />
      <div className="flex-1 h-full p-4">
        <Data />
      </div>
    </div>
  );
}
