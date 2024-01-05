import dbConnect from '../../utils/dbConnect';
import Post from '../../models/Post';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } else if (req.method === 'POST') {
    const { title, content } = req.body;
    const post = await Post.create({ title, content });
    res.status(201).json({ success: true, data: post });
  } else {
    res.status(400).json({ success: false });
  }
}