import React, {useState, useEffect} from 'react'
import Draggable from 'react-draggable'


export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  })

  const [allMemeImages, setAllMemeImages] = useState([])
  
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemeImages(data.data.memes))
  }, []) 

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length)
    const url = allMemeImages[randomNumber].url
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: url
    }))
  }

  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }
    
  return (
    <main className="main">
      <div className="form">
        <input 
          type="text" 
          placeholder="Top text" className="form-input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        
        <input 
          type="text" 
          placeholder="Bottom text" className="form-input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />        
        <button className="form-button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img className="meme-img" src={meme.randomImage} alt="lol "/>
        <Draggable defaultPosition={{x: -50, y: 0}}>
          <div className="meme-text top">{meme.topText}</div>
        </Draggable>
        <Draggable>
          <div className="meme-text bottom">{meme.bottomText}</div>
        </Draggable>
      </div>
    </main>
  )
}