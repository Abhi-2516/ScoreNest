
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 w-full border-t bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 gap-2">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} VIT ScoreNest. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground font-bold mt-2">
             <span className="text-red-600 font-bold"> Note: </span>This website is an independent project and is not affiliated with, endorsed by, or connected to VIT University in any way. All information provided here is for general guidance purposes only and does not represent official university communications.
            </p>
          </div>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
