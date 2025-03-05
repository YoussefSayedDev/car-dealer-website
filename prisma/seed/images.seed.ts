import { imageSources } from "@/config/constants";
import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";
import { createPngDataUri } from "unlazy/thumbhash";

export async function seedImages(prisma: PrismaClient) {
  const classifieds = await prisma.classified.findMany();

  const classifiedIds = classifieds.map((classified) => classified.id);

  for (const classifiedId of classifiedIds) {
    const images: Prisma.ImageCreateInput = {
      src: imageSources.classifiedPlaceholder,
      alt: faker.lorem.words(2),
      classified: {
        connect: {
          id: classifiedId,
        },
      },
      blurHash: createPngDataUri("jPcJDYCndnZwl4h6Z2eYhWZ/c/VI"),
    };

    await prisma.image.create({
      data: images,
    });
  }
}
