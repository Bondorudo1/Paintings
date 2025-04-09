// src/components/layouts/Footer.jsx
export default function Footer() {
   const year = new Date().getFullYear();
   
   return (
     <footer>
       <p>&copy; {year} My App. All rights reserved.</p>
     </footer>
   );
 }