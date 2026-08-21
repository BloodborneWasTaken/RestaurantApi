import express from "express";

const app = express();

app.use(express.json())

const foods = [
  {
    id: 1,
    title: "baghaly polo ba gardan",
  },

  {
    id: 2,
    title: "sabzy polo ba mahy",
  },

  {
    id: 3,
    title: "kotlet",
  },
];

app.get("/", (req, res) => {
  res.json(foods);
});

app.post("/" ,(req , res) => {

  const data = req.body
  const {title , id} =req.body
  foods.push(data)
  res.json({
    "message" : "your resrvation has been added",
    "data" : data
  })
})

// app.get("/:id", (req, res) => {

//   const param = req.params.id
//   const exist = foods.filter(foods => foods.id == param)
// if (exist.length != 0 ) return res.json(exist)
//   res.send("the food you are looking for is not available")
// });


app.use("/:title", (req, res) => {

  const parama = req.params.title
  const exists = foods.filter(foods => foods.title == parama)
if (exists.length != 0 ) return res.json(exists)
  res.send("the food you are looking for is not available")
});

app.listen(3000, () => {
  console.log("the app is sucsessfuly running on port 3000");
});
