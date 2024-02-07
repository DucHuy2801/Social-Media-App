import Post from '../post/Post';
import './posts.scss'

const Posts = () => {
    //TEMPORARY
    const posts = [
        {
            id: 1,
            name: "John Doe",
            userId: 1,
            profilePic:
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
            desc: "The position property specifies the type of positioning method used for an element (static, relative, absolute, fixed, or sticky).",
            img: "https://th.bing.com/th/id/OIP.EdHUxcPpfeYKK1g6IQtcSAHaEK?w=290&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
            id: 2,
            name: "Jane Doe",
            userId: 2,
            profilePic:
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
            desc: "The position property specifies the type of positioning method used for an element (static, relative, absolute, fixed, or sticky).",
        },
    ];

    return (
        <div className="posts">
            {posts.map(post=>(
                <div className="post">
                    <Post post={post} key={post.id}/>
                </div>
            ))}
        </div>
    )
}

export default Posts