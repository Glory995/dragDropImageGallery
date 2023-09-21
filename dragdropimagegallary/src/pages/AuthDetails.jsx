import React, { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import first from '../imgs/DataScience.png';
import secon from '../imgs/DigitalMarketing.png';
import third from '../imgs/Graphics.png';
import fourt from '../imgs/Iee.png';
import "./AuthDetails.css";
import logo from '../imgs/iG logo.png'

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredImages, setFilteredImages] = useState([]); // State for filtered images

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);



  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const initialImages = [
    { id: '1', src: first, isDragging: false, tags: ["Data Science", "Technology"] },
    { id: '2', src: secon, isDragging: false, tags: ["Digital Marketing", "Marketing"] },
    { id: '3', src: third, isDragging: false, tags: ["Graphics", "Design"] },
    { id: '4', src: fourt, isDragging: false, tags: ["IEEE", "Technology"] },
  ];

  const [images, setImages] = useState(initialImages);

  const onDragStart = (initial) => {
    const updatedImages = [...images];
    updatedImages[initial.source.index].isDragging = true;

    setImages(updatedImages);
  };

  useEffect(() => {
    // Filter images based on search query
    if (searchQuery) {
      const filtered = images.filter((image) => image.tags.includes(searchQuery));
      setFilteredImages(filtered);
    } else {
      // If search query is empty, display all images
      setFilteredImages(images);
    }
  }, [searchQuery, images]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedImages = [...images];
    updatedImages.forEach((image) => {
      image.isDragging = false;
    });

    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(updatedImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    const newImages = droppedFiles
      .filter((file) => validImageTypes.includes(file.type))
      .map((file) => ({
        id: String(Math.random()),
        src: URL.createObjectURL(file),
        isDragging: false,
        tags: [], // Initialize tags as empty array for dropped images
      }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const newImage = {
        id: String(Math.random()),
        src: URL.createObjectURL(file),
        isDragging: false,
        tags: [], // Initialize tags as empty array for uploaded images
      };

      setImages((prevImages) => [...prevImages, newImage]);
    }
  };

  return (
    <div>
      {authUser ? (
        <>
          <nav>
            <div className="logo">
              <img src={logo} alt="" />
              <h2>Image Gallery</h2>
            </div>
            <div className="search-container">
            <input
              type="text"
              placeholder="Search by tag"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search"
            />
          </div>
            <button onClick={() => fileInputRef.current.click()}>Add Image</button>
            <p>Welcome {authUser.email}</p>
            <button onClick={userSignOut}>Sign Out</button>

          </nav>

          {/* Add a search input field */}
          

          {/* Add a drop zone for images */}
          <div
            id="drop-zone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              padding: "20px",
              textAlign: "center",
            }}
          >
            <p>Drag and drop images from your device here</p>
          </div>

          <div className="App">
            <h1>Drag and Drop Image Arrangement</h1>
            <p>Drag and drop images to rearrange them.</p>
            <div className="unique">
              <p> you can only move items below to top sorry </p>
              <p>And again move sideways</p>
            </div>

            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
              <Droppable droppableId="image-container" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      maxWidth: '100%',
                      margin: '0 auto',
                    }}
                    className="holder"
                  >
                    
                    {filteredImages.map((image, index) => (
  <Draggable key={image.id} draggableId={image.id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`image-box ${image.isDragging ? "dragging" : ""}`}
      >
        <img src={image.src} alt={`Image ${index + 1}`} />
        {/* Display the first tag name */}
        <p>Tag: {image.tags[0]}</p>
      </div>
    )}
  </Draggable>
))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </>
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {/* File input for image upload */}
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default AuthDetails;
