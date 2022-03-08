import React, { useState } from "react";
import ProtectedRoute from "../../ProtectedRoutes";
// package
import { useHistory } from "react-router";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Card,
  Row,
  Col,
  Button,
  Image,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCreditCard,
  faChevronLeft,
  faChevronRight,
  faGauge,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Route } from "react-router-dom";
import img from "../Assets/user.jpg";
import navlogo from "../Assets/logo.svg";

// Import File
import Dashboard from "../Dashboard/Dashboard";

import DataJurusan from "../Jurusan/DataJurusan";
import UbahJurusan from "../Jurusan/UbahJurusan";
import TambahJurusan from "../Jurusan/TambahJurusan";

import DataSiswa from "../Siswa/DataSiswa";
import TambahSiswa from "../Siswa/TambahSiswa";
import UbahSiswa from "../Siswa/UbahSiswa"; //ini yg ga tampil

import DataPos from "../Pos/DataPos";
import AddPos from "../Pos/AddPos";
import EditPos from "../Pos/EditPos";

import DataPeriode from "../Periode/DataPeriode";
import AddPeriode from "../Periode/AddPeriode";
import EditPeriode from "../Periode/EditPeriode";

import DataKelas from "../Kelas/DataKelas";
import Tambahkelas from "../Kelas/TambahKelas";
import UbahKelas from "../Kelas/UbahKelas";

import Pembayaran from "../Pembayaran/Pembayaran";
import AddPembayaran from "../Pembayaran/AddPembayaran";

import JenisPembayaran from "../JenisPembayaran/JenisPembayaran";
import AddJenisPembayaran from "../JenisPembayaran/AddJenisPembayaran";
import SetTarif from "../JenisPembayaran/SetTarif";

import "./SideBar.css";

