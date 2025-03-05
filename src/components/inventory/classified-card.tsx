import { HtmlParser } from "@/components/shared/html-parser";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { ClassifiedWithImages, MultiStepFormEnum } from "@/config/types";
import { Colour, FuelType, OdoUnit, Transmission } from "@prisma/client";
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
}

function formatNumber(num: number | null, options?: Intl.NumberFormatOptions) {
  if (!num) return 0;

  return new Intl.NumberFormat("en-US", options).format(num);
}

function formatOdometerUnit(unit: OdoUnit) {
  return OdoUnit.MILES ? "mi" : "km";
}

function formatTransmission(transmission: Transmission) {
  return Transmission.MANUAL ? "Manual" : "Automatic";
}

function formatFuelType(fuelType: FuelType) {
  switch (fuelType) {
    case FuelType.DIESEL:
      return "Diesel";
    case FuelType.GASOLINE:
      return "Gasoline";
    case FuelType.HYBRID:
      return "Hybrid";
    case FuelType.ELECTRIC:
      return "Electric";
    case FuelType.PETROL:
      return "Petrol";
    default:
      return "Unknown";
  }
}

function formatColour(colour: Colour) {
  switch (colour) {
    case "BLACK":
      return "Black";
    case "BLUE":
      return "Blue";
    case "BROWN":
      return "Brown";
    case "GREY":
      return "Grey";
    case "GREEN":
      return "Green";
    case "AQUA":
      return "Aqua";
    case "ORANGE":
      return "Orange";
    case "PURPLE":
      return "Purple";
    case "PINK":
      return "Pink";
    case "RED":
      return "Red";
    case "SILVER":
      return "Silver";
    case "WHITE":
      return "White";
    case "YELLOW":
      return "Yellow";
    case "GOLD":
      return "Gold";
    case "CYAN":
      return "Cyan";
    case "MAGENTA":
      return "Magenta";
    case "TEAL":
      return "Teal";
    case "LIME":
      return "Lime";
    case "OLIVE":
      return "Olive";
    case "NAVY":
      return "Navy";
    case "MAROON":
      return "Maroon";
    case "CORAL":
      return "Coral";
    case "VIOLET":
      return "Violet";
    default:
      return "Unknown";
  }
}

const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
  return [
    {
      id: "odoReading",
      icon: <GaugeCircle className="size-4" />,
      value: `${formatNumber(classified?.odoReading)} ${formatOdometerUnit(classified.odoUnit)}`,
    },
    {
      id: "transmission",
      icon: <Cog className="size-4" />,
      value: classified?.transmission
        ? formatTransmission(classified.transmission)
        : "Unknown",
    },
    {
      id: "fuelType",
      icon: <Fuel className="size-4" />,
      value: classified?.fuelType
        ? formatFuelType(classified.fuelType)
        : "Unknown",
    },
    {
      id: "colour",
      icon: <Paintbrush2 className="size-4" />,
      value: classified?.colour ? formatColour(classified.colour) : "Unknown",
    },
  ];
};

export const ClassifiedCard = (props: ClassifiedCardProps) => {
  const { classified } = props;
  return (
    <div className="relative flex flex-col overflow-hidden rounded-md bg-white shadow-md">
      <div className="relative aspect-3/2">
        <Link href={routes.singleClassified(classified.slug)}>
          <Image
            placeholder="blur"
            blurDataURL={classified.images[0]?.blurHash}
            src={classified.images[0]?.src}
            alt={classified.images[0]?.alt}
            className="object-cover"
            fill={true}
            quality={25}
          />
        </Link>
        <div className="bg-primary absolute top-2.5 right-3.5 rounded px-2 py-1 font-bold text-slate-50">
          <p className="text-xs font-semibold lg:text-base xl:text-lg">
            {classified.price}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-3 p-4">
        <div>
          <Link
            href={routes.singleClassified(classified.slug)}
            className="hover:text-primary line-clamp-1 text-sm font-semibold transition-colors md:text-base lg:text-lg"
          >
            {classified.title}
          </Link>
          {classified?.description && (
            <div className="line-clamp-2 text-xs text-gray-500 md:text-sm xl:text-base">
              <HtmlParser html={classified.description} />
              &nbsp;
            </div>
          )}
          <ul className="grid w-full grid-cols-1 grid-rows-4 items-center justify-between text-xs text-gray-600 md:grid-cols-2 md:grid-rows-4 md:text-sm xl:flex">
            {getKeyClassifiedInfo(classified)
              .filter((v) => v.value)
              .map(({ id, icon, value }) => (
                <li
                  key={id}
                  className="flex items-center gap-x-1.5 font-semibold xl:flex-col"
                >
                  {icon} {value}
                </li>
              ))}
          </ul>
        </div>
        <div className="mt-4 flex w-full flex-col space-y-2 lg:flex-row lg:space-y-0 lg:gap-x-2">
          <Button
            className="hover:bg-primary h-full flex-1 py-2 text-xs transition-colors duration-300 hover:border-white hover:text-white md:text-sm lg:py-2.5 xl:text-base"
            asChild
            variant="outline"
            size="sm"
          >
            <Link
              href={routes.reserve(classified.slug, MultiStepFormEnum.WELCOME)}
            >
              Reserve
            </Link>
          </Button>
          <Button
            className="h-full flex-1 py-2 text-xs md:text-sm lg:py-2.5 xl:text-base"
            asChild
            size="sm"
          >
            <Link href={routes.singleClassified(classified.slug)}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
