import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";

const WeatherCard = ({ weather }) => {
  const date = moment.unix(weather.dt).format("DD MMM. YYYY");
  const temp = weather.main.temp;
  const weatherIcon = weather.weather[0].icon;
  const iconImage = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
  return (
    <>
      <Card className="weather-card" variant="outlined">
        <CardContent>
          <Typography
            sx={{
              mb: 2,
              fontSize: 14,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Temperature
          </Typography>
          <div className="weather-unit">
            <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
              {temp}&deg;C
            </Typography>
            <img src={iconImage} alt="weather-icon" />
          </div>
          <Typography
            sx={{
              mt: 2,
              fontSize: 14,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {date}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default WeatherCard;
