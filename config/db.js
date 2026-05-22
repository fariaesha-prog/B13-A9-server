import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://mediqueuedata:mediqueue123@cluster0.22xo6tq.mongodb.net/mediqueue?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB Connected: ' + conn.connection.host);
  } catch (error) {
    console.error('MongoDB Error:', error.message);
    process.exit(1);
  }
};
export default connectDB;
