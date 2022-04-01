import React from "react";
import background from "./Assets/Background_log.png";
import {Button} from 'react-bootstrap'

export default function Nf() {
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
          width : "530px",
          height : "350px"
        }}
      >
        <div
          style={{
            boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            borderRadius: "15px",
            backgroundColor: "white",
            marginTop : "10px"
          }}
        >
          <div
            style={{
              fontSize: "150px",
              fontWeight: "bold",
              margin: "auto",
              marginTop: "10px",
              marginBottom: "-40px",
            }}
          >
            404
          </div>
          <h4
            style={{
              fontWeight: "bold",
            }}
          >
            Halaman tidak ditemukan
          </h4>
        </div>
            <br />
        <Button style={{
            width : "500px",
            height : "50px"
        }} variant="success"> Kembali Ke Halaman Utama </Button>
      </div>
    </div>
  );
}
