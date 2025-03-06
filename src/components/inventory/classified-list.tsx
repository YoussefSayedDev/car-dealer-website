import { ClassifiedWithImages } from "@/config/types";
import { ClassifiedCard } from "./classified-card";

interface ClassifiedListProps {
  classifieds: ClassifiedWithImages[];
}
export const ClassifiedList = (props: ClassifiedListProps) => {
  const { classifieds } = props;

  return (
    <div>
      {/* Debug information - will help identify if data is coming through */}
      <p className="text-sm text-muted-foreground mb-4">
        Found {classifieds.length} vehicles in inventory
      </p>
      
      {classifieds.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No vehicles found</h2>
          <p className="text-muted-foreground">
            There are currently no vehicles in our inventory. Please check back later.
          </p>
        </div>
      ) : (
        <div className="md:grid-col-3 xl:grid-4 grid grid-cols-2 gap-4">
          {classifieds.map((classified) => {
            return <ClassifiedCard key={classified.id} classified={classified} />;
          })}
        </div>
      )}
    </div>
  );
};
