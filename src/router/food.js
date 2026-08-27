import {Router} from "express";

import { validationResult, body } from "express-validator";

const food = Router()

let foods = [
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

food.get("/", (req, res) => {
res.json(foods);
});

food.post(
"/",
  [
    body("id", "id is required and must be number").notEmpty().isInt(),
    body("title", "title is required and must be string").notEmpty().isString(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ msg: "bad request", data: errors.array() });
    const data = req.body;
    const { title, id } = req.body;
    foods.push(data);
    res.json({
      message: "your resrvation has been added",
      data: data,
    });
  },
);


food.put("/:id", 
    [
    body("title", "title must be string").isString(),
]
,(req, res) => {
        const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ msg: "bad request", data: errors.array() });
  const id = req.params.id;
  const food = foods.find((foods) => foods.id == id);
  if (!food)
    return res
      .status(400)
      .send("the food you are looking for is not available");

  if (req.body.title) food.title = req.body.title;

  const newFoods = foods.filter((foods) => foods.id != id);
  foods = newFoods;
  foods.push(food);

  res.json({
    msg: "food updated",
    data: foods,
  });
});





food.delete("/:id", (req, res) => {
  const id = req.params.id;
  const food = foods.filter((foods) => foods.id == id);
  if (food.length == 0)
    return res
      .status(400)
      .send("the food you are looking for is not available");


  const newFoods = foods.filter((foods) => foods.id != id);
  foods = newFoods;


  res.json({
    msg: "food removed",
    data: foods,
  });
});

food.use("/:id", (req, res, next) => {
  const parama = req.params.id;
  const exists = foods.filter((foods) => foods.id == parama);
  if (exists.length != 0) return res.json(exists);
  res.send("the food you are looking for is not available");
  next()
});

export default food
