import {Key, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {useAppDispatch, useAppSelector} from "@/state/store";
import {getQuizById, getQuizByUsername} from "@/state/quiz.reducer";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import _ from "lodash";

export default function QuizDetails() {
    const router = useRouter();
    const { quizId } = router.query as unknown as { quizId: number };
    const [quizData, setQuizData] = useState();
    const dispatch = useAppDispatch();

    useEffect(() => {(async () => {
        if (quizId) {
            let response = null;
            try {
                response = await dispatch(getQuizById(quizId));
                if(response.payload?.status === 200){
                   setQuizData(response.payload.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
    })()}, [quizId]);

    const passingId = (d: any) => {
        router.push({
            pathname: "/viewing",
            query: {
                apiId: d.apiId
            },
        });
    };

    function jsonToOutline (json = {}) {
        const output: React.ReactNode[] = [];
        let prunedData = _.pickBy(json, _.identity);

        delete prunedData.userName;
        delete prunedData.quizId;
        delete prunedData.quizResults;

        for (const key in prunedData) {
            const value = prunedData[key];
            output.push((<li><p><strong>{_.startCase(key)}</strong>{_.isPlainObject(value) ? '' : `: ${_.startCase(value)}`}</p></li>));

            if (_.isPlainObject(value)) {
                const recursiveJson = jsonToOutline(value); // recursively call
                output.push((recursiveJson));
            }
        }
        return <ul>{output}</ul>;
    }

    return (
        <>
            <h1>Your results are in!</h1>
            <div>{jsonToOutline(quizData?.quiz)}</div>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -m-4">
                    {quizData?.plantDetails?.map((d: {
                        apiId: Key | null | undefined;
                        image: string | StaticImport;
                        plantName: string
                    }) => (
                        <div key={d.apiId} className="w-full sm:w-1/2 md:w-1/3 p-4">
                            <div className="p-2 text-center rounded-md">
                                <div className="flex justify-center mb-4">
                                    <Image src={d.image ?? undefined}
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
