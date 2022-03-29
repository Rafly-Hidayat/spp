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
  faCircle,
  faChartArea,
  faCalendarWeek,
  faBook,
  faBahai,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import navlogo from "../Assets/logotextwhite.svg";

// Import File
import img from "../Assets/user.jpg";
import Invoice from '../Pembayaran/Invoice'

// Admin

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
import AddPembayaranBulanan from "../Pembayaran/AddPembayaranBulanan";

import JenisPembayaran from "../JenisPembayaran/JenisPembayaran";
import AddJenisPembayaran from "../JenisPembayaran/AddJenisPembayaran";
import SetTarif from "../JenisPembayaran/SetTarif";
import UbahJenisPembayaran from "../JenisPembayaran/UbahJenisPembayaran";

import "./SideBar.css";
import KenaikanKelas from "../Kelulusan/KenaikanKelas";
import UploadSiswa from "../Siswa/UploadSiswa";

import LaporanBulanan from "../Laporan/LaporanBulanan"
import LaporanBebas from "../Laporan/LaporanBebas"

import LaporanAngkatan from './../Laporan/LaporanAngkatan';
import LaporanKelas from './../Laporan/LaporanKelas';

// import LaporanKelas from "../Laporan/LaporanKelas";

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
  const [dropdown2, setDown2] = useState("none");

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

  const changeDropdown2 = () => {
    if (mode === 0) {
      setSidebar("sidebar");
      setMain("main");
      setbutton("button");
      setText("block");
      setDown2("block");
      setBtnleft("block");
      setBtnright("none");
      setMode(1);
    } else {
      setDown2("none");
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
      <div className="admin">
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
              position="absolute"
              width="537px"
              height="38px"
              style={{ marginLeft: "-60px" }}
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav>
              {/* <div className="img"> */}
              <Nav.Item>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={
                    <span style={{ color: "white", fontSize: "20px" }}>
                      <Image
                        width={40}
                        height={40}
                        src={img}
                        style={{
                          borderRadius: "50%",
                          marginTop: "-4px",
                          border: "solid 2px white",
                        }}
                      />
                      &ensp;
                      {admin.nama[0]}
                    </span>
                  }
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
          <div className="admin">
            <br />
            <br />
            {/* Admin Yang Sudah Login */}
            <center>
              {/* Img Admin besar */}
              <Container>
                <span style={{ display: "flex", marginLeft: 10 }}>
                  <img
                    alt="profile"
                    src={img}
                    style={{
                      borderRadius: "5px",
                      width: "60px",
                      height: "60px",
                      border: "solid 2px white",
                      marginTop: "3px",
                      display: text,
                    }}
                  />
                  <div className="text-admin" style={{ display: text }}>
                    <h5>{admin.nama[0]}</h5>
                    <h6>Administrator</h6>
                    <p
                      className="status"
                      style={{ fontSize: 10, marginTop: -5 }}
                    >
                      <FontAwesomeIcon
                        icon={faCircle}
                        style={{ color: "#14CC9E", fontSize: 7 }}
                      />
                      &nbsp;Online
                    </p>
                  </div>
                </span>
              </Container>

              {/* Img Admin kecil */}
              <img
                alt="profile"
                src={img}
                style={{
                  borderRadius: "5px",
                  width: "50px",
                  height: "50px",
                  border: "solid 2px gray",
                  marginTop: "-10px",
                  display: btnright,
                }}
              />
              <hr style={{ color: "white" }} />
            </center>

            {/* Menu Sidebar */}
            <Link to="/admin">
              <span className="icon">
                <FontAwesomeIcon
                  icon={faChartArea}
                  style={{ marginLeft: "3px" }}
                />
              </span>
              <span style={{ display: text, paddingLeft: "1px" }}>
                {" "}
                Dashboard
              </span>
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
                  <Link to="/admin/kenaikan-kelas">
                    <li>Kenaikan Kelas</li>{" "}
                  </Link>
                </ul>
              </div>
            </div>

            {/* -------- */}
            <Link to="/admin/periode">
              <span className="icon">
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ marginLeft: "3px" }}
                />
              </span>{" "}
              <span style={{ display: text, paddingLeft: "4px" }}>
                Tahun Ajaran
              </span>
            </Link>

            {/* --------- */}
            <Link to="/admin/pos">
              <span className="icon">
                <FontAwesomeIcon icon={faBahai} style={{ marginLeft: "2px" }} />
              </span>{" "}
              <span style={{ display: text, paddingLeft: "5px" }}>Post</span>
            </Link>

            <Link to="/admin/pembayaran">
              <span className="icon">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  style={{ marginLeft: "1px" }}
                />
              </span>{" "}
              <span style={{ display: text, paddingLeft: "4px" }}>
                Pembayaran
              </span>
            </Link>

            {/* ----------- */}
            <Link to="/admin/jenispembayaran">
              <span className="icon">
                <FontAwesomeIcon icon={faBook} style={{ marginLeft: "1px" }} />
              </span>{" "}
              <span style={{ display: text, paddingLeft: "4px" }}>
                Jenis Pembayaran
              </span>
            </Link>

            <div className="dropdown">
              <span className="drop">
                <a onClick={changeDropdown2}>
                  <span className="icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </span>
                  <span style={{ display: text }}>Laporan</span>
                </a>
              </span>

              <div
                id="myDropdown"
                className="dropdown-content"
                style={{ display: dropdown2 }}
              >
                <ul>
                  <Link to="/admin/laporan/bulanan">
                    <li>Laporan Bulanan </li>
                  </Link>
                  <Link to="/admin/laporan/bebas">
                    <li>Laporan Bebas </li>
                  </Link>

                  <Link to="/admin/laporan/angkatan">
                    <li>Laporan Angkatan </li>
                  </Link>
                  <Link to="/admin/laporan/angkatan/bulanan">
                    <li>Laporan Angkatan Bulanan </li>

                  </Link>
                  <Link to="/admin/laporan/kelas">
                    <li>Laporan Kelas </li>

                  </Link>
                </ul>
              </div>
            </div>

            <Link to="/admin/laporan/bulanan">
              <span className="icon">
                <FontAwesomeIcon icon={faBook} style={{ marginLeft: "1px" }} />
              </span>{" "}
              <span style={{ display: text, paddingLeft: "4px" }}>
                Laporan Bulanan
              </span>
            </Link>

            <Link to="/admin/laporan/bebas">
              <span className="icon">
                <FontAwesomeIcon icon={faBook} style={{ marginLeft: "1px" }} />
              </span>{" "}
              <span style={{ display: text, paddingLeft: "4px" }}>
                Laporan Bebas
              </span>
            </Link>

            <a href="#">
              <span className="icon">
                <FontAwesomeIcon icon={faCreditCard} />
              </span>{" "}
              <span style={{ display: text }}>Set Tarif</span>
            </a>

            {/* Button for hide and show sidebar */}
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
        </div>

        {/* Route in class main */}
        <div className={main}>
          <ProtectedRoute path="/admin" exact component={Dashboard} />

          <ProtectedRoute
            exact
            path="/admin/siswa/upload"
            component={UploadSiswa}
          />
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
          <ProtectedRoute
            exact
            path="/admin/pos/ubah/:id"
            component={EditPos}
          />

          <ProtectedRoute
            exact
            path="/admin/periode/"
            component={DataPeriode}
          />
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
          <ProtectedRoute
            exact
            path="/admin/jenispembayaran/ubah/:id"
            component={UbahJenisPembayaran}
          />

          <ProtectedRoute
            exact
            path="/admin/kenaikan-kelas"
            component={KenaikanKelas}
          />

          <ProtectedRoute
            exact
            path="/admin/pembayaran"
            component={Pembayaran}
          />
          <ProtectedRoute
            exact
            path="/admin/pembayaran/tambah/:id"
            component={AddPembayaran}
          />
          <ProtectedRoute
            exact
            path="/admin/pembayaran_bulan/tambah/:id"
            component={AddPembayaranBulanan}
          />
          <ProtectedRoute
            exact
            path="/admin/laporan/bulanan"
            component={LaporanBulanan}
          />
          <ProtectedRoute
            exact
            path="/admin/laporan/kelas"
            component={LaporanKelas}
          />
          <ProtectedRoute
            exact
            path="/admin/laporan/bebas"
            component={LaporanBebas}
          />
          <ProtectedRoute
            exact
            path="/admin/laporan/angkatan"
            component={LaporanAngkatan}
          />
          <ProtectedRoute
            exact
            path="/admin/laporan/angkatan/bulanan"
            component={LaporanKelas}
          />
          <ProtectedRoute
            exact
            path="/admin/invoice/:id"
            component={Invoice}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
