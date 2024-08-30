import {useAppSelector} from "@/state/store";
import {selectCurrentUser }from "@/state/user.reducer";
import {useRouter} from "next/router";
import {Key} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";


export default function Home(){
    const currentUser= useAppSelector(selectCurrentUser);
    const router = useRouter();


    const {data} = useQuery({
        queryKey: ["plants"],
        queryFn: getPlants
    })

    async function getPlants(){
        const response= await axios.get(`http://localhost:8080/api/wishlist/${currentUser.userEmail}`);
        return response.data;
    }

    const passingId = (d: any) => {
        router.push({
            pathname: "/wishlist-viewing",
            query: {
                apiId: d.apiId
            },
        });
    };
    return(
        <>
            <div className="container mx-auto px-4">
                <h1 className="text-2xl">{currentUser.userName}'s Wishlist</h1>
                <div className="flex flex-wrap-m-4">
                    {data?.map((d:{
                        apiId:Key|null|undefined;
                        image:string|StaticImport;
                        plantName:string
                    })=>(
                    <div key={d.apiId} className="w-full sm:w-1/2 md:w-1/3 p-4">
                        <div className="p-2 text-center rounded-md">
                            <div className="flex justify-center mb-4">
                                <Image src={d.image}
                               alt={d.plantName}
                               width={300}
                               height={300}
                               className="object-cover"
                               onClick={() => passingId(d)}
                            />
                            </div>
                        <p className="text-lg font-medium">{d.plantName}</p>
                        </div>
                     </div>
                    ))}
                </div>
            </div>
        </>
    );
}
