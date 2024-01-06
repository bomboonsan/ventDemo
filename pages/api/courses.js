import axios from 'axios';

export default async function handler(req, res) {
    try {

        res.status(200).json({
            data: {
                courses: [
                    { 
                        id: 1, 
                        name: 'Ventilator', 
                        thumbnail: 'https://criticalcare.i-meducation.com/images/Ventilator-thumbnail.png',
                        path: '/menulearningmode'
                    },
                    { 
                        id: 2, 
                        name: 'Trouble Shooting', 
                        thumbnail: 'https://criticalcare.i-meducation.com/images/troubleshooting-thumbnail-2.png',
                        path: '/instruction/trouble-shooting' 
                    },
                    { 
                        id: 3, 
                        name: 'Brain Monitoring', 
                        thumbnail: 'https://criticalcare.i-meducation.com/images/BrainMonitoring-thumbnail-crop-shadow.png',
                        path: '/case/brain/1' 
                    },
                ]
            }
        });
        
    } catch (error) {
      console.error('Error fetching external API:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
}