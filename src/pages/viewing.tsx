import {useRouter} from "next/router";
import axios, {AxiosResponse} from "axios";
import {router} from "next/client";
import {useQuery} from "@tanstack/react-query";
import {Plant} from "@/models/plant.model";
import Image from "next/image";

export default function Viewing(){
    const Router = useRouter();

    const getPlantById = async () => {
        const resp: AxiosResponse <Plant> = await axios.get(`http://localhost:8080/api/plants/external/${apiId}`)
        return resp.data
    }
    const { apiId} = router.query as unknown as {
        apiId: number
    }

    const {data} = useQuery({
        queryKey:[`plantWithId${apiId}`],
        queryFn: getPlantById
    })
    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md text-center text-xl text-black">
                    <Image
                        src={data?.image}
                        alt={data?.plantName}
                        width={400}
                        height={400}
                        className="object-cover mb-4 rounded-full"
                    />
                    <p className="text-xl font-bold mb-2">{data?.plantName}</p>
                    <p className="mb-1">{data?.scientificName}</p>
                    <p className="mb-1">{data?.origin}</p>
                    <p className="mb-1">{data?.type}</p>
                    <p className="mb-1">{data?.dimension}</p>
                    <p className="mb-1">{data?.plantWatering}</p>
                    <p className="mb-1">{data?.plantSunlight}</p>
                    <p className="mb-1">{data?.propagation}</p>
                </div>
            </div>
        </>
    )
}