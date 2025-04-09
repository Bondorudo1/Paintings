
export default function HomePage() {
   return (
     <div className="home-page">
       <h1>Welcome to Our Website</h1>
       <p>This is the homepage of our application built with React Router 7 and Vite.</p>
       
       <section className="featured-section">
         <h2>Featured Content</h2>
         <div className="feature-grid">
           {/* Featured content here */}
           <div className="feature-card">
             <h3>Feature 1</h3>
             <p>Description of feature 1</p>
           </div>
           <div className="feature-card">
             <h3>Feature 2</h3>
             <p>Description of feature 2</p>
           </div>
           <div className="feature-card">
             <h3>Feature 3</h3>
             <p>Description of feature 3</p>
           </div>
         </div>
       </section>
     </div>
   );
 }