import { useState, useEffect } from 'react';
import axios from 'axios';
import {useAppSelector} from "@/state/store";
import {selectCurrentUser} from "@/state/user.reducer";
import {Button} from "@nextui-org/react";
import {useQuery} from "@tanstack/react-query";

interface CommentsProps {
    apiId: number | undefined;
}


function Comments({ apiId }: CommentsProps) {
    const currentUser = useAppSelector(selectCurrentUser);
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');

    const {data, refetch } = useQuery({
        queryKey: ["comments"],
        queryFn: getComments
    })

    async function getComments() {
        const response = await axios.get(`http://localhost:8080/api/comments/${apiId}`);
        setComments(response.data)
        return response.data;
    }

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/comments/${currentUser.userName}/${apiId}`, {
                comment: newComment,
                username: currentUser.userName,
            });
            setComments(response.data);
            setNewComment('');
        } catch (error) {
            setError('Failed to submit comment');
        }
        await refetch();
    };

    return (
        <div className="p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Comments</h3><br/><br/>
            <div className="space-y-4">
                {data?.map((userComment: any) => (
                    <h4 key={userComment.commentId} className="border-b pb-2">
                        <p className="text-gray-700">
                            <strong className="text-gray-900">{userComment.username}:</strong> <br/>
                            {userComment.comment}
                        </p><br/>
                    </h4>
                ))}
            </div>

            <div className="mt-4">
        <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded-md text-white"
        />
                <Button
                    onClick={handleCommentSubmit}
                    className="mt-2 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Submit
                </Button>
            </div>
        </div>

    );
}

export default Comments;
