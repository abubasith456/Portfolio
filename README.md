# Mohamed Abu Basith S - Portfolio

A modern, animated portfolio website built with React, TypeScript, Tailwind CSS, and Three.js featuring a 3D animated avatar and smooth transitions.

## 🚀 Features

- **3D Animated Avatar**: Interactive 3D character using Three.js with smooth animations
- **Modern Design**: Clean, professional design with glass morphism effects
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: Hover effects, scroll animations, and interactive components
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Optimized for fast loading and smooth performance

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library
- **Framer Motion** - Animation library
- **React Three Fiber** - React renderer for Three.js
- **Lucide React** - Beautiful icons
- **React Intersection Observer** - Scroll-based animations

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mohamed-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Avatar3D.tsx          # 3D animated avatar component
│   ├── Hero.tsx              # Hero section with introduction
│   ├── About.tsx             # About section with skills and experience
│   ├── Contact.tsx           # Contact form and information
│   ├── Navigation.tsx        # Navigation bar
│   └── Footer.tsx            # Footer component
├── App.tsx                   # Main application component
├── index.tsx                 # Application entry point
└── index.css                 # Global styles and Tailwind imports
```

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary colors: Blue gradient theme
- Dark theme: Professional dark color palette

### Content
Update the following files to customize content:
- `src/components/Hero.tsx` - Personal information and introduction
- `src/components/About.tsx` - Skills, experience, and education
- `src/components/Contact.tsx` - Contact information

### 3D Avatar
The 3D avatar can be customized in `src/components/Avatar3D.tsx`:
- Colors and materials
- Animation parameters
- Geometry and positioning

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
This project is configured for automatic deployment to GitHub Pages:
1. Push changes to the `clean-portfolio` branch
2. GitHub Actions will automatically build and deploy
3. Visit: https://abubasith456.github.io/Portfolio

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mohamed Abu Basith S**
- Email: mohamedabu.basith@gmail.com
- Location: Perungudi, Chennai

## 🙏 Acknowledgments

- Inspired by modern portfolio designs
- Three.js community for 3D graphics examples
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
