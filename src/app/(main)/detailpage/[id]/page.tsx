import Post from "../_component/Post";
import Comment from "../_component/Comment";

const DetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="rounded-xl">
      <Post id={params.id} />
      <Comment id={params.id} />
    </div>
  );
};

export default DetailPage;