const SideBar = () => {
  const admin = JSON.parse(localStorage.getItem("dataAdmin"));

  const user = useState(admin.nama[0]);

  const [sidebar, setSidebar] = useState("sidebar");
  const [main, setMain] = useState("main");
  const [text, setText] = useState("block");
  const [button, setbutton] = useState("button");
  const [btnleft, setBtnleft] = useState("block");
  const [btnright, setBtnright] = useState("none");

  const [dropdown, setDown] = useState("none");

  const [mode, setMode] = useState(1);

  const changeSidebar = () => {
    if (mode === 0) {
      setSidebar("sidebar1");
      setMain("main1");
      setbutton("button1");
      setText("none");
      setDown("none");
      setBtnleft("none");
      setBtnright("block");
      setMode(1);
    } else {
      setSidebar("sidebar");
      setMain("main");
      setbutton("button");
      setText("block");
      setBtnleft("block");
      setBtnright("none");
      setMode(0);
    }
  };

  const changeDropdown = () => {
    if (mode === 0) {
      setSidebar("sidebar");
      setMain("main");
      setbutton("button");
      setText("block");
      setDown("block");
      setBtnleft("block");
      setBtnright("none");
      setMode(1);
    } else {
      setDown("none");
      setMode(0);
    }
  };
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("dataAdmin");
    history.push("/");
  };
  return (
    <div>
      {/* Navbar */}

      <Navbar
        collapseOnSelect
        className="navbar"
        expand="lg"
        variant="dark"
        fixed="top"
      >
        {/* add image for navbar */}
        <Navbar.Brand>
          <Image
            src={navlogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Brand> Sistem Pembayaran Sekolah</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav>
            {/* <div className="img"> */}
              <Nav.Item>
                <Image
                  width={40}
                  height={40}
                  src={img}
                  style={{ borderRadius: "20px", marginTop: "4px" }}
                />
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={user}
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="/admin/profile/">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
            {/* </div> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* ------------------------------------------------------ */}

      {/* Sidebar */}

      <div className={sidebar}>
        <br />
        <br />
        <center>
          <img
            alt="profile"
            src={img}
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              border: "solid 2px gray",
            }}
          />

          <h5 style={{ color: "white", marginTop : "15px" }}>{admin.nama[0]}</h5>
        </center>
        <hr style={{ color: "white" }} />
        <Link to="/admin">
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>
          <span style={{ display: text }}>Dashboard</span>
        </Link>
        {/* --------- */}
        <div className="dropdown">
          <span className="drop">
            <a onClick={changeDropdown}>
              <span className="icon">
                <FontAwesomeIcon icon={faUsers} />
              </span>
              <span style={{ display: text }}>Management Data</span>
            </a>
          </span>

          <div
            id="myDropdown"
            className="dropdown-content"
            style={{ display: dropdown }}
          >
            <ul>
              <Link to="/admin/siswa">
                <li>Siswa </li>
              </Link>
              <Link to="/admin/jurusan">
                <li>Jurusan</li>{" "}
              </Link>
              <Link to="/admin/kelas">
                <li>Kelas</li>{" "}
              </Link>
            </ul>
          </div>
        </div>

        {/* -------- */}
        <Link to="/admin/periode">
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>{" "}
          <span style={{ display: text }}> Tahun Ajaran</span>
        </Link>

        {/* --------- */}
        <Link to="/admin/pos">
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>{" "}
          <span style={{ display: text }}>Post</span>
        </Link>

        <Link to="/admin/pembayaran">
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>{" "}
          <span style={{ display: text }}>Pembayaran</span>
        </Link>

        {/* ----------- */}
        <Link to="/admin/jenispembayaran">
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>{" "}
          <span style={{ display: text }}>Jenis Pembayaran</span>
        </Link>

        {/* <a href="#">
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>{" "}
          <span style={{ display: text }}>Set Tarif</span>
        </a> */}

        <div className={button}>
          <FontAwesomeIcon
            style={{ display: btnleft }}
            icon={faChevronLeft}
            onClick={changeSidebar}
          />
          <FontAwesomeIcon
            style={{ display: btnright }}
            icon={faChevronRight}
            onClick={changeSidebar}
          />
        </div>
      </div>

      <div className={main}>
        <ProtectedRoute path="/admin" exact component={Dashboard} />

        <ProtectedRoute exact path="/admin/siswa" component={DataSiswa} />
        <ProtectedRoute
          exact
          path="/admin/siswa/tambah"
          component={TambahSiswa}
        />
        <ProtectedRoute
          exact
          path="/admin/siswa/ubah/:id"
          component={UbahSiswa}
        />

        <ProtectedRoute exact path="/admin/jurusan" component={DataJurusan} />
        <ProtectedRoute
          exact
          path="/admin/jurusan/ubah/:id"
          component={UbahJurusan}
        />
        <ProtectedRoute
          exact
          path="/admin/jurusan/tambah"
          component={TambahJurusan}
        />

        <ProtectedRoute exact path="/admin/pos/" component={DataPos} />
        <ProtectedRoute exact path="/admin/pos/tambah" component={AddPos} />
        <ProtectedRoute exact path="/admin/pos/ubah/:id" component={EditPos} />

        <ProtectedRoute exact path="/admin/periode/" component={DataPeriode} />
        <ProtectedRoute
          exact
          path="/admin/periode/tambah"
          component={AddPeriode}
        />
        <ProtectedRoute
          exact
          path="/admin/periode/ubah/:id"
          component={EditPeriode}
        />

        <ProtectedRoute exact path="/admin/kelas/" component={DataKelas} />
        <ProtectedRoute
          exact
          path="/admin/kelas/tambah"
          component={Tambahkelas}
        />
        <ProtectedRoute path="/admin/kelas/ubah/:id" component={UbahKelas} />

        <ProtectedRoute
          exact
          path="/admin/jenispembayaran"
          component={JenisPembayaran}
        />
        <ProtectedRoute
          exact
          path="/admin/pembayaran/set_tarif/:id"
          component={SetTarif}
        />
        <ProtectedRoute
          exact
          path="/admin/jenispembayaran/tambah"
          component={AddJenisPembayaran}
        />

        <ProtectedRoute exact path="/admin/pembayaran" component={Pembayaran} />
        <ProtectedRoute
          exact
          path="/admin/pembayaran/tambah/:id"
          component={AddPembayaran}
        />
      </div>
    </div>
  );
};

export default SideBar;
