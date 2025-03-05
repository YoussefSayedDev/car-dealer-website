import { ClassifiedWithImages } from "@/config/types";
import { ClassifiedCard } from "./classified-card";

interface ClassifiedListProps {
  classifieds: ClassifiedWithImages[];
}
export const ClassifiedList = (props: ClassifiedListProps) => {
  const { classifieds } = props;

  return (
    <div className="md:grid-col-3 xl:grid-4 grid grid-cols-2 gap-4">
      {classifieds.map((classified) => {
        return <ClassifiedCard key={classified.id} classified={classified} />;
      })}
    </div>
  );
};
