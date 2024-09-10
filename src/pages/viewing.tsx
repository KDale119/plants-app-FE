import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Plant } from "@/models/plant.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeart as faHeartRegular } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/state/store";
import { selectCurrentUser } from "@/state/user.reducer";
import { Wishlist } from "@/models/wishlist.model";
import Comments from "@/componenets/comments";

export default function Viewing() {
    const currentUser = useAppSelector(selectCurrentUser);
    const router = useRouter();
    const { apiId } = router.query as unknown as { apiId: number };
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [itemId, setItemId] = useState(null);

    const getPlantByApiId = async () => {
        const resp: AxiosResponse<Plant> = await axios.get(`http://localhost:8080/api/plants/external/${apiId}`);
        return resp.data;
    };

    const { data } = useQuery({
        queryKey: [`plantWithId${apiId}`],
        queryFn: getPlantByApiId,
    });

    useEffect(() => {
        const getWishlist = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/wishlist/${currentUser.userEmail}`);
                const wishlist = response.data;
                setWishlist(wishlist);

                const itemId = data?.apiId;
                const item = wishlist.find((item: { id: number | undefined; }) => item.id === itemId);

                if (item) {
                    setItemId(item.id);
                    setIsInWishlist(true);
                } else {
                    setIsInWishlist(false)
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        getWishlist();
    }, [currentUser.userEmail]);

    const newWishlistItem: Wishlist = {
        emailAddress: currentUser.userEmail,
        plantExternalApiId: data?.apiId,
    };

    const wishlistToggle = async () => {
        try {
            if (isInWishlist) {
                await axios.delete(`http://localhost:8080/api/wishlist/${currentUser.userEmail}/${data?.apiId}`);
                setIsInWishlist(false)
            } else {
                await axios.post(`http://localhost:8080/api/wishlist`, newWishlistItem);
                setIsInWishlist(true)
            }
            setIsInWishlist(!isInWishlist);
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
                <p className="mb-1"> Scientific name: {data?.scientificName}</p>
                <p className="mb-1">Origin: {data?.origin}</p>
                <p className="mb-1">Type: {data?.type}</p>
                <p className="mb-1">Measurements: {data?.dimension}</p>
                <p className="mb-1"> Watering needs: {data?.plantWatering}</p>
                <p className="mb-1">Sunlight needs: {data?.plantSunlight}</p>
                <p className="mb-1">Propagation: {data?.propagation}</p>
                <p className="mt-2">Add to Wishlist?
                    <span onClick={wishlistToggle} className="cursor-pointer mt-6 ml-4">
                        {isInWishlist ? (
                            <FontAwesomeIcon icon={faHeart} className="text-black text-2xl" />
                        ) : (
                            <FontAwesomeIcon icon={faHeartRegular} className="text-white text-2xl" />
                        )}
                    </span>
                </p>
                <Comments apiId={data?.apiId} />
            </div>
        </div>
    );
}