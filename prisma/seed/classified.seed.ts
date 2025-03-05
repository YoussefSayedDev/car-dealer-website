import { faker } from "@faker-js/faker";
import {
  BodyType,
  ClassifiedStatus,
  Colour,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Prisma,
  Transmission,
  ULEZCompliant,
} from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import slugify from "slugify";

export async function seedClassified(prisma: PrismaClient) {
  const makes = await prisma.make.findMany({
    include: {
      models: {
        include: {
          modelVariants: true,
        },
      },
    },
  });

  const classifiedData: Prisma.ClassifiedCreateManyInput[] = [];

  for (let i = 0; i < 25; i++) {
    const make: any = faker.helpers.arrayElement(makes);
    if (!make.models.length) continue;
    const model: any = faker.helpers.arrayElement(make.models);

    const variant: any = model.modelVariants.length
      ? faker.helpers.arrayElement(model.modelVariants)
      : null;

    const year = faker.date
      .between({
        from: new Date(1925, 0, 1),
        to: new Date(),
      })
      .getFullYear();

    const title = [year, make.name, model.name, variant?.name]
      .filter(Boolean)
      .join(" ");

    const vrm = faker.vehicle.vrm();

    const baseSlug = slugify(`${title}-${vrm}`);

    classifiedData.push({
      year,
      vrm,
      slug: baseSlug,
      makeId: make.id,
      modelId: model.id,
      ...(variant?.id && { modelVariantId: variant.id }),
      title,
      price: faker.number.int({ min: 400000, max: 100000000 }),
      odoReading: faker.number.int({ min: 0, max: 200000 }),
      doors: faker.number.int({ min: 2, max: 8 }),
      seats: faker.number.int({ min: 2, max: 8 }),
      views: faker.number.int({ min: 100, max: 100000 }),
      description: faker.commerce.productDescription(),
      currency: faker.helpers.arrayElement(Object.values(CurrencyCode)),
      odoUnit: faker.helpers.arrayElement(Object.values(OdoUnit)),
      bodyType: faker.helpers.arrayElement(Object.values(BodyType)),
      transmission: faker.helpers.arrayElement(Object.values(Transmission)),
      fuelType: faker.helpers.arrayElement(Object.values(FuelType)),
      colour: faker.helpers.arrayElement(Object.values(Colour)),
      ulezCompliant: faker.helpers.arrayElement(Object.values(ULEZCompliant)),
      status: faker.helpers.arrayElement(Object.values(ClassifiedStatus)),
    });
  }

  const result = await prisma.classified.createMany({
    data: classifiedData,
    skipDuplicates: true, // Prevents any duplicate errors from duplicate slugs
  });

  console.log(`Seeding db with ${result.count} classifieds 🎉`);
}
