import Contact from "../models/contact";

const routes = (router) => {
  router.post("/contacts", async (req, res) => {
    try {
      const { name, email, phone } = req.body;

      const newContact = new Contact({ name, email, phone });

      const savedContact = await newContact.save();

      res.status(201).json(savedContact);
    } catch (error) {
      res.status(500).json({ message: "Błąd serwera" });
    }
  });

  router.put("/contacts/:id", async (req, res) => {
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

  router.delete("/contacts/:id", async (req, res) => {
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

  return router;
};

export default routes;
