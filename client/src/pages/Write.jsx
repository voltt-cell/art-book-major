import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "sketch"}
              name="cat"
              value="sketch"
              id="sketch"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="sketch">Sketch</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "stencil"}
              name="cat"
              value="stencil"
              id="stencil"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="stencil">Stencil</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "painting"}
              name="cat"
              value="painting"
              id="painting"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="painting">Painting</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "silhouette"}
              name="cat"
              value="silhouette"
              id="silhouette"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="silhouette">Silhouette</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "mandala"}
              name="cat"
              value="mandala"
              id="mandala"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="mandala">Mandala</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "other"}
              name="cat"
              value="other"
              id="other"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
