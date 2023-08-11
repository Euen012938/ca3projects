import { useState } from "react";

export default function CommentRow({ item, editComment, deleteComment }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(item.Comments);

  const onToggleEdit = () => {
    if (edit) {
      editComment({ Comments: value, ID: item.ID });
    }
    setEdit(!edit);
  };

  return (
    <div
      style={{
        marginTop: "20px",
        border: "1px solid black",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <textarea
        cols="40"
        rows="3"
        style={{
          padding: "4px 10px",
          flex: 1,
          marginRight: "50px",
          borderRadius: "8px",
        }}
        disabled={!edit}
        type="text"
        name="HealthTerms"
        value={value}
        placeholder="Health Terms"
        onChange={(e) => setValue(e.target.value)}
      />
      <div style={{ flexDirection: "row", display: "flex" }}>
        <button style={{ marginRight: "10px" }} onClick={onToggleEdit}>
          {edit ? "Save" : "Edit"}
        </button>
        <button onClick={() => deleteComment({ ID: item.ID })}>Remove</button>
      </div>
    </div>
  );
}
