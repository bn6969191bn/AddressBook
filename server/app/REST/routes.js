import Contact from "../models/contact";
import User from "../models/user";
import auth from "../middleware/auth";
import jwt from "jsonwebtoken";
import config from "../config";

const routes = (router) => {
  router.post("/contacts", auth, async (req, res) => {
    try {
      const { name, email, phone } = req.body;

      const newContact = new Contact({ name, email, phone });

      const savedContact = await newContact.save();

      res.status(201).json(savedContact);
    } catch (error) {
      res.status(500).json({ message: "Błąd serwera" });
    }
  });

  router.put("/contacts/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;

      const updatedContact = await Contact.findByIdAndUpdate(
        id,
        { name, email, phone },
        { new: true }
      );

      if (!updatedContact) {
        return res.status(404).json({ message: "Kontakt nie znaleziony" });
      }

      res.json(updatedContact);
    } catch (error) {
      res.status(500).json({ message: "Błąd serwera" });
    }
  });

  router.delete("/contacts/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;

      const deletedContact = await Contact.findByIdAndDelete(id);

      if (!deletedContact) {
        return res.status(404).json({ message: "Kontakt nie znaleziony" });
      }

      res.json({ message: "Kontakt usunięty" });
    } catch (error) {
      res.status(500).json({ message: "Błąd serwera" });
    }
  });

  router.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body;

      const newUser = new User({ username, password });
      await newUser.save();

      res.status(201).json({ message: "Rejestracja zakończona sukcesem" });
    } catch (error) {
      res.status(500).json({ message: "Błąd serwera" });
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username, password });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Nieprawidłowe dane logowania" });
      }

      const token = jwt.sign({ userId: user._id }, config.JwtSecret);

      res.status(200).json({ message: "Zalogowano pomyślnie", token });
    } catch (error) {
      res.status(500).json({ message: "Błąd serwera" });
    }
  });

  return router;
};

export default routes;
