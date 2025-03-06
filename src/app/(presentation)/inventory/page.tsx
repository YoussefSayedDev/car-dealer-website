import { ClassifiedList } from "@/components/inventory/classified-list";
import { AwaitedPageProps, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  try {
    return await prisma.classified.findMany({
      include: {
        images: true,
      },
    });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
};

export default async function InventoryPage(props: PageProps) {
  try {
    const searchParams = await props.searchParams;
    const classifieds = await getInventory(searchParams);
    
    // Only fetch count if we successfully got classifieds
    let count = 0;
    try {
      count = await prisma.classified.count();
    } catch (countError) {
      console.error("Error fetching count:", countError);
    }
    
    return (
      <div>
        <ClassifiedList classifieds={classifieds} />
      </div>
    );
  } catch (error) {
    console.error("Error in inventory page:", error);
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Unable to load inventory</h1>
        <p>We're experiencing technical difficulties. Please try again later.</p>
      </div>
    );
  }
}
