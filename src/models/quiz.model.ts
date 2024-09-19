export type QuizRequest = {
    userName: string;
    plantSunlight?: string;
    plantWatering?: string;
    edible?: boolean;
    poisonous?: boolean;
    cycle?: string;
    hardiness?: number;
    indoor?: boolean;
};

export type QuizResponse = {
    userName: string;
    plantSunlight?: string;
    plantWatering?: string;
    edible?: boolean;
    poisonous?: boolean;
    cycle?: string;
    hardiness?: number;
    indoor?: boolean;
};