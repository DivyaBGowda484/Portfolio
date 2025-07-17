# Professional Portfolio Website

A modern, responsive portfolio website built with Node.js, Express, and vanilla JavaScript. Features a professional design with attractive fonts, dynamic content loading, and a working contact form.

## Features

- **Professional Design**: Clean, modern design with Inter and Poppins fonts
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Content**: Backend API serves portfolio data dynamically
- **Interactive Animations**: Smooth scrolling, hover effects, and scroll animations
- **Contact Form**: Working contact form with validation
- **Modern Tech Stack**: Node.js, Express, vanilla JavaScript, CSS3
- **Dark Theme**: Professional dark color scheme with gradients
- **Performance Optimized**: Compressed assets and efficient loading

## Technologies Used

### Backend
- Node.js
- Express.js
- Nodemailer (for contact form)
- Helmet (security)
- Compression (performance)
- CORS (cross-origin requests)

### Frontend
- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter & Poppins)

## Color Scheme

The portfolio uses a professional dark theme with:
- **Primary**: Indigo (#6366f1) with purple gradient
- **Secondary**: Emerald (#10b981)
- **Background**: Slate dark shades
- **Text**: Various shades of slate for hierarchy

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd portfolio-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=your-contact-email@gmail.com
```

### 4. Start the Server
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

### 5. Access the Website
Open your browser and go to: `http://localhost:3000`

## Project Structure

```
portfolio-website/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── README.md             # This file
└── public/               # Static frontend files
    ├── index.html        # Main HTML file
    ├── css/
    │   └── style.css     # Main stylesheet
    ├── js/
    │   └── main.js       # Frontend JavaScript
    └── images/           # Image assets
```

## Customization

### 1. Update Portfolio Data
Edit the `portfolioData` object in `server.js` to customize:
- Personal information
- Skills
- Projects
- Experience
- Contact information

### 2. Modify Styling
- Colors: Update CSS variables in `style.css`
- Fonts: Change Google Fonts imports in `index.html`
- Layout: Modify CSS grid and flexbox layouts

### 3. Add New Sections
- Create new HTML sections in `index.html`
- Add corresponding styles in `style.css`
- Update JavaScript in `main.js` for dynamic content

## API Endpoints

- `GET /api/profile` - Get profile information
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `POST /api/contact` - Submit contact form

## Features in Detail

### Dynamic Content Loading
- Profile data loaded from backend API
- Projects fetched and displayed dynamically
- Experience timeline generated from data
- Skills grid with appropriate icons

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Collapsible navigation for mobile
- Optimized layouts for all screen sizes

### Performance Optimizations
- Gzip compression
- Efficient CSS with variables
- Lazy loading animations
- Minimal JavaScript footprint

### Contact Form
- Client-side validation
- Server-side validation
- Email integration ready
- Success/error notifications

## Deployment

### Heroku
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-portfolio-name

# Deploy
git push heroku main
```

### Netlify (for static hosting)
1. Build the project
2. Upload the `public` folder to Netlify
3. Configure environment variables

### VPS/Cloud Server
1. Install Node.js
2. Clone repository
3. Install dependencies
4. Set up PM2 for process management
5. Configure nginx as reverse proxy

## License

MIT License - feel free to use this template for your own portfolio!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

If you need help customizing this portfolio, please check the issues section or create a new issue.

---

**Note**: Remember to update the personal information, projects, and contact details in the `server.js` file to match your own profile before deploying! 