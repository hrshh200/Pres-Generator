import React, { useState } from 'react';
import image from './images/pres.png';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [texts, setTexts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [radiotexts, radiosetTexts] = useState([]);
  const [dur, setDur] = useState('');
  const [durs, setDurs] = useState([]);

  const handleTextareaChange = (event) => {
    setText(event.target.value);
  };

  const addDetails = () => {
    if (text.trim()) {
      setTexts([...texts, text]);
      setText('');
    }
  };

  const addDuration = () => {
    if (dur.trim()) {
      setDurs([...durs, dur]);
      setDur('');
    }
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const updatedImage = document.getElementById('image-download');

  const downloadImage = () => {
    toPng(updatedImage)
      .then(dataURL => {
        download(dataURL, "Prescription.png")
      })
      .catch(() => {
        console.log("Error downloading image")
      })
  };

  const addRadio = () => {
    if (selectedOption.trim()) {
      radiosetTexts([...radiotexts, selectedOption]);
      setSelectedOption('');
    }
  };

  return (
    <div>
      <h2>Prescription Generator</h2>
      <h3>Enter medicine: </h3>
      <div className="content">
        <div className="text-area">
          <textarea
            placeholder="Type your medicine here..."
            value={text}
            onChange={handleTextareaChange}
          ></textarea>
          <pre><button className="btn" onClick={addDetails}>Add</button></pre>
          <h3>Select Frequency: </h3>
          <div className="radio-container">
            <form className='radio-form'>
              <label className="radio-label">
                <input
                  type="radio"
                  value="O"
                  checked={selectedOption === 'O'}
                  onChange={handleOptionChange}
                />
                <span className="radio-text">O</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="O-O"
                  checked={selectedOption === 'O-O'}
                  onChange={handleOptionChange}
                />
                <span className="radio-text">O-O</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="O-O-O"
                  checked={selectedOption === 'O-O-O'}
                  onChange={handleOptionChange}
                />
                <span className="radio-text">O-O-O</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="O-O-O-O"
                  checked={selectedOption === 'O-O-O-O'}
                  onChange={handleOptionChange}
                />
                <span className="radio-text">O-O-O-O</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="SOS"
                  checked={selectedOption === 'SOS'}
                  onChange={handleOptionChange}
                />
                <span className="radio-text">SOS</span>
              </label>
            </form>
          </div>
          <pre><button className="btn" onClick={addRadio}>Add</button></pre>
          <h3>Enter duration in days: </h3>
          <textarea
            placeholder="Enter duration in days"
            value={dur}
            onChange={addDuration}
          ></textarea>
          <pre><button className="btn" onClick={addDuration}>Add</button></pre>
        </div>
        <div className="image-container">
          <div className="image-wrapper" id='image-download'>
            <img src={image} alt="Prescription" />

            {texts.map((item, index) => (
              <h1 key={index} className="overlay-text">{item}</h1>
            ))}
            {radiotexts.map((item, index) => (
              <h1 key={index} className="overlay-text2">{item}</h1>
            ))}
            {durs.map((item, index) => (
              <h1 key={index} className="overlay-text2">{item}</h1>
            ))}
          </div>
        </div>
      </div>
      <button className="btn2" onClick={downloadImage}>Download</button>
    </div>
  );
}

export default App;
