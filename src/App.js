import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState("");
  const [lang, setLang] = useState("");
  const [voices, setVoices] = useState([]);
  
  // function handleSave(text, lang, voice){
    // will wirte the save handler in future.
  // }    
  function convertToVoice(text, lang, voice) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = lang;
    utterance.text = text;
    utterance.voiceURI = voice; // Use the browser's native voice
    utterance.volume = 1; // Set volume (0 to 1)
    utterance.rate = 1; // Set rate (0.1 to 10)
    utterance.pitch = 1; // Set pitch (0 to 2)
    window.speechSynthesis.speak(utterance);
    
  }
  
  function setVoice(lang){
    const voices = window.speechSynthesis.getVoices();
    setVoices(voices.filter(voice => voice.lang === lang));
    console.log("voices:"+voices);
  }
 
  useEffect(()=>{
    setVoice(lang);
  },[lang])
  
  return (
    <div className="App">
      <h1>Speachinator</h1>
      <div className="app-container">
        <div className="console">
          <div className="drop-down-container">
            <select
              className="select-item"
              value={lang}
              onChange={(e) => {
                setLang(e.target.value);
              }}
            > {lang ? null : <option value={""} disabled hidden>Select Language</option>}
              <option value={"hi-IN"}>Hindi</option>
              <option value={"en-IN"}>English</option>
            </select>
            {voices.length >0 && (<select
              className="select-item"
              value={tone}
              onChange={(e) => {
               setTone(e.target.value)
              }}
            >  
              {voices.map(val=> <option value={val.voiceURI}>{val.voiceURI}</option>)}
            </select>)}
          </div>
          <div className="button-container">
            <button className="buttons" disabled={(inputText.length === 0 || lang.length===0)} onClick={()=>{
              convertToVoice(inputText,lang,tone)
            }}>
              Convert
            </button>
            {/* <button className="buttons" disabled={(inputText.length === 0 || lang.length===0)} onClick={()=>{handleSave(inputText,lang,tone)}}>
              Save as MP3
            </button> */}
          </div>
        </div>
        <textarea
          id="input-field"
          disabled={lang.length===0}
          value={inputText}
          onChange={($event) => {
            setInputText($event.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default App;
