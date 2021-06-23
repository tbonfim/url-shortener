import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Redirect() {
  let { id } = useParams();
  useEffect(() => {
    let timeout;
    axios
      .get(`http://localhost:5001/api/urlshortener/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const {
          data: { originalUrl },
        } = response;
        timeout = setTimeout(() => {
          window.location.href = originalUrl;
        }, 3000);
      })
      .catch(() => {
        timeout = setTimeout(() => {
          window.location.href = "http://localhost:3000";
        }, 3000);
      });
    return () => clearTimeout(timeout);
  });

  return (
    <div>
      <h3>Redirecting...</h3>
    </div>
  );
}
