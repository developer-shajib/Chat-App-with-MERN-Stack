import mongoose from 'mongoose';

export const mongoBDConnect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log(`Mongodb connect successful`.bgMagenta.black);
      })
      .catch((error) => {
        console.log(`${error.message}`);
      });
  } catch (error) {
    console.log(`${error.message}`.bgRed.black);
  }
};
