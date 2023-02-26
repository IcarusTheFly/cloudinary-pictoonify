import { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { cartoonify } from "@cloudinary/url-gen/actions/effect";
import { Spinner } from "@chakra-ui/react";
import "two-up-element";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

const StepEdit = ({ originalImage, imageId }) => {
  const [convertedImageURL, setConvertedImageURL] = useState();
  const [processingImage, setProcessingImage] = useState(true);
  const [tries, setTries] = useState(0);
  useEffect(() => {
    if (imageId !== undefined) {
      console.log("Processing image...");
      const convertedImage = cloudinary.image(imageId).effect(cartoonify());
      setConvertedImageURL(convertedImage.toURL());
    }
  }, [imageId]);

  return (
    <div className="m-10">
      {originalImage !== undefined &&
        convertedImageURL !== undefined &&
        processingImage && (
          <div className="grid grid-cols-1 text-center text-blue-700 gap-4 m-10 font-bold">
            <span>Processing image...</span>
            <Spinner
              thickness="4px"
              className="h-12 w-12 m-auto text-blue-500"
            />
          </div>
        )}

      {originalImage === undefined || convertedImageURL === undefined ? (
        <p className="block text-center text-blue-700 font-bold w-full mt-10">
          Upload a picture to <span className="italic">pictoonify</span>!
        </p>
      ) : (
        <>
          <two-up>
            <img src={originalImage} alt="The original pic" />
            <img
              onLoad={() => {
                console.log("On load!");
                setProcessingImage(false);
              }}
              onError={() => {
                console.log("On error!");
                setTries(tries + 1);
              }}
              //   src={`${convertedImageURL}&t=${tries}`}
              src={convertedImageURL}
              alt="The converted pic"
            />
          </two-up>
          <a
            download
            href={convertedImageURL}
            className="block bg-blue-500 hover:bg-blue-700 text-xl text-center rounded-full px-4 py-2 text-white font-bold w-full mt-10"
          >
            Download <span className="italic">pictoonified</span> image
          </a>
        </>
      )}
    </div>
  );
};

export default StepEdit;
