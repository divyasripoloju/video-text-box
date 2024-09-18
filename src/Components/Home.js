import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addText, updateText, deleteText } from '../textSlice';
import { Rnd } from 'react-rnd';
import './Home.css';

const Home = () => {
  const textBoxes = useSelector((state) => state.text);
  const dispatch = useDispatch();
  const [selectedTextBox, setSelectedTextBox] = useState(null);

  const handleAddText = () => {
    const newText = {
      id: Date.now(),
      config: {
        x: 50,
        y: 50,
        width: 100,
        height: 30,
        fontSize: 16,
        color: '#FF0000',
        stroke: '#000000',
        text: '', // Start with an empty text field
        fontFamily: 'Arial',
        fontWeight: 'Regular',
        opacity: 1,
      },
    };
    dispatch(addText(newText));
  };

  const handleDeleteText = (id) => {
    dispatch(deleteText(id));
  };

  const handleUpdateText = (id, config) => {
    dispatch(updateText({ id, config }));
  };

  const handleSelectTextBox = (textBox) => {
    setSelectedTextBox(textBox);
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;

    if (name === 'text') {
      // Validate length for text field (1 to 10 characters)
      if (value.length > 10) {
        alert('Text must be between 1 and 10 characters.');
        return;
      }
      if (value.length === 0) {
        alert('Text cannot be empty.');
        return;
      }
    }

    if (selectedTextBox) {
      handleUpdateText(selectedTextBox.id, { ...selectedTextBox.config, [name]: value });
    }
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation(); // Prevent triggering parent click event
    handleDeleteText(id);
  };

  return (
    <div className="home-container">
      {/* Left side video section */}
      <div className="video-container">
        <video controls width="600">
          <source src="/videoo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {textBoxes.map((textBox) => (
          <Rnd
            key={textBox.id}
            size={{ width: textBox.config.width, height: textBox.config.height }}
            position={{ x: textBox.config.x, y: textBox.config.y }}
            onDragStop={(e, d) =>
              handleUpdateText(textBox.id, { ...textBox.config, x: d.x, y: d.y })
            }
            onResizeStop={(e, direction, ref, delta, position) => {
              handleUpdateText(textBox.id, {
                ...textBox.config,
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                x: position.x,
                y: position.y,
              });
            }}
            onClick={() => handleSelectTextBox(textBox)}
          >
            <div
              style={{
                fontSize: `${textBox.config.fontSize}px`,
                color: textBox.config.color,
                fontFamily: textBox.config.fontFamily,
                fontWeight: textBox.config.fontWeight,
                position: 'relative',
                padding: '5px',
                backgroundColor: `rgba(255, 255, 255, ${1 - textBox.config.opacity})`, // Apply opacity
                border: `2px solid ${textBox.config.stroke}`, // Add stroke
              }}
            >
              {textBox.config.text || 'No text'}
              <button
                onClick={(e) => handleDeleteClick(e, textBox.id)}
                className="delete-btn"
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  padding: '2px 5px',
                  fontSize: '16px', // Increase font size for better visibility
                }}
              >
                ✕
              </button>
            </div>
          </Rnd>
        ))}
      </div>

      {/* Right side configuration panel */}
      <div className="config-panel">
        <button className="add-text-btn" onClick={handleAddText}>
          Add Text
        </button>

        {selectedTextBox && (
          <div className="config-options">
            <h4>Position</h4>
            <div className="input-group">
              <label>X</label>
              <input
                type="number"
                name="x"
                value={selectedTextBox.config.x}
                onChange={handleConfigChange}
              />
              <label>Y</label>
              <input
                type="number"
                name="y"
                value={selectedTextBox.config.y}
                onChange={handleConfigChange}
              />
            </div>

            <h4>Size</h4>
            <div className="input-group">
              <label>W</label>
              <input
                type="number"
                name="width"
                value={selectedTextBox.config.width}
                onChange={handleConfigChange}
              />
              <label>H</label>
              <input
                type="number"
                name="height"
                value={selectedTextBox.config.height}
                onChange={handleConfigChange}
              />
            </div>

            <h4>Text</h4>
            <input
              type="text"
              name="text"
              value={selectedTextBox.config.text}
              onChange={handleConfigChange}
              placeholder="Enter text here"
              maxLength="10" // Optional: restrict input length
            />

            <h4>Font</h4>
            <div className="input-group">
              <label>Font Family</label>
              <select
                name="fontFamily"
                value={selectedTextBox.config.fontFamily}
                onChange={handleConfigChange}
              >
                <option value="Arial">Arial</option>
                <option value="Poppins">Poppins</option>
                <option value="Verdana">Verdana</option>
              </select>

              <label>Font Weight</label>
              <select
                name="fontWeight"
                value={selectedTextBox.config.fontWeight}
                onChange={handleConfigChange}
              >
                <option value="Regular">Regular</option>
                <option value="Bold">Bold</option>
                <option value="Light">Light</option>
              </select>
            </div>

            <h4>Fill</h4>
            <input
              type="color"
              name="color"
              value={selectedTextBox.config.color}
              onChange={handleConfigChange}
            />

            <h4>Stroke</h4>
            <input
              type="color"
              name="stroke"
              value={selectedTextBox.config.stroke}
              onChange={handleConfigChange}
            />

            <h4>Opacity</h4>
            <input
              type="number"
              name="opacity"
              step="0.01"
              min="0"
              max="1"
              value={selectedTextBox.config.opacity}
              onChange={handleConfigChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
