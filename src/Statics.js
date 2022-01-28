import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useStudent } from "./studentContext";
import { getAverage, groupBy } from "./utils";

const cards = [
  "Students per country",
  "Student per class",
  "Average Age of students",
];

const CardData = ({
  card,
  studentsPerCountry,
  studentsPerClass,
  averageAge,
}) => {
  console.log(
    "studentsPerCountry,studentsPerClass,averageAge,: ",
    studentsPerCountry,
    studentsPerClass,
    averageAge
  );
  return (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {card}
        </Typography>
        <Typography variant="body2">
          {card === cards[0] &&
            Object.keys(studentsPerCountry).map((key) => (
              <React.Fragment key={key}>
                {key} : {studentsPerCountry[key].length}
                <br />
              </React.Fragment>
            ))}
          {card === cards[1] &&
            Object.keys(studentsPerClass).map((key) => (
              <React.Fragment key={key}>
                {key} : {studentsPerClass[key].length}
                <br />
              </React.Fragment>
            ))}

          {card === cards[2] && !isNaN(averageAge) && (
            <React.Fragment key={"averageAge"}>
              Average age of students: {averageAge}
              <br />
            </React.Fragment>
          )}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
};

export default function Statics() {
  const { students = [{}] } = useStudent();
  const studentsPerCountry = groupBy(students, "country");
  const studentsPerClass = groupBy(students, "class");
  const ages = students.map((person) => person.age);
  const averageAge = Math.floor(getAverage(ages));
  return (
    <Box sx={{ minWidth: 275 }}>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: 5, marginBottom: 5, paddingLeft: 5 }}
      >
        {cards.map((card) => (
          <Grid item xs={5}>
            <Card variant="outlined" key={card}>
              <CardData
                card={card}
                studentsPerCountry={studentsPerCountry}
                studentsPerClass={studentsPerClass}
                averageAge={averageAge}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
