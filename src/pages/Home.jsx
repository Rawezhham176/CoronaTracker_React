import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import { useState, useEffect } from "react";
import InfoBox from "../components/InfoBox";
import Map from "../components/Map";
import Table from "../components/Table";
import { prettyPrintStat, sortData } from "../util/util";
import LineGraph from "../components/LineGraph";
import "leaflet/dist/leaflet.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [center, setCenter] = useState({ lat: 43, lng: 0 });
  const [zoom, setZoom] = useState(3);
  const [mapPosition, setMapPosition] = useState(center);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sorted = sortData(data);
          setTableData(sorted);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, [countries]);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setCenter([data.countryInfo.lat, data.countryInfo.long]);
        setZoom(9);
      });
  };

  useEffect(() => {
    setMapPosition(center);
    setMapZoom(zoom);
  }, [center, zoom]);

  return (
    <>
      <div className="home">
        <div className="app__left">
          <div className="app__header">
            <FormControl
              className="app__dropdown"
              style={{ borderColor: "white" }}
            >
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
                style={{ color: "black" }}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            <InfoBox
              title="Coronavirus cases"
              total={countryInfo.cases}
              cases={prettyPrintStat(countryInfo.todayCases)}
              onClick={(e) => setCasesType("cases")}
            />
            <InfoBox
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={countryInfo.recovered}
              onClick={(e) => setCasesType("recovered")}
            />
            <InfoBox
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={countryInfo.deaths}
              onClick={(e) => setCasesType("deaths")}
            />
          </div>

          <Map position={mapPosition} zoom={mapZoom} countries={mapCountries} />
        </div>
        <Card className="app__right">
          <CardContent>
            <h3>Live cases by Country</h3>
            <Table countries={tableData} />
          </CardContent>
        </Card>
      </div>
      <LineGraph />
    </>
  );
};

export default Home;
