import React from 'react'
import Comment from "./Comment";
import { useForm } from "react-hook-form";

const CommentList = (props) => {
  const { register, handleSubmit } = useForm();
  console.log(props.comments[0]);

  async function onSubmit(data){
    props.setComments(comments => [...comments, data.comment]);
    // alert(JSON.stringify(data.comment));
  };

  return (
    <div className="commentList">
    <h5 className="text-muted mb-4">
      <span className="badge badge-success">{props.comments.length}</span>{" "}
      Comment{props.comments.length > 0 ? "s" : ""}
    </h5>

    {props.comments.length === 0 && !props.loading ? (
      <div className="alert text-center alert-info">
        Be the first to comment
      </div>
    ) : null}

    {props.comments.map((comment, index) => (
      <Comment key={index} comment={comment} />
    ))}

    <form onSubmit = {handleSubmit(onSubmit)}>
      <input name="name" ref={register} placeholder="Name" />
      <input name="comment" ref={register} placeholder="Your Comment" />
      <input type="submit" />
    </form>
  </div>
  )
}

export default CommentList
