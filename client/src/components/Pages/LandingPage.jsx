import React from "react";
import { Nav, Navbar, NavbarBrand, Container } from "react-bootstrap";
import logo from '../Assets/tb.png'
import {Link} from 'react-router-dom'

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        border: "2px solid red",
        minHeight: "100vh",
        paddingTop: "3rem",
        paddingLeft: "5rem",
        paddingRight: "5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          margin: "auto",
          border: "1px solid black",
          padding: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{
            fontWeight: "bold",
            display : "flex",
            alignItems: "center"
        }}>
            <img src={logo} style={{width:"50px", height:"50px"}} alt="" />
             <h4>SPS</h4> 
             </div>
        <div
          style={{
            textDecoration: "none",
            color: "gray",
          }}
        >
          <a
            style={{
              textDecoration: "none",
              color: "gray",
              fontWeight : "bold",
              marginLeft : "25px"
            }}
            href=""
          >
            Beranda
          </a>
          <a
            style={{
              textDecoration: "none",
              color: "gray",
              marginLeft : "25px"
            }}
            href=""
          >
            Features
          </a>
          <a
            style={{
              textDecoration: "none",
              color: "gray",
              marginLeft : "25px"
            }}
            href=""
          >
            Testimonials
          </a>
          <a
            style={{
              textDecoration: "none",
              color: "gray",
              marginLeft : "25px"
            }}
            href=""
          >
            Contact
          </a>
          {/* make a link to login */}
          <Link to="/login" style={{
              textDecoration: "none",
              color: "gray",
              marginLeft : "25px"
            }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
