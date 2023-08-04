import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Home.css";
const baseUrl = 'https://node-back-6g47.onrender.com';
const Home = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const [imageUrl, setImageUrl] = useState('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);


  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleImageUpload = async () => {
    if(imageUrl){
    try {
      const response = await axios.post(`${baseUrl}/image`, { data: imageUrl });
      alert("Url Successfully uploaded");
      setImageUrl('');
    } catch (error) {
      console.log(error);
    }
  }
  };

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`${baseUrl}/items?page=${page}`);
      console.log(response);

      const { data } = response.data;
      console.log(data);
      setItems(data);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleImageClick = (index) => {
    setSelectedPhotoIndex(index);
  };

  const handleSlideshowClose = () => {
    setSelectedPhotoIndex(null);
  };

  return (
    <div>
      <div>
        <h1>Image Uploader</h1>
        <div>
          <input
            type="text"
            value={imageUrl}
            onChange={handleInputChange}
            placeholder="Enter Image URL"
          />
          <button className='btn' onClick={handleImageUpload}>Upload Image</button>
        </div>
      </div>
      <div className="images-4">
        {items.map((item, index) => (
          <div className="image" key={index}  onClick={() => handleImageClick(index)}>
            <img src={item.data} alt="" />
          </div>
        ))}
      </div>
      <div>
        <h1>Pagination Images</h1>
        <div id="data-container">

        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span id="page-info">Page {currentPage} of {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
      <div>
      {selectedPhotoIndex !== null && (
        <div className="slideshow">
          <div className="slideshow-container">
            <img src={items[selectedPhotoIndex].data} alt={items[selectedPhotoIndex].title} />
            <div className="slideshow-title">{items[selectedPhotoIndex].title}</div>
          </div>
          <button className="slideshow-close btn" onClick={handleSlideshowClose}>Close</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;
