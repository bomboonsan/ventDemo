import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';


export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;
  
    await dbConnect();
  
    switch (method) {
      case 'GET':
        try {
          const user = await User.findById(id);
  
          if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
          }
  
          res.status(200).json({ success: true, data: user });
        } catch (error) {
          res.status(200).json({ success: false, error: 'Internal Server Error' });
        }
        break;
      default:
        res.status(200).json({ success: false, error: `Method ${method} Not Allowed` });
        break;
    }
}