import {useState} from 'react';
import axios from 'axios';
export default function Form() {
  const [shortenUrl, setShortenUrl] = useState(null); 
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => setInputText(e.target.value); 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5001/api/urlshortener', { url: inputText}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        setShortenUrl(response.data.shortUrl);
        setError(null);
    }).catch((error) => {
      setError("Please check if you entered a valid URL!");   
    });
  } 
  return ( 
      <div className="url-shortener">
        <form onSubmit={handleSubmit}>
          <label className="form-label">Insert a valid URL</label>
          <input type="text" onChange={handleChange}/>
          <button>shorten url</button>      
        </form>
        {shortenUrl ? <p className="shortened-link">Shortened URL : <a href={`/${shortenUrl}`}>http://localhost:3000/{shortenUrl}</a></p>: ''}
        {error ? <p className="error-message">{error}</p>: ''}
      </div>  
  );
}