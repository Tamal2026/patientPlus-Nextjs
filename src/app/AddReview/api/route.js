export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { review, rating } = req.body;
  
      if (!review || !rating) {
        return res.status(400).json({ error: 'Review and rating are required.' });
      }
  
      try {
        const db = await connectDb();
        const reviewsCollection = db.collection('reviews');
  
        const newReview = {
          review,
          rating,
          createdAt: new Date(),
        };
  
        const result = await reviewsCollection.insertOne(newReview);
        res.status(201).json({ message: 'Review added successfully!', reviewId: result.insertedId });
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.setHeader('Allow', ['POST']); // Inform client of supported methods
      res.status(405).json({ error: `Method ${req.method} not allowed.` });
    }
  }
  