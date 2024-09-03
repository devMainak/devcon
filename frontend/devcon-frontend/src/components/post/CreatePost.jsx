import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addPostAsync } from "../../features/posts/postsSlice";

const CreatePost = () => {
  // Configuring useDispatch() for usage
  const dispatch = useDispatch();

  // Accessing staticUser
  const { user } = useSelector((state) => state.staticUser);

  // State bindings for form data
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [fileType, setFileType] = useState("");
  const [mediaPerview, setMediaPreview] = useState("");
  const [alert, setAlert] = useState("");
  const [postButton, setPostButton] = useState("Post");

   // Bindings for cloud file storage
   const url = "https://api.cloudinary.com/v1_1/dase6jnks/upload";
   const preset = "myCloud";

  // Handle files
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaPreview(URL.createObjectURL(file));
      if (file.type.startsWith("image/")) {
        setFileType("image");
      } else if (file.type.startsWith("video/")) {
        setFileType("video");
      }
    }
  };

  // Creating a post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setPostButton("Posting");
    const formData = new FormData();
    formData.append("file", media);
    formData.append("upload_preset", preset);
    try {
      if (media) {
        const res = await axios.post(url, formData);
        const mediaUrl = res.data.secure_url;
        if (content && mediaUrl && fileType && user) {
          const post = {
            author: {
              name: user.name,
              username: user.username,
              userImageUrl: user.userImageUrl,
            },
            content,
            media: [{ url: mediaUrl, type: fileType }],
          };
          const resultAction = await dispatch(addPostAsync(post));
          if (addPostAsync.fulfilled.match(resultAction)) {
            setPostButton("Post");
            // Clearing the form
            setContent("");
            setMedia(null);
            setFileType("");
            // Making the alert
            setAlert("Posted!");
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }
        } else {
          setPostButton("Post");
          setAlert("Failed to post.");
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }
      } else {
        if (content && user) {
          const post = {
            author: {
              name: user.name,
              username: user.username,
              userImageUrl: user.userImageUrl,
            },
            content,
          };
          const resultAction = await dispatch(addPostAsync(post));
          if (addPostAsync.fulfilled.match(resultAction)) {
            setPostButton("Post");
            // Clearing the form
            setContent("");
            setMedia(null);
            setFileType("");
            // Making the alert
            setAlert("Posted!");
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }
        } else {
          setPostButton("Post");
          setAlert("Failed to post.");
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="fs-3 fw-semibold">Create a post</div>
      <div className="card my-2 py-3">
        <div className="d-flex px-3" style={{ gap: "10px" }}>
          <div className="flex-grow-1 w-100">
            <form onSubmit={handlePostSubmit}>
              <textarea
                className="bg-body-secondary p-2"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                style={{ width: "100%", borderRadius: "5px" }}
                maxLength={100}
                rows={4}
                placeholder="Share something..."
              ></textarea>
              {mediaPerview && (
                <div className="py-3">
                  {fileType === "image" && (
                    <img
                      src={mediaPerview}
                      alt="Preview"
                      style={{ maxHeight: "250px", minWidth: "100%" }}
                    />
                  )}
                  {fileType === "video" && (
                    <video
                      controls
                      style={{ maxHeight: "250px", minWidth: "100%" }}
                    >
                      <source src={mediaPerview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
              <div
                className="d-flex justify-content-between"
                style={{ gap: "10px" }}
              >
                <div>
                  <label htmlFor="fileInput">
                    <i
                      className="fa-sharp fa-solid fa-camera-retro fs-5"
                      style={{ cursor: "pointer" }}
                    ></i>
                    <span className="px-2">Upload Image/Video</span>
                  </label>
                  <input
                    onChange={handleFileChange}
                    id="fileInput"
                    accept="image/*,video/*"
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    disabled={postButton !== "Post" ? true : false}
                    type="submit"
                  >
                    {postButton}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {alert && (
        <div
          className={`alert alert-${
            alert === "Posted!" ? "success" : "danger"
          }`}
          role="alert"
        >
          {alert}
        </div>
      )}
    </div>
  );
};

export default CreatePost;
