export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <h3 className="text-lg font-medium">Enhanced Devulator</h3>
            <p className="text-sm text-gray-400">Project Estimator & RFP Generator for organisations of all sizes</p>
          </div>
          <div className="text-sm text-gray-400">
            © {currentYear} Enhanced Devulator. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
