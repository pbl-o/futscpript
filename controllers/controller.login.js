import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
dotenv.config();

const nameAdmin = process.env.ADM_USERNAME;
const passAdmin = bcrypt.hashSync(process.env.ADM_PASSWORD);
const superSecret = process.env.SECRET_KEY;

const verifyUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    if (!name || !password) {
      console.log("agregar credenciales");
      throw { code: 404, message: "credencial(es) no encontrada(s)" };
    }

    if (name !== nameAdmin) {
      throw { code: 400, message: "credenciales invalidas" };
    }
    const rightPass = await bcrypt.compare(password, passAdmin);
    if (!rightPass) {
      console.log("error en encriptado");
      throw { code: 400, message: "credenciales invalidas" };
    }

    const token = jwt.sign({ name }, superSecret);
    console.log(`Usuario ${name} autenticación exitosa`);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno" });
  }
};

const controllerUser = {
  verifyUser,
};

export default controllerUser;
