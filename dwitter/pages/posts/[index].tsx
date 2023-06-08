import { Happening } from "@/components/Happening"
import { Layout } from "@/components/Layout"
import { Profile } from "@/components/Profile"
import Image from "next/image"
import { useRouter } from "next/router"
import { calculateTimeDifference } from '@/utils/calculateTimeDifference';

import message from '@/assets/icons/message-square.svg';
import thumbsUp from '@/assets/icons/thumbs-up.svg';
import thumbsDown from '@/assets/icons/thumbs-down.svg';
import postService from "@/services/postService"
import arrowLeft from "@/assets/icons/arrow-left.svg"
import Link from "next/link"
import { useEffect, useState } from "react"

interface User {
    name: string;
    username: string;
    avatar: string;
    wallet: string;
}

interface Comment {
    name: string;
    username: string;
    avatar: string;
    wallet: string;
    comment: string;
}

interface Post {
    id: number;
    user: User;
    timestamp: string;
    post: string;
    type: string;
    image?: string;
    donationValue?: number;
    currency?: string;
    pollChoices?: { choice: string; checked: boolean }[];
    likes: User[];
    dislikes: User[];
    comments: Comment[];
}

const Post = () => {
    const router = useRouter()
    let index: string;

    const [currentPost, setCurrentPost] = useState<any>({
        id: "4178f4b9-845e-41e4-8818-f2cbdbf9451d",
        address: "0x000000000000000000",
        description: "Post de Teste, somente",
        image: null,
        unlisted: false,
        createdAt: "2023-06-07T04:42:53.216Z",
        updatedAt: "2023-06-07T04:42:53.216Z",
        authorId: "7bfe2b97-93bd-4cd2-99ec-90301082d008",
        author: {
            id: "7bfe2b97-93bd-4cd2-99ec-90301082d008",
            address: "0xdf013448797e4cb858e1ede170115a864a07efaf",
            email: "pepehaggehb@gmail.com",
            name: "Pedro Hagge Baptista",
            password: "$2b$08$d2v8FOR9nGBxmTktH/6tx.FphUS7oV8iqJxE3/buQPYU6Dag/xm/6",
            createdAt: "2023-06-07T04:01:36.674Z",
            updatedAt: "2023-06-07T04:01:36.674Z"
        }
    })

    const {
        description,
        author,
        timestamp,
        type,
        image,
        donationValue,
        currency,
        pollChoices,
        likes,
        dislikes,
        comments,
        likedByUser,
    } = currentPost;

    useEffect(() => {

        const fetchPost = async (postId: string) => {
            const post = await postService.getPost(postId)
            setCurrentPost(post.data)
            console.log(post.data)
        }

        fetchPost(router.query.index as string)

    }, [])

    return (
        <Layout>
            <div className='flex flex-1 w-full'>
                <Profile />

                <div className="w-1/2 mx-auto flex flex-col border-x border-gray-200">
                    <button onClick={() => router.back()} className="flex items-center hover:bg-gray-200 rounded-lg w-fit p-2 m-2">
                        <Image src={arrowLeft} width={16} height={16} alt="return" />
                        <p className="text-lg ml-2">Return</p>
                    </button>

                    <div className="border-b border-gray-200 flex flex-col p-4">
                        <div className="flex justify-between w-full mb-4">
                            <Link href={"/user/" + author.address} className="flex">
                                <Image
                                    src={author.avatar}
                                    loader={() => author.avatar}
                                    width={50}
                                    height={50}
                                    alt="avatar"
                                    className="rounded-full"
                                />

                                <div className="ml-4">
                                    <p className="font-semibold">
                                        {author.name} <span className="text-gray-400">@{author.username}</span>
                                    </p>
                                    <p className="text-gray-400">
                                        {author.address.trim().slice(0, 6)}...{author.address.trim().slice(-4)}
                                    </p>
                                </div>
                            </Link>

                            <p className="text-gray-400">{calculateTimeDifference(timestamp)} ago</p>
                        </div>

                        <div className="text-start mb-4">
                            <p className="text-md">{description}</p>
                        </div>

                        {type === 'image' && (
                            <div className="flex justify-center mb-4 items-center w-full">
                                <Image src={image} width={500} height={200} className='w-full rounded-lg' alt="post image" />
                            </div>
                        )}

                        {type === 'donation' && (
                            <div className="flex items-center ml-4">
                                <p className="font-semibold">
                                    {donationValue} {currency}
                                </p>
                            </div>
                        )}

                        {type === 'poll' && (
                            <div className="flex">
                                {pollChoices?.map((poll, index) => (
                                    <div className="flex items-center mr-4" key={index}>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                checked={poll.checked}
                                                onChange={() => { }}
                                            />
                                            <p>{poll.choice}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className='flex w-full mt-4'>
                            <div className="flex mr-4">
                                <button>{likedByUser ? <Image src={thumbsUp} width={24} height={24} alt="icon" /> : <Image src={thumbsDown} width={24} height={24} alt="icon" />}</button>
                                <p className='ml-2 text-[#757575]'>{1}</p>
                            </div>
                            <div className="flex mr-4">
                                <Image src={thumbsDown} width={24} height={24} alt="icon" />
                                <p className='ml-2 text-[#757575]'>{likes.length}</p>
                            </div>
                            <div className="flex">
                                <Image src={message} width={24} height={24} alt="icon" />
                                <p className='ml-2 text-[#757575]'>{comments.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4">
                        <div className="flex items-center mb-4 px-4 justify-between">
                            <p className="text-lg font-semibold">Comments</p>
{/* 
                            {comments.length > 0 && (
                                <p className="text-gray-400 ml-2">{comments.length} comments</p>
                            )}
                        </div>

                        {comments.length <= 0 && (
                            <p className="text-gray-400 ml-2 px-2">No comments yet</p>
                        )} */}
</div>
                        {/* {comments.map((comment, index) => (
                            <div className="flex flex-col w-full items-center mb-4 border-b border-gray-200 px-4" key={index}>
                                <div className="w-full justify-between flex">
                                    <Link href={"/user/" + comment.wallet} className="flex">
                                        <Image
                                            src={comment.avatar}
                                            loader={() => comment.avatar}
                                            width={50}
                                            height={50}
                                            alt="avatar"
                                            className="rounded-full"
                                        />

                                        <div className="ml-4">
                                            <p className="font-semibold">
                                                {comment.name} <span className="text-gray-400">@{comment.username}</span>
                                            </p>
                                            <p className="text-gray-400">
                                                {comment.address.trim().slice(0, 6)}...{comment.address.trim().slice(-4)}
                                            </p>
                                        </div>
                                    </Link>

                                    <p className="text-gray-400 ml-4">{calculateTimeDifference(timestamp)} ago</p>
                                </div>

                                <p className="text-md w-full mt-4">{comment.comment}</p>
                            </div>
                        ))} */}
                    </div>
                </div>

                <Happening />
            </div>
        </Layout>
    )
}

export default Post