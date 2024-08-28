import {StaticImport} from "next/dist/shared/lib/get-img-props";

export type Plant = {
    plantId: number | undefined;
    apiId: number;
    plantName: string;
    dimension: string;
    type: string;
    plantSunlight: string;
    plantWatering: string;
    image: string | StaticImport | undefined;
    quantity: string;
    scientificName: string;
    origin: string;
    propagation: string;
};