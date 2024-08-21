import {useAppSelector} from "@/state/store";
import {selectCurrentUser} from "@/state/user.reducer";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Key, useEffect} from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {useRouter} from "next/router";

export default function Home() {
    const currentUser = useAppSelector(selectCurrentUser);
    const router = useRouter();

    const {data} = useQuery({
        queryKey: ["plants"],
        queryFn: getPlants
    })

    async function getPlants() {
        const response = await axios.get(`http://localhost:8080/api/plants`);
        return response.data;
    }

    useEffect(() => {
        if (!currentUser) {
            router.push("/login");
        }
    }, [currentUser, router]);

    const passingId = (d: any) => {
        router.push({
            pathname: "/viewing",
            query: {
                apiId: d.apiId
            },
        });
    };
    return (
        <>
            <h1 className="text-center text-xl font-bold mb-6">
                {currentUser
                    ? `Welcome ${currentUser.firstName}, you are logged in!`
                    : 'Welcome, you are not currently logged in!'}
            </h1>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -m-4">
                    {data?.map((d: { apiId: Key | null | undefined; image: string | StaticImport; plantName: string }) => (
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
