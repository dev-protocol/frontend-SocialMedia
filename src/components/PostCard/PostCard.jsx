import React, { useState, useEffect } from 'react';
import { likeOrNot } from '../../services/apiCalls';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import './PostCard.css'

const PostCard = ({ post }) => {
  const { token } = useAuth();
  
  useEffect(() => {
    console.log('PostCard recibió:', post);
    console.log('post.user:', post.user);
    console.log('post.likes:', post.likes);
  }, [post]);

  const [likes, setLikes] = useState(post?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);

  if (!post || !post.user) {
    console.error('Post o post.user es null o undefined:', post);
    return <div>Error: Datos del post no válidos</div>;
  }

  const {
    user,
    description = '',
    image = null,
    createdAt = '',
  } = post;

  const {
    profilePicture = '',
    first_name = 'Unknown',
    last_name = 'User',
    user_name = 'user',
  } = user;

  const toggleLike = async () => {
    try {
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
      setIsLiked((prevIsLiked) => !prevIsLiked);

      const response = await likeOrNot(post._id, token);

      if (!response.success) {
        setLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));
        setIsLiked((prevIsLiked) => !prevIsLiked);
        console.error(response.message);
      } else {
        console.log('Response:', response.message);
      }
    } catch (error) {
      setLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));
      setIsLiked((prevIsLiked) => !prevIsLiked);
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <div className='post-card'>
      <div className='post-header'>
        <img
          className='profile-picture-post'
          src={profilePicture}
          alt={`${first_name} ${last_name}`}
        />
        <div className='user-info'>
          <h4 className='user-name'>
            {first_name} {last_name}
          </h4>
          <h6 className='user-username'>@{user_name}</h6>
        </div>
        <p className='post-date'>{new Date(createdAt).toLocaleDateString()}</p>
      </div>
      <div className='post-body'>
        <p className='post-description'>{description}</p>
        {image && (
          <img
            className='post-image'
            src={image}
            alt='Post'
          />
        )}
      </div>
      <div className='post-footer'>
        <button
          onClick={toggleLike}
          className={`like-button ${isLiked ? 'liked' : ''}`}>
          {isLiked ? 'Unlike' : 'Like'}
        </button>
        <span className='likes-counter'>
          {likes} {likes === 1 ? 'Like' : 'Likes'}
        </span>
      </div>
    </div>
  );
};


export default PostCard;
// import React, { useState } from 'react';
// import { likeOrNot } from '../../services/apiCalls';
// import { useAuth } from '../../contexts/AuthContext/AuthContext';

// const PostCard = ({ post }) => {
//   const { token } = useAuth();
//   const [likes, setLikes] = useState(post.likes?.length || 0);
//   const [isLiked, setIsLiked] = useState(post.isLiked || false);

//   const {
//     user = {},
//     description = '',
//     image = null,
//     createdAt = '',
//   } = post;

//   const {
//     profilePicture = '',
//     first_name = 'Unknown',
//     last_name = 'User',
//     user_name = 'user',
//   } = user;

//   const toggleLike = async () => {
//     try {
//       setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
//       setIsLiked((prevIsLiked) => !prevIsLiked);

//       const response = await likeOrNot(post._id, token);

//       if (!response.success) {
//         setLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));
//         setIsLiked((prevIsLiked) => !prevIsLiked);
//         console.error(response.message);
//       } else {
//         console.log('Response:', response.message);
//       }
//     } catch (error) {
//       setLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));
//       setIsLiked((prevIsLiked) => !prevIsLiked);
//       console.error('Error liking/unliking post:', error);
//     }
//   };

//   return (
//     <div className='post-card'>
//       <div className='post-header'>
//         <img
//           className='profile-picture-post'
//           src={profilePicture}
//           alt={`${first_name} ${last_name}`}
//         />
//         <div className='user-info'>
//           <h4 className='user-name'>
//             {first_name} {last_name}
//           </h4>
//           <h6 className='user-username'>@{user_name}</h6>
//         </div>
//         <p className='post-date'>{new Date(createdAt).toLocaleDateString()}</p>
//       </div>
//       <div className='post-body'>
//         <p className='post-description'>{description}</p>
//         {image && (
//           <img
//             className='post-image'
//             src={image}
//             alt='Post'
//           />
//         )}
//       </div>
//       <div className='post-footer'>
//         <button
//           onClick={toggleLike}
//           className={`like-button ${isLiked ? 'liked' : ''}`}>
//           {isLiked ? 'Unlike' : 'Like'}
//         </button>
//         <span className='likes-counter'>
//           {likes} {likes === 1 ? 'Like' : 'Likes'}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default PostCard;