const config = {
  port: process.env.PORT || 3001,
  databaseUrl:
    process.env.MONGODB_URI ||
    "mongodb+srv://votapo4451:xcvblOUH049mTH2n@addressbook.vlmifxs.mongodb.net/?retryWrites=true&w=majority",
  JwtSecret: process.env.JWT_SECRET || "secret",
};

export default config;
