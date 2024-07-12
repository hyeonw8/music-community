"use client";
import useComment from "@/hooks/useComment";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import { convertDateFormat } from "@/lib/utils/convertDateFormat";

interface ArtistCommentsProps {
  params: { id: string };
}

const ArtistComments = ({ params }: ArtistCommentsProps) => {
  const artistId = params.id;
  const queryKey = "artistComments";
  const tableName = "artistComments";

  const {
    data: artistCommentList,
    error,
    isPending,
    isSuccess,
    commentRef,
    isEditing,
    editingCommentId,
    editingContent,
    setEditingContent,
    handleSubmitComment,
    handleEditComment,
    handleDeleteComment
  } = useComment({
    queryKey,
    id: artistId,
    tableName
  });

  if (isPending) {
    return <div>댓글 불러오는 중...</div>;
  }
  if (error) {
    return <div>댓글 불러오기 실패</div>;
  }
  return (
    <>
      <h3 className="font-medium mb-2 mt-4">Comment</h3>
      <div className="w-full border-2 border-gray-300 h-full rounded-lg p-5 max-h-[310px]">
        <div className="flex flex-col px-10 pb-4 justify-center items-center h-full w-full">
          <form
            className="w-full min-h-300px rounded-lg border-2 border-gray-300 bg-inherit flex mb-3 p-4"
            onSubmit={(e) => handleSubmitComment(e)}
          >
            <input
              ref={commentRef}
              type="text"
              className="w-full outline-none indent-2.5 h-14"
              placeholder="댓글을 남겨주세요!"
            />
            <button className="flex items-center">
              <BsPencilSquare />
            </button>
          </form>
          <ul className="w-full max-h-[250px] h-full overflow-y-scroll scrollbar-hide px-2">
            {isSuccess &&
              artistCommentList?.map((comment) => {
                return (
                  <li className="shadow rounded-lg mb-2 p-1" key={comment.id}>
                    <div className="flex flex-col p-2 gap-3">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold w-[100px] truncate">{comment.users?.nickname}</span>
                          <span className="text-xs text-slate-400">{convertDateFormat(comment.createdAt ?? "")}</span>
                        </div>
                        <div>
                          <button className="mr-1">
                            <RiEditFill onClick={() => handleEditComment(comment.id)} />
                          </button>
                          <button>
                            <RiDeleteBinLine onClick={() => handleDeleteComment(comment.id)} />
                          </button>
                        </div>
                      </div>
                      {isEditing && editingCommentId === comment.id ? (
                        <textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="resize-none outline-none border border-gray-500 mt-5 w-full h-[80px] rounded-md p-1"
                        ></textarea>
                      ) : (
                        <p>{comment.content ?? undefined}</p>
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ArtistComments;
