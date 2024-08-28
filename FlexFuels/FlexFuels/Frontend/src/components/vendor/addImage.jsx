import { useState } from "react";
import { toast } from "react-toastify";
import { uploadProductImage } from "../../services/vendor"; // Ensure this function is defined
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled component for the Upload Image page
const StyledUploadImage = styled.div`
  background-color: #1a1a1a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .input-box-admin {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 40px;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;

    .form-control {
      background-color: rgba(255, 255, 255, 0.2);
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 15px;
    }

    .form-control::placeholder {
      color: #ccc;
    }

    .btn-success {
      background-color: #00aaff;
      border: none;
      color: white;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
      width: 100%;
    }

    .btn-success:hover {
      background-color: #0088cc;
    }
  }
`;

function UploadImage() {
  const [productId, setProductId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = async () => {
    if (!productId) {
      toast.dark('Enter Product ID');
      return;
    }
    if (!imageFile) {
      toast.dark('Select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('imageFile', imageFile);

    try {
      const response = await uploadProductImage(productId, formData);

      if (response.message="Image file uploaded successfully for emp id 4") { // Assuming `response.ok` is used for success
        toast.dark("Image uploaded successfully");
        navigate(`/vendorProducts/${sessionStorage.getItem('vendorId')}`);
      } else {
        // Log response or error details for debugging
        // const errorData = await response.json();
        toast.dark(`Error: 'Unknown error'}`);
      }
    } catch (error) {
      // Log error for debugging
      console.error('Upload error:', error);
      toast.dark('Error while uploading image, please try again');
    }
  };

  return (
    <StyledUploadImage>
      <div className='input-box-admin'>
        <div className='form'>
          <input
            type='text'
            className='form-control'
            placeholder="Product ID"
            onChange={(e) => setProductId(e.target.value)}
          />
          <input
            type='file'
            className='form-control'
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button onClick={handleImageUpload} className='btn btn-success'>
            Upload Image
          </button>
        </div>
      </div>
    </StyledUploadImage>
  );
}

export default UploadImage;
