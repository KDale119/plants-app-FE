import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Plant } from "@/models/plant.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/state/store";
import { selectCurrentUser } from "@/state/user.reducer";
import { Wishlist } from "@/models/wishlist.model";
import dynamic from "next/dynamic";
import Comments from "@/components/comments";
import {useSearchParams} from "next/navigation";

const MapComponent = dynamic(() => import('../components/map'), {
    ssr: false
});

export default function Viewing() {
    const currentUser = useAppSelector(selectCurrentUser);
    const router = useRouter();
    const { apiId } = router.query as unknown as { apiId: number };
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [wishlist, setWishlist] = useState<Wishlist[]>([]);
    const [itemId, setItemId] = useState<number | null>(null);

    const getPlantByApiId = async () => {
        const resp: AxiosResponse<Plant> = await axios.get(`http://18.188.80.135:8080/api/plants/external/${apiId}`);
        return resp.data;
    };

    const { data } = useQuery({
        queryKey: [`plantWithId${apiId}`],
        queryFn: getPlantByApiId,
    });

    const searchParams = useSearchParams();
    useEffect(() => {
        const getWishlist = async () => {
            try {
                if (apiId) {
                    const response = await axios.get(`http://18.188.80.135:8080/api/wishlist/${currentUser.userEmail}`);
                    const wishlist = response.data;
                    setWishlist(wishlist);

                    const item = wishlist.find((item: { id: number | undefined; }) => item.id === Number(searchParams.get('apiId')));

                    if (item) {
                        setItemId(item.id);
                        setIsInWishlist(true);
                    } else {
                        setIsInWishlist(false)
                    }
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        getWishlist();
    }, [currentUser.userEmail, data, apiId]);



    const newWishlistItem: Wishlist = {
        emailAddress: currentUser.userEmail,
        plantExternalApiId: data?.apiId,
    };

    const wishlistToggle = async () => {
        try {
            if (isInWishlist) {
                await axios.delete(`http://18.188.80.135:8080/api/wishlist/${currentUser.userEmail}/${data?.apiId}`);
            } else {
                await axios.post(`http://18.188.80.135:8080/api/wishlist`, newWishlistItem);
            }

            setIsInWishlist((prev) => !prev);
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };

    return (
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
                <p className="mb-1">Scientific name: {data?.scientificName}</p>
                <p className="mb-1">Origin: {data?.origin}</p>
                <p className="mb-1">Type: {data?.type}</p>
                <p className="mb-1">Measurements: {data?.dimension}</p>
                <p className="mb-1">Watering needs: {data?.plantWatering}</p>
                <p className="mb-1">Sunlight needs: {data?.plantSunlight}</p>
                <p className="mb-1">Propagation: {data?.propagation}</p>
                <p className="mt-2">
                    Add to Wishlist?
                    <span onClick={wishlistToggle} className="cursor-pointer mt-6 ml-4">
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={`text-2xl ${isInWishlist ? 'text-black' : 'text-white'}`}
                        />
                    </span>
                </p>
                <Comments apiId={apiId}/>
            </div>

            <MapComponent apiId={apiId}/>
        </div>
    );
}
