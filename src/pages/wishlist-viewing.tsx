import { useState} from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Plant } from "@/models/plant.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeart as faHeartRegular } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/state/store";
import { selectCurrentUser } from "@/state/user.reducer";
import {Button, Link} from "@nextui-org/react";
import Comments from "@/components/comments";
import MapComponent from "@/components/map";


export default function Viewing() {
    const currentUser = useAppSelector(selectCurrentUser);
    const router = useRouter();
    const { apiId } = router.query as unknown as { apiId: number };
    const [isInWishlist, setIsInWishlist] = useState(true);

    const getPlantByApiId = async () => {
        const resp: AxiosResponse<Plant> = await axios.get(`http://localhost:8080/api/plants/external/${apiId}`);
        return resp.data;
    };

    const { data } = useQuery({
        queryKey: [`plantWithId${apiId}`],
        queryFn: getPlantByApiId,
    });

    const wishlistToggle = async () => {
        try {
            if (isInWishlist) {
                await axios.delete(`http://localhost:8080/api/wishlist/${currentUser.userEmail}/${data?.apiId}`);
            }
            setIsInWishlist(!isInWishlist);
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };

    return (
        <div className="flex flex-row items-start justify-center min-h-screen space-x-8 p-4">
            <div className="w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg text-center text-xl text-black">
                <h1 className="text-2xl mb-4">{currentUser.userName}'s Wishlist</h1>
                <Image
                    src={data?.image}
                    alt={data?.plantName}
                    width={400}
                    height={400}
                    className="object-cover mb-4 rounded-full"
                />
                <p className="text-xl font-bold mb-2">{data?.plantName}</p>
                <p className="mb-1">Scientific name: {data?.scientificName}</p>
                <p className="mb-1">Origin: {data?.origin}</p>
                <p className="mb-1">Type: {data?.type}</p>
                <p className="mb-1">Measurements: {data?.dimension}</p>
                <p className="mb-1">Watering needs: {data?.plantWatering}</p>
                <p className="mb-1">Sunlight needs: {data?.plantSunlight}</p>
                <p className="mb-1">Propagation: {data?.propagation}</p>
                <p className="mt-2">Add to Wishlist?
                    <span onClick={wishlistToggle} className="cursor-pointer mt-6 ml-4">
                {isInWishlist ? (
                    <FontAwesomeIcon icon={faHeart} className="text-black text-2xl"/>
                ) : (
                    <FontAwesomeIcon icon={faHeartRegular} className="text-white text-2xl"/>
                )}
            </span>
                </p>
                <Button className="bg-black mt-6">
                    <Link href="/wishlist" className="text-white-200">Back to your wishlist</Link>
                </Button>
            </div>
            <Comments apiId={apiId}/>
            <MapComponent apiId={apiId}/>
        </div>

    );
}