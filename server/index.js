const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());
//GET /api/customers//
app.get("/api/customers", async (req, res, next) => {
    try {
      const result = await db.fetchCustomers(req.body);
      res.send(result);
    } catch (ex) {
      next(ex);
    }
  });
//GET /api/reservations//
  app.get("/api/reservations", async (req, res, next) => {
    try {
      const result = await db.fetchReservations(req.body);
      res.send(result);
    } catch (ex) {
      next(ex);
    }
  });

  app.post("/api/customers", async (req, res, next) => {
    try {
      const result = await db.createCustomer(req.body.name);
      res.send(result);
    } catch (ex) {
      next(ex);
    }
  });
  //POST /api/reservations//
  app.post("/api/customers/:customer_id/reservations", async (req, res, next) => {
    const { customer_id } = req.params;
    const { restaurantName, date, partyCount, customerName } = req.body;
  
    try {
      const response = await db.createReservation({
        customerName: customerName,
        restaurantName: restaurantName,
        date: date,
        partyCount: partyCount,
      });
      res.sendStatus(201).json(response);
    } catch (ex) {
      next(ex);
    }
  });
  
  app.delete(
    //DELETE /api/reservations/:id//
    "/api/customers/:customer_id/reservations/:id",
    async (req, res, next) => {
      const { id, customer_id } = req.params;
      try {
        await db.createReservation({
          id: id,
          customer_id: customer_id,
        });
        res.sendStatus(204);
      } catch (ex) {
        next(ex);
      }
    }
  );  

const init = async () => {
    await db.init();
    app.listen(3000, () => console.log("listening on port 3000"));
  };
  
  init();