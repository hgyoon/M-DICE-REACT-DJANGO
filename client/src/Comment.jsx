import React from "react";

export default function Comment(props) {
  const message = props.comment;

  return (
    <div className="media mb-3">
      <div className="media-body p-2 shadow-sm rounded bg-light border">
        {/* <small className="float-right text-muted">{time}</small> */}
        {/* <h6 className="mt-0 mb-1 text-muted">{name}</h6> */}
        {message}
      </div>
    </div>
  );
}