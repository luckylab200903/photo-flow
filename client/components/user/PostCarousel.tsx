import Image from "next/image";

const posts = [
  {
    images: [{ url: "/img/posts/1.jpg" }],
  },
  {
    images: [{ url: "/img/posts/2.jpg" }],
  },
  {
    images: [{ url: "/img/posts/3.jpg" }],
  },
  {
    images: [{ url: "/img/posts/4.jpg" }],
  },
  {
    images: [{ url: "/img/posts/5.jpg" }],
  },
  {
    images: [{ url: "/img/posts/6.jpg" }],
  },
  {
    images: [{ url: "/img/posts/7.jpeg" }],
  },
];
const PostCarousel = ({ }) => {
  return (
    <div className="mt-10 px-5 w-full md:w-[70vw]">
      {posts.length === 0 ? (
        <div>No Posts</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {posts.map((post, index) => (
            <Image
              key={index}
              src={post.images[0].url}
              className="rounded-xl aspect-video w-full object-cover"
              width={200}
              height={200}
              alt="Auth Background"
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default PostCarousel;
