import './App.css';
import CloudinaryLogo from './components/CloudinaryLogo';
import StepUpload from './components/StepUpload';
import StepEdit from './components/StepEdit';
import { useState } from 'react';

function App() {
  const [originalImage, setOriginalImage] = useState();
  const [imageId, setImageId] = useState();
  return (
    <div className="max-w-xl m-auto grid grid-cols-1 mt-2vh w-full h-96vh p-4">
      <header className="flex justify-center py-10 h-2vh">
        <h1 className="text-5xl font-bold text-blue-900 font-coming-soon tracking-wider">
          <span className="text-blue-600">PIC</span>toonify
        </h1>
      </header>
      <main>
        <StepUpload setOriginalImage={setOriginalImage} setImageId={setImageId}/>
      </main>
      <aside>
        <StepEdit originalImage={originalImage} imageId={imageId}/>
      </aside>
      <footer className="flex justify-center items-center gap-x-2 font-semibold pt-10">
        Made with <a href='https://cloudinary.com' target='_blank' rel='noreferrer' className='fill-cloudinary'> <CloudinaryLogo /></a>
      </footer>
    </div>
  );
}

export default App;