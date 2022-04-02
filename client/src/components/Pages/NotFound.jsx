import React from "react";
import background from "../Assets/Background_404.png";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  document.title = "404 Not Found :(";
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div
        style={{
          transform: "translate(-50%, -50%)",
          position: "absolute",
          left: "50%",
          top: "50%",
          //make it center
          textAlign: "center",
          padding: "20px",
          width: "530px",
          height: "365px",
        }}
      >
        <div
          style={{
            boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            borderRadius: "10px",
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              fontSize: "100px",
              fontWeight: "900",
              margin: "auto",
              marginTop: "10px",
              marginBottom: "-40px",
            }}
          >
            404
          </div>
          <br />
          <h4
            style={{
              fontWeight: "500",
            }}
          >
            Halaman tidak ditemukan
          </h4>
          <br />
        </div>
        <br />
        <Link to="/">
        <Button
          style={{
            width: "493px",
            height: "50px",
            borderRadius: "10px",
            color: "white",
          }}
        >
          {" "}
          Kembali Ke Halaman Utama{" "}
        </Button></Link>
      </div>
    </div>
  );
}
